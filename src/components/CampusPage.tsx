import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

gsap.registerPlugin(ScrollTrigger)

const campusImages = [
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00752.jpg`, alt: 'Students learning technology together in an LSA classroom', label: 'WORKSHOPS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00621%20(1).jpg`, alt: 'Students collaborating during a practical LSA learning session', label: 'BUILD SESSIONS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00712.jpg`, alt: 'Learners taking part in hands-on technology training at LSA', label: 'TECHNOLOGY PROGRAMS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00664.jpg`, alt: 'Students discussing and applying ideas in an LSA classroom', label: 'STUDENT PROJECTS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00590%20(1).jpg`, alt: 'LSA students working together in a classroom environment', label: 'COMMUNITY EVENTS' },
] as const

const campusOffers = [
  ['TECHNOLOGY PROGRAMS', 'Structured learning experiences designed around practical technology skills and applied learning.'],
  ['WORKSHOPS & BOOTCAMPS', 'Focused, hands-on sessions introducing students to modern technologies, tools, workflows, and real-world applications.'],
  ['PROJECT-BASED LEARNING', 'Students turn concepts into practice by working on projects, technical challenges, and meaningful problems.'],
  ['HACKATHONS & BUILDATHONS', 'Collaborative build experiences where students explore ideas, solve problems, and create working solutions.'],
  ['INTERNSHIP TRAINING', 'Practical training that helps students understand how technical skills translate into real work environments.'],
  ['COMMUNITY & CAMPUS INITIATIVES', 'Technology communities, developer activities, events, and initiatives that extend learning beyond the classroom.'],
] as const

const beyondPrinciples = [
  ['LEARN', 'Understand the foundations and build a strong conceptual base.'],
  ['BUILD', 'Turn ideas and concepts into working projects.'],
  ['COLLABORATE', 'Work with peers, trainers, mentors, and communities.'],
  ['SOLVE', 'Apply technology to practical problems and challenges.'],
  ['PRESENT', 'Explain your approach, demonstrate your work, and share what you built.'],
] as const

const institutionOffers = [
  ['PROGRAM DESIGN', 'Create structured learning experiences around relevant technology skills.'],
  ['CAMPUS DELIVERY', 'Bring workshops, bootcamps, technology programs, and build experiences directly to students.'],
  ['PRACTICAL EXPOSURE', 'Give students opportunities to work with tools, projects, and real-world problem-solving.'],
  ['STUDENT ENGAGEMENT', 'Build communities, events, challenges, and hands-on experiences that encourage students to keep learning and building.'],
] as const

