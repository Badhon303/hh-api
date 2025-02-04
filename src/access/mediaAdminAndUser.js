export const MediaAdminAndUser = ({ req: { params, user } }) => {
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
}
