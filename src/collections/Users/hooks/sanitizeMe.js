export const SanitizeMe = async ({ response }) => {
  // Remove the "collection" and "strategy" fields from the user object
  const { collection, strategy, ...rest } = response
  return rest
}
