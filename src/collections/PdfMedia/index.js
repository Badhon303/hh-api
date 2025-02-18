import path from 'path'
import { NameFormat } from '../../utils/nameFormat'
import { MediaAdminAndUser } from '../../access/mediaAdminAndUser'

export const PdfMedia = {
  slug: 'media-pdfs',
  access: {
    read: MediaAdminAndUser,
    update: MediaAdminAndUser,
    delete: () => false,
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
