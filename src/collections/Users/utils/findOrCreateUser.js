import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function findOrCreateUser(email, sid, provider, pictureUrl) {
  const payload = await getPayload({ config })
  let users = await payload.find({
    collection: 'users',
    where: { sid: { equals: sid } },
    showHiddenFields: true,
  })

  // If user exists, return the user
  if (users.docs && users.docs.length) {
    let user = users.docs[0]
    return user
  } else {
    // Generate a secure random password
    const randomPassword = crypto.randomBytes(20).toString('hex')

    // Construct the data object with optional pictureUrl
    const userData = {
      email,
      sid,
      role: 'applicant',
      provider,
      password: randomPassword,
    }

    // Add pictureUrl only if it's provided
    if (pictureUrl) {
      userData.pictureUrl = pictureUrl
    }

    // Register new user
    return await payload.create({
      collection: 'users',
      disableVerificationEmail: true,
      data: userData,
      showHiddenFields: true,
    })
  }
}
