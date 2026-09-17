import { useState } from 'react'
import { getRouteHref } from '../data/routes'
import type { ProgramDetail, ProgramGalleryItem, ProgramToolCategory } from '../data/types'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

const careerGuidanceUrl = 'https://lordsskillacademy.com/career-guidance/'

function Placeholder({ children = 'Details to be confirmed' }: { children?: string }) {
  return <span className="program-detail-placeholder">{children}</span>
}

function ToolPanel({ category, index }: { category: ProgramToolCategory; index: number }) {
  return <div className="program-tools-panel"><div className="program-tools-panel-content"><div className="program-tools-panel-heading"><span>{`0${index + 1}`}</span><div><h3>{category.category}</h3><p>{category.description}</p></div></div>{category.items.length ? <div className="program-tools-grid">{category.items.map((tool, toolIndex) => <div className="program-tool" key={`${tool.name}-${toolIndex}`}><span className="program-tool-icon" aria-hidden="true">{tool.icon || '—'}</span><div><strong>{tool.name || <Placeholder>Tool name to be confirmed</Placeholder>}</strong>{tool.description && <p>{tool.description}</p>}</div></div>)}</div> : <div className="program-tools-empty"><strong>Verified tools to be confirmed.</strong><p>Specific technologies for this category will be added when the LSA curriculum is published.</p></div>}</div></div>
}

function QuickHighlights({ highlights }: { highlights: ProgramDetail['highlights'] }) {
  if (!highlights.length) return null

  return <Section className="program-detail-highlights"><Container><div className="program-detail-heading"><p className="section-marker">02 — QUICK HIGHLIGHTS</p><h2>Everything important at a glance.</h2><p>Program highlights and structure in one place for faster decision-making.</p></div><div className="program-highlights-grid">{highlights.map((highlight) => <article className="program-highlight" key={highlight.label}><span className="program-highlight-icon" aria-hidden="true">{highlight.icon || '•'}</span><h3>{highlight.label}</h3><p>{highlight.value}</p></article>)}</div></Container></Section>
}

function ProgramGains({ gains }: { gains: ProgramDetail['gains'] }) {
  if (!gains.length) return null

  return <Section className="program-detail-section program-detail-gains"><Container className="program-detail-two-column"><div className="program-detail-heading"><p className="section-marker">04 — WHAT YOU&apos;LL LEARN</p><h2>Build the foundation. Then use it.</h2><p>This program merges technical depth, real practice, and career preparation so you build capability, not just theory.</p></div><ol className="program-gains-list">{gains.map((gain, index) => <li key={gain.title}><span>{`0${index + 1}`}</span><div><h3>{gain.title}</h3><p>{gain.description}</p></div></li>)}</ol></Container></Section>
}

function ProgramAudiences({ audiences }: { audiences: ProgramDetail['audiences'] }) {
  if (!audiences.length) return null

  return <Section className="program-detail-section program-detail-audiences"><Container><div className="program-detail-heading"><p className="section-marker">05 — PROGRAM DETAILS</p><h2>Built for diverse learners.</h2></div><ol className="program-audiences-list">{audiences.map((audience, index) => <li key={audience.title}><span>{`0${index + 1}`}</span><div><h3>{audience.title}</h3><p>{audience.description}</p></div></li>)}</ol></Container></Section>
}

