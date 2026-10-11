import { Directive, ElementRef, inject } from '@angular/core';
import { Motion } from './motion';

/**
 * Adds a soft highlight that follows the cursor (styles live in styles.scss under `.glow`).
 * With animations off the highlight stays put in the centre instead of following the mouse.
 */
@Directive({
  selector: '[appGlow]',
  host: {
    class: 'glow',
    '(mouseenter)': 'onEnter()',
    '(mousemove)': 'onMove($event)',
  },
})
export class Glow {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);
  private rect?: DOMRect;
  private measuredAt = 0;
  private frame = 0;

  protected onEnter() {
    if (this.motion.off()) {
      // back to the CSS default (centre) in case it was following the mouse earlier
      this.el.style.removeProperty('--mx');
      this.el.style.removeProperty('--my');
      return;
    }
    this.measure();
  }

  protected onMove(event: MouseEvent) {
    if (this.motion.off() || this.frame) return; // no following when animations are off; one write per frame

    const { clientX, clientY } = event;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      if (this.motion.off()) return; // switched off while waiting for the frame

      // re-measure only now and then (the page may have scrolled) instead of on every event
      if (!this.rect || performance.now() - this.measuredAt > 250) this.measure();
      this.el.style.setProperty('--mx', `${clientX - this.rect!.left}px`);
      this.el.style.setProperty('--my', `${clientY - this.rect!.top}px`);
    });
  }

  private measure() {
    this.rect = this.el.getBoundingClientRect();
    this.measuredAt = performance.now();
  }
}
