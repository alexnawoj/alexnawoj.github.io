export interface Project {
  name: string;
  kind: string;
  image: string;
  desc: string;
  stack: string[];
  meta: string;
  url: string;
  status: 'in-progress' | 'done' | 'archived';
}

export const STATUS_LABELS: Record<Project['status'], string> = {
  'in-progress': 'In progress',
  done: 'Done',
  archived: 'Archived',
};

export const PROJECTS: Project[] = [
  {
    name: 'This portfolio!',
    kind: 'ANALYTICS PLATFORM',
    image: '/projects/template.gif',
    desc: 'Making complex data feel simple. A real-time analytics dashboard with a clear view of revenue, customers, and the metrics that matter.',
    stack: ['Angular', 'TypeScript'],
    meta: 'Frontend development · !Data visualization · Responsive UI',
    url: 'github.com/portfolio',
    status: 'in-progress'
  },
  {
    name: 'Asteroid Impact Simulator',
    kind: 'EDITORIAL EXPERIENCE',
    image: '/projects/template.gif',
    desc: 'A quieter corner of the internet. A content-driven travel journal with immersive storytelling, a custom CMS, and a focus on accessibility.',
    stack: ['Java', 'Swing', 'ESRI'],
    meta: 'Frontend development · CMS integration · Accessible design',
    url: 'github.com/test1',
    status: 'done'

  },
  {
    name: 'Quantum Mail',
    kind: 'COLLABORATION TOOL',
    image: '/projects/template.gif',
    desc: 'Less busywork, more momentum. A collaborative project workspace with drag-and-drop boards, live updates, and a little room to breathe.',
    stack: ['Java', 'Spring Boot', 'React'],
    meta: 'Full-stack development · Real-time sync · Authentication',
    url: 'github.com/test2',
    status: 'archived'
  },
  {
    name: 'Yet Another Launcher',
    kind: 'COLLABORATION TOOL',
    image: '/projects/template.gif',
    desc: 'Less busywork, more momentum. A collaborative project workspace with drag-and-drop boards, live updates, and a little room to breathe.',
    stack: ['Kotlin', 'Android'],
    meta: 'Full-stack development · Real-time sync · Authentication',
    url: 'github.com/test2',
    status: 'done'
  },
];
