import { Component, computed, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { Category, Filter, TABS, SKILLS } from './tech.data'

@Component({
  selector: 'app-tech',
  imports: [Glow, T],
  styleUrl: 'tech.scss',
  template: `
    <section id="tech" class="sec">
      <p class="eyebrow"><b>03</b><u></u>{{ 'MY TOOLKIT' | t }}</p>

      <h2>{{ 'Tools I think in.' | t }}</h2>
      <p class="sub">{{ 'From systems programming to orchestration to inference — the full picture.' | t }}</p>

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
export class TechComponent {
  protected readonly tabs = TABS;
  protected readonly total = SKILLS.length;
  protected readonly active = signal<Filter>('all');

  protected readonly visible = computed(() => {
    const filter = this.active();
    return filter === 'all' ? SKILLS : SKILLS.filter((s) => s.category === filter);
  });
}
