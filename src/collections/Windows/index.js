import { windowUser } from './access'

export const Windows = {
  slug: 'windows',
  admin: {
    useAsTitle: 'canvas',
  },
  access: {
    read: windowUser,
    create: windowUser,
    update: windowUser,
    delete: windowUser,
  },
  fields: [
    {
      name: 'canvas',
      type: 'relationship',
      relationTo: 'canvas',
      access: { update: () => false },
      required: true,
      hasMany: false,
    },
    {
      name: 'properties', // required
      type: 'json', // required
      required: true,
    },
  ],
}
