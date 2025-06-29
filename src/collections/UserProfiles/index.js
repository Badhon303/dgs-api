import { admins } from '@/utils/access/admin'
import { profileUser } from './access'

export const UserProfiles = {
  slug: 'user-profiles',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: profileUser,
    create: admins,
    update: profileUser,
    delete: admins,
    // admin: admins,
  },
  fields: [
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'users',
      access: { update: () => false },
      required: true,
      hasMany: false,
      unique: true,
      //   hidden: true, // Hide this field in the admin UI
    },
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
      maxLength: 50,
      validate: (value) => {
        // After trimming (which happens in beforeChange), check if there are any internal spaces left
        // This regex checks for any whitespace character (space, tab, etc.)
        if (/\s/.test(value.trim())) {
          // Important: run test on trimmed value for accurate internal space check
          return 'Name cannot contain spaces in between.'
        }

        return true
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value.trim() // This will remove leading and trailing spaces
            }
            return value
          },
        ],
      },
    },
    {
      name: 'address',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'phone',
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
      name: 'website',
      type: 'text',
      maxLength: 100,
      validate: (value) => {
        if (!value) return true // Allow empty website
        if (isValidUrl(value)) {
          return true
        }
        return 'Please enter a valid URL (e.g., https://www.example.com)'
      },
    },
    {
      name: 'facebook',
      type: 'text',
      maxLength: 100,
      validate: (value) => {
        if (!value) return true // Allow empty Facebook link
        const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]+$/
        if (facebookRegex.test(value) && isValidUrl(value)) {
          return true
        }
        return 'Please enter a valid Facebook profile URL (e.g., https://www.facebook.com/yourprofile)'
      },
    },
    {
      name: 'linkedIn',
      type: 'text',
      maxLength: 100,
      validate: (value) => {
        if (!value) return true // Allow empty LinkedIn link
        const linkedInRegex =
          /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+\/?$/
        if (linkedInRegex.test(value) && isValidUrl(value)) {
          return true
        }
        return 'Please enter a valid LinkedIn profile or company URL (e.g., https://www.linkedin.com/in/yourprofile)'
      },
    },
  ],
}
