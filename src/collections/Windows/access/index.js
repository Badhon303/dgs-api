export const windowUser = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin') {
      return true
    }

    return {
      'canvas.project.profile.id': {
        equals: user.id,
      },
    }
  }

  return false
}
