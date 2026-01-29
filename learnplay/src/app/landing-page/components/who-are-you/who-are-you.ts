import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRoleService } from '../../../sign-up/services/user-role.service';

@Component({
  selector: 'app-who-are-you',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './who-are-you.html',
  styleUrl: './who-are-you.css'
})
export class WhoAreYouComponent {
  constructor(private router: Router, private userRoleService: UserRoleService) {}

  onSelectRole(role: 'kid' | 'parent' | 'teacher') {
    this.userRoleService.setRole(role);
    this.router.navigate(['/sign-up/sign-in']);
  }
}