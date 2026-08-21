import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { Hire } from './collections/Hire'
import { Products } from './collections/Products'
import { Work } from './collections/Work'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import { Pages } from './collections/Pages'
import { Home } from './globals/Home'
import { Site } from './globals/Site'
import { WorkPage } from './globals/WorkPage'
import { ProductsPage } from './globals/ProductsPage'
import { AboutPage } from './globals/AboutPage'
import { BrandPage } from './globals/BrandPage'
import { SolutionsPages } from './globals/SolutionsPages'
import { IndustryPages } from './globals/IndustryPages'
import { HirePages } from './globals/HirePages'
import { rebuildAfterGlobalChange } from './hooks/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Infoloop CMS (Payload 3, Postgres on Neon, hosted on Railway or Render).
 * The public site is a static Astro build on Netlify that reads this API at
 * build time; publishing here pings the Netlify build hook (hooks/revalidate).
 */
export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || undefined,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' | Infoloop CMS' },
  },
  collections: [Services, Industries, Hire, Products, Work, Posts, Testimonials, Pages, Media, Users],
  globals: [
    { ...Home, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...Site, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...WorkPage, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...ProductsPage, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...AboutPage, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...BrandPage, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...SolutionsPages, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...IndustryPages, hooks: { afterChange: [rebuildAfterGlobalChange] } },
    { ...HirePages, hooks: { afterChange: [rebuildAfterGlobalChange] } },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: (process.env.CORS_ORIGINS || 'http://localhost:4321,https://infoloop.co').split(','),
  csrf: (process.env.CORS_ORIGINS || 'http://localhost:4321,https://infoloop.co').split(','),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Neon: connection string already carries sslmode=require.
  }),
  sharp,
  plugins: [],
})
