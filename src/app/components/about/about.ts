import { Component } from '@angular/core';
import { CountUp } from '../../shared/count-up';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { ScrollTo } from '../../shared/scroll-to';
import { EXPERIENCE, OPEN_TO_WORK, STATS } from './about.data';

@Component({
  selector: 'app-about',
  imports: [T, Glow, ScrollTo, CountUp],
  styles: `
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(300px, 1fr);
      gap: 56px;
      align-items: start;
    }

    @media (max-width: 1100px) {
      .layout {
        grid-template-columns: 1fr;
        gap: 36px;
      }
    }

    .tiles {
      display: grid;
      gap: 16px;
    }

    /* ── shared tile look ── */
    .tile {
      display: block;
      padding: 22px;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      transition:
        transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
        border-color 0.3s,
        box-shadow 0.35s;
    }

    .tile:hover {
      transform: translateY(-4px);
      border-color: rgba(167, 139, 250, 0.45);
      box-shadow: 0 22px 44px -24px rgba(139, 92, 246, 0.6);
    }

    /* ── open to opportunities ── */
    .status {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .beacon {
      position: relative;
      flex: none;
      width: 10px;
      height: 10px;
      background: var(--state);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--state);
    }

    .beacon::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--state);
      border-radius: 50%;
      animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      from {
        opacity: 0.7;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(3.2);
      }
    }

    .status {
      --state: #22c55e;
    }

    .status.closed {
      --state: #9ca3af;
    }

    .status .text {
      flex: 1;
      min-width: 0;
    }

    .status strong {
      display: block;
      font-size: 15px;
      font-weight: 500;
    }

    .status small {
      font-size: 12px;
      color: var(--mut);
    }

    .status .go {
      color: var(--acc);
    }

    /* ── numbers ── */
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .value {
      display: block;
      font-size: 34px;
      font-weight: 300;
      line-height: 1.1;
    }

    .value .suffix {
      color: var(--acc);
    }

    .stats .label {
      display: block;
      margin-top: 6px;
      font-size: 10px;
      line-height: 1.4;
      color: var(--dim);
    }

    /* ── experience ── */
    .exp h4 {
      margin-bottom: 18px;
      font-size: 10px;
      font-weight: 400;
    }

    .exp ol {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 0;
      list-style: none;
    }

    /* vertical line behind the dots */
    .exp ol::before {
      content: '';
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 3px;
      width: 1px;
      background: var(--line);
    }

    .exp li {
      position: relative;
      padding-left: 22px;
    }

    .exp li::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 0;
      width: 7px;
      height: 7px;
      background: var(--bg);
      border: 1px solid var(--dim);
      border-radius: 50%;
    }

    .exp li.now::before {
      background: var(--acc);
      border-color: var(--acc);
      box-shadow: 0 0 10px var(--acc);
    }

    .exp .head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .exp .role {
      font-size: 14px;
    }

    .exp .place {
      font-size: 12px;
      color: var(--mut);
    }

    .exp .period {
      flex: none;
      font-size: 10px;
      color: var(--dim);
    }
  `,
  template: `
    <section id="about" class="sec">
      <p class="eyebrow"><b>02</b><u></u>{{ 'about.eyebrow' | t }}</p>

      <h2>{{ 'about.title1' | t }}<br />{{ 'about.title2' | t }}</h2>

      <div class="layout">
        <div class="text">
          <p class="body">{{ 'about.p1' | t }}</p>
          <p class="body">{{ 'about.p2' | t }}</p>
          <p class="acc small">{{ 'about.offscreen' | t }}</p>
        </div>

        <div class="tiles">
          <a class="tile status" [class.closed]="!openToWork" appGlow href="#contact" appScrollTo="contact">
            <span class="beacon"></span>
            <span class="text">
              <strong>{{ (openToWork ? 'about.status.open' : 'about.status.closed') | t }}</strong>
              @if (openToWork) {
                <small>{{ 'about.status.detail' | t }}</small>
              }
            </span>
            <span class="go arr">↗</span>
          </a>

          <div class="tile stats" appGlow>
            @for (stat of stats; track stat.label) {
              <div>
                <span class="value">
                  <span [appCountUp]="stat.value">{{ stat.value }}</span
                  ><span class="suffix">{{ stat.suffix }}</span>
                </span>
                <span class="label mono">{{ stat.label | t }}</span>
              </div>
            }
          </div>

          <div class="tile exp" appGlow>
            <h4 class="mono">{{ 'about.exp.title' | t }}</h4>
            <ol>
              @for (job of experience; track $index) {
                <li [class.now]="!job.to">
                  <div class="head">
                    <span class="role">{{ job.role | t }}</span>
                    <span class="period mono">{{ job.from }} — {{ job.to ?? ('about.exp.present' | t) }}</span>
                  </div>
                  <span class="place">{{ job.place }}</span>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly openToWork = OPEN_TO_WORK;
  protected readonly stats = STATS;
  protected readonly experience = EXPERIENCE;
}
