import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E1014',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px 80px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* top accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 3, background: '#F5C842', borderRadius: 2 }} />
          <span style={{ color: '#F5C842', fontSize: 16, letterSpacing: 6, textTransform: 'uppercase' }}>
            Rasheed Systems
          </span>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ color: '#ECEAE3', fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            AI systems &amp; software
          </div>
          <div style={{ color: '#ECEAE3', fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            that run your business.
          </div>
        </div>

        {/* bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ color: '#888', fontSize: 20, letterSpacing: 1 }}>
            AI Agents · Automation · SaaS · GoHighLevel · CRMs
          </div>
          <div style={{ color: '#F5C842', fontSize: 18, letterSpacing: 2 }}>
            rasheed-systems.vercel.app
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
