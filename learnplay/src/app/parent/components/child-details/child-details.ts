import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Activity {
  type: string;
  title: string;
  description: string;
  points: number;
  date: string;
  icon: string;
}

interface Subject {
  name: string;
  icon: string;
  completedUnits: number;
  totalUnits: number;
  points: number;
  progress: number;
}

interface Child {
  id: number;
  name: string;
  age: number;
  progress: number;
  totalPoints: number;
  activeSubjects: number;
  avatar: string;
  memberSince: string;
  unitsCompleted: number;
  quizzesPassed: number;
  dayStreak: number;
  subjects: Subject[];
  recentActivities: Activity[];
}

@Component({
  selector: 'app-child-details',
  imports: [CommonModule],
  templateUrl: './child-details.html',
  styleUrl: './child-details.css',
})
export class ChildDetails implements OnInit {
  child: Child | null = null;

  children: Child[] = [
    {
      id: 1,
      name: 'Kwame',
      age: 8,
      progress: 58,
      totalPoints: 1250,
      activeSubjects: 4,
      avatar: '👦',
      memberSince: 'Jan 2025',
      unitsCompleted: 4,
      quizzesPassed: 4,
      dayStreak: 7,
      subjects: [
        { name: 'Math', icon: 'maths', completedUnits: 3, totalUnits: 5, points: 1250, progress: 65 },
        { name: 'Science', icon: 'science', completedUnits: 3, totalUnits: 5, points: 1250, progress: 65 },
        { name: 'English', icon: 'english', completedUnits: 3, totalUnits: 5, points: 1250, progress: 65 }
      ],
      recentActivities: [
        { type: 'Achievement', title: 'Unlocked Badge: Subtraction Master', description: 'Achievement • Yesterday', points: 1250, date: 'Yesterday', icon: '🏆' },
        { type: 'Achievement', title: 'Unlocked Badge: Subtraction Master', description: 'Achievement • Yesterday', points: 1250, date: 'Yesterday', icon: '🏆' },
        { type: 'Achievement', title: 'Unlocked Badge: Subtraction Master', description: 'Achievement • Yesterday', points: 1250, date: 'Yesterday', icon: '🏆' }
      ]
    },
    {
      id: 2,
      name: 'Muga',
      age: 6,
      progress: 58,
      totalPoints: 1250,
      activeSubjects: 4,
      avatar: '👦',
      memberSince: 'Feb 2025',
      unitsCompleted: 3,
      quizzesPassed: 5,
      dayStreak: 12,
      subjects: [
        { name: 'Math', icon: '🔢', completedUnits: 2, totalUnits: 5, points: 800, progress: 40 },
        { name: 'Science', icon: '🧪', completedUnits: 4, totalUnits: 5, points: 1100, progress: 80 }
      ],
      recentActivities: [
        { type: 'Quiz', title: 'Completed Science Quiz', description: 'Quiz • 2 days ago', points: 500, date: '2 days ago', icon: '✅' }
      ]
    },
    {
      id: 3,
      name: 'Messi',
      age: 10,
      progress: 76,
      totalPoints: 150,
      activeSubjects: 7,
      avatar: '👦',
      memberSince: 'Mar 2025',
      unitsCompleted: 8,
      quizzesPassed: 6,
      dayStreak: 3,
      subjects: [
        { name: 'Math', icon: '🔢', completedUnits: 4, totalUnits: 5, points: 950, progress: 80 },
        { name: 'Science', icon: '🧪', completedUnits: 5, totalUnits: 5, points: 1250, progress: 100 },
        { name: 'English', icon: '📚', completedUnits: 2, totalUnits: 5, points: 600, progress: 40 }
      ],
      recentActivities: [
        { type: 'Unit', title: 'Completed Math Unit 4', description: 'Unit • Today', points: 300, date: 'Today', icon: '📚' }
      ]
    },
    {
      id: 4,
      name: 'Ama',
      age: 4,
      progress: 72,
      totalPoints: 1850,
      activeSubjects: 6,
      avatar: '👧',
      memberSince: 'Apr 2025',
      unitsCompleted: 5,
      quizzesPassed: 7,
      dayStreak: 15,
      subjects: [
        { name: 'Math', icon: '🔢', completedUnits: 3, totalUnits: 5, points: 1200, progress: 60 },
        { name: 'English', icon: '📚', completedUnits: 4, totalUnits: 5, points: 1400, progress: 80 }
      ],
      recentActivities: [
        { type: 'Achievement', title: 'Reading Streak: 10 days', description: 'Achievement • 3 days ago', points: 750, date: '3 days ago', icon: '🏆' }
      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const childId = Number(this.route.snapshot.paramMap.get('id'));
    this.child = this.children.find(c => c.id === childId) || null;
  }

  onBackToChildren() {
    this.router.navigate(['/parent']);
  }
}