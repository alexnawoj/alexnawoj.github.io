import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SideComponent } from './components/side/side.component';
import { SkyComponent } from './components/sky/sky.component';
import { TechComponent } from './components/tech/tech.component';
import { Cursor } from './shared/cursor';

@Component({
  selector: 'app-root',
  imports: [SkyComponent, SideComponent, HeroComponent, AboutComponent, TechComponent, ProjectsComponent, ContactComponent, Cursor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
  template: `
    <app-sky />
    <app-cursor />
    <app-side />

    <main>
      <app-hero />
      <app-about />
      <app-tech />
      <app-projects />
      <app-contact />
    </main>
  `
})
export class App {}
