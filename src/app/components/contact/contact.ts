import { Component, computed, signal } from '@angular/core';
import { Glow } from '../../shared/glow';
import { ScrollTo } from '../../shared/scroll-to';

const FORM_ENDPOINT = 'https://formspree.io/f/xljgnzrn';

const SOCIALS = [
  { id: 'github', name: 'GitHub', handle: '@alexmorgan', href: 'https://github.com/alexmorgan' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'in/alexmorgan', href: 'https://linkedin.com/in/alexmorgan' },
] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [Glow, ScrollTo],
  styleUrl: 'contact.scss',
  template: `
    <section id="contact" class="sec">
      <p class="eyebrow"><b>05</b><u></u>LET'S CONNECT</p>

      <h2>Have something in mind?<br /><span class="acc">Let's make it happen.</span></h2>
      <p class="sub">Find me around the web, or drop a message below. I read everything.</p>

      <div class="socials">
        @for (s of socials; track s.id) {
          <a class="social" appGlow [href]="s.href" target="_blank" rel="noopener noreferrer">
            <span class="icon">
              @switch (s.id) {
                @case ('github') {
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                }
                @case ('linkedin') {
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                }
              }
            </span>

            <span class="text">
              <strong>{{ s.name }}</strong>
              <small class="mono">{{ s.handle }}</small>
            </span>

            <span class="go arr">↗</span>
          </a>
        }
      </div>

      <div class="form">
        @if (status() === 'sent') {
          <div class="done">
            <span class="star">✦</span>
            <h3>Message sent</h3>
            <p>Thanks for reaching out — I'll get back to you soon.</p>
          </div>
        } @else {
          <h3>Send me a message</h3>
          <p class="hint">A project, a role, or just a good conversation.</p>

          <form novalidate (submit)="submit($event)">
            <div class="row">
              <label class="field" [class.bad]="showError('name')">
                <span class="mono">NAME</span>
                <input
                  type="text"
                  name="name"
                  autocomplete="name"
                  placeholder="Ada Lovelace"
                  [value]="name()"
                  (input)="name.set(read($event))"
                  (blur)="touch('name')"
                />
                @if (showError('name')) {
                  <div class="error">Please tell me your name.</div>
                }
              </label>

              <label class="field" [class.bad]="showError('email')">
                <span class="mono">EMAIL</span>
                <input
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="ada@example.com"
                  [value]="email()"
                  (input)="email.set(read($event))"
                  (blur)="touch('email')"
                />
                @if (showError('email')) {
                  <div class="error">That email doesn't look right.</div>
                }
              </label>
            </div>

            <label class="field" [class.bad]="showError('message')">
              <span class="mono">
                MESSAGE
                <em class="dim">{{ message().length }} / {{ maxMessage }}</em>
              </span>
              <textarea
                name="message"
                placeholder="What are you building?"
                [maxLength]="maxMessage"
                [value]="message()"
                (input)="message.set(read($event))"
                (blur)="touch('message')"
              ></textarea>
              @if (showError('message')) {
                <div class="error">Brevity is the soul of wit but your message does have to be at least 10 characters long.</div>
              }
            </label>

            <div class="actions">
              <button class="send" type="submit" [disabled]="status() === 'sending'">
                {{ status() === 'sending' ? 'Sending…' : 'Send message' }}
              </button>
            </div>

            @if (status() === 'error') {
              <p class="fail">Something went wrong. Please try again, or email me directly.</p>
            }
          </form>
        }
      </div>

      <footer class="mono dim">
        <span>© 2026 Alex Morgan</span>
        <span class="sans">Built with intention. A little stardust, too. ✦</span>
        <a class="sans" href="#hello" appScrollTo="hello">Back to top ↑</a>
      </footer>
    </section>
  `,
})
export class Contact {
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
