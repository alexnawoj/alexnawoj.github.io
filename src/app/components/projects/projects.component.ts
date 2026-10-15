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

  /** true while the animated preview is playing: the card is hovered / held, has an animation, and animations are on */
  protected isPlaying(project: Project, index: number) {
    return this.hovered() === index && !!project.animation && !this.motion.off();
  }

  /** the still image, or the animated one while it is playing */
  protected background(project: Project, index: number) {
    return `url(${this.isPlaying(project, index) ? project.animation : project.image})`;
  }
}
