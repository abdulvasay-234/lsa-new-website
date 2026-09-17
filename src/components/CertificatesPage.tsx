import { jsPDF } from 'jspdf'
import { useEffect, useState, type FormEvent } from 'react'
import certificateRecords from '../data/certificates.json'
import { getRouteHref } from '../data/routes'
import { ButtonLink } from './Button'
import { Container, Section } from './Layout'

type CertificateRecord = { certificateId: string; name: string; course: string; duration?: string; issueDate?: string }
type TextPlacement = { x: number; y: number; fontSize: number; color: string; align?: CanvasTextAlign; weight?: number; fontFamily?: string }
type CourseTemplate = { template: string; fields: Record<string, TextPlacement> }

const fields: Record<string, TextPlacement> = {
  name: { x: 50, y: 41.9, fontSize: 6, color: '#021a54', align: 'center', weight: 700, fontFamily: 'Lora, serif' },
  duration: { x: 55.5, y: 61.7, fontSize: 2.2, color: '#800020', align: 'center', weight: 700, fontFamily: 'Libre Franklin, sans-serif' },
  issueDate: { x: 28.3, y: 81.6, fontSize: 1.8, color: '#132238', align: 'center', weight: 700, fontFamily: 'Libre Franklin, sans-serif' },
  certificateId: { x: 81.8, y: 81.6, fontSize: 1.8, color: '#132238', align: 'center', weight: 700, fontFamily: 'Libre Franklin, sans-serif' },
}

const courseTemplateConfig: Record<string, CourseTemplate> = {}
for (const course of ['Full Stack Java', 'Data Science', 'Cyber Security', 'Digital Marketing', 'DevOps', 'Python Programming', 'Power BI']) {
  courseTemplateConfig[course] = { template: course === 'Full Stack Java' ? '/certificates/templates/java.png' : '/certificates/templates/full-stack-java.svg', fields }
}

const records = certificateRecords as CertificateRecord[]
const templateUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const recordFields = (record: CertificateRecord) => ({ name: record.name, course: record.course, duration: record.duration, issueDate: record.issueDate, certificateId: record.certificateId })

function CertificatePreview({ record, onError }: { record: CertificateRecord; onError: () => void }) {
  const config = courseTemplateConfig[record.course]
  if (!config) return null
  return <div className="certificate-preview" aria-label={`Generated certificate for ${record.name}`}><img src={templateUrl(config.template)} alt="Generated LSA certificate" onError={onError} />{Object.entries(recordFields(record)).map(([field, value]) => { const placement = config.fields[field]; return value && placement ? <span className="certificate-overlay-text" key={field} style={{ left: `${placement.x}%`, top: `${placement.y}%`, color: placement.color, fontFamily: placement.fontFamily, fontSize: `${placement.fontSize}cqw`, fontWeight: placement.weight || 500, textAlign: placement.align || 'left' }}>{value}</span> : null })}</div>
}

