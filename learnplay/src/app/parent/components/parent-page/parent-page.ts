import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Child {
  id: number;
  name: string;
  age: number;
  progress: number;
  totalPoints: number;
  activeSubjects: number;
  avatar: string;
}

@Component({
  selector: 'app-parent-page',
  imports: [CommonModule],
  templateUrl: './parent-page.html',
  styleUrl: './parent-page.css',
})
export class ParentPage {
  constructor(private router: Router, private route: ActivatedRoute) {}

  children: Child[] = [
    {
      id: 1,
      name: 'Kwame',
      age: 2,
      progress: 58,
      totalPoints: 1250,
      activeSubjects: 4,
      avatar: '👦'
    },
    {
      id: 2,
      name: 'Muga',
      age: 2,
      progress: 58,
      totalPoints: 1250,
      activeSubjects: 4,
      avatar: '👦'
    },
    {
      id: 3,
      name: 'Messi',
      age: 10,
      progress: 76,
      totalPoints: 150,
      activeSubjects: 7,
      avatar: '👦'
    },
    {
      id: 4,
      name: 'Ama',
      age: 4,
      progress: 72,
      totalPoints: 1850,
      activeSubjects: 6,
      avatar: '👧'
    }
  ];

  onChildClick(child: Child) {
    this.router.navigate(['child', child.id], { relativeTo: this.route });
  }

  onAddChild() {
    this.router.navigate(['add-child'], { relativeTo: this.route });
  }
}
