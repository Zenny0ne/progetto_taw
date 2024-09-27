import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router';
import { passwordMatchValidator } from './password-validator'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  submitted = false;
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: ApiService, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]), // Email should be required and valid
      email: new FormControl('', [Validators.required, Validators.required]), // Email should be required and valid
      password:new FormControl('', [Validators.required]), // Password should be required
      passwordRaw: new FormControl('', [Validators.required]), // Confirm password should be required
      address: new FormControl('', [Validators.required]), // Address field
    }, { validators: passwordMatchValidator }); // Apply the custom validator for password match
  }

  signUp(): void {
     if (this.registerForm.valid) {
      this.submitted = true;
      const { username, email, password, address } = this.registerForm.value;
      this.authService.signUp({ username, email, password, address }).subscribe({
        next: (response: any) => {
          
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this.errorMessage = 'Invalid registration credentials';
        }
      });
    }
  }
}
