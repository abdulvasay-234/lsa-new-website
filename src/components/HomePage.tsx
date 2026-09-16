import { useEffect, useRef, useState, type FormEvent } from 'react'
import { homepageContent } from '../data/homepage'
import { programs, testimonials, youtubeVideos } from '../data/content'
import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'
import { organizationSchema } from '../lib/structured-data'
import { ButtonLink } from './Button'
import { Card } from './Card'
import { ResponsiveImage, YouTubeFacade } from './Media'
import { Container, Grid, Section } from './Layout'

function MediaPlaceholder({ label }: { label: string }) {
  return <div className="media-placeholder" role="img" aria-label={`${label} media slot`}>{label}</div>
}

function SmoothHeroVideo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null])
  const activeRef = useRef(0)
  const isTransitioning = useRef(false)
  const source = `${import.meta.env.BASE_URL}media/My Movie 3.mp4`

  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index]
    if (!video || index !== activeRef.current || isTransitioning.current || !Number.isFinite(video.duration)) return
    if (video.duration - video.currentTime > 0.8) return

    const nextIndex = index === 0 ? 1 : 0
    const nextVideo = videoRefs.current[nextIndex]
    if (!nextVideo) return

    isTransitioning.current = true
    nextVideo.currentTime = 0
    void nextVideo.play()
    activeRef.current = nextIndex
    setActiveIndex(nextIndex)
    window.setTimeout(() => {
      video.pause()
      video.currentTime = 0
      isTransitioning.current = false
    }, 800)
  }

  return (
    <>
      {[0, 1].map((index) => (
        <video
          className={`hero-video ${activeIndex === index ? 'is-active' : ''}`}
          key={index}
          ref={(element) => { videoRefs.current[index] = element }}
          autoPlay={index === 0}
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden={index === 1}
          aria-label={index === 0 ? 'Lords Skill Academy learning in action' : undefined}
          onTimeUpdate={() => handleTimeUpdate(index)}
        >
          <source src={source} type="video/mp4" />
        </video>
      ))}
    </>
  )
}

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(value)
  const statRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = statRef.current
    if (!element) return
    const finish = () => setDisplayValue(value)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      finish()
      return
    }

    let frame = 0
    let hasStarted = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted) return
      hasStarted = true
      const startTime = performance.now()
      setDisplayValue(0)
      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / 900, 1)
        setDisplayValue(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <div className="number-item" ref={statRef}><strong>{displayValue}+</strong><span>{label}</span></div>
}

