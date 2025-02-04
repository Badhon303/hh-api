import OrganizationAndAdmin from '../../access/organizationAndAdmin'
import { JobDetailsCreateWithJob } from './hooks/jobDetailsCreateWithJob'
import { JobDetailsDeleteWithJob } from './hooks/jobDetailsDeleteWithJob'
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
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
      hasMany: false,
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
    afterChange: [JobDetailsCreateWithJob],
    afterDelete: [JobDetailsDeleteWithJob],
  },
}
