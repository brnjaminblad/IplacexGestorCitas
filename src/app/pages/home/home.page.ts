import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { QuoteDbService } from '../../services/quote-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar]
})
export class HomePage {

  quote: any;

  constructor(private quoteDb: QuoteDbService) {}

  ionViewWillEnter() {
    this.randomQuote();
  }

  randomQuote() {
    const list = this.quoteDb.quotes;
    this.quote = list[Math.floor(Math.random() * list.length)];
  }
}