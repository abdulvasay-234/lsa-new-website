import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const eventImages = [
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00752.jpg`, alt: 'LSA learners taking part in a hands-on technology session', label: 'LEARN TOGETHER' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00621%20(1).jpg`, alt: 'LSA students collaborating on practical work', label: 'BUILD TOGETHER' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00664.jpg`, alt: 'LSA learners discussing ideas during a class activity', label: 'SHARE IDEAS' },
  { src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00590%20(1).jpg`, alt: 'LSA students gathered for a shared learning experience', label: 'FIND YOUR PEOPLE' },
] as const

const eventFormats = [
  ['01', 'WORKSHOPS', 'Focused, hands-on sessions that turn a new idea or tool into something participants can try.'],
  ['02', 'MEETUPS', 'Time to exchange ideas, meet other learners, and stay curious about what is changing.'],
  ['03', 'HACKATHONS', 'Collaborative challenges that bring people together to explore a problem and make a first solution.'],
  ['04', 'BUILDATHONS', 'Shared build sessions focused on turning concepts, experiments, and rough ideas into working projects.'],
  ['05', 'INDUSTRY SESSIONS', 'Conversations and practical perspectives from people working across technology.'],
  ['06', 'COMMUNITY ACTIVITIES', 'Open, welcoming ways for students, builders, mentors, and trainers to learn from one another.'],
] as const

const communityMembers = ['STUDENTS', 'BUILDERS', 'MENTORS', 'TRAINERS', 'TECH ENTHUSIASTS'] as const

export function EventsCommunityPage() {
  return (
    <>
      <Section className="events-community-hero">
        <Container className="events-community-hero-layout">
          <div className="events-community-hero-copy">
            <p className="section-marker section-marker-yellow">01 — EVENTS &amp; COMMUNITY</p>
            <h1>Where learning meets community.</h1>
            <p>LSA brings people together to learn, build, participate, and connect beyond regular classes. Workshops, shared projects, and community activities make space to explore technology alongside others.</p>
            <a className="events-community-text-link" href="#events-formats">Explore what happens here <span aria-hidden="true">↓</span></a>
          </div>
          <figure className="events-community-hero-image">
            <div className="events-community-hero-frame"><img src={eventImages[0].src} alt={eventImages[0].alt} width="5146" height="3217" fetchPriority="high" /></div>
            <figcaption><span>LSA LEARNING IN ACTION</span><b aria-hidden="true">01 / 04</b></figcaption>
          </figure>
        </Container>
      </Section>

      <Section className="events-community-formats" id="events-formats">
        <Container>
          <div className="events-community-intro">
            <div><p className="section-marker">02 — MORE THAN A CLASSROOM</p><h2>Make room to learn by doing.</h2></div>
            <p>Learning continues when people get together to ask questions, test ideas, build with others, and share what they discover.</p>
          </div>
          <ol className="events-format-list">
            {eventFormats.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><b aria-hidden="true">↗</b></li>)}
          </ol>
        </Container>
      </Section>

      <Section className="events-community-experiences">
        <Container className="events-experiences-layout">
          <div className="events-experiences-heading"><p className="section-marker">03 — WHAT HAPPENS HERE</p><h2>Different ways to take part.</h2></div>
          <div className="events-experiences-copy">
            <p>Some gatherings are about learning a new skill. Others are about building something together, meeting people with shared interests, or hearing a new perspective.</p>
            <ol>
              <li><span>LEARN</span><p>Join a workshop or industry session, ask questions, and get hands-on with an idea.</p></li>
              <li><span>MAKE</span><p>Bring curiosity to a hackathon or buildathon and work with others toward a practical outcome.</p></li>
              <li><span>CONNECT</span><p>Meet fellow learners and keep conversations, projects, and collaboration going beyond class.</p></li>
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="events-community-people">
        <Container className="events-community-people-layout">
          <div><p className="section-marker">04 — THE COMMUNITY</p><h2>Many paths. A shared curiosity.</h2></div>
          <div><p className="events-community-people-lead">The LSA community is made up of people who want to keep learning and putting ideas into practice.</p><ul>{communityMembers.map((member, index) => <li key={member}><span>{`0${index + 1}`}</span>{member}</li>)}</ul></div>
        </Container>
      </Section>

      <Section className="events-community-motion">
        <Container>
          <div className="events-community-intro events-community-motion-intro">
            <div><p className="section-marker">05 — EVENTS IN MOTION</p><h2>Good work happens together.</h2></div>
            <p>Real moments from LSA learning spaces: people listening, sharing ideas, and working side by side.</p>
          </div>
          <div className="events-photo-editorial">
            <figure className="events-photo-feature"><div><img src={eventImages[1].src} alt={eventImages[1].alt} width="5146" height="3217" loading="lazy" /></div><figcaption><span>02</span>{eventImages[1].label}</figcaption></figure>
            <div className="events-photo-side">
              {eventImages.slice(2).map((image, index) => <figure key={image.src}><div><img src={image.src} alt={image.alt} width="5146" height="3217" loading="lazy" /></div><figcaption><span>{`0${index + 3}`}</span>{image.label}</figcaption></figure>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="events-community-philosophy">
        <Container>
          <p className="section-marker section-marker-yellow">06 — LEARN. BUILD. CONNECT.</p>
          <ol><li>LEARN</li><li>BUILD</li><li>CONNECT</li></ol>
          <p className="events-community-philosophy-copy">Events and community are part of how LSA learning comes to life: learn something, put it to use, and connect with people who help you keep going.</p>
        </Container>
      </Section>

      <Section className="events-community-cta">
        <Container className="events-community-cta-layout">
          <div><p className="section-marker section-marker-yellow">07 — JOIN THE COMMUNITY</p><h2>There’s always something to build.</h2><p>Follow LSA for community updates and take part in upcoming learning and build experiences.</p></div>
          <div className="button-row"><ButtonLink href="https://whatsapp.com/channel/0029Vb911A98kyyVQq4S982O" target="_blank" rel="noreferrer">Join the LSA community →</ButtonLink><ButtonLink href={getRouteHref('/campus/events', '/contact')} variant="outline">Get in touch</ButtonLink></div>
        </Container>
      </Section>
    </>
  )
}