export const OnlyAdmins = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'super-admin'
