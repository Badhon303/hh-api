export const loginAfterRegistration = async ({
  doc,
  req,
  req: { payload, body = {}, res },
  operation,
}) => {
  if (operation === "create") {
    const { email, password } = body
    if (email && password) {
      const { token, exp } = await payload.login({
        collection: "users",
        data: { email, password },
        req,
        res,
      })

      return {
        exp,
        token,
        user: {
          ...doc,
        },
      }
    }
  }

  return doc
}
