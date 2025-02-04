import OrganizationAndAdmin from '../../access/organizationAndAdmin'

export const HiringStage = {
  slug: 'hiring-stages',
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
      name: 'title',
      type: 'text',
      unique: true,
      required: true,
      maxLength: 50,
    },
    {
      name: 'order',
      type: 'number',
      unique: true,
      required: true,
      max: 10,
      min: 1,
    },
    {
      name: 'description',
      type: 'text',
      unique: true,
      maxLength: 9999,
    },
  ],
}
