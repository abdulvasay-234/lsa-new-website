import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const campusImages = [
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00752.jpg`, alt: 'Students learning technology together in an LSA classroom', label: 'WORKSHOPS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00621%20(1).jpg`, alt: 'Students collaborating during a practical LSA learning session', label: 'BUILD SESSIONS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00712.jpg`, alt: 'Learners taking part in hands-on technology training at LSA', label: 'TECHNOLOGY PROGRAMS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00664.jpg`, alt: 'Students discussing and applying ideas in an LSA classroom', label: 'STUDENT PROJECTS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00590%20(1).jpg`, alt: 'LSA students working together in a classroom environment', label: 'COMMUNITY EVENTS' },
] as const

const campusOffers = [
  ['TECHNOLOGY PROGRAMS', 'Structured learning experiences focused on practical technology skills.'],
  ['WORKSHOPS & BOOTCAMPS', 'Focused sessions that introduce students to technologies, tools, workflows, and real-world applications.'],
  ['PROJECT-BASED LEARNING', 'Students apply concepts by working on practical projects and meaningful technical challenges.'],
  ['HACKATHONS & BUILDATHONS', 'Collaborative build experiences where students explore ideas, solve problems, and create working solutions.'],
  ['INTERNSHIP TRAINING', 'Practical exposure that helps students understand how technology skills translate into real work environments.'],
  ['COMMUNITY & CAMPUS INITIATIVES', 'Developer activities, technology communities, events, and initiatives that extend learning beyond regular academic sessions.'],
] as const

const beyondPrinciples = [
  ['LEARN', 'Understand the foundations.'],
  ['BUILD', 'Turn ideas into working projects.'],
  ['COLLABORATE', 'Work with peers and mentors.'],
  ['SOLVE', 'Approach practical problems.'],
  ['PRESENT', 'Explain and demonstrate the work.'],
] as const

const institutionOffers = [
  ['PROGRAM DESIGN', 'Create learning experiences around relevant technology skills.'],
  ['CAMPUS DELIVERY', 'Bring workshops, bootcamps, programs, and build experiences directly to students.'],
  ['PRACTICAL EXPOSURE', 'Give students opportunities to work with tools, projects, and real-world problem-solving.'],
  ['STUDENT ENGAGEMENT', 'Create communities, events, challenges, and experiences that encourage students to keep building.'],
] as const

export function CampusPage() {
  return (
    <>
      <Section className="campus-page-hero">
        <Container className="campus-editorial-hero">
          <div className="campus-hero-copy">
            <p className="section-marker section-marker-yellow">04 — CAMPUS</p>
            <h1>Where academic learning meets practical technology.</h1>
            <p>LSA works with educational institutions to create practical technology experiences that complement academic learning. Through workshops, bootcamps, technology programs, internships, hackathons, and hands-on projects, students get opportunities to learn, build, and apply their skills beyond the traditional classroom.</p>
            <div className="button-row"><ButtonLink href="#campus-offerings">Explore campus work →</ButtonLink><ButtonLink href={getRouteHref('/campus', '/contact')} variant="outline">Work with LSA →</ButtonLink></div>
          </div>
          <figure className="campus-hero-image"><img src={campusImages[0].src} alt={campusImages[0].alt} width="5146" height="3217" loading="eager" decoding="async" /></figure>
        </Container>
      </Section>

      <Section className="campus-page-offerings" id="campus-offerings">
        <Container>
          <div className="campus-section-intro"><div><p className="section-marker">02 — WHAT WE BRING TO CAMPUS</p><h2>More than a workshop.</h2></div><p>Campus learning can take different forms. LSA works with institutions to create experiences that give students more opportunities to practise, build, collaborate, and apply technology.</p></div>
          <ol className="campus-editorial-list">{campusOffers.map(([title, description], index) => <li key={title}><span>{`0${index + 1}`}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </Container>
      </Section>

      <Section className="campus-page-motion">
        <Container>
          <div className="campus-section-intro"><div><p className="section-marker">04 — LEARNING IN MOTION</p><h2>Learning moves through different environments.</h2></div><p>Use the classroom, the workshop, the project, and the shared experience as places to keep learning active.</p></div>
          <div className="campus-motion-gallery">{campusImages.slice(1, 4).map((image, index) => <figure className={index === 1 ? 'campus-motion-feature' : ''} key={image.src}><img src={image.src} alt={image.alt} width="5146" height="3217" loading="lazy" /><figcaption>{image.label}</figcaption></figure>)}</div>
        </Container>
      </Section>

      <Section className="campus-page-beyond">
        <Container className="campus-beyond-editorial"><div><p className="section-marker">05 — BEYOND THE CLASSROOM</p><h2>Learning becomes different when students get to use it.</h2></div><div><p className="campus-beyond-lead">Technology is easier to understand when students can experiment with it, build with it, work through problems, and learn alongside others. LSA&apos;s campus initiatives create opportunities to move from classroom concepts into practical experiences.</p><ol className="campus-principles-list">{beyondPrinciples.map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ol></div></Container>
      </Section>

      <Section className="campus-page-experiences">
        <Container><div className="campus-section-intro"><div><p className="section-marker">06 — CAMPUS EXPERIENCES</p><h2>Real learning moments, close to the work.</h2></div><p>LSA&apos;s campus experience can include workshops, build sessions, technology programs, student projects, and community events. The images below show the real learning environments available in the current LSA asset library.</p></div><div className="campus-experience-gallery">{campusImages.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} width="5146" height="3217" loading="lazy" /><figcaption>{image.label}</figcaption></figure>)}</div></Container>
      </Section>

      <Section className="campus-page-institutions">
        <Container className="campus-institution-layout"><div><p className="section-marker section-marker-yellow">07 — FOR INSTITUTIONS</p><h2>Build a stronger bridge between academics and industry.</h2><p>LSA works with colleges and educational institutions to create practical technology experiences that complement academic learning and give students more opportunities to apply what they learn.</p></div><ol className="campus-institution-list">{institutionOffers.map(([title, description], index) => <li key={title}><span>{`0${index + 1}`}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol></Container>
      </Section>

      <Section className="campus-page-final"><Container className="campus-final-layout"><div><p className="section-marker section-marker-yellow">08 — WORK WITH LSA</p><h2>Bring practical technology learning to your campus.</h2><p>Whether you are planning a workshop, technology program, internship initiative, hackathon, or larger campus engagement, start a conversation with LSA.</p></div><div className="button-row"><ButtonLink href={getRouteHref('/campus', '/contact')}>Work with LSA →</ButtonLink><ButtonLink href={getRouteHref('/campus', '/contact')} variant="outline">Contact LSA →</ButtonLink></div></Container></Section>
    </>
  )
}
