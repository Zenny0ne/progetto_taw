import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [ RouterModule, FormsModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {
  constructor(private authService: ApiService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  // Method to handle logout
}
