import { useEffect, useState } from 'react'
import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

type CampusVisual = {
  src?: string
  alt: string
  category: string
  caption: string
}

const campusGallery: CampusVisual[] = [
  {
    alt: 'Students learning in a practical technology environment at Lords Skill Academy',
    category: 'WORKSHOPS',
    caption: 'Hands-on sessions around practical technology skills.',
  },
  {
    alt: 'Programming focused learning setup and training screens at Lords Skill Academy',
    category: 'SESSIONS',
    caption: 'Learning directly with trainers and practitioners.',
  },
  {
    alt: 'LSA learning environment with focused student practice and technology education',
    category: 'PROJECTS',
    caption: 'Turning concepts into working outcomes.',
  },
  {
    alt: 'Technology education and project work in a studio-style learning environment',
    category: 'BUILDING',
    caption: 'Developing practical capability in a real learning environment.',
  },
]

const spaceLabels = ['CLASSROOMS', 'LABS', 'LEARNING SPACES', 'WORKSPACES']
const motionSteps = ['LEARN', 'BUILD', 'EXPERIENCE', 'SHOWCASE']

export function CampusPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? null : (current + 1) % campusGallery.length))
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === null ? null : (current - 1 + campusGallery.length) % campusGallery.length))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  const activeVisual = activeIndex === null ? null : campusGallery[activeIndex]

  return (
    <>
      <Section className="campus-page-hero">
        <Container className="campus-page-hero-layout">
          <div className="campus-page-header">
            <p className="section-marker section-marker-yellow">01 — CAMPUS</p>
            <h1>Where learning<br />happens in motion.</h1>
            <p className="campus-page-intro">Explore the spaces, sessions, workshops and experiences that make up the LSA learning environment.</p>
            <div className="button-row">
              <ButtonLink href="#campus-space" variant="primary">Explore LSA →</ButtonLink>
            </div>
          </div>

          <div className="campus-page-hero-visual campus-image-placeholder" aria-label="LSA learning environment" role="img">
            <span>LSA campus image placeholder</span>
          </div>
        </Container>
      </Section>

      <Section className="campus-page-space" id="campus-space">
        <Container className="campus-page-space-layout">
          <div className="campus-page-heading">
            <p className="section-marker">02 — THE SPACE</p>
            <h2>A place to learn,<br />practice and build.</h2>
          </div>

          <div className="campus-space-gallery">
            <button className="campus-image campus-image-tall campus-image-placeholder" type="button" aria-label="Open campus learning environment image" onClick={() => setActiveIndex(0)}>
              <span>Campus image placeholder</span>
            </button>
            <div className="campus-space-stack">
              <button className="campus-image campus-image-placeholder" type="button" aria-label="Open workshop image" onClick={() => setActiveIndex(1)}>
                <span>Workshop placeholder</span>
              </button>
              <button className="campus-image campus-image-placeholder" type="button" aria-label="Open learning labs image" onClick={() => setActiveIndex(2)}>
                <span>Learning space placeholder</span>
              </button>
            </div>
          </div>
        </Container>

        <Container>
          <ul className="campus-space-labels" aria-label="Campus learning spaces">
            {spaceLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="campus-page-motion">
        <Container>
          <div className="campus-page-heading">
            <p className="section-marker">03 — LEARNING IN MOTION</p>
            <h2>Learning doesn&apos;t stay<br />inside the classroom.</h2>
          </div>
          <div className="campus-motion-grid">
            {campusGallery.slice(0, 3).map((item, index) => (
              <button key={`${item.category}-${index}`} className="campus-motion-card campus-image-placeholder" type="button" onClick={() => setActiveIndex(index)}>
                <span>{item.category}</span>
                <div className="campus-motion-copy">
                  <strong>{item.category}</strong>
                  <p>{item.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="campus-page-community">
        <Container>
          <div className="campus-page-heading">
            <p className="section-marker">04 — EVENTS &amp; COMMUNITY</p>
            <h2>Learning also happens<br />together.</h2>
          </div>
          <div className="campus-community-layout">
            <button className="campus-community-feature campus-image-placeholder" type="button" onClick={() => setActiveIndex(0)}>
              <span>WORKSHOPS</span>
            </button>
            <div className="campus-community-stack">
              <button className="campus-community-tile campus-image-placeholder" type="button" onClick={() => setActiveIndex(1)}>
                <span>SESSIONS</span>
              </button>
              <button className="campus-community-tile campus-image-placeholder" type="button" onClick={() => setActiveIndex(2)}>
                <span>PROJECTS</span>
              </button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="campus-page-beyond">
        <Container className="campus-page-beyond-layout">
          <div className="campus-page-heading">
            <p className="section-marker">05 — BEYOND THE CLASSROOM</p>
            <h2>Build experience,<br />not just attendance.</h2>
          </div>
          <div className="campus-beyond-copy">
            <p>Programs at LSA can extend beyond classroom sessions through projects, workshops, events, internships and other practical experiences.</p>
            <div className="campus-beyond-sequence" aria-label="Learning progression sequence">
              {motionSteps.map((step, index) => (
                <span key={step}>
                  {step}
                  {index < motionSteps.length - 1 && <i aria-hidden="true">→</i>}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="campus-page-collage">
        <Container>
          <div className="campus-page-heading">
            <p className="section-marker">06 — LSA IN MOTION</p>
          </div>
          <div className="campus-collage-grid" aria-label="LSA editorial image collage">
            <button className="campus-collage-large campus-image-placeholder" type="button" onClick={() => setActiveIndex(0)}>
              <span>LSA in motion</span>
            </button>
            <button className="campus-collage-small campus-image-placeholder" type="button" onClick={() => setActiveIndex(1)}>
              <span>Workshop</span>
            </button>
            <button className="campus-collage-small campus-image-placeholder" type="button" onClick={() => setActiveIndex(2)}>
              <span>Practical learning</span>
            </button>
            <button className="campus-collage-large campus-image-placeholder" type="button" onClick={() => setActiveIndex(3)}>
              <span>Student activity</span>
            </button>
          </div>
        </Container>
      </Section>

      <Section className="campus-page-final">
        <Container className="campus-page-final-layout">
          <p className="section-marker section-marker-yellow">07 — START LEARNING</p>
          <h2>Ready to experience LSA?</h2>
          <p>Explore the programs, find your path and start building.</p>
          <div className="button-row">
            <ButtonLink href={getRouteHref('/campus', '/programs')}>Explore programs →</ButtonLink>
            <ButtonLink href={getRouteHref('/campus', '/contact')} variant="outline">Contact LSA →</ButtonLink>
          </div>
        </Container>
      </Section>

      {activeVisual && (
        <div className="campus-lightbox" role="dialog" aria-modal="true" aria-label="Campus gallery image viewer" onClick={() => setActiveIndex(null)}>
          <div className="campus-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="campus-lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setActiveIndex(null)}>Close</button>
            <div className="campus-image-placeholder campus-lightbox-placeholder" aria-label={activeVisual.alt}><span>{activeVisual.category}</span></div>
            <div className="campus-lightbox-meta">
              <strong>{activeVisual.category}</strong>
              <p>{activeVisual.caption}</p>
            </div>
            <div className="campus-lightbox-controls">
              <button type="button" aria-label="Previous image" onClick={() => setActiveIndex((current) => (current === null ? null : (current - 1 + campusGallery.length) % campusGallery.length))}>←</button>
              <button type="button" aria-label="Next image" onClick={() => setActiveIndex((current) => (current === null ? null : (current + 1) % campusGallery.length))}>→</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
