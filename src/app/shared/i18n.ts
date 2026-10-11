import { afterNextRender, inject, Injectable, Pipe, type PipeTransform, signal } from '@angular/core';
import { EN, type Key } from '../i18n/en';
import { PL } from '../i18n/pl';

export type Lang = 'en' | 'pl';

/** Register new languages here. */
const DICTIONARIES: Record<Lang, Record<Key, string>> = { en: EN, pl: PL };
export const LANGUAGES = Object.keys(DICTIONARIES) as Lang[];

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>('en');

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
    this.set(LANGUAGES[(LANGUAGES.indexOf(this.lang()) + 1) % LANGUAGES.length]);
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
