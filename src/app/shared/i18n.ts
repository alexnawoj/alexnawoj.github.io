import { afterNextRender, inject, Injectable, Pipe, type PipeTransform, signal } from '@angular/core';

export type Lang = 'en' | 'pl';

/** English text is the key. Anything missing here simply stays in English. */
const PL: Record<string, string> = {
  // navigation
  Hello: 'Cześć',
  'About me': 'O mnie',
  'Tech stack': 'Technologie',
  Projects: 'Projekty',
  Contact: 'Kontakt',
  'Switch to light theme': 'Przełącz na jasny motyw',
  'Switch to dark theme': 'Przełącz na ciemny motyw',
  'Switch language': 'Zmień język',
  'Open menu': 'Otwórz menu',
  'Close menu': 'Zamknij menu',
  'Pause animations': 'Wstrzymaj animacje',
  'Play animations': 'Włącz animacje',

  // hello
  'HELLO, WORLD': 'CZEŚĆ, ŚWIECIE',
  'Building things for': 'Tworzę rzeczy dla',
  "I'm Alex, a full-stack developer who brings thoughtful design and reliable engineering to the same orbit.":
    'Jestem Alex, programista full-stack, który łączy przemyślany design z niezawodną inżynierią.',
  'Explore my work': 'Zobacz moje prace',
  "Let's talk": 'Porozmawiajmy',

  // about
  'A BIT ABOUT ME': 'TROCHĘ O MNIE',
  'Curious by nature.': 'Ciekawy z natury.',
  'Builder by choice.': 'Budowniczy z wyboru.',
  'I love the space where a good idea becomes something people can actually use. I build fast, accessible web products with clean interfaces and even cleaner code.':
    'Uwielbiam moment, w którym dobry pomysł staje się czymś, z czego ludzie naprawdę korzystają. Tworzę szybkie, dostępne produkty webowe z czystym interfejsem i jeszcze czystszym kodem.',
  "From the first sketch to the final deployment, I care about the details: how it feels, how it scales, and how it makes someone's day a little easier.":
    'Od pierwszego szkicu po finalne wdrożenie dbam o szczegóły: jak to się czuje, jak się skaluje i jak ułatwia komuś dzień.',
  '✧ Off-screen: coffee, night walks, and one more side project.':
    '✧ Poza ekranem: kawa, nocne spacery i jeszcze jeden projekt poboczny.',

  // tech
  'MY TOOLKIT': 'MOJE NARZĘDZIA',
  'Tools I think in.': 'Narzędzia, w których myślę.',
  'From systems programming to orchestration to inference — the full picture.':
    'Od programowania systemowego, przez orkiestrację, po wnioskowanie — pełny obraz.',
  All: 'Wszystko',
  Languages: 'Języki',
  Databases: 'Bazy danych',
  Tools: 'Narzędzia',

  // projects
  'SELECTED WORK': 'WYBRANE PRACE',
  'Ideas shipped into the world.': 'Pomysły wypuszczone w świat.',
  'In progress': 'W trakcie',
  Done: 'Ukończony',
  Archived: 'Zarchiwizowany',
  'Source code': 'Kod źródłowy',

  // contact
  "LET'S CONNECT": 'NAWIĄŻMY KONTAKT',
  'Have something in mind?': 'Masz coś na myśli?',
  "Let's make it happen.": 'Zróbmy to razem.',
  'Find me around the web, or drop a message below. I read everything.':
    'Znajdź mnie w sieci lub napisz wiadomość poniżej. Czytam wszystko.',
  'Message sent': 'Wiadomość wysłana',
  "Thanks for reaching out — I'll get back to you soon.": 'Dziękuję za kontakt — odezwę się wkrótce.',
  'Send me a message': 'Napisz do mnie',
  'A project, a role, or just a good conversation.': 'Projekt, rola albo po prostu dobra rozmowa.',
  NAME: 'IMIĘ',
  MESSAGE: 'WIADOMOŚĆ',
  'Please tell me your name.': 'Podaj proszę swoje imię.',
  "That email doesn't look right.": 'Ten adres email wygląda nieprawidłowo.',
  'Brevity is the soul of wit but your message does have to be at least 10 characters long.':
    'Zwięzłość jest duszą dowcipu, ale wiadomość musi mieć co najmniej 10 znaków.',
  'What are you building?': 'Co budujesz?',
  'Sending…': 'Wysyłanie…',
  'Send message': 'Wyślij wiadomość',
  'Something went wrong. Please try again, or email me directly.':
    'Coś poszło nie tak. Spróbuj ponownie lub napisz do mnie bezpośrednio.',
  'Built with intention. A little stardust, too. ✦': 'Zbudowane z namysłem. Z odrobiną gwiezdnego pyłu. ✦',
  'Back to top ↑': 'Do góry ↑',
};

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
      this.set(saved === 'pl' || saved === 'en' ? saved : navigator.language.startsWith('pl') ? 'pl' : 'en');
    });
  }

  toggle() {
    this.set(this.lang() === 'en' ? 'pl' : 'en');
  }

  private set(lang: Lang) {
    this.lang.set(lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }

  translate(text: string) {
    return this.lang() === 'pl' ? (PL[text] ?? text) : text;
  }
}

/** {{ 'English text' | t }} — impure on purpose so it follows the language signal. */
@Pipe({ name: 't', pure: false })
export class T implements PipeTransform {
  private readonly i18n = inject(I18n);

  transform(text: string) {
    return this.i18n.translate(text);
  }
}
