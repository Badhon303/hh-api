import OrganizationAndAdmin from '../../access/organizationAndAdmin'

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
            'jobApplication.jobDetails.job.organization': {
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
          return {
            'jobApplication.jobDetails.job.organization': {
              equals: user.id,
            },
          }
        }
      }
      return false
    },
    delete: OrganizationAndAdmin,
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
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Passed',
          value: 'passed',
        },
        {
          label: 'Failed',
          value: 'failed',
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
