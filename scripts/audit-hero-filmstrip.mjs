import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const port = 9348
const sitePort = process.env.SITE_PORT || '3000'
const browserProfile = await mkdtemp(join(tmpdir(), 'rasheed-hero-audit-'))
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

const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(`http://localhost:${sitePort}/`)}`, { method: 'PUT' }).then(response => response.json())
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
let id = 0
const pending = new Map()
const browserErrors = []
socket.onmessage = event => {
  const message = JSON.parse(event.data)
  if (message.method === 'Runtime.exceptionThrown') browserErrors.push(message.params.exceptionDetails.text)
  if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') browserErrors.push(message.params.entry.text)
  if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id) }
}
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id
  pending.set(requestId, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result))
  socket.send(JSON.stringify({ id: requestId, method, params }))
})
const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value
const navigate = async (width, height, reduced = false) => {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768, screenWidth: width, screenHeight: height })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] })
  await send('Page.navigate', { url: `http://localhost:${sitePort}/` })
  await delay(1200)
  await evaluate(`(async()=>{for(let i=0;i<40;i++){if(document.querySelector('.home-hero-sequence')?.dataset.motion)return true;await new Promise(resolve=>setTimeout(resolve,100))}return false})()`)
}

try {
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable')
  const sizes = []
  for (const [width, height] of [[1440, 900], [1920, 1080], [1280, 800], [1024, 768], [430, 932], [390, 844], [375, 812], [360, 800]]) {
    await navigate(width, height)
    sizes.push(await evaluate(`(()=>{
      const hero=document.querySelector('.home-hero-sequence');
      const viewport=document.querySelector('.hero-filmstrip-viewport');
      const panel=document.querySelector('.hero-film-panel');
      const band=document.querySelector('.hero-identity-band');
      return {width:${width},height:${height},heroHeight:Math.round(hero.getBoundingClientRect().height),filmHeight:Math.round(viewport.getBoundingClientRect().height),bandHeight:Math.round(band.getBoundingClientRect().height),panelWidth:Math.round(panel.getBoundingClientRect().width),documentOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,h1Count:hero.querySelectorAll('h1').length,groups:hero.querySelectorAll('.hero-filmstrip-group').length,panels:hero.querySelectorAll('.hero-film-panel').length,motion:hero.dataset.motion};
    })()`))
  }

  await navigate(1440, 900)
  const desktopMotion = await evaluate(`(async()=>{
    const hero=document.querySelector('.home-hero-sequence');const track=document.querySelector('.hero-filmstrip');
    const before={phase:Number(hero.dataset.filmstripPhase),transform:track.style.transform};
    await new Promise(resolve=>setTimeout(resolve,1200));
    const after={phase:Number(hero.dataset.filmstripPhase),transform:track.style.transform};
    const labels=[...document.querySelectorAll('.hero-filmstrip-group')].map(group=>[...group.querySelectorAll('h2')].map(item=>item.textContent).join('|'));
    const duplicateTabs=[...document.querySelectorAll('[data-duplicate="true"] a,[data-duplicate="true"] button')].every(control=>control.tabIndex===-1);
    return {before,after,moved:after.phase!==before.phase,identicalGroups:new Set(labels).size===1,duplicateTabs};
  })()`)

  await navigate(390, 844)
  const mobileMotion = await evaluate(`(async()=>{
    const viewport=document.querySelector('.hero-filmstrip-viewport');
    const before=viewport.scrollLeft;
    await new Promise(resolve=>setTimeout(resolve,1200));
    const after=viewport.scrollLeft;
    viewport.dispatchEvent(new TouchEvent('touchstart',{bubbles:true}));
    const pauseStart=viewport.scrollLeft;
    await new Promise(resolve=>setTimeout(resolve,450));
    const pauseEnd=viewport.scrollLeft;
    viewport.dispatchEvent(new TouchEvent('touchend',{bubbles:true}));
    await new Promise(resolve=>setTimeout(resolve,1800));
    const final=viewport.scrollLeft;
    return {before,after,pauseStart,pauseEnd,final,moved:after>before,paused:Math.abs(pauseEnd-pauseStart)<1,resumed:final>pauseEnd};
  })()`)

  await navigate(1440, 900, true)
  const reducedMotion = await evaluate(`(async()=>{
    const hero=document.querySelector('.home-hero-sequence');const track=document.querySelector('.hero-filmstrip');
    const before=track.style.transform;const phase=hero.dataset.filmstripPhase;
    await new Promise(resolve=>setTimeout(resolve,900));
    return {mode:hero.dataset.motion,transform:track.style.transform,stopped:phase===hero.dataset.filmstripPhase,hiddenDuplicates:[...document.querySelectorAll('[data-duplicate="true"]')].every(group=>getComputedStyle(group).display==='none'),accessibleProjects:document.querySelectorAll('.hero-filmstrip-group:not([data-duplicate]) .hero-film-panel').length,autoplayDisabled:document.querySelector('.hero-motion-toggle')?.disabled};
  })()`)

  await navigate(1440, 900)
  const gallery = await evaluate(`(async()=>{
    const primary=document.querySelector('.hero-filmstrip-group:not([data-duplicate])');
    const images=[...primary.querySelectorAll('img')];
    const responses=await Promise.all(images.map(image=>fetch(image.currentSrc||image.src).then(response=>response.ok)));
    const panels=[...primary.querySelectorAll('.hero-film-panel')];
    const heights=new Set(panels.map(panel=>Math.round(panel.getBoundingClientRect().height)));
    const toggle=document.querySelector('.hero-motion-toggle');
    toggle.click();await new Promise(resolve=>setTimeout(resolve,50));const paused=toggle.getAttribute('aria-pressed')==='true';
    primary.querySelector('.hero-film-actions button').click();await new Promise(resolve=>setTimeout(resolve,100));
    const dialog=document.querySelector('[role="dialog"]');
    const dialogTitle=dialog?.querySelector('h2')?.textContent;
    dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await new Promise(resolve=>setTimeout(resolve,50));
    return {items:panels.length,allImageRequestsOk:responses.every(Boolean),equalHeight:heights.size===1,paused,dialogOpened:Boolean(dialog),dialogTitle,dialogClosed:!document.querySelector('[role="dialog"]')};
  })()`)

  console.table(sizes)
  console.log(JSON.stringify({ desktopMotion, mobileMotion, reducedMotion, gallery, browserErrors:[...new Set(browserErrors)] }, null, 2))
} finally {
  socket.close()
  browser.kill()
  browser.unref()
}
