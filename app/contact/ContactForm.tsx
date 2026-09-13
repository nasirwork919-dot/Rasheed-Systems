'use client'

import { FormEvent, useState } from 'react'

type Errors = Partial<Record<'name' | 'email' | 'message' | 'form', string>>

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const nextErrors: Errors = {}
    if (String(data.name ?? '').trim().length < 2) nextErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(String(data.email ?? ''))) nextErrors.email = 'Enter a valid email address.'
    if (String(data.message ?? '').trim().length < 20) nextErrors.message = 'Please add at least 20 characters about the project.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStatus('loading')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error || 'Could not send your message.')
      setStatus('success'); form.reset()
    } catch (error) { setStatus('error'); setErrors({ form: error instanceof Error ? error.message : 'Could not send your message.' }) }
  }

  if (status === 'success') return <div className="contact-success" role="status"><span>Message received</span><h2>Thanks. We’ll take it from here.</h2><p>Your enquiry reached Rasheed Systems. We’ll reply by email.</p><button type="button" className="line-link" onClick={() => setStatus('idle')}>Send another message</button></div>

  return <form className="contact-form reveal" onSubmit={submit} noValidate>
    <div className="form-heading"><span className="section-label">Project brief</span><span>Fields marked * are required</span></div>
    <div className="form-row"><div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div><div className="field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div></div>
    <div className="form-row"><div className="field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" /></div><div className="field"><label htmlFor="type">What do you need?</label><select id="type" name="type" defaultValue="AI Agents & Automation"><option>AI Agents &amp; Automation</option><option>SaaS / Web App</option><option>GoHighLevel Build</option><option>CRM / Marketplace</option><option>Not sure yet</option></select></div></div>
    <div className="field"><label htmlFor="message">Tell us about the project *</label><textarea id="message" name="message" rows={7} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : 'message-help'} /><p id={errors.message ? 'message-error' : 'message-help'} className={errors.message ? 'field-error' : 'field-help'}>{errors.message || 'What happens now, what needs to change, and any useful timing context.'}</p></div>
    <div className="field honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
    <button className="submit-button" type="submit" disabled={status === 'loading'}><span>{status === 'loading' ? 'Sending…' : 'Send enquiry'}</span><i /><b aria-hidden="true">→</b></button>
    <p className="privacy-note">Your details are used only to respond to this enquiry. Nothing is added to a mailing list.</p>
  </form>
}
