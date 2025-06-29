export const canvasUser = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin') {
      return true
    }

    return {
      'project.profile.id': {
        equals: user.id,
      },
    }
  }

  return false
}
