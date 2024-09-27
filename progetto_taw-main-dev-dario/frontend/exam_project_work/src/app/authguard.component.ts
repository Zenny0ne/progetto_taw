import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service'; // Import your authentication service

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ApiService, private router: Router) {}

  // CanActivate method checks whether the user can activate a route
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // If authenticated, allow route access
    } else {
      this.router.navigate(['/login']); // If not, redirect to login
      return false; // Block route access
    }
  }
}
