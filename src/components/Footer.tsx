import { getRouteHref } from '../data/routes'
import { footerNavigation, siteInfo } from '../data/site'
import type { SiteRoute } from '../data/types'
import { Container } from './Layout'

export function Footer({ route }: { route: SiteRoute }) {
  return (
    <footer className="site-footer">
      <Container className="footer-layout">
        <div className="footer-links">
          <div className="footer-identity">
            <a className="brand" href={getRouteHref(route.path, '/')} aria-label="Lords Skill Academy home">{siteInfo.shortName}</a>
            <p>{siteInfo.description}</p>
            <p className="institutional-note">{siteInfo.institution.relationship} {siteInfo.institution.name}.</p>
          </div>
          <div className="footer-nav-grid">
            {footerNavigation.map((group) => (
              <nav className="footer-column" aria-label={group.label} key={group.label}>
                <h2>{group.label}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.path}><a href={getRouteHref(route.path, link.path)}>{link.label}</a></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <nav className="footer-social-column" aria-label="Follow LSA">
            <h2>Follow LSA</h2>
            <ul>
              {siteInfo.socialLinks.map((socialLink) => (
                <li key={socialLink.label}><a href={socialLink.url} target="_blank" rel="noreferrer">{socialLink.label} <span aria-hidden="true">↗</span></a></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-map">
          <h2>LSA Office</h2>
          <div className="footer-contact-links">
            <a href={`mailto:${siteInfo.contact.email}`}>{siteInfo.contact.email}</a>
            <a href={`tel:${siteInfo.contact.phone}`}>{siteInfo.contact.phone}</a>
          </div>
          <iframe title="Lords Skill Academy location in Hyderabad" src={siteInfo.contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} {siteInfo.name}</p>
          <p>Designed &amp; Developed by Abdul Vasay</p>
          {siteInfo.legalLinks.map((legalLink) => <a href={legalLink.url} key={legalLink.label}>{legalLink.label}</a>)}
        </div>
      </Container>
    </footer>
  )
}
