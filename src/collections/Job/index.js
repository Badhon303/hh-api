import OrganizationAndAdmin from '../../access/organizationAndAdmin'
import { JobDetailsCreateWithJob } from './hooks/jobDetailsCreateWithJob'
import { UrlPatternValidate } from '../../utils/urlPatternValidate'

export const Job = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'organization',
  },
  access: {
    read: () => true,
    create: OrganizationAndAdmin,
    update: OrganizationAndAdmin,
    delete: OrganizationAndAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 50,
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      hasMany: false,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'socialLinks', // required
      type: 'array', // required
      label: 'Job Social Links',
      maxRows: 10,
      fields: [
        {
          name: 'socialMedia',
          type: 'relationship',
          relationTo: 'social-medias',
          hasMany: false,
        },
        {
          name: 'socialMediaUrl',
          type: 'text',
          maxLength: 1000,
          validate: UrlPatternValidate,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        // Uncomment and use this logic if needed
        try {
          const existingOrg = await req.payload.find({
            collection: 'organizations',
            where: {
              organization: req.user.id,
            },
          })
          data.organization = existingOrg.docs[0].id
        } catch (error) {
          console.error('Error creating job:', error)
          throw new CustomError('Something went wrong while creating job', 400)
        }
        return data
      },
    ],
    after: [JobDetailsCreateWithJob],
    beforeDelete: [
      async ({ req, id }) => {
        try {
          await req.payload.delete({
            collection: 'job-details',
            where: {
              job: {
                equals: id,
              },
            },
          })
          // }
        } catch (error) {
          console.error(`Error deleting job details:`, error)
        }
      },
    ],
  },
}
