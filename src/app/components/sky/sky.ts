import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

interface Star {
  x: number; // 0–1, relative to the viewport
  y: number;
  size: number;
  phase: number;
  speed: number;
  color: string;
}

const STAR_COUNT = 140;
const FRAME_MS = 1000 / 30; // twinkling doesn't need 60 fps
const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ddd6fe', '#c4b5fd'];

@Component({
  selector: 'app-sky',
  template: '<canvas #canvas></canvas>',
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Sky {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: 0.5 + Math.random() * 1.1,
    phase: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 1.6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  private width = 0;
  private height = 0;
  private frame = 0;
  private last = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.canvas().nativeElement;
      const ctx = el.getContext('2d')!;
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

      const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        this.width = innerWidth;
        this.height = innerHeight;
        el.width = this.width * dpr;
        el.height = this.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (reduceMotion) this.draw(ctx, 0); // static sky, nothing to animate
      };

      const loop = (now: number) => {
        this.frame = requestAnimationFrame(loop);
        if (now - this.last < FRAME_MS) return;
        this.last = now;
        this.draw(ctx, now / 1000);
      };

      resize();
      addEventListener('resize', resize);
      if (!reduceMotion) this.frame = requestAnimationFrame(loop);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.frame);
        removeEventListener('resize', resize);
      });
    });
  }

  private draw(ctx: CanvasRenderingContext2D, time: number) {
    ctx.clearRect(0, 0, this.width, this.height);

    for (const s of this.stars) {
      // smooth fade between dim and bright
      ctx.globalAlpha = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
      ctx.fillStyle = s.color;

      const x = s.x * this.width;
      const y = s.y * this.height;

      if (s.size < 1) {
        ctx.fillRect(x, y, s.size * 2, s.size * 2); // cheaper than an arc for tiny stars
      } else {
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }
}
