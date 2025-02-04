export const profileCreateAfterRegistration = async ({ req, doc, operation }) => {
  if (operation === 'create') {
    const { id: userId, role: userRole } = doc

    // Define a function to handle profile creation for both roles
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
  }
}
