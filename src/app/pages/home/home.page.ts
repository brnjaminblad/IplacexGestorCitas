import { Component } from '@angular/core';
import { QuoteDbService } from '../../services/quote-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true
})
export class HomePage {

  quote: any;

  constructor(private quoteDb: QuoteDbService) {}

  async ionViewWillEnter() {
    await this.quoteDb.initDB();
    this.quote = this.quoteDb.getRandomQuote();
  }
}