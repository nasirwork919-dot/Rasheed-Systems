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
      { src: '/work/scholarsurge/preview.webp',       caption: 'Analytics dashboard' },
      { src: '/work/scholarsurge/preview (1).webp',   caption: 'Enrollment pipeline' },
      { src: '/work/scholarsurge/preview (2).webp',   caption: 'AI booking bot' },
      { src: '/work/scholarsurge/preview (3).webp',   caption: 'Multi-source setter' },
      { src: '/work/scholarsurge/preview (4).webp',   caption: 'Facebook lead capture' },
      { src: '/work/scholarsurge/preview (5).webp',   caption: 'Automations' },
    ],
  },
}
