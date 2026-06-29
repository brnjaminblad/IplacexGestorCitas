import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { QuoteDbService } from './services/quote-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(private quoteDb: QuoteDbService) {
    this.initApp();
  }

  async initApp() {
    await this.quoteDb.init();
  }

}
