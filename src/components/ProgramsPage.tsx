import { useState } from 'react'
import { homepageContent } from '../data/homepage'
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

      <Section className="programs-learning-section">
        <Container>
          <div className="programs-page-heading">
            <p className="section-marker section-marker-yellow">03 — HOW YOU LEARN</p>
            <h2>Learning is only the beginning.</h2>
          </div>
          <ol className="programs-journey">
            {homepageContent.philosophy.stages.map((stage, index) => (
              <li key={stage.name}><span>{`0${index + 1}`}</span><div><h3>{stage.name}</h3><p>{stage.description}</p></div></li>
            ))}
          </ol>
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
          <div className="hiring-image-placeholder" role="img" aria-label="Hiring partner logos image placeholder">Hiring partner logos image will be added here.</div>
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
