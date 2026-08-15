import cpc from '../assets/company/cpc.png';
import remoteState from '../assets/company/remotestate.png';
import codeSoft from '../assets/company/codeSoft.png';

export const experience = [
  {
    id: 'cpc',
    period: 'Sep 2025 | Present',
    year: '2025',
    role: 'Frontend Developer',
    roleDetail: 'Trainee | Full Time',
    company: 'Chaitanya Project Consultancy',
    focus: 'Enterprise ERP | Finance workflows',
    summary:
      'Working on a full MERN stack enterprise application. I build React interfaces and also handle Node.js and Express APIs, MongoDB operations, authentication, business logic, and frontend backend integration across finance workflows.',
    points: [
      'Developed reusable and responsive React interfaces for enterprise finance workflows.',
      'Worked across the MERN stack, including Node.js, Express.js, MongoDB, REST APIs, authentication, and business logic.',
      'Integrated frontend interfaces with backend APIs and handled dynamic data flows across ERP modules.',
      'Worked with database operations and business rules required by finance workflows.',
      'Contributed to maintaining and improving an enterprise application across both frontend and backend layers.',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'REST APIs',
      'Ant Design',
      'Authentication',
      'API Integration',
    ],
    logo: cpc,
  },
  {
    id: 'remotestate',
    period: 'Feb | Jun 2025',
    year: '2025',
    role: 'Software Developer Intern',
    roleDetail: 'Internship',
    company: 'RemoteState',
    focus: 'Internal enterprise dashboard',
    summary:
      'Built StoreX, an internal dashboard for employees, physical assets, and out of office events, with typed forms, authentication, REST API integration, and PostgreSQL.',
    points: [
      'Built scalable frontend components in React and routed with Next.js App Router.',
      'Integrated REST APIs and managed state with hooks and context.',
      'Implemented form validation with Zod, plus toasts and loading states.',
      'Improved performance and accessibility with lazy loaded images and semantic markup.',
      'Worked in agile sprints and daily standups.',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Zod', 'NextAuth.js'],
    logo: remoteState,
  },
  {
    id: 'codesoft',
    period: 'Dec 2024',
    year: '2024',
    role: 'Frontend Developer Intern',
    roleDetail: 'Internship',
    company: 'CodeSoft',
    focus: 'Responsive UI from design',
    summary:
      'Turned Figma designs into responsive pages and learned production habits around Git, browsers, and mobile first CSS.',
    points: [
      'Developed interactive UI with HTML, CSS, and JavaScript.',
      'Converted Figma designs into responsive pages with semantic HTML.',
      'Ensured mobile first layouts and cross browser compatibility.',
      'Followed Git and GitHub version control practices.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Git'],
    logo: codeSoft,
  },
];
