import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sitePort = process.env.SITE_PORT || '3000'
const debuggingPort = 9356
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))
const profile = await mkdtemp(join(tmpdir(), 'rasheed-approved-hero-'))
const screenshotDirectory = new URL('../screenshots/hero/', import.meta.url)
const frameDirectory = new URL('../screenshots/hero/loop-boundary-frames/', import.meta.url)
const recordingPath = new URL('../screenshots/hero/approved-loop-boundary.webm', import.meta.url)
const reportPath = new URL('../artifacts/hero-approved-verification.json', import.meta.url)

await mkdir(screenshotDirectory, { recursive: true })
await rm(frameDirectory, { recursive: true, force: true })
await mkdir(frameDirectory, { recursive: true })

const browser = spawn(chrome, [
  '--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--disable-breakpad', '--disable-crash-reporter',
  '--disable-features=Vulkan,UseSkiaRenderer,CalculateNativeWinOcclusion', '--use-angle=swiftshader', '--no-first-run',
  `--remote-debugging-port=${debuggingPort}`, '--remote-allow-origins=*', `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' })

for (let attempt = 0; attempt < 60; attempt += 1) {
  try { if ((await fetch(`http://127.0.0.1:${debuggingPort}/json/version`)).ok) break } catch {}
  await delay(250)
}

const target = await fetch(`http://127.0.0.1:${debuggingPort}/json/new?${encodeURIComponent(`http://localhost:${sitePort}/`)}`, { method: 'PUT' }).then(response => response.json())
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
let commandId = 0
const pending = new Map()
const requests = new Map()
const failures = []
const exceptions = []

socket.onmessage = event => {
  const message = JSON.parse(event.data)
  if (message.method === 'Network.requestWillBeSent') requests.set(message.params.requestId, message.params.request.url)
  if (message.method === 'Network.loadingFailed') failures.push({ url: requests.get(message.params.requestId), error: message.params.errorText })
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text)
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message)
    pending.delete(message.id)
  }
}

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++commandId
  pending.set(id, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result))
  socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value
const navigate = async (width, height, reduced = false, path = '/') => {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768, screenWidth: width, screenHeight: height })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] })
  await send('Page.navigate', { url: `http://localhost:${sitePort}${path}` })
  await delay(900)
  if (path === '/') await evaluate(`(async()=>{for(let i=0;i<50;i++){const root=document.querySelector('.home-hero-sequence');if(root?.dataset.filmstripCycle)return true;await new Promise(resolve=>setTimeout(resolve,100))}return false})()`)
}
const capture = async name => {
  const result = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false })
  await writeFile(new URL(`${name}.png`, screenshotDirectory), Buffer.from(result.data, 'base64'))
}

