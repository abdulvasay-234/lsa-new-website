import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const practiceAreas = [
  ['PROJECTS', 'Turn concepts into practical projects and create work you can learn from and showcase.'],
  ['WORKSHOPS', 'Explore specific technologies and skills through guided, hands-on workshops.'],
  ['LABS', 'Work with tools, technologies, and practical exercises in a hands-on learning environment.'],
  ['INDUSTRY EXPOSURE', 'Learn from industry perspectives, real-world examples, and practical technology use cases.'],
  ['INTERNSHIPS', 'Apply your skills in internship settings and experience working on real tasks and workflows.'],
  ['EVENTS & COMMUNITY', 'Connect with other learners through events, hackathons, discussions, and community activities.'],
] as const

export function LearningPage() {
  return (
    <>
      <Section className="learning-page-hero">
        <Container className="learning-page-hero-layout">
          <div><p className="section-marker section-marker-yellow">01 — LEARNING</p><h1>Learn by doing.<br />Build by solving.</h1></div>
          <p>LSA combines structured learning with hands-on practice, projects, mentorship, and real-world experiences — helping learners turn what they learn into skills they can apply.</p>
        </Container>
      </Section>

      <Section className="learning-ecosystem-section">
        <Container><div className="learning-page-heading"><p className="section-marker">02 — LEARNING ECOSYSTEM</p><h2>Keep learning beyond the classroom.</h2><p>Your learning doesn&apos;t stop when a session ends. LSA brings together <strong>learning platforms, practical knowledge, and useful resources</strong> to help you continue exploring, practising, and building.</p></div><div className="learning-destinations"><article><span>01</span><h3>LMS</h3><p>Your learning environment.</p><small>Access your courses, learning materials, assignments, and other resources in one place.</small><ButtonLink href={getRouteHref('/learning', '/learning/lms')} variant="link">Open LMS →</ButtonLink></article><article><span>02</span><h3>BLOG</h3><p>Ideas, insights, and technology.</p><small>Explore practical articles, technology insights, career perspectives, and lessons from the LSA ecosystem.</small><ButtonLink href={getRouteHref('/learning', '/learning/blog')} variant="link">Read Blog →</ButtonLink></article><article><span>03</span><h3>RESOURCES</h3><p>Tools to keep you building.</p><small>Explore useful guides, references, tools, and resources to support your learning and projects.</small><ButtonLink href={getRouteHref('/learning', '/learning/resources')} variant="link">Explore Resources →</ButtonLink></article></div></Container>
      </Section>

      <div className="learning-ecosystem-marquee" aria-label="LSA learning ecosystem">
        <div className="learning-marquee-track">
          {[0, 1].map((copy) => <div className="learning-marquee-sequence" aria-hidden={copy === 1} key={copy}>{['PROGRAMS', 'LEARNING', 'PROJECTS', 'CAMPUS', 'COMMUNITY', 'EXPERIENCE', 'INTERNSHIPS', 'OPPORTUNITIES'].map((item) => <span key={`${copy}-${item}`}>{item}<i>•</i></span>)}</div>)}
        </div>
      </div>

      {/*
      <Section className="career-guidance-section">
        <Container className="career-guidance-layout">
          <div><p className="section-marker section-marker-yellow">03 — CAREER GUIDANCE</p><h2>Know where you&apos;re going before you start building.</h2><p>Get practical career guidance to understand possible technology paths, identify the skills you need to develop, and create a learning direction around your goals.</p><a className="career-guidance-cta" href={getRouteHref('/learning', '/contact?interest=career-guidance')}>Book Career Guidance <span aria-hidden="true">→</span></a></div>
          <ol className="career-guidance-list"><li><span>01</span><div><strong>CAREER CLARITY</strong><h3>Understand your options.</h3><p>Explore technology roles, career paths, and the skills associated with different directions.</p></div></li><li><span>02</span><div><strong>SKILL GAP</strong><h3>Know what you need to build.</h3><p>Identify the skills you already have and the areas you can develop for your chosen direction.</p></div></li><li><span>03</span><div><strong>LEARNING ROADMAP</strong><h3>Know what to focus on next.</h3><p>Create a structured learning path and understand which skills to prioritise as you progress.</p></div></li><li><span>04</span><div><strong>MENTORSHIP</strong><h3>Get guidance as you move forward.</h3><p>Discuss your progress, ask questions, and get practical guidance as your goals evolve.</p></div></li></ol>
        </Container>
      </Section>
      */}

      <Section className="learning-practice-section">
        <Container>
          <div className="learning-page-heading"><p className="section-marker">04 — LEARNING IN PRACTICE</p><h2>Where learning becomes experience.</h2><p>LSA gives learners opportunities to <strong>apply concepts, work on real problems, build projects, and experience how technology is used beyond the classroom.</strong></p></div>
          <div className="learning-practice-layout"><article className="learning-practice-feature"><img src={`${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00752.jpg`} alt="LSA students working on technology projects" width="5146" height="3217" loading="lazy" /><div className="learning-practice-feature-copy"><p className="card-kicker">01 — FEATURE</p><h3>PROJECTS</h3><p>Build things instead of only completing lessons.</p></div></article><div className="learning-practice-list">{practiceAreas.slice(1).map(([label, description], index) => <article key={label}><span>{`0${index + 2}`}</span><div><h3>{label}</h3><p>{description}</p></div></article>)}</div></div>
        </Container>
      </Section>

      <Section className="learning-page-cta"><Container className="learning-page-cta-layout"><div><p className="section-marker section-marker-yellow">05 — START LEARNING</p><h2>Don&apos;t just learn technology.<br />Learn to use it.</h2><p>Move from concepts to practice with hands-on programs, projects, and learning experiences designed around how technology is actually used.</p></div><div className="button-row"><ButtonLink href={getRouteHref('/learning', '/programs')}>Explore Programs →</ButtonLink><ButtonLink href={getRouteHref('/learning', '/contact')} variant="outline">Talk to LSA →</ButtonLink></div></Container></Section>
    </>
  )
}
