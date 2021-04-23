import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

  /**
   * Marca todos los controles de un formulario como 'touched'
   * @param formGroup - El formulario a tocar
   * https://stackoverflow.com/questions/40529817/reactive-forms-mark-fields-as-touched
   */
  markFormGroupTouched(formGroup: FormGroup) {
    // (<any>Object).values(formGroup.controls)

    // Para que funcione en navegadores más antiguos
    Object.keys(formGroup.controls)
      .map((x) => formGroup.controls[x])
      .forEach((control: any) => {
        control.markAsTouched();
        control.updateValueAndValidity();
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
  }

  /**
   * Validador de igualdad de controls
   * @param controlName FormControl
   * @param matchingControlName Control que debe ser igual a controlName
   */
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
