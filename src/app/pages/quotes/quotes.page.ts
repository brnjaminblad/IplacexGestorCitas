import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { QuoteDbService } from '../../services/quote-db.service';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  standalone: true,
  imports: [
    CommonModule,
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

  addQuote(q: any) {
    this.quoteDb.addQuote(q);
  }

delete(id?: number) {
  if (!id) return;
  this.quoteDb.deleteQuote(id);
}
}