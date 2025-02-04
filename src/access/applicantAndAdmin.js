const ApplicantAndAdmin = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin' || user?.role === 'super-admin') {
      return true
    }
    if (user?.role === 'applicant') {
      console.log('user', user)
      return {
        applicant: {
          equals: user.id,
        },
      }
    }
  }
  return false
}

export default ApplicantAndAdmin
