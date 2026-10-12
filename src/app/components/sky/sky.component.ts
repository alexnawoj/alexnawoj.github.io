import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

const STATIC_STARS = 110;
const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ddd6fe', '#c4b5fd'];

/** Small seeded generator: the server and the browser draw the same sky. */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = random(7);

/** Only these few stars animate (each is a tiny element); the rest are painted once, so the sky costs almost nothing. */
const TWINKLERS = Array.from({ length: 28 }, () => ({
  x: +(rand() * 100).toFixed(1),
  y: +(rand() * 100).toFixed(1),
  size: +(1 + rand() * 1.4).toFixed(1),
  duration: +(2.5 + rand() * 5).toFixed(1),
  delay: +(-rand() * 8).toFixed(1)
}));

@Component({
  selector: 'app-sky',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './sky.scss',
  template: `
    <canvas #canvas></canvas>
    @for (star of twinklers; track $index) {
      <i [style.--d]="star.duration + 's'" [style.--delay]="star.delay + 's'" [style.--s]="star.size + 'px'" [style.--x]="star.x" [style.--y]="star.y"></i>
    }
  `
})
export class SkyComponent {
  protected readonly twinklers = TWINKLERS;
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let timer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => this.paint(), 200); // repaint once resizing has stopped
      };

      this.paint();
      addEventListener('resize', onResize);
      destroyRef.onDestroy(() => {
        clearTimeout(timer);
        removeEventListener('resize', onResize);
      });
    });
  }

  private paint() {
    const canvas = this.canvas().nativeElement;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;

    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const next = random(42);
    for (let i = 0; i < STATIC_STARS; i++) {
      ctx.globalAlpha = 0.35 + next() * 0.65;
      ctx.fillStyle = COLORS[Math.floor(next() * COLORS.length)];
      ctx.beginPath();
      ctx.arc(next() * innerWidth, next() * innerHeight, 0.5 + next() * 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
