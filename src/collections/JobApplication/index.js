import { DuplicateApplication } from './hooks/duplicateApplication'
// import OrganizationAndAdmin from "../../access/organizationAndAdmin"
// import ApplicantAndAdmin from "../../access/applicantAndAdmin"
// import { OnlyAdmins } from "../../access/onlyAdmins"

export const JobApplication = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'jobDetails',
  },
  access: {
    // Admin can read all, organization and admin can read their own data and by id
    read: async ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
        // Organizations can read their applications or specific application by ID
        if (user?.role === 'org') {
          // Allow orgs to view a list of their own job applications
          return {
            'jobDetails.job.organization.organization': {
              equals: user.id,
            },
          }
        }
        if (user?.role === 'applicant') {
          return {
            'applicant.applicant': {
              equals: user.id,
            },
          }
        }
      }
      return false
    },
    // Admin and applicant can create
    create: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin' || user?.role === 'applicant') {
          return true
        }
      }
      return false
    },
    // admin can update
    update: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
      }
      return false
    },
    // Admin can delete, applicant can delete by id
    delete: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
        if (user?.role === 'applicant') {
          return {
            applicants: {
              equals: user.id,
            },
          }
        }
      }
      return false
    },
  },
  fields: [
    {
      name: 'applicant',
      type: 'relationship',
      relationTo: 'applicants',
      maxDepth: 2,
      access: { update: () => false, create: () => false },
      defaultValue: async ({ user, req }) => {
        if (user) {
          if (user) {
            if (user?.role === 'admin' || user?.role === 'super-admin') {
              return null
            }
            if (user?.role === 'applicant') {
              try {
                const applicant = await req.payload.find({
                  collection: 'applicants',
                  where: {
                    applicant: {
                      equals: user.id,
                    },
                  },
                })
                return `${applicant?.docs[0]?.id}`
              } catch (error) {
                console.error('Error finding job_applicants in default value:', error)
              }
            }
          }
        }
      },
      hasMany: false,
    },
    {
      name: 'jobDetails',
      type: 'relationship',
      relationTo: 'job-details',
      access: { update: () => false },
      required: true,
    },
    {
      name: 'applicationStatus',
      type: 'join',
      collection: 'applicant-status',
      on: 'jobApplication',
      maxDepth: 2,
    },
  ],
  hooks: {
    beforeChange: [DuplicateApplication],
    afterRead: [
      async ({ req, doc }) => {
        // if user is not admin or super-admin, return
        if (!['admin', 'super-admin'].includes(req.user?.role)) {
          try {
            const applicant = await req.payload.findByID({
              collection: 'applicants',
              id: doc.applicant,
            })
            doc.applicant = applicant
          } catch (error) {
            console.error('Error during application check:', error.message || error)
          }
        }
      },
    ],
  },
}
