import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './routes';

export const config: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), provideClientHydration(withEventReplay())],
};
