import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * Reset a user's password from the command line.
 *
 *   npx tsx scripts/reset-admin-password.ts you@infoloop.co 'a-temporary-password'
 *
 * Both arguments are required: an earlier version defaulted to a password
 * committed in this file, which meant the admin account had a public
 * password. The user is asked to choose a new one on their next login.
 */
const [email, password] = process.argv.slice(2)

async function main() {
  if (!email || !password) {
    console.error('Usage: npx tsx scripts/reset-admin-password.ts <email> <temporary-password>')
    process.exit(1)
  }
  if (password.length < 12) {
    console.error('Use a temporary password of at least 12 characters.')
    process.exit(1)
  }
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (!found.docs[0]) {
    console.error(`No user: ${email}`)
    process.exit(1)
  }
  await payload.update({
    collection: 'users',
    id: found.docs[0].id,
    data: { password, mustChangePassword: true },
  })
  console.log(`Temporary password set for ${email}; they will be asked to change it on login.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
