import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'
import trainerRecords from '../data/trainers.json'

type TrainerRecord = {
  name: string
  slug: string
  role?: string
  specialization?: string
  image?: string
  bio?: string
  expertise?: string[]
  courses?: string[]
}

const trainers = trainerRecords as TrainerRecord[]

export function TrainersPage() {
  return (
    <>
      <Section className="trainers-page-hero"><Container className="trainers-page-hero-layout"><div><p className="section-marker section-marker-yellow">01 — TRAINERS</p><h1>Learn from people who build, solve, and teach.</h1></div><div className="trainers-hero-note"><span aria-hidden="true">{String(trainers.length).padStart(2, '0')}</span><p>LSA trainers bring practical knowledge, technical experience, and mentorship into every learning experience.</p></div></Container></Section>

      <Section className="trainers-list-section"><Container><div className="trainers-page-heading"><p className="section-marker">02 — MEET THE TRAINERS</p><h2>People who help turn learning into practical capability.</h2></div>{trainers.length ? <div className="trainers-editorial-list">{trainers.map((trainer, index) => <article className="trainer-profile" key={trainer.slug}><span className="trainer-profile-index">{`0${index + 1}`}</span><div className="trainer-profile-image">{trainer.image ? <img src={`${import.meta.env.BASE_URL}media/trainer/${trainer.image}`} alt={trainer.name} loading="lazy" /> : <span className="trainer-image-placeholder"><strong>{String(index + 1).padStart(2, '0')}</strong><small>Trainer portrait</small></span>}</div><div className="trainer-profile-content"><p className="card-kicker">{trainer.role || 'Role / Designation'}</p><h3>{trainer.name}</h3>{trainer.specialization && <p className="trainer-profile-specialization">{trainer.specialization}</p>}{trainer.bio && <p>{trainer.bio}</p>}{trainer.expertise?.length ? <div><strong className="trainer-profile-label">Expertise</strong><ul>{trainer.expertise.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}{trainer.courses?.length ? <div><strong className="trainer-profile-label">Courses handled</strong><p>{trainer.courses.join(' · ')}</p></div> : null}</div></article>)}</div> : <div className="trainers-empty-state"><p className="section-marker section-marker-yellow">Trainer profiles to be confirmed</p><h3>Verified LSA trainer information will appear here.</h3><p>Trainer names, images, roles, biographies, expertise, and course assignments will be added when the official LSA faculty information is available.</p></div>}</Container></Section>

      <Section className="trainers-principles-section"><Container><div className="trainers-page-heading"><p className="section-marker">03 — MORE THAN INSTRUCTORS</p><h2>Learning works better when someone helps you apply it.</h2><p>At LSA, trainers are part of the learning process beyond the classroom. They help students understand concepts, work through problems, build projects, and connect technical skills with practical outcomes.</p></div><ol className="trainers-principles-list"><li><span>01</span><div><strong>TEACH</strong><p>Make difficult concepts understandable.</p></div></li><li><span>02</span><div><strong>BUILD</strong><p>Connect learning to practical projects.</p></div></li><li><span>03</span><div><strong>MENTOR</strong><p>Help students work through problems.</p></div></li><li><span>04</span><div><strong>GUIDE</strong><p>Connect technical learning with practical career direction.</p></div></li></ol></Container></Section>

      <Section className="trainers-page-cta"><Container className="trainers-page-cta-layout"><div><p className="section-marker section-marker-yellow">04 — START LEARNING</p><h2>Find the right path. Learn with the right guidance.</h2><p>Explore LSA programs and find a learning path that matches what you want to build.</p></div><div className="button-row"><ButtonLink href={getRouteHref('/trainers', '/programs')}>Explore programs →</ButtonLink><ButtonLink href={getRouteHref('/trainers', '/contact')} variant="outline">Career guidance →</ButtonLink></div></Container></Section>
    </>
  )
}
