import 'dotenv/config'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * Mint the API key the website uses (PAYLOAD_TOKEN) on a dedicated service
 * user with the least access the site needs.
 *
 *   npx tsx scripts/ensure-chatbot-api-key.ts            # chatbot@infoloop.co
 *   npx tsx scripts/ensure-chatbot-api-key.ts svc@x.co   # another service address
 *
 * The site uses the key to create, read and update Sales inquiry tickets
 * (tickets: create is any signed-in user; read/update need the
 * 'sales-tickets' category) and to read the chat feature catalog and
 * published content at build time (public anyway). It never needs to manage
 * users or delete content, so the key is NOT an admin key: an earlier version
 * of this script promoted whichever account you named to full admin, which
 * put an admin credential into the web server's environment and build output.
 *
 * The script refuses to touch an admin account. Re-running it rotates the key.
 */
const email = process.argv[2] || 'chatbot@infoloop.co'

async function main() {
  const payload = await getPayload({ config })
  const found = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  const apiKey = crypto.randomBytes(24).toString('hex')
  const access = {
    enableAPIKey: true,
    apiKey,
    role: 'editor' as const,
    accessMode: 'limited' as const,
    categories: ['sales-tickets', 'chat-features'] as const,
    mustChangePassword: false,
  }

  const user = found.docs[0]
  if (user) {
    if (user.role === 'admin') {
      console.error(`${email} is an admin account. Use a dedicated service user (default chatbot@infoloop.co) so the website never holds an admin key.`)
      process.exit(1)
    }
    await payload.update({ collection: 'users', id: user.id, data: { ...access, categories: [...access.categories] } as never })
  } else {
    await payload.create({
      collection: 'users',
      data: {
        email,
        name: 'Website (chatbot and build)',
        // Nobody logs in as this user; the password only exists because the collection requires one.
        password: crypto.randomBytes(24).toString('base64url'),
        ...access,
        categories: [...access.categories],
      } as never,
    })
  }

  console.log(apiKey)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
