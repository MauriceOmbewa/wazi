import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBar } from '../../reusable/progress-bar/progress-bar';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-content',
  imports: [
    NgClass,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    ProgressBar, 
  ],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent {
  userName = 'Kwame';

  subjects = [
    {
      name: 'Math',
      progress: 65,
      points: 450,
      description: 'Numbers and fun!',
      icon: '/assets/icons/maths.png',
      bg: 'bg-[linear-gradient(134.45deg,#F8C96C_15.3%,#FCA780_81.76%)]',
      color: 'text-orange-600',
      gradient: 'linear-gradient(to right, #FAC815, #F97616)',
      link: '/math-subject',
    },
    {
      name: 'Science',
      progress: 40,
      points: 320,
      description: 'Discover the world!',
      icon: '/assets/icons/microscope.png',
      bg: 'bg-[linear-gradient(134.45deg,#67ECA3_15.3%,#43D785_81.76%)]',
      color: 'text-green-600',
      gradient: 'linear-gradient(to right, #49D888, #3C89ED)',
      link: '/science-subject',
    },
    {
      name: 'English',
      progress: 80,
      points: 680,
      description: 'Read and write!',
      icon: '/assets/icons/book.png',
      bg: 'bg-[linear-gradient(134.45deg,#B1EAE9_15.3%,#F2D9E4_81.76%)]',
      color: 'text-blue-600',
      gradient: 'linear-gradient(to right, #62A2F9, #A757F7)',
      link: '/english-subject',
    },
    {
      name: 'Art',
      progress: 25,
      points: 180,
      description: 'Create beautiful things!',
      icon: '/assets/icons/art.png',
      bg: 'bg-[linear-gradient(134.45deg,#D6C3FC_15.3%,#9CC4FC_81.76%)]',
      color: 'text-purple-600',
      gradient: 'linear-gradient(to right, #C57CF0, #EA4C9F)',
      link: '/art-subject',
    },
  ];

  constructor(private router: Router,private route: ActivatedRoute) {}

  onSelectSubject(subjectName: string) {
    console.log('Subject clicked:', subjectName);
    console.log('Navigating to:', subjectName.toLowerCase());
    this.router.navigate(['subject', subjectName.toLowerCase()], { relativeTo: this.route });
  }
}
