export type Category = 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';
export type Filter = Category | 'all';

export interface Skill {
  name: string;
  category: Category;
  icon: string;
  /** dark logos are turned white so they stay visible on the dark background */
  light?: boolean;
}

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

export const SKILLS: Skill[] = [
  // languages
  { name: 'C', category: 'languages', icon: devicon('c/c-original') },
  { name: 'C++', category: 'languages', icon: devicon('cplusplus/cplusplus-original') },
  { name: 'Java', category: 'languages', icon: devicon('java/java-original') },
  { name: 'Kotlin', category: 'languages', icon: devicon('kotlin/kotlin-original') },
  { name: 'Python', category: 'languages', icon: devicon('python/python-original') },
  { name: 'TypeScript', category: 'languages', icon: devicon('typescript/typescript-original') },
  { name: 'Bash', category: 'languages', icon: devicon('bash/bash-original'), light: true },

  // frontend
  { name: 'React', category: 'frontend', icon: devicon('react/react-original') },
  { name: 'Angular', category: 'frontend', icon: devicon('angular/angular-original') },
  { name: 'React Native', category: 'frontend', icon: devicon('react/react-original') },
  { name: 'Node.js', category: 'frontend', icon: devicon('nodejs/nodejs-original') },
  { name: 'HTML', category: 'frontend', icon: devicon('html5/html5-original') },
  { name: 'CSS', category: 'frontend', icon: devicon('css3/css3-original') },
  { name: 'Unity', category: 'frontend', icon: devicon('unity/unity-original'), light: true },

  // backend
  { name: 'Spring Boot', category: 'backend', icon: devicon('spring/spring-original') },
  { name: 'Node.js', category: 'frontend', icon: devicon('nodejs/nodejs-original') },
  { name: 'Express', category: 'backend', icon: devicon('express/express-original'), light: true },

  // databases
  { name: 'PostgreSQL', category: 'databases', icon: devicon('postgresql/postgresql-original') },
  { name: 'MySQL', category: 'databases', icon: devicon('mysql/mysql-original') },

  // tools
  { name: 'Docker', category: 'tools', icon: devicon('docker/docker-original') },
  { name: 'Git', category: 'tools', icon: devicon('git/git-original') },

];

export const LABELS: Record<Filter, string> = {
  all: 'All',
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  tools: 'Tools'
};

export const TABS = (Object.keys(LABELS) as Filter[]).map((id) => ({
  id,
  label: LABELS[id],
  count: id === 'all' ? SKILLS.length : SKILLS.filter((s) => s.category === id).length,
}));
