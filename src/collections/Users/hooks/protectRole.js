// ensure there is always a `org` or `applicant` role
// do not let non-admins change roles
export const protectRole = async ({ data, originalDoc, operation }) => {
  if (operation === "update") {
    const currentUserRole = originalDoc.role // Get the current role of the user being updated

    // If the current user is "applicant" or "org", prevent role changes
    if (currentUserRole === "applicant" || currentUserRole === "org") {
      data.role = currentUserRole // Keep the role unchanged
    }
  }

  return data.role
}
