export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'MUI', 'ShadcnUI'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'OAuth'],
  },
  {
    id: 'database',
    label: 'Database',
    items: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'Figma', 'Vercel', 'Netlify'],
  },
];

export const skillInsights = {
  React: ['Frontend', 'UI', 'State', 'Components'],
  'Next.js': ['Frontend', 'Routing', 'Rendering'],
  TypeScript: ['Types', 'Safety', 'Scale'],
  JavaScript: ['Language', 'DOM', 'Logic'],
  'Tailwind CSS': ['UI', 'Layout', 'Systems'],
  MUI: ['UI', 'Components'],
  ShadcnUI: ['UI', 'Primitives'],
  'Node.js': ['Backend', 'Services', 'Runtime'],
  'Express.js': ['Backend', 'APIs', 'Services'],
  'REST APIs': ['APIs', 'Data', 'Integration'],
  JWT: ['Auth', 'Security'],
  OAuth: ['Auth', 'Identity'],
  PostgreSQL: ['Database', 'Relational'],
  MongoDB: ['Database', 'Documents'],
  MySQL: ['Database', 'Relational'],
  Git: ['Versioning', 'Collaboration'],
  GitHub: ['Versioning', 'Shipping'],
  Postman: ['APIs', 'Testing'],
  Figma: ['Design', 'Handoff'],
  Vercel: ['Shipping', 'Frontend'],
  Netlify: ['Shipping', 'Frontend'],
};

export const skillNetwork = [
  { id: 'react', label: 'React', x: 50, y: 10, group: 'frontend' },
  { id: 'next', label: 'Next.js', x: 18, y: 34, group: 'frontend' },
  { id: 'ts', label: 'TypeScript', x: 50, y: 34, group: 'frontend' },
  { id: 'tw', label: 'Tailwind', x: 82, y: 34, group: 'frontend' },
  { id: 'api', label: 'REST APIs', x: 50, y: 58, group: 'backend' },
  { id: 'node', label: 'Node.js', x: 50, y: 76, group: 'backend' },
  { id: 'db', label: 'Database', x: 50, y: 94, group: 'database' },
];

export const skillLinks = [
  ['react', 'next'],
  ['react', 'ts'],
  ['react', 'tw'],
  ['next', 'api'],
  ['ts', 'api'],
  ['api', 'node'],
  ['node', 'db'],
];
