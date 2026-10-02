import { getRouteHref } from '../data/routes'
import { eventArchive, eventCategories, eventPhotos, featuredEvents } from '../data/events'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'
import { EventArchive, EventCard, EventCategory, EventGallery } from './EventsPageSections'

export function EventsCommunityPage() {
  return (
    <>
      <Section className="events-community-hero">
        <Container className="events-community-hero-layout">
          <div className="events-community-hero-copy">
            <h1>Learning doesn&apos;t stop at the classroom.</h1>
            <p>LSA creates opportunities for learners to learn together, build together, compete, contribute, and experience technology beyond regular coursework.</p>
            <p className="events-category-line">WORKSHOPS <span>·</span> HACKATHONS <span>·</span> COMPETITIONS <span>·</span> INDUSTRY VISITS <span>·</span> COMMUNITY <span>·</span> OPEN LEARNING</p>
          </div>
        </Container>
      </Section>

      <Section className="events-what-we-do" id="events-categories">
        <Container>
          <div className="events-section-heading events-two-column-heading">
            <div><h2>More than events. Experiences that bring people together.</h2></div>
          </div>
          <div className="events-category-grid">
            {eventCategories.map((category) => <EventCategory key={category.number} category={category} />)}
          </div>
        </Container>
      </Section>

      <Section className="events-approach">
        <Container>
          <div className="events-approach-layout">
            <div><h2>We create spaces where people can learn together.</h2></div>
          </div>
          <ol className="events-process-list" aria-label="How LSA learning experiences unfold">
            {['LEARN', 'PARTICIPATE', 'BUILD', 'COLLABORATE', 'SHARE'].map((step, index) => <li key={step}><span>{`0${index + 1}`}</span>{step}</li>)}
          </ol>
        </Container>
      </Section>

      <Section className="events-featured" id="featured-events">
        <Container>
          <div className="events-section-heading">
            <h2>Experiences worth coming together for.</h2>
            <p>Featured event details are published here when LSA has confirmed the record.</p>
          </div>
          {featuredEvents.length > 0 ? (
            <div className="events-featured-list">{featuredEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>
          ) : (
            <div className="events-featured-empty">
              <span className="events-featured-index" aria-hidden="true">LSA</span>
              <div><p className="events-featured-label">FEATURED EVENT RECORD</p><p>No verified event name, date, location, or event-specific image is available to feature yet.</p></div>
              <span className="events-featured-status">DETAILS PENDING</span>
            </div>
          )}
        </Container>
      </Section>

      <Section className="events-archive-section" id="events-archive">
        <Container>
          <div className="events-section-heading events-two-column-heading">
            <div><h2>Moments that have shaped the LSA community.</h2></div>
            <p>Dates and event details are added to the archive only when they have been confirmed.</p>
          </div>
          <EventArchive periods={eventArchive} />
        </Container>
      </Section>

      <Section className="events-impact">
        <Container>
          <div className="events-section-heading">
            <div><h2>Learning can create impact beyond the learner.</h2></div>
          </div>
          <div className="events-impact-grid">
            <article><span>01</span><h3>COMMUNITY SERVICE</h3><p>Using skills and resources to contribute beyond the classroom.</p></article>
            <article><span>02</span><h3>KNOWLEDGE SHARING</h3><p>Creating opportunities for people to learn from one another.</p></article>
            <article><span>03</span><h3>OPEN LEARNING SPACES</h3><p>Making room for learners, builders, educators, and technology enthusiasts to connect and experiment.</p></article>
          </div>
        </Container>
      </Section>

      <Section className="events-photo-journal" id="photo-journal">
        <Container>
          <div className="events-section-heading events-two-column-heading">
            <div><h2>Moments from the LSA community.</h2></div>
            <p>Documentary glimpses of learners sharing space, focusing, and working alongside one another.</p>
          </div>
          <EventGallery photos={eventPhotos} />
        </Container>
      </Section>

      <Section className="events-community-cta">
        <Container className="events-community-cta-layout">
          <div><h2>There&apos;s always something happening.</h2><p>Explore upcoming learning experiences, events, workshops, and activities at Lords Skill Academy.</p></div>
          <div className="button-row">
            <ButtonLink href={getRouteHref('/campus/events', '/programs')}>Explore Programs <span aria-hidden="true">→</span></ButtonLink>
            <ButtonLink href={getRouteHref('/campus/events', '/contact')} variant="outline">Contact LSA <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  )
}