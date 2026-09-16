import { useMemo, useState } from 'react'
import { getRouteHref } from '../data/routes'
import type { BlogPost } from '../data/types'
import { blogPosts } from '../data/content'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function renderBody(content: string) {
  return content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
    <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
  ))
}

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', ...new Set(blogPosts.map((post) => post.category))]

  const filteredPosts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()

    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author}`.toLowerCase()
      const matchesSearch = !normalizedTerm || haystack.includes(normalizedTerm)
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  const featuredPost = filteredPosts[0] ?? blogPosts[0]
  const relatedPosts = filteredPosts.filter((post) => post.slug !== featuredPost.slug)

  return (
    <>
      <Section className="blog-page-hero">
        <Container className="blog-page-hero-layout">
          <div>
            <p className="section-marker section-marker-yellow">01 — LSA BLOG</p>
            <h1>Technology learning, explained in context.</h1>
          </div>
          <p>
            LSA&apos;s blog is a practical learning journal: technology ideas, campus learning, project thinking,
            and the kinds of experiences that help students move from theory to capability.
          </p>
        </Container>
      </Section>

      <Section className="blog-page-feature-section">
        <Container className="blog-page-feature-layout">
          <div className="blog-page-feature-copy">
            <p className="section-marker">02 — FEATURED STORY</p>
            <span className="blog-page-category">{featuredPost.category}</span>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <div className="blog-page-meta">
              <span>{featuredPost.author}</span>
              <span>{formatDate(featuredPost.publishDate)}</span>
            </div>
            <div className="button-row">
              <ButtonLink href={getRouteHref('/learning/blog', `/learning/blog/${featuredPost.slug}`)}>Read article →</ButtonLink>
            </div>
          </div>

          <aside className="blog-page-feature-aside">
            <p className="blog-page-aside-kicker">Why this matters</p>
            <ul>
              <li>Practical knowledge for students and curious learners</li>
              <li>Workshops, projects, and campus learning in context</li>
              <li>Clear thinking around technology, skills, and growth</li>
            </ul>
          </aside>
        </Container>
      </Section>

      <Section className="blog-page-library">
        <Container>
          <div className="blog-page-toolbar">
            <div className="blog-page-search">
              <label htmlFor="blog-search" className="sr-only">
                Search blog articles
              </label>
              <input
                id="blog-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search articles"
              />
            </div>

            <div className="blog-page-filters" aria-label="Blog categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? 'is-selected' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="blog-page-empty">
              <p>No articles match that search.</p>
              <button type="button" className="button button-secondary" onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}>
                Reset filters
              </button>
            </div>
          ) : (
            <div className="blog-page-list">
              {filteredPosts.map((post, index) => (
                <article className="blog-page-card" key={post.slug}>
                  <span className="blog-page-card-index">{`0${index + 1}`}</span>
                  <div className="blog-page-card-header">
                    <span className="blog-page-category">{post.category}</span>
                    <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-page-card-footer">
                    <span>{post.author}</span>
                    <ButtonLink href={getRouteHref('/learning/blog', `/learning/blog/${post.slug}`)} variant="link">
                      Read story
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section className="blog-page-insight-section">
        <Container className="blog-page-insight-layout">
          <div>
            <p className="section-marker">03 — KNOWLEDGE HUB</p>
            <h2>Learning stories with a practical lens.</h2>
          </div>
          <div className="blog-page-insight-list">
            {relatedPosts.slice(0, 3).map((post) => (
              <article key={post.slug}>
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <ButtonLink href={getRouteHref('/learning/blog', `/learning/blog/${post.slug}`)} variant="link">
                  Continue reading
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="blog-page-cta">
        <Container className="blog-page-cta-layout">
          <div>
            <p className="section-marker section-marker-yellow">04 — START LEARNING</p>
            <h2>Explore the experience behind the learning.</h2>
          </div>
          <div className="button-row">
            <ButtonLink href={getRouteHref('/learning/blog', '/programs')}>Explore programs →</ButtonLink>
            <ButtonLink href={getRouteHref('/learning/blog', '/contact')} variant="outline">Contact LSA →</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  )
}

export function BlogPostDetailPage({ post }: { post: BlogPost }) {
  const articlePath = `/learning/blog/${post.slug}`

  return (
    <>
      <Section className="blog-post-hero">
        <Container className="blog-post-hero-layout">
          <div>
            <p className="section-marker section-marker-yellow">LSA BLOG</p>
            <span className="blog-page-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="blog-page-meta">
              <span>{post.author}</span>
              <span>{formatDate(post.publishDate)}</span>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="blog-post-content-wrap">
        <Container className="blog-post-content-layout">
          <article className="blog-post-article">
            {renderBody(post.content)}
          </article>

          <aside className="blog-post-sidebar">
            <div className="blog-post-sidebar-card">
              <p className="blog-post-sidebar-kicker">Article focus</p>
              <p>{post.excerpt}</p>
            </div>
            <div className="blog-post-sidebar-card">
              <p className="blog-post-sidebar-kicker">Explore more</p>
              <ul>
                {blogPosts
                  .filter((item) => item.slug !== post.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.slug}>
                      <a href={getRouteHref(articlePath, `/learning/blog/${item.slug}`)}>{item.title}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      <Section className="blog-post-cta">
        <Container className="blog-page-cta-layout">
          <div>
            <p className="section-marker section-marker-yellow">NEXT STEP</p>
            <h2>Keep exploring LSA.</h2>
          </div>
          <div className="button-row">
            <ButtonLink href={getRouteHref(articlePath, '/learning/blog')}>Back to blog →</ButtonLink>
            <ButtonLink href={getRouteHref(articlePath, '/programs')} variant="outline">Explore programs →</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  )
}
