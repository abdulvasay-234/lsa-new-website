import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const practiceAreas = [
  ['WORKSHOPS', 'Hands-on learning around technology and practical skills.'],
  ['PROJECTS', 'Build things that demonstrate what you can do.'],
  ['LABS', 'Practise concepts in a working environment.'],
  ['EVENTS & COMMUNITY', 'Learn through interaction, collaboration and shared experiences.'],
  ['INTERNSHIPS', 'Gain exposure to practical work where opportunities are available.'],
] as const

const ecosystem = ['PROGRAMS', 'LEARNING', 'PROJECTS', 'CAMPUS', 'COMMUNITY', 'EXPERIENCE', 'CAREER DIRECTION']

export function AboutPage() {
  return (
    <>
      <Section className="about-page-hero"><Container className="about-page-hero-layout"><div><p className="section-marker section-marker-yellow">01 — ABOUT LSA</p><h1>Technology education<br />built around capability.</h1><p>LSA is focused on helping learners develop practical technology skills through structured learning, projects, experience and career direction.</p></div><div className="about-hero-visual" aria-label="LSA practical technology education visual" role="img"><span>LSA / 01</span><strong>KNOW<br />DO<br />SHOW</strong><i>Practical technology education</i></div></Container></Section>

      <Section className="about-page-why"><Container className="about-page-why-layout"><div className="about-page-heading"><p className="section-marker">02 — WHY LSA</p><h2>Learning technology<br />should lead to doing.</h2></div><div><p className="about-page-statement">Learning should move beyond simply completing lessons. It should move through practical work, exposure and evidence of what a learner can do.</p><p className="about-page-muted">LSA connects knowledge to action through technology programs, hands-on learning, projects, campus experiences, and career direction.</p><div className="about-sequence">{['LEARN', 'BUILD', 'SOLVE', 'EXPERIENCE', 'SHOWCASE'].map((item, index) => <span key={item}><b>{`0${index + 1}`}</b>{item}{index < 4 && <i aria-hidden="true">→</i>}</span>)}</div></div></Container></Section>

      <Section className="about-page-institution"><Container><div className="about-page-heading"><p className="section-marker section-marker-yellow">04 — LIET × LSA</p><h2>Backed by an institutional<br />learning ecosystem.</h2></div><div className="about-institution-layout"><div className="about-institution-block"><img src={siteInfo.logos.liet.src} alt={siteInfo.logos.liet.alt} width={siteInfo.logos.liet.width} height={siteInfo.logos.liet.height} /><span>Institutional foundation</span><p>{siteInfo.institution.name}</p></div><div className="about-institution-cross" aria-hidden="true">×</div><div className="about-institution-block"><img src={siteInfo.logos.lsaWhite.src} alt={siteInfo.logos.lsaWhite.alt} width={siteInfo.logos.lsaWhite.width} height={siteInfo.logos.lsaWhite.height} /><span>Practical technology learning</span><p>Lords Skill Academy</p></div></div><p className="about-institution-note">{siteInfo.institution.statement}</p></Container></Section>

      <Section className="about-page-practice"><Container><div className="about-page-heading"><p className="section-marker">05 — LEARNING IN PRACTICE</p><h2>Less passive learning.<br />More participation.</h2></div><ol className="about-practice-list">{practiceAreas.map(([label, description], index) => <li key={label}><span>{`0${index + 1}`}</span><div><strong>{label}</strong><p>{description}</p></div></li>)}</ol></Container></Section>

      <Section className="about-page-ecosystem"><Container><div className="about-page-heading"><p className="section-marker">06 — THE LSA ECOSYSTEM</p><h2>Learning doesn&apos;t happen<br />in one place.</h2></div><ol className="about-ecosystem-flow">{ecosystem.map((item, index) => <li key={item}><span>{`0${index + 1}`}</span><strong>{item}</strong>{index < ecosystem.length - 1 && <i aria-hidden="true">↓</i>}</li>)}</ol></Container></Section>

      <Section className="about-page-today"><Container className="about-page-today-layout"><div><p className="section-marker">07 — LSA TODAY</p><h2>A practical learning ecosystem connected to real places, useful resources and continued experience.</h2></div><p>LSA brings together technology programs, learning resources, workshops, campus initiatives, projects, events, community and career direction. The work is designed to keep learning useful beyond a single classroom or course.</p></Container></Section>

      <Section className="about-page-final"><Container><p className="section-marker section-marker-yellow">10 — FINAL CTA</p><h2>Ready to start building?</h2><p>Explore the programs, find your direction, and take the next step with LSA.</p><div className="button-row"><ButtonLink href={getRouteHref('/about', '/programs')}>Explore programs →</ButtonLink><ButtonLink href={getRouteHref('/about', '/contact')} variant="outline">Contact LSA →</ButtonLink></div></Container></Section>
    </>
  )
}
