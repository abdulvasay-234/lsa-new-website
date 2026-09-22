import { useEffect, useState, type PropsWithChildren } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteRoute } from '../data/types'
import { Container } from './Layout'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

const darkHeaderSections = '.home-hero, .philosophy-section, .blog-page-cta, .blog-post-hero, .program-detail-hero, .contact-page-hero, .about-page-hero, .campus-editorial-hero, .campus-page-motion, .programs-page-hero, .learning-page-hero, .certificates-page-hero, .certificate-verification-info, .certificates-page-cta, .trainers-page-hero, .trainers-principles-section, .trainers-page-cta, .site-footer'

export function SiteShell({ children, route }: PropsWithChildren<{ route: SiteRoute }>) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkHeader, setIsDarkHeader] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = document.querySelector<HTMLElement>('.site-header')
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>(darkHeaderSections))
    let frame = 0

    const handleScroll = () => {
      const threshold = window.scrollY > 24
      setIsScrolled((current) => (current === threshold ? current : threshold))

      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const headerBottom = header?.getBoundingClientRect().bottom ?? 80
        const activeDarkSection = darkSections.some((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= headerBottom + 12 && bounds.bottom > headerBottom + 12
        })
        setIsDarkHeader((current) => (current === activeDarkSection ? current : activeDarkSection))
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    if (!reducedMotion) {
      const animationContext = gsap.context(() => {
        const revealTargets = gsap.utils.toArray<HTMLElement>('#main-content .section:not(.home-hero) .section-marker, #main-content .section:not(.home-hero) h2, #main-content .section:not(.home-hero) h3, #main-content .section:not(.home-hero) p, #main-content .section:not(.home-hero) .button, #main-content .section:not(.home-hero) img, #main-content .section:not(.home-hero) li')

        revealTargets.forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 28,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          })
        })
      })

      return () => {
        animationContext.revert()
        window.cancelAnimationFrame(frame)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}${isDarkHeader ? ' is-dark' : ''}`}>
        <Container className="header-layout">
          <a className="brand header-brand" href={getRouteHref(route.path, '/')} aria-label="Lords Skill Academy home">
            <span className="brand-logo-holder">
              <img
                src={isDarkHeader ? siteInfo.logos.lsaWhite.src : siteInfo.logos.lsa.src}
                alt={siteInfo.logos.lsa.alt}
                width={siteInfo.logos.lsa.width}
                height={siteInfo.logos.lsa.height}
              />
            </span>
          </a>
          <Navigation route={route} />
        </Container>
      </header>
      <main id="main-content">{children}</main>
      <Footer route={route} />
    </>
  )
}
