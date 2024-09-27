import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected from styleUrl to styleUrls
})
export class LoginComponent {
  submitted = false;
  loginForm: FormGroup;
  errorMessage: string | null = null;
  rememberMe: boolean = false;


  constructor(private authService: ApiService, private fb: FormBuilder, private router: Router) {
    // Initialize the form group with form controls and their validators
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]), // Email should be required and valid
      password: new FormControl('', [Validators.required]) // Password should be required
   
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      
      // Get the values from the form controls
      const credentials = this.loginForm.value; // This will automatically grab values from the form
      
      this.authService.login(credentials).subscribe({
        next: (response: any) => {
          // Assuming the response contains a JWT token
          if (this.rememberMe) {
            localStorage.setItem('authToken', response.token); // Use local storage for remember me
          } else {
            sessionStorage.setItem('authToken', response.token); // Use session storage for current session
          }
          this.router.navigate(['/home']); // Navigate to a protected route
          console.log(this.authService.getToken())
        },
        error: (error: any) => {
          this.errorMessage = 'Invalid login credentials'; // Set error message
        }
      });
    }
  }
}
