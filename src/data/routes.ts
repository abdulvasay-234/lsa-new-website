import type { SiteRoute } from './types'
import routeData from '../../content/routes.json'

export const routes = routeData as SiteRoute[]

function normalizePathname(pathname: string) {
  const basePath = import.meta.env.BASE_URL
  const configuredBase = basePath === './' ? '' : basePath.replace(/\/$/, '')
  const hasBase = configuredBase && (pathname === configuredBase || pathname.startsWith(`${configuredBase}/`))
  const withoutBase = hasBase ? pathname.slice(configuredBase.length) : pathname
  return withoutBase.replace(/\/+$/, '') || '/'
}

export function getRoute(pathname: string): SiteRoute {
  const normalizedPath = normalizePathname(pathname)
  return routes.find((route) => route.path === normalizedPath) ?? {
    path: normalizedPath,
    label: 'Page not found',
    section: 'secondary',
    title: 'Page not found | Lords Skill Academy',
    description: 'The requested Lords Skill Academy page could not be found.',
  }
}

export function getRouteHref(pathname: string, target: string): string {
  const basePath = import.meta.env.BASE_URL
  if (basePath !== './') return `${basePath}${target === '/' ? '' : target.slice(1)}`

  const depth = pathname.split('/').filter(Boolean).length
  return `${'../'.repeat(depth)}${target === '/' ? '' : target.slice(1)}` || './'
}
