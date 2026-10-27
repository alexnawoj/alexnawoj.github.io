# Portfolio

My personal portfolio, built with Angular and SCSS. It has a dark and a light theme, English and Polish language switch, preview of my recent projects, a filterable tech grid and a working contact form. Constantly improving on accessibility, efficiency and user-friendliness.

<br />

### Features

- 🌗 **Two themes:** dark and light, remembered between visits,
- 🌍 **Two languages:** English and Polish, picked from the browser language and switchable at any time, with the page title and social-preview tags following along,
- 🧩 **Sections:** hero with a typing effect, about with animated counters and an experience timeline, a filterable tech grid, project cards with animated previews, and a contact section,
- 🧭 **Navigation:** a sidebar with scroll progress on desktop and a full-screen menu on phones,
- ✨ **Extras:** a custom cursor, a starry canvas background, cursor-follow glow on cards and optional background music (off until clicked),
- ♿ **Responsive and accessible:** a switch turns off all animations, adjusted for both mobile and desktop and components use ARIA labels.

<br />

### Tech stack

- [Angular](https://angular.dev) 22 (standalone components, signals, `OnPush`)
- TypeScript 6
- SCSS with shared mixins and design tokens
- [Formspree](https://formspree.io) for the contact form

<br />

### Requirements

- Node.js `^22.22.0`, `^24.13.1` or `^26.0.0`
- npm (comes with Node.js)

<br />

### Getting started

1. Clone the ropsitory
```bash
git clone https://github.com/alexnawoj/alexnawoj.github.io.git
```

```bash
cd alexnawoj.github.io/
```

2. Install dependencies
```bash
npm install
```

3. Start the dev server
```bash
npm start
```

<br />

### Project structure

```
src/
├── app/
│   ├── components/   # one folder per section: hero, about, tech, projects, contact, side, sky
│   ├── i18n/         # English and Polish strings
│   └── shared/       # generic helpers: theme, language, motion, music, cursor and other
├── styles/           # SCSS tokens and mixins
└── styles.scss       # global styles
```

Content (projects, skills, experience, links) lives in the `*.data.ts` files next to each component, and the strings are in `src/app/i18n`.

<br />

### Credits

- Technology icons from [Devicon](https://devicon.dev), delivered by [jsDelivr](https://www.jsdelivr.com)
- Fonts: [Inter](https://rsms.me/inter/) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), served by Google Fonts
- Contact form by [Formspree](https://formspree.io)
- Music by <a href="https://pixabay.com/users/arpmedia-56546950/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=569472">ARPMedia</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=569472">Pixabay</a>

<br />

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full license text.
