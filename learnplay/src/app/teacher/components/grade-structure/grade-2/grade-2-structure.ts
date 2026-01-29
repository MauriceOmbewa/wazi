import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade-2-structure',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#F3F4F8] font-sans flex flex-col">
      <div class="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        <!-- Back Navigation -->
        <a href="#" class="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold text-sm gap-2 mb-6 transition-colors group">
          <svg class="group-hover:-translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to grades
        </a>

        <!-- Header -->
        <div class="mb-10">
          <h1 class="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">Grade 2 Subjects</h1>
          <p class="text-slate-500 text-lg">Select a subject to manage its content</p>
        </div>

        <!-- Subjects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div *ngFor="let subject of subjects" 
               (click)="navigateToSubject(subject.name)"
               class="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            
            <!-- Icon -->
            <div class="mb-6">
              <div *ngIf="subject.iconType === 'math'" class="w-14 h-14 bg-[#4A90E2] rounded-xl flex flex-wrap content-center justify-center gap-0.5 p-2 shadow-blue-200 shadow-lg transform rotate-[-5deg]">
                 <span class="text-white font-mono font-bold text-xs w-full text-center leading-none">1 2</span>
                 <span class="text-white font-mono font-bold text-xs w-full text-center leading-none">3 4</span>
              </div>
              
              <div *ngIf="subject.iconType === 'science'" class="text-6xl filter drop-shadow-md transform -translate-x-2">
                🔬
              </div>

              <div *ngIf="subject.iconType === 'english'" class="text-6xl filter drop-shadow-md transform -translate-x-2">
                📚
              </div>
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-bold text-slate-800 mb-2">{{ subject.name }}</h3>
            <p class="text-slate-500 mb-8">{{ subject.description }}</p>

            <!-- Stats -->
            <div class="flex flex-wrap gap-3">
              <span *ngFor="let stat of subject.stats" 
                [ngClass]="{
                  'bg-blue-100 text-blue-600': stat.color === 'blue',
                  'bg-emerald-100 text-emerald-600': stat.color === 'green'
                }"
                class="px-4 py-1.5 rounded-full font-bold text-sm"
              >
                {{ stat.value }}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  `
})
export class Grade2StructureComponent {
  constructor(private router: Router) {}

  subjects = [
    {
      name: 'Mathematics',
      description: 'Advanced numbers and operations',
      iconType: 'math',
      stats: [
        { label: 'topics', value: '7 topics', color: 'blue' },
        { label: 'subtopics', value: '35 subtopics', color: 'green' }
      ]
    },
    {
      name: 'Science',
      description: 'Explore the natural world',
      iconType: 'science',
      stats: [
        { label: 'subjects', value: '4 subjects', color: 'blue' },
        { label: 'topics', value: '16 topics', color: 'green' }
      ]
    },
    {
      name: 'English',
      description: 'Reading and writing skills',
      iconType: 'english',
      stats: [
        { label: 'subjects', value: '4 subjects', color: 'blue' },
        { label: 'topics', value: '18 topics', color: 'green' }
      ]
    }
  ];

  navigateToSubject(subjectName: string) {
    if (subjectName === 'Mathematics') {
      this.router.navigate(['teacher', 'grade2', 'mathematics']);
    }
  }
}