export const propertiesUser = ({ req: { user } }) => {
  if (user) {
    if (user?.role === 'admin') {
      return true
    }

    return {
      'window.canvas.project.profile.id': {
        equals: user.id,
      },
    }
  }

  return false
}
