import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChildren } from '@angular/core';

const LAYERS = [
  { stars: 50, duration: '4.2s', delay: '0s' },
  { stars: 50, duration: '6.1s', delay: '-2.3s' },
  { stars: 50, duration: '8.7s', delay: '-5s' },
];
const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ddd6fe', '#c4b5fd'];

/**
 * The stars are painted ONCE onto a few canvases. Each canvas fades in and out with a CSS
 * opacity animation, which runs on the GPU compositor, so there is no JavaScript per frame.
 */
@Component({
  selector: 'app-sky',
  template: `
    @for (layer of layers; track $index) {
      <canvas #layer [style.--d]="layer.duration" [style.--delay]="layer.delay"></canvas>
    }
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      animation: twinkle var(--d) ease-in-out var(--delay) infinite alternate;
    }

    @keyframes twinkle {
      from {
        opacity: 0.12;
      }
      to {
        opacity: 1;
      }
    }
  `,
})
export class Sky {
  protected readonly layers = LAYERS;
  private readonly canvases = viewChildren<ElementRef<HTMLCanvasElement>>('layer');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let timer: ReturnType<typeof setTimeout>;
      const paint = () => this.canvases().forEach((c, i) => this.paintLayer(c.nativeElement, LAYERS[i].stars));
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(paint, 200); // repaint after resizing stops
      };

      paint();
      addEventListener('resize', onResize);
      destroyRef.onDestroy(() => {
        clearTimeout(timer);
        removeEventListener('resize', onResize);
      });
    });
  }

  private paintLayer(canvas: HTMLCanvasElement, count: number) {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = innerWidth;
    const h = innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let i = 0; i < count; i++) {
      ctx.globalAlpha = 0.5 + Math.random() * 0.5;
      ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 0.5 + Math.random() * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
