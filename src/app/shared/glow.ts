import { afterNextRender, DestroyRef, Directive, inject } from '@angular/core';
import { injectElement } from './dom';
import { Motion } from './motion';

/**
 * Soft highlight that follows the cursor (the look is the `.glow` class in styles.scss).
 * Plain DOM listeners on purpose: Angular listeners would start a change-detection run on every mouse move.
 * With animations off the highlight stays in the centre.
 */
@Directive({
  selector: '[appGlow]',
  host: { class: 'glow' }
})
export class Glow {
  constructor() {
    const el = injectElement();
    const motion = inject(Motion);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let rect: DOMRect;
      let frame = 0;
      let x = 0;
      let y = 0;

      const enter = () => {
        rect = el.getBoundingClientRect();
        if (motion.off()) {
          el.style.removeProperty('--mx');
          el.style.removeProperty('--my');
        }
      };

      const paint = () => {
        frame = 0;
        el.style.setProperty('--mx', `${x - rect.left}px`);
        el.style.setProperty('--my', `${y - rect.top}px`);
      };

      const move = (e: MouseEvent) => {
        if (motion.off()) return;
        x = e.clientX;
        y = e.clientY;
        if (!frame) frame = requestAnimationFrame(paint); // one style write per frame
      };

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mousemove', move, { passive: true });
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mousemove', move);
      });
    });
  }
}
