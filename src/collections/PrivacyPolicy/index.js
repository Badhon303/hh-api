import { OnlyAdmins } from '../../access/onlyAdmins'

export const PrivacyPolicy = {
  slug: 'privacy-policies',
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
      maxLength: 200,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Content',
    },
  ],
}
