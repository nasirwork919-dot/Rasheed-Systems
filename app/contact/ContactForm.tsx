'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

export default function ContactForm() {
  useReveal()

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: 'AI Agents & Automation',
    msg: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSend = () => {
    const subject = 'New project enquiry' + (form.company ? ' — ' + form.company : '')
    const body =
      'Name: ' + form.name + '\n' +
      'Email: ' + form.email + '\n' +
      'Company: ' + form.company + '\n' +
      'Needs: ' + form.type + '\n\n' +
      'Project:\n' + form.msg
    window.location.href =
      'mailto:hello@rasheedsystems.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body)
  }

  return (
    <section className="lead-block">
      <div className="wrap contact-grid">

        <div className="contact-aside reveal">
          <h3>Reach us directly</h3>
          <p>Prefer to skip the form? Email works just as well. We usually reply within a day.</p>
          <div className="contact-list">
            <a href="mailto:hello@rasheedsystems.com">
              <span className="ic">✉</span>
              <span><small>Email</small>hello@rasheedsystems.com</span>
            </a>
            <div>
              <span className="ic">◷</span>
              <span><small>Hours</small>We work across US, UK, UAE, IN &amp; AU time zones</span>
            </div>
            <div>
              <span className="ic">⚲</span>
              <span><small>Based in</small>Pakistan — building worldwide</span>
            </div>
          </div>
        </div>

        <div className="form reveal">
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" type="text" placeholder="Jane Doe" value={form.name} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" type="text" placeholder="Company name" value={form.company} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="type">What do you need?</label>
              <select id="type" value={form.type} onChange={handleChange}>
                <option>AI Agents &amp; Automation</option>
                <option>SaaS / Web App</option>
                <option>GoHighLevel Build</option>
                <option>CRM / Marketplace</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="msg">Tell us about the project</label>
            <textarea
              id="msg"
              placeholder="What are you trying to build or fix? What does success look like? Any timeline or budget in mind?"
              value={form.msg}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSend}>
            Send it over <span className="arrow">↗</span>
          </button>
          <p className="form-note">This opens your email app with everything filled in, ready to send. Want it to submit silently instead? Wire the form to your own endpoint or a service like Formspree.</p>
        </div>

      </div>
    </section>
  )
}
