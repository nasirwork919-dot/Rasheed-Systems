import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const port = 9334
const sitePort = process.env.SITE_PORT || '3000'
const browserProfile = await mkdtemp(join(tmpdir(), 'rasheed-audit-'))
const browser = spawn(chrome, ['--headless=new','--no-sandbox','--disable-gpu-sandbox','--disable-breakpad','--disable-crash-reporter','--disable-features=Vulkan,UseSkiaRenderer,CalculateNativeWinOcclusion','--use-angle=swiftshader','--no-first-run',`--remote-debugging-port=${port}`,'--remote-allow-origins=*',`--user-data-dir=${browserProfile}`,'about:blank'], { stdio: 'ignore' })
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
for (let index = 0; index < 40; index += 1) { try { if ((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) break } catch {}; await delay(250) }

const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(`http://localhost:${sitePort}/`)}`, { method: 'PUT' }).then(response => response.json())
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
let id = 0
const pending = new Map()
socket.onmessage = event => { const message = JSON.parse(event.data); if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id) } }
const send = (method, params = {}) => new Promise((resolve, reject) => { const requestId = ++id; pending.set(requestId, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result)); socket.send(JSON.stringify({ id: requestId, method, params })) })
const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value
const navigate = async (route, width) => { await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600, screenWidth: width, screenHeight: 900 }); await send('Page.navigate', { url: `http://localhost:${sitePort}${route}` }); await delay(800) }

try {
  await send('Page.enable')
  const routes = ['/','/services','/work','/about','/contact','/work/scholarsurge','/work/strive-soccer-academy']
  const overflow = []
  for (const route of routes) { await navigate(route, 360); overflow.push({ route, width: 360, ...(await evaluate(`({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,culprits:[...document.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).slice(0,3).map(e=>e.className||e.tagName)})`)) }) }
  for (const width of [768,1024,1280]) { await navigate('/', width); overflow.push({ route: '/', width, ...(await evaluate('({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})')) }) }

  await navigate('/', 390)
  const menu = await evaluate(`(async()=>{const button=document.querySelector('.menu-toggle');button.click();await new Promise(r=>setTimeout(r,450));const opened={expanded:button.getAttribute('aria-expanded'),locked:document.body.classList.contains('menu-open'),focus:document.activeElement?.className};document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await new Promise(r=>setTimeout(r,50));return {...opened,closed:button.getAttribute('aria-expanded')}})()`)

  await navigate('/contact', 390)
  const form = await evaluate(`(async()=>{document.querySelector('.contact-form').requestSubmit();await new Promise(r=>setTimeout(r,50));return {errors:document.querySelectorAll('.field-error').length,invalid:document.querySelectorAll('[aria-invalid="true"]').length}})()`)

  await navigate('/work/scholarsurge', 390)
  const lightbox = await evaluate(`(async()=>{document.querySelector('.gallery-item button').click();await new Promise(r=>setTimeout(r,50));const opened=Boolean(document.querySelector('[role="dialog"]'));window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await new Promise(r=>setTimeout(r,50));return {opened,closed:!document.querySelector('[role="dialog"]')}})()`)

  await navigate('/', 1440)
  const reverseScroll = await evaluate(`(async()=>{
    document.documentElement.style.scrollBehavior='auto';
    const hero=document.querySelector('.home-hero-sequence');const distance=hero.offsetHeight-innerHeight;
    scrollTo(0,distance*.75);await new Promise(r=>setTimeout(r,500));
    const forward=document.querySelector('[data-active="true"] h2')?.textContent;
    scrollTo(0,distance*.25);await new Promise(r=>setTimeout(r,500));
    return {forward,reverse:document.querySelector('[data-active="true"] h2')?.textContent};
  })()`)
  const projectLinks = await evaluate(`[...document.querySelectorAll('.cinematic-panel')].map(link=>({href:link.href,label:link.textContent.includes('Open')}))`)
  await evaluate(`document.querySelector('.skip-link').focus()`)
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9})
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9})
  const keyboard = await evaluate(`({tag:document.activeElement?.tagName,href:document.activeElement?.getAttribute('href'),label:document.activeElement?.getAttribute('aria-label')||document.activeElement?.textContent?.trim()})`)
  await evaluate(`document.querySelector('.cinematic-button-primary').click()`)
  await delay(700)
  const awayPath = await evaluate(`location.pathname`)
  await evaluate(`history.back()`)
  await delay(900)
  const routeReturn = await evaluate(`({awayPath:${JSON.stringify(awayPath)},returnPath:location.pathname,hero:Boolean(document.querySelector('.home-hero-sequence')),mode:document.querySelector('.home-hero-sequence')?.dataset.mode})`)

  await navigate('/', 390)
  const mobileCarousel = await evaluate(`(async()=>{
    document.querySelector('.hero-carousel-controls button:last-child').click();await new Promise(r=>setTimeout(r,80));
    const afterButton=document.querySelector('[data-active="true"] h2')?.textContent;
    const track=document.querySelector('.hero-project-track');
    track.dispatchEvent(new PointerEvent('pointerdown',{clientX:300,bubbles:true}));
    track.dispatchEvent(new PointerEvent('pointerup',{clientX:100,bubbles:true}));
    await new Promise(r=>setTimeout(r,80));
    return {afterButton,afterSwipe:document.querySelector('[data-active="true"] h2')?.textContent};
  })()`)

  await send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false, screenWidth: 1024, screenHeight: 768 })
  await delay(120)
  const resize = await evaluate(`({mode:document.querySelector('.home-hero-sequence')?.dataset.mode,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})`)

  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  await navigate('/', 390)
  const reducedMotion = await evaluate(`({
    matches:matchMedia('(prefers-reduced-motion: reduce)').matches,
    heroMode:document.querySelector('.home-hero-sequence')?.dataset.mode,
    stickyPosition:getComputedStyle(document.querySelector('.home-hero-sticky')).position,
    trackPosition:getComputedStyle(document.querySelector('.hero-project-track')).position,
    projectCount:document.querySelectorAll('.cinematic-panel').length,
    revealTransforms:[...document.querySelectorAll('.reveal')].every(element=>getComputedStyle(element).transform==='none')
  })`)
  console.table(overflow)
  console.log({ menu, form, lightbox, reverseScroll, projectLinks, keyboard, routeReturn, mobileCarousel, resize, reducedMotion })
} finally { socket.close(); browser.kill(); browser.unref() }
