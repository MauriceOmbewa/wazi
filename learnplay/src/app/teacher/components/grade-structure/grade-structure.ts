import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade-structure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade-structure.html',
  styleUrls: ['./grade-structure.css']
})
export class GradeStructure {
  constructor(private router: Router) {}

  grades = [
    {
      name: 'Grade 1',
      description: 'Foundation level learning',
      subjectsCount: 4,
      topicsCount: 12
    },
    {
      name: 'Grade 2', 
      description: 'Building basic skills',
      subjectsCount: 5,
      topicsCount: 18
    },
    {
      name: 'Grade 3',
      description: 'Expanding knowledge base',
      subjectsCount: 6,
      topicsCount: 24
    }
  ];

  navigateToGrade(gradeName: string) {
    if (gradeName === 'Grade 1') {
      this.router.navigate(['teacher', 'grade1']);
    } else if (gradeName === 'Grade 2') {
      this.router.navigate(['teacher', 'grade2']);
    }
  }
}