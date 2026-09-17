import { useState } from 'react'
import { programs } from '../data/content'
import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

export function ProgramsPage() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  return (
    <>
      <Section className="programs-page-hero">
        <Container className="programs-page-hero-layout">
          <div>
            <p className="section-marker section-marker-yellow">01 — PROGRAMS</p>
            <h1>Build skills that become capability.</h1>
          </div>
          <p className="programs-page-intro">Practical technology programs designed to help learners understand, build, and apply what they learn.</p>
        </Container>
      </Section>

      <Section className="programs-explore-section">
        <Container>
          <div className="programs-page-heading">
            <p className="section-marker">02 — EXPLORE PROGRAMS</p>
            <h2>Choose what you want to build.</h2>
          </div>
          <div className="programs-editorial-list">
            {programs.map((program, index) => (
              <article className={`program-editorial-item ${expandedProgram === program.slug ? 'is-expanded' : ''}`} key={program.slug} tabIndex={0} role="button" aria-expanded={expandedProgram === program.slug} onClick={() => setExpandedProgram(expandedProgram === program.slug ? null : program.slug)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedProgram(expandedProgram === program.slug ? null : program.slug) } }}>
                <span className="program-editorial-index">0{index + 1}</span>
                <div className="program-editorial-name"><p className="card-kicker">Program</p><h3>{program.title}</h3></div>
                <p className="program-editorial-description">{program.description}</p>
                <div className="program-editorial-actions">
                  <ButtonLink href={getRouteHref('/programs', `/programs/${program.slug}`)} variant="link" onClick={(event) => event.stopPropagation()}>Explore program</ButtonLink>
                </div>
                <div className="program-editorial-reveal" aria-hidden={expandedProgram !== program.slug}><span>Program status</span><strong>{program.status}</strong></div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="programs-outcomes-section">
        <Container>
          <div className="programs-outcomes-heading">
            <div className="programs-page-heading">
              <p className="section-marker section-marker-yellow">03 — WHAT YOU TAKE WITH YOU</p>
              <h2>Build skills you can put to work.</h2>
            </div>
            <p>An LSA program is designed to turn learning into real progress. You&apos;ll build practical capability, create project evidence, and develop the confidence to take the next step in your technology journey.</p>
          </div>
          <div className="programs-outcomes-grid">
            <article className="learning-ecosystem-card learning-ecosystem-card--mint programs-outcome-card">
              <div><h3>Practical Capability</h3><p>01</p></div>
              <small>Build working knowledge through hands-on tasks, guided exercises, and real project workflows.</small>
              <div className="programs-outcome-practice"><strong>IN PRACTICE</strong><p>Work with real tools, follow industry workflows, and apply what you learn in practical scenarios.</p></div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </article>
            <article className="learning-ecosystem-card learning-ecosystem-card--peach programs-outcome-card">
              <div><h3>Project Evidence</h3><p>02</p></div>
              <small>Turn concepts into complete projects that demonstrate how you apply tools, solve problems, and make technical decisions.</small>
              <div className="programs-outcome-practice"><strong>IN PRACTICE</strong><p>Build meaningful projects, document your work, and create a portfolio you can share.</p></div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </article>
            <article className="learning-ecosystem-card learning-ecosystem-card--lavender programs-outcome-card">
              <div><h3>Career Readiness</h3><p>03</p></div>
              <small>Develop a portfolio, technical communication, and interview confidence to present your work clearly.</small>
              <div className="programs-outcome-practice"><strong>IN PRACTICE</strong><p>Explain your projects, discuss your approach, and showcase your skills with clarity.</p></div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="programs-beyond-section">
        <Container className="programs-beyond-layout">
          <div className="programs-beyond-header"><p className="section-marker">04 — BEYOND THE SYLLABUS</p><h2>Programs move from learning to practical capability.</h2></div>
          <div className="programs-beyond-panels">
            <div className="programs-beyond-statement"><p className="card-kicker">LSA learning philosophy</p><h3>Learning should prepare you to use what you know.</h3></div>
            <ol className="programs-beyond-list"><li><span>PRACTICE</span><strong>Work with concepts through practical exercises.</strong></li><li><span>BUILD</span><strong>Turn what you learn into working projects.</strong></li><li><span>PROBLEM-SOLVE</span><strong>Apply knowledge to meaningful real-world problems.</strong></li><li><span>SHOWCASE</span><strong>Make your work visible through projects and outcomes.</strong></li></ol>
          </div>
        </Container>
      </Section>

      <Section className="programs-hiring-section">
        <Container>
          <div className="programs-page-heading">
            <p className="section-marker">05 — HIRING ECOSYSTEM</p>
            <h2>Connecting skills with opportunity.</h2>
            <p>LSA&apos;s practical learning ecosystem is designed to help learners move closer to real-world opportunities.</p>
          </div>
          <div className="hiring-image-frame">
            <img src={`${import.meta.env.BASE_URL}media/hiring-partners.png`} alt="LSA hiring partners" width="1150" height="720" loading="lazy" decoding="async" />
          </div>
        </Container>
      </Section>

      <Section className="programs-page-cta">
        <Container className="programs-page-cta-layout">
          <div><p className="section-marker section-marker-yellow">06 — START LEARNING</p><h2>Ready to start building?</h2></div>
          <div className="button-row"><ButtonLink href={getRouteHref('/programs', '/learning')}>Explore learning →</ButtonLink><ButtonLink href={getRouteHref('/programs', '/contact')} variant="outline">Contact LSA →</ButtonLink></div>
        </Container>
      </Section>
    </>
  )
}
