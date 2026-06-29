import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  imports: [
    CommonModule,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class QuoteCardComponent {

  @Input() quote!: Quote;

  // 🔥 control de permisos desde Home
  @Input() allowDelete = false;

  // eventos hacia Home
  @Output() next = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

}