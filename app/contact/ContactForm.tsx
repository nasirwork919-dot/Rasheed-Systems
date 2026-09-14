'use client'

import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

const serviceOptions = [
  'AI & automation',
  'GoHighLevel',
  'Web apps & SaaS',
  'CRMs & marketplaces',
  'Not sure yet',
] as const

type Errors = Partial<Record<'name' | 'email' | 'message' | 'form', string>>

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [deliveryUnavailable, setDeliveryUnavailable] = useState(false)
  const submitting = useRef(false)

  const changeService = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.currentTarget
    setSelectedServices(current => {
      if (!checked) return current.filter(service => service !== value)
      if (value === 'Not sure yet') return ['Not sure yet']
      return [...current.filter(service => service !== 'Not sure yet'), value]
    })
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      company: String(formData.get('company') ?? '').trim(),
      services: formData.getAll('services').map(String),
      message: String(formData.get('message') ?? '').trim(),
      website: String(formData.get('website') ?? ''),
    }
    const nextErrors: Errors = {}
    if (data.name.length < 2) nextErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.email = 'Enter a valid email address.'
    if (data.message.length < 20) nextErrors.message = 'Please add at least 20 characters about the project.'
    setErrors(nextErrors)
    setDeliveryUnavailable(false)
    if (Object.keys(nextErrors).length) {
      const firstInvalid = ['name', 'email', 'message'].find(name => nextErrors[name as keyof Errors])
      if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
      return
    }

    if (submitting.current) return
    submitting.current = true
    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        setDeliveryUnavailable(response.status === 503)
        throw new Error('Delivery failed')
      }
      form.reset()
      setSelectedServices([])
      setErrors({})
      setStatus('success')
    } catch {
      submitting.current = false
      setStatus('error')
      setErrors({ form: 'We couldn’t send your enquiry. Please try again.' })
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success" role="status">
        <h2>Enquiry sent.</h2>
        <p>Thank you for sharing your project. We’ll review your message and get back to you.</p>
        <button type="button" className="line-link" onClick={() => { submitting.current = false; setStatus('idle') }}>Send another enquiry</button>
      </div>
    )
  }

  return (
    <form className="contact-form reveal" onSubmit={submit} noValidate>
      <p className="form-required-note">Fields marked * are required.</p>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="company">Company / website (optional)</label>
        <input id="company" name="company" autoComplete="organization" maxLength={150} />
      </div>
      <fieldset className="service-choices" aria-describedby="services-help">
        <legend>What do you need help with? (optional)</legend>
        <p id="services-help">Select all that apply.</p>
        <div className="service-choice-grid">
          {serviceOptions.map(option => (
            <label key={option}>
              <input type="checkbox" name="services" value={option} checked={selectedServices.includes(option)} onChange={changeService} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field project-details-field">
        <label htmlFor="message">Project details *</label>
        <textarea id="message" name="message" rows={7} required minLength={20} maxLength={5000} placeholder="What would you like to build or improve?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
        {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
      </div>
      <div className="field honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {errors.form && (
        <div className="form-error" role="alert">
          <p>{errors.form}</p>
          {deliveryUnavailable && <p>Contact delivery is not configured locally. You can email <a href="mailto:hello@rasheedsystems.com">hello@rasheedsystems.com</a>.</p>}
        </div>
      )}
      <p className="form-status" role="status" aria-live="polite">{status === 'loading' ? 'Sending…' : ''}</p>
      <button className="submit-button" type="submit" disabled={status === 'loading'}>
        <span>{status === 'loading' ? 'Sending…' : 'Send enquiry'}</span>
        <i />
        <b aria-hidden="true">↗</b>
      </button>
      <p className="privacy-note">Your details are used only to respond to this enquiry. Nothing is added to a mailing list.</p>
    </form>
  )
}
