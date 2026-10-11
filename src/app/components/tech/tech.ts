import { Component, computed, signal } from '@angular/core';
import { Glow } from '../../shared/glow';

type Category = 'languages' | 'frontend' | 'backend' | 'databases' | 'cloud';
type Filter = Category | 'all';

interface Skill {
  name: string;
  category: Category;
  icon: string;
  /** dark logos are turned white so they stay visible on the dark background */
  light?: boolean;
}

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

const SKILLS: Skill[] = [
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
  { name: 'Docker', category: 'cloud', icon: devicon('docker/docker-original') },
  { name: 'Git', category: 'cloud', icon: devicon('git/git-original') },

];

const LABELS: Record<Filter, string> = {
  all: 'All',
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  cloud: 'Tools'
};

const TABS = (Object.keys(LABELS) as Filter[]).map((id) => ({
  id,
  label: LABELS[id],
  count: id === 'all' ? SKILLS.length : SKILLS.filter((s) => s.category === id).length,
}));

@Component({
  selector: 'app-tech',
  imports: [Glow],
  styleUrl: 'tech.scss',
  template: `
    <section id="tech" class="sec">
      <p class="eyebrow"><b>03</b><u></u>MY TOOLKIT</p>

      <h2>Tools I think in.</h2>
      <p class="sub">From systems programming to orchestration to inference — the full picture.</p>

      <div class="tabs" role="group" aria-label="Filter tools by category">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            class="tab"
            [class.on]="active() === tab.id"
            [attr.aria-pressed]="active() === tab.id"
            (click)="active.set(tab.id)"
          >
            {{ tab.label }}
            <small class="mono">{{ tab.count }}</small>
          </button>
        }
      </div>

      <div class="grid">
        <!-- tracking by tab + name re-creates the tiles on every switch, so they animate in again -->
        @for (skill of visible(); track active() + skill.name; let i = $index) {
          <div class="tile" appGlow [style.--i]="i">
            <img [src]="skill.icon" [class.light]="skill.light" alt="" loading="lazy" />
            <span class="mono">{{ skill.name }}</span>
          </div>
        }
      </div>
    </section>
  `,
})
export class Tech {
  protected readonly tabs = TABS;
  protected readonly total = SKILLS.length;
  protected readonly active = signal<Filter>('all');

  protected readonly visible = computed(() => {
    const filter = this.active();
    return filter === 'all' ? SKILLS : SKILLS.filter((s) => s.category === filter);
  });
}
