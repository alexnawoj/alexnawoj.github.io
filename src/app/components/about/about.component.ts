import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountUp } from '../../shared/count-up';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { ScrollTo } from '../../shared/scroll-to';
import { EXPERIENCE, OPEN_TO_WORK, STATS } from './about.data';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [T, Glow, ScrollTo, CountUp],
  styleUrl: 'about.scss',
  templateUrl: 'about.html'
})
export class AboutComponent {
  protected readonly openToWork = OPEN_TO_WORK;
  protected readonly stats = STATS;
  protected readonly experience = EXPERIENCE;
}
