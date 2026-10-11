import { Component, computed, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { Filter, TABS, SKILLS } from './tech.data'

@Component({
  selector: 'app-tech',
  imports: [Glow, T],
  styleUrl: 'tech.scss',
  template: `
    <section id="tech" class="sec">
      <p class="eyebrow"><b>03</b><u></u>{{ 'tech.eyebrow' | t }}</p>

      <h2>{{ 'tech.title' | t }}</h2>
      <p class="sub">{{ 'tech.sub' | t }}</p>

      <div class="tabs" role="group" aria-label="Filter tools by category">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            class="tab"
            [class.on]="active() === tab.id"
            [attr.aria-pressed]="active() === tab.id"
            (click)="active.set(tab.id)"
          >
            {{ tab.label | t }}
            <small class="mono">{{ tab.count }}</small>
          </button>
        }
      </div>

      <div class="grid">
        @for (item of visible(); track item.id; let i = $index) {
          <div class="tile" appGlow [style.--i]="i">
            <img [src]="item.skill.icon" [class.light]="item.skill.light" alt="" loading="lazy" />
            <span class="mono">{{ item.skill.name }}</span>
          </div>
        }
      </div>
    </section>
  `,
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
