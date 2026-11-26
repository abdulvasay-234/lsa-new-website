import { careerContent } from '../data/careerOpportunity'
import { siteInfo } from '../data/site'
import { Container } from './Layout'
import './career-opportunity.css'

export function CareerHighlights() {
  if (!careerContent) return null
  const { opportunity, studentOutcomes } = careerContent
  const facts = [
    ['Location', opportunity.location],
    ['Hiring type', opportunity.hiringType],
    ['Employment type', opportunity.employmentType],
    ['Experience', opportunity.experience],
    ['Eligibility', opportunity.qualifications],
    ['Salary / package', opportunity.salary],
    ['Posted', opportunity.postedDate],
    ['Apply by', opportunity.deadline],
    ['Requisition ID', opportunity.requisitionId],
    ['Recruiter', opportunity.recruiter],
  ].filter(([, value]) => value?.trim())
  const sections = [
    { title: 'Job description', text: opportunity.description },
    { title: 'Responsibilities', items: opportunity.responsibilities },
    { title: 'Required skills', items: opportunity.skills },
    { title: 'Relevant areas highlighted by LSA', items: opportunity.highlightedAreas, note: 'These are areas of interest highlighted by LSA, not stated hiring requirements.' },
    { title: 'Important note', text: opportunity.importantNote },
    { title: 'Additional information', text: opportunity.additionalDetails },
  ]

  return (
    <section className="section career-highlights" aria-labelledby="career-highlights-title">
      <Container>
        <h2 id="career-highlights-title">Career opportunities and student outcomes</h2>
        <div className={`career-highlights-grid${studentOutcomes.length === 0 ? ' is-single' : ''}`}>
          {studentOutcomes.length > 0 && (
            <div className="career-highlights-outcomes">
              <h3>LSA Student Career Outcomes</h3>
              <p>Previous student achievements, separate from the featured opportunity.</p>
              <ul>
                {studentOutcomes.map((outcome, index) => (
                  <li key={index}>
                    <strong>{outcome.studentName}</strong>
                    <span>{outcome.role}{outcome.company?.trim() && ` · ${outcome.company}`}</span>
                    <span className="career-highlights-package">{outcome.package}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="career-highlights-opportunity">
            <p className="career-highlights-label">FEATURED CAREER OPPORTUNITY</p>
            <h3>{opportunity.jobTitle}</h3>
            <p>Hiring company: <strong>{opportunity.companyName}</strong></p>
            <p>{opportunity.summary}</p>
            <dl className="career-facts">
              {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <details>
              <summary>View full opportunity details</summary>
              {sections.map(({ title, text, items, note }) => {
                const entries = items?.filter((item) => item.trim())
                if (!text?.trim() && !entries?.length) return null
                return (
                  <section className="career-detail-section" key={title}>
                    <h4>{title}</h4>
                    {note && <p>{note}</p>}
                    {text?.trim() && <p>{text}</p>}
                    {Boolean(entries?.length) && <ul>{entries?.map((item, index) => <li key={index}>{item}</li>)}</ul>}
                  </section>
                )
              })}
              <a className="button button-primary" href={`tel:${siteInfo.contact.careerPhone.replaceAll(' ', '')}`}>Call LSA to Apply</a>
            </details>
            <p className="career-disclaimer">Career opportunity shared through Lords Skill Academy.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