export function CampusPage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false)

  useEffect(() => {
    if (isSlideshowPaused) return
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % campusImages.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [isSlideshowPaused])

  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.campus-page-motion')
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animationContext = gsap.context(() => {
      gsap.fromTo(
        '.campus-motion-background img',
        { scale: 1 },
        {
          scale: 1.14,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      )
    }, section)

    return () => animationContext.revert()
  }, [])

  const moveSlide = (direction: -1 | 1) => {
    setActiveSlide((current) => (current + direction + campusImages.length) % campusImages.length)
  }

  return (
    <>
      <Section className="campus-page-hero">
        <Container className="campus-editorial-hero">
          <div className="campus-hero-copy">
            <p className="section-marker section-marker-yellow">04 — CAMPUS</p>
            <h1>Where academic learning meets practical technology.</h1>
            <p>LSA works with educational institutions to create <strong>hands-on technology learning experiences that complement academic education.</strong> Through <strong>workshops, bootcamps, technology programs, internships, hackathons, and projects</strong>, students get opportunities to explore modern technologies, build practical skills, and apply what they learn beyond the classroom.</p>
            <div className="button-row"><ButtonLink href="#campus-offerings">Explore campus work →</ButtonLink><ButtonLink href={getRouteHref('/campus', '/contact')} variant="outline">Work with LSA →</ButtonLink></div>
          </div>
          <figure className="campus-hero-image"><img src={campusImages[0].src} alt={campusImages[0].alt} width="5146" height="3217" loading="eager" decoding="async" /></figure>
        </Container>
      </Section>

      <Section className="campus-page-offerings" id="campus-offerings">
        <Container>
          <div className="campus-section-intro"><div><p className="section-marker">02 — WHAT WE BRING TO CAMPUS</p><h2>More than a workshop.</h2></div><p>LSA works with institutions to create <strong>practical technology experiences that give students more opportunities to learn, practise, build, and collaborate beyond regular academic sessions.</strong></p></div>
          <ol className="campus-editorial-list">{campusOffers.map(([title, description], index) => <li key={title}><span>{`0${index + 1}`}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </Container>
      </Section>

      <Section className="campus-page-motion">
        <div className="campus-motion-background" aria-hidden="true">
          {campusImages.slice(1, 4).map((image) => <img src={image.src} alt="" width="5146" height="3217" loading="lazy" key={image.src} />)}
        </div>
        <Container className="campus-motion-content">
          <div className="campus-section-intro"><div><p className="section-marker">04 — LEARNING IN MOTION</p><h2>Learning happens wherever people build.</h2></div></div>
        </Container>
      </Section>

      <Section className="campus-page-beyond">
        <Container className="campus-beyond-editorial"><div><p className="section-marker">05 — BEYOND THE CLASSROOM</p><h2>Learning changes when you get to use it.</h2></div><div><p className="campus-beyond-lead">Technology is easier to understand when students can <strong>experiment with it, build with it, solve problems, and learn alongside others.</strong> LSA creates opportunities to turn classroom concepts into practical experiences.</p><ol className="campus-principles-list">{beyondPrinciples.map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ol></div></Container>
      </Section>

      <Section className="campus-page-experiences">
        <Container>
          <div className="campus-section-intro"><div><p className="section-marker">06 — CAMPUS EXPERIENCES</p><h2>Real learning moments, close to the work.</h2></div><p>LSA brings practical technology learning to campus through <strong>workshops, build sessions, technology programs, student projects, internships, hackathons, and community events.</strong></p></div>
          <div className="campus-slideshow" onMouseEnter={() => setIsSlideshowPaused(true)} onMouseLeave={() => setIsSlideshowPaused(false)} onFocus={() => setIsSlideshowPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsSlideshowPaused(false) }}>
            <div className="campus-slideshow-viewport" aria-live="polite">
              <figure key={campusImages[activeSlide].src}>
                <img src={campusImages[activeSlide].src} alt={campusImages[activeSlide].alt} width="5146" height="3217" />
                <figcaption><span>{String(activeSlide + 1).padStart(2, '0')} / {String(campusImages.length).padStart(2, '0')}</span><strong>{campusImages[activeSlide].label}</strong></figcaption>
              </figure>
              <div className="campus-slideshow-controls">
                <button type="button" aria-label="Previous campus image" onClick={() => moveSlide(-1)}>←</button>
                <button type="button" aria-label="Next campus image" onClick={() => moveSlide(1)}>→</button>
              </div>
            </div>
            <div className="campus-slideshow-dots" aria-label="Choose a campus image">
              {campusImages.map((image, index) => (
                <button className={index === activeSlide ? 'is-active' : ''} type="button" key={image.src} aria-label={`Show ${image.label.toLowerCase()}`} aria-current={index === activeSlide ? 'true' : undefined} onClick={() => setActiveSlide(index)}>
                  <span className="sr-only">{image.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="campus-page-institutions">
        <Container className="campus-institution-layout"><div><p className="section-marker section-marker-yellow">07 — FOR INSTITUTIONS</p><h2>Build a stronger bridge between academics and industry.</h2><p>LSA partners with colleges and educational institutions to bring practical technology learning into the academic environment. From workshops and technology programs to hackathons, projects, and community initiatives, we help institutions create more opportunities for students to learn, build, and apply their skills.</p></div><ol className="campus-institution-list">{institutionOffers.map(([title, description], index) => <li key={title}><span>{`0${index + 1}`}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol></Container>
      </Section>

      <Section className="campus-page-final"><Container className="campus-final-layout"><div><p className="section-marker section-marker-yellow">08 — WORK WITH LSA</p><h2>Bring practical technology learning to your campus.</h2><p>Whether you are planning a workshop, technology program, internship initiative, hackathon, or larger campus engagement, start a conversation with LSA.</p></div><div className="button-row"><ButtonLink href={getRouteHref('/campus', '/contact')}>Work with LSA →</ButtonLink><ButtonLink href={getRouteHref('/campus', '/contact')} variant="outline">Contact LSA →</ButtonLink></div></Container></Section>
    </>
  )
}
