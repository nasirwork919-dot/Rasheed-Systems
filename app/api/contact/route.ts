import { NextResponse } from 'next/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const attempts = new Map<string, { count: number; reset: number }>()

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const current = attempts.get(ip)
  if (current && current.reset > now && current.count >= 5) return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 })
  attempts.set(ip, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 60 * 60 * 1000 })

  let body: Record<string, unknown>
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (String(body.website ?? '')) return NextResponse.json({ ok: true })
  const name = String(body.name ?? '').trim().slice(0, 100)
  const email = String(body.email ?? '').trim().slice(0, 200)
  const company = String(body.company ?? '').trim().slice(0, 150)
  const type = String(body.type ?? '').trim().slice(0, 100)
  const message = String(body.message ?? '').trim().slice(0, 5000)
  if (name.length < 2 || !emailPattern.test(email) || message.length < 20) return NextResponse.json({ error: 'Please check the required fields.' }, { status: 400 })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) return NextResponse.json({ error: 'The contact service is not configured yet. Please email hello@rasheedsystems.com.' }, { status: 503 })

  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Project enquiry${company ? ` — ${company}` : ''}`, text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nProject type: ${type || '—'}\n\n${message}` }) })
  if (!response.ok) return NextResponse.json({ error: 'The message could not be delivered. Please try again or email us directly.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
