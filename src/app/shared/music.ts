import { Injectable, signal } from '@angular/core';

const TRACK = '/music/bg.mp3';
const VOLUME = 0.4;

@Injectable({ providedIn: 'root' })
export class Music {
  readonly playing = signal(false);
  private audio?: HTMLAudioElement;

  toggle() {
    const audio = this.audio ?? this.create();

    if (this.playing()) {
      audio.pause();
    } else {
      // play() is rejected when the file is missing or the browser blocks it; the icon then stays "off"
      audio.play().catch(() => this.playing.set(false));
    }
  }

  // created on the first click, so nothing is downloaded until the visitor asks for music
  private create() {
    const audio = new Audio(TRACK);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = VOLUME;

    // follow the real state (also covers media keys and other tabs pausing it)
    audio.addEventListener('play', () => this.playing.set(true));
    audio.addEventListener('pause', () => !audio.ended && this.playing.set(false)); // a track ending is not a pause
    audio.addEventListener('error', () => this.playing.set(false));

    // `loop` can silently fail (for example when the server can't seek inside the file), and then the
    // track just ends. So when that happens, start it again by hand.
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play().catch(() => {
        audio.load(); // the file could not be rewound: reload it and play again
        audio.play().catch(() => this.playing.set(false));
      });
    });

    return (this.audio = audio);
  }
}
