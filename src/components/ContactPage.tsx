import { useState, type FormEvent } from 'react'
import { siteInfo } from '../data/site'
import { Container, Section } from './Layout'

type ContactValues = {
  fullName: string
  email: string
  phone: string
  interest: string
  program: string
  city: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>

const interestOptions = [
  ['program', 'Learning a Program'],
  ['career-guidance', 'Career Guidance'],
  ['internship', 'Internship'],
  ['workshop', 'Workshop'],
  ['campus-training', 'Campus Training'],
  ['college-collaboration', 'College / Institutional Collaboration'],
  ['corporate-training', 'Corporate Training'],
  ['general', 'General Enquiry'],
] as const

const programOptions = ['Data Science', 'Cyber Security', 'Digital Marketing', 'DevOps', 'Python Programming', 'Full Stack Java', 'Power BI', 'Other / Not Sure']

function initialValues(): ContactValues {
  const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
  const interest = params.get('interest') === 'program' ? 'program' : params.get('interest') || ''
  const programSlug = params.get('program') || ''
  const program = programOptions.find((option) => option.toLowerCase().replaceAll(' ', '-') === programSlug) || ''
  return { fullName: '', email: '', phone: '', interest, program, city: '', message: '' }
}

function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'error'>('idle')

  const update = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus('idle')
  }

  const validate = () => {
    const next: ContactErrors = {}
    if (!values.fullName.trim()) next.fullName = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s().-]{7,}$/.test(values.phone)) next.phone = 'Enter a valid phone or WhatsApp number.'
    if (!values.interest) next.interest = 'Choose what you need help with.'
    if (!values.message.trim()) next.message = 'Tell us what you are looking for.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('error')
  }

  const fieldError = (field: keyof ContactValues) => errors[field] ? <small className="field-error" id={`contact-${field}-error`}>{errors[field]}</small> : null

  return <form className="contact-page-form" onSubmit={submit} noValidate>
    <div className="contact-form-fields">
      <label className="inquiry-field" htmlFor="contact-fullName"><span>Full Name *</span><input id="contact-fullName" value={values.fullName} onChange={(event) => update('fullName', event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'contact-fullName-error' : undefined} />{fieldError('fullName')}</label>
      <label className="inquiry-field" htmlFor="contact-email"><span>Email Address *</span><input id="contact-email" type="email" placeholder="you@example.com" value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />{fieldError('email')}</label>
      <label className="inquiry-field" htmlFor="contact-phone"><span>Phone / WhatsApp *</span><input id="contact-phone" type="tel" placeholder="+91..." value={values.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} />{fieldError('phone')}</label>
      <label className="inquiry-field" htmlFor="contact-interest"><span>I&apos;m interested in *</span><select id="contact-interest" value={values.interest} onChange={(event) => update('interest', event.target.value)} aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? 'contact-interest-error' : undefined}><option value="">Select an option</option>{interestOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>{fieldError('interest')}</label>
      <label className="inquiry-field" htmlFor="contact-program"><span>Program / Area of Interest</span><select id="contact-program" value={values.program} onChange={(event) => update('program', event.target.value)}><option value="">Select an option</option>{programOptions.map((program) => <option key={program}>{program}</option>)}</select></label>
      <label className="inquiry-field" htmlFor="contact-city"><span>City</span><input id="contact-city" value={values.city} onChange={(event) => update('city', event.target.value)} /></label>
      <label className="inquiry-field inquiry-field-wide" htmlFor="contact-message"><span>Message / Requirement *</span><textarea id="contact-message" placeholder="Tell us what you are looking for..." value={values.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />{fieldError('message')}</label>
    </div>
    {status === 'error' && <p className="inquiry-status inquiry-status-error" role="alert">Your details are valid, but this form is not connected to a submission service yet. Please use the phone or email details below.</p>}
    <button className="inquiry-submit" type="submit">Send enquiry <span aria-hidden="true">→</span></button>
  </form>
}

const helpItems = [
  ['LEARNING PROGRAMS', 'Explore practical technology programs and find the right fit.'],
  ['CAREER GUIDANCE', 'Get clarity on career direction, skill gaps and learning paths.'],
  ['INTERNSHIPS', 'Ask about available internship opportunities and related programs.'],
  ['CAMPUS TRAINING', 'Training and learning experiences for student communities.'],
  ['COLLEGE COLLABORATION', 'Workshops, programs, events and institutional partnerships.'],
  ['CORPORATE TRAINING', 'Technology learning and upskilling requirements for organizations.'],
] as const

export function ContactPage() {
  return <>
    <Section className="contact-page-hero"><Container className="contact-page-hero-layout"><div><p className="section-marker section-marker-yellow">01 — GET IN TOUCH</p><h1>Let&apos;s talk about<br />what comes next.</h1><p>Whether you&apos;re looking to build new skills, choose the right learning path, or explore working with LSA, tell us what you&apos;re looking for and our team will help you take the next step.</p></div><div className="contact-page-hero-rule" aria-hidden="true" /></Container></Section>
    <Section className="contact-page-help"><Container><div className="program-detail-heading"><p className="section-marker">02 — WHAT CAN WE HELP WITH?</p><h2>Start with what you need.</h2></div><ol className="contact-help-list">{helpItems.map(([title, description], index) => <li key={title}><span>{`0${index + 1}`}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol></Container></Section>
    <Section className="contact-page-enquiry" id="send-enquiry"><Container><div className="program-detail-heading"><p className="section-marker">03 — SEND AN ENQUIRY</p><h2>Tell us what you need.</h2></div><ContactForm /></Container></Section>
    <Section className="contact-page-talk"><Container className="contact-page-talk-layout"><div className="contact-page-talk-copy"><p className="section-marker section-marker-yellow">04 — TALK TO LSA</p><h2>Prefer to talk directly?</h2><div className="contact-page-details"><p><strong>Phone</strong><a href={`tel:${siteInfo.contact.phone.replaceAll(' ', '')}`}>{siteInfo.contact.phone}</a></p><p><strong>Email</strong><a href={`mailto:${siteInfo.contact.email}`}>{siteInfo.contact.email}</a></p><p><strong>Location</strong><span>{siteInfo.contact.address}</span></p></div><p className="contact-page-hours"><strong>Available hours</strong><span>Monday to Saturday · 10:30 AM to 8:00 PM</span></p></div><div className="contact-page-map"><h3>Visit us directly.</h3><p>{siteInfo.contact.address}</p><iframe title="Lords Skill Academy location in Hyderabad" src={siteInfo.contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></Container></Section>
  </>
}
