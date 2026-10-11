import { Component } from '@angular/core';
import { Glow } from '../../shared/glow';
import { PROJECTS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [Glow],
  styleUrl: './projects.scss',
  template: `
    <section id="projects" class="sec">
      <p class="eyebrow"><b>04</b><u></u>SELECTED WORK</p>

      <h2>Ideas shipped into the world.</h2>

      <div class="grid">
        @for (project of projects; track project.name; let i = $index) {
          <article class="proj">
            <div class="thumb" appGlow [style.background-image]="'url(' + project.image + ')'">
            </div>

            <p class="mono dim">0{{ i + 1 }} / {{ project.kind }}</p>
            <h3>{{ project.name }}</h3>
            <p class="body sm">{{ project.desc }}</p>

            <div class="chips">
              @for (tech of project.stack; track tech) {
                <span class="mono">{{ tech }}</span>
              }
            </div>

            <p class="mono dim tiny">{{ project.meta }}</p>

            <p class="links">
              <a href="{{project.url}}">Source code <span class="arr">↗</span></a>
            </p>
          </article>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
}
