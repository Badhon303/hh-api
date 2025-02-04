import path from 'path'
import { NameFormat } from '../../utils/nameFormat'
import AdminsAndUsers from '../../access/adminsAndUsers'

export const PdfMedia = {
  slug: 'media-pdfs',
  access: {
    read: AdminsAndUsers,
    update: AdminsAndUsers,
    create: AdminsAndUsers,
    delete: AdminsAndUsers,
  },
  upload: {
    staticURL: '/media/pdf',
    staticDir: path.resolve(__dirname, '../../../public/uploads/pdf'),
    mimeTypes: ['application/pdf'],
  },
  hooks: {
    beforeOperation: [NameFormat],
  },
}
