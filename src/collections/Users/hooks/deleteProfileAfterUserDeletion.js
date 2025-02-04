export const DeleteProfileAfterUserDeletion = async ({ id, req }) => {
  let userRole = ''
  const userId = id

  if (req?.user?.role === 'admin' || user?.role === 'super-admin' || req?.user?.id === id) {
    try {
      const existingProfile = await req.payload.findByID({
        collection: 'users',
        id: userId,
      })
      if (existingProfile) {
        userRole = existingProfile.role
      }
    } catch (error) {
      console.error(`user not found:`, error)
    }

    // Define a function to handle profile creation for both roles
    const deleteProfileIfExists = async (collectionName, userField) => {
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
        // If profile exists, delete the profile
        if (existingProfile.docs.length !== 0) {
          await req.payload.delete({
            collection: collectionName,
            id: existingProfile.docs[0].id,
            // where: { [userField]: { equals: userId } },
          })
        }
        if (userRole === 'org') {
          // Check if org settings already exists
          const existingOrgSettings = await req.payload.find({
            collection: 'org-settings',
            where: {
              organization: {
                equals: userId,
              },
            },
          })
          // If profile exists, create a new profile
          if (existingOrgSettings.docs.length !== 0) {
            await req.payload.delete({
              collection: 'org-settings',
              id: existingOrgSettings.docs[0].id,
            })
          }
        }
      } catch (error) {
        console.error(`Error deleting profile for ${collectionName}:`, error)
      }
    }

    // Create profile based on user role
    if (userRole === 'applicant') {
      await deleteProfileIfExists('applicants', 'applicant')
    } else if (userRole === 'org') {
      await deleteProfileIfExists('organizations', 'organization')
    }
  } else {
    console.log('Unauthorized to delete this profile.')
  }
}
