import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountUp } from '../../shared/count-up';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { ScrollTo } from '../../shared/scroll-to';
import { EXPERIENCE } from './about.data';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [T, Glow, ScrollTo, CountUp],
  styleUrl: 'about.scss',
  templateUrl: 'about.html'
})
export class AboutComponent {
  protected readonly experience = EXPERIENCE;
}
