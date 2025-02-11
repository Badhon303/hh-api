import { APIError } from 'payload'

export const DuplicateApplication = async ({
  data, // incoming data to update or create with
  req,
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (req?.user?.role === 'applicant' && operation === 'create') {
    try {
      const applicant = await req.payload.find({
        collection: 'applicants',
        where: {
          applicant: {
            equals: req.user.id,
          },
        },
      })

      if (!applicant?.docs.length) {
        throw new APIError('Applicant not found.', 400)
      }

      data.applicant = applicant.docs[0].applicant

      // if (applicant.docs[0].id.toString() !== data.applicant.toString()) {
      //   throw new APIError('you are not allowed to perform this task.', 400)
      // }

      const existingApplication = await req.payload.find({
        collection: 'job-applications',
        where: {
          applicant: {
            equals: data.applicant,
          },
          jobDetails: {
            equals: data.jobDetails,
          },
        },
      })

      if (existingApplication.docs.length > 0) {
        throw new APIError('You have already applied to this job.', 400)
      }
      return data
    } catch (error) {
      console.error('Error during application check:', error.message || error)
      throw new APIError(
        error.message || 'An error occurred while processing your application.',
        400,
      )
    }
  }
}
