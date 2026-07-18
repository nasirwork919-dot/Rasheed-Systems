/**
 * Regenerates OG image + favicon PNGs for the Clay palette.
 * Run from project root: node gen-assets.js
 */
const sharp = require('sharp')
const path = require('path')

const OUT = path.join(__dirname, 'public')

/* ─── OG image 1200×630 ──────────────────────────────────── */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="80%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#E0764F" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#231C17" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#231C17"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Fine grid lines -->
  <rect x="0" y="0" width="1200" height="1" fill="rgba(255,255,255,0.07)"/>
  <rect x="0" y="629" width="1200" height="1" fill="rgba(255,255,255,0.07)"/>
  <rect x="0" y="0" width="1" height="630" fill="rgba(255,255,255,0.07)"/>
  <rect x="1199" y="0" width="1" height="630" fill="rgba(255,255,255,0.07)"/>

  <!-- Logo mark -->
  <rect x="60" y="52" width="64" height="64" rx="14" fill="#B84A2C"/>
  <text x="92" y="104" font-family="Georgia, serif" font-weight="700" font-size="46" fill="#F3ECE2" text-anchor="middle">R</text>
  <text x="127" y="72" font-family="Georgia, serif" font-weight="700" font-size="20" fill="#E0764F">2</text>

  <!-- Brand name -->
  <text x="148" y="96" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="28" fill="#F3ECE2" letter-spacing="0.5">Rasheed Systems</text>

  <!-- Divider -->
  <rect x="60" y="172" width="48" height="2" rx="1" fill="#B84A2C" opacity="0.8"/>

  <!-- Main headline -->
  <text x="60" y="280" font-family="Georgia, serif" font-weight="700" font-size="82" fill="#F3ECE2" letter-spacing="-2">We build the</text>
  <text x="60" y="376" font-family="Georgia, serif" font-weight="700" font-size="82" fill="#E0764F" letter-spacing="-2">systems</text>
  <text x="60" y="472" font-family="Georgia, serif" font-weight="700" font-size="82" fill="#F3ECE2" letter-spacing="-2">that run business.</text>

  <!-- Tagline -->
  <text x="60" y="560" font-family="'Courier New', monospace" font-size="18" fill="#B3A695" letter-spacing="2">AI AGENTS · AUTOMATION · SAAS · GOHIGHLEVEL · CRMS</text>

  <!-- URL -->
  <text x="1140" y="580" font-family="'Courier New', monospace" font-size="16" fill="#7C6052" text-anchor="end" letter-spacing="1">rasheedsystems.com</text>
</svg>`

/* ─── Favicon 512×512 ──────────────────────────────────── */
const faviconSvg = (size) => {
  const r = size * 0.18   // corner radius
  const fs = size * 0.54  // R font size
  const ss = size * 0.22  // superscript font size
  const cx = size * 0.44
  const cy = size * 0.68
  const sx = size * 0.78
  const sy = size * 0.25
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#231C17"/>
  <text x="${cx}" y="${cy}"
    font-family="Georgia,'Times New Roman',serif"
    font-weight="700" font-size="${fs}"
    fill="#F3ECE2" text-anchor="middle">${'R'}</text>
  <text x="${sx}" y="${sy}"
    font-family="Georgia,'Times New Roman',serif"
    font-weight="700" font-size="${ss}"
    fill="#E0764F" text-anchor="middle">${'2'}</text>
</svg>`
}

async function main() {
  // OG image
  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(OUT, 'og-image.png'))
  console.log('✓ og-image.png (1200×630)')

  // Favicon 512
  await sharp(Buffer.from(faviconSvg(512)))
    .png()
    .toFile(path.join(OUT, 'logo-mark-512.png'))
  console.log('✓ logo-mark-512.png')

  // Favicon 180 (apple touch icon)
  await sharp(Buffer.from(faviconSvg(180)))
    .png()
    .toFile(path.join(OUT, 'favicon-180.png'))
  console.log('✓ favicon-180.png')

  // Favicon 32
  await sharp(Buffer.from(faviconSvg(32)))
    .png()
    .toFile(path.join(OUT, 'favicon-32.png'))
  console.log('✓ favicon-32.png')

  // app/icon.png (same as 512)
  await sharp(Buffer.from(faviconSvg(512)))
    .png()
    .toFile(path.join(__dirname, 'app', 'icon.png'))
  console.log('✓ app/icon.png')

  console.log('\nAll assets regenerated with Clay palette.')
}

main().catch(err => { console.error(err); process.exit(1) })
