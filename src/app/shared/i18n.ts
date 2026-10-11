import { afterNextRender, ApplicationRef, inject, Injectable, Pipe, type PipeTransform, signal } from '@angular/core';
import { EN, type Key } from '../i18n/en';
import { PL } from '../i18n/pl';
import { Motion } from './motion';

export type Lang = 'en' | 'pl';

/** Register new languages here. */
const DICTIONARIES: Record<Lang, Record<Key, string>> = { en: EN, pl: PL };
export const LANGUAGES = Object.keys(DICTIONARIES) as Lang[];

// While a language switch is running the page does a quick, plain cross-fade.
const SWITCH_STYLE = `
  html.lang-switching::view-transition-old(root) { animation: lang-out 0.2s ease-out both; mix-blend-mode: normal; }
  html.lang-switching::view-transition-new(root) { animation: lang-in 0.2s ease-in both; mix-blend-mode: normal; }

  @keyframes lang-out { to { opacity: 0; } }
  @keyframes lang-in { from { opacity: 0; } }
`;

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>('en');
  private readonly motion = inject(Motion);
  private readonly appRef = inject(ApplicationRef);
  private styled = false;

  constructor() {
    // browser only: restore the saved choice, otherwise follow the browser language
    afterNextRender(() => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('lang');
      } catch {}

      const browser = navigator.language.slice(0, 2);
      const pick = [saved, browser].find((l): l is Lang => LANGUAGES.includes(l as Lang));
      this.set(pick ?? 'en');
    });
  }

  /** Switches to the next language in DICTIONARIES. */
  toggle() {
    const next = LANGUAGES[(LANGUAGES.indexOf(this.lang()) + 1) % LANGUAGES.length];
    const doc = document as ViewTransitionDoc;

    // no View Transitions support, or animations are off: switch instantly
    if (!doc.startViewTransition || this.motion.off()) {
      this.set(next);
      return;
    }

    this.addStyle();
    const root = document.documentElement;
    root.classList.add('lang-switching');
    doc
      .startViewTransition(() => {
        this.set(next);
        this.appRef.tick(); // render the new texts right now, so the "after" snapshot already has them
      })
      .finished.finally(() => root.classList.remove('lang-switching'));
  }

  private addStyle() {
    if (this.styled) return;
    this.styled = true;
    const style = document.createElement('style');
    style.textContent = SWITCH_STYLE;
    document.head.appendChild(style);
  }

  translate(key: Key) {
    return DICTIONARIES[this.lang()][key];
  }

  /** For keys that hold a list ("a|b|c"). */
  list(key: Key) {
    return this.translate(key).split('|');
  }

  private set(lang: Lang) {
    this.lang.set(lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }
}

/** {{ 'hero.desc' | t }} — impure on purpose so it follows the language signal. */
@Pipe({ name: 't', pure: false })
export class T implements PipeTransform {
  private readonly i18n = inject(I18n);

  transform(key: Key) {
    return this.i18n.translate(key);
  }
}
