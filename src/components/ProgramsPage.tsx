import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { programs } from '../data/content'
import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

gsap.registerPlugin(ScrollTrigger)

export function ProgramsPage() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)
  const outcomesHeadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = outcomesHeadingRef.current
    const section = heading?.closest('.programs-outcomes-section')
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 8%',
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .from('.programs-outcome-card', {
          opacity: 0,
          y: 96,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.55,
        })

      return () => timeline.kill()
    }, section)

    return () => animationContext.revert()
  }, [])

  return (
    <>
      <Section className="programs-page-hero">
        <Container className="programs-page-hero-layout">
          <div>
            <p className="section-marker section-marker-yellow">01 — PROGRAMS</p>
            <h1>Build skills that become capability.</h1>
          </div>
          <p className="programs-page-intro">Practical technology programs designed to help learners understand concepts, work with modern tools, build real projects, and apply their skills with confidence.</p>
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
                <div className="program-editorial-name"><p className="card-kicker">Technology program</p><h3>{program.title}</h3></div>
                <p className="program-editorial-description">{program.description}</p>
                <div className="program-editorial-actions">
                  <ButtonLink href={getRouteHref('/programs', `/programs/${program.slug}`)} variant="link" onClick={(event) => event.stopPropagation()}>View program</ButtonLink>
                </div>
                <div className="program-editorial-reveal" aria-hidden={expandedProgram !== program.slug}><span>Program status</span><strong>{program.status}</strong></div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="programs-outcomes-section">
        <Container>
          <div className="programs-outcomes-heading" ref={outcomesHeadingRef}>
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
          <div className="programs-beyond-header"><p className="section-marker">04 — BEYOND THE SYLLABUS</p><h2>Learning should lead to doing.</h2><p>At LSA, learning is not limited to completing a syllabus. Our programs are designed to help learners <strong>understand concepts, practise with real tools, build projects, solve problems, and apply what they know.</strong></p></div>
          <div className="programs-beyond-panels">
            <div className="programs-beyond-statement"><p className="card-kicker">LSA LEARNING PHILOSOPHY</p><h3>Learn it. Practise it. Build with it.</h3></div>
            <ol className="programs-beyond-list"><li><span>PRACTICE</span><strong>Turn concepts into skills through hands-on exercises and guided practice.</strong></li><li><span>BUILD</span><strong>Apply what you learn by creating practical projects and working with modern tools.</strong></li><li><span>PROBLEM-SOLVE</span><strong>Use your knowledge to approach practical challenges and find meaningful solutions.</strong></li><li><span>SHOWCASE</span><strong>Document and present your work so your skills can be seen, shared, and experienced.</strong></li></ol>
          </div>
        </Container>
      </Section>

      <Section className="programs-hiring-section">
        <Container>
          <div className="programs-page-heading">
            <p className="section-marker">05 — HIRING ECOSYSTEM</p>
            <h2>Connecting skills with opportunity.</h2>
            <p>LSA helps bridge the gap between learning and the workplace, connecting learners with industry exposure, internships, career support, and opportunities to put their skills into practice.</p>
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
