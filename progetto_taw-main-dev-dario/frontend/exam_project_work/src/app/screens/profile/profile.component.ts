import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { NotificationsComponent } from "../../custom/notifications/notifications.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EditProfileComponent, NotificationsComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private authService: ApiService) { }
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }
  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
    // Redirect or handle post-logout actions here
  }
}
