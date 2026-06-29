import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService } from '../../services/settings.service';
import { QuoteDbService } from '../../services/quote-db.service';
import { Quote } from '../../models/quote.model';

import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

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
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonFab,
    IonFabButton,
    IonButton,
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

    // 🔥 REACTIVIDAD REAL
    this.quoteDb.quotes$.subscribe((quotes) => {
      if (!quotes.length) {
        this.quote = undefined as any;
        return;
      }

      const randomIndex = Math.floor(Math.random() * quotes.length);
      this.quote = quotes[randomIndex];
    });

    await this.loadSettings();
  }

  async addQuote(q: any) {
    await this.quoteDb.addQuote({
      text: q.text,
      author: q.author
    });

    this.openModal = false;
  }
  loadRandomQuote() {
  this.quoteDb.quotes$.pipe().subscribe((quotes) => {
    if (!quotes.length) {
      this.quote = undefined as any;
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[randomIndex];
  });
}

  async loadSettings() {
    this.settings = await this.settingsService.getSettings();
  }

  async deleteQuote(id: number) {
    await this.quoteDb.deleteQuote(id);
  }
}