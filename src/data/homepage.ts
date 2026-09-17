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
    title: "Education shouldn't stop at the classroom.",
    body: 'LSA is a practical technology education organization built around the capabilities students need to keep learning, solving problems, and working with modern tools.',
    supportingBody: 'The focus is simple: connect knowledge to action, and give students meaningful opportunities to build, test, experience, and showcase what they can do.',
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
    title: 'From classrooms to campuses.',
    body: 'LSA works with educational institutions to bring practical technology learning closer to students. Through workshops, bootcamps, technology programs, internships, and campus initiatives, we create opportunities to learn beyond the traditional classroom.',
    supportingBody: 'Students learn by doing — exploring modern technologies, building projects, solving practical problems, and gaining exposure to real-world technology environments.',
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
  testimonials: {
    eyebrow: 'Student experiences',
    title: 'What Our Students Say',
    supportingLine: 'Real feedback from Google reviews.',
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
