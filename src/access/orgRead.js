export const OrgRead = async ({ req: { params, user } }) => {
  if (user?.role === 'admin' || user?.role === 'super-admin') {
    return true
  }

  if (user?.role === 'applicant' && params) {
    if (params.id) {
      return {
        id: {
          equals: params.id,
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
