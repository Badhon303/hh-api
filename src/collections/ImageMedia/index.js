import { NameFormat } from '../../utils/nameFormat'
import path from 'path'
import { MediaAdminAndUser } from '../../access/mediaAdminAndUser'

export const ImageMedia = {
  slug: 'media-images',
  access: {
    read: ({ req: { params, user } }) => {
      if (user?.role === 'admin' || user?.role === 'super-admin') {
        // Grant full access to all images for admins
        return true
      }

      if (params && params.id) {
        // Grant public access for requests with a specific `id`
        return {
          id: {
            equals: params.id,
          },
        }
      }

      // Deny access otherwise
      return false
    },
    update: () => false,
    delete: () => MediaAdminAndUser,
  },
  upload: {
    staticURL: '/media/images',
    staticDir: path.resolve(__dirname, '../../../public/uploads/img'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeOperation: [NameFormat],
  },
}
