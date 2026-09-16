import type { Program, ProgramDetail } from './types'

const unconfirmed = 'Details to be confirmed'

const sharedProcess: ProgramDetail['process'] = [
  { label: 'LEARN', description: 'Understand the foundations.' },
  { label: 'BUILD', description: 'Apply concepts through practical work.' },
  { label: 'SOLVE', description: 'Work through problems and challenges.' },
  { label: 'SHOWCASE', description: 'Turn your work into visible evidence.' },
]

const tools = (category: string, items: Array<[string, string, string]>, description: string): ProgramDetail['toolsAndDisciplines'][number] => ({
  category,
  description,
  items: items.map(([name, icon, itemDescription]) => ({ name, icon, description: itemDescription })),
})

const dataScienceTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('PROGRAMMING', [['Python', 'PY', 'Programming for analysis and modelling.']], 'Write the code that makes the analysis possible.'),
  tools('DATA', [['SQL', 'SQL', 'Query and work with structured data.'], ['Pandas', 'PD', 'Prepare and analyse tabular data.'], ['NumPy', 'NP', 'Work with numerical data and arrays.']], 'Move from raw information to usable datasets.'),
  tools('ANALYSIS & VISUALISATION', [['Jupyter', 'JY', 'Explore ideas in an interactive notebook.'], ['Matplotlib', 'MP', 'Build clear data visualisations.'], ['Seaborn', 'SB', 'Create statistical visualisations.']], 'Make patterns easier to see and communicate.'),
  tools('MACHINE LEARNING', [['Scikit-learn', 'SK', 'Build and evaluate practical models.'], ['Model evaluation', 'EV', 'Test how well a model performs.']], 'Turn analysis into tested, explainable models.'),
  tools('PLATFORMS & WORKFLOW', [['GitHub', 'GH', 'Share and organise project work.'], ['Jupyter Notebook', 'NB', 'Document analysis from question to result.']], 'Keep experiments, notes, and work visible.'),
]

const cyberSecurityTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('SECURITY FOUNDATIONS', [['CIA triad', 'CIA', 'Frame confidentiality, integrity, and availability.'], ['Threat modelling', 'TM', 'Think through risks before they become incidents.']], 'Build the reasoning behind secure systems.'),
  tools('NETWORKING', [['TCP/IP', 'IP', 'Understand how systems communicate.'], ['DNS & HTTP', 'WEB', 'Trace the protocols behind web traffic.']], 'Read the movement of data across systems.'),
  tools('SECURITY TOOLS', [['Linux', 'LX', 'Work in a security-focused command line environment.'], ['Wireshark', 'WS', 'Inspect network traffic and protocols.'], ['OWASP', 'OW', 'Use established web security guidance.']], 'Practise investigation with responsible tooling.'),
  tools('MONITORING & RESPONSE', [['Logs', 'LG', 'Use system evidence to investigate events.'], ['Incident response', 'IR', 'Structure a response to security issues.']], 'Learn how teams identify and respond to risk.'),
  tools('PLATFORMS & WORKFLOW', [['GitHub', 'GH', 'Document and share security work.'], ['Lab environments', 'LB', 'Practise safely in controlled systems.']], 'Keep security work traceable and responsible.'),
]

const pythonTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('PROGRAMMING', [['Python', 'PY', 'Build programs with a readable, versatile language.'], ['OOP', 'OO', 'Organise code around reusable objects and behaviour.']], 'Start with strong programming fundamentals.'),
  tools('CORE CONCEPTS', [['Data structures', 'DS', 'Choose useful ways to organise information.'], ['Algorithms', 'AL', 'Break problems into clear steps.']], 'Develop the habits behind reliable code.'),
  tools('DEVELOPMENT', [['VS Code', 'VS', 'Write, inspect, and run code efficiently.'], ['Jupyter', 'JY', 'Experiment with code interactively.']], 'Move from exercises to repeatable development.'),
  tools('AUTOMATION & APIS', [['Scripting', 'SC', 'Automate useful everyday tasks.'], ['REST APIs', 'API', 'Connect programs to web services.']], 'Use Python beyond isolated exercises.'),
  tools('PLATFORMS & WORKFLOW', [['GitHub', 'GH', 'Share and organise programming work.'], ['Documentation', 'DOC', 'Make code easier to understand and use.']], 'Build work that others can follow.'),
]

const fullStackJavaTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('PROGRAMMING', [['Java', 'JV', 'Build applications with a structured language.'], ['OOP', 'OO', 'Model reusable application behaviour.']], 'Create a foundation for application development.'),
  tools('BACKEND', [['Spring Boot', 'SB', 'Develop Java services and applications.'], ['REST APIs', 'API', 'Connect services through web interfaces.']], 'Build the systems behind the interface.'),
  tools('FRONTEND', [['HTML', 'HT', 'Structure web experiences.'], ['CSS', 'CS', 'Shape layout and visual presentation.'], ['JavaScript', 'JS', 'Add behaviour to web interfaces.']], 'Turn application logic into usable experiences.'),
  tools('DATABASE', [['SQL', 'SQL', 'Work with structured application data.'], ['Database design', 'DB', 'Plan how application data is organised.']], 'Make information reliable and accessible.'),
  tools('DEVELOPMENT WORKFLOW', [['VS Code', 'VS', 'Work across application files and services.'], ['GitHub', 'GH', 'Share and manage project work.']], 'Keep full-stack work organised.'),
]

const devOpsTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('SYSTEMS', [['Linux', 'LX', 'Work with the systems behind deployments.'], ['Shell', 'SH', 'Automate repeatable operations.']], 'Understand the environment software runs in.'),
  tools('CONTAINERS', [['Docker', 'DK', 'Package applications consistently.'], ['Container workflow', 'CT', 'Move software between environments.']], 'Reduce friction between development and delivery.'),
  tools('CI / CD', [['GitHub Actions', 'GA', 'Automate checks and delivery workflows.'], ['Pipelines', 'CI', 'Make delivery steps repeatable.']], 'Connect code changes to reliable automation.'),
  tools('CLOUD & INFRASTRUCTURE', [['Cloud concepts', 'CL', 'Understand hosted infrastructure.'], ['Infrastructure as code', 'IA', 'Describe infrastructure in repeatable form.']], 'Think about systems at deployment scale.'),
  tools('MONITORING', [['Logs', 'LG', 'Read evidence from running systems.'], ['Observability', 'OB', 'Understand system health and behaviour.']], 'Keep delivery connected to system feedback.'),
]

const powerBiTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('DATA', [['SQL', 'SQL', 'Query the data behind reports.'], ['Excel', 'XL', 'Work with familiar tabular data.']], 'Start with clean, useful source data.'),
  tools('MODELLING', [['Data modelling', 'DM', 'Structure data for analysis.'], ['Relationships', 'RL', 'Connect tables with meaning and control.']], 'Turn datasets into a dependable model.'),
  tools('POWER BI', [['Power BI', 'BI', 'Create interactive reports and dashboards.'], ['Power Query', 'PQ', 'Prepare and transform data.'], ['DAX', 'DX', 'Write measures for analytical questions.']], 'Build reports that support decisions.'),
  tools('VISUALISATION', [['Dashboard design', 'DB', 'Organise information for scanning.'], ['Data storytelling', 'DS', 'Give insights a clear narrative.']], 'Make the important signal visible.'),
  tools('WORKFLOW', [['GitHub', 'GH', 'Share project documentation and work.'], ['Publishing workflow', 'PW', 'Move reports from work to audience.']], 'Keep reporting work clear and repeatable.'),
]

const digitalMarketingTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('STRATEGY', [['Audience research', 'AR', 'Understand people, needs, and intent.'], ['Content strategy', 'CS', 'Plan useful communication over time.']], 'Begin with a clear audience and purpose.'),
  tools('SEARCH', [['SEO', 'SEO', 'Improve how content is discovered.'], ['Keyword research', 'KW', 'Connect language with audience questions.']], 'Build visibility around real search behaviour.'),
  tools('CONTENT & SOCIAL', [['Content creation', 'CC', 'Make useful, consistent digital content.'], ['Social media', 'SM', 'Plan and publish for social channels.']], 'Create work that earns attention responsibly.'),
  tools('CAMPAIGNS', [['Google Ads', 'GA', 'Understand paid search campaigns.'], ['Campaign planning', 'CP', 'Set objectives, audiences, and measures.']], 'Connect activity to a measurable purpose.'),
  tools('ANALYTICS', [['Web analytics', 'WA', 'Read how audiences use digital experiences.'], ['Reporting', 'RP', 'Turn activity into useful decisions.']], 'Use evidence to improve the next iteration.'),
]

const sharedHighlights: ProgramDetail['highlights'] = [
  { label: 'Mode', value: unconfirmed, icon: 'M' },
  { label: 'Weekly Hours', value: unconfirmed, icon: 'H' },
  { label: 'Projects', value: unconfirmed, icon: 'P' },
  { label: 'Support', value: unconfirmed, icon: 'S' },
  { label: 'Outcome', value: unconfirmed, icon: 'O' },
  { label: 'Certificate', value: unconfirmed, icon: 'C' },
]

const sharedGains: ProgramDetail['gains'] = [
  { title: 'Job-Ready Skills', description: 'Build practical capability through the verified curriculum.' },
  { title: 'Hands-On Learning', description: 'Apply concepts through guided exercises and practical work.' },
  { title: 'Mentor Support', description: 'Get guidance on concepts, practice, and execution.' },
  { title: 'Practical Projects', description: 'Create evidence of your learning through project work.' },
  { title: 'Career Preparation', description: 'Develop the confidence to explain and present your work.' },
]

const sharedAudiences: ProgramDetail['audiences'] = [
  { title: 'Students', description: 'Build practical technology skills alongside your studies.' },
  { title: 'Fresh Graduates', description: 'Bridge academic learning with structured practical work.' },
  { title: 'Career Switchers', description: 'Explore a new technology direction with guided learning.' },
  { title: 'Working Professionals', description: 'Build relevant skills through focused practice.' },
]

const sharedCareerSupport: NonNullable<ProgramDetail['careerSupport']> = {
  title: 'Your Interview Readiness Track',
  description: 'Move from learner to candidate with a step-by-step support system designed for real hiring conversations.',
  checkpointTitle: 'Mentor-led checkpoints',
  checkpointDescription: 'Feedback loops at every stage of preparation.',
  tags: ['Resume polish', 'Mock rounds', 'Storytelling drills', 'Role mapping'],
  steps: [
    { title: 'Resume and LinkedIn Guidance', description: 'Shape a profile that clearly communicates your developing skills.' },
    { title: 'Mock Interviews', description: 'Practise explaining your technical work and identify areas to improve.' },
    { title: 'Project Storytelling', description: 'Present your projects with clear context, decisions, and outcomes.' },
    { title: 'Mentorship', description: 'Get guidance as you prepare for relevant opportunities.' },
  ],
}

const sharedCertification: NonNullable<ProgramDetail['certification']> = {
  previewTitle: 'Certificate Preview',
  previewDescription: 'Add your sample certificate here so learners can see how the final credential looks.',
  points: [
    { title: 'Official LSA Completion Certificate', description: 'Completion recognition details will be confirmed by LSA.' },
    { title: 'Assessment-Backed Validation', description: 'Assessment and checkpoint details will be added when verified.' },
    { title: 'Portfolio Evidence', description: 'Show practical work that supports your learning story.' },
    { title: 'Career-Focused Recognition', description: 'Recognition details will be confirmed for each program.' },
  ],
}

