export type MediaAsset = {
  src: string
  alt: string
  width: number
  height: number
  credit?: string
}

export type Program = {
  title: string
  slug: string
  description: string
  status: 'active' | 'planned'
  keywords?: string[]
  media?: MediaAsset
}

export type ProgramProject = {
  name?: string
  description?: string
  skills?: string[]
}

export type ProgramTopicGroup = {
  category: string
  topics: string[]
}

export type ProgramProcessStep = {
  label: string
  description: string
}

export type ProgramTool = {
  name?: string
  description?: string
  icon?: string
}

export type ProgramToolCategory = {
  category: string
  description?: string
  items: ProgramTool[]
}

export type ProgramHighlight = {
  label: string
  value: string
  icon?: string
}

export type ProgramGain = {
  title: string
  description: string
}

export type ProgramAudience = {
  title: string
  description: string
}

export type ProgramCareerSupport = {
  title: string
  description: string
  checkpointTitle: string
  checkpointDescription: string
  tags: string[]
  steps: Array<{ title: string; description: string }>
}

export type ProgramCertification = {
  previewTitle: string
  previewDescription: string
  previewImage?: { src: string; alt: string; width: number; height: number }
  points: Array<{ title: string; description: string }>
}

export type ProgramTrainer = {
  name?: string
  role?: string
  description: string
}

export type ProgramHiring = {
  description: string
  partners: string[]
}

export type ProgramGalleryItem = {
  src?: string
  alt: string
  caption: string
}

export type ProgramDetail = Program & {
  eyebrow: string
  heroTitle: string
  heroDescription: string
  batchStartDate?: string
  heroMedia?: MediaAsset
  projects: ProgramProject[]
  curriculum: ProgramTopicGroup[]
  toolsAndDisciplines: ProgramToolCategory[]
  highlights: ProgramHighlight[]
  gains: ProgramGain[]
  audiences: ProgramAudience[]
  careerSupport?: ProgramCareerSupport
  certification?: ProgramCertification
  trainer?: ProgramTrainer
  hiring?: ProgramHiring
  classroomGallery?: ProgramGalleryItem[]
  curriculumDownload?: string
  process: ProgramProcessStep[]
  details: Array<{ label: string; value?: string }>
  careerPaths: string[]
}

export type Lesson = {
  title: string
  description: string
  resourceUrl?: string
}

export type CourseModule = {
  title: string
  description: string
  lessons: Lesson[]
  resourceUrl?: string
}

export type LmsCourse = {
  title: string
  slug: string
  description: string
  status: 'available' | 'planned'
  modules: CourseModule[]
}

export type BlogPost = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  updatedDate?: string
  featuredImage?: MediaAsset
  seoTitle: string
  seoDescription: string
  openGraphImage?: MediaAsset
}

export type Event = {
  title: string
  slug: string
  description: string
  startDate: string
  endDate?: string
  location?: string
  media?: MediaAsset
}

export type Internship = {
  title: string
  description: string
  organization?: string
  applicationUrl?: string
}

export type CampusProgram = {
  title: string
  description: string
  slug: string
}

export type Testimonial = {
  quote: string
  reviewerName: string
  rating: number
  date?: string
  source: 'Google Review'
  sourceUrl?: string
  verified: boolean
  institution?: string
  program?: string
  reviewerPhoto?: MediaAsset
  video?: YouTubeVideo
}

export type YouTubeVideo = {
  id: string
  title: string
  description?: string
  thumbnail?: MediaAsset
  category?: string
  date?: string
  url: string
}

export type SiteRoute = {
  path: string
  label: string
  section: 'primary' | 'secondary'
  title: string
  description: string
}
