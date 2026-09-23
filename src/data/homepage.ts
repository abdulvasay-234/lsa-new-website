import type { MediaAsset } from './types'

export type HomepageStage = {
  name: string
  description: string
}

export type HomepageSection = {
  eyebrow: string
  title: string
  body: string
}

export const homepageContent = {
  seo: {
    title: 'Lords Skill Academy | Practical Technology Education',
    description: 'Lords Skill Academy helps students build practical technology skills through hands-on learning, real-world exposure, and industry-oriented experiences.',
  },
  hero: {
    eyebrow: 'Practical technology education',
    title: 'Learn skills. Build things. Become capable.',
    body: 'Lords Skill Academy helps students move beyond theoretical learning through practical technology education, hands-on learning, real-world exposure, and industry-oriented experiences.',
  },
  identitySignals: [
    'Practical learning',
    'Technology programs',
    'Campus experiences',
    'Industry exposure',
  ],
  about: {
    eyebrow: 'What is LSA?',
    title: 'Learning should go beyond the classroom.',
    body: 'Lords Skill Academy (LSA) is a modern technology learning platform designed to help students move from learning concepts to applying them in the real world.',
    supportingBody: "We combine structured learning with hands-on practice, industry-relevant tools, projects, mentorship, and career-focused experiences — so students don't just learn what technology is, but understand how to use it.\n\nLearn. Build. Experience. Grow. Because today's technology careers demand more than knowledge — they demand the ability to turn knowledge into something real.",
  },
  philosophy: {
    eyebrow: 'How LSA learns',
    title: 'A learning journey that moves into the real world.',
    stages: [
      { name: 'Learn', description: 'Build a clear foundation in useful technology concepts.' },
      { name: 'Build', description: 'Turn ideas into practical work with modern tools.' },
      { name: 'Solve', description: 'Apply structured thinking to meaningful problems.' },
      { name: 'Experience', description: 'Learn through exposure beyond the textbook.' },
      { name: 'Showcase', description: 'Make capability visible through work and reflection.' },
    ] satisfies HomepageStage[],
  },
  programs: {
    eyebrow: 'What students can learn',
    title: 'Learn what technology can help you build.',
    body: 'Explore focused learning paths designed around practical technology skills.',
  },
  campus: {
    eyebrow: 'LSA in campuses',
    title: 'Where campus learning meets the real world.',
    body: 'LSA works with educational institutions to bring practical, industry-relevant technology learning directly to campus.',
    supportingBody: "Through technology programs, workshops, bootcamps, internships, projects, and hackathons, we create hands-on learning experiences that complement academic education and help students explore how technology is actually built and used. Students don't just attend sessions. They experiment with tools, build projects, solve real problems, collaborate with peers, and gain experience working with modern technologies.",
    editorialItems: ['PROGRAMS', 'WORKSHOPS', 'BOOTCAMPS', 'PROJECTS', 'INTERNSHIPS', 'HACKATHONS'],
    media: [
      {
        src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00621%20(1).jpg`,
        alt: 'Students engaging with practical learning in an LSA classroom setting',
        width: 1600,
        height: 900,
      },
    ] as MediaAsset[],
  },
  videos: [] as string[],
  motion: {
    title: "Learning doesn't just happen in a classroom.",
    body: 'Get a glimpse of how LSA turns learning into real experiences, from hands-on bootcamps and campus programs to industry conversations, internships, workshops, and student journeys.',
    activities: ['BOOTCAMPS', 'CAMPUS PROGRAMS', 'WEBINARS', 'WORKSHOPS', 'INTERNSHIPS', 'STUDENT STORIES'],
  },
  testimonials: {
    eyebrow: 'Student experiences',
    title: 'Learning, in their own words.',
    supportingLine: 'Real experiences from learners who have learned, built, and grown with LSA.',
    ratingSummary: 'Rated 4.9 stars from 89 Google reviews.',
  },
  learning: {
    eyebrow: 'Learn with LSA',
    title: 'A learning ecosystem that stays useful.',
    destinations: [
      { label: 'LMS', path: '/learning/lms', description: 'Structured learning materials for focused study.' },
      { label: 'Blog', path: '/learning/blog', description: 'Technology ideas, explanations, and practical knowledge.' },
      { label: 'Resources', path: '/learning/resources', description: 'Useful references and materials for continued learning.' },
    ],
  },
  colleges: {
    eyebrow: 'For colleges',
    title: 'Bring practical technology learning to your campus.',
    body: 'LSA can work with institutions through technology programs, workshops, bootcamps, internships, student skill development, and campus initiatives.',
  },
} as const
