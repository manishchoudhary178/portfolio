import cpc from '../assets/company/cpc.png';
import remoteState from '../assets/company/remotestate.png';
import codeSoft from '../assets/company/codeSoft.png';

export const experience = [
  {
    id: 'cpc',
    period: '2025 — Now',
    year: '2025',
    role: 'Frontend Developer',
    roleDetail: 'Trainee — Full Time',
    company: 'Chaitanya Project Consultancy',
    focus: 'Enterprise ERP / Finance Applications',
    summary:
      'Contributing to an enterprise ERP portal — reusable UI, responsive layouts, and API-driven modules for finance workflows.',
    points: [
      'Contributed to an enterprise ERP portal using React.js and Ant Design.',
      'Built reusable UI components and responsive layouts across devices.',
      'Integrated backend APIs to fetch and display dynamic data in ERP modules.',
    ],
    technologies: ['React', 'Ant Design', 'API Integration', 'UI Engineering'],
    logo: cpc,
  },
  {
    id: 'remotestate',
    period: 'Feb — Jun 2025',
    year: '2025',
    role: 'Software Developer Intern',
    roleDetail: 'Internship',
    company: 'RemoteState',
    focus: 'Internal enterprise dashboard',
    summary:
      'Built StoreX, an internal dashboard for employees, physical assets, and out-of-office events — with typed forms, auth, and PostgreSQL.',
    points: [
      'Built scalable frontend components in React and routed with Next.js App Router.',
      'Integrated REST APIs and managed state with hooks and context.',
      'Implemented form validation with Zod, plus toasts and loading states.',
      'Improved performance and accessibility with lazy-loaded images and semantic markup.',
      'Worked in agile sprints and daily standups.',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Zod', 'NextAuth.js'],
    logo: remoteState,
  },
  {
    id: 'codesoft',
    period: 'Dec 2024',
    year: '2024',
    role: 'Front-End Developer Intern',
    roleDetail: 'Internship',
    company: 'CodeSoft',
    focus: 'Responsive UI from design',
    summary:
      'Turned Figma designs into responsive pages and learned production habits around Git, browsers, and mobile-first CSS.',
    points: [
      'Developed interactive UI with HTML, CSS, and JavaScript.',
      'Converted Figma designs into responsive pages with semantic HTML.',
      'Ensured mobile-first layouts and cross-browser compatibility.',
      'Followed Git and GitHub version control practices.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Git'],
    logo: codeSoft,
  },
];
