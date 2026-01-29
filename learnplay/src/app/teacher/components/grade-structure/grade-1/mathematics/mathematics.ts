import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Topic {
  id: number;
  name: string;
  description: string;
  subtopicsCount: number;
  quizzesCount: number;
  icon?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-[#FDFDFE] font-sans p-6 md:p-10 text-slate-800">
      <div class="max-w-6xl mx-auto">
        
        <!-- Back Navigation -->
        <a (click)="goBackToGrade1()" class="inline-flex items-center text-[#9333EA] hover:text-purple-700 font-[Fredoka] font-bold gap-2 mb-8 transition-colors group cursor-pointer" style="font-size: 25px; line-height: 27px; letter-spacing: -0.4px; vertical-align: middle;">
          <svg class="group-hover:-translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to grades
        </a>

        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 class="font-[Fredoka] font-bold text-[65px] leading-[64px] tracking-[-0.4px] text-left text-[#374151] mb-3">Mathematics Topics</h1>
            <p class="font-[Fredoka] font-normal text-[30px] leading-[39px] tracking-[-0.4px] text-[#374151]">Create and manage topics for this subject</p>
          </div>

          <button 
            (click)="toggleForm()"
            class="text-white flex items-center gap-2 transform hover:-translate-y-0.5 select-none transition-all duration-200"
            style="width: 256px; height: 83px; padding: 20px 55px; gap: 10px; border-radius: 20px; background: linear-gradient(90deg, #4ADE80 0%, #687AE4 100%); font-family: Fredoka; font-weight: 600; font-size: 25px; line-height: 43px; letter-spacing: -0.4px; text-align: center; vertical-align: middle;"
          >
            <span class="text-xl leading-none mb-0.5" *ngIf="!isFormVisible">+</span> 
            <span class="text-xl leading-none mb-0.5" *ngIf="isFormVisible">✕</span>
            {{ isFormVisible ? 'Close Form' : 'Add topic' }}
          </button>
        </div>

        <!-- Add New Topic Form -->
        <div *ngIf="isFormVisible" class="bg-white border-4 border-emerald-400 rounded-2xl p-8 mb-10 shadow-sm animate-fade-in">
          <h2 class="font-[Fredoka] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-left text-[#374151] mb-6">Add New Topic</h2>
          
          <div class="space-y-6">
             <!-- Topic Name -->
             <div>
                <label class="block font-[Fredoka] font-semibold text-[25px] leading-[20px] tracking-[-0.4px] text-left text-[#374151] mb-2">Topic Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="newTopic.name"
                  placeholder="e.g Algebra"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
                />
             </div>

             <!-- Topic Icon -->
             <div>
                <label class="block font-[Fredoka] font-semibold text-[25px] leading-[20px] tracking-[-0.4px] text-left text-[#374151] mb-2">Topic Icon (optional)</label>
                <input 
                  type="text" 
                  [(ngModel)]="newTopic.icon"
                  placeholder="..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
                />
             </div>

             <!-- Description -->
             <div>
                <label class="block font-[Fredoka] font-semibold text-[25px] leading-[20px] tracking-[-0.4px] text-left text-[#374151] mb-2">Description</label>
                <textarea 
                  [(ngModel)]="newTopic.description"
                  placeholder="Brief description..."
                  rows="3"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white resize-y"
                ></textarea>
             </div>
             
             <!-- Buttons -->
             <div class="flex gap-4 pt-2">
                <button 
                  (click)="saveTopic()"
                  [disabled]="!newTopic.name"
                  [class.opacity-50]="!newTopic.name"
                  class="bg-[#10B981] hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors"
                >
                  Save Topic
                </button>
                <button 
                  (click)="toggleForm()" 
                  class="bg-gray-200 hover:bg-gray-300 text-slate-600 font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Cancel
                </button>
             </div>
          </div>
        </div>

        <!-- Topics List -->
        <div class="space-y-5">
          
          <!-- Topic Item Loop -->
          <div *ngFor="let topic of topics" 
               (click)="navigateToSubtopic(topic.name)"
               class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300 cursor-pointer">
            
            <!-- Left Side: Content -->
            <div class="flex-1">
              <h3 class="font-[Fredoka] font-semibold text-[35px] leading-[40px] tracking-[-0.4px] text-left text-[#374151] mb-2">{{ topic.name }}</h3>
              <p class="font-[Fredoka] font-normal text-[22px] leading-[39px] tracking-[-0.4px] text-left text-[#374151] font-medium mb-5">{{ topic.description }}</p>
              
              <div class="flex flex-wrap gap-3">
                <span class="bg-[#D1FAE5] text-[#059669] px-4 py-2 rounded-full flex items-center gap-1.5" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                  {{ topic.subtopicsCount }} subtopics
                </span>
                <span class="bg-[#F3E8FF] text-[#9333EA] px-4 py-2 rounded-full flex items-center gap-1.5" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                  {{ topic.quizzesCount }} quizes
                </span>
              </div>
            </div>

            <!-- Right Side: Actions -->
            <div class="flex flex-wrap items-center gap-3">
              <!-- Topic Quiz Button -->
              <button class="flex items-center gap-2 bg-[#F3E8FF] hover:bg-purple-200 text-[#9333EA] px-5 py-2.5 rounded-xl transition-colors" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                <img src="assets/icons/image 38.png" alt="Quiz Icon" class="w-5 h-5" /> Topic Quiz
              </button>
              
              <!-- Edit Button -->
              <button (click)="editTopic(topic)" class="bg-[#E0E7FF] hover:bg-indigo-200 text-[#4338CA] px-6 py-2.5 rounded-xl transition-colors" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                Edit
              </button>
              
              <!-- Delete Button -->
              <button (click)="deleteTopic(topic.id)" class="bg-[#FEE2E2] hover:bg-red-200 text-[#DC2626] px-6 py-2.5 rounded-xl transition-colors" style="font-family: Fredoka; font-weight: 600; font-style: SemiBold; font-size: 20px; line-height: 40px; letter-spacing: -0.4px; vertical-align: middle;">
                Delete
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  `
})
export class MathematicsComponent {
  constructor(private router: Router) {}

  isFormVisible = false;
  editingTopic: Topic | null = null;
  
  newTopic = {
    name: '',
    icon: '',
    description: ''
  };

  topics: Topic[] = [
    {
      id: 1,
      name: 'Algebra',
      description: 'Basic algebra concepts',
      subtopicsCount: 6,
      quizzesCount: 2
    },
    {
      id: 2,
      name: 'Geometry',
      description: 'Shapes and measurements',
      subtopicsCount: 6,
      quizzesCount: 2
    }
  ];

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      // Reset form if closed without saving
      this.resetForm();
    }
  }

  resetForm() {
    this.newTopic = {
      name: '',
      icon: '',
      description: ''
    };
  }

  saveTopic() {
    if (this.newTopic.name) {
      if (this.editingTopic) {
        // Update existing topic
        this.editingTopic.name = this.newTopic.name;
        this.editingTopic.description = this.newTopic.description || 'No description provided';
        this.editingTopic.icon = this.newTopic.icon;
        this.editingTopic = null;
      } else {
        // Add new topic
        const topicToAdd: Topic = {
          id: Date.now(),
          name: this.newTopic.name,
          description: this.newTopic.description || 'No description provided',
          subtopicsCount: 0,
          quizzesCount: 0,
          icon: this.newTopic.icon
        };
        this.topics.unshift(topicToAdd);
      }
      this.toggleForm();
    }
  }

  editTopic(topic: Topic) {
    this.editingTopic = topic;
    this.newTopic = {
      name: topic.name,
      icon: topic.icon || '',
      description: topic.description
    };
    this.isFormVisible = true;
  }

  deleteTopic(id: number) {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topics = this.topics.filter(topic => topic.id !== id);
    }
  }

  navigateToSubtopic(topicName: string) {
    if (topicName === 'Algebra') {
      this.router.navigate(['teacher', 'grade1', 'mathematics', 'algebra']);
    }
  }

  goBackToGrade1() {
    this.router.navigate(['teacher', 'grade1']);
  }
}