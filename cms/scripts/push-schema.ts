/**
 * Apply schema changes (new globals, fields, select options) to the database
 * at DATABASE_URL.
 *
 *   npm run db:push
 *
 * Why a script: @payloadcms/db-postgres only pushes the schema when
 * NODE_ENV is not "production" (node_modules/@payloadcms/db-postgres/dist/connect.js),
 * and `next start` on Render sets NODE_ENV=production. So setting
 * PAYLOAD_DATABASE_PUSH=true on the Render service does nothing; run this from
 * a developer machine with cms/.env pointing at the target database instead.
 * Additive changes (tables, columns, enum values) apply without prompts;
 * drizzle asks before anything destructive.
 */
import 'dotenv/config'

// NODE_ENV is typed read-only by Next; assign through Object.assign.
Object.assign(process.env, { NODE_ENV: 'development', PAYLOAD_DATABASE_PUSH: 'true' })

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set (cms/.env). Nothing to push to.')
  process.exit(1)
}

// Imported after the environment is set: payload.config reads PAYLOAD_DATABASE_PUSH at import time.
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')

const payload = await getPayload({ config })
payload.logger.info('Schema is up to date with src/payload.config.ts')
process.exit(0)
