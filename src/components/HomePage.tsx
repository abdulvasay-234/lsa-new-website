import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { homepageContent } from '../data/homepage'
import { programs, testimonials, youtubeVideos } from '../data/content'
import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'
import { organizationSchema } from '../lib/structured-data'
import { ButtonLink } from './Button'
import { Card } from './Card'
import { ResponsiveImage, YouTubeFacade } from './Media'
import { Container, Grid, Section } from './Layout'

const homepageSocialLinks = [
  { label: 'YouTube', icon: 'youtube', url: siteInfo.youtubeChannelUrl },
  { label: 'Threads', icon: 'threads', url: 'https://www.threads.net/' },
  { label: 'X', icon: 'x', url: 'https://x.com/' },
  { label: 'GitHub', icon: 'github', url: 'https://github.com/' },
  { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/lords-skill-academy' },
  { label: 'Slack', icon: 'slack', url: 'https://slack.com/' },
]

gsap.registerPlugin(ScrollTrigger)

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

function PhilosophyJourney() {
  const stages = homepageContent.philosophy.stages

  return (
    <Container>
      <div className="section-heading philosophy-heading">
        <p className="section-marker section-marker-yellow">02 — HOW LSA LEARNS</p>
        <h2>{homepageContent.philosophy.title}</h2>
      </div>
      <ol className="philosophy-path">
        {stages.map((stage, index) => (
          <li key={stage.name}>
            <span className="philosophy-index">0{index + 1}</span>
            <div>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Container>
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

export function HomePage() {
  const learningSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = learningSectionRef.current
    const section = heading?.closest('.learning-section')
    if (!section) return

    const animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
        .from('.learning-ecosystem-card', { opacity: 0, y: 120, duration: 0.65, ease: 'power3.out', stagger: 0.8 })

      return () => timeline.kill()
    }, section)

    return () => animationContext.revert()
  }, [])

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
          <div className="section-heading editorial-heading">
            <p className="section-marker">01 — WHAT IS LSA?</p>
            <h2>{homepageContent.about.title}</h2>
            <div className="editorial-copy">
              <p>{homepageContent.about.body}</p>
              <p>{homepageContent.about.supportingBody}</p>
            </div>
          </div>
          <div className="editorial-media">
            {homepageContent.campus.media.length > 0 && (
              <div className="editorial-media-card editorial-media-card-main">
                <ResponsiveImage asset={homepageContent.campus.media[0]} loading="eager" />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section className="philosophy-section">
        <PhilosophyJourney />
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
                <div className="program-card-top"><span className="program-index">0{index + 1}</span></div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                {program.keywords && <ul className="program-keywords">{program.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}</ul>}
                <ButtonLink href={getRouteHref('/', `/programs/${program.slug}`)} variant="link">Explore {program.title}</ButtonLink>
              </Card>
            ))}
          </Grid>
          <ButtonLink className="programs-all-button" href={getRouteHref('/', '/programs')} variant="secondary">Explore all programs</ButtonLink>
        </Container>
      </Section>

      <Section className="campus-section">
        <Container className="campus-layout">
          <div>
            <p className="section-marker">04 — CAMPUS</p>
            <h2>{homepageContent.campus.title}</h2>
            <p>{homepageContent.campus.body}</p>
            <p>{homepageContent.campus.supportingBody}</p>
            <div className="campus-editorial-line" aria-label="Campus learning activities">
              {homepageContent.campus.editorialItems.map((item) => <span key={item}>{item}</span>)}
            </div>
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
          <div className="learning-ecosystem-head" ref={learningSectionRef}>
            <p className="section-marker">07 — LEARNING ECOSYSTEM</p>
            <h2>We see a world where money moves freely and opportunity follows.</h2>
          </div>

          <div className="learning-ecosystem-grid">
            <a className="learning-ecosystem-card learning-ecosystem-card--mint" href={getRouteHref('/', '/learning/lms')}>
              <div>
                <h3>LMS</h3>
                <p>Your learning environment.</p>
              </div>
              <small>Access your courses, learning materials, and academic experience.</small>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="learning-ecosystem-card learning-ecosystem-card--peach" href={getRouteHref('/', '/learning/blog')}>
              <div>
                <h3>Blog</h3>
                <p>Ideas, insights, and technology.</p>
              </div>
              <small>Explore articles, perspectives, and practical knowledge from the LSA ecosystem.</small>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="learning-ecosystem-card learning-ecosystem-card--lavender" href={getRouteHref('/', '/learning/resources')}>
              <div>
                <h3>Resources</h3>
                <p>Keep building.</p>
              </div>
              <small>Explore useful resources to support your learning, projects, and continued practice.</small>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
      </Section>

      <Section className="numbers-section" aria-labelledby="numbers-heading">
        <Container className="numbers-container">
          <div className="numbers-layout">
            <div className="numbers-intro">
              <p className="section-marker">08 — LSA IN NUMBERS</p>
              <h2 id="numbers-heading">Learning that goes beyond the classroom.</h2>
              <div className="numbers-note">
                <p>From early experiments to real-world systems,<br />this is what progress looks like in practice.</p>
              </div>
            </div>

            <div className="numbers-metrics" aria-label="LSA numbers overview">
              <div className="numbers-stat">
                <strong>800+</strong>
                <span>LEARNERS</span>
              </div>
              <div className="numbers-stat">
                <strong>300+</strong>
                <span>INTERNSHIP &amp; TRAINING PARTICIPANTS</span>
              </div>
              <div className="numbers-stat">
                <strong>10+</strong>
                <span>INDUSTRY TRAINERS</span>
              </div>
              <div className="numbers-stat">
                <strong>10+</strong>
                <span>TECHNOLOGY PROGRAMS</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="home-contact-strip">
        <Container className="home-contact-grid">
          <div className="home-contact-block">
            <h2>Stay up to date</h2>
            <p>Sign up for our newsletter and keep up to date with our news and events</p>
            <a className="home-contact-primary" href={`mailto:${siteInfo.contact.email}?subject=LSA newsletter subscription`}>Subscribe <span aria-hidden="true">→</span></a>
          </div>
          <div className="home-contact-block">
            <h2>Contact us</h2>
            <p>Have a question? We have answers. Send us a message, and we will get back to you.</p>
            <ButtonLink href={getRouteHref('/', '/contact')} variant="outline">Contact us</ButtonLink>
          </div>
          <div className="home-contact-block home-contact-social">
            <h2>Social Links</h2>
            <ul>
              {homepageSocialLinks.map((socialLink) => <li key={socialLink.label}><a href={socialLink.url} target="_blank" rel="noreferrer" aria-label={socialLink.label}><span className={`social-logo social-logo--${socialLink.icon}`} aria-hidden="true" /></a></li>)}
            </ul>
          </div>
        </Container>
      </Section>

    </>
  )
}