const emptyDetail = (program: Program): ProgramDetail => ({
  ...program,
  eyebrow: program.title.toUpperCase(),
  heroTitle: `${program.title}. Build what comes next.`,
  heroDescription: program.description,
  batchStartDate: 'To be announced',
  projects: [],
  curriculum: [],
  toolsAndDisciplines: [],
  highlights: sharedHighlights,
  gains: sharedGains,
  audiences: sharedAudiences,
  careerSupport: sharedCareerSupport,
  certification: sharedCertification,
  trainer: { description: 'Trainer profile and teaching experience will be added when verified LSA faculty information is available.' },
  hiring: { description: 'Verified hiring partner information will be added when confirmed by LSA.', partners: [] },
  classroomGallery: [
    { alt: 'Classroom learning moment placeholder', caption: 'Classroom learning moment' },
    { alt: 'Students working together placeholder', caption: 'Students working together' },
    { alt: 'Practical learning session placeholder', caption: 'Practical learning session' },
    { alt: 'Learner discussion placeholder', caption: 'Learner discussion' },
    { alt: 'LSA classroom group placeholder', caption: 'LSA classroom group' },
    { alt: 'Workshop learning moment placeholder', caption: 'Workshop learning moment' },
  ],
  process: sharedProcess,
  details: [
    { label: 'Duration', value: unconfirmed },
    { label: 'Learning hours', value: unconfirmed },
    { label: 'Projects', value: unconfirmed },
    { label: 'Certification', value: unconfirmed },
    { label: 'Mentorship', value: unconfirmed },
    { label: 'Career support', value: unconfirmed },
  ],
  careerPaths: [],
})

