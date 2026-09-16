import { SiteShell } from './components/SiteShell'
import { Container, Section } from './components/Layout'
import { HomePage } from './components/HomePage'
import { ProgramsPage } from './components/ProgramsPage'
import { LearningPage } from './components/LearningPage'
import { ProgramDetailPage } from './components/ProgramDetailPage'
import { ContactPage } from './components/ContactPage'
import { AboutPage } from './components/AboutPage'
import { CampusPage } from './components/CampusPage'
import { BlogPage, BlogPostDetailPage } from './components/BlogPage'
import { getRoute } from './data/routes'
import { blogPosts, programs } from './data/content'
import { getProgramDetail } from './data/programs'

export function App({ pathname = window.location.pathname }: { pathname?: string }) {
  const route = getRoute(pathname)

  if (route.path === '/') {
    return <SiteShell route={route}><HomePage /></SiteShell>
  }

  if (route.path === '/programs') {
    return <SiteShell route={route}><ProgramsPage /></SiteShell>
  }

  if (route.path === '/learning') {
    return <SiteShell route={route}><LearningPage /></SiteShell>
  }

  if (route.path === '/contact') {
    return <SiteShell route={route}><ContactPage /></SiteShell>
  }

  if (route.path === '/about') {
    return <SiteShell route={route}><AboutPage /></SiteShell>
  }

  if (route.path === '/campus') {
    return <SiteShell route={route}><CampusPage /></SiteShell>
  }

  if (route.path === '/learning/blog') {
    return <SiteShell route={route}><BlogPage /></SiteShell>
  }

  const blogSlug = route.path.startsWith('/learning/blog/') ? route.path.split('/').pop() : undefined
  const blogPost = blogSlug ? blogPosts.find((item) => item.slug === blogSlug) : undefined
  if (blogPost) {
    return <SiteShell route={route}><BlogPostDetailPage post={blogPost} /></SiteShell>
  }

  const programSlug = route.path.startsWith('/programs/') ? route.path.split('/').pop() : undefined
  const program = programSlug ? getProgramDetail(programSlug, programs.find((item) => item.slug === programSlug)) : undefined
  if (program) {
    return <SiteShell route={route}><ProgramDetailPage program={program} routePath={route.path} /></SiteShell>
  }

  return (
    <SiteShell route={route}>
      <Section className="foundation-placeholder">
        <Container>
          <p className="eyebrow">Lords Skill Academy</p>
          <h1>Static site foundation</h1>
          <p>This route is ready for verified LSA content.</p>
        </Container>
      </Section>
    </SiteShell>
  )
}

export default App
