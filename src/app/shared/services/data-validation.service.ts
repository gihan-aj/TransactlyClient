import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DataValidationService {
  specialCharacterValidation(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  idChangeValidation(editable: boolean, value: string): ValidatorFn {
    return (control) => {
      return control.value !== value && editable
        ? { idHasChanged: true }
        : null;
    };
  }
}
