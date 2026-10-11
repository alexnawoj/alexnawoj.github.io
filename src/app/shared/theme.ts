import { afterNextRender, Injectable, signal } from '@angular/core';

export type Mode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly mode = signal<Mode>('dark');

  constructor() {
    // index.html already applied the saved theme before first paint; just sync the signal
    afterNextRender(() => {
      this.mode.set(document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');
    });
  }

  toggle() {
    const next: Mode = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(next);
    document.documentElement.dataset['theme'] = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }
}
