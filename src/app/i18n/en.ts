export const EN = {

  'site.desc': 'Full-stack developer building fast, accessible web products.',

  // nav
  'nav.hello': 'Hello',
  'nav.about': 'About me',
  'nav.tech': 'Skills',
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
  'hero.title': 'Aleksander Nawój',
  'hero.words': 'full-stack developer|software builder|problem solver|creative thinker',
  'hero.desc': 'I build end-to-end web applications with a focus on clean code, usability, and the details.',
  'hero.cta.work': 'Explore my work',
  'hero.cta.talk': 'Get in touch',
  'hero.status.open': 'Open to internship opportunities',

  // about
  'about.eyebrow': 'A BIT ABOUT ME',
  'about.title1': 'I\'m passionate about creating digital solutions',
  'about.p1': 'I got into software at 13, because I wanted to understand how things work, not just use them. That curiosity dragged me through languages, new technologies, solving bugs at 2am. It still does. To this day, I enjoy turning ideas into working solutions.',
  'about.p2': 'I\'m looking for internship opportunities where I can apply my skills, work on meaningful software, and continue growing as a developer.',
  'about.offscreen': '✧ Off-screen: good book, writing and nature dwelling',
  'about.exp.title': 'EDUCATION',
  'about.exp.present': 'now',
  'about.exp.1': 'Computer Science',
  'about.exp.2': 'Internship',
  'about.exp.3': 'IT Technical Secondary School',

  // skills
  'tech.eyebrow': 'MY SKILLS',
  'tech.title': 'Technologies I master',
  'tech.tab.all': 'All',
  'tech.tab.languages': 'Languages',
  'tech.tab.frontend': 'Frontend',
  'tech.tab.backend': 'Backend',
  'tech.tab.databases': 'Databases',
  'tech.tab.tools': 'Tools',

  // projects
  'projects.eyebrow': 'SELECTED WORK',
  'projects.title': 'Ideas shipped into the world',
  'projects.status.progress': 'In progress',
  'projects.status.maintaining': 'Maintaining',
  'projects.status.archived': 'Archived',
  'projects.source': 'Source code',
  'projects.portfolio.desc': 'My personal portfolio, built with Angular and SCSS. It has a dark and a light theme, English and Polish language switch, preview of my recent projects, a filterable tech grid and a working contact form. Constantly improving on accessibility, efficiency and user-friendliness.',
  'projects.asteroid-sim.desc': 'Desktop application for simulating the impact of an asteroid at a selected location on Earth at set parameters. The simulation combines a fourth-order Runge-Kutta numerical integration method with an impact-crater scaling model based on Holsapple (1993).',
  'projects.yal.desc': 'Android launcher app that allows user to customize about anything – from list of apps\' appearance through behavior on swipes to widget properties. Bundled with ability to import or export settings to convenient JSON.',
  'projects.qm.desc': 'A full-stack email client for managing multiple email accounts from a single interface. Features include email composition and organization, attachment handling, dynamic search, contact management, and customizable themes. Supports IMAP/POP accounts.',

  // contact
  'contact.eyebrow': 'LET\'S CONNECT',
  'contact.title1': 'Have something in mind?',
  'contact.title2': 'Let\'s make it happen.',
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
  'contact.footer.built': 'Built with ❤︎ and Credits',
  'contact.footer.top': 'Back to top ↑'
} as const;

export type Key = keyof typeof EN;