function CareerDirection({ support }: { support?: ProgramDetail['careerSupport'] }) {
  if (!support) return null

  return <Section className="program-detail-section program-detail-career"><Container><div className="program-detail-heading"><p className="section-marker">06 — CAREER DIRECTION</p><h2>Skills should lead somewhere.</h2><p>Understand how the skills you build can connect to different technology roles and career paths.</p></div><div className="career-support-layout"><div className="career-support-summary"><h3>{support.title}</h3><p>{support.description}</p><div className="career-support-checkpoint"><strong>{support.checkpointTitle}</strong><p>{support.checkpointDescription}</p></div><ul>{support.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div><ol className="career-support-steps">{support.steps.map((step, index) => <li key={step.title}><span>{`0${index + 1}`}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></Container></Section>
}

function CertificationSection({ certification }: { certification?: ProgramDetail['certification'] }) {
  if (!certification) return null
  const previewImage = certification.previewImage || { src: `${import.meta.env.BASE_URL}certificates/templates/java.png`, alt: 'LSA sample certificate preview', width: 4419, height: 6250 }

  return <Section className="program-detail-section program-detail-certification"><Container><div className="program-detail-heading"><p className="section-marker">07 — CERTIFICATION</p><h2>Recognition that supports your career.</h2></div><div className="certification-layout"><div className="certification-preview"><h3>{certification.previewTitle}</h3><p>{certification.previewDescription}</p><div className="certification-placeholder"><img src={previewImage.src} alt={previewImage.alt} width={previewImage.width} height={previewImage.height} loading="lazy" decoding="async" /></div></div><ol className="certification-points">{certification.points.map((point, index) => <li key={point.title}><span>{`0${index + 1}`}</span><div><h3>{point.title}</h3><p>{point.description}</p></div></li>)}</ol></div></Container></Section>
}

function TrainerSection({ trainer, routePath }: { trainer?: ProgramDetail['trainer']; routePath: string }) {
  if (!trainer) return null

  return <Section className="program-detail-section program-detail-trainer"><Container><div className="program-detail-heading"><p className="section-marker">08 — TRAINERS</p><h2>Guidance that keeps learning practical.</h2></div><div className="program-trainer-layout"><div><p className="program-trainer-name">{trainer.name || <Placeholder>Trainer profile to be confirmed</Placeholder>}</p><p className="program-trainer-role">{trainer.role || 'LSA faculty information'}</p></div><div><p>{trainer.description}</p><ButtonLink href={getRouteHref(routePath, '/trainers')} variant="link">See trainers →</ButtonLink></div></div></Container></Section>
}

function HiringSection({ hiring }: { hiring?: ProgramDetail['hiring'] }) {
  if (!hiring) return null

  return <Section className="program-detail-section program-detail-hiring"><Container><div className="program-detail-heading"><p className="section-marker">09 — HIRING PARTNERS</p><h2>Connecting learning with opportunity.</h2><p>{hiring.description}</p></div><div className="hiring-image-placeholder" role="img" aria-label="Hiring partner logos image placeholder">{hiring.partners.length ? hiring.partners.join(' · ') : 'Hiring partner logos image will be added here.'}</div></Container></Section>
}

function ClassroomGallery({ gallery }: { gallery?: ProgramDetail['classroomGallery'] }) {
  const imageGallery = gallery?.filter((item): item is ProgramGalleryItem & { src: string } => Boolean(item.src))
  if (!imageGallery?.length) return null

  return <Section className="program-detail-section program-detail-gallery"><Container><div className="program-detail-heading"><p className="section-marker">12 — CLASSROOM GALLERY</p><h2>Classroom and learning moments.</h2></div><div className="program-gallery-grid">{imageGallery.map((item, index) => <figure key={`${item.caption}-${index}`}><img src={item.src} alt={item.alt} loading="lazy" /><figcaption>{item.caption}</figcaption></figure>)}</div></Container></Section>
}

function ToolsAndDisciplines({ categories, curriculumDownload }: { categories: ProgramToolCategory[]; curriculumDownload?: string }) {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const activeCategory = categories[selectedCategory]

  if (!categories.length) return null

  return (
    <Section className="program-detail-section program-detail-tools">
      <Container>
        <div className="program-detail-heading"><p className="section-marker">03 — TOOLS &amp; DISCIPLINES</p><h2>Learn the tools. Understand the stack.</h2><p>Work with the technologies, platforms, and disciplines used throughout the learning journey.</p></div>
        <div className="program-tools-explorer">
          <div className="program-tools-categories-wrap">
            <div className="program-tools-categories" role="tablist" aria-label="Tools and disciplines categories">
            {categories.map((category, index) => {
              const isSelected = index === selectedCategory
              return <button className={`program-tools-category ${isSelected ? 'is-selected' : ''}`} type="button" role="tab" aria-selected={isSelected} aria-controls={`program-tools-panel-${index}`} id={`program-tools-tab-${index}`} key={category.category} onClick={() => setSelectedCategory(index)}><span aria-hidden="true">{isSelected ? '●' : '○'}</span>{category.category}</button>
            })}
            </div>
            {curriculumDownload ? <a className="program-tools-category-note" href={`${import.meta.env.BASE_URL}${curriculumDownload}`} download>Download curriculum <span aria-hidden="true">↓</span></a> : <p className="program-tools-category-note">Curriculum download coming soon.</p>}
          </div>
          <div role="tabpanel" id={`program-tools-panel-${selectedCategory}`} aria-labelledby={`program-tools-tab-${selectedCategory}`}><ToolPanel category={activeCategory} index={selectedCategory} /></div>
        </div>
        <div className="program-tools-mobile">{categories.map((category, index) => { const isOpen = index === selectedCategory; return <div className={`program-tools-mobile-item ${isOpen ? 'is-open' : ''}`} key={category.category}><button className="program-tools-mobile-toggle" type="button" aria-expanded={isOpen} aria-controls={`program-tools-mobile-panel-${index}`} onClick={() => setSelectedCategory(index)}><span>{`0${index + 1}`}</span><strong>{category.category}</strong><b aria-hidden="true">{isOpen ? '−' : '+'}</b></button>{isOpen && <div id={`program-tools-mobile-panel-${index}`}><ToolPanel category={category} index={index} /></div>}</div> })}</div>
      </Container>
    </Section>
  )
}

export function ProgramDetailPage({ program, routePath }: { program: ProgramDetail; routePath: string }) {
  const heroHighlights = program.highlights.slice(0, 4)
  const enquiryHref = getRouteHref(routePath, `/contact?interest=program&program=${program.slug}`)
  const advisorHref = getRouteHref(routePath, '/contact?interest=career-guidance')

  return (
    <>
      <Section className="program-detail-hero"><Container className="program-detail-hero-layout"><div className="program-detail-hero-copy-column"><p className="section-marker section-marker-yellow">01 — {program.eyebrow}</p><h1>{program.title} Course</h1><p className="program-detail-hero-copy">{program.heroDescription}</p><p className="program-detail-batch"><span>Batch starting date</span><strong>{program.batchStartDate || 'To be announced'}</strong></p><div className="button-row"><ButtonLink href={program.curriculumDownload ? `${import.meta.env.BASE_URL}${program.curriculumDownload}` : enquiryHref} download={Boolean(program.curriculumDownload)}>{program.curriculumDownload ? 'Download curriculum' : 'Enquire about program'} →</ButtonLink><ButtonLink href={advisorHref} variant="outline">Talk to a career advisor</ButtonLink></div></div><div className="program-detail-hero-side"><div className="program-detail-hero-image-placeholder" aria-label={`${program.title} program image`} role="img">{program.heroMedia ? <img src={program.heroMedia.src} alt={program.heroMedia.alt} width={program.heroMedia.width} height={program.heroMedia.height} loading="eager" decoding="async" /> : <span>Program image placeholder</span>}</div>{heroHighlights.length > 0 && <div className="program-detail-hero-metrics">{heroHighlights.map((highlight) => <div key={highlight.label}><span>{highlight.label}</span><strong>{highlight.value}</strong></div>)}</div>}<ul className="program-detail-hero-notes"><li>Industry-aligned learning with guided practice</li><li>Portfolio-focused projects for practical evidence</li><li>Career support with mentoring and interview preparation</li></ul></div></Container></Section>

      <QuickHighlights highlights={program.highlights} />

      <ToolsAndDisciplines categories={program.toolsAndDisciplines} curriculumDownload={program.curriculumDownload} />

      <ProgramGains gains={program.gains} />

      <ProgramAudiences audiences={program.audiences} />

      <CareerDirection support={program.careerSupport} />

      <CertificationSection certification={program.certification} />

      <TrainerSection trainer={program.trainer} routePath={routePath} />

      <HiringSection hiring={program.hiring} />

      <Section className="program-detail-section program-detail-guidance"><Container className="program-detail-two-column"><div className="program-detail-heading"><p className="section-marker">11 — CAREER GUIDANCE</p><h2>Not sure this is the right path?</h2><p>Get practical career direction, understand your skill gaps, and build a realistic learning roadmap before committing to a path.</p><a className="career-guidance-cta" href={careerGuidanceUrl} target="_blank" rel="noreferrer">Book career guidance <span aria-hidden="true">→</span></a></div><ol className="career-guidance-list"><li><span>01</span><div><strong>CAREER CLARITY</strong><p>Understand possible directions.</p></div></li><li><span>02</span><div><strong>SKILL-GAP ANALYSIS</strong><p>Identify what you need to improve.</p></div></li><li><span>03</span><div><strong>LEARNING ROADMAP</strong><p>Understand what to learn and in what order.</p></div></li><li><span>04</span><div><strong>MENTORSHIP</strong><p>Get guidance as you move forward.</p></div></li></ol></Container></Section>

      <ClassroomGallery gallery={program.classroomGallery} />

      <Section className="program-detail-cta"><Container className="program-detail-cta-layout"><div><p className="section-marker section-marker-yellow">13 — READY TO START</p><h2>Ready to build?</h2><p>Explore the program, ask your questions, and take the next step with LSA.</p></div><div className="button-row"><ButtonLink href={enquiryHref}>Enquire about program →</ButtonLink><ButtonLink href={getRouteHref(routePath, '/programs')} variant="outline">Explore all programs →</ButtonLink></div></Container></Section>
    </>
  )
}