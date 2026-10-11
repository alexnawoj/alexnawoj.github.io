import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { I18n, T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { Music } from '../../shared/music';
import { ScrollTo } from '../../shared/scroll-to';
import { Theme } from '../../shared/theme';

const SECTIONS = [
  { id: 'hello', label: 'nav.hello' },
  { id: 'about', label: 'nav.about' },
  { id: 'tech', label: 'nav.tech' },
  { id: 'projects', label: 'nav.projects' },
  { id: 'contact', label: 'nav.contact' },
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
          [attr.aria-label]="(menuOpen() ? 'ctl.menuClose' : 'ctl.menuOpen') | t"
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
          [attr.aria-label]="(theme.mode() === 'dark' ? 'ctl.themeLight' : 'ctl.themeDark') | t"
          [title]="(theme.mode() === 'dark' ? 'ctl.themeLight' : 'ctl.themeDark') | t"
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
          [attr.aria-label]="'ctl.language' | t"
          [title]="'ctl.language' | t"
        >
          {{ i18n.lang().toUpperCase() }}
        </button>

        <button
          type="button"
          class="round"
          (click)="motion.toggle()"
          [attr.aria-pressed]="motion.off()"
          [attr.aria-label]="(motion.off() ? 'ctl.motionPlay' : 'ctl.motionPause') | t"
          [title]="(motion.off() ? 'ctl.motionPlay' : 'ctl.motionPause') | t"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            @if (motion.off()) {
              <path d="M8 5v14l11-7z" />
            } @else {
              <path d="M9 5v14M15 5v14" />
            }
          </svg>
        </button>

        <button
          type="button"
          class="round"
          (click)="music.toggle()"
          [attr.aria-pressed]="music.playing()"
          [attr.aria-label]="(music.playing() ? 'ctl.musicStop' : 'ctl.musicPlay') | t"
          [title]="(music.playing() ? 'ctl.musicStop' : 'ctl.musicPlay') | t"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            @if (music.playing()) {
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            } @else {
              <path d="M22 9l-6 6M16 9l6 6" />
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
  protected readonly music = inject(Music);

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
