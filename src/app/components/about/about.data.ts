import type { Key } from '../../i18n/en';

export const OPEN_TO_WORK = true;

export interface Stat {
  value: number;
  suffix?: string;
  label: Key;
}

export const STATS: Stat[] = [
  { value: 3, suffix: '+', label: 'about.stats.years' },
  { value: 12, suffix: '+', label: 'about.stats.projects' },
  { value: 20, suffix: '+', label: 'about.stats.tech' }
];

export interface Job {
  role: Key;
  place: string;
  from: number;
  to?: number;
}

export const EXPERIENCE: Job[] = [
  { role: 'about.exp.1', place: 'Company Name', from: 2025 },
  { role: 'about.exp.2', place: 'Company Name', from: 2024, to: 2025 },
  { role: 'about.exp.3', place: 'University Name', from: 2021, to: 2025 }
];
