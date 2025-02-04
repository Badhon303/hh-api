import { OnlyAdmins } from '../../access/onlyAdmins'

export const FAQ = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    update: OnlyAdmins,
    create: OnlyAdmins,
    delete: OnlyAdmins,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      unique: true,
      required: true,
      maxLength: 500,
    },
    {
      name: 'answer',
      type: 'text',
      maxLength: 5000,
    },
  ],
}
