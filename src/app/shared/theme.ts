import { afterNextRender, inject, Injectable, signal } from '@angular/core';
import { Motion } from './motion';

export type Mode = 'dark' | 'light';

const VT_STYLE = `
  /* the new theme is revealed by a growing circle; the browser's default cross-fade is switched off */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
  ::view-transition-old(root) { z-index: 1; }
  ::view-transition-new(root) { z-index: 2; }

  /* no colour transitions while the snapshot is taken */
  html.theme-switching *,
  html.theme-switching *::before,
  html.theme-switching *::after {
    transition: none !important;
  }
`;

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly mode = signal<Mode>('dark');
  private readonly motion = inject(Motion);
  private styled = false;
  private lastPointer?: { x: number; y: number; at: number };

  constructor() {
    afterNextRender(() => {
      // index.html already applied the saved theme before first paint; just sync the signal
      this.mode.set(document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');

      // remember where the last click happened, so the circle starts there even if the caller passes no event
      addEventListener(
        'pointerdown',
        (e) => (this.lastPointer = { x: e.clientX, y: e.clientY, at: performance.now() }),
        { capture: true, passive: true },
      );
    });
  }

  /** The circle grows from the clicked button (or from the last click / focused element if no event is passed). */
  toggle(event?: MouseEvent) {
    const next: Mode = this.mode() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      this.mode.set(next);
      document.documentElement.dataset['theme'] = next;
      try {
        localStorage.setItem('theme', next);
      } catch {}
    };

    const doc = document as ViewTransitionDoc;

    // no View Transitions support, or animations are off: just switch
    if (!doc.startViewTransition || this.motion.off()) {
      apply();
      return;
    }

    this.addStyle();
    const root = document.documentElement;
    const { x, y } = this.origin(event);
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)); // reaches the farthest corner

    root.classList.add('theme-switching');
    const transition = doc.startViewTransition(apply);

    transition.ready.then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    );
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }

  private origin(event?: MouseEvent) {
    const target = (event?.currentTarget ?? document.activeElement) as HTMLElement | null;
    const recent = this.lastPointer && performance.now() - this.lastPointer.at < 1000;

    if (event?.currentTarget || !recent) {
      const rect = target?.getBoundingClientRect();
      if (rect && rect.width > 0) return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      if (!recent) return { x: innerWidth / 2, y: innerHeight / 2 };
    }
    return { x: this.lastPointer!.x, y: this.lastPointer!.y };
  }

  private addStyle() {
    if (this.styled) return;
    this.styled = true;
    const style = document.createElement('style');
    style.textContent = VT_STYLE;
    document.head.appendChild(style);
  }
}
