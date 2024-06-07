import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

type InputTypes = "text" | "email" | "password";

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ]
})
export class PrimaryInputComponent implements ControlValueAccessor{
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() mask: string = "";

  value: string = ""
  onChange: any = () => {}
  onTouch: any = () => {}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    
  }

}
