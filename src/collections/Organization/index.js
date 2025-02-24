import OrganizationAndAdmin from '../../access/organizationAndAdmin'
import { UrlPatternValidate } from '../../utils/urlPatternValidate'
import { AutoUpload } from './hooks/autoUpload'
import { OnlyAdmins } from '../../access/onlyAdmins'
// import { OrgRead } from '../../access/orgRead'

export const Organization = {
  slug: 'organizations',
  admin: {
    useAsTitle: 'orgName',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'org') {
          return {
            'organization.id': {
              equals: user.id,
            },
          }
        }
      }
      return true
    },
    create: OnlyAdmins,
    update: OrganizationAndAdmin,
    delete: OnlyAdmins,
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'users',
      access: { update: () => false },
      required: true,
      hasMany: false,
      unique: true,
    },
    {
      name: 'termsAndConditions',
      type: 'relationship',
      relationTo: 'terms-and-conditions',
      hasMany: true,
    },
    {
      name: 'industryType',
      type: 'relationship',
      relationTo: 'industry-types',
      hasMany: true,
    },
    {
      name: 'orgName',
      type: 'text',
      maxLength: 50,
    },
    {
      name: 'orgTagline',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'orgMission',
      type: 'text',
      maxLength: 5000,
    },
    {
      name: 'orgVision',
      type: 'text',
      maxLength: 5000,
    },
    {
      name: 'orgAddress',
      type: 'text',
      maxLength: 500,
    },
    {
      name: 'orgEmail', // required
      type: 'email', // required
      label: 'Org Email Address',
    },
    {
      name: 'orgPhone', // required
      type: 'text', // required
      label: 'Org Phone Number',
    },
    {
      name: 'orgEstablishedYear',
      type: 'number',
      validate: (val) => {
        if (!val) {
          // Allow empty values
          return true
        }
        const currentYear = new Date().getFullYear()
        if (val.toString().length !== 4 || val < 1000 || val > currentYear) {
          return `Please provide a valid year between 1000 and ${currentYear}.`
        }
        return true
      },
      label: 'Year Established',
    },
    {
      name: 'orgWebsiteUrl',
      type: 'text',
      label: 'Organization Website URL',
      maxLength: 200,
      validate: UrlPatternValidate,
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media-images',
    },
    {
      name: 'socialLinks', // required
      type: 'array', // required
      label: 'Org Social Links',
      maxRows: 5,
      fields: [
        {
          name: 'socialMedia',
          type: 'relationship',
          relationTo: 'social-medias',
          required: true,
          hasMany: false,
        },
        {
          name: 'socialMediaUrl',
          type: 'text',
          maxLength: 200,
          required: true,
          validate: UrlPatternValidate,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [AutoUpload],
    afterRead: [
      async ({ req, doc }) => {
        // if user is not admin or super-admin, return
        if (!['admin', 'super-admin'].includes(req.user?.role)) {
          try {
            if (doc.img !== null) {
              const img = await req.payload.findByID({
                collection: 'media-images',
                id: doc.img,
              })
              doc.img = img
            }
          } catch (error) {
            console.error('Error during application check:', error.message || error)
          }
        }
      },
    ],
  },
}
