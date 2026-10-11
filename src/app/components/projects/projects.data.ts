import type { Key } from '../../i18n/en';

export interface Project {
  name: string;
  kind: Key;
  /** still picture shown by default (png / jpg / webp) */
  image: string;
  /** optional animated version (gif / animated webp), only loaded and played while hovering */
  animated?: string;
  desc: Key;
  stack: string[];
  meta: Key;
  url: string;
  status: 'in-progress' | 'done' | 'archived';
}

export const STATUS_LABELS: Record<Project['status'], Key> = {
  'in-progress': 'projects.status.progress',
  done: 'projects.status.done',
  archived: 'projects.status.archived',
};

export const PROJECTS: Project[] = [
  {
    name: 'This portfolio!',
    kind: 'projects.portfolio.kind',
    image: '/projects/template.gif',
    desc: 'projects.portfolio.desc',
    stack: ['Angular', 'TypeScript'],
    meta: 'projects.portfolio.meta',
    url: 'github.com/portfolio',
    status: 'in-progress'
  },
  {
    name: 'Template',
    kind: 'projects.editorial.kind',
    image: '/projects/template.gif',
    desc: 'projects.editorial.desc',
    stack: ['Java', 'Swing', 'ESRI'],
    meta: 'projects.editorial.meta',
    url: 'github.com/test1',
    status: 'done'

  },
  {
    name: 'Template',
    kind: 'projects.collab.kind',
    image: '/projects/template.gif',
    desc: 'projects.collab.desc',
    stack: ['Java', 'Spring Boot', 'React'],
    meta: 'projects.collab.meta',
    url: 'github.com/test2',
    status: 'archived'
  },
  {
    name: 'Template',
    kind: 'projects.collab.kind',
    image: '/projects/template.gif',
    desc: 'projects.collab.desc',
    stack: ['Kotlin', 'Android'],
    meta: 'projects.collab.meta',
    url: 'github.com/test2',
    status: 'done'
  },
];
