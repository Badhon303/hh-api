export const OrgRead = async ({ req: { user } }) => {
  // if (user?.role === "admin" || user?.role === "applicant") {
  //   return true
  // }

  if (user?.role === "org") {
    return {
      "organization.organization.id": {
        equals: user.id,
      },
    }
  }

  // Deny access otherwise
  return false
}
