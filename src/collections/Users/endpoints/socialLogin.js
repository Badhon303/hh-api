import jwt from 'jsonwebtoken'
import getCookieExpiration from '../utils/getCookieExpiration'

import findOrCreateUser from '../utils/findOrCreateUser'
import verifySocialToken from '../utils/verifySocialToken'

export default async function SocialLogin(req) {
  const { email, sid, provider, pictureUrl, token } = req.body

  // Step 1: Verify the social token based on the provider
  const socialId = await verifySocialToken(provider, token)
  if (!socialId) {
    return Response.json({ error: 'Authentication failed' }, { status: 401 })
  }

  try {
    // Step 2: Check if the token's user id matches
    if (socialId !== sid) {
      return Response.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Access the 'users' collection configuration
    const collectionConfig = req.payload.collections['users'].config

    // Find or create user in the database
    const user = await findOrCreateUser(email, sid, provider, pictureUrl)
    if (!user) {
      return Response.json({ error: 'User creation failed' }, { status: 500 })
    }

    // Prepare fields for the JWT
    const fieldsToSign = {
      email: user.email,
      id: user.id,
      collection: 'users',
      provider: 'credentials',
    }

    // Generate JWT token
    const generateToken = jwt.sign(fieldsToSign, req.payload.secret, {
      expiresIn: collectionConfig.auth.tokenExpiration || '1h', // Default expiration
    })

    // Set cookie expiration and convert to UNIX timestamp for the response
    const cookieExpiration = getCookieExpiration(collectionConfig.auth.tokenExpiration)
    const unixTimestamp = Math.floor(new Date(cookieExpiration).getTime() / 1000)

    if (!user._verified) {
      await req.payload.verifyEmail({
        collection: 'users',
        token: user._verificationToken.toString(),
      })
    }

    // create profile
    try {
      // Check if the profile already exists
      const existingProfile = await req.payload.find({
        collection: collectionName,
        where: {
          applicant: {
            equals: user.id,
          },
        },
      })

      // If no profile exists, create a new profile
      if (!existingProfile.docs.length) {
        await req.payload.create({
          collection: 'applicants',
          data: {
            applicant: user.Id,
            email: user.Email,
          },
        })
      }
    } catch (error) {
      console.error('Error creating profile for applicant', error)
    }

    // Set the JWT token in a cookie
    // res.cookie(`${req.payload.config.cookiePrefix}-token`, generateToken, {
    //   path: '/',
    //   httpOnly: true,
    //   expires: cookieExpiration,
    //   secure: collectionConfig.auth.cookies.secure || false, // Default to insecure if not set
    //   sameSite: collectionConfig.auth.cookies.sameSite, // Default to 'Lax'
    //   domain: collectionConfig.auth.cookies.domain || undefined,
    // })

    // Step 5: Respond with user data and expiration time
    return Response.json({
      exp: unixTimestamp,
      message: 'Auth Passed',
      token: generateToken,
      user: {
        id: user.id,
        pictureUrl: user.pictureUrl,
        role: user.role,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
        email: user.email,
        loginAttempts: user.loginAttempts,
      },
    })
  } catch (error) {
    console.error('Error in social login:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
