import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton
} from '@ionic/angular/standalone';

import { QuoteDbService } from '../../services/quote-db.service';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    QuoteFormComponent
  ]
})
export class QuotesPage {

  constructor(public quoteDb: QuoteDbService) {}

  async ionViewWillEnter() {
    await this.quoteDb.initDB();
  }

  delete(id: number) {
    this.quoteDb.deleteQuote(id);
  }
  onAddQuote(quote: any) {
  this.quoteDb.addQuote(quote);
}
}