export const programDetails: Record<string, ProgramDetail> = {
  'data-science': {
    ...emptyDetail({
      title: 'Data Science',
      slug: 'data-science',
      description: 'Work with data, analysis, and practical problem-solving workflows.',
      status: 'active',
    }),
    eyebrow: 'DATA SCIENCE',
    heroTitle: 'Build with data. Think beyond the spreadsheet.',
    heroDescription: 'Practical Data Science training built around programming, data analysis, machine learning and real-world projects.',
    batchStartDate: 'To be announced',
    projects: [{}, {}, {}],
    toolsAndDisciplines: dataScienceTools,
    curriculumDownload: 'media/data-science-curriculum.txt',
    highlights: [
      { label: 'Mode', value: 'Classroom / Hybrid learning format', icon: 'M' },
      { label: 'Weekly Hours', value: '8 to 10 guided learning hours per week', icon: 'H' },
      { label: 'Projects', value: '3 portfolio-driven projects with mentor review.', icon: 'P' },
      { label: 'Support', value: 'Weekly doubt-clearing sessions and feedback loops.', icon: 'S' },
      { label: 'Outcome', value: 'Job-ready workflows and practical confidence in analysis.', icon: 'O' },
      { label: 'Certificate', value: 'LSA Data Science Completion Certificate', icon: 'C' },
    ],
    gains: [
      { title: 'Job-Ready Skills', description: 'Learn to clean, analyze, and present data using modern workflows.' },
      { title: 'Hands-On Learning', description: 'Every module includes labs and exercises tied to practical use-cases.' },
      { title: 'Mentor Support', description: 'Get guidance from experienced mentors on concepts and execution.' },
      { title: 'Practical Projects', description: 'Build end-to-end mini case studies to strengthen your portfolio.' },
      { title: 'Career Preparation', description: 'Interview strategy, profile polish, and project storytelling support.' },
    ],
    audiences: [
      { title: 'Students', description: 'Build practical data skills early and stand out in internships.' },
      { title: 'Fresh Graduates', description: 'Bridge the gap between academic learning and hiring expectations.' },
      { title: 'Career Switchers', description: 'Transition into data-driven roles with structured guidance.' },
      { title: 'Working Professionals', description: 'Upskill with job-relevant tools and project-based practice.' },
    ],
    careerSupport: {
      title: 'Your Interview Readiness Track',
      description: 'Move from learner to candidate with a step-by-step support system designed for real hiring conversations.',
      checkpointTitle: 'Mentor-led checkpoints',
      checkpointDescription: 'Feedback loops at every stage of preparation.',
      tags: ['Resume polish', 'Mock rounds', 'Storytelling drills', 'Job mapping'],
      steps: [
        { title: 'Resume and LinkedIn Guidance', description: 'Shape a profile that clearly matches entry-level data role expectations.' },
        { title: 'Mock Interviews', description: 'Practise technical and HR rounds and learn exactly where to improve.' },
        { title: 'Project Storytelling', description: 'Present your projects with business outcomes, not just code and charts.' },
        { title: 'Placement and Mentorship', description: 'Get role mapping, application support, and mentor guidance until interview stage.' },
      ],
    },
    certification: {
      previewTitle: 'Certificate Preview',
      previewDescription: 'Add your sample certificate here so learners can see how the final credential looks.',
      points: [
        { title: 'Official LSA Completion Certificate', description: 'Receive recognized completion proof from Lords Skill Academy.' },
        { title: 'Assessment-Backed Validation', description: 'Skills are validated through practical checkpoints and assignments.' },
        { title: 'Portfolio Evidence', description: 'Show verified project work that supports your interview narrative.' },
        { title: 'Career-Focused Recognition', description: 'Designed to strengthen your profile for entry-level data opportunities.' },
      ],
    },
    trainer: {
      description: 'Trainer profile and teaching experience will be added when verified LSA faculty information is available.',
    },
    hiring: {
      description: 'Verified hiring partner information will be added when confirmed by LSA.',
      partners: [],
    },
    classroomGallery: [
      { alt: 'Classroom learning moment placeholder', caption: 'Classroom learning moment' },
      { alt: 'Students working together placeholder', caption: 'Students working together' },
      { alt: 'Practical learning session placeholder', caption: 'Practical learning session' },
      { alt: 'Learner discussion placeholder', caption: 'Learner discussion' },
      { alt: 'LSA classroom group placeholder', caption: 'LSA classroom group' },
      { alt: 'Workshop learning moment placeholder', caption: 'Workshop learning moment' },
    ],
  },
  'cyber-security': { ...emptyDetail({ title: 'Cyber Security', slug: 'cyber-security', description: 'Explore security thinking, digital systems, and responsible practice.', status: 'active' }), toolsAndDisciplines: cyberSecurityTools },
  'digital-marketing': { ...emptyDetail({ title: 'Digital Marketing', slug: 'digital-marketing', description: 'Learn how digital channels, content, and measurement connect.', status: 'active' }), toolsAndDisciplines: digitalMarketingTools },
  devops: { ...emptyDetail({ title: 'DevOps', slug: 'devops', description: 'Program details will be added here.', status: 'active' }), toolsAndDisciplines: devOpsTools },
  'python-programming': { ...emptyDetail({ title: 'Python Programming', slug: 'python-programming', description: 'Program details will be added here.', status: 'active' }), toolsAndDisciplines: pythonTools },
  'full-stack-java': { ...emptyDetail({ title: 'Full Stack Java', slug: 'full-stack-java', description: 'Program details will be added here.', status: 'active' }), toolsAndDisciplines: fullStackJavaTools },
  'power-bi': { ...emptyDetail({ title: 'Power BI', slug: 'power-bi', description: 'Program details will be added here.', status: 'active' }), toolsAndDisciplines: powerBiTools },
}

export function getProgramDetail(slug: string, fallback?: Program) {
  return programDetails[slug] ?? (fallback ? emptyDetail(fallback) : undefined)
}