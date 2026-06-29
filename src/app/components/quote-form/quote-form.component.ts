import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, IonIcon]
})
export class QuoteFormComponent {
  @Output() onAddQuote = new EventEmitter<Quote>();
  quoteForm: FormGroup;

  // Expresión regular que SOLO permite letras (mayúsculas, minúsculas, tildes, eñes) y espacios
  private soloLetrasPattern = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$';

  constructor(private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      texto: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern(this.soloLetrasPattern) // <-- FILTRO DE CARACTERES
      ]],
      autor: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.pattern(this.soloLetrasPattern) // <-- FILTRO DE CARACTERES
      ]]
    });
  }

  onSubmit() {
    // CONDICIÓN CRÍTICA: Si el formulario tiene caracteres inválidos, se bloquea la acción por completo
    if (this.quoteForm.valid) {
      const nuevaCita: Quote = {
        text: this.quoteForm.value.texto,
        author: this.quoteForm.value.autor
      };
      this.onAddQuote.emit(nuevaCita);
      this.quoteForm.reset();
    } else {
      // Marcar todos los campos como tocados para forzar la aparición de alertas si intentan burlar el botón
      this.quoteForm.markAllAsTouched();
    }
  }
}
