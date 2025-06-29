import { canvasUser } from './access'

export const Canvas = {
  slug: 'canvas',
  admin: {
    useAsTitle: 'project',
  },
  access: {
    read: canvasUser,
    create: canvasUser,
    update: canvasUser,
    delete: canvasUser,
  },
  fields: [
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      access: { update: () => false },
      required: true,
      hasMany: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
