const AdminsAndUsers = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin' || user?.role === 'super-admin') {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}

export default AdminsAndUsers
