/**
 * English texts: the source of truth. Components only ever use the keys (see `Key`).
 *
 * Adding a text:     add the key here, then to every other language file (TypeScript errors until you do).
 * Adding a language: copy pl.ts to xx.ts, translate it, and register it in shared/i18n.ts (DICTIONARIES).
 * `hero.words` is a list: words separated by `|`.
 */
export const EN = {
  // nav
  'nav.hello': 'Hero',
  'nav.about': 'About me',
  'nav.tech': 'Tech stack',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',

  // ctl
  'ctl.themeLight': 'Switch to light theme',
  'ctl.themeDark': 'Switch to dark theme',
  'ctl.language': 'Switch language',
  'ctl.menuOpen': 'Open menu',
  'ctl.menuClose': 'Close menu',
  'ctl.motionPause': 'Pause animations',
  'ctl.motionPlay': 'Play animations',

  // hero
  'hero.eyebrow': 'HELLO, WORLD',
  'hero.title': 'Building things for',
  'hero.words': 'the web.|the world.|scale.|impact.|fun.|production.|research.|people.|me.|you.',
  'hero.desc': 'I\'m Alex, a full-stack developer who brings thoughtful design and reliable engineering to the same orbit.',
  'hero.cta.work': 'Explore my work',
  'hero.cta.talk': 'Let\'s talk',

  // about
  'about.eyebrow': 'A BIT ABOUT ME',
  'about.title1': 'Curious by nature.',
  'about.title2': 'Builder by choice.',
  'about.p1': 'I love the space where a good idea becomes something people can actually use. I build fast, accessible web products with clean interfaces and even cleaner code.',
  'about.p2': 'From the first sketch to the final deployment, I care about the details: how it feels, how it scales, and how it makes someone\'s day a little easier.',
  'about.offscreen': '✧ Off-screen: coffee, night walks, and one more side project.',

  // tech
  'tech.eyebrow': 'MY TOOLKIT',
  'tech.title': 'Tools I think in.',
  'tech.sub': 'From systems programming to orchestration to inference — the full picture.',
  'tech.tab.all': 'All',
  'tech.tab.languages': 'Languages',
  'tech.tab.frontend': 'Frontend',
  'tech.tab.backend': 'Backend',
  'tech.tab.databases': 'Databases',
  'tech.tab.tools': 'Tools',

  // projects
  'projects.eyebrow': 'SELECTED WORK',
  'projects.title': 'Ideas shipped into the world.',
  'projects.status.progress': 'In progress',
  'projects.status.done': 'Done',
  'projects.status.archived': 'Archived',
  'projects.source': 'Source code',
  'projects.portfolio.kind': 'ANALYTICS PLATFORM',
  'projects.portfolio.desc': 'Making complex data feel simple. A real-time analytics dashboard with a clear view of revenue, customers, and the metrics that matter.',
  'projects.portfolio.meta': 'Frontend development · !Data visualization · Responsive UI',
  'projects.editorial.kind': 'EDITORIAL EXPERIENCE',
  'projects.editorial.desc': 'A quieter corner of the internet. A content-driven travel journal with immersive storytelling, a custom CMS, and a focus on accessibility.',
  'projects.editorial.meta': 'Frontend development · CMS integration · Accessible design',
  'projects.collab.kind': 'COLLABORATION TOOL',
  'projects.collab.desc': 'Less busywork, more momentum. A collaborative project workspace with drag-and-drop boards, live updates, and a little room to breathe.',
  'projects.collab.meta': 'Full-stack development · Real-time sync · Authentication',

  // contact
  'contact.eyebrow': 'LET\'S CONNECT',
  'contact.title1': 'Have something in mind?',
  'contact.title2': 'Let\'s make it happen.',
  'contact.sub': 'Find me around the web, or drop a message below. I read everything.',
  'contact.sent.title': 'Message sent',
  'contact.sent.text': 'Thanks for reaching out — I\'ll get back to you soon.',
  'contact.form.title': 'Send me a message',
  'contact.form.hint': 'A project, a role, or just a good conversation.',
  'contact.form.name': 'NAME',
  'contact.form.message': 'MESSAGE',
  'contact.form.placeholder': 'What are you building?',
  'contact.form.error.name': 'Please tell me your name.',
  'contact.form.error.email': 'That email doesn\'t look right.',
  'contact.form.error.message': 'Brevity is the soul of wit but your message does have to be at least 10 characters long.',
  'contact.form.sending': 'Sending…',
  'contact.form.send': 'Send message',
  'contact.form.fail': 'Something went wrong. Please try again, or email me directly.',
  'contact.footer.built': 'Built with intention. A little stardust, too. ✦',
  'contact.footer.top': 'Back to top ↑',
} as const;

export type Key = keyof typeof EN;
