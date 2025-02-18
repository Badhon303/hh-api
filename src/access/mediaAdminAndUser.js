export const MediaAdminAndUser = ({ req: { routeParams, user } }) => {
  if (user?.role === 'admin' || user?.role === 'super-admin') {
    // Grant full access to all images for admins
    return true
  }

  if (routeParams && routeParams.filename) {
    // Grant public access for requests with a specific `id`
    return {
      filename: {
        equals: routeParams.filename,
      },
    }
  }

  // Deny access otherwise
  return false
}
