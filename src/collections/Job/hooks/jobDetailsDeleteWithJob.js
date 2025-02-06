export const JobDetailsDeleteWithJob = async ({ req, doc }) => {
  try {
    // find the job details
    // console.log("doc: ", doc)
    // const existingJobDetails = await req.payload.find({
    //   collection: 'job-details',
    //   where: {
    //     job: {
    //       equals: doc.id,
    //     },
    //   },
    // })
    // console.log('doc: ', doc)
    // If job details exists, delete the profile
    // if (existingJobDetails.docs.length !== 0) {
    await req.payload.delete({
      collection: 'job-details',
      where: {
        job: {
          equals: doc.id,
        },
      },
      // id: existingJobDetails.docs[0].id,
      // where: { id: { equals: doc.id } },
    })
    // }
  } catch (error) {
    console.error(`Error deleting job details:`, error)
  }
}
