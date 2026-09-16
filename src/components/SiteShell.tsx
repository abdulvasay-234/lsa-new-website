import type { PropsWithChildren } from 'react'
import type { SiteRoute } from '../data/types'
import { Container } from './Layout'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { getRouteHref } from '../data/routes'

export function SiteShell({ children, route }: PropsWithChildren<{ route: SiteRoute }>) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Container className="header-layout">
          <a className="brand" href={getRouteHref(route.path, '/')} aria-label="Lords Skill Academy home">LSA</a>
          <Navigation route={route} />
        </Container>
      </header>
      <main id="main-content">{children}</main>
      <Footer route={route} />
    </>
  )
}
