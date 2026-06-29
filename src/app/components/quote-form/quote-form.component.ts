import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quote-form.component.html'
})
export class QuoteFormComponent {

  @Output() add = new EventEmitter<any>();

  form = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(5)]],
    author: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.add.emit(this.form.value);
      this.form.reset();
    }
  }
}