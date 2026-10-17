import { afterNextRender, DestroyRef, Directive, inject, input } from '@angular/core';
import { injectElement } from './dom';
import { Motion } from './motion';

/**
 * Counts a number up from 0 the first time it scrolls into view:
 * <span [appCountUp]="12">12</span>  (the content is the fallback shown by the server / without animation)
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly appCountUp = input.required<number>();

  private readonly el = injectElement();

  constructor() {
    const motion = inject(Motion);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.off()) return; // the fallback content already shows the final number

      const target = this.appCountUp();
      let frame = 0;

      const run = () => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / 1200, 1);
          this.el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3)))); // ease-out
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      };

      this.el.textContent = '0';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          run();
        },
        { threshold: 0.6 }
      );
      observer.observe(this.el);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
