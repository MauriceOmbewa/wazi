import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './feature-cards.html',
  styleUrls: ['./feature-cards.css'],
})
export class FeatureCards {
  constructor(private router: Router) {}

  cards = [
    { 
    icon: 'assets/icons/graduand.png', 
    title: 'Manage Grades', 
    desc: 'Create Grade Levels', 
    path: 'grades' 
  },
  { 
    icon: 'assets/icons/image 11.png', 
    title: 'Manage Subjects', 
    desc: 'Add, edit subjects', 
    path: 'subjects' 
  },
  
  { 
    icon: 'assets/icons/image 19.png', 
    title: 'Grade Structure', 
    desc: 'Build content hierarchy', 
    path: 'content' 
  },
  { 
    icon: 'assets/icons/image 23.png', 
    title: 'Manage Exams', 
    desc: 'Create quizzes', 
    path: 'exams' 
  }
];


 

  goTo(path: string) {
    this.router.navigate(['teacher', path]);
  }

  onImageError(event: any) {
    console.log('Image failed to load:', event.target.src);
    event.target.src = 'assets/icons/avatar.png'; // fallback image
  }

}
