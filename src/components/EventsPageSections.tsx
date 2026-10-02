import type { EventArchivePeriod, EventCategoryData, EventPhoto, EventRecord } from '../data/events'

export function EventCategory({ category }: { category: EventCategoryData }) {
  return (
    <article className="events-category-item">
      <span>{category.number}</span>
      <div><h3>{category.title}</h3><p>{category.description}</p></div>
      <span className="events-category-mark" aria-hidden="true">↗</span>
    </article>
  )
}

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="event-record">
      <div className="event-record-images">{event.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />)}</div>
      <div className="event-record-copy">
        <p className="event-record-category">{event.category}</p>
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <dl>
          {event.date && <div><dt>Date</dt><dd><time>{event.date}</time></dd></div>}
          {event.year && <div><dt>Year</dt><dd>{event.year}</dd></div>}
          {event.location && <div><dt>Location</dt><dd>{event.location}</dd></div>}
        </dl>
        {event.href && <a href={event.href}>View event <span aria-hidden="true">→</span></a>}
      </div>
    </article>
  )
}

export function EventArchive({ periods }: { periods: EventArchivePeriod[] }) {
  return (
    <div className="events-archive-list">
      {periods.map((period) => (
        <section className="events-archive-period" key={period.label} aria-labelledby={`events-archive-${period.label.toLowerCase()}`}>
          <h3 id={`events-archive-${period.label.toLowerCase()}`}>{period.label}</h3>
          {period.events.length > 0 ? (
            <div className="events-archive-items">{period.events.map((event) => <EventCard key={event.id} event={event} />)}</div>
          ) : (
            <p className="events-archive-empty">No verified event records are available for this period yet.</p>
          )}
        </section>
      ))}
    </div>
  )
}

function EventPhotoFigure({ photo, featured = false }: { photo: EventPhoto; featured?: boolean }) {
  return (
    <figure className={`events-gallery-item${featured ? ' is-featured' : ''}`}>
      <div><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /></div>
      <figcaption>{photo.caption}<span>LSA LEARNING</span></figcaption>
    </figure>
  )
}

export function EventGallery({ photos }: { photos: EventPhoto[] }) {
  const [featuredPhoto, ...supportingPhotos] = photos
  if (!featuredPhoto) return null

  return (
    <div className="events-gallery-grid">
      <EventPhotoFigure photo={featuredPhoto} featured />
      <div className="events-gallery-support">{supportingPhotos.map((photo) => <EventPhotoFigure key={photo.id} photo={photo} />)}</div>
    </div>
  )
}
