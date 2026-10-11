import { afterNextRender, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { I18n, type Lang, T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { ScrollTo } from '../../shared/scroll-to';

const WORDS: Record<Lang, string[]> = {
  en: ['the web.', 'the world.', 'scale.', 'impact.', 'fun.', 'production.', 'research.', 'people.', 'me.', 'you.'],
  pl: ['sieci.', 'świata.', 'skali.', 'wpływu.', 'zabawy.', 'produkcji.', 'badań.', 'ludzi.', 'mnie.', 'ciebie.'],
};

const TYPE_MS = 150;
const DELETE_MS = 50;
const HOLD_MS = 1800; // pause on a finished word
const GAP_MS = 350; // pause on an empty line

@Component({
  selector: 'app-hello',
  imports: [ScrollTo, T],
  styleUrl: './hello.scss',
  template: `
    <section id="hello" class="sec hero">
      <p class="eyebrow"><b>01</b><u></u>{{ 'HELLO, WORLD' | t }}</p>

      <h1>
        {{ 'Building things for' | t }}<br />
        <span class="typed acc">
          {{ text() }}<span class="caret" aria-hidden="true"></span>
        </span>
      </h1>

      <p class="lead">
        {{
          "I'm Alex, a full-stack developer who brings thoughtful design and reliable engineering to the same orbit."
            | t
        }}
      </p>

      <div class="btns">
        <a class="btn primary" href="#projects" appScrollTo="projects">
          {{ 'Explore my work' | t }} <span class="arr down">↓</span>
        </a>
        <a class="btn ghost" href="#contact" appScrollTo="contact">
          {{ "Let's talk" | t }} <span class="arr">↗</span>
        </a>
      </div>
    </section>
  `,
})
export class Hello {
  protected readonly text = signal(WORDS.en[0]);
  private state = { index: 0, chars: WORDS.en[0].length, deleting: true };

  constructor() {
    const i18n = inject(I18n);
    const motion = inject(Motion);
    const destroyRef = inject(DestroyRef);

    // language or motion setting changed: show the first word right away and restart from it
    effect(() => {
      motion.off();
      const first = WORDS[i18n.lang()][0];
      this.state = { index: 0, chars: first.length, deleting: true };
      this.text.set(first);
    });

    afterNextRender(() => {
      let timer: ReturnType<typeof setTimeout>;

      const tick = () => {
        // animations off: keep the first word on screen and just check again later
        if (motion.off()) {
          timer = setTimeout(tick, 500);
          return;
        }

        const s = this.state;
        const words = WORDS[i18n.lang()];
        let delay: number;

        if (s.deleting) {
          s.chars--;
          delay = DELETE_MS;
          if (s.chars === 0) {
            s.deleting = false;
            s.index = (s.index + 1) % words.length;
            delay = GAP_MS;
          }
        } else {
          s.chars++;
          delay = TYPE_MS;
          if (s.chars === words[s.index].length) {
            s.deleting = true;
            delay = HOLD_MS;
          }
        }

        this.text.set(words[s.index].slice(0, s.chars));
        timer = setTimeout(tick, delay);
      };

      timer = setTimeout(tick, HOLD_MS);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
