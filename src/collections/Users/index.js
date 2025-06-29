import { admins } from '@/utils/access/admin'

export const Users = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => {
      if (user) {
        if (user?.role !== 'admin') {
          return true
        }
        return false
      }
    },
  },
  auth: {
    tokenExpiration: 7200,
    cookies: {
      ...(process.env.NODE_ENV !== 'development' && {
        sameSite: 'None',
        domain: process.env.COOKIE_DOMAIN,
        secure: true,
      }),
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin') {
          return true
        }

        return {
          id: {
            equals: user.id,
          },
        }
      }

      return false
    },
    create: admins,
    update: () => false,
    delete: admins,
    // admin: admins,
  },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      access: {
        update: () => false,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
}
