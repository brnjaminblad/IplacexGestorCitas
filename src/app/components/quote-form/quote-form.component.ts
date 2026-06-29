import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  templateUrl: './quote-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea
  ]
})
export class QuoteFormComponent {

  @Output() add = new EventEmitter<{ text: string; author: string }>();

  form = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(1024)]],
    author: ['', [Validators.required, Validators.maxLength(80)]]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.invalid) return;

    const value = {
      text: this.form.get('text')?.value ?? '',
      author: this.form.get('author')?.value ?? ''
    };

    console.log('FORM EMIT:', value);

    this.add.emit(value);

    this.form.reset();
  }
}