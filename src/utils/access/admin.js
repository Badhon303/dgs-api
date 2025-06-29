export const admins = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin') {
      return true
    }
    return false
  }
}
