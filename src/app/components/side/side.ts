import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { I18n, T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { ScrollTo } from '../../shared/scroll-to';
import { Theme } from '../../shared/theme';

const SECTIONS = [
  { id: 'hello', label: 'Hello' },
  { id: 'about', label: 'About me' },
  { id: 'tech', label: 'Tech stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

@Component({
  selector: 'app-side',
  imports: [ScrollTo, T],
  styleUrl: './side.scss',
  host: { '(document:keydown.escape)': 'setMenu(false)' },
  template: `
    <aside class="side">
      <!-- desktop: section list -->
      <nav aria-label="Sections">
        <ul>
          @for (section of sections; track section.id) {
            <li [class.active]="active() === section.id">
              <a [href]="'#' + section.id" [appScrollTo]="section.id">
                <span class="dot"></span>
                {{ section.label | t }}
              </a>
            </li>
          }
        </ul>
      </nav>

      <!-- phones: full-screen menu -->
      <div class="overlay" id="mobile-menu" [class.open]="menuOpen()" [attr.inert]="menuOpen() ? null : ''">
        <ul>
          @for (section of sections; track section.id; let i = $index) {
            <li [class.active]="active() === section.id" [style.--i]="i">
              <a [href]="'#' + section.id" [appScrollTo]="section.id" (click)="setMenu(false)">
                <span class="num mono">0{{ i + 1 }}</span>
                {{ section.label | t }}
              </a>
            </li>
          }
        </ul>
      </div>

      <div class="tools">
        <button
          type="button"
          class="round menu"
          aria-controls="mobile-menu"
          [attr.aria-expanded]="menuOpen()"
          [attr.aria-label]="(menuOpen() ? 'Close menu' : 'Open menu') | t"
          (click)="setMenu(!menuOpen())"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            @if (menuOpen()) {
              <path d="M6 6l12 12M18 6L6 18" />
            } @else {
              <path d="M4 7h16M4 12h16M4 17h16" />
            }
          </svg>
        </button>

        <button
          type="button"
          class="round"
          (click)="theme.toggle()"
          [attr.aria-label]="(theme.mode() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme') | t"
          [title]="(theme.mode() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme') | t"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            @if (theme.mode() === 'dark') {
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            } @else {
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            }
          </svg>
        </button>

        <button
          type="button"
          class="round"
          (click)="i18n.toggle()"
          [attr.aria-label]="'Switch language' | t"
          [title]="'Switch language' | t"
        >
          {{ i18n.lang() === 'pl' ? 'PL' : 'EN' }}
        </button>

        <button
          type="button"
          class="round"
          (click)="motion.toggle()"
          [attr.aria-pressed]="motion.off()"
          [attr.aria-label]="(motion.off() ? 'Play animations' : 'Pause animations') | t"
          [title]="(motion.off() ? 'Play animations' : 'Pause animations') | t"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            @if (motion.off()) {
              <path d="M8 5v14l11-7z" />
            } @else {
              <path d="M9 5v14M15 5v14" />
            }
          </svg>
        </button>
      </div>
    </aside>
  `,
})
export class Side {
  protected readonly sections = SECTIONS;
  protected readonly active = signal<string>(SECTIONS[0].id);
  protected readonly menuOpen = signal(false);
  protected readonly theme = inject(Theme);
  protected readonly i18n = inject(I18n);
  protected readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // a section becomes active when it crosses the middle of the viewport
      const observer = new IntersectionObserver(
        (entries) => entries.filter((e) => e.isIntersecting).forEach((e) => this.active.set(e.target.id)),
        { rootMargin: '-45% 0px -50% 0px' },
      );

      document.querySelectorAll('section.sec').forEach((el) => observer.observe(el));
      destroyRef.onDestroy(() => {
        observer.disconnect();
        document.body.style.overflow = '';
      });
    });
  }

  protected setMenu(open: boolean) {
    this.menuOpen.set(open);
    document.body.style.overflow = open ? 'hidden' : ''; // no page scrolling behind the menu
  }
}
