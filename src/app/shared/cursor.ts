import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild, ViewEncapsulation } from '@angular/core';
import { Motion } from './motion';

const INTERACTIVE = 'a[href], button, [role="button"], select, summary, input, textarea'; // only things you can click

/**
 * Custom cursor: a dot with a ring around it. The ring grows over links and buttons,
 * and a click shrinks it and sends out a ripple. Only for mouse / trackpad (not touch).
 * Add <app-cursor /> once, in the root template.
 */
@Component({
  selector: 'app-cursor',
  encapsulation: ViewEncapsulation.None, // it has to hide the native cursor for the whole page
  template: `
    <div #ring class="cur-ring"></div>
    <div #dot class="cur-dot"></div>
  `,
  styles: `
    app-cursor {
      display: contents;
    }

    /* the native cursor is hidden only once the custom one is running (not on touch, not without JS) */
    html.has-cursor,
    html.has-cursor * {
      cursor: none !important;
    }

    .cur-ring,
    .cur-dot,
    .cur-ripple {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      pointer-events: none;
      border-radius: 50%;
    }

    .cur-ring,
    .cur-dot {
      opacity: 0;
      transition: opacity 0.2s;
    }

    .cur-ring.on,
    .cur-dot.on {
      opacity: 1;
    }

    /* dot: follows the pointer exactly */
    .cur-dot {
      width: 6px;
      height: 6px;
      margin: -5px 0 0 -5px;
      background: var(--acc);
      transition:
        opacity 0.2s,
        scale 0.2s,
        width 0.2s,
        height 0.2s,
        margin 0.2s,
        border-radius 0.2s;
    }

    /* ring: chases the pointer (see the animation loop below) */
    .cur-ring {
      width: 30px;
      height: 30px;
      margin: -17px 0 0 -17px;
      border: 1.5px solid var(--acc);
      transition:
        opacity 0.2s,
        scale 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
        background 0.25s;
    }

    /* over links / buttons */
    .cur-ring.hover {
      scale: 1.6;
      background: color-mix(in srgb, var(--acc) 15%, transparent);
    }

    .cur-dot.hover {
      scale: 0.5;
    }

.cur-ring.down {
  opacity: 0;
  transition-duration: 0s;
}

.cur-dot.down {
  scale: 2;
}

/* the ripple sent out on click: starts as an exact copy of the ring */
.cur-ripple {
  width: 30px;
  height: 30px;
  margin: 0;
  translate: -50% -50%; /* centres it on the point, whatever its size */
  border: 1px solid var(--acc);
}
  `,
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

      // Position goes in the `translate` property, not `transform`: the `scale` used for the hover / click
      // states is applied after `translate`, so the element grows around its own centre and stays on the cursor.
      let x = 0;
      let y = 0;
      let ringX = 0;
      let ringY = 0;
      let frame = 0;

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
          ringX = x; // first appearance: no chase from the corner
          ringY = y;
          parts.forEach((p) => p.classList.add('on'));
        }

        dot.style.translate = `${x}px ${y}px`;
        if (!frame) frame = requestAnimationFrame(chase);

        const target = e.target as Element | null;
        parts.forEach((p) => {
          p.classList.toggle('hover', !!target?.closest?.(INTERACTIVE));
        });
      };

      const down = () => {
        parts.forEach((p) => p.classList.add('down'));
        if (!this.motion.off()) this.ripple(ringX, ringY);
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
        { transform: `translate3d(${x}px, ${y}px, 0) scale(2.4)`, opacity: 0 },
      ],
      { duration: 450, easing: 'ease-out' },
    ).finished.then(() => el.remove());
  }
}
