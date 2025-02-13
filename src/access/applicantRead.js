export const ApplicantRead = async ({ req }) => {
  // console.log('req', Object.keys(req))
  if (req.user?.role === 'admin' || req.user?.role === 'super-admin') {
    return true
  }

  if (req.user?.role === 'org') {
    if (req.routeParams && req.routeParams?.id) {
      return {
        id: {
          equals: req.routeParams.id,
        },
      }
    }
    // return {
    //   "job.organization.organization": {
    //     equals: req.user.id,
    //   },
    // }
  }

  if (req.user?.role === 'applicant') {
    return {
      applicant: {
        equals: req.user.id,
      },
    }
  }

  // Deny access otherwise
  return false
}
