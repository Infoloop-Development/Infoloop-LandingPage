import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

await client.connect()

const statements = [
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "access_mode" varchar DEFAULT 'full';`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "must_change_password" boolean DEFAULT false;`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "categories" jsonb;`,
  // Payload often stores hasMany select as a related table; if push creates users_categories later, ignore.
]

for (const sql of statements) {
  console.log(sql)
  await client.query(sql)
}

// Ensure existing admins/editors are not forced to change password
await client.query(`UPDATE "users" SET "must_change_password" = false WHERE "must_change_password" IS NULL OR "must_change_password" = true`)
await client.query(`UPDATE "users" SET "access_mode" = 'full' WHERE "access_mode" IS NULL`)

console.log('users columns ready; existing users: must_change_password=false, access_mode=full')
await client.end()
