import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

interface ExtendedApplicationConfig extends ApplicationConfig {
  production: boolean;
  monacoConfig: {
    defaultOptions: any;
  };
}

export const appConfig: ExtendedApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideClientHydration()
  ],
  production: false,
  monacoConfig: {
    defaultOptions: {
      theme: 'vs-dark',
      language: 'typescript',
      automaticLayout: true,
      minimap: {
        enabled: false
      }
    }
  }
};
