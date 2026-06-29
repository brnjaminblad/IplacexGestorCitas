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

  constructor(private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      this.onAddQuote.emit(this.quoteForm.value);
      this.quoteForm.reset();
    }
  }
}