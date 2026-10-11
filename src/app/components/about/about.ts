import { Component } from '@angular/core';
import { T } from '../../shared/i18n';

@Component({
  selector: 'app-about',
  imports: [T],
  template: `
    <section id="about" class="sec">
      <p class="eyebrow"><b>02</b><u></u>{{ 'about.eyebrow' | t }}</p>

      <h2>{{ 'about.title1' | t }}<br />{{ 'about.title2' | t }}</h2>

      <p class="body">
        {{
          'about.p1'
            | t
        }}
      </p>
      <p class="body">
        {{
          'about.p2'
            | t
        }}
      </p>

      <p class="acc small">{{ 'about.offscreen' | t }}</p>
    </section>
  `,
})
export class About {}
