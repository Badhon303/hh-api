export const ApplicantRead = async ({ req: { params, user } }) => {
  if (user?.role === 'admin' || user?.role === 'super-admin') {
    return true
  }

  if (user?.role === 'org') {
    if (params && params?.id) {
      return {
        id: {
          equals: params.id,
        },
      }
    }
    // return {
    //   "job.organization.organization": {
    //     equals: user.id,
    //   },
    // }
  }

  if (user?.role === 'applicant') {
    return {
      applicant: {
        equals: user.id,
      },
    }
  }

  // Deny access otherwise
  return false
}
