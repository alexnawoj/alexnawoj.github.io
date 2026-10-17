import { ElementRef, inject } from '@angular/core';

/** The native element of the component or directive being created. Call it in an injection context. */
export function injectElement<T extends HTMLElement = HTMLElement>(): T {
  return inject<ElementRef<T>>(ElementRef).nativeElement;
}

/** `document.startViewTransition` does not exist in every browser, so it is typed as optional. */
export type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

/** Appends a <style> element with this CSS, once per page. */
export function addStyleOnce(id: string, css: string) {
  if (document.getElementById(id)) return;

  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}
