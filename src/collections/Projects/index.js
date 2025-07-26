import { projectUser } from './access'

export const Projects = {
  slug: 'projects',
  admin: {
    useAsTitle: 'projectName',
  },
  access: {
    read: projectUser,
    create: projectUser,
    update: projectUser,
    delete: projectUser,
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
      name: 'projectName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'customerDetails',
      type: 'array',
      maxRows: 1,
      fields: [
        {
          name: 'customerName',
          type: 'text',
          required: true,
          maxLength: 100,
        },
        {
          name: 'customerPhone',
          type: 'text', // Changed from 'string' to 'text' as 'string' is not a native Payload type
          maxLength: 20,
          validate: (value) => {
            if (!value) return true // Allow empty phone number

            // Updated regex for phone numbers:
            // Allows for:
            // - Optional '+' at the beginning
            // - Digits (0-9)
            // - Spaces, hyphens, and parentheses
            // - Minimum 7 digits, maximum 15 (adjust as needed for your specific use case)
            const phoneRegex = /^\+?[\d\s\-\(\)]{7,20}$/
            // Example for Bangladeshi mobile numbers (starting with 01)
            const bdMobileRegex = /^01[3-9]\d{8}$/

            if (phoneRegex.test(value) || bdMobileRegex.test(value)) {
              return true
            }
            return 'Please enter a valid phone number (e.g., +123-456-7890, 01783558935)'
          },
        },
        {
          name: 'projectLocation',
          type: 'text',
          maxLength: 100,
        },
        {
          name: 'date',
          type: 'date',
        },
      ],
    },
    {
      name: 'materialDetails',
      type: 'array',
      maxRows: 1,
      fields: [
        {
          name: 'material',
          type: 'text',
          maxLength: 100,
        },
        {
          name: 'materialColor',
          type: 'text',
          maxLength: 100,
        },
        {
          name: 'glassBrandAndThickness',
          type: 'text',

          maxLength: 100,
        },
        {
          name: 'glassPanel',
          type: 'text',

          maxLength: 100,
        },
        {
          name: 'hardware',
          type: 'text',

          maxLength: 100,
        },
        {
          name: 'numberOfDoorsOrWindows',
          type: 'text',
          maxLength: 100,
        },
      ],
    },
    {
      name: 'canvas',
      type: 'array',
      maxRows: 999,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'windows',
          type: 'array',
          maxRows: 999,
          fields: [
            {
              name: 'properties', // required
              type: 'json', // required
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'canvasStatus', // required
      type: 'json', // required
    },
  ],
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
