import { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaPhone, FaXmark } from 'react-icons/fa6'
import { siteInfo } from '../data/site'
import { careerContent, type Opportunity, type StudentOutcome } from '../data/careerOpportunity'
import { Button, ButtonLink } from './Button'
import './career-opportunity.css'

const storageKey = 'lsa-career-opportunity-last-shown'
const repeatInterval = 24 * 60 * 60 * 1000
const lastShownInMemory = new Map<string, number>()

function recentlyShown(id: string) {
  let lastShown = lastShownInMemory.get(id)
  try {
    const stored = localStorage.getItem(`${storageKey}:${id}`)
    if (stored) {
      const time = Number(stored)
      if (Number.isFinite(time)) lastShown = time
      else console.warn('Career opportunity frequency storage contains an invalid timestamp.')
    }
  } catch (error) {
    console.warn('Career opportunity frequency storage is unavailable.', error)
  }
  return lastShown !== undefined && Date.now() - lastShown < repeatInterval && Date.now() >= lastShown
}

function rememberShown(id: string) {
  const time = Date.now()
  lastShownInMemory.set(id, time)
  try {
    localStorage.setItem(`${storageKey}:${id}`, String(time))
  } catch (error) {
    console.warn('Career opportunity frequency storage is unavailable.', error)
  }
}

function imageUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

function OpportunityImage({ path, alt, className }: { path: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false)
  if (failed || !path.trim()) return null
  return <img className={className} src={imageUrl(path)} alt={alt} onError={() => {
    console.error(`Career opportunity image could not be loaded: ${path}`)
    setFailed(true)
  }} />
}

function DetailSection({ title, text, items }: { title: string; text?: string; items?: string[] }) {
  const entries = items?.filter((item) => item.trim())
  if (!text?.trim() && !entries?.length) return null
  return (
    <section className="career-detail-section">
      <h3>{title}</h3>
      {text?.trim() && <p>{text}</p>}
      {Boolean(entries?.length) && <ul>{entries?.map((item, index) => <li key={index}>{item}</li>)}</ul>}
    </section>
  )
}

function HighlightedAreas({ areas }: { areas?: string[] }) {
  const entries = areas?.filter((area) => area.trim())
  if (!entries?.length) return null
  return (
    <section className="career-highlighted">
      <h3>Relevant areas highlighted by LSA</h3>
      <p>These are areas of interest highlighted by LSA, not stated hiring requirements.</p>
      <ul>{entries.map((area, index) => <li key={index}>{area}</li>)}</ul>
    </section>
  )
}

