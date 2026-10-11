import { Component, computed, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { T } from '../../shared/i18n';
import { ScrollTo } from '../../shared/scroll-to';
import { SOCIALS } from './contact.data';

const FORM_ENDPOINT = 'https://formspree.io/f/xljgnzrn';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [Glow, ScrollTo, T],
  styleUrl: 'contact.style.scss',
  templateUrl: 'contact.template.html',
})

export class ContactComponent {
  protected readonly socials = SOCIALS;
  protected readonly maxMessage = 1000;

  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly message = signal('');
  protected readonly status = signal<Status>('idle');

  // errors appear after a field was left once, or after the first submit attempt
  private readonly touched = signal<Record<string, boolean>>({});
  private readonly attempted = signal(false);

  private readonly valid = computed(() => ({
    name: this.name().trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email().trim()),
    message: this.message().trim().length >= 10,
  }));

  protected read(event: Event) {
    return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  protected touch(field: string) {
    this.touched.update((t) => ({ ...t, [field]: true }));
  }

  protected showError(field: 'name' | 'email' | 'message') {
    return (this.attempted() || this.touched()[field]) && !this.valid()[field];
  }

  protected reset() {
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.touched.set({});
    this.attempted.set(false);
    this.status.set('idle');
  }

  protected async submit(event: Event) {
    event.preventDefault();
    this.attempted.set(true);

    const v = this.valid();
    if (!v.name || !v.email || !v.message || this.status() === 'sending') return;

    const payload = { name: this.name().trim(), email: this.email().trim(), message: this.message().trim() };

    this.status.set('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.status.set('sent');
    } catch {
      this.status.set('error');
    }
  }
}
