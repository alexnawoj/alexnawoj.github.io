import { type ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { config as browserConfig } from './config';
import { serverRoutes } from './routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))]
};

export const config = mergeApplicationConfig(browserConfig, serverConfig);
