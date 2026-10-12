import { Component, inject, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { type Project, PROJECTS, STATUS_LABELS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [Glow, T],
  styleUrl: './projects.scss',
  template: `
    <section id="projects" class="sec">
      <p class="eyebrow"><b>04</b><u></u>{{ 'projects.eyebrow' | t }}</p>

      <h2>{{ 'projects.title' | t }}</h2>

      <div class="grid">
        @for (project of projects; track $index; let i = $index) {
          <article class="proj">
            <div
              class="thumb"
              appGlow
              [attr.data-cursor]="project.animation ? 'hidden' : null"
              [style.background-image]="background(project, i)"
              (pointerenter)="hovered.set(i)"
              (pointerdown)="hovered.set(i)"
              (pointerleave)="hovered.set(null)"
              (pointercancel)="hovered.set(null)"
            >
              <span class="status mono" [attr.data-status]="project.status">
                <i class="dot"></i>
                {{ statusLabels[project.status] | t }}
              </span>
            </div>

            <p class="mono dim">0{{ i + 1 }}</p>
            <h3>{{ project.name }}</h3>
            <p class="body sm">{{ project.desc | t }}</p>

            <div class="chips">
              @for (tech of project.stack; track tech) {
                <span class="mono">{{ tech }}</span>
              }
            </div>

            <p class="mono dim tiny">{{ project.meta | t }}</p>

            <p class="links">
              <a [href]="project.url" target="_blank" rel="noopener noreferrer">
                {{ 'projects.source' | t }} <span class="arr">↗</span>
              </a>
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

  /** index of the hovered card (names are not unique, so the index is the identity) */
  protected readonly hovered = signal<number | null>(null);
  private readonly motion = inject(Motion);

  /** the still image, or the animated one while the card is hovered (and animations are on) */
  protected background(project: Project, index: number) {
    const animate = this.hovered() === index && !!project.animation && !this.motion.off();
    return `url(${animate ? project.animation : project.image})`;
  }
}
