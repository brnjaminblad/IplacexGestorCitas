import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon,
  IonButtons, IonButton
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, settings, trash } from 'ionicons/icons';

import { QuoteDbService } from '../../services/quote-db.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonFab, IonFabButton, IonIcon,
    IonButtons, IonButton
  ]
})
export class HomePage {

  quote: any = null;
  settings: any = { allowDelete: true };

  constructor(
    public quoteDb: QuoteDbService,
    private settingsService: SettingsService,
    private router: Router
  ) {
    addIcons({ add, settings, trash });
  }

  async ionViewWillEnter() {
    this.settings = await this.settingsService.getSettings();
    await this.quoteDb.loadQuotes();
    this.randomQuote();
  }

  randomQuote() {
    const list = this.quoteDb.quotes;
    if (!list.length) return;

    this.quote = list[Math.floor(Math.random() * list.length)];
  }

  goSettings() {
    this.router.navigateByUrl('/settings');
  }

  openCreate() {
    this.router.navigateByUrl('/quotes');
  }

  delete(id: number) {
    if (!this.settings.allowDelete) return;
    this.quoteDb.deleteQuote(id);
    this.randomQuote();
  }
}