try {
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Network.enable')

  const viewports = []
  for (const [width, height] of [[1920, 1080], [1440, 900], [1024, 768], [768, 1024], [390, 844], [360, 800]]) {
    await navigate(width, height)
    viewports.push(await evaluate(`(()=>{
      const root=document.querySelector('.home-hero-sequence');
      const viewport=document.querySelector('.hero-filmstrip-viewport');
      const primary=document.querySelector('.hero-filmstrip-group:not([data-duplicate])');
      const panels=[...primary.querySelectorAll('.hero-film-panel')];
      const allPanels=[...document.querySelectorAll('.hero-film-panel')];
      const stripRect=viewport.getBoundingClientRect();
      const panelHeights=panels.map(panel=>panel.getBoundingClientRect().height);
      const ratioErrors=panels.map(panel=>{const image=panel.querySelector('img');const rect=panel.getBoundingClientRect();return Math.abs(rect.width-(rect.height*Number(image.getAttribute('width'))/Number(image.getAttribute('height'))));});
      const joinErrors=[];for(let i=1;i<allPanels.length;i++)joinErrors.push(Math.abs(allPanels[i].getBoundingClientRect().left-allPanels[i-1].getBoundingClientRect().right));
      const styles=getComputedStyle(panels[0]);const imageStyles=getComputedStyle(panels[0].querySelector('img'));
      const sources=panels.map(panel=>new URL(panel.querySelector('img').getAttribute('src'),location.href).searchParams.get('url')||panel.querySelector('img').getAttribute('src'));
      return {width:${width},height:${height},heroHeight:Math.round(root.getBoundingClientRect().height),stripHeight:Math.round(stripRect.height),items:panels.length,groups:document.querySelectorAll('.hero-filmstrip-group').length,uniqueSources:new Set(sources).size,usesStandardized:sources.some(source=>source.includes('hero-standardized')),heightError:Math.max(...panelHeights.map(value=>Math.abs(value-stripRect.height))),ratioError:Math.max(...ratioErrors),joinError:Math.max(...joinErrors),padding:styles.padding,border:styles.borderWidth,radius:styles.borderRadius,imageMaxWidth:imageStyles.maxWidth,imageObjectFit:imageStyles.objectFit,imageFilter:imageStyles.filter,imageTransform:imageStyles.transform,pageOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
    })()`))
  }

  await navigate(1440, 900)
  await capture('approved-desktop-1440')
  const motion = await evaluate(`(async()=>{const viewport=document.querySelector('.hero-filmstrip-viewport');const before=viewport.scrollLeft;await new Promise(resolve=>setTimeout(resolve,1500));const after=viewport.scrollLeft;const button=document.querySelector('.hero-motion-toggle');button.click();await new Promise(resolve=>setTimeout(resolve,80));const pauseStart=viewport.scrollLeft;await new Promise(resolve=>setTimeout(resolve,650));const pauseEnd=viewport.scrollLeft;button.click();await new Promise(resolve=>setTimeout(resolve,80));const resumeStart=viewport.scrollLeft;await new Promise(resolve=>setTimeout(resolve,650));const resumeEnd=viewport.scrollLeft;return {pixelsPerSecond:(after-before)/1.5,paused:Math.abs(pauseEnd-pauseStart)<1,resumed:resumeEnd>resumeStart};})()`)

  const dragGeometry = await evaluate(`(()=>{const viewport=document.querySelector('.hero-filmstrip-viewport');const rect=viewport.getBoundingClientRect();window.__heroDragEvents=[];for(const type of ['pointerdown','pointermove','pointerup'])viewport.addEventListener(type,event=>window.__heroDragEvents.push({type,x:event.clientX,pointerType:event.pointerType}));return {x:rect.left+rect.width*.55,y:rect.top+rect.height*.5,before:viewport.scrollLeft,url:location.href};})()`)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: dragGeometry.x, y: dragGeometry.y, pointerType: 'mouse' })
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: dragGeometry.x, y: dragGeometry.y, button: 'left', buttons: 1, clickCount: 1, pointerType: 'mouse' })
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: dragGeometry.x - 144, y: dragGeometry.y, button: 'left', buttons: 1, pointerType: 'mouse' })
  await delay(40)
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: dragGeometry.x - 144, y: dragGeometry.y, button: 'left', buttons: 0, clickCount: 1, pointerType: 'mouse' })
  await delay(120)
  const drag = await evaluate(`({after:document.querySelector('.hero-filmstrip-viewport').scrollLeft,url:location.href,events:window.__heroDragEvents,dragSuppressed:location.href===${JSON.stringify(dragGeometry.url)}})`)

  const keyboard = await evaluate(`(async()=>{const link=document.querySelector('.hero-filmstrip-group:not([data-duplicate]) .hero-film-panel');link.focus();await new Promise(resolve=>setTimeout(resolve,80));const viewport=document.querySelector('.hero-filmstrip-viewport');const before=viewport.scrollLeft;await new Promise(resolve=>setTimeout(resolve,500));return {focused:document.activeElement===link,stationary:Math.abs(viewport.scrollLeft-before)<1,visible:link.getBoundingClientRect().right>0&&link.getBoundingClientRect().left<innerWidth,duplicateTabs:[...document.querySelectorAll('[data-duplicate="true"] .hero-film-panel')].every(item=>item.tabIndex===-1)};})()`)

  await navigate(390, 844)
  await capture('approved-mobile-390')
  const touchGeometry = await evaluate(`(()=>{const viewport=document.querySelector('.hero-filmstrip-viewport');const rect=viewport.getBoundingClientRect();return {x:rect.left+rect.width*.7,y:rect.top+rect.height*.5,before:viewport.scrollLeft};})()`)
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touchGeometry.x, y: touchGeometry.y }] })
  for (let step = 1; step <= 5; step += 1) {
    await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: touchGeometry.x - step * 24, y: touchGeometry.y }] })
    await delay(20)
  }
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await delay(100)
  const touchSwipe = await evaluate(`(()=>{const after=document.querySelector('.hero-filmstrip-viewport').scrollLeft;return {after,moved:Math.abs(after-${touchGeometry.before})>90,verticalScrollPreserved:scrollY===0};})()`)

  await navigate(390, 844, true)
  const reducedMotion = await evaluate(`(async()=>{await new Promise(resolve=>setTimeout(resolve,100));const root=document.querySelector('.home-hero-sequence');const viewport=document.querySelector('.hero-filmstrip-viewport');const before=viewport.scrollLeft;await new Promise(resolve=>setTimeout(resolve,700));const after=viewport.scrollLeft;return {mode:root.dataset.motion,startsPaused:Math.abs(after-before)<1,controlPressed:document.querySelector('.hero-motion-toggle').getAttribute('aria-pressed')==='true',manuallyScrollable:viewport.scrollWidth>viewport.clientWidth};})()`)

  await navigate(1440, 900)
  await evaluate(`(async()=>{const button=document.querySelector('.hero-motion-toggle');button.click();await new Promise(resolve=>setTimeout(resolve,80));const root=document.querySelector('.home-hero-sequence');const viewport=document.querySelector('.hero-filmstrip-viewport');const cycle=Number(root.dataset.filmstripCycle);viewport.scrollLeft=cycle*1.5-24;await new Promise(resolve=>setTimeout(resolve,80));button.click();await new Promise(resolve=>setTimeout(resolve,80));})()`)
  const seamSamples = []
  const seamRawPositions = []
  for (let frame = 0; frame < 42; frame += 1) {
    const started = performance.now()
    const screenshot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82, fromSurface: true, captureBeyondViewport: false })
    await writeFile(new URL(`frame-${String(frame).padStart(3, '0')}.jpg`, frameDirectory), Buffer.from(screenshot.data, 'base64'))
    seamSamples.push(await evaluate(`(()=>{const root=document.querySelector('.home-hero-sequence');const viewport=document.querySelector('.hero-filmstrip-viewport');const cycle=Number(root.dataset.filmstripCycle);return ((viewport.scrollLeft%cycle)+cycle)%cycle;})()`))
    seamRawPositions.push(await evaluate(`document.querySelector('.hero-filmstrip-viewport').scrollLeft`))
    await delay(Math.max(0, 83 - (performance.now() - started)))
  }
  const seamDeltas = seamSamples.slice(1).map((value,index) => Math.min(Math.abs(value-seamSamples[index]), Number.MAX_SAFE_INTEGER))
  const loopSeam = { maxModuloStep: Math.max(...seamDeltas.filter(value => value < 1000)), crossedBoundary: seamRawPositions.some((value,index) => index > 0 && value < seamRawPositions[index - 1] - 1000) }

  const routeSmoke = []
  for (const path of ['/services', '/work', '/about', '/contact']) {
    await navigate(390, 844, false, path)
    routeSmoke.push(await evaluate(`({path:location.pathname,hasContent:document.body.innerText.trim().length>100,pageOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,errorOverlay:Boolean(document.querySelector('[data-nextjs-dialog],#webpack-dev-server-client-overlay'))})`))
  }

  const report = { inventory: { projects: 11, images: 21 }, viewports, motion, drag: { ...drag, moved: Math.abs(drag.after-dragGeometry.before)>100 }, touchSwipe, keyboard, reducedMotion, loopSeam, routeSmoke, exceptions: [...new Set(exceptions)], networkFailures: [...new Map(failures.map(failure=>[JSON.stringify(failure),failure])).values()] }
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify(report, null, 2))
} finally {
  socket.close()
  browser.kill()
  browser.unref()
}

await new Promise((resolve, reject) => {
  const encoder = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '12', '-i', new URL('frame-%03d.jpg', frameDirectory).pathname.slice(1), '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-pix_fmt', 'yuv420p', recordingPath.pathname.slice(1)], { stdio: 'inherit' })
  encoder.once('exit', code => code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`)))
})
await rm(frameDirectory, { recursive: true, force: true })
console.log(`Recording: ${recordingPath.pathname}`)
