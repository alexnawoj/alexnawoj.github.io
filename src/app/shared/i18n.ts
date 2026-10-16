import { afterNextRender, ApplicationRef, inject, Injectable, Pipe, type PipeTransform, signal } from '@angular/core';
import { EN, type Key } from '../i18n/en';
import { PL } from '../i18n/pl';
import { Motion } from './motion';
import { Meta, Title } from '@angular/platform-browser';

export type Lang = 'en' | 'pl';

/** Value of <meta property="og:locale"> for each language. */
const OG_LOCALES: Record<Lang, string> = { en: 'en_US', pl: 'pl_PL' };

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
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    // restore the saved choice, otherwise follow the browser language
    afterNextRender(() => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('lang');
      } catch {}

      // saved choice first, then the browser's language list in order of preference (e.g. pl-PL, en-US)
      const browser = (navigator.languages ?? [navigator.language]).map((l) => l.slice(0, 2));
      const pick = [saved, ...browser].find((l): l is Lang => LANGUAGES.includes(l as Lang));
      this.set(pick ?? 'en'); // detected, not saved: it keeps following the browser until the visitor picks one
    });
  }

  /** Switches to the next language in DICTIONARIES. */
  toggle() {
    const next = LANGUAGES[(LANGUAGES.indexOf(this.lang()) + 1) % LANGUAGES.length];
    const doc = document as ViewTransitionDoc;

    // no View Transitions support, or animations are off: switch instantly
    if (!doc.startViewTransition || this.motion.off()) {
      this.set(next, true);
      return;
    }

    this.addStyle();
    const root = document.documentElement;
    root.classList.add('lang-switching');
    doc
      .startViewTransition(() => {
        this.set(next, true);
        this.appRef.tick(); // render the new texts right now, so the "after" snapshot already has them
      })
      .finished.finally(() => root.classList.remove('lang-switching'));
  }

  translate(key: Key) {
    return DICTIONARIES[this.lang()][key];
  }

  /** For keys that hold a list ("a|b|c"). */
  list(key: Key) {
    return this.translate(key).split('|');
  }

  private addStyle() {
    if (this.styled) return;
    this.styled = true;
    const style = document.createElement('style');
    style.textContent = SWITCH_STYLE;
    document.head.appendChild(style);
  }

  /** Page title, description and social-preview tags follow the language (keys `site.title`, `site.desc`). */
  private updateHead(lang: Lang) {
    const title = this.translate('site.title');
    const desc = this.translate('site.desc');
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[lang] });
    // og:locale:alternate lists every OTHER language
    this.meta.getTags('property="og:locale:alternate"').forEach((tag) => this.meta.removeTagElement(tag));
    LANGUAGES.filter((l) => l !== lang).forEach((l) =>
      this.meta.addTag({ property: 'og:locale:alternate', content: OG_LOCALES[l] })
    );
  }

  private set(lang: Lang, save = false) {
    this.lang.set(lang);
    document.documentElement.lang = lang;
    this.updateHead(lang);
    if (!save) return;
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
