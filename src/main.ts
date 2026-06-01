import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // <-- Debe estar aquí
import { App } from './app/app';
import { routes } from './app/app.routes'; // <-- Vincula tus rutas

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // <-- ¡Esta línea activa el enrutador global!
  ]
}).catch(err => console.error(err));