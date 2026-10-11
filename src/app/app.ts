import { Component } from '@angular/core';
import { About } from './components/about/about';
import { ContactComponent } from './components/contact/contact.component';
import { Hero } from './components/hero/hero';
import { ProjectsComponent } from './components/projects/projects.component';
import { Side } from './components/side/side';
import { Sky } from './components/sky/sky';
import { TechComponent } from './components/tech/tech.component';

@Component({
  selector: 'app-root',
  imports: [Sky, Side, Hero, About, TechComponent, ProjectsComponent, ContactComponent],
  styleUrl: './app.scss',
  template: `
  <app-sky />
    <app-side />

    <main>
      <app-hello />
      <app-about />
      <app-tech />
      <app-projects />
      <app-contact />
    </main>
  `,
})
export class App {}
