import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const port = 9342
const sitePort = process.env.SITE_PORT || '3000'
const output = new URL('../screenshots/hero/', import.meta.url)
const browserProfile = await mkdtemp(join(tmpdir(), 'rasheed-hero-capture-'))
const cases = [
  { name: 'desktop-1440-opening', width: 1440, height: 900, progress: 0 },
  { name: 'desktop-1440-project-03', width: 1440, height: 900, progress: .5 },
  { name: 'desktop-1440-end', width: 1440, height: 900, progress: 1.25 },
  { name: 'desktop-1920-opening', width: 1920, height: 1080, progress: 0 },
  { name: 'laptop-1280', width: 1280, height: 800, progress: .25 },
  { name: 'tablet-1024-landscape', width: 1024, height: 768, progress: .5 },
  { name: 'tablet-834-portrait', width: 834, height: 1194, progress: .5 },
  { name: 'tablet-768-portrait', width: 768, height: 1024, progress: .5 },
  { name: 'mobile-430', width: 430, height: 932, progress: 0 },
  { name: 'mobile-390', width: 390, height: 844, progress: 0 },
  { name: 'mobile-375', width: 375, height: 812, progress: 0 },
  { name: 'mobile-360', width: 360, height: 800, progress: 0 },
]

await mkdir(output, { recursive: true })
const browser = spawn(chrome, [
  '--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--disable-breakpad', '--disable-crash-reporter',
  '--disable-features=Vulkan,UseSkiaRenderer,CalculateNativeWinOcclusion',
  '--use-angle=swiftshader', '--no-first-run', `--remote-debugging-port=${port}`,
  '--remote-allow-origins=*', `--user-data-dir=${browserProfile}`, 'about:blank',
], { stdio: 'ignore' })
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

for (let attempt = 0; attempt < 40; attempt += 1) {
  try { if ((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) break } catch {}
  await delay(250)
}

const createSession = async () => {
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(`http://localhost:${sitePort}/`)}`, { method: 'PUT' }).then(response => response.json())
  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  let id = 0
  const pending = new Map()
  const errors = []
  socket.onmessage = event => {
    const message = JSON.parse(event.data)
    if (message.method === 'Runtime.exceptionThrown' || message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params)
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id) }
  }
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id
    pending.set(requestId, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result))
    socket.send(JSON.stringify({ id: requestId, method, params }))
  })
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable')
  return { target, socket, send, errors }
}

const capture = async (test, reduced = false) => {
  const session = await createSession()
  const { target, socket, send, errors } = session
  await send('Emulation.setDeviceMetricsOverride', { width: test.width, height: test.height, deviceScaleFactor: 1, mobile: test.width < 768, screenWidth: test.width, screenHeight: test.height })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] })
  await send('Page.navigate', { url: `http://localhost:${sitePort}/` })
  await delay(1500)
  if (test.progress) {
    await send('Runtime.evaluate', { expression: `document.documentElement.style.scrollBehavior='auto';(()=>{const hero=document.querySelector('.home-hero-sequence');scrollTo(0,(hero.offsetHeight-innerHeight)*${test.progress})})()` })
    await delay(450)
  }
  const state = await send('Runtime.evaluate', { expression: `JSON.stringify({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,scrollY,active:document.querySelector('[data-active="true"] .cinematic-panel-copy h2')?.textContent,heading:document.querySelector('#home-title')?.getBoundingClientRect().toJSON(),links:[...document.querySelectorAll('.cinematic-panel')].map(link=>link.getAttribute('href'))})`, returnByValue: true })
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true })
  await writeFile(new URL(`${test.name}.png`, output), Buffer.from(screenshot.data, 'base64'))
  socket.close(); await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`)
  return { name: test.name, ...JSON.parse(state.result.value), errors: errors.map(error => error.entry?.text || error.exceptionDetails?.text || 'Unknown browser error') }
}

try {
  const results = []
  for (const test of cases) results.push(await capture(test))
  results.push(await capture({ name: 'reduced-motion-1440', width: 1440, height: 900, progress: 0 }, true))
  console.table(results.map(({ links, heading, errors, ...result }) => ({ ...result, headingWidth: Math.round(heading?.width || 0), links: links.length, errors: errors.length })))
  console.log('Browser errors:', [...new Set(results.flatMap(result => result.errors))])
} finally {
  browser.kill()
  browser.unref()
}
