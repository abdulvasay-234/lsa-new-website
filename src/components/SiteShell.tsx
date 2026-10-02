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

const darkHeaderSections = '.home-hero, .hero-morph-landing, .identity-strip, .philosophy-section, .blog-page-hero, .blog-page-cta, .blog-post-hero, .program-detail-hero, .contact-page-hero, .about-page-hero, .campus-page-hero, .campus-editorial-hero, .campus-page-motion, .events-community-hero, .programs-page-hero, .learning-page-hero, .certificates-page-hero, .certificate-verification-info, .certificates-page-cta, .trainers-page-hero, .trainers-principles-section, .trainers-page-cta, .site-footer'

export function SiteShell({ children, route }: PropsWithChildren<{ route: SiteRoute }>) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkHeader, setIsDarkHeader] = useState(false)

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    const hero = document.querySelector<HTMLElement>('#main-content .home-hero, #main-content .programs-page-hero, #main-content .learning-page-hero, #main-content .campus-page-hero, #main-content .certificates-page-hero, #main-content .trainers-page-hero, #main-content .about-page-hero, #main-content .contact-page-hero, #main-content .blog-page-hero, #main-content .blog-post-hero, #main-content .program-detail-hero')
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>(darkHeaderSections))
    let frame = 0

    const handleScroll = () => {
      const headerBottom = header?.getBoundingClientRect().bottom ?? 80
      const threshold = hero ? hero.getBoundingClientRect().bottom <= headerBottom : window.scrollY > 24
      setIsScrolled((current) => (current === threshold ? current : threshold))

      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const activeDarkSection = darkSections.some((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= headerBottom + 12 && bounds.bottom > headerBottom + 12
        })
        setIsDarkHeader((current) => (current === activeDarkSection ? current : activeDarkSection))
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const media = gsap.matchMedia()
    media.add({ isDesktop: '(min-width: 821px) and (prefers-reduced-motion: no-preference)', isMobile: '(max-width: 820px) and (prefers-reduced-motion: no-preference)' }, (context) => {
      const isMobile = context.conditions?.isMobile
      const animationContext = gsap.context(() => {
        const revealTargets = gsap.utils.toArray<HTMLElement>('#main-content .section:not(.home-hero) .section-marker, #main-content .section:not(.home-hero) h2, #main-content .section:not(.home-hero) h3, #main-content .section:not(.home-hero) p, #main-content .section:not(.home-hero) .button, #main-content .section:not(.home-hero) img, #main-content .section:not(.home-hero) li')

        revealTargets.forEach((element) => {
          if (element.closest('.learning-section, .programs-outcomes-section') || (isMobile && element.closest('.program-detail-gains'))) return
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
      return () => animationContext.revert()
    })

    return () => {
      media.revert()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header${route.path === '/' ? ' is-home' : ''}${isScrolled ? ' is-scrolled' : ''}${isDarkHeader || (route.path === '/' && !isScrolled) ? ' is-dark' : ''}`}>
        <Container className="header-layout">
          <a className="brand header-brand" href={getRouteHref(route.path, '/')} aria-label="Lords Skill Academy home">
            <span className="brand-logo-holder">
              <img
                src={isDarkHeader || (route.path === '/' && !isScrolled) ? siteInfo.logos.lsaWhite.src : siteInfo.logos.lsa.src}
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