export function CertificatesPage() {
  const courses = [...new Set(records.map((record) => record.course))]
  const [course, setCourse] = useState('')
  const [nameQuery, setNameQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<CertificateRecord | null>(null)
  const [generated, setGenerated] = useState<CertificateRecord | null>(null)
  const [templateError, setTemplateError] = useState(false)
  const [message, setMessage] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewZoom, setPreviewZoom] = useState(1)

  const courseRecords = course ? records.filter((record) => record.course === course) : []
  const suggestions = !selectedStudent && nameQuery.trim() ? courseRecords.filter((record) => record.name.toLowerCase().includes(nameQuery.trim().toLowerCase())) : []

  useEffect(() => {
    if (!isPreviewOpen) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsPreviewOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape) }
  }, [isPreviewOpen])

  const chooseCourse = (value: string) => { setCourse(value); setNameQuery(''); setSelectedStudent(null); setGenerated(null); setTemplateError(false); setMessage('') }
  const chooseStudent = (student: CertificateRecord) => { setSelectedStudent(student); setNameQuery(student.name); setGenerated(null); setMessage('') }
  const generateCertificate = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!course) return setMessage('Select a course to continue.'); if (!selectedStudent) return setMessage('Select your name from the suggestions.'); setGenerated(selectedStudent); setTemplateError(false); setMessage('') }

  const downloadPdf = async () => {
    if (!generated) return
    const config = courseTemplateConfig[generated.course]
    if (!config) return setMessage('Certificate template unavailable.')
    await document.fonts.load('700 100px Lora')
    await document.fonts.load('700 100px "Libre Franklin"')
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight
      const context = canvas.getContext('2d'); if (!context) return
      context.drawImage(image, 0, 0)
      Object.entries(recordFields(generated)).forEach(([field, value]) => { const placement = config.fields[field]; if (!value || !placement) return; context.fillStyle = placement.color; context.textAlign = placement.align || 'left'; context.textBaseline = 'middle'; context.font = `${placement.weight || 500} ${Math.round((placement.fontSize / 100) * canvas.width)}px ${placement.fontFamily || 'sans-serif'}`; context.fillText(value, placement.x / 100 * canvas.width, placement.y / 100 * canvas.height) })
      const pdf = new jsPDF({ orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait', unit: 'px', format: [canvas.width, canvas.height] })
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height); pdf.save(`${generated.certificateId}-certificate.pdf`); setMessage('Certificate PDF download started.')
    }
    image.onerror = () => setMessage('Certificate template unavailable.')
    image.src = templateUrl(config.template)
  }

  return <>
    <Section className="certificates-page-hero"><Container className="certificates-page-hero-layout"><div><p className="section-marker section-marker-yellow">01 — CERTIFICATES</p><h1>Your learning. Officially recognised.</h1></div><p>Find and download your Lords Skill Academy certificate.</p></Container></Section>
    <Section className="certificates-verify-section"><Container><div className="certificates-section-heading"><p className="section-marker">02 — FIND YOUR CERTIFICATE</p><h2>Find your certificate.</h2><p>Choose your course, search your name, and generate your official certificate.</p></div><form className="certificate-generation-form" onSubmit={generateCertificate}><div className="certificate-field"><label htmlFor="certificate-course">Course</label><select id="certificate-course" value={course} onChange={(event) => chooseCourse(event.target.value)}><option value="">Select Course</option>{courses.map((item) => <option key={item} value={item}>{item}</option>)}</select></div><div className="certificate-field certificate-name-field"><label htmlFor="certificate-name">Student Name</label><input id="certificate-name" value={nameQuery} disabled={!course} onChange={(event) => { setNameQuery(event.target.value); setSelectedStudent(null); setGenerated(null); setMessage('') }} placeholder={course ? 'Start typing your full name...' : 'Select a course first'} autoComplete="off" role="combobox" aria-autocomplete="list" aria-controls="certificate-suggestions" aria-expanded={suggestions.length > 0} /><p className="certificate-field-hint">{course ? 'Select your exact name from the suggestions.' : 'Select a course to continue.'}</p>{suggestions.length > 0 && <ul className="certificate-suggestions" id="certificate-suggestions" role="listbox">{suggestions.map((student) => <li key={student.certificateId}><button type="button" role="option" onClick={() => chooseStudent(student)}>{student.name}</button></li>)}</ul>}{course && nameQuery.trim() && suggestions.length === 0 && !selectedStudent && <p className="certificate-inline-message" role="status">No student found. Check the name and try again.</p>}</div><button className="button button-primary certificate-generate-button" type="submit" disabled={!course || !selectedStudent}>Generate certificate <span aria-hidden="true">→</span></button>{message && <p className="certificate-inline-message" role="status">{message}</p>}</form>{generated && <div className="certificate-result" aria-live="polite"><div className="certificate-result-heading"><p className="section-marker section-marker-yellow">Certificate generated</p><h3>Live certificate preview</h3></div><div className="certificate-result-layout"><div>{templateError || !courseTemplateConfig[generated.course] ? <div className="certificate-message certificate-message-error" role="alert"><h3>Certificate template unavailable.</h3><p>Check the course template configuration.</p></div> : <CertificatePreview record={generated} onError={() => setTemplateError(true)} />}</div><aside className="certificate-details-panel"><p className="section-marker">Certificate details</p><dl className="certificate-details"><div><dt>Student name</dt><dd>{generated.name}</dd></div><div><dt>Course</dt><dd>{generated.course}</dd></div>{generated.duration && <div><dt>Duration</dt><dd>{generated.duration}</dd></div>}<div><dt>Certificate ID</dt><dd>{generated.certificateId}</dd></div>{generated.issueDate && <div><dt>Issue date</dt><dd>{generated.issueDate}</dd></div>}</dl><div className="certificate-actions"><button className="button button-primary" type="button" onClick={downloadPdf} disabled={templateError}>Download PDF <span aria-hidden="true">↓</span></button><button className="button button-outline" type="button" onClick={() => { setPreviewZoom(1); setIsPreviewOpen(true) }}>Preview certificate <span aria-hidden="true">↗</span></button></div></aside></div></div>}</Container></Section>
    <Section className="certificates-how-section"><Container><div className="certificates-section-heading"><p className="section-marker">03 — HOW IT WORKS</p></div><ol className="certificates-how-list"><li><span>01</span><div><h3>Search</h3><p>Select your course and find your name.</p></div></li><li><span>02</span><div><h3>Verify</h3><p>Your certificate is generated from the official LSA record.</p></div></li><li><span>03</span><div><h3>Download</h3><p>Preview and download your certificate.</p></div></li></ol></Container></Section>
    <Section className="certificates-page-cta"><Container className="certificates-page-cta-layout"><div><p className="section-marker section-marker-yellow">04 — START LEARNING</p><h2>Keep building your skills.</h2><p>Explore LSA programs and continue building your skills.</p></div><ButtonLink href={getRouteHref('/certificates', '/programs')}>Explore programs <span aria-hidden="true">→</span></ButtonLink></Container></Section>
    {isPreviewOpen && generated && <div className="certificate-preview-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-preview-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsPreviewOpen(false) }}><div className="certificate-preview-modal-panel"><div className="certificate-preview-modal-header"><h2 id="certificate-preview-title">Certificate Preview</h2><div className="certificate-preview-modal-controls"><button className="certificate-preview-control" type="button" onClick={() => setPreviewZoom((zoom) => Math.max(0.7, zoom - 0.15))}>Zoom Out</button><button className="certificate-preview-control" type="button" onClick={() => setPreviewZoom(1)}>Reset</button><button className="certificate-preview-control" type="button" onClick={() => setPreviewZoom((zoom) => Math.min(1.5, zoom + 0.15))}>Zoom In</button></div><button className="certificate-preview-close" type="button" onClick={() => setIsPreviewOpen(false)}>Close</button></div><div className="certificate-preview-modal-viewport"><div className="certificate-preview-modal-scale" style={{ transform: `scale(${previewZoom})` }}><CertificatePreview record={generated} onError={() => setTemplateError(true)} /></div></div></div></div>}
  </>
}
