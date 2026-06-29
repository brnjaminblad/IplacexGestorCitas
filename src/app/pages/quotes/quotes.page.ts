import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonTextarea, IonButton
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteDbService } from '../../services/quote-db.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonInput, IonTextarea, IonButton
  ]
})
export class QuotesPage {

  text = '';
  author = '';

  constructor(
    private db: QuoteDbService,
    private router: Router
  ) {}

  async addQuote() {

    if (!this.text || !this.author) return;

    await this.db.addQuote({
      text: this.text,
      author: this.author
    });

    this.router.navigateByUrl('/');
  }
}