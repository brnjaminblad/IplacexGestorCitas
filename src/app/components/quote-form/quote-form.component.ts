import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonButton, IonInput, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonInput
  ]
})
export class QuoteFormComponent {

  @Output() add = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });

  }

  submit() {
    if (this.form.valid) {
      this.add.emit(this.form.value);
      this.form.reset();
    }
  }
}