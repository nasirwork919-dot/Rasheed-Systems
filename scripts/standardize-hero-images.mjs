import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(root, 'source-assets', 'hero-image-manifest.json')
const outputDirectory = path.join(root, 'public', 'work', 'hero-standardized')
const artifactDirectory = path.join(root, 'artifacts', 'hero-standardized')
const entries = JSON.parse(await readFile(manifestPath, 'utf8'))
const canvas = { width: 1200, height: 1500 }
const horizontalMargin = 56
const verticalMargin = 56
const frameWidth = 2
const quality = 90
const backgrounds = {
  'N3rve': '#15191c',
  'JustCarSale': '#17191a',
  'Insurance Wallets': '#18202b',
  'MIA': '#211820',
  'Zain Dubai': '#182027',
  'Euro World CRM': '#17202a',
  'Chatsites': '#201a22',
  'Jwalin Jewels': '#211b18',
  'UK Therapies': '#201d1a',
  'ScholarSurge': '#17202a',
  'Strive Soccer Academy': '#171b19',
}

const hash = async file => createHash('sha256').update(await readFile(file)).digest('hex')
const escapeXml = value => value.replace(/[<>&'"]/g, character => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
}[character]))

if (!Array.isArray(entries) || entries.length !== 21) {
  throw new Error(`Expected 21 hero-image entries, received ${entries.length}`)
}

const ids = new Set()
const generatedPaths = new Set()
for (const entry of entries) {
  if (ids.has(entry.id)) throw new Error(`Duplicate image id: ${entry.id}`)
  if (generatedPaths.has(entry.generatedPath)) throw new Error(`Duplicate output path:  ${entry.generatedPath}`)
  ids.add(entry.id)
  generatedPaths.add(entry.generatedPath)
}

await mkdir(outputDirectory, { recursive: true })
await mkdir(artifactDirectory, { recursive: true })
const sourceHashes = new Map()
const report = []

for (const entry of entries) {
  const sourceFile = path.join(root, entry.sourcePath)
  const sourceHash = await hash(sourceFile)
  if (sourceHashes.has(sourceHash)) {
    throw new Error(`Duplicate source bytes: ${entry.id} and ${sourceHashes.get(sourceHash)}`)
  }
  sourceHashes.set(sourceHash, entry.id)
  const originalMetadata = await sharp(sourceFile).metadata()
  if (!originalMetadata.width || !originalMetadata.height) {
    throw new Error(`Unreadable dimensions: ${entry.sourcePath}`)
  }

  let foregroundInput = sourceFile
  let maskRecord = null
  if (entry.mask) {
    const safeBuffer = await sharp(sourceFile)
      .rotate()
      .toColourspace('srgb')
      .composite([{
        input: { create: { width: entry.mask.width, height: entry.mask.height, channels: 3, background: entry.mask.fill } },
        left: entry.mask.left,
        top: entry.mask.top,
      }])
      .webp({ quality: 96, effort: 6 })
      .toBuffer()
    const publicSourceFile = path.join(root, entry.publicSourcePath)
    await mkdir(path.dirname(publicSourceFile), { recursive: true })
    await writeFile(publicSourceFile, safeBuffer)
    foregroundInput = safeBuffer
    maskRecord = { ...entry.mask, publicSourcePath: entry.publicSourcePath, originalPreservedAt: entry.sourcePath }
  }

  const availableWidth = canvas.width - horizontalMargin * 2
  const availableHeight = canvas.height - verticalMargin * 2
  const scale = Math.min(availableWidth / originalMetadata.width, availableHeight / originalMetadata.height, 1)
  const requestedWidth = Math.max(1, Math.floor(originalMetadata.width * scale))
  const foreground = await sharp(foregroundInput)
    .rotate()
    .resize({ width: requestedWidth, withoutEnlargement: true })
    .toColourspace('srgb')
    .webp({ quality: 96, effort: 6 })
    .toBuffer()
  const foregroundMetadata = await sharp(foreground).metadata()
  const foregroundWidth = foregroundMetadata.width
  const foregroundHeight = foregroundMetadata.height
  const left = Math.floor((canvas.width - foregroundWidth) / 2)
  const top = Math.floor((canvas.height - foregroundHeight) / 2)
  const background = backgrounds[entry.projectTitle] ?? '#171b19'
  const outputFile = path.join(root, entry.generatedPath)
  await mkdir(path.dirname(outputFile), { recursive: true })
  const border = await sharp({
    create: {
      width: foregroundWidth + frameWidth * 2,
      height: foregroundHeight + frameWidth * 2,
      channels: 3,
      background: '#46504d',
    },
  }).png().toBuffer()

  await sharp({ create: { width: canvas.width, height: canvas.height, channels: 3, background } })
    .composite([
      { input: border, left: left - frameWidth, top: top - frameWidth },
      { input: foreground, left, top },
    ])
    .toColourspace('srgb')
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(outputFile)

  const outputMetadata = await sharp(outputFile).metadata()
  if (
    outputMetadata.width !== canvas.width ||
    outputMetadata.height !== canvas.height ||
    outputMetadata.format !== 'webp' ||
    outputMetadata.hasAlpha
  ) {
    throw new Error('Output verification failed: ' + entry.generatedPath)
  }

  report.push({
    id: entry.id,
    projectTitle: entry.projectTitle,
    description: entry.description,
    sourcePath: entry.sourcePath,
    generatedPath: entry.generatedPath,
    sourceSha256: sourceHash,
    generatedSha256: await hash(outputFile),
    sourceDimensions: { width: originalMetadata.width, height: originalMetadata.height },
    outputDimensions: canvas,
    foregroundDimensions: { width: foregroundWidth, height: foregroundHeight },
    scale: Number((foregroundWidth / originalMetadata.width).toFixed(6)),
    padding: {
      left,
      right: canvas.width - left - foregroundWidth,
      top,
      bottom: canvas.height - top - foregroundHeight,
    },
    frameWidth,
    background,
    format: outputMetadata.format,
    colourSpace: outputMetadata.space,
    hasAlpha: outputMetadata.hasAlpha,
    quality,
    mask: maskRecord,
  })
}

