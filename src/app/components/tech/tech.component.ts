import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { type Filter, SKILLS, TABS } from './tech.data';

@Component({
  selector: 'app-tech',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Glow, T],
  styleUrl: 'tech.scss',
  templateUrl: 'tech.html'
})
export class TechComponent {
  protected readonly tabs = TABS;
  protected readonly total = SKILLS.length;
  protected readonly active = signal<Filter>('all');

  protected readonly visible = computed(() => {
    const filter = this.active();
    const skills = filter === 'all' ? SKILLS : SKILLS.filter((s) => s.category === filter);
    return skills.map((skill) => ({ id: `${filter}:${skill.name}`, skill }));
  });
}
