import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password';

@Component({
  selector: 'app-primary-input',
  imports: [ReactiveFormsModule],
  providers: [
    {
      // 1. O token que o Angular Forms procura
      provide: NG_VALUE_ACCESSOR,
      // 2. A instância a ser usada (o próprio componente)
      useExisting: forwardRef(() => PrimaryInput),
      // 3. Indica que este provider é adicionado a uma lista de providers
      multi: true,
    },
  ],
  templateUrl: './primary-input.html',
  styleUrl: './primary-input.scss',
})
export class PrimaryInput implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputName: string = '';
  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
