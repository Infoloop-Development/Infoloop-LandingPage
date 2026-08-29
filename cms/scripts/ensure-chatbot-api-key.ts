import 'dotenv/config'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const email = process.argv[2] || 'admin@infoloop.co'

async function main() {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  const user = found.docs[0]
  if (!user) {
    console.error(`No user: ${email}`)
    process.exit(1)
  }

  const apiKey = crypto.randomBytes(24).toString('hex')

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      enableAPIKey: true,
      apiKey,
      role: 'admin',
      accessMode: 'full',
    },
  })

  console.log(apiKey)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
