const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'node_modules', 'pg', 'lib', 'stream.js')

if (!fs.existsSync(file)) {
  console.log('pg/lib/stream.js not found, skipping patch')
  process.exit(0)
}

let src = fs.readFileSync(file, 'utf8')

const target = "    const { CloudflareSocket } = require('pg-cloudflare')"
const replacement = [
  "    let CloudflareSocket",
  "    try { ;({ CloudflareSocket } = require('pg-cloudflare')) } catch (e) {}",
].join('\n')

if (src.includes(replacement)) {
  console.log('pg patch already applied')
  process.exit(0)
}

if (!src.includes(target)) {
  console.log('pg patch target not found, skipping')
  process.exit(0)
}

fs.writeFileSync(file, src.replace(target, replacement))
console.log('pg patch applied: pg-cloudflare require wrapped in try/catch')
