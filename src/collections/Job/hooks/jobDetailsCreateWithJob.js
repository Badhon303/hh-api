export const JobDetailsCreateWithJob = async ({ req, doc, operation }) => {
  if (operation === 'create') {
    setTimeout(async () => {
      try {
        await req.payload.create({
          collection: 'job-details',
          data: {
            job: doc.id,
          },
        })
      } catch (error) {
        console.error('Error creating job_details:', error)
      }
    }, 500) // delay in milliseconds
  }
}
