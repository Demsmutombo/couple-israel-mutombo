import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.join(process.cwd(), 'public', 'img')
const exts = new Set(['.jpg', '.jpeg', '.png'])

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full)
  }
}

const files = []
walk(root, files)

let before = 0
let afterJpeg = 0
let webpTotal = 0

for (const file of files) {
  before += fs.statSync(file).size

  const img = sharp(file, { failOn: 'none' })
  const meta = await img.metadata()
  const width = meta.width && meta.width > 1600 ? 1600 : meta.width

  const tmp = `${file}.tmp.jpg`
  await img
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 32, mozjpeg: true })
    .toFile(tmp)
  fs.renameSync(tmp, file)

  afterJpeg += fs.statSync(file).size

  const webpOut = file.replace(/\.(jpe?g|png)$/i, '.webp')
  await sharp(file, { failOn: 'none' }).webp({ quality: 45, effort: 6 }).toFile(webpOut)
  webpTotal += fs.statSync(webpOut).size
}

console.log(`files=${files.length}`)
console.log(`beforeMB=${(before / 1048576).toFixed(2)}`)
console.log(`afterJpegMB=${(afterJpeg / 1048576).toFixed(2)}`)
console.log(`webpMB=${(webpTotal / 1048576).toFixed(2)}`)
