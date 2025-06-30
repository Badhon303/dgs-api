import { mediaUser } from './access'

export const Media = {
  slug: 'media',
  access: {
    read: () => true,
  },
  access: {
    read: mediaUser,
    create: mediaUser,
    update: mediaUser,
    delete: mediaUser,
  },
  fields: [
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'users',
      access: { update: () => false },
      required: true,
      hasMany: false,
      hidden: true, // Hide this field in the admin UI
    },
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          // Set the 'profile' field to the ID of the currently logged-in user
          data.profile = req.user.id
        }
        return data
      },
    ],
  },
}
