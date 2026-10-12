import { ChangeDetectionStrategy, afterNextRender, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { I18n, T } from '../../shared/i18n';
import { Motion } from '../../shared/motion';
import { ScrollTo } from '../../shared/scroll-to';

const TYPE_MS = 150;
const DELETE_MS = 50;
const HOLD_MS = 1800; // pause on a finished word
const GAP_MS = 350; // pause on an empty line

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollTo, T],
  styleUrl: './hero.scss',
  templateUrl: 'hero.html'
})
export class HeroComponent {
  protected readonly text = signal(inject(I18n).list('hero.words')[0]);
  private state = { index: 0, chars: 0, deleting: true };

  constructor() {
    const i18n = inject(I18n);
    const motion = inject(Motion);
    const destroyRef = inject(DestroyRef);

    // language or motion setting changed: show the first word right away and restart from it
    effect(() => {
      motion.off();
      const first = i18n.list('hero.words')[0];
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
        const words = i18n.list('hero.words');
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
