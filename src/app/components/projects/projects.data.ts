import type { Key } from '../../i18n/en';

export interface Project {
  name: string;
  /** still picture shown by default (png / jpg / webp) */
  image: string;
  /** optional animated version (gif / animated webp), shown only while hovering */
  animation?: string;
  desc: Key;
  stack: string[];
  meta: Key;
  url: string;
  status: 'in-progress' | 'done' | 'archived';
}

export const STATUS_LABELS: Record<Project['status'], Key> = {
  'in-progress': 'projects.status.progress',
  done: 'projects.status.done',
  archived: 'projects.status.archived'
};

export const PROJECTS: Project[] = [
  {
    name: 'This portfolio!',
    image: '/projects/template.png',
    animation: '/projects/template.gif',
    desc: 'projects.portfolio.desc',
    stack: ['Angular', 'TypeScript'],
    meta: 'projects.portfolio.meta',
    url: 'github.com/portfolio',
    status: 'in-progress'
  },
  {
    name: 'Template',
    image: '/projects/template.png',
    animation: '/projects/template.gif',
    desc: 'projects.editorial.desc',
    stack: ['Java', 'Swing', 'ESRI'],
    meta: 'projects.editorial.meta',
    url: 'github.com/test1',
    status: 'done'
  },
  {
    name: 'Template',
    image: '/projects/template.png',
    animation: '/projects/template.gif',
    desc: 'projects.collab.desc',
    stack: ['Java', 'Spring Boot', 'React'],
    meta: 'projects.collab.meta',
    url: 'github.com/test2',
    status: 'archived'
  },
  {
    name: 'Template',
    image: '/projects/template.png',
    animation: '/projects/template.gif',
    desc: 'projects.collab.desc',
    stack: ['Kotlin', 'Android'],
    meta: 'projects.collab.meta',
    url: 'github.com/test2',
    status: 'done'
  }
];
