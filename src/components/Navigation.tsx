import { useEffect, useState } from 'react'
import type { SiteRoute } from '../data/types'
import { getRouteHref, routes } from '../data/routes'
import { siteNavigation } from '../data/site'
import { ButtonLink } from './Button'

export function Navigation({ route }: { route: SiteRoute }) {
  const [isOpen, setIsOpen] = useState(false)
  const primaryRoutes = routes.filter((item) => item.section === 'primary')

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true" className={`menu-toggle-icon${isOpen ? ' is-open' : ''}`}>
          <span />
          <span />
          <span />
        </span>
      </button>
      <nav id="site-navigation" className={`site-navigation ${isOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <ul className="site-nav-list">
          {primaryRoutes.map((item) => {
            const group = siteNavigation.find((navigationItem) => navigationItem.path === item.path)
            return (
              <li className={group?.children ? 'site-nav-group' : undefined} key={item.path}>
                <a href={getRouteHref(route.path, item.path)} aria-current={item.path === route.path ? 'page' : undefined} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
                {group?.children && (
                  <ul className="site-subnav">
                    {group.children.map((child) => (
                      <li key={child.path}>
                        <a href={getRouteHref(route.path, child.path)} aria-current={child.path === route.path ? 'page' : undefined} onClick={() => setIsOpen(false)}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
          <li className="site-nav-cta">
            <ButtonLink href={getRouteHref(route.path, '/contact')} variant="primary" onClick={() => setIsOpen(false)}>Contact</ButtonLink>
          </li>
        </ul>
      </nav>
    </>
  )
}
