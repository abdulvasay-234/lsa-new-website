import careerSettings from './career-opportunity.json'

export type Opportunity = {
  id: string
  active: boolean
  jobTitle: string
  companyName: string
  location: string
  postedDate: string
  summary: string
  companyLogo?: string
  poster?: string
  requisitionId?: string
  hiringType?: string
  employmentType?: string
  experience?: string
  salary?: string
  qualifications?: string
  deadline?: string
  description?: string
  responsibilities?: string[]
  skills?: string[]
  highlightedAreas?: string[]
  recruiter?: string
  importantNote?: string
  additionalDetails?: string
}

export type StudentOutcome = {
  studentName: string
  role: string
  package: string
  company?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function readOpportunity(value: unknown): Opportunity | null {
  if (!isRecord(value) || typeof value.popupEnabled !== 'boolean') {
    throw new Error('Career opportunity settings must include a boolean popupEnabled.')
  }
  if (!value.popupEnabled || value.opportunity === null) return null
  const opportunity = value.opportunity
  if (!isRecord(opportunity) || typeof opportunity.active !== 'boolean') {
    throw new Error('Career opportunity must include a boolean active status.')
  }
  if (!opportunity.active) return null

  const required = ['id', 'jobTitle', 'companyName', 'location', 'postedDate', 'summary']
  const optional = ['companyLogo', 'poster', 'requisitionId', 'hiringType', 'employmentType', 'experience', 'salary', 'qualifications', 'deadline', 'description', 'recruiter', 'importantNote', 'additionalDetails']
  const lists = ['responsibilities', 'skills', 'highlightedAreas']
  if (
    required.some((key) => typeof opportunity[key] !== 'string' || !(opportunity[key] as string).trim()) ||
    optional.some((key) => opportunity[key] !== undefined && typeof opportunity[key] !== 'string') ||
    lists.some((key) => opportunity[key] !== undefined && (!Array.isArray(opportunity[key]) || !(opportunity[key] as unknown[]).every((item) => typeof item === 'string')))
  ) {
    throw new Error('Career opportunity content has missing or invalid fields. See README for the required format.')
  }
  return opportunity as Opportunity
}

export function readStudentOutcomes(value: unknown): StudentOutcome[] {
  if (!isRecord(value) || value.studentOutcomes === undefined) return []
  if (!Array.isArray(value.studentOutcomes)) {
    console.error('Career studentOutcomes must be an array.')
    return []
  }
  return value.studentOutcomes.flatMap((outcome: unknown) => {
    if (!isRecord(outcome) || typeof outcome.verified !== 'boolean' || typeof outcome.publicConsent !== 'boolean') {
      console.error('A career outcome has invalid verification or consent settings.')
      return []
    }
    if (!outcome.verified || !outcome.publicConsent) return []
    if (
      typeof outcome.studentName !== 'string' || !outcome.studentName.trim() ||
      typeof outcome.role !== 'string' || !outcome.role.trim() ||
      typeof outcome.package !== 'string' || !outcome.package.trim() ||
      (outcome.company !== undefined && typeof outcome.company !== 'string')
    ) {
      console.error('A verified career outcome has missing or invalid fields.')
      return []
    }
    return [{
      studentName: outcome.studentName,
      role: outcome.role,
      package: outcome.package,
      company: outcome.company,
    }]
  })
}

function loadCareerContent() {
  try {
    const opportunity = readOpportunity(careerSettings)
    return opportunity ? { opportunity, studentOutcomes: readStudentOutcomes(careerSettings) } : null
  } catch (error) {
    console.error('Unable to load career opportunity settings.', error)
    return null
  }
}

export const careerContent = loadCareerContent()
