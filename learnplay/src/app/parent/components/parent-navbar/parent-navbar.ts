import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-navbar',
  imports: [],
  templateUrl: './parent-navbar.html',
  styleUrl: './parent-navbar.css',
})
export class ParentNavbar {
  private router = inject(Router);
  userName = 'Kenan';

  get isChildDetailsPage(): boolean {
    return this.router.url.includes('/parent/child/');
  }

  onUserProfileClick() {
    console.log('User profile clicked');
    // Open user profile menu or navigate to profile page
  }
}
