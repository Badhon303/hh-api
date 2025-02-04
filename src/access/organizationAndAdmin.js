const OrganizationAndAdmin = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin' || user?.role === 'super-admin') {
      return true
    }
    if (user?.role === 'org') {
      return {
        organization: {
          equals: user.id,
        },
      }
    }
  }
  return false
}

export default OrganizationAndAdmin
