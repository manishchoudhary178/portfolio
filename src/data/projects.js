import jobit from '../assets/jobit.png';
import nowted from '../assets/nowted.png';
import resumeBuilder from '../assets/resumeBuilder.png';

export const projects = [
  {
    id: 'job-portal',
    number: '01',
    name: 'Job Portal',
    fullName: 'Job Portal with Resume Matching',
    year: '2025',
    kicker: 'Recruiting platform',
    description:
      'A full-stack job portal where recruiters post openings and candidates apply. Resume parsing and keyword matching surface the most relevant candidates for each role.',
    problem:
      'Matching candidates to jobs from unstructured resumes is slow and easy to get wrong when done by hand.',
    solution:
      'A recruiter-and-candidate platform with JWT auth, job posting, applications, and keyword-based resume matching.',
    contribution:
      'Designed and built the frontend and API integration, including auth, job flows, and the matching UI.',
    stack: ['React', 'API', 'Node.js', 'MongoDB'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'ShadcnUI', 'JWT'],
    image: jobit,
    github: 'https://github.com/manishchoudhary178/job-portal',
    live: '',
  },
  {
    id: 'nowted',
    number: '02',
    name: 'Nowted',
    fullName: 'Nowted',
    year: '2025',
    kicker: 'Notes product',
    description:
      'A note-taking web app with a clean editor, persistent storage, and a responsive layout for writing on any device.',
    problem: 'Most note tools are either too heavy or lose context when you switch devices.',
    solution:
      'A focused notes product with markdown editing, autosave, offline-friendly local storage, and CRUD over a REST API.',
    contribution:
      'Built the editor experience, persistence, and API-backed note management with a minimal interface.',
    stack: ['React', 'TypeScript', 'REST', 'PostgreSQL'],
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Context API'],
    image: nowted,
    github: 'https://github.com/manishchoudhary178/nowted',
    live: '',
  },
  {
    id: 'resume-builder',
    number: '03',
    name: 'Resume Builder',
    fullName: 'Resume Builder',
    year: '2025',
    kicker: 'Document product',
    description:
      'A form-driven resume builder with live preview, PDF download, and a unique shareable link for each resume.',
    problem:
      'Formatting a professional resume by hand is tedious, and keeping a shareable version up to date is worse.',
    solution:
      'Users fill structured fields, preview the resume in real time, export to PDF, and share a unique URL.',
    contribution: 'Implemented the live preview flow, PDF export, and the form-to-document pipeline.',
    stack: ['React', 'Strapi', 'PDF'],
    technologies: ['React', 'Tailwind CSS', 'html2pdf', 'Strapi'],
    image: resumeBuilder,
    github: 'https://github.com/manishchoudhary178/Resume-Builder',
    live: '',
  },
];
