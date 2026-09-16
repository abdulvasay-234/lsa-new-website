import type { PropsWithChildren } from 'react'
import type { SiteRoute } from '../data/types'
import { Container } from './Layout'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'

export function SiteShell({ children, route }: PropsWithChildren<{ route: SiteRoute }>) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
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
