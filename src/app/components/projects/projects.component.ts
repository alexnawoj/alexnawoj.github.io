import { Component, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { PROJECTS, STATUS_LABELS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [Glow, T],
  styleUrl: './projects.scss',
  template: `
    <section id="projects" class="sec">
      <p class="eyebrow"><b>04</b><u></u>{{ 'projects.eyebrow' | t }}</p>

      <h2>{{ 'projects.title' | t }}</h2>

      <div class="grid">
        @for (project of projects; track project.name; let i = $index) {
          <article class="proj">
            <div
              class="thumb"
              appGlow
              [style.background-image]="'url(' + (hovered() === project.name && project.animated ? project.animated : project.image) + ')'"
              (mouseenter)="hovered.set(project.name)"
              (mouseleave)="hovered.set(null)"
            >
                <span class="status mono" [attr.data-status]="project.status">
                <i class="dot"></i>
                {{ statusLabels[project.status] | t }}
              </span>

            </div>

            <p class="mono dim">0{{ i + 1 }} / {{ project.kind | t }}</p>
            <h3>{{ project.name }}</h3>
            <p class="body sm">{{ project.desc | t }}</p>

            <div class="chips">
              @for (tech of project.stack; track tech) {
                <span class="mono">{{ tech }}</span>
              }
            </div>

            <p class="mono dim tiny">{{ project.meta | t }}</p>

            <p class="links">
              <a href="{{project.url}}">{{ 'projects.source' | t }} <span class="arr">↗</span></a>
            </p>
          </article>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly hovered = signal<string | null>(null);
}
