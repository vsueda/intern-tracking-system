import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(MonacoEditorModule)
  ],
  production: false,
  monacoConfig: {
    baseUrl: './assets',
    defaultOptions: {
      scrollBeyondLastLine: false,
      theme: 'vs-dark',
      language: 'javascript',
      fontSize: 14,
      automaticLayout: true,
      minimap: { enabled: false }
    }
  }
};
