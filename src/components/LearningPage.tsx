import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const practiceAreas = [
  ['PROJECTS', 'Build things instead of only completing lessons.'],
  ['WORKSHOPS', 'Learn through focused, practical sessions.'],
  ['LABS', 'Experiment, test, and apply concepts.'],
  ['INDUSTRY EXPOSURE', 'Understand how technology is used beyond the classroom.'],
  ['INTERNSHIPS', 'Gain experience through practical environments.'],
  ['EVENTS & COMMUNITY', 'Learn through collaboration, participation, and shared experiences.'],
] as const

export function LearningPage() {
  return (
    <>
      <Section className="learning-page-hero">
        <Container className="learning-page-hero-layout">
          <div><p className="section-marker section-marker-yellow">01 — LEARNING</p><h1>Learn by doing.<br />Build by solving.</h1></div>
          <p>LSA combines structured learning with practical work, projects, experiences, and resources that help learners keep building beyond the classroom.</p>
        </Container>
      </Section>

      <Section className="learning-ecosystem-section">
        <Container><div className="learning-page-heading"><p className="section-marker">02 — LEARNING ECOSYSTEM</p><h2>Keep learning beyond the classroom.</h2><p>Your learning doesn&apos;t stop when the session ends. LSA brings together the platforms, knowledge, and resources you can continue exploring.</p></div><div className="learning-destinations"><article><span>01</span><h3>LMS</h3><p>Your learning environment.</p><small>Access your courses, learning materials, and academic experience.</small><ButtonLink href={getRouteHref('/learning', '/learning/lms')} variant="link">Open LMS</ButtonLink></article><article><span>02</span><h3>BLOG</h3><p>Ideas, insights, and technology.</p><small>Explore articles, perspectives, and practical knowledge from the LSA ecosystem.</small><ButtonLink href={getRouteHref('/learning', '/learning/blog')} variant="link">Read Blog</ButtonLink></article><article><span>03</span><h3>RESOURCES</h3><p>Keep building.</p><small>Explore useful resources to support your learning, projects, and continued practice.</small><ButtonLink href={getRouteHref('/learning', '/learning/resources')} variant="link">Explore Resources</ButtonLink></article></div></Container>
      </Section>

      <div className="learning-ecosystem-marquee" aria-label="LSA learning ecosystem">
        <div className="learning-marquee-track">
          {[0, 1].map((copy) => <div className="learning-marquee-sequence" aria-hidden={copy === 1} key={copy}>{['PROGRAMS', 'LEARNING', 'PROJECTS', 'CAMPUS', 'COMMUNITY', 'EXPERIENCE', 'INTERNSHIPS', 'OPPORTUNITIES'].map((item) => <span key={`${copy}-${item}`}>{item}<i>•</i></span>)}</div>)}
        </div>
      </div>

      <Section className="career-guidance-section">
        <Container className="career-guidance-layout">
          <div><p className="section-marker section-marker-yellow">03 — CAREER GUIDANCE</p><h2>Know where you&apos;re going before you start building.</h2><p>Get practical career direction, understand your skill gaps, and build a learning path around the roles and opportunities you&apos;re working toward.</p><a className="career-guidance-cta" href="https://lordsskillacademy.com/career-guidance/" target="_blank" rel="noreferrer">Book Career Guidance <span aria-hidden="true">→</span></a></div>
          <ol className="career-guidance-list"><li><span>01</span><div><strong>CAREER CLARITY</strong><p>Understand career paths, roles, and possible directions.</p></div></li><li><span>02</span><div><strong>SKILL-GAP ANALYSIS</strong><p>Identify the skills you need to develop for your chosen direction.</p></div></li><li><span>03</span><div><strong>LEARNING ROADMAP</strong><p>Map the learning journey and understand what to focus on next.</p></div></li><li><span>04</span><div><strong>MENTORSHIP</strong><p>Get guidance and follow-up support as you move forward.</p></div></li></ol>
        </Container>
      </Section>

      <Section className="learning-practice-section">
        <Container>
          <div className="learning-page-heading"><p className="section-marker">04 — LEARNING IN PRACTICE</p><h2>Where learning becomes work.</h2></div>
          <div className="learning-practice-layout"><article className="learning-practice-feature"><img src={`${import.meta.env.BASE_URL}media/lsa-programming.png`} alt="LSA programming and technology learning visual" width="5600" height="3200" loading="lazy" /><div className="learning-practice-feature-copy"><p className="card-kicker">01 — FEATURE</p><h3>PROJECTS</h3><p>Build things instead of only completing lessons.</p></div></article><div className="learning-practice-list">{practiceAreas.slice(1).map(([label, description], index) => <article key={label}><span>{`0${index + 2}`}</span><div><h3>{label}</h3><p>{description}</p></div></article>)}</div></div>
        </Container>
      </Section>

      <Section className="learning-page-cta"><Container className="learning-page-cta-layout"><div><p className="section-marker section-marker-yellow">05 — START LEARNING</p><h2>Don&apos;t just learn technology.<br />Use it.</h2></div><div className="button-row"><ButtonLink href={getRouteHref('/learning', '/programs')}>Explore programs →</ButtonLink><ButtonLink href={getRouteHref('/learning', '/contact')} variant="outline">Contact LSA →</ButtonLink></div></Container></Section>
    </>
  )
}
