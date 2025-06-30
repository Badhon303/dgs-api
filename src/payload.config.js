// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { UserProfiles } from './collections/UserProfiles'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon: '/graphics/Icon/index.jsx#Icon',
        Logo: '/graphics/Logo/index.jsx#Logo',
      },
    },
    // Add your own meta data here
    meta: {
      description: 'Glass Quotation making app',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/assets/favicon.svg',
        },
      ],
      titleSuffix: '- DGS',
    },
  },
  collections: [Users, Media, UserProfiles, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // typescript: {
  //   outputFile: path.resolve(dirname, 'payload-types.ts'),
  // },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  graphQL: {
    disable: true, // Disable GraphQL API
  },
  cors: ['http://localhost:3000'],
  // If you are protecting resources behind user authentication,
  // This will allow cookies to be sent between the two domains
  csrf: ['http://localhost:3000'],
  // cookiePrefix: 'rf',
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB, written in bytes
    },
  },
})
