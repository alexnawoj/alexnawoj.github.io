import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { injectElement } from '../../shared/dom';
import { I18n, T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { ScrollTo } from '../../shared/scroll-to';
import { Theme } from '../../shared/theme';
import { SECTIONS } from './side.data';

/** A section counts as reached when its top is this close (px) to the top of the screen. */
const READING_LINE = 40;

@Component({
  selector: 'app-side',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollTo, T],
  styleUrl: './side.scss',
  templateUrl: 'side.html',
  host: { '(document:keydown.escape)': 'setMenu(false)' }
})
export class SideComponent {
  protected readonly sections = SECTIONS;
  protected readonly active = signal<string>(SECTIONS[0].id);
  protected readonly activeIndex = computed(() => SECTIONS.findIndex((s) => s.id === this.active()));
  protected readonly menuOpen = signal(false);
  protected readonly theme = inject(Theme);
  protected readonly i18n = inject(I18n);
  protected readonly motion = inject(Motion);

  private readonly host = injectElement();
  private readonly marker = viewChild.required<ElementRef<HTMLElement>>('marker');
  private readonly fill = viewChild.required<ElementRef<HTMLElement>>('fill');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const marker = this.marker().nativeElement;
      const fill = this.fill().nativeElement;
      const sections = SECTIONS.map((s) => document.getElementById(s.id)!);
      const last = SECTIONS.length - 1;
      let step = 0; // distance between two dots, measured from the layout
      let shown = -1;
      let frame = 0;

      const measure = () => {
        const links = this.host.querySelectorAll<HTMLElement>('nav a');
        step = links.length > 1 ? links[1].offsetTop - links[0].offsetTop : 0; // 0 while the list is hidden (phones)
      };

      /**
       * Where you are, as one number: 2 = the third section has reached the top of the screen,
       * 2.5 = you are halfway through it. A section counts as reached once its top is within
       * READING_LINE of the top of the screen, which is also where a click on the nav puts it.
       */
      const position = () => {
        for (let i = last; i >= 0; i--) {
          const { top, height } = sections[i].getBoundingClientRect();
          if (top <= READING_LINE) return Math.min(i + Math.min(Math.max(-top / height, 0), 1), last);
        }
        return 0;
      };

      const update = () => {
        frame = 0;
        const p = position();
        if (p === shown) return;
        shown = p;

        marker.style.translate = `0 ${p * step}px`;
        fill.style.scale = `1 ${p / last}`;
        this.active.set(SECTIONS[Math.floor(p)].id);
      };

      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update); // at most one update per frame
      };
      const onResize = () => {
        measure();
        shown = -1;
        schedule();
      };

      measure();
      update();
      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', onResize);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        removeEventListener('scroll', schedule);
        removeEventListener('resize', onResize);
        document.body.style.overflow = '';
      });
    });
  }

  protected setMenu(open: boolean) {
    this.menuOpen.set(open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
}
