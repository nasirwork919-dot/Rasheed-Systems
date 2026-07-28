export type GalleryImage = { src: string; caption: string }

export type ProjectDetail = {
  slug: string
  title: string
  category: string
  industry: string
  platform: string
  scope: string
  oneLiner: string
  body: string[]
  whatWentIn: string[]
  gallery: GalleryImage[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  scholarsurge: {
    slug: 'scholarsurge',
    title: 'ScholarSurge',
    category: 'GoHighLevel',
    industry: 'Education',
    platform: 'GoHighLevel',
    scope: 'Full build',
    oneLiner: 'CRM, an AI booking bot, and the automations behind a student-enrollment business.',
    body: [
      'This client runs enrollment for schools and academies. Leads were coming in from Facebook ads and quiz funnels, but plenty of them went cold before anyone got back to them. I built out their GoHighLevel account to close that gap.',
      'Every lead gets tagged by where it came from and dropped into a pipeline. An AI chatbot picks it up, asks a couple of qualifying questions, and books the person straight into a call. If they don\'t book, or they miss the slot, separate sequences follow up by text on their own. The dashboard shows where each deal sits, so nothing gets lost between stages.',
    ],
    whatWentIn: [
      'Enrollment pipeline, first contact through enrolled',
      'AI chatbot that qualifies and books calls',
      'Facebook lead capture with source tagging',
      'Text follow-ups for no-shows and unbooked leads',
      'Appointment reminders and internal alerts',
      'Reporting dashboard for pipeline and conversion',
    ],
    gallery: [
      { src: '/work/scholarsurge/preview (1).webp',   caption: 'Analytics dashboard' },
      { src: '/work/scholarsurge/preview.webp',       caption: 'Enrollment pipeline' },
      { src: '/work/scholarsurge/preview (2).webp',   caption: 'AI booking bot' },
      { src: '/work/scholarsurge/preview (3).webp',   caption: 'Multi-source setter' },
      { src: '/work/scholarsurge/preview (4).webp',   caption: 'Facebook lead capture' },
      { src: '/work/scholarsurge/preview (5).webp',   caption: 'Automations' },
    ],
  },

  'strive-soccer-academy': {
    slug: 'strive-soccer-academy',
    title: 'Strive Soccer Academy',
    category: 'GoHighLevel',
    industry: 'Youth Sports',
    platform: 'GoHighLevel · WordPress',
    scope: 'Full build',
    oneLiner: 'An end-to-end AI trial-booking system for a youth soccer academy — a conversational setter that qualifies and books leads into the right age-group calendar, plus a rebuilt website booking flow and full post-booking automation.',
    body: [
      'Strive Soccer Academy runs free trial assessment sessions for kids, grouped by birth-year cohort and split into boys\' and girls\' sessions — eight calendars in total. Leads arrived from Facebook lead ads into GoHighLevel, but nothing engaged them automatically, and the website funnelled every parent onto a single page showing all eight calendars at once.',
      'I built a complete booking system across GoHighLevel and WordPress. An AI setter now greets each parent over SMS or WhatsApp, finds out the child\'s birth year and gender one question at a time, and books the trial into the correct calendar automatically — no parent ever has to choose from eight options. On the website side, a two-question survey replaced the cluttered calendar page: pick a birth year, then son or daughter, and only the relevant calendar loads. Every booking then triggers a workflow that sends the waiver, confirmation, and staged reminders without any manual effort.',
    ],
    whatWentIn: [
      'AI setter that qualifies and books leads over SMS/WhatsApp',
      'Automatic routing across 8 trial calendars by age and gender',
      'Parent-facing survey replacing 8 calendars with the one that applies',
      'Site-wide button repoint + 301 redirect for legacy links',
      'Waiver dispatch, confirmations, and staged reminders on every booking',
      'Automated post-trial player-profile intake, 4 hours after the session',
      'Facebook Lead Ads → CRM pipeline with stage tracking and tagging',
    ],
    gallery: [
      { src: '/work/strive-soccer-academy/Strive-Dashboard.webp',     caption: 'GoHighLevel dashboard and pipeline overview' },
      { src: '/work/strive-soccer-academy/strive-agent.webp',         caption: 'AI setter qualifying and booking parents over SMS' },
      { src: '/work/strive-soccer-academy/strive-execution-log.webp', caption: 'Lead pipeline and execution tracking in GoHighLevel' },
      { src: '/work/strive-soccer-academy/strive-workflow.webp',      caption: 'Post-booking automation: waiver, confirmations, and reminders' },
      { src: '/work/strive-soccer-academy/strive-form.webp',          caption: 'Automated player-profile intake form sent after the trial' },
    ],
  },
}
