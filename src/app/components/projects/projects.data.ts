import type { Key } from '../../i18n/en';

export interface Project {
  name: string;
  /** still picture shown by default (png / jpg / webp) */
  image: string;
  /** optional animated version (gif / animated webp), shown only while hovering */
  animation?: string;
  desc: Key;
  stack: string[];
  url: string;
  status: 'in-progress' | 'maintaining' | 'archived';
}

export const STATUS_LABELS: Record<Project['status'], Key> = {
  'in-progress': 'projects.status.progress',
  maintaining: 'projects.status.maintaining',
  archived: 'projects.status.archived'
};

export const PROJECTS: Project[] = [
  {
    name: 'Portfolio',
    image: '/projects/portfolio.png',
    animation: '/projects/portfolio.png', // TODO add a webp
    desc: 'projects.portfolio.desc',
    stack: ['Angular', 'TypeScript', 'SCSS'],
    url: 'https://github.com/alexnawoj/alexnawoj.github.io',
    status: 'maintaining'
  },
  {
    name: 'Asteroid Simulation',
    image: '/projects/asteroid-sim.png',
    animation: '/projects/asteroid-sim.webp',
    desc: 'projects.asteroid-sim.desc',
    stack: ['Java', 'Swing', 'ESRI'],
    url: 'https://github.com/alexnawoj/asteroid-simulation',
    status: 'archived'
  },
  {
    name: 'Yet Another Launcher',
    image: '/projects/yal.png',
    animation: '/projects/yal.png', // TODO add a webp
    desc: 'projects.yal.desc',
    stack: ['Kotlin', 'Android'],
    url: '#',
    status: 'in-progress'
  },
  {
    name: 'Quantum Mail',
    image: '/projects/qm.png',
    animation: '/projects/qm.png',  // TODO add a webp
    desc: 'projects.qm.desc',
    stack: ['Java', 'Spring Boot', 'React', 'JavaScript'],
    url: 'https://github.com/alexnawoj/quantum-mail',
    status: 'archived'
  }
];
