import type { BlogPost, Event, LmsCourse, SiteRoute } from '../data/types'
import { siteInfo } from '../data/site'

type OrganizationType = 'Organization' | 'EducationalOrganization'

export function organizationSchema(type: OrganizationType = 'Organization') {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: siteInfo.name,
    url: siteInfo.url || undefined,
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: siteInfo.institution.name,
    },
    sameAs: siteInfo.socialLinks.map((socialLink) => socialLink.url),
  }
}

export function educationalOrganizationSchema() {
  return organizationSchema('EducationalOrganization')
}

export function courseSchema(course: LmsCourse, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    url: siteInfo.url ? new URL(path, siteInfo.url).toString() : path,
    provider: organizationSchema(),
  }
}

export function articleSchema(post: BlogPost, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: { '@type': 'Person', name: post.author },
    url: siteInfo.url ? new URL(path, siteInfo.url).toString() : path,
  }
}

export function eventSchema(event: Event, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.location ? { '@type': 'Place', name: event.location } : undefined,
    url: siteInfo.url ? new URL(path, siteInfo.url).toString() : path,
  }
}

export function breadcrumbSchema(routeTrail: SiteRoute[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: routeTrail.map((route, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: route.label,
      item: siteInfo.url ? new URL(route.path, siteInfo.url).toString() : route.path,
    })),
  }
}
