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
  // .:: Cita recibida desde el componente padre ::.
  @Input() quote!: Quote;

  // .:: Permite borrar la cita cuando está habilitado ::.
  @Input() canDelete: boolean = false;

  // .:: Controla si se muestra el botón de avance en el template ::.
  @Input() allowDelete: boolean = false;

  // .:: Evento para avanzar a la siguiente cita ::.
  @Output() next = new EventEmitter<void>();

  // .:: Evento para eliminar la cita por id ::.
  @Output() delete = new EventEmitter<number>();

  // .:: Evento legado para compatibilidad ::.
  @Output() onDelete = new EventEmitter<void>();

  deleteClicked() {
    if (this.quote && this.quote.id) {
      this.delete.emit(this.quote.id);
      this.onDelete.emit();
    }
  }
}
