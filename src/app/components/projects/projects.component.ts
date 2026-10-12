import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { type Project, PROJECTS, STATUS_LABELS } from './projects.data';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Glow, T],
  styleUrl: './projects.scss',
  templateUrl: 'projects.html'
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
