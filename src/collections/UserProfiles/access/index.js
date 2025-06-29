export const profileUser = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin') {
      return true
    }

    return {
      'profile.id': {
        equals: user.id,
      },
    }
  }

  return false
}
