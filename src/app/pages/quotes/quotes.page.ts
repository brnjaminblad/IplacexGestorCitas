import { Component } from '@angular/core';
import { QuoteDbService } from '../services/quote-db.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  standalone: true
})
export class QuotesPage {

  constructor(public quoteDb: QuoteDbService) {}

  async ionViewWillEnter() {
    await this.quoteDb.initDB();
  }

  delete(id: number) {
    this.quoteDb.deleteQuote(id);
  }
}