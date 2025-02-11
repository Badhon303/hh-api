// import { getPayload } from 'payload'
// import config from '@payload-config'
import jwt from 'jsonwebtoken'
import getCookieExpiration from '../utils/getCookieExpiration'

import { headersWithCors } from 'payload'

export default async function AfterEmailVerification(req) {
  // const payload = await getPayload({ config })
  const { token } = req.routeParams
  try {
    // Perform the custom verification logic here
    const userData = await req.payload.find({
      collection: 'users',
      where: {
        _verificationToken: {
          equals: token,
        },
      },
    })

    if (!userData || userData.docs.length === 0) {
      return Response.json({ error: 'Invalid or expired verification token.' }, { status: 404 })
    }
    const user = userData.docs[0]
    const userId = user.id
    const userRole = user.role
    const userEmail = user.email
    const collectionConfig = req.payload.collections['users'].config
    // Prepare fields for the JWT
    const fieldsToSign = {
      email: userEmail,
      id: userId,
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
        token: token,
      })
    }
    // profile create
    const createProfileIfNotExists = async (collectionName, userField) => {
      try {
        // Check if the profile already exists
        const existingProfile = await req.payload.find({
          collection: collectionName,
          where: {
            [userField]: {
              equals: userId,
            },
          },
        })
        // If no profile exists, create a new profile
        if (!existingProfile.docs.length) {
          await req.payload.create({
            collection: collectionName,
            data: {
              [userField]: userId,
            },
          })
        }
        if (userRole === 'org') {
          const existingOrgSettings = await req.payload.find({
            collection: 'org-settings',
            where: {
              organization: {
                equals: userId,
              },
            },
          })

          // If no profile exists, create a new profile
          if (!existingOrgSettings.docs.length) {
            await req.payload.create({
              collection: 'org-settings',
              data: {
                organization: userId,
              },
            })
          }
        }
      } catch (error) {
        console.error(`Error creating profile for ${collectionName}:`, error)
      }
    }

    // Create profile based on user role
    if (userRole === 'applicant') {
      await createProfileIfNotExists('applicants', 'applicant')
    } else if (userRole === 'org') {
      await createProfileIfNotExists('organizations', 'organization')
    }
    // Set the JWT token in a cookie

    // Step 5: Respond with user data and expiration time
    return Response.json(
      {
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
      },
      {
        headers: headersWithCors({
          headers: new Headers({
            'Set-Cookie': cookie,
          }),
          req,
        }),
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error verifying email:', error)
    return Response.json({ error: 'An error occurred during verification.' }, { status: 500 })
  }
}