function VideoEvidence() {
  const videos = youtubeVideos
  if (videos.length === 0) {
    return (
      <div className="video-placeholder-grid" aria-label="YouTube video slots">
        {[1, 2, 3].map((slot) => (
          <article className="video-placeholder-card" key={slot}>
            <div className="video-placeholder-frame"><span className="video-play-mark" aria-hidden="true">Play</span></div>
            <div className="video-card-copy">
              <p className="card-kicker">LSA in motion</p>
              <h3>Verified video title</h3>
              <p>Real LSA video description will appear here.</p>
              <span className="video-watch-placeholder">Watch video <span aria-hidden="true">→</span></span>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="video-card-grid">
      {videos.slice(0, 3).map((video) => (
        <article className="video-card" key={video.id}>
          <YouTubeFacade {...video} />
          <div className="video-card-copy">
            <p className="card-kicker">{video.category || 'LSA in motion'}</p>
            <h3>{video.title}</h3>
            {video.description && <p>{video.description}</p>}
            <a className="video-watch-link" href={video.url} target="_blank" rel="noreferrer">Watch <span aria-hidden="true">→</span></a>
          </div>
        </article>
      ))}
    </div>
  )
}

function TestimonialEvidence() {
  const verifiedTestimonials = testimonials.filter((testimonial) => testimonial.verified)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canGoNext, setCanGoNext] = useState(verifiedTestimonials.length > 1)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    const updatePosition = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      setActiveIndex(Math.round(carousel.scrollLeft / Math.max(carousel.clientWidth / 3, 1)))
      setCanGoNext(carousel.scrollLeft < maxScroll - 2)
    }
    carousel.addEventListener('scroll', updatePosition, { passive: true })
    updatePosition()
    return () => carousel.removeEventListener('scroll', updatePosition)
  }, [])

  const moveCarousel = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({ left: direction * carouselRef.current.clientWidth / 3, behavior: 'smooth' })
  }

  return (
    <div className="testimonial-area">
      <div className="testimonial-heading-row">
        <div><p className="eyebrow">{homepageContent.testimonials.eyebrow}</p><h2>{homepageContent.testimonials.title}</h2><p>{homepageContent.testimonials.supportingLine}</p></div>
        <div className="rating-summary"><strong>★★★★★</strong><span>{homepageContent.testimonials.ratingSummary}</span></div>
      </div>
      <div className="testimonial-carousel" ref={carouselRef} tabIndex={0} aria-label="Student Google reviews">
        <div className="testimonial-track">
          {verifiedTestimonials.map((testimonial) => <article className="testimonial" key={testimonial.reviewerName}><p className="testimonial-source">{testimonial.source} · {'★'.repeat(testimonial.rating)}</p><blockquote>“{testimonial.quote}”</blockquote><p className="testimonial-reviewer">{testimonial.reviewerName}</p></article>)}
        </div>
      </div>
      <div className="testimonial-controls">
        <span className="testimonial-position">{Math.min(activeIndex + 1, verifiedTestimonials.length)} / {verifiedTestimonials.length}</span>
        <div><button type="button" className="carousel-control" aria-label="Previous reviews" disabled={activeIndex === 0} onClick={() => moveCarousel(-1)}>←</button><button type="button" className="carousel-control" aria-label="Next reviews" disabled={!canGoNext} onClick={() => moveCarousel(1)}>→</button></div>
      </div>
    </div>
  )
}

type InquiryValues = {
  fullName: string
  email: string
  phone: string
  interest: string
  program: string
  message: string
}

const initialInquiry: InquiryValues = {
  fullName: '', email: '', phone: '', interest: '', program: '', message: '',
}

function InquiryForm() {
  const [values, setValues] = useState(initialInquiry)
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryValues, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
  const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT

  const updateValue = (field: keyof InquiryValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof InquiryValues, string>> = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s().-]{7,}$/.test(values.phone)) nextErrors.phone = 'Enter a valid phone or WhatsApp number.'
    if (!values.interest) nextErrors.interest = 'Choose what you are interested in.'
    if (!values.message.trim()) nextErrors.message = 'Tell us what you are looking for.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    if (!endpoint) {
      setStatus('error')
      return
    }
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      if (!response.ok) throw new Error('Inquiry submission failed')
      setStatus('success')
      setValues(initialInquiry)
    } catch {
      setStatus('error')
    }
  }

  const field = (name: keyof InquiryValues, label: string, type = 'text', required = false) => (
    <label className="inquiry-field" htmlFor={`inquiry-${name}`}>
      <span>{label}{required && ' *'}</span>
      <input id={`inquiry-${name}`} name={name} type={type} required={required} value={values[name]} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `inquiry-${name}-error` : undefined} onChange={(event) => updateValue(name, event.target.value)} />
      {errors[name] && <small id={`inquiry-${name}-error`} className="field-error">{errors[name]}</small>}
    </label>
  )

  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <div className="inquiry-form-heading"><h3>Start a conversation</h3><p>Tell us what you're looking for and our team will get back to you.</p></div>
      <div className="inquiry-fields">
        {field('fullName', 'Full Name', 'text', true)}
        {field('email', 'Email Address', 'email', true)}
        {field('phone', 'Phone Number / WhatsApp', 'tel', true)}
        <label className="inquiry-field" htmlFor="inquiry-interest"><span>I am interested in *</span><select id="inquiry-interest" value={values.interest} aria-invalid={Boolean(errors.interest)} onChange={(event) => updateValue('interest', event.target.value)}><option value="">Select an option</option><option>Learning a program</option><option>Internship</option><option>Campus training</option><option>Workshop</option><option>College / institutional collaboration</option><option>Corporate training</option><option>Other</option></select>{errors.interest && <small className="field-error">{errors.interest}</small>}</label>
        <label className="inquiry-field" htmlFor="inquiry-program"><span>Program / Area of Interest</span><select id="inquiry-program" value={values.program} onChange={(event) => updateValue('program', event.target.value)}><option value="">Select an option</option><option>Data Science</option><option>Digital Marketing</option><option>Cyber Security</option><option>DevOps</option><option>Programming / Development</option><option>Other</option></select></label>
        <label className="inquiry-field inquiry-field-wide" htmlFor="inquiry-message"><span>Message / Requirement *</span><textarea id="inquiry-message" name="message" required value={values.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'inquiry-message-error' : undefined} onChange={(event) => updateValue('message', event.target.value)} />{errors.message && <small id="inquiry-message-error" className="field-error">{errors.message}</small>}</label>
      </div>
      {status === 'error' && <p className="inquiry-status inquiry-status-error" role="alert">Your details were not sent. The inquiry form is not connected to a submission service yet.</p>}
      {status === 'success' && <p className="inquiry-status inquiry-status-success" role="status">Your inquiry was sent successfully.</p>}
      <button className="inquiry-submit" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'SENDING INQUIRY…' : 'SEND INQUIRY'}</button>
    </form>
  )
}

