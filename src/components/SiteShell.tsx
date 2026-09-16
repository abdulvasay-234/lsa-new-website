import { useEffect, useState, type PropsWithChildren } from 'react'
import type { SiteRoute } from '../data/types'
import { Container } from './Layout'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'

export function SiteShell({ children, route }: PropsWithChildren<{ route: SiteRoute }>) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.scrollY > 24
      setIsScrolled((current) => (current === threshold ? current : threshold))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <Container className="header-layout">
          <a className="brand header-brand" href={getRouteHref(route.path, '/')} aria-label="Lords Skill Academy home">
            <span className="brand-logo-holder">
              <img src={siteInfo.logos.lsa.src} alt={siteInfo.logos.lsa.alt} width={siteInfo.logos.lsa.width} height={siteInfo.logos.lsa.height} />
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
