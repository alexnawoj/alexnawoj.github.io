import { afterNextRender, Injectable, signal } from '@angular/core';

/**
 * "Animations off" switch. It sets data-motion="off" on <html> (styles.scss then disables every
 * CSS animation and transition) and the components that animate with JavaScript read `off()`.
 * First visit: follows the OS "reduce motion" setting (index.html applies it before first paint).
 */
@Injectable({ providedIn: 'root' })
export class Motion {
  readonly off = signal(false);

  constructor() {
    afterNextRender(() => this.off.set(document.documentElement.dataset['motion'] === 'off'));
  }

  toggle() {
    const next = !this.off();
    this.off.set(next);
    document.documentElement.dataset['motion'] = next ? 'off' : 'on';
    try {
      localStorage.setItem('motion', next ? 'off' : 'on');
    } catch {}
  }
}
