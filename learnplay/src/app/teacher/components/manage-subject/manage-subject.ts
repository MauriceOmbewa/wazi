import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- Types ---
export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface SubjectFormData {
  name: string;
  icon: string;
  description: string;
}

// --- Constants ---
export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    icon: 'assets/icons/image 9.png',
    description: 'Numbers, operations, and problem solving'
  },
  {
    id: '2',
    name: 'Science',
    icon: 'assets/icons/image 10.png',
    description: 'Explore the natural world'
  },
  {
    id: '3',
    name: 'English',
    icon: 'assets/icons/image 11.png',
    description: 'Language, reading, and writing'
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen px-4 sm:px-6 lg:px-[150px] py-6 font-sans text-slate-800">
  <div class="max-w-full sm:max-w-4xl mx-auto space-y-6">

    <!-- Back Navigation -->
    <a href="/teacher" class="inline-flex items-center font-[Fredoka] font-bold text-base sm:text-lg text-[#9333EA] gap-1 mb-2 hover:text-purple-700">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Back to content overview
    </a>

    <!-- Header + Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="font-[Fredoka] font-bold text-[65px] leading-[64px] tracking-[-0.4px] text-[#374151]">Manage Subjects</h1>
        <p class="font-[Fredoka] font-normal text-[30px] leading-[39px] tracking-[-0.4px] text-slate-500">Create subjects that can be assigned to grades</p>
      </div>
      <button 
        (click)="toggleForm()"
        class="w-[284px] h-[83px] text-white rounded-[20px] py-[20px] px-[55px] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-[10px] opacity-100"
        style="background: linear-gradient(90deg, #4ADE80 0%, #687AE4 100%); font-family: 'Fredoka'; font-weight: 600; font-size: 25px; line-height: 43px; letter-spacing: -0.4px; text-align: center; vertical-align: middle;"
      >
        <span class="text-lg" *ngIf="!isFormVisible">+</span> 
        <span class="text-lg" *ngIf="isFormVisible">×</span>
        {{ isFormVisible ? 'Close Form' : 'Add Subject' }}
      </button>
    </div>

    <!-- Add Subject Form -->
    <div *ngIf="isFormVisible" class="bg-white shadow-sm px-4 sm:px-[30px] py-6 sm:py-[51px] mb-6 rounded-[23px] border-[5px] border-[#4C9AFC] space-y-6">
      <h2 class="font-[Fredoka] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-left text-[#374151]">Add New Subject</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-[#374151] mb-2">Subject Name *</label>
            <input type="text" placeholder="e.g Mathematics" [(ngModel)]="formData.name" name="name"
              class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder-slate-400" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-[#374151] mb-2">Icon Path *</label>
            <input type="text" placeholder="e.g assets/icons/image 9.png" [(ngModel)]="formData.icon" name="icon"
              class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder-slate-400" required />
          </div>
        </div>
        <div>
          <label class="block text-sm font-bold text-[#374151] mb-2">Description</label>
          <textarea placeholder="Brief description..." [(ngModel)]="formData.description" name="description"
            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder-slate-400 min-h-[100px] resize-y"></textarea>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 mt-4">
          <button type="submit" class="px-6 py-2.5 bg-[#4A90E2] hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">Save Subject</button>
          <button type="button" (click)="toggleForm()" class="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-slate-700 font-semibold rounded-lg transition-colors">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Subject Cards -->
    <div class="space-y-4">
      <!-- Mobile Layout -->
      <div class="block sm:hidden space-y-4">
        <div *ngFor="let subject of subjects" class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="flex flex-col items-start text-left mb-4">
            <div class="w-28 h-28 rounded-lg flex items-center justify-center overflow-hidden mb-3">
              <img [src]="subject.icon" [alt]="subject.name" class="w-24 h-24 object-contain" />
            </div>
            <h3 class="font-[Fredoka] font-semibold text-[35px] leading-[40px] tracking-[-0.4px] text-[#374151] mb-1">{{ subject.name }}</h3>
            <p class="font-[Fredoka] font-normal text-[22px] leading-[39px] tracking-[-0.4px] text-slate-500">{{ subject.description }}</p>
          </div>
          <div class="flex gap-2 justify-start">
            <button (click)="handleEdit(subject.id)" class="px-4 py-1.5 bg-blue-100 text-blue-600 font-[Fredoka] font-semibold text-[20px] leading-[40px] tracking-[-0.4px] align-middle rounded-lg hover:bg-blue-200 transition-colors">Edit</button>
            <button (click)="handleDelete(subject.id)" class="px-4 py-1.5 bg-red-100 text-red-500 font-[Fredoka] font-semibold text-[20px] leading-[40px] tracking-[-0.4px] align-middle rounded-lg hover:bg-red-200 transition-colors">Delete</button>
          </div>
        </div>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden sm:block space-y-4">
        <div *ngFor="let subject of subjects" class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
              <img [src]="subject.icon" [alt]="subject.name" class="w-20 h-20 object-contain" />
            </div>
            <div>
              <h3 class="font-[Fredoka] font-semibold text-[35px] leading-[40px] tracking-[-0.4px] text-left text-[#374151]">{{ subject.name }}</h3>
              <p class="font-[Fredoka] font-normal text-[22px] leading-[39px] tracking-[-0.4px] text-left text-slate-500">{{ subject.description }}</p>
            </div>
          </div>
          <div class="flex gap-2 sm:gap-3 justify-end">
            <button (click)="handleEdit(subject.id)" class="px-4 py-1.5 bg-blue-100 text-blue-600 font-[Fredoka] font-semibold text-[20px] leading-[40px] tracking-[-0.4px] align-middle rounded-lg hover:bg-blue-200 transition-colors">Edit</button>
            <button (click)="handleDelete(subject.id)" class="px-4 py-1.5 bg-red-100 text-red-500 font-[Fredoka] font-semibold text-[20px] leading-[40px] tracking-[-0.4px] align-middle rounded-lg hover:bg-red-200 transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Next Step CTA -->
    <div class="mt-8 bg-blue-50/50 px-4 sm:px-[30px] py-6 sm:py-[35px] border border-[#BFDBFE] rounded-[23px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 class="font-[Fredoka] font-bold text-[35px] leading-[40px] tracking-[-0.4px] text-[#374151]">Next: Build Grade Structure</h3>
        <p class="font-[Fredoka] font-normal text-[22px] leading-[39px] tracking-[-0.4px] text-[#374151] mt-1">Now assign subjects to grades and create the content hierarchy</p>
      </div>
      <button class="w-[225px] h-[83px] text-white rounded-[20px] shadow-lg transition-all flex items-center justify-center" style="background: linear-gradient(90deg, #4ADE80 0%, #687AE4 100%); padding: 20px 55px; gap: 10px; opacity: 1; font-family: 'Fredoka'; font-weight: 600; font-size: 25px; line-height: 43px; letter-spacing: -0.4px; text-align: center; vertical-align: middle;">Next Step</button>
    </div>

  </div>
</div>

  `
})
export class ManageSubject {
  // State
  subjects: Subject[] = INITIAL_SUBJECTS;
  isFormVisible = false;
  
  formData: SubjectFormData = {
    name: '',
    icon: '',
    description: ''
  };

  // Methods
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.resetForm();
    }
  }

  resetForm() {
    this.formData = { name: '', icon: '', description: '' };
  }

  onSubmit() {
    if (this.formData.name && this.formData.icon) {
      const newSubject: Subject = {
        id: Date.now().toString(),
        ...this.formData
      };
      
      this.subjects = [...this.subjects, newSubject];
      this.isFormVisible = false;
      this.resetForm();
    }
  }

  handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjects = this.subjects.filter(s => s.id !== id);
    }
  }

  handleEdit(id: string) {
    console.log('Edit subject', id);
    // Logic to populate form for editing could go here
    this.isFormVisible = true;
  }
}