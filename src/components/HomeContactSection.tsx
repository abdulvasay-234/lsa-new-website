import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import { getRouteHref } from '../data/routes'
import { siteInfo } from '../data/site'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const homepageSocialLinks = [
  { label: 'YouTube', icon: FaYoutube, url: siteInfo.youtubeChannelUrl },
  { label: 'GitHub', icon: FaGithub, url: 'https://github.com/lordsskillacademy-hyd' },
  { label: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/lordsskillacademy_hyd' },
  { label: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/company/lords-skill-academy' },
]

export function HomeContactSection() {
  return (
    <Section className="home-contact-strip">
      <Container className="home-contact-grid">
        <div className="home-contact-block">
          <h2>Stay up to date</h2>
          <p>Follow LSA on WhatsApp for news, events, and updates.</p>
          <a className="home-contact-primary" href="https://whatsapp.com/channel/0029Vb911A98kyyVQq4S982O" target="_blank" rel="noreferrer" aria-label="Subscribe to the LSA WhatsApp channel"><FaWhatsapp className="subscribe-whatsapp-icon" aria-hidden="true" focusable="false" />Subscribe <span aria-hidden="true">→</span></a>
        </div>
        <div className="home-contact-block">
          <h2>Contact us</h2>
          <p>Have a question? We have answers. Send us a message, and we will get back to you.</p>
          <ButtonLink href={getRouteHref('/', '/contact')} variant="outline">Contact us</ButtonLink>
        </div>
        <div className="home-contact-block home-contact-social">
          <h2>Social Links</h2>
          <ul>
            {homepageSocialLinks.map((socialLink) => { const Icon = socialLink.icon; return <li key={socialLink.label}><a href={socialLink.url} target="_blank" rel="noreferrer" aria-label={socialLink.label}><Icon className="social-logo" aria-hidden="true" focusable="false" /></a></li> })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}