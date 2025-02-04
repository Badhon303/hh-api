export const AutoUpload = async ({ req, data }) => {
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
}
