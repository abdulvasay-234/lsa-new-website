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
  tools('PROGRAMMING', [
    ['PYTHON', 'si-python', 'Programming language for the Data Science workflow.'],
    ['GIT', 'si-git', 'Track changes in development and project work.'],
    ['IDE / DEVELOPMENT ENVIRONMENT', 'fa-laptop-code', 'Write and run code in a development environment.'],
    ['JUPYTER NOTEBOOK', 'fa-laptop-code', 'Work interactively with code and analysis.'],
    ['PYTHON DATA STRUCTURES', 'fa-layer-group', 'Organize data using Python structures.'],
    ['OBJECT-ORIENTED PROGRAMMING', 'fa-code-branch', 'Structure code with objects and reusable behavior.'],
    ['FILE HANDLING', 'fa-folder-open', 'Read and write files in Python.'],
    ['ERROR HANDLING', 'fa-triangle-exclamation', 'Handle errors and exceptions in code.'],
    ['CSV', 'fa-file-csv', 'Read and write tabular text data.'],
    ['JSON', 'fa-code', 'Work with structured data in JSON format.'],
  ], 'Programming foundations and workflow for Data Science.'),
  tools('DATA & ANALYSIS', [
    ['NUMPY', 'si-numpy', 'Numerical computing with arrays.'],
    ['PANDAS', 'si-pandas', 'Data manipulation, cleaning, and analysis.'],
    ['DATA CLEANING', 'fa-filter', 'Prepare data for analysis.'],
    ['DATA WRANGLING', 'fa-arrows-rotate', 'Transform data into useful structures.'],
    ['EXPLORATORY DATA ANALYSIS', 'fa-magnifying-glass-chart', 'Explore patterns and properties in data.'],
    ['STATISTICAL ANALYSIS', 'fa-chart-line', 'Summarize and analyze data statistically.'],
    ['MISSING VALUE HANDLING', 'fa-table-cells', 'Identify and handle missing data.'],
    ['OUTLIER DETECTION', 'fa-triangle-exclamation', 'Find values that differ from expected patterns.'],
    ['CORRELATION ANALYSIS', 'fa-link', 'Examine relationships between variables.'],
  ], 'Tools and methods for preparing, exploring, and analyzing data.'),
  tools('VISUALISATION', [
    ['MATPLOTLIB', 'fa-chart-line', 'Create data visualizations with Matplotlib.'],
    ['SEABORN', 'fa-chart-area', 'Create statistical visualizations with Seaborn.'],
    ['PANDAS PLOT', 'si-pandas', 'Visualize data through Pandas plotting.'],
    ['BAR CHARTS', 'fa-chart-column', 'Compare values across categories.'],
    ['HISTOGRAMS', 'fa-chart-simple', 'Visualize distributions of numeric data.'],
    ['SCATTER PLOTS', 'fa-magnifying-glass-chart', 'Inspect relationships between variables.'],
    ['BOX PLOTS', 'fa-box-archive', 'Summarize distributions and identify outliers.'],
    ['VIOLIN PLOTS', 'fa-chart-area', 'Compare distributions and density.'],
    ['PAIR PLOTS', 'fa-layer-group', 'Compare pairwise relationships in datasets.'],
    ['HEATMAPS', 'fa-table-cells', 'Show values and relationships through color.'],
  ], 'Visualize distributions, comparisons, and relationships in data.'),
  tools('DATABASES & SQL', [
    ['SQL', 'fa-database', 'Query and manage relational data.'],
    ['MYSQL', 'si-mysql', 'Relational database technology.'],
    ['POSTGRESQL', 'si-postgresql', 'Open-source relational database technology.'],
    ['MONGODB', 'si-mongodb', 'Document database technology.'],
    ['DATABASE DESIGN', 'fa-diagram-project', 'Structure data and database relationships.'],
    ['DDL / DML', 'fa-code', 'Define database structures and modify data.'],
    ['SQL JOINS', 'fa-link', 'Combine related data across tables.'],
    ['SUBQUERIES', 'fa-code-branch', 'Nest queries to answer database questions.'],
    ['GROUP BY / HAVING', 'fa-layer-group', 'Group records and filter aggregate results.'],
    ['PYTHON–MYSQL INTEGRATION', 'si-python', 'Connect Python workflows to MySQL.'],
  ], 'Relational and document databases, queries, and Python integration.'),
  tools('MACHINE LEARNING', [
    ['SCIKIT-LEARN', 'si-scikit-learn', 'Build and evaluate machine learning models.'],
    ['LINEAR REGRESSION', 'fa-chart-line', 'Model continuous outcomes.'],
    ['LOGISTIC REGRESSION', 'fa-chart-line', 'Model categorical outcomes.'],
    ['KNN', 'fa-magnifying-glass-chart', 'Classify or estimate using nearby observations.'],
    ['DECISION TREES', 'fa-sitemap', 'Model decisions through branching rules.'],
    ['RANDOM FOREST', 'fa-tree', 'Combine multiple decision trees.'],
    ['K-MEANS', 'fa-circle-nodes', 'Cluster data into groups.'],
    ['DBSCAN', 'fa-circle-nodes', 'Cluster data by density.'],
    ['XGBOOST', 'fa-brain', 'Build gradient-boosted models.'],
    ['MODEL EVALUATION', 'fa-gauge', 'Assess model performance.'],
    ['CROSS-VALIDATION', 'fa-rotate', 'Evaluate models across data splits.'],
    ['PCA', 'fa-layer-group', 'Reduce dimensions while retaining key structure.'],
    ['PRECISION / RECALL / F1', 'fa-list-check', 'Measure classification performance.'],
  ], 'Algorithms and evaluation methods for supervised and unsupervised learning.'),
  tools('DEEP LEARNING & GENERATIVE AI', [
    ['TENSORFLOW', 'si-tensorflow', 'Framework for neural network development.'],
    ['PYTORCH', 'si-pytorch', 'Framework for flexible deep learning workflows.'],
    ['NEURAL NETWORKS', 'fa-share-nodes', 'Explore connected computational models.'],
    ['GPT', 'fa-brain', 'Work with generative pre-trained language models.'],
    ['GENERATIVE AI', 'fa-wand-magic-sparkles', 'Use generative models for content tasks.'],
    ['PROMPT ENGINEERING', 'fa-lightbulb', 'Design effective instructions for AI models.'],
    ['PRE-TRAINED MODELS', 'fa-boxes-stacked', 'Apply available models to practical tasks.'],
    ['TEXT GENERATION', 'fa-comments', 'Generate text using pre-trained language models.'],
  ], 'Work with established deep learning frameworks and pre-trained generative models.'),
  tools('PLACEMENT SUPPORT', [['RESUME WRITING', 'fa-file-lines', 'Present your skills, projects and experience clearly.'], ['MOCK INTERVIEWS', 'fa-comments', 'Practice interview scenarios and receive feedback.'], ['APTITUDE & ASSESSMENTS', 'fa-list-check', 'Prepare for common recruitment assessments.'], ['SOFT SKILLS', 'fa-people-group', 'Communication, teamwork and professional behaviour.'], ['PORTFOLIO & PROJECTS', 'fa-folder-open', 'Present your work as evidence of your capabilities.'], ['COMMUNICATION & PRESENTATION', 'fa-person-chalkboard', 'Explain your ideas and technical work effectively.'], ['CAREER GUIDANCE', 'fa-compass', 'Understand pathways, skill gaps and next steps.']], 'Prepare for what comes after learning. Technical skills are only one part of becoming career-ready. LSA supports students with preparation, practice and guidance for internships, interviews and early-career opportunities.'),
]