const columns = 4
const rows = Math.ceil(report.length / columns)
const cellWidth = 280
const cellHeight = 340
const sheetPadding = 32
const plateWidth = 216
const plateHeight = 270
const sheetWidth = sheetPadding * 2 + columns * cellWidth
const sheetHeight = sheetPadding * 2 + rows * cellHeight
const contactComposites = []

for (let index = 0; index < report.length; index += 1) {
  const item = report[index]
  const column = index % columns
  const row = Math.floor(index / columns)
  const x = sheetPadding + column * cellWidth + Math.floor((cellWidth - plateWidth) / 2)
  const y = sheetPadding + row * cellHeight
  const thumbnail = await sharp(path.join(root, item.generatedPath))
    .resize({ width: plateWidth, height: plateHeight, fit: 'fill' })
    .webp({ quality: 82 })
    .toBuffer()
  const label = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + cellWidth + '" height="58">',
    '<style>.p{fill:#f2eee4;font:600 14px Arial}.i{fill:#9ea39d;font:11px monospace}</style>',
    '<text class="p" x="8" y="19">' + escapeXml(String(index + 1).padStart(2, '0') + '  ' + item.projectTitle) + '</text>',
    '<text class="i" x="8" y="41">' + escapeXml(item.id) + '</text>',
    '</svg>',
  ].join('')
  contactComposites.push({ input: thumbnail, left: x, top: y })
  contactComposites.push({ input: Buffer.from(label), left: sheetPadding + column * cellWidth, top: y + plateHeight + 5 })
}

const contactSheetPath = path.join(artifactDirectory, 'contact-sheet.webp')
await sharp({ create: { width: sheetWidth, height: sheetHeight, channels: 3, background: '#0e1110' } })
  .composite(contactComposites)
  .toColourspace('srgb')
  .webp({ quality: 90, effort: 6 })
  .toFile(contactSheetPath)

const machineReport = {
  version: 1,
  inventoryCount: report.length,
  canvas,
  framing: { horizontalMargin, verticalMargin, frameWidth, foregroundUpscaling: false },
  wordpressMask: report.find(item => item.mask)?.mask ?? null,
  images: report,
}
await writeFile(path.join(artifactDirectory, 'manifest.json'), JSON.stringify(machineReport, null, 2) + '\n')

const csvHeader = 'id,project,source,source_dimensions,output,scale,padding,background,quality,mask'
const csvRows = report.map(item => [
  item.id,
  item.projectTitle,
  item.sourcePath,
  item.sourceDimensions.width + 'x' + item.sourceDimensions.height,
  item.generatedPath,
  item.scale,
  [item.padding.left, item.padding.top, item.padding.right, item.padding.bottom].join('/'),
  item.background,
  item.quality,
  item.mask ? item.mask.reason : '',
].map(value => '"' + String(value).replaceAll('"', '""') + '"').join(','))
await writeFile(path.join(artifactDirectory, 'manifest.csv'), [csvHeader, ...csvRows].join('\n') + '\n')

console.log('Generated ' + report.length + ' standardized hero plates.')
console.log('Contact sheet: ' + path.relative(root, contactSheetPath))