export function CareerOpportunityPopup({ alwaysShow }: { alwaysShow: boolean }) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [studentOutcomes, setStudentOutcomes] = useState<StudentOutcome[]>([])
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!careerContent || (!alwaysShow && recentlyShown(careerContent.opportunity.id))) return
    const { opportunity: data, studentOutcomes: outcomes } = careerContent
    let timer: number
    const showWhenAvailable = () => {
      if (!alwaysShow && recentlyShown(data.id)) return
      if (document.hidden || document.querySelector('dialog[open], [role="dialog"]')) {
        timer = window.setTimeout(showWhenAvailable, 1000)
        return
      }
      setOpportunity(data)
      setStudentOutcomes(outcomes)
      setOpen(true)
    }
    timer = window.setTimeout(showWhenAvailable, 4000)
    return () => window.clearTimeout(timer)
  }, [alwaysShow])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !opportunity || !dialog) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    headingRef.current?.focus()
    rememberShown(opportunity.id)
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open, opportunity])

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo(0, 0)
      headingRef.current?.focus()
    }
  }, [details, open])

  if (!open || !opportunity) return null

  const facts = [
    ...(details ? [['Requisition ID', opportunity.requisitionId]] : []),
    ['Location', opportunity.location],
    ['Hiring type', opportunity.hiringType],
    ['Employment type', opportunity.employmentType],
    ['Eligibility', opportunity.qualifications],
    ...(details ? [['Experience', opportunity.experience], ['Salary / package', opportunity.salary], ['Recruiter', opportunity.recruiter]] : []),
    ['Posted', opportunity.postedDate],
    ['Apply by', opportunity.deadline],
  ].filter((entry) => entry[1]?.trim())

  return (
    <dialog
      ref={dialogRef}
      className="career-dialog"
      aria-labelledby="career-dialog-title"
      onCancel={(event) => { event.preventDefault(); setOpen(false) }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          setOpen(false)
          return
        }
        if (event.key !== 'Tab') return
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'))
        const index = controls.findIndex((control) => control === document.activeElement)
        if (controls.length && (event.shiftKey ? index <= 0 : index === -1 || index === controls.length - 1)) {
          event.preventDefault()
          controls[event.shiftKey ? controls.length - 1 : 0].focus()
        }
      }}
      onClick={(event) => { if (event.target === event.currentTarget) setOpen(false) }}
    >
      <div className="career-dialog-frame">
        <div className="career-dialog-toolbar">
          {details ? <button className="career-back" type="button" onClick={() => setDetails(false)}><FaArrowLeft aria-hidden="true" /> Back to overview</button> : <span>FEATURED OPPORTUNITY</span>}
          <button className="career-close" type="button" aria-label="Close career opportunity" onClick={() => setOpen(false)}><FaXmark aria-hidden="true" /></button>
        </div>
        <div ref={scrollRef} className="career-dialog-scroll">
          <div className={`career-layout${opportunity.poster?.trim() ? ' has-poster' : ''}`}>
            <div className="career-content">
              {!details && studentOutcomes.length > 0 && (
                <section className="career-outcomes" aria-labelledby="career-outcomes-title">
                  <h3 id="career-outcomes-title" ref={headingRef} tabIndex={-1}>LSA Student Career Outcomes</h3>
                  <p>Previous student achievements, separate from this opportunity.</p>
                  <ul>
                    {studentOutcomes.map((outcome, index) => (
                      <li key={index}>
                        <div>
                          <strong>{outcome.studentName}</strong>
                          <span>{outcome.role}{outcome.company?.trim() && ` · ${outcome.company}`}</span>
                        </div>
                        <span className="career-outcome-package">{outcome.package}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <p className="career-eyebrow">CAREER OPPORTUNITY</p>
              <div className="career-company">
                {opportunity.companyLogo && <OpportunityImage path={opportunity.companyLogo} alt={`${opportunity.companyName} logo`} className="career-company-logo" />}
                <span>Hiring company<br /><strong>{opportunity.companyName}</strong></span>
              </div>
              <h2 id="career-dialog-title" ref={details || studentOutcomes.length === 0 ? headingRef : undefined} tabIndex={-1}>{opportunity.jobTitle}</h2>
              <dl className="career-facts">
                {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              {details ? (
                <>
                  <DetailSection title="About the opportunity" text={opportunity.description?.trim() ? opportunity.description : opportunity.summary} />
                  <DetailSection title="Responsibilities" items={opportunity.responsibilities} />
                  <DetailSection title="Required skills" items={opportunity.skills} />
                  <HighlightedAreas areas={opportunity.highlightedAreas} />
                  <DetailSection title="Important note" text={opportunity.importantNote} />
                  <DetailSection title="Additional information" text={opportunity.additionalDetails} />
                  <div className="career-call">
                    <p>Interested in this opportunity? Call Lords Skill Academy to enquire about the application process.</p>
                    <ButtonLink href={`tel:${siteInfo.contact.careerPhone.replaceAll(' ', '')}`}><FaPhone aria-hidden="true" /> Call LSA to Apply</ButtonLink>
                  </div>
                </>
              ) : (
                <>
                  <p className="career-summary">{opportunity.summary}</p>
                  <HighlightedAreas areas={opportunity.highlightedAreas} />
                  <Button onClick={() => setDetails(true)}>Know More <FaArrowRight aria-hidden="true" /></Button>
                </>
              )}
              <p className="career-disclaimer">Career opportunity shared through Lords Skill Academy.</p>
            </div>
            {opportunity.poster?.trim() && <div className="career-poster"><OpportunityImage path={opportunity.poster} alt={`Hiring poster for ${opportunity.jobTitle} at ${opportunity.companyName}`} className="career-poster-image" /></div>}
          </div>
        </div>
      </div>
    </dialog>
  )
}
