import { OnlyAdmins } from '../../access/onlyAdmins'

export const Designation = {
  slug: 'designations',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    update: OnlyAdmins,
    create: OnlyAdmins,
    delete: OnlyAdmins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      unique: true,
      required: true,
      maxLength: 50,
    },
    {
      name: 'industryTypeId',
      type: 'relationship',
      relationTo: 'industry-types',
      hasMany: true,
    },
  ],
}
