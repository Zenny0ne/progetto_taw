import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlusers = 'http://localhost:5005/users'; // Replace with your actual API URL
  private token = 'authToken';

  constructor(private http: HttpClient) { }

  // Login
  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrlusers}/login`, credentials);
  }

  // Sign-in / Register
  signUp(data: {username: string, email: string, password: string, address: string}): Observable<any> {
    return this.http.post(`${this.apiUrlusers}/signup`, data);
  }

  // Optionally, save the token to localStorage
  setToken(token: string): void {
    this.token = token; 
    localStorage.setItem('authToken', token);
  }

  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem(this.token) || sessionStorage.getItem(this.token);
  }

// Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.token);
    sessionStorage.removeItem(this.token);
  }
}
