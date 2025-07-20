import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  remoteState,
  codeSoft,
  postgresql,
  next,
  postman,
  github,
  nowted,
  resumeBuilder,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React  Developer",
    icon: mobile,
  },
  {
    title: "Frontend Enthusiast",
    icon: backend,
  },
  // {
  //   title: "Content Creator",
  //   icon: creator,
  // },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Postgresql",
    icon: postgresql,
  },
  {
    name: "Next JS",
    icon: next,
  },
  {
    name: "Postman",
    icon: postman,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Github",
    icon: github,
  },
];

const experiences = [
  {
    title: "Software Developer Intern",
    company_name: "RemoteState",
    icon: remoteState,
    iconBg: "#383E56",
    date: "Feb 2025 - June 2025",
    points: [
      "Built scalable frontend components using React.js and managed routes with Next.js App Router.",
      "Integrated REST APIs and handled state using React hooks and context for efficient data flow.",
      "Implemented form validation using Zod and improved UX with toast notifications and loading states.",
      "Optimized application performance and accessibility through image lazy-loading and semantic markup.",
      "Collaborated in agile sprints and participated in daily standups, gaining experience in a professional development workflow.",
    ],
  },
  {
    title: "Front-End Developer Intern",
    company_name: "CodeSoft",
    icon: codeSoft,
    iconBg: "#E6DEDD",
    date: "Dec 2024 - Dec 2024",
    points: [
      "Developed and styled interactive UI components using HTML, CSS, and JavaScript.",
      "Converted Figma designs into responsive web pages using semantic HTML and modern CSS practices.",
      "Ensured mobile-first responsiveness and cross-browser compatibility across Chrome, Firefox, and Edge.",
      "Learned and followed version control best practices using Git and GitHub.",
    ],
  },

  // {
  //   title: "React Native Developer",
  //   company_name: "Tesla",
  //   icon: tesla,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2021 - Feb 2022",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Web Developer",
  //   company_name: "Shopify",
  //   icon: shopify,
  //   iconBg: "#383E56",
  //   date: "Jan 2022 - Jan 2023",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Full stack Developer",
  //   company_name: "Meta",
  //   icon: meta,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Job Portal with Resume Matching",
    description:
      "A full-stack job portal platform that enables recruiters to post jobs and candidates to apply. It features automated resume parsing and matching using keyword extraction to suggest the most relevant candidates for a job opening.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
      {
        name: "tailwind",
        color: "blue-text-gradient",
      },
      {
        name: "jwt-auth",
        color: "green-text-gradient",
      },
    ],
    image: jobit, // Replace with your actual image import
    source_code_link: "https://github.com/manishchoudhary178/job-portal",
  },

  {
    name: "Nowted",
    description:
      "A modern note-taking web application that allows users to create, edit, and delete notes with a clean and minimalistic interface. It features rich text editing, persistent storage, and responsive design for productivity on any device.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "localstorage",
        color: "green-text-gradient",
      },
      {
        name: "context-api",
        color: "blue-text-gradient",
      },
    ],
    image: nowted,
    source_code_link: "https://github.com/Manish626367/Nowted-ReactQuery",
  },
  {
    name: "Resume Builder",
    description:
      "A web-based application that allows users to create, customize, and download professional resumes. Users can fill out form-based inputs, preview their resume in real-time, and access it via a unique sharable link.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "html2pdf",
        color: "green-text-gradient",
      },
      {
        name: "strapi",
        color: "blue-text-gradient",
      },
    ],
    image: resumeBuilder, // Add your image reference here
    source_code_link: "https://github.com/manishchoudhary178/Resume-Builder",
  },
];

export { services, technologies, experiences, testimonials, projects };
