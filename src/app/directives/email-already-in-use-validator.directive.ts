import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { AuthStateManager } from '../state-managers/auth-state-manager';

@Directive({
  selector: '[appEmailAlreadyInUseValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailAlreadyInUseValidatorDirective, multi: true }]
})
export class EmailAlreadyInUseValidatorDirective implements Validator {

  @Input() appEmailAlreadyInUseValidator?: AuthStateManager;

  constructor() { }


  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.appEmailAlreadyInUseValidator) { return null; }
    if (!this.appEmailAlreadyInUseValidator.isEmailAlreaddyInUse(control.value)) {
      return null;
    }
    return {
      emailAlreadyInUse: {
        message: 'This address e-mail is already in use'
      }
    };
  }

}
