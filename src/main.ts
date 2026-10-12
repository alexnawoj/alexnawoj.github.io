import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './config';

bootstrapApplication(App, config).catch(console.error);
