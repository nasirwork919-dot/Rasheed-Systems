export default function AboutHero() {
  return (
    <section className="about-hero-refined" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about-hero-main">
          <div className="about-hero-intro reveal">
            <span className="section-label">ABOUT / RASHEED SYSTEMS</span>
            <h1 id="about-title">Two minds.<br />One standard.</h1>
            <p>A founder-run engineering studio operated by two brothers, Nasir and Zain Rasheed.</p>
            <a className="line-link" href="#about-founders">Meet the studio <span aria-hidden="true">↓</span></a>
          </div>
          <div className="about-founders" id="about-founders" aria-labelledby="about-founders-title">
            <h2 className="section-label" id="about-founders-title">THE PEOPLE BEHIND THE WORK</h2>
            <ol className="about-founder-list">
              <li className="reveal"><span>01</span><div><h3>Nasir Rasheed</h3><p>Founder</p></div></li>
              <li className="reveal"><span>02</span><div><h3>Zain Rasheed</h3><p>Co-founder</p></div></li>
            </ol>
          </div>
        </div>
        <div className="about-hero-principles">
          <ul aria-label="Studio principles">
            <li>Direct collaboration.</li>
            <li>Clear communication.</li>
            <li>Careful delivery.</li>
          </ul>
        </div>
        <div className="about-hero-location"><span>Based in Pakistan.</span><span>Working worldwide.</span></div>
      </div>
    </section>
  )
}
