import type { Key } from '../../i18n/en';

export const OPEN_TO_WORK = true;

export interface Stat {
  value: number;
  suffix?: string;
  label: Key;
}

export const STATS: Stat[] = [
  { value: 9, suffix: '+', label: 'about.stats.years' },
  { value: 10, suffix: '+', label: 'about.stats.projects' },
  { value: 20, suffix: '+', label: 'about.stats.tech' }
];

export interface Job {
  role: Key;
  place: string;
  from: number;
  to?: number | 'now';
}

export const EXPERIENCE: Job[] = [
  { role: 'about.exp.1', place: 'Akademia Tarnowska', from: 2024, to: 'now' },
  { role: 'about.exp.2', place: 'CHIP Computers', from: 2022 },
  { role: 'about.exp.3', place: 'Radomyśl Wielki', from: 2019, to: 2024 }
];
