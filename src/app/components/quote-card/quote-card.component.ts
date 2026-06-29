import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote } from '../../models/quote.model';
import { 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonButton, IonIcon 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
    IonCardContent, IonButton, IonIcon
  ]
})
export class QuoteCardComponent {
  // Receives the quote item properties from the parent dashboard grid view
  @Input() quote!: Quote;

  // Input property mapping matching the previous home config
  @Input() canDelete: boolean = false;

  // TEMPLATE ALIGNMENT FIX: Maps exactly onto *ngIf="allowDelete" in your HTML template
  @Input() allowDelete: boolean = false;

  // TEMPLATE ALIGNMENT FIX: Maps exactly onto (click)="next.emit()"
  @Output() next = new EventEmitter<void>();

  // TEMPLATE ALIGNMENT FIX: Maps exactly onto (click)="delete.emit(...)"
  @Output() delete = new EventEmitter<number>();

  // Legacy fallback channel
  @Output() onDelete = new EventEmitter<void>();

  deleteClicked() {
    if (this.quote && this.quote.id) {
      this.delete.emit(this.quote.id);
      this.onDelete.emit();
    }
  }
}
