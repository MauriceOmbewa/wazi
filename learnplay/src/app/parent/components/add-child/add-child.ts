import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-child',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-child.html',
  styleUrl: './add-child.css',
})
export class AddChild {
  childName = '';
  dateOfBirth = '';
  currentGrade = '';
  selectedAvatar = '';

  avatars = ['👦', '👧', '👦🏽', '👧🏽', '🐻'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onCreateProfile() {
    console.log('Creating profile:', {
      name: this.childName,
      dob: this.dateOfBirth,
      grade: this.currentGrade,
      avatar: this.selectedAvatar
    });
    // Navigate back to parent dashboard
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBackToDashboard() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}