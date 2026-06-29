import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { APP_INITIALIZER, inject } from '@angular/core';
import { QuoteDbService } from './app/services/quote-db.service';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // .:: Inicializa SQLite antes de arrancar la aplicación ::.
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const quoteDb = inject(QuoteDbService);
        return () => quoteDb.inicializarBaseDeDatos();
      },
      multi: true
    }
  ],
}).catch(err => console.error(err));