// import OrganizationAndAdmin from '../../access/organizationAndAdmin'

export const ApplicantStatus = {
  slug: 'applicant-status',
  admin: {
    useAsTitle: 'hiringStage',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
        if (user?.role === 'org') {
          return {
            'jobApplication.jobDetails.job.organization.organization.id': {
              equals: user.id,
            },
          }
        }
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
        if (user?.role === 'org') {
          console.log('user', user.id)
          return {
            'jobApplication.jobDetails.job.organization.organization.id': {
              equals: user.id,
            },
          }
        }
      }
      return false
    },
    delete: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
        if (user?.role === 'org') {
          return {
            organization: {
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
      name: 'hiringStage',
      type: 'relationship',
      relationTo: 'hiring-stages',
      required: true,
    },
    {
      name: 'jobApplication',
      type: 'relationship',
      relationTo: 'job-applications',
      // required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Applied',
          value: 'applied',
        },
        {
          label: 'Shortlisted',
          value: 'shortlisted',
        },
        {
          label: 'Hired',
          value: 'hired',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
    },
    {
      name: 'timeStamp',
      type: 'date',
      // required: true,
    },
    {
      name: 'comment',
      type: 'text',
      unique: true,
      maxLength: 9999,
    },
  ],
}
