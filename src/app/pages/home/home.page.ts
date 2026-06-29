import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService } from '../../services/settings.service';
import { QuoteDbService } from '../../services/quote-db.service';
import { Quote } from '../../models/quote.model';

import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

// Ionic standalone imports (IMPORTANTE)
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonFab,
  IonFabButton,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,

    // Ionic UI
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonFab,
    IonFabButton,
    IonButton,

    // Components
    QuoteCardComponent,
    QuoteFormComponent
  ]
})
export class HomePage implements OnInit {

  quote!: Quote;
  openModal = false;

  settings: any = { allowDelete: true };

  constructor(
    private quoteDb: QuoteDbService,
    private settingsService: SettingsService
  ) {}

async ngOnInit() {
  await this.quoteDb.init();
  await this.quoteDb.loadQuotes(); // 👈 CRÍTICO

  if (this.quoteDb.quotes.length === 0) {
    await this.quoteDb.addQuote({
      text: 'La imaginación es más importante que el conocimiento.',
      author: 'Albert Einstein'
    });

    await this.quoteDb.loadQuotes(); // 👈 CRÍTICO
  }

  this.loadRandomQuote();
  await this.loadSettings();
}

loadRandomQuote() {
  const quotes = [...this.quoteDb.quotes]; // CLAVE

  if (!quotes.length) {
    this.quote = undefined as any;
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  this.quote = quotes[randomIndex];
}

async addQuote(q: any) {
  console.log('NEW QUOTE:', q);

  await this.quoteDb.addQuote({
    text: q.text,
    author: q.author
  });

  // IMPORTANTE: volver a cargar desde DB
  await this.quoteDb.loadQuotes();

  //  IMPORTANTE: forzar cambio de UI
  this.quote = undefined as any;
  this.loadRandomQuote();

  this.openModal = false;
}
  async loadSettings() {
  this.settings = await this.settingsService.getSettings();
}
async deleteQuote(id: number) {
  await this.quoteDb.deleteQuote(id);
  this.loadRandomQuote();
}

}