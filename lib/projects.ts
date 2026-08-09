export type Project = {
  href?: string
  slug?: string
  tag: string
  img: string
  title: string
  desc: string
  role: string
  stack: string
  category: 'Web' | 'GHL'
  homeGroup?: 'web' | 'ai' | 'ghl'
}

export const projects: Project[] = [
  {
    href: 'https://n3rve.ai/',
    tag: 'AI Platform',
    img: '/work/n3rve.jpg',
    title: 'N3rve',
    desc: 'An AI operating system for teams — unifying AI, billing, customers, and content under one roof so teams stop switching tabs and ship more.',
    role: 'Architecture & build',
    stack: 'AI · Docker · Node · Postgres',
    category: 'Web', homeGroup: 'ai',
  },
  {
    href: 'https://justcarsale.com/',
    tag: 'Marketplace',
    img: '/work/justcarsale.jpg',
    title: 'JustCarSale',
    desc: 'A global automotive marketplace connecting buyers, sellers, dealers, and workshops across 18+ modules — from listings and inspections to a full back office.',
    role: 'Backend lead',
    stack: 'React · TypeScript · Postgres',
    category: 'Web', homeGroup: 'web',
  },
  {
    href: 'https://insurancewallets.com/',
    tag: 'Marketplace',
    img: '/work/insurancewallets.jpg',
    title: 'Insurance Wallets',
    desc: 'An AI-powered insurance platform and broker/lawyer marketplace — policies, claims, a community forum, and gated access in one secure place.',
    role: 'Full build',
    stack: 'React · Node',
    category: 'Web', homeGroup: 'web',
  },
  {
    href: 'https://mia.profitlifter.com/',
    tag: 'AI Assistant',
    img: '/work/mia.jpg',
    title: 'MIA',
    desc: 'An AI marketing strategist that builds a personalized growth plan around your answers — no templates, no fluff — with a reseller-ready architecture.',
    role: 'Platform build',
    stack: 'AI · Web · Postgres',
    category: 'Web', homeGroup: 'ai',
  },
  {
    href: 'https://www.zaindubai.com/',
    tag: 'Real Estate',
    img: '/work/zaindubai.jpg',
    title: 'Zain Dubai',
    desc: 'A Dubai real estate platform for buying and renting property — advanced search, community guides, and free instant valuation tools.',
    role: 'Full build',
    stack: 'React · Web',
    category: 'Web', homeGroup: 'web',
  },
  {
    href: 'https://www.eu-worldcrm.com/',
    tag: 'CRM',
    img: '/work/euroworldcrm.jpg',
    title: 'Euro World CRM',
    desc: 'A travel-agency command center — leads, walk-ins, GST invoicing, payments, and multi-role access, with live performance dashboards.',
    role: 'Full build',
    stack: 'React · Node · Postgres',
    category: 'Web', homeGroup: 'ai',
  },
  {
    href: 'https://chatsites.app/',
    tag: 'Funnel Builder',
    img: '/work/chatsites.jpg',
    title: 'Chatsites',
    desc: 'An AI-powered conversational website builder that turns visitors into leads — flow blocks, a command center, and a full publish flow.',
    role: 'Engineering',
    stack: 'React · Node',
    category: 'Web', homeGroup: 'ai',
  },
  {
    href: 'https://www.jwalinjewels.com/',
    tag: 'E-commerce',
    img: '/work/jwalinjewels.jpg',
    title: 'Jwalin Jewels',
    desc: 'A luxury jewelry store — engagement rings, custom design, and loose diamonds, with virtual appointments and a refined buying experience.',
    role: 'Full build',
    stack: 'E-commerce · Web',
    category: 'Web', homeGroup: 'web',
  },
  {
    href: 'https://www.uktherapies.co.uk/',
    tag: 'Wellness',
    img: '/work/uktherapies.jpg',
    title: 'UK Therapies',
    desc: 'A wellness and therapy studio site — treatments, pricing, and online booking wrapped in a calm, premium experience.',
    role: 'Full build',
    stack: 'Web · Booking',
    category: 'Web', homeGroup: 'web',
  },
  {
    slug: 'scholarsurge',
    tag: 'GoHighLevel',
    img: '/work/scholarsurge/preview (1).webp',
    title: 'ScholarSurge',
    desc: 'CRM, an AI booking bot, and the automations behind a student-enrollment business.',
    role: 'Full build',
    stack: 'GoHighLevel · Conversation AI · Workflows',
    category: 'GHL', homeGroup: 'ghl',
  },
  {
    slug: 'strive-soccer-academy',
    tag: 'GoHighLevel · AI Booking',
    img: '/work/strive-soccer-academy/Strive-Dashboard.webp',
    title: 'Strive Soccer Academy',
    desc: 'An end-to-end AI trial-booking system — a conversational setter that qualifies parents and routes each child into the right age-group calendar across 8 sessions.',
    role: 'Full build',
    stack: 'GoHighLevel · Conversation AI · WordPress · Workflows',
    category: 'GHL', homeGroup: 'ghl',
  },
]
