import { Directive, ElementRef, inject } from '@angular/core';

/** Adds a soft highlight that follows the cursor (styles live in styles.scss under `.glow`). */
@Directive({
  selector: '[appGlow]',
  host: {
    class: 'glow',
    '(mouseenter)': 'measure()',
    '(mousemove)': 'onMove($event)',
  },
})
export class Glow {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private rect?: DOMRect;
  private measuredAt = 0;
  private frame = 0;

  protected measure() {
    this.rect = this.el.getBoundingClientRect();
    this.measuredAt = performance.now();
  }

  protected onMove(event: MouseEvent) {
    if (this.frame) return; // at most one style write per frame

    const { clientX, clientY } = event;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      // re-measure only now and then (the page may have scrolled) instead of on every event
      if (!this.rect || performance.now() - this.measuredAt > 250) this.measure();
      this.el.style.setProperty('--mx', `${clientX - this.rect!.left}px`);
      this.el.style.setProperty('--my', `${clientY - this.rect!.top}px`);
    });
  }
}
