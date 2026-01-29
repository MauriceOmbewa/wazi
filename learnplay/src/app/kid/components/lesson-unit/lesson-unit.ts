import { Component, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';

// Define Data Structures
interface Lesson {
  id: string; // Added ID for navigation
  title: string;
  type: string;
  time: string;
  status: string;
}

interface UnitData {
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

@Component({
  selector: 'app-lesson-unit',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './lesson-unit.html',
  styleUrl: './lesson-unit.css',
})
export class LessonUnit implements OnInit {
  // Implement OnInit

  // Dynamic Data Containers
  currentUnit: UnitData = {
    title: 'Loading...',
    subtitle: '',
    lessons: [],
  };

  selectedLesson: any = null;

  // DATABASE: Mock data for different units
  unitDatabase: { [key: string]: UnitData } = {
    'subtraction-fun': {
      title: 'Subtraction Fun 🎯',
      subtitle: '5 lessons to master',
      lessons: [
        {
          id: 'intro',
          title: '1. What is Subtraction?',
          type: 'Video',
          time: '5 min',
          status: 'Complete',
        },
        {
          id: 'small-numbers',
          title: '2. Subtracting small numbers',
          type: 'Video',
          time: '5 min',
          status: 'Complete',
        },
        {
          id: 'practice',
          title: '3. Maths practice',
          type: 'Video',
          time: '5 min',
          status: 'Complete',
        },
        {
          id: 'word-problems',
          title: '4. Subtraction word problems',
          type: 'Video',
          time: '5 min',
          status: 'Start',
        },
        {
          id: 'challenge',
           title: '5. Subtraction challenge',
           type: 'Video', 
           time: '5 min', 
           status: 'Locked' ,
        },
        {
          id: 'quiz',
          title: 'Unit Quiz',
          type: 'Complete all lessons to unlock!',
          time: '',
          status: 'Locked',
        },
      ],
    },
    'addition-basics': {
      title: 'Addition Basics ➕',
      subtitle: '4 lessons to master',
      lessons: [
        {
          id: 'intro-add',
          title: '1. What is Addition?',
          type: 'Video',
          time: '5 min',
          status: 'Start',
        },
        {
          id: 'quiz',
          title: 'Unit Quiz',
          type: 'Complete all lessons to unlock!',
          time: '',
          status: 'Locked',
        },
      ],
    },
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // 1. Get the Unit ID from the URL
    this.route.paramMap.subscribe((params) => {
      const unitId = params.get('unitId');

      // 2. Load the correct data
      if (unitId && this.unitDatabase[unitId]) {
        this.currentUnit = this.unitDatabase[unitId];
        this.selectedLesson = this.currentUnit.lessons.find((l) => this.isQuiz(l));
      }
    });
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  // --- Logic ---

  /** Handle Card Click */
  selectLesson(lesson: any) {
    // Prevent selecting locked lessons if desired
    if (lesson.status === 'Locked' && !this.isQuiz(lesson)) return;

    this.selectedLesson = lesson;
  }

  isQuiz(lesson: any): boolean {
    return lesson.title.includes('Unit Quiz');
  }

  getImage(lesson: any): string {
    if (this.isQuiz(lesson)) return 'assets/icons/cup.png';
    if (lesson.status === 'Complete') return 'assets/icons/tick.png';
    if (lesson.status === 'Locked') return 'assets/icons/lock.png';
    return 'assets/icons/video.png';
  }

  getIconBgClass(lesson: any): string {
    if (this.isQuiz(lesson)) return 'bg-[#C999F5]';
    if (lesson.status === 'Complete') return 'bg-[#B3F6D1]';
    if (lesson.status === 'Locked') return 'bg-red-300';
    return 'bg-[#EAD09B]';
  }

  getIconColorClass(lesson: any): string {
    if (this.isQuiz(lesson)) return 'text-[#a855f7]';
    if (lesson.status === 'Complete') return 'text-[#2ac769]';
    if (lesson.status === 'Locked') return 'text-gray-500';
    return 'text-orange-600';
  }

  /** Returns border color ONLY for the selected item */
  getBorderColor(lesson: any): string {
    if (this.isQuiz(lesson)) return '#C999F5'; // Purple
    if (lesson.status === 'Complete') return '#16A34A'; // Green
    if (lesson.status === 'Locked') return '#BABABA'; // Grey
    return '#EAD09B'; // Yellow/Orange
  }

  getStatusColor(lesson: any): string {
    if (lesson.status === 'Complete') return 'text-[#22c55e]';
    if (lesson.status === 'Start') return 'text-orange-500';
    if (lesson.status === 'Locked') return 'text-red-500';
    return 'text-gray-400';
  }

  onSelectLesson(lesson: Lesson) {
    if (lesson.status === 'Locked' && !this.isQuiz(lesson)) return;

    // Navigate to ./lesson/{lessonId} relative to current path
    this.router.navigate(['lesson', lesson.id], { relativeTo: this.route });
  }
}
