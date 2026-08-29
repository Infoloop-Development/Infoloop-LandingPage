import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const email = process.argv[2] || 'admin@infoloop.co'
const password = process.argv[3] || 'Infoloop@Dev2026'

async function main() {
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
    data: { password, mustChangePassword: false },
  })
  console.log(`Password reset for ${email}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
