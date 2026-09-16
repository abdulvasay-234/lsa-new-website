import type { BlogPost, CampusProgram, Event, Internship, LmsCourse, Program, Testimonial, YouTubeVideo } from './types'

export const programs: Program[] = [
  {
    title: 'Data Science',
    slug: 'data-science',
    description: 'Work with data, analysis, and practical problem-solving workflows.',
    status: 'active',
  },
  {
    title: 'Cyber Security',
    slug: 'cyber-security',
    description: 'Explore security thinking, digital systems, and responsible practice.',
    status: 'active',
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Learn how digital channels, content, and measurement connect.',
    status: 'active',
  },
  {
    title: 'DevOps',
    slug: 'devops',
    description: 'Program details will be added here.',
    status: 'active',
  },
  {
    title: 'Python Programming',
    slug: 'python-programming',
    description: 'Program details will be added here.',
    status: 'active',
  },
  {
    title: 'Full Stack Java',
    slug: 'full-stack-java',
    description: 'Program details will be added here.',
    status: 'active',
  },
  {
    title: 'Power BI',
    slug: 'power-bi',
    description: 'Program details will be added here.',
    status: 'active',
  },
]
export const lmsCourses: LmsCourse[] = []
export const blogPosts: BlogPost[] = [
  {
    title: 'Why practical learning matters in technology education',
    slug: 'why-practical-learning-matters',
    excerpt: 'Technology skills grow when learners move from watching to doing, building confidence through projects, workshops, and guided practice.',
    content: 'Technology education becomes meaningful when learners can connect ideas to real work. At LSA, the goal is not only to explain concepts but to help students build confidence through practice, iteration, and application.\n\nA strong technical education journey moves through questions, experiments, and small wins. Learners begin with the fundamentals, then apply them to projects, assignments, and learning environments that reflect how work actually happens.\n\nThis approach helps students learn more than theory. It builds judgment, adaptability, and the ability to explain what they have built. That is the difference between passive learning and practical capability.',
    category: 'Learning',
    author: 'LSA Editorial Team',
    publishDate: '2024-04-08',
    seoTitle: 'Why practical learning matters in technology education | Lords Skill Academy',
    seoDescription: 'Learn why practical learning matters in technology education and how LSA helps learners move from concepts to real capability.',
  },
  {
    title: 'From workshop to project: how students build confidence',
    slug: 'from-workshop-to-project',
    excerpt: 'Workshops provide the spark, and projects turn that energy into evidence of capability, reflection, and continued growth.',
    content: 'Workshops often create momentum. A focused session introduces a concept, demonstrates a process, and gives students a clearer idea of what to try next. But growth develops when learners carry that idea into a project and solve a problem using their own effort.\n\nAt LSA, the learning environment is designed to keep that momentum going. Students move from guided sessions into hands-on tasks, structured practice, and practical challenges that help them understand the full learning cycle.\n\nThis is where confidence grows. Learners begin to see how the concepts connect, how mistakes become part of the process, and how small steps can become useful skills in real settings.',
    category: 'Workshops',
    author: 'LSA Editorial Team',
    publishDate: '2024-05-18',
    seoTitle: 'From workshop to project: how students build confidence | Lords Skill Academy',
    seoDescription: 'See how LSA helps students move from workshops into practical projects, building confidence and capability along the way.',
  },
  {
    title: 'What campus learning looks like at LSA',
    slug: 'what-campus-learning-looks-like',
    excerpt: 'Campus learning at LSA is shaped by interaction, exposure, and a practical understanding of how technology education works in an institutional environment.',
    content: 'The LSA campus experience is more than a classroom routine. It brings together structured learning, workshops, student interaction, project thinking, and an environment that supports continued exploration.\n\nThis kind of ecosystem helps learners understand that technology education is not isolated to a single lesson or session. It is shaped by the broader environment around them: the conversations, the practice, the feedback, and the opportunities to apply what they are learning.\n\nFor many students, that campus environment becomes a turning point. It helps them connect learning to a bigger picture of capability, community, and direction.',
    category: 'Campus',
    author: 'LSA Editorial Team',
    publishDate: '2024-06-12',
    seoTitle: 'What campus learning looks like at LSA | Lords Skill Academy',
    seoDescription: 'Explore how LSA blends campus learning, practical exposure, and learner experience in a connected institutional environment.',
  },
]
export const campusPrograms: CampusProgram[] = []
export const events: Event[] = []
export const internships: Internship[] = []
export const testimonials: Testimonial[] = [
  {
    reviewerName: 'Sana Fatima',
    quote: 'The session at LSA was engaging and informative. The activities were well organized, and the trainer explained each concept clearly. It was absolutely worth attending.',
    rating: 5,
    source: 'Google Review',
    verified: true,
  },
  {
    reviewerName: 'Mohammed Yousha khan',
    quote: 'Best academy for upskilling. Beginner-friendly sessions, hands-on practice, and an excellent teaching method.',
    rating: 5,
    source: 'Google Review',
    verified: true,
  },
  {
    reviewerName: 'Saba Khan',
    quote: 'The learning environment is positive, and trainers are very supportive. As a beginner, I felt confident from day one.',
    rating: 5,
    source: 'Google Review',
    verified: true,
  },
  {
    reviewerName: 'Arjun Patel',
    quote: 'Great learning space and highly qualified trainers. The practical approach makes every class useful.',
    rating: 5,
    source: 'Google Review',
    verified: true,
  },
  {
    reviewerName: 'Priyanka Reddy',
    quote: 'Excellent faculty and very interactive sessions. I genuinely enjoyed learning here.',
    rating: 5,
    source: 'Google Review',
    verified: true,
  },
]
export const youtubeVideos: YouTubeVideo[] = []

export const contentNotes = [
  'Add only verified LSA programs, courses, articles, media, and testimonials here.',
  'Google Drive resource URLs belong in lesson or module resourceUrl fields.',
] as const
