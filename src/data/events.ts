export type EventCategoryData = {
  number: string
  title: string
  description: string
}

export type EventRecord = {
  id: string
  category: string
  name: string
  description: string
  images: EventPhoto[]
  date?: string
  year?: number
  location?: string
  href?: string
}

export type EventArchivePeriod = {
  label: string
  events: EventRecord[]
}

export type EventPhoto = {
  id: string
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export const eventCategories: EventCategoryData[] = [
  { number: '01', title: 'WORKSHOPS', description: 'Hands-on sessions that introduce learners to technologies, tools, and practical skills.' },
  { number: '02', title: 'HACKATHONS & CHALLENGES', description: 'Build-focused experiences where learners work on problems, collaborate, and present what they create.' },
  { number: '03', title: 'INDUSTRY EXPOSURE', description: 'Industry visits, guest sessions, demonstrations, and experiences that connect learning with real-world technology.' },
  { number: '04', title: 'COMMUNITY & SERVICE', description: 'Activities that encourage learners to contribute, collaborate, and create meaningful impact beyond the classroom.' },
  { number: '05', title: 'OPEN LEARNING', description: 'Creating spaces where students, developers, educators, and technology enthusiasts can learn, experiment, and share knowledge.' },
  { number: '06', title: 'CAMPUS ACTIVITIES', description: 'Technical events, competitions, celebrations, and learning experiences conducted across campus communities.' },
]

// Add records here only after LSA confirms event-specific details and imagery.
export const featuredEvents: EventRecord[] = []

// Empty periods are intentional until confirmed events can be placed by date.
export const eventArchive: EventArchivePeriod[] = [
  { label: '2026', events: [] },
  { label: '2025', events: [] },
  { label: 'EARLIER', events: [] },
]

export const eventPhotos: EventPhoto[] = [
  {
    id: 'classroom-learning-wide',
    src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00752.jpg`,
    alt: 'Learners seated together with laptops in an LSA classroom.',
    caption: 'A shared learning space',
    width: 1800,
    height: 1125,
  },
  {
    id: 'learners-at-computers',
    src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00621%20(1).jpg`,
    alt: 'Learners working at computers in an LSA classroom.',
    caption: 'Learning at the computer',
    width: 1800,
    height: 1125,
  },
  {
    id: 'learners-working-together',
    src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00664.jpg`,
    alt: 'Two learners focused on a laptop in an LSA classroom.',
    caption: 'Working side by side',
    width: 1800,
    height: 1125,
  },
  {
    id: 'classroom-session',
    src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00590%20(1).jpg`,
    alt: 'A group of learners with laptops in a classroom.',
    caption: 'Learners gathered to listen',
    width: 1800,
    height: 883,
  },
  {
    id: 'classroom-collaboration',
    src: `${import.meta.env.BASE_URL}media/classroom-imgs/2SP00712.jpg`,
    alt: 'Learners seated together during a classroom session.',
    caption: 'In the classroom',
    width: 1800,
    height: 1125,
  },
]
