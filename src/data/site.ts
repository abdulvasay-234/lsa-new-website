export const siteInfo = {
  name: 'Lords Skill Academy',
  shortName: 'LSA',
  description: 'Official website of Lords Skill Academy.',
  url: import.meta.env.VITE_SITE_URL || '',
  logoPath: '/favicon.svg',
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/lords-skill-academy' },
    { label: 'YouTube', url: 'https://www.youtube.com/channel/UCp3pmw6u5xZsL5W6ViF_zvg' },
  ] as Array<{ label: string; url: string }>,
  youtubeChannelUrl: 'https://www.youtube.com/channel/UCp3pmw6u5xZsL5W6ViF_zvg',
  legalLinks: [] as Array<{ label: string; url: string }>,
  institution: {
    name: 'Lords Institute of Engineering & Technology',
    relationship: 'An Initiative of',
    statement: 'Lords Skill Academy (LSA) is an Initiative of Lords Institute of Engineering & Technology.',
    logo: {
      src: `${import.meta.env.BASE_URL}media/liet-logo.png`,
      alt: 'Lords Institute of Engineering & Technology logo',
      width: 3293,
      height: 1408,
    },
  },
  contact: {
    email: 'lordsskillacademy@gmail.com',
    phone: '+91 9963051403',
    address: 'Hyderabad, Telangana',
    mapEmbedUrl: 'https://www.google.com/maps?q=Lords%20Skill%20Academy%2C%20Hyderabad%2C%20Telangana&output=embed',
    studentContact: 'Program, learning, and admissions enquiries',
    institutionContact: 'Workshops, campus training, internships, and collaboration enquiries',
  },
} as const

export const siteNavigation = [
  {
    path: '/programs',
    children: [
      { label: 'Data Science', path: '/programs/data-science' },
      { label: 'Cyber Security', path: '/programs/cyber-security' },
      { label: 'Digital Marketing', path: '/programs/digital-marketing' },
    ],
  },
  {
    path: '/learning',
    children: [
      { label: 'LMS', path: '/learning/lms' },
      { label: 'Blog', path: '/learning/blog' },
      { label: 'Resources', path: '/learning/resources' },
    ],
  },
  {
    path: '/campus',
    children: [
      { label: 'Campus Programs', path: '/campus/programs' },
      { label: 'Events', path: '/campus/events' },
      { label: 'Internships', path: '/campus/internships' },
    ],
  },
] as const

export const footerNavigation = [
  {
    label: 'Programs',
    links: [
      { label: 'Data Science', path: '/programs/data-science' },
      { label: 'Cyber Security', path: '/programs/cyber-security' },
      { label: 'Digital Marketing', path: '/programs/digital-marketing' },
    ],
  },
  {
    label: 'Learning',
    links: [
      { label: 'LMS', path: '/learning/lms' },
      { label: 'Blog', path: '/learning/blog' },
      { label: 'Resources', path: '/learning/resources' },
    ],
  },
  {
    label: 'Campus',
    links: [
      { label: 'Campus Programs', path: '/campus/programs' },
      { label: 'Events', path: '/campus/events' },
      { label: 'Internships', path: '/campus/internships' },
    ],
  },
  {
    label: 'Institutional',
    links: [
      { label: 'For Colleges', path: '/for-colleges' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
] as const
