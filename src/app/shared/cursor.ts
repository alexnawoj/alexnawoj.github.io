import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { Motion } from './motion';

const HIDDEN = '[data-cursor="hidden"]';
const INTERACTIVE = 'a[href], button, [role="button"], select, summary, input, textarea';

@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div #ring class="cur-ring"></div>
    <div #dot class="cur-dot"></div>
  `,
  styleUrl: 'cursor.scss'
})
export class Cursor {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);
  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly dot = viewChild.required<ElementRef<HTMLElement>>('dot');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // touch screens have no pointer to draw
      if (!matchMedia('(pointer: fine)').matches) return;

      const root = document.documentElement;
      const ring = this.ring().nativeElement;
      const dot = this.dot().nativeElement;
      const parts = [ring, dot];

      // position goes in `translate` (not `transform`), so the `scale` of the hover / click states grows around the centre
      let x = 0;
      let y = 0;
      let ringX = 0;
      let ringY = 0;
      let frame = 0;
      let hiding = false;
      let lastTarget: EventTarget | null = null;

      // the ring eases towards the pointer a bit every frame; the loop stops once it has caught up
      const chase = () => {
        const speed = this.motion.off() ? 1 : 0.1;
        ringX += (x - ringX) * speed;
        ringY += (y - ringY) * speed;
        ring.style.translate = `${ringX}px ${ringY}px`;

        const caughtUp = Math.abs(x - ringX) < 0.1 && Math.abs(y - ringY) < 0.1;
        frame = caughtUp ? 0 : requestAnimationFrame(chase);
      };

      const move = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        x = e.clientX;
        y = e.clientY;

        if (!root.classList.contains('has-cursor')) {
          root.classList.add('has-cursor');
          ringX = x;
          ringY = y;
          parts.forEach((p) => p.classList.add('on'));
        }

        dot.style.translate = `${x}px ${y}px`;
        if (!frame) frame = requestAnimationFrame(chase);

        if (e.target === lastTarget) return; // still over the same element: nothing to update
        lastTarget = e.target;

        const target = e.target as Element | null;
        hiding = !!target?.closest?.(HIDDEN);
        parts.forEach((p) => {
          p.classList.toggle('hover', !!target?.closest?.(INTERACTIVE));
          p.classList.toggle('gone', hiding);
        });
      };

      const down = () => {
        parts.forEach((p) => p.classList.add('down'));
        if (!this.motion.off() && !hiding) this.ripple(ringX, ringY);
      };
      const up = () => parts.forEach((p) => p.classList.remove('down'));
      const leave = () => parts.forEach((p) => p.classList.remove('on'));
      const enter = () => root.classList.contains('has-cursor') && parts.forEach((p) => p.classList.add('on'));

      addEventListener('pointermove', move, { passive: true });
      addEventListener('pointerdown', down, { passive: true });
      addEventListener('pointerup', up, { passive: true });
      root.addEventListener('pointerleave', leave);
      root.addEventListener('pointerenter', enter);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        root.classList.remove('has-cursor');
        removeEventListener('pointermove', move);
        removeEventListener('pointerdown', down);
        removeEventListener('pointerup', up);
        root.removeEventListener('pointerleave', leave);
        root.removeEventListener('pointerenter', enter);
      });
    });
  }

  private ripple(x: number, y: number) {
    const el = document.createElement('div');
    el.className = 'cur-ripple';
    this.host.appendChild(el);

    el.animate(
      [
        { transform: `translate3d(${x}px, ${y}px, 0) scale(1)`, opacity: 0.9 },
        { transform: `translate3d(${x}px, ${y}px, 0) scale(2.4)`, opacity: 0 }
      ],
      { duration: 450, easing: 'ease-out' }
    ).finished.then(() => el.remove());
  }
}