const cyberSecurityTools: ProgramDetail['toolsAndDisciplines'] = [
  tools('SECURITY FOUNDATIONS', [
    ['CIA TRIAD', 'fa-shield', 'Confidentiality, integrity, and availability.'],
    ['CYBER SECURITY FUNDAMENTALS', 'fa-lock', 'Core principles for protecting digital systems.'],
    ['CYBER ATTACK TYPES', 'fa-bug', 'Common attack patterns and their impacts.'],
    ['MALWARE', 'fa-bug', 'Malicious software and its security impact.'],
    ['SOCIAL ENGINEERING & PHISHING', 'fa-user-shield', 'Human-targeted attacks and awareness.'],
    ['DOS / DDOS', 'fa-network', 'Availability attacks against digital services.'],
    ['CRYPTOGRAPHY', 'fa-lock', 'Protect information through cryptographic principles.'],
    ['CYBER LAWS & ETHICS', 'fa-gavel', 'Legal and ethical responsibilities in security work.'],
    ['CEH ROADMAP', 'fa-code-branch', 'A structured path through CEH-oriented topics.'],
    ['THREAT & SECURITY CONCEPTS', 'fa-triangle-exclamation', 'Foundational threat and security concepts.'],
  ], 'Build the fundamentals needed to understand modern cyber security.'),
  tools('NETWORKING & SYSTEMS', [
    ['KALI LINUX', 'si-kali-linux', 'A Linux distribution used in security labs.'],
    ['LINUX', 'si-linux', 'Operating system fundamentals for security practice.'],
    ['NETWORKING', 'fa-network', 'How connected systems exchange data.'],
    ['PACKET ANALYSIS', 'fa-magnifying-glass-chart', 'Inspect network packets to understand traffic.'],
    ['OSI MODEL', 'fa-layer-group', 'A layered model for understanding network communication.'],
    ['TCP/IP', 'fa-network', 'Core protocols for internet communication.'],
    ['IP ADDRESSING & SUBNETTING', 'fa-computer', 'Addressing and network range fundamentals.'],
    ['PORTS & PROTOCOLS', 'fa-server', 'Services and protocols communicating across networks.'],
    ['DNS', 'fa-globe', 'Name resolution across networks.'],
    ['HTTP / HTTPS', 'fa-code', 'Web communication and encrypted transport.'],
    ['FTP', 'fa-file-lines', 'File transfer protocol fundamentals.'],
    ['SSH', 'fa-terminal', 'Secure remote access to systems.'],
    ['WINDOWS', 'fa-windows', 'Windows system and security fundamentals.'],
    ['WIRELESS SECURITY', 'fa-wifi', 'Security principles for wireless networks.'],
    ['MOBILE SECURITY', 'fa-computer', 'Security considerations for mobile devices.'],
  ], 'Understand networks, operating systems, protocols, and the systems security professionals work with.'),
  tools('SECURITY TOOLS', [
    ['KALI LINUX', 'si-kali-linux', 'A security-focused Linux platform for controlled labs.'],
    ['WIRESHARK', 'si-wireshark', 'Inspect and analyze network traffic.'],
    ['NMAP', 'fa-magnifying-glass', 'Network discovery and port scanning.'],
    ['METASPLOIT', 'si-metasploit', 'A framework for controlled security testing.'],
    ['BURP SUITE', 'si-burp-suite', 'A toolkit for web application security testing.'],
    ['SQLMAP', 'fa-database', 'Automated testing for SQL injection vulnerabilities.'],
    ['OWASP ZAP', 'fa-shield-halved', 'Web application security testing.'],
    ['NESSUS', 'fa-shield', 'Vulnerability assessment.'],
    ['JOHN THE RIPPER', 'fa-lock', 'Password security auditing.'],
    ['AIRCRACK-NG', 'fa-wifi', 'Wireless network security testing.'],
    ['METASPLOITABLE', 'fa-laptop-code', 'A deliberately vulnerable practice system.'],
  ], 'Work with practical tools used for reconnaissance, scanning, vulnerability assessment, exploitation, and security testing.'),
  tools('WEB & APPLICATION SECURITY', [
    ['OWASP TOP 10', 'si-owasp', 'A reference for common web application risks.'],
    ['BURP SUITE', 'si-burp-suite', 'Inspect and test web application traffic.'],
    ['OWASP ZAP', 'fa-shield-halved', 'A web application testing tool.'],
    ['SQL INJECTION', 'fa-database', 'A vulnerability involving unsafe database queries.'],
    ['XSS', 'fa-code', 'Client-side script injection vulnerabilities.'],
    ['CSRF', 'fa-arrows-rotate', 'Unauthorized actions performed through a trusted session.'],
    ['FILE INCLUSION', 'fa-file-code', 'Vulnerabilities involving unsafe file references.'],
    ['SESSION HIJACKING', 'fa-user-shield', 'Risks to authenticated user sessions.'],
    ['WEB APPLICATION SECURITY', 'fa-shield-halved', 'Protect applications and their data.'],
    ['OWASP JUICE SHOP', 'fa-laptop-code', 'A deliberately insecure web application for practice.'],
    ['SQLMAP', 'fa-database', 'Test for SQL injection in authorized environments.'],
  ], 'Explore web vulnerabilities, application security, and practical testing workflows.'),
  tools('SOC & DEFENSE', [
    ['SOC', 'fa-computer', 'Security operations center fundamentals.'],
    ['SIEM', 'fa-magnifying-glass-chart', 'Security information and event management basics.'],
    ['LOG MANAGEMENT', 'fa-file-lines', 'Collect and organize security logs.'],
    ['IDS / IPS', 'fa-shield-halved', 'Intrusion detection and prevention concepts.'],
    ['FIREWALLS', 'fa-fire', 'Filter and control network traffic.'],
    ['VPN', 'fa-network', 'Private network connections and secure access.'],
    ['LOG ANALYSIS', 'fa-magnifying-glass', 'Examine events and identify indicators.'],
    ['INCIDENT RESPONSE', 'fa-arrows-rotate', 'Structured response to security incidents.'],
    ['SECURITY OPERATIONS', 'fa-user-shield', 'Monitoring, investigation, and defensive workflows.'],
  ], 'Understand how security teams monitor, detect, investigate, and respond to threats.'),
  tools('FORENSICS, CLOUD & COMPLIANCE', [
    ['DIGITAL FORENSICS', 'fa-fingerprint', 'Examine digital evidence methodically.'],
    ['DISK FORENSICS', 'fa-database', 'Investigate storage media and file systems.'],
    ['LOG FORENSICS', 'fa-file-lines', 'Use log records as evidence.'],
    ['EVIDENCE COLLECTION', 'fa-box-archive', 'Collect and preserve digital evidence.'],
    ['CHAIN OF CUSTODY', 'fa-link', 'Track evidence handling and access.'],
    ['CLOUD SECURITY', 'fa-cloud', 'Security principles for cloud environments.'],
    ['CLOUD MISCONFIGURATION', 'fa-triangle-exclamation', 'Identify risks caused by insecure configuration.'],
    ['RISK ASSESSMENT', 'fa-scale-balanced', 'Assess and prioritize security risks.'],
    ['ISO 27001', 'fa-file-shield', 'Information security management standard.'],
    ['COMPLIANCE FRAMEWORKS', 'fa-scale-balanced', 'Security controls and compliance requirements.'],
    ['CYBER LAWS & REGULATIONS', 'fa-gavel', 'Legal requirements for security and data handling.'],
    ['IAM', 'fa-user-shield', 'Identity and access management.'],
  ], 'Explore digital forensics, cloud security, risk management, and compliance.'),
  tools('ETHICAL HACKING & CEH', [
    ['ETHICAL HACKING', 'fa-user-shield', 'Authorized security testing with defined scope.'],
    ['PENETRATION TESTING', 'fa-bug', 'Assess security through controlled testing.'],
    ['CEH', 'fa-certificate', 'Certified Ethical Hacker exam preparation topics.'],
    ['PENETRATION TESTING LIFECYCLE', 'fa-arrows-rotate', 'A structured approach to penetration testing.'],
    ['RECONNAISSANCE', 'fa-magnifying-glass', 'Gather information within an authorized scope.'],
    ['SCANNING', 'fa-network', 'Identify hosts, services, and potential exposures.'],
    ['ENUMERATION', 'fa-list', 'Identify available accounts, services, and resources.'],
    ['VULNERABILITY ASSESSMENT', 'fa-shield-halved', 'Identify and prioritize security weaknesses.'],
    ['RED TEAM', 'fa-bullseye', 'Simulate authorized adversary activity.'],
    ['BLUE TEAM', 'fa-shield', 'Detect, investigate, and respond to threats.'],
    ['MOCK PENETRATION TEST', 'fa-flask', 'Practice a controlled end-to-end assessment.'],
    ['CEH EXAM PREPARATION', 'fa-book-open', 'Prepare for CEH-oriented assessment.'],
    ['CAPSTONE PROJECT', 'fa-laptop-code', 'Apply learning in a scoped practical project.'],
  ], 'Practice structured penetration testing and prepare for CEH-oriented assessment.'),
  tools('PLACEMENT SUPPORT', [['RESUME WRITING', 'fa-file-lines', 'Present your skills, projects and experience clearly.'], ['MOCK INTERVIEWS', 'fa-comments', 'Practice interview scenarios and receive feedback.'], ['APTITUDE & ASSESSMENTS', 'fa-list-check', 'Prepare for common recruitment assessments.'], ['SOFT SKILLS', 'fa-people-group', 'Communication, teamwork and professional behaviour.'], ['PORTFOLIO & PROJECTS', 'fa-folder-open', 'Present your work as evidence of your capabilities.'], ['COMMUNICATION & PRESENTATION', 'fa-person-chalkboard', 'Explain your ideas and technical work effectively.'], ['CAREER GUIDANCE', 'fa-compass', 'Understand pathways, skill gaps and next steps.']], 'Prepare for what comes after learning. Technical skills are only one part of becoming career-ready. LSA supports students with preparation, practice and guidance for internships, interviews and early-career opportunities.'),
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
  { label: 'Mode', value: 'Classroom / Hybrid learning format', icon: 'M' },
  { label: 'Weekly Hours', value: '8–10 hours of guided learning per week', icon: 'H' },
  { label: 'Projects', value: '3 portfolio-focused projects with mentor feedback', icon: 'P' },
  { label: 'Support', value: 'Weekly doubt-clearing sessions and learning feedback', icon: 'S' },
  { label: 'Learning Outcome', value: 'Practical skills in the program subject area', icon: 'O' },
  { label: 'Certificate', value: 'LSA Program Completion Certificate', icon: 'C' },
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
  previewTitle: 'See what your LSA certificate looks like.',
  previewDescription: 'A sample certificate showing the format, course details, completion information, and certificate identification.',
  previewImage: { src: `${import.meta.env.BASE_URL}media/sample-certificate/Orginal.png`, alt: 'LSA sample certificate preview', width: 707, height: 1000 },
  points: [
    { title: 'Official LSA Completion Certificate', description: 'Receive a certificate from Lords Skill Academy upon successful completion of the program.' },
    { title: 'Learning & Assessment', description: 'Demonstrate your understanding through practical learning activities, assignments, and program checkpoints.' },
    { title: 'Project Portfolio', description: 'Build projects throughout the program that you can document and showcase alongside your certificate.' },
    { title: 'Career Portfolio Support', description: 'Use your certificate and project work as part of your professional portfolio when presenting your skills to opportunities.' },
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
    { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00752.jpg`, alt: 'Students learning technology in an LSA classroom', caption: 'Classroom learning moment' },
    { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00621%20(1).jpg`, alt: 'Students working together during an LSA learning session', caption: 'Students working together' },
    { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00712.jpg`, alt: 'Learners taking part in practical technology training', caption: 'Practical learning session' },
    { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00664.jpg`, alt: 'Learner discussion during an LSA classroom session', caption: 'Learner discussion' },
    { src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00590%20(1).jpg`, alt: 'LSA classroom group learning together', caption: 'LSA classroom group' },
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
      title: 'Data Science With GenAI Program',
      slug: 'data-science',
      description: 'Work with data, analysis, and practical problem-solving workflows.',
      status: 'active',
    }),
    eyebrow: 'DATA SCIENCE',
    heroTitle: 'Build with data. Think beyond the spreadsheet.',
    heroDescription: 'Build practical skills in Python, data analysis, machine learning, and Generative AI, through guided learning and real projects.',
    heroMedia: {
      src: `${import.meta.env.BASE_URL}media/classroom-imgs/optimized/2SP00752.jpg`,
      alt: 'Students learning technology in an LSA classroom',
      width: 1800,
      height: 1125,
    },
    batchStartDate: '05 October, 2026',
    projects: [{}, {}, {}],
    toolsAndDisciplines: dataScienceTools,
    curriculumDownload: 'media/data-science-curriculum.txt',
    careerSupport: undefined,
    highlights: [
      { label: 'Mode', value: 'Classroom / Hybrid learning format', icon: 'M' },
      { label: 'Weekly Hours', value: '8–10 hours of guided learning per week', icon: 'H' },
      { label: 'Projects', value: '3 portfolio-focused projects with mentor feedback', icon: 'P' },
      { label: 'Support', value: 'Weekly doubt-clearing sessions and learning feedback', icon: 'S' },
      { label: 'Learning Outcome', value: 'Practical skills in data analysis, machine learning, and AI', icon: 'O' },
      { label: 'Certificate', value: 'LSA Data Science Program Completion Certificate', icon: 'C' },
    ],
    gains: [
      { title: 'Practical Capability', description: 'Learn by doing, not just by watching.', practiceDescription: 'Work with Python, data tools, and AI technologies through guided exercises and practical problem-solving.' },
      { title: 'Project Experience', description: 'Turn concepts into something you can show.', practiceDescription: 'Build meaningful Data Science projects, document your work, and develop a portfolio that demonstrates your skills.' },
      { title: 'Career Readiness', description: 'Learn to communicate what you can do.', practiceDescription: 'Present your projects, explain your approach, discuss your decisions, and communicate your technical work with confidence.' },
    ],
    audiences: [
      { title: 'Students', description: 'Start building practical data skills. Develop a strong foundation in Data Science through guided learning, hands-on practice, and projects.' },
      { title: 'Fresh Graduates', description: 'Turn academic knowledge into practical experience. Strengthen your technical skills through applied learning, projects, and portfolio development.' },
      { title: 'Career Switchers', description: 'Build a foundation for your next technology path. Learn the fundamentals of Data Science through a structured program with guided practice and project work.' },
      { title: 'Working Professionals', description: 'Add data skills to your existing experience. Build practical knowledge of data tools, analytics, and AI through focused, project-based learning.' },
    ],
    /*
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
    */
    certification: {
      previewTitle: 'See what your LSA certificate looks like.',
      previewDescription: 'A sample certificate showing the format, course details, completion information, and certificate identification.',
      points: [
        { title: 'Official LSA Completion Certificate', description: 'Receive a certificate from Lords Skill Academy upon successful completion of the program.' },
        { title: 'Learning & Assessment', description: 'Demonstrate your understanding through practical learning activities, assignments, and program checkpoints.' },
        { title: 'Project Portfolio', description: 'Build projects throughout the program that you can document and showcase alongside your certificate.' },
        { title: 'Career Portfolio Support', description: 'Use your certificate and project work as part of your professional portfolio when presenting your skills to opportunities.' },
      ],
    },
    trainer: {
      description: 'Trainer profile and teaching experience will be added when verified LSA faculty information is available.',
    },
    hiring: {
      description: 'Verified hiring partner information will be added when confirmed by LSA.',
      partners: [],
    },
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