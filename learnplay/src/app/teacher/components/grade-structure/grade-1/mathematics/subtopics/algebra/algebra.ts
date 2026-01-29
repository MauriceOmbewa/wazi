import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

interface Subtopic {
  id: number;
  name: string;
  description: string;
  videoCount: number;
  noteCount: number;
  quizCount: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#FDFDFE] font-sans p-6 md:p-10 text-slate-800">
      <div class="max-w-6xl mx-auto">
        
        <!-- Back Navigation -->
        <a href="/teacher/grade1/mathematics" class="inline-flex items-center text-[#9333EA] hover:text-purple-700 font-[Fredoka] font-bold gap-2 mb-8 transition-colors group" style="font-size: 25px; line-height: 27px; letter-spacing: -0.4px; vertical-align: middle;">
          <svg class="group-hover:-translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to grades
        </a>

        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 class="font-[Fredoka] font-bold text-[65px] leading-[64px] tracking-[-0.4px] text-[#374151] mb-3">Algebra Subtopics</h1>
            <p class="font-[Fredoka] font-normal text-[30px] leading-[39px] tracking-[-0.4px] text-[#374151]">Create subtopics (specific lessons) for this topic</p>
          </div>

          <button class="text-white flex items-center gap-2 transform hover:-translate-y-0.5 transition-all duration-200" style="width: 296px; height: 83px; padding: 20px 55px; gap: 10px; border-radius: 20px; background: linear-gradient(90deg, #4ADE80 0%, #687AE4 100%); font-family: Fredoka; font-weight: 600; font-size: 25px; line-height: 43px; letter-spacing: -0.4px; text-align: center; vertical-align: middle;">
            <span class="text-xl leading-none mb-0.5">+</span> Add subtopic
          </button>
        </div>

        <!-- Subtopics List -->
        <div class="space-y-5">
          
          <!-- Subtopic Item Loop -->
          <div *ngFor="let subtopic of subtopics" class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300">
            
            <!-- Left Side: Content -->
            <div class="flex-1">
              <a [href]="subtopic.name.toLowerCase() === 'addition' || subtopic.name.toLowerCase() === 'subtraction' ? '/teacher/lessons' : '#'" class="block" [style.pointer-events]="subtopic.name.toLowerCase() === 'addition' || subtopic.name.toLowerCase() === 'subtraction' ? 'auto' : 'none'">
                <h3 class="font-[Fredoka] font-semibold text-[35px] leading-[40px] tracking-[-0.4px] text-left text-[#374151] mb-2">{{ subtopic.name }}</h3>
                <p class="font-[Fredoka] font-normal text-[22px] leading-[39px] tracking-[-0.4px] text-left text-[#374151] font-medium mb-5">{{ subtopic.description }}</p>
                
                <div class="flex flex-wrap gap-3" *ngIf="subtopic.videoCount > 0 || subtopic.noteCount > 0 || subtopic.quizCount > 0">
                  <span class="bg-[#D1FAE5] text-[#059669] px-4 py-2 rounded-full flex items-center gap-1.5" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                    {{ subtopic.videoCount }} video
                  </span>
                  <span class="bg-[#F3E8FF] text-[#9333EA] px-4 py-2 rounded-full flex items-center gap-1.5" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                    {{ subtopic.noteCount }} notes
                  </span>
                  <span class="bg-[#F3E8FF] text-[#9333EA] px-4 py-2 rounded-full flex items-center gap-1.5" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                    {{ subtopic.quizCount }} quiz
                  </span>
                </div>
                <div *ngIf="subtopic.videoCount === 0 && subtopic.noteCount === 0 && subtopic.quizCount === 0">
                  <span class="bg-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-bold">
                    No content yet
                  </span>
                </div>
              </a>
            </div>

            <!-- Right Side: Actions -->
            <div class="flex flex-wrap items-center gap-3">
              <!-- Create Quiz Button -->
              <button class="flex items-center gap-2 bg-[#F3E8FF] hover:bg-purple-200 text-[#9333EA] px-5 py-2.5 rounded-xl transition-colors" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                <img src="assets/icons/image 38.png" alt="Quiz Icon" class="w-5 h-5" /> Create Quiz
              </button>
              
              <!-- Edit Button -->
              <button class="bg-[#E0E7FF] hover:bg-indigo-200 text-[#4338CA] px-6 py-2.5 rounded-xl transition-colors" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                Edit
              </button>
              
              <!-- Delete Button -->
              <button class="bg-[#FEE2E2] hover:bg-red-200 text-[#DC2626] px-6 py-2.5 rounded-xl transition-colors" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                Delete
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  `
})
export class AlgebraComponent {
  subtopics: Subtopic[] = [
    {
      id: 1,
      name: 'Addition',
      description: 'Learn to add numbers',
      videoCount: 1,
      noteCount: 5,
      quizCount: 1
    },
    {
      id: 2,
      name: 'Subtraction',
      description: 'Learn to subtract numbers',
      videoCount: 1,
      noteCount: 5,
      quizCount: 1
    },
    {
      id: 3,
      name: 'Multiplication',
      description: 'Learn to multiply numbers',
      videoCount: 0,
      noteCount: 0,
      quizCount: 0
    }
  ];
}