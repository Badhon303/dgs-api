import { propertiesUser } from './access'

export const WindowProperties = {
  slug: 'window-properties',
  admin: {
    useAsTitle: 'type',
  },
  access: {
    read: propertiesUser,
    create: propertiesUser,
    update: propertiesUser,
    delete: propertiesUser,
  },
  fields: [
    {
      name: 'window',
      type: 'relationship',
      relationTo: 'windows',
      access: { update: () => false },
      required: true,
      hasMany: false,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Fixed',
          value: 'fixed',
        },
        {
          label: 'Sliding',
          value: 'sliding',
        },
        {
          label: 'Casement',
          value: 'casement',
        },
      ],
    },
    {
      name: 'shape',
      type: 'select',
      options: [
        {
          label: 'Rectangle',
          value: 'rectangle',
        },
        {
          label: 'Arch',
          value: 'arch',
        },
        {
          label: 'Circular',
          value: 'circular',
        },
      ],
    },
    {
      name: 'width',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'height',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'x-axis',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'y-axis',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'rotation',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'frameWidth',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'frameColor',
      type: 'text',
      maxLength: 999,
    },
    {
      name: 'glassColor',
      type: 'text',
      maxLength: 999,
    },
    {
      name: 'horizontalDividers',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'verticalDividers',
      type: 'number',
      maxLength: 99999999,
    },
    {
      name: 'angularDividers',
      type: 'number',
      maxLength: 99999999,
    },
    // --- Self-referencing relationship fields ---
    {
      name: 'subParts',
      type: 'relationship',
      relationTo: 'window-properties', // Points to itself for recursion
      hasMany: false, // The collection name for the join
      // label: 'Sub Parts',
      // You might want to populate these for deeper recursion when querying
      // populate: true, // Consider adding populate: true for API queries
    },
    {
      name: 'newSubParts',
      type: 'join',
      collection: 'window-properties', // Points to itself for recursion
      on: 'subParts', // The collection name for the join
      hasMany: true,
      // You might want to populate these for deeper recursion when querying
      // populate: true, // Consider adding populate: true for API queries
    },
    {
      name: 'properties',
      type: 'relationship',
      relationTo: 'window-properties', // Points to itself for recursion
      hasMany: false, // The collection name for the join
      // label: 'Sub Parts',
      // You might want to populate these for deeper recursion when querying
      // populate: true, // Consider adding populate: true for API queries
    },
    {
      name: 'newProperties',
      type: 'join',
      collection: 'window-properties', // Points to itself for recursion
      on: 'properties', // A window can have multiple related properties
      hasMany: true, // populate: true, // Consider adding populate: true for API queries
    },
  ],
}
