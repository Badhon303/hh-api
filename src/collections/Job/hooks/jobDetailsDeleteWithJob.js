export const JobDetailsDeleteWithJob = async ({ req, doc }) => {
  try {
    // find the job details
    // console.log("doc: ", doc)
    const existingJobDetails = await req.payload.find({
      collection: 'job-details',
      where: {
        job: {
          equals: doc.id,
        },
      },
    })
    console.log('existingJobDetails: ', existingJobDetails)
    // If job details exists, delete the profile
    if (existingJobDetails.docs.length !== 0) {
      await req.payload.delete({
        collection: 'job-details',
        id: existingJobDetails.doc[0].id,
        // where: { id: { equals: doc.id } },
      })
    }
  } catch (error) {
    console.error(`Error deleting profile for ${collectionName}:`, error)
  }
}