export function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <Section className="home-hero">
        <SmoothHeroVideo />
        <Container className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{homepageContent.hero.eyebrow}</p>
            <h1>{homepageContent.hero.title}</h1>
            <p className="hero-body">{homepageContent.hero.body}</p>
            <div className="button-row">
              <ButtonLink href={getRouteHref('/', '/programs')}>Explore programs</ButtonLink>
              <ButtonLink href={getRouteHref('/', '/learning')} variant="outline">Explore learning</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="identity-strip" aria-label="LSA identity">
        <Container>
          <div className="identity-marquee">
            <div className="identity-track">
              <ul className="identity-list">
                {homepageContent.identitySignals.map((signal) => <li key={signal}>{signal}</li>)}
              </ul>
              <ul className="identity-list" aria-hidden="true">
                {homepageContent.identitySignals.map((signal) => <li key={signal}>{signal}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="institutional-section" aria-labelledby="institutional-heading">
        <Container className="institutional-layout">
          <p className="institutional-statement" id="institutional-heading">{siteInfo.institution.statement}</p>
          <div className="institutional-logo-frame" aria-label="LIET and LSA logos">
            <div className="institutional-logo institutional-logo-liet">
              <img src={siteInfo.logos.liet.src} alt={siteInfo.logos.liet.alt} width={siteInfo.logos.liet.width} height={siteInfo.logos.liet.height} />
            </div>
            <span className="institutional-logo-cross" aria-hidden="true">×</span>
            <div className="institutional-logo institutional-logo-lsa">
              <img src={siteInfo.logos.lsa.src} alt={siteInfo.logos.lsa.alt} width={siteInfo.logos.lsa.width} height={siteInfo.logos.lsa.height} />
            </div>
          </div>
          <p className="institutional-support">Backed by an established Engineering Institution.</p>
        </Container>
      </Section>

      <Section className="editorial-section">
        <Container className="editorial-layout">
          <div className="section-heading">
            <p className="section-marker">01 — WHAT IS LSA?</p>
            <h2>{homepageContent.about.title}</h2>
          </div>
          <div className="editorial-copy">
            <p>{homepageContent.about.body}</p>
            <p>{homepageContent.about.supportingBody}</p>
          </div>
          <MediaPlaceholder label="Real LSA learning photography" />
        </Container>
      </Section>

      <Section className="philosophy-section">
        <Container>
          <div className="section-heading philosophy-heading">
            <p className="section-marker section-marker-yellow">02 — HOW LSA LEARNS</p>
            <h2>{homepageContent.philosophy.title}</h2>
          </div>
          <ol className="philosophy-path">
            {homepageContent.philosophy.stages.map((stage, index) => (
              <li key={stage.name}>
                <span className="philosophy-index">0{index + 1}</span>
                <div><h3>{stage.name}</h3><p>{stage.description}</p></div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="programs-section">
        <Container>
          <div className="section-heading section-heading-wide">
            <p className="section-marker">03 — PROGRAMS</p>
            <h2>{homepageContent.programs.title}</h2>
            <p>{homepageContent.programs.body}</p>
          </div>
          <Grid className="program-list">
            {programs.map((program, index) => (
              <Card className="program-card" key={program.slug}>
                <div className="program-card-top"><p className="card-kicker">Program</p><span className="program-index">0{index + 1}</span></div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                {program.keywords && <ul className="program-keywords">{program.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}</ul>}
                <ButtonLink href={getRouteHref('/', `/programs/${program.slug}`)} variant="link">Explore {program.title}</ButtonLink>
              </Card>
            ))}
          </Grid>
          <ButtonLink href={getRouteHref('/', '/programs')} variant="secondary">Explore all programs</ButtonLink>
        </Container>
      </Section>

      <Section className="campus-section">
        <Container className="campus-layout">
          <div>
            <p className="section-marker">04 — CAMPUS</p>
            <h2>{homepageContent.campus.title}</h2>
            <p>{homepageContent.campus.body}</p>
            <ButtonLink href={getRouteHref('/', '/campus')} variant="outline">Explore campus work</ButtonLink>
          </div>
          <div className="campus-gallery">
            {homepageContent.campus.media.length > 0 ? homepageContent.campus.media.map((asset) => <ResponsiveImage asset={asset} key={asset.src} />) : <MediaPlaceholder label="Real LSA campus photography" />}
          </div>
        </Container>
      </Section>

      <Section className="video-section">
        <Container className="video-gallery-layout">
          <div className="section-heading section-heading-wide">
            <p className="section-marker">05 — LSA IN MOTION</p>
            <h2>See learning in the real world.</h2>
            <p>Workshops, campus activity, conversations, and practical learning experiences from LSA.</p>
          </div>
          <VideoEvidence />
          <a className="explore-youtube-link" href={siteInfo.youtubeChannelUrl} target="_blank" rel="noreferrer">Explore YouTube <span aria-hidden="true">→</span></a>
        </Container>
      </Section>

      <Section className="experience-section">
        <Container>
          <p className="section-marker">06 — STUDENT EXPERIENCES</p>
          <TestimonialEvidence />
        </Container>
      </Section>

      <Section className="learning-section">
        <Container>
          <div className="section-heading section-heading-wide">
            <p className="section-marker">07 — LEARNING ECOSYSTEM</p>
            <h2>{homepageContent.learning.title}</h2>
          </div>
          <div className="destination-list">
            {homepageContent.learning.destinations.map((destination) => (
              <a className="destination" href={getRouteHref('/', destination.path)} key={destination.path}>
                <span><span className="card-kicker">Learning destination</span><strong>{destination.label}</strong></span>
                <span>{destination.description}</span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="numbers-section" aria-labelledby="numbers-heading">
        <Container>
          <div className="numbers-heading-row">
            <p className="section-marker">08 — LSA IN NUMBERS</p>
            <h2 id="numbers-heading">Learning that goes beyond the classroom.</h2>
          </div>
          <div className="numbers-grid">
            <AnimatedStat value={800} label="LEARNERS" />
            <AnimatedStat value={300} label="INTERNSHIP & TRAINING PARTICIPANTS" />
            <AnimatedStat value={10} label="INDUSTRY TRAINERS" />
            <AnimatedStat value={10} label="TECHNOLOGY PROGRAMS" />
          </div>
        </Container>
      </Section>

      <Section className="contact-section">
        <Container className="contact-lead-layout">
          <div className="contact-lead-copy"><p className="section-marker section-marker-yellow">09 — LET&apos;S CONNECT</p><h2>Ready to build your next skill?</h2></div>
          <InquiryForm />
        </Container>
      </Section>

    </>
  )
}
