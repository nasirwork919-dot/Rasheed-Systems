import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const port = 9333
const sitePort = process.env.SITE_PORT || '3000'
const output = new URL('../screenshots/', import.meta.url)
const browserProfile = await mkdtemp(join(tmpdir(), 'rasheed-capture-'))
const routes = [
  ['home', ''],
  ['services', 'services'],
  ['work', 'work'],
  ['about', 'about'],
  ['contact', 'contact'],
  ['scholarsurge', 'work/scholarsurge'],
  ['strive', 'work/strive-soccer-academy'],
]

await mkdir(output, { recursive: true })
const browser = spawn(chrome, [
  '--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--disable-breakpad', '--disable-crash-reporter',
  '--disable-features=Vulkan,UseSkiaRenderer,CalculateNativeWinOcclusion',
  '--use-angle=swiftshader', '--no-first-run', `--remote-debugging-port=${port}`,
  '--remote-allow-origins=*', `--user-data-dir=${browserProfile}`, 'about:blank',
], { stdio: 'ignore' })

const waitForBrowser = async () => {
  for (let index = 0; index < 40; index += 1) {
    try { const response = await fetch(`http://127.0.0.1:${port}/json/version`); if (response.ok) return }
    catch {}
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  throw new Error('Chrome debugging endpoint did not start')
}

const capture = async (name, route, width, height, mode, prepare = '') => {
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(`http://localhost:${sitePort}/${route}`)}`, { method: 'PUT' }).then(response => response.json())
  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  let id = 0
  const pending = new Map()
  socket.onmessage = event => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id) }
  }
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id
    pending.set(requestId, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result))
    socket.send(JSON.stringify({ id: requestId, method, params }))
  })
  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: mode === 'mobile', screenWidth: width, screenHeight: height })
  await send('Page.navigate', { url: `http://localhost:${sitePort}/${route}` })
  await new Promise(resolve => setTimeout(resolve, 1800))
  if (prepare) {
    await send('Runtime.evaluate', { expression: prepare })
    await new Promise(resolve => setTimeout(resolve, 700))
  }
  const measurement = await send('Runtime.evaluate', { expression: 'JSON.stringify({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})', returnByValue: true })
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true })
  await writeFile(new URL(`${name}-${mode}.png`, output), Buffer.from(screenshot.data, 'base64'))
  socket.close()
  await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`)
  return { page: name, mode, ...JSON.parse(measurement.result.value) }
}

try {
  await waitForBrowser()
  const results = []
  if (!process.env.EXTRA_ONLY) {
    for (const [name, route] of routes) {
      results.push(await capture(name, route, 1440, 1000, 'desktop'))
      results.push(await capture(name, route, 390, 844, 'mobile'))
    }
  }
  const jumpTo = selector => `(()=>{document.documentElement.style.scrollBehavior='auto';const target=document.querySelector('${selector}');scrollTo(0,scrollY+target.getBoundingClientRect().top-72)})()`
  results.push(await capture('home-resolved', '', 1440, 1000, 'desktop', `document.documentElement.style.scrollBehavior='auto';scrollTo(0, document.querySelector('.home-hero-sequence').offsetHeight - innerHeight)`))
  results.push(await capture('services-diagram', 'services', 1440, 1000, 'desktop', jumpTo('.service-detail')))
  results.push(await capture('about-timeline', 'about', 1440, 1000, 'desktop', jumpTo('.timeline-experience')))
  results.push(await capture('case-workflow', 'work/scholarsurge', 1440, 1000, 'desktop', jumpTo('.case-workflow-section')))
  console.table(results)
} finally {
  browser.kill()
  browser.unref()
}
