export const OrgRead = async ({ req: { routeParams, user } }) => {
  if (user?.role === 'admin' || user?.role === 'super-admin') {
    return true
  }

  if (user?.role === 'applicant' && routeParams) {
    if (routeParams.id) {
      return {
        id: {
          equals: routeParams.id,
        },
      }
    }
  }

  if (user?.role === 'org') {
    return {
      'organization.id': {
        equals: user.id,
      },
    }
  }

  // Deny access otherwise
  return false
}
