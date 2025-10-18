import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login',
  imports: [],
  templateUrl: './default-login.html',
  styleUrl: './default-login.scss',
})
export class DefaultLogin {
  @Input() title: string = '';
  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';
  @Output('submit') onSubmit = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }
}
