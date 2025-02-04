import { OnlyAdmins } from '../../access/onlyAdmins'

export const AcademicActivityType = {
  slug: 'academic-activity-types',
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
  ],
}
