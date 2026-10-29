import type { Key } from './en';

/** Polish. Typed so that a missing key is a compile error. */
export const PL: Record<Key, string> = {

  'site.desc': 'Programista full-stack tworzący szybkie, dostępne produkty webowe.',

  // nav
  'nav.hello': 'Intro',
  'nav.about': 'O mnie',
  'nav.tech': 'Technologie',
  'nav.projects': 'Projekty',
  'nav.contact': 'Kontakt',

  // ctl
  'ctl.themeLight': 'Przełącz na jasny motyw',
  'ctl.themeDark': 'Przełącz na ciemny motyw',
  'ctl.language': 'Zmień język',
  'ctl.menuOpen': 'Otwórz menu',
  'ctl.menuClose': 'Zamknij menu',
  'ctl.motionPause': 'Wstrzymaj animacje',
  'ctl.motionPlay': 'Włącz animacje',

  // hero
  'hero.eyebrow': 'HELLO, WORLD',
  'hero.title': 'Aleksander Nawój',
  'hero.words': 'programista full-stack|pasjonat technologii|analityczny umysł|kreatywny z natury',
  'hero.desc': 'Tworzę aplikacje webowe od pomysłu po gotowe rozwiązanie, dbając o jakość kodu, wygodę użytkownika oraz detale.',
  'hero.cta.work': 'Zobacz moje projekty',
  'hero.cta.talk': 'Porozmawiajmy',
  'hero.status.open': 'Szukam praktyk',

  // about
  'about.eyebrow': 'TROCHĘ O MNIE',
  'about.title1': 'Poza kodem i składnią',
  'about.p1': 'Zacząłem programować w wieku 13 lat, gdyż chciałem rozumieć, jak działają różne rzeczy - nie tylko z nich korzystać. Ta ciekawość przeprowadziła mnie przez kolejne języki programowania, nowe technologie i debugowanie błędów do 2 w nocy. I prowadzi mnie po dzisiaj. Nadal uwielbiam zamieniać pomysły w gotowe rozwiązania.',
  'about.p2': 'Szukam możliwości odbycia praktyk, podczas których będę mógł wykorzystać swoje umiejętności, pracować nad wartościowymi projektami i rozwijać się jako programista.',
  'about.offscreen': '✧ Poza ekranem: dobra książka, pisarstwo oraz przebywanie z naturą',
  'about.exp.title': 'EDUKACJA',
  'about.exp.present': 'obecnie',
  'about.exp.1': 'Informatyka',
  'about.exp.2': 'Praktyki',
  'about.exp.3': 'Technikum informatyczne',

  // tech
  'tech.eyebrow': 'MOJE NARZĘDZIA',
  'tech.title': 'Technologie, z którymi pracuję',
  'tech.tab.all': 'Wszystko',
  'tech.tab.languages': 'Języki',
  'tech.tab.frontend': 'Frontend',
  'tech.tab.backend': 'Backend',
  'tech.tab.databases': 'Bazy danych',
  'tech.tab.tools': 'Narzędzia',

  // projects
  'projects.eyebrow': 'WYBRANE PROJEKTY',
  'projects.title': 'Pomysły wypuszczone w świat.',
  'projects.status.progress': 'W trakcie',
  'projects.status.maintaining': 'Ukończony',
  'projects.status.archived': 'Zarchiwizowany',
  'projects.source': 'Kod źródłowy',
  'projects.portfolio.desc': 'Moje portfolio stworzone w Angularze i SCSS. Oferuje jasny i ciemny motyw, przełączanie między językiem polskim i angielskim, podgląd najnowszych projektów, filtrowaną listę technologii oraz działający formularz kontaktowy. Projekt stale rozwijam, dbając o dostępność, wydajność i wygodę użytkowania.',
  'projects.asteroid-sim.desc': 'Aplikacja desktopowa do symulacji skutków uderzenia asteroidy w wybranym miejscu na Ziemi, przy zadanych parametrach. Wykorzystuje metodę numerycznego całkowania Rungego-Kutty czwartego rzędu oraz model szacowania rozmiaru krateru uderzeniowego oparty na pracy Holsapple’a z 1993 roku.',
  'projects.yal.desc': 'Launcher na Androida, który pozwala dostosować niemal każdy aspekt interfejsu – od wyglądu listy aplikacji, przez reakcje na gesty przesunięcia, aż po ustawienia widżetów. Umożliwia również wygodny import i eksport konfiguracji w formacie JSON.',
  'projects.qm.desc': 'Klient poczty e-mail typu full-stack, który pozwala zarządzać wieloma kontami z poziomu jednego interfejsu. Oferuje tworzenie i porządkowanie wiadomości, obsługę załączników, dynamiczne wyszukiwanie, zarządzanie kontaktami oraz personalizację motywów. Obsługuje konta korzystające z protokołów IMAP i POP.',

  // contact
  'contact.eyebrow': 'NAWIĄŻMY KONTAKT',
  'contact.title1': 'Masz coś na myśli?',
  'contact.title2': 'Zróbmy to razem.',
  'contact.sent.title': 'Wiadomość wysłana',
  'contact.sent.text': 'Dziękuję za kontakt — odezwę się wkrótce.',
  'contact.form.title': 'Napisz do mnie',
  'contact.form.hint': 'Projekt, rola albo po prostu dobra rozmowa.',
  'contact.form.name': 'IMIĘ',
  'contact.form.message': 'WIADOMOŚĆ',
  'contact.form.placeholder': 'Co budujesz?',
  'contact.form.error.name': 'Podaj proszę swoje imię.',
  'contact.form.error.email': 'Ten adres email wygląda nieprawidłowo.',
  'contact.form.error.message': 'Wiadomość musi mieć co najmniej 10 znaków.',
  'contact.form.sending': 'Wysyłanie…',
  'contact.form.send': 'Wyślij wiadomość',
  'contact.form.fail': 'Coś poszło nie tak. Spróbuj ponownie lub napisz do mnie bezpośrednio.',
  'contact.footer.built': 'Built with ❤︎ and Credits',
  'contact.footer.top': 'Do góry ↑',
};
