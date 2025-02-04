import { OnlyAdmins } from '../../access/onlyAdmins'
import OrganizationAndAdmin from '../../access/organizationAndAdmin'

export const OrgSettings = {
  slug: 'org-settings',
  admin: {
    useAsTitle: 'organization',
  },
  access: {
    read: OrganizationAndAdmin,
    update: OrganizationAndAdmin,
    create: OnlyAdmins,
    delete: OnlyAdmins,
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      unique: true,
    },
    // {
    //   name: "subscription",
    //   type: "relationship",
    //   relationTo: "subscriptions",
    //   // access: { update: () => false },
    //   // hasMany: false,
    // },
    {
      name: 'beginning',
      type: 'date',
    },
    {
      name: 'ending',
      type: 'date',
    },
    {
      name: 'numberOfJobPosted',
      type: 'number',
      max: 5000,
      min: 0,
    },
    {
      name: 'numberOfCvViewed',
      type: 'number',
      max: 10000,
      min: 0,
    },
  ],
}
