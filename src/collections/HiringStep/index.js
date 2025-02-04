import { OnlyAdmins } from '../../access/onlyAdmins'

export const HiringStep = {
  slug: 'hiring-steps',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
      maxLength: 200,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Content',
    },
  ],
}
