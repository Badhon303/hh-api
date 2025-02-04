import { OnlyAdmins } from '../../access/onlyAdmins'

export const RefundPolicies = {
  slug: 'refund-policies',
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
      name: 'details',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media-images',
    },
  ],
  // endpoints: [
  //   {
  //     path: '/',
  //     method: 'post',
  //     handler: async (req) => {
  //       try {
  //         // Authentication checks
  //         if (!req.user) {
  //           return Response.json({ error: 'Unauthorized' }, { status: 401 })
  //         }
  //         if (req.user.role !== 'admin') {
  //           return Response.json({ error: 'Forbidden: Unauthorized' }, { status: 403 })
  //         }

  //         // Ensure form data exists
  //         const formData = await req.formData()
  //         if (!formData) {
  //           return Response.json(
  //             { error: 'Invalid Request: No form data provided' },
  //             { status: 400 },
  //           )
  //         }

  //         // Validate & parse JSON safely
  //         let data
  //         try {
  //           data = JSON.parse(formData.get('data') || '{}')
  //         } catch {
  //           return Response.json({ message: 'Invalid JSON format' }, { status: 400 })
  //         }

  //         if (!data.title) {
  //           return Response.json({ error: 'Missing required fields title' }, { status: 400 })
  //         }

  //         const img = formData.get('img')
  //         if (img.size > 5 * 1024 * 1024) {
  //           throw new FileUploadError(req.t)
  //         }
  //         let createdData = {}

  //         // Handle image upload if present
  //         if (img) {
  //           const arrayBuffer = await img.arrayBuffer()
  //           const buffer = Buffer.from(arrayBuffer)

  //           // Upload image
  //           const uploadedImage = await req.payload.create({
  //             collection: 'media-images',
  //             file: {
  //               name: img.name,
  //               data: buffer,
  //               encoding: '7bit',
  //               mimetype: img.type,
  //               size: img.size,
  //               tempFilePath: '',
  //               truncated: false,
  //             },
  //           })
  //           createdData = await req.payload.create({
  //             collection: 'refund-policies',
  //             data: {
  //               title: data.title,
  //               details: data?.details,
  //               img: uploadedImage.id,
  //             },
  //           })
  //         } else {
  //           createdData = await req.payload.create({
  //             collection: 'refund-policies',
  //             data: {
  //               title: data.title,
  //               details: data?.details,
  //             },
  //           })
  //         }

  //         return Response.json(createdData)
  //       } catch (error) {
  //         console.error('Error processing request:', error)
  //         return Response.json(
  //           { error: error || 'Internal Server Error' },
  //           { status: error.status || 500 },
  //         )
  //       }
  //     },
  //   },
  //   {
  //     path: '/:id',
  //     method: 'patch',
  //     handler: async (req) => {
  //       try {
  //         if (!req.user) {
  //           return Response.json({ error: 'Unauthorized' }, { status: 401 })
  //         }
  //         if (req.user.role !== 'admin') {
  //           return Response.json({ error: 'Forbidden: Unauthorized' }, { status: 403 })
  //         }

  //         const id = req.routeParams.id
  //         const existingPolicy = await req.payload.findByID({
  //           collection: 'refund-policies',
  //           id,
  //         })

  //         if (!existingPolicy) {
  //           return Response.json({ error: 'Refund policy not found' }, { status: 404 })
  //         }

  //         const formData = await req.formData()
  //         if (!formData) {
  //           return Response.json(
  //             { error: 'Invalid Request: No form data provided' },
  //             { status: 400 },
  //           )
  //         }

  //         let data = {}
  //         try {
  //           data = JSON.parse(formData.get('data') || '{}')
  //         } catch {
  //           return Response.json({ message: 'Invalid JSON format' }, { status: 400 })
  //         }

  //         const img = formData.get('img')
  //         let updatedData = { ...existingPolicy }

  //         if (Object.keys(data).length > 0) {
  //           updatedData = { ...updatedData, ...data }
  //         }

  //         if (img) {
  //           if (img.size > 5 * 1024 * 1024) {
  //             throw new FileUploadError(req.t)
  //           }
  //           const arrayBuffer = await img.arrayBuffer()
  //           const buffer = Buffer.from(arrayBuffer)

  //           const uploadedImage = await req.payload.create({
  //             collection: 'media-images',
  //             file: {
  //               name: img.name,
  //               data: buffer,
  //               encoding: '7bit',
  //               mimetype: img.type,
  //               size: img.size,
  //               tempFilePath: '',
  //               truncated: false,
  //             },
  //           })
  //           updatedData.img = uploadedImage.id
  //         }

  //         const updatedPolicy = await req.payload.update({
  //           collection: 'refund-policies',
  //           id,
  //           data: updatedData,
  //         })

  //         return Response.json(updatedPolicy)
  //       } catch (error) {
  //         console.error('Error processing update request:', error)
  //         return Response.json(
  //           { error: error || 'Internal Server Error' },
  //           { status: error.status || 500 },
  //         )
  //       }
  //     },
  //   },
  // ],
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        // Uncomment and use this logic if needed
        if (req.file && req.user !== 'super-admin') {
          if (Array.isArray(req.file)) {
            throw new CustomError('Only one file can be uploaded', 400)
          }
          try {
            const uploadedImage = await req.payload.create({
              collection: 'media-images',
              file: req.file,
            })
            data.img = uploadedImage.id
          } catch (error) {
            console.error('Error uploading image:', error)
            throw new CustomError('Something went wrong while uploading image', 400)
          }
        }
        return data
      },
    ],
  },
}
