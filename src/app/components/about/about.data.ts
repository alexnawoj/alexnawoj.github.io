import type { Key } from '../../i18n/en';

export interface Job {
  role: Key;
  place: string;
  from: number;
  to?: number | 'now';
}

export const EXPERIENCE: Job[] = [
  { role: 'about.exp.1', place: 'Akademia Tarnowska', from: 2024, to: 'now' },
  { role: 'about.exp.2', place: 'CHIP Computers, Tarnów', from: 2022 },
  { role: 'about.exp.3', place: 'Radomyśl Wielki', from: 2019, to: 2024 }
];
