import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const passwordRaw = formGroup.get('passwordRaw')?.value;

  if (password && passwordRaw && password !== passwordRaw) {
    return { passwordsMismatch: true };
  }

  return null; // Return null if no errors
};