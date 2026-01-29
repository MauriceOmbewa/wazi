import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-manage-lessons-notes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './manage-lessons-notes.html',
  styleUrl: './manage-lessons-notes.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: '0' })),
      state('expanded', style({ height: '*', overflow: 'visible', opacity: '1' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class ManageLessonsNotes {
  isFormOpen = false;
  lessonForm: FormGroup;

  // Mock Data for Dropdowns
  subjects = ['Mathematics', 'Science', 'English'];
  units = ['Unit 1: Addition Basics', 'Unit 2: Subtraction Fun', 'Unit 3: Geometry'];
  
  // Note Types with associated icons (for display logic)
  noteTypes = [
    { value: 'key_concept', label: 'Key Concept', icon: 'lightbulb', color: 'text-yellow-600' },
    { value: 'steps', label: 'Steps to Solve', icon: 'format_list_numbered', color: 'text-gray-600' },
    { value: 'example', label: 'Example', icon: 'edit', color: 'text-blue-600' },
    { value: 'practice', label: 'Practice Tip', icon: 'error_outline', color: 'text-red-500' }
  ];

  // Mock Data for Existing Lessons (Left Image)
  existingLessons = [
    {
      id: 1,
      subject: 'Mathematics',
      unit: 'Math - Unit 2: Subtraction Fun',
      duration: '8 minutes',
      notesCount: 5,
      notes: [
        { type: 'key_concept', text: 'Word problems help us use subtraction in real life' },
        { type: 'steps', text: '5 steps listed' },
        { type: 'example', text: 'Maria has 15 apples problem' },
        { type: 'practice', text: 'Draw pictures to visualize' },
        { type: 'practice', text: 'Draw pictures to visualize' }
      ]
    },
    {
      id: 2,
      subject: 'Mathematics',
      unit: 'Math - Unit 2: Subtraction Fun',
      duration: '8 minutes',
      notesCount: 5,
      notes: [
        { type: 'key_concept', text: 'Word problems help us use subtraction in real life' },
        { type: 'steps', text: '5 steps listed' },
        { type: 'example', text: 'Maria has 15 apples problem' },
        { type: 'practice', text: 'Draw pictures to visualize' },
        { type: 'practice', text: 'Draw pictures to visualize' }
      ]
    },
    {
      id: 3,
      subject: 'Mathematics',
      unit: 'Math - Unit 2: Subtraction Fun',
      duration: '8 minutes',
      notesCount: 0,
      notes: [] 
    }
  ];

  constructor(private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
      subject: ['', Validators.required],
      unit: ['', Validators.required],
      lessonName: ['', Validators.required],
      videoUrl: [''],
      notes: this.fb.array([]) // Initialize empty notes array
    });

    // Add one default note to start with (like the design)
    this.addNote();
  }

  // Helper to access the notes FormArray in HTML
  get notes() {
    return this.lessonForm.get('notes') as FormArray;
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    if (!this.isFormOpen) {
      // Optional: reset form on close
      // this.lessonForm.reset(); 
    }
  }

  addNote() {
    const noteGroup = this.fb.group({
      type: ['key_concept', Validators.required],
      title: [''],
      content: ['']
    });
    this.notes.push(noteGroup);
  }

  removeNote(index: number) {
    this.notes.removeAt(index);
  }

  saveLesson() {
    if (this.lessonForm.valid) {
      console.log('Saved:', this.lessonForm.value);
      this.isFormOpen = false;
      this.lessonForm.reset();
      // Re-initialize with one empty note
      while (this.notes.length !== 0) {
        this.notes.removeAt(0);
      }
      this.addNote();
    }
  }

  cancel() {
    this.isFormOpen = false;
  }

  // Helper to get icon for existing list
  getIconForType(typeVal: string): string {
    const found = this.noteTypes.find(t => t.value === typeVal);
    return found ? found.icon : 'notes';
  }
  
  getColorForType(typeVal: string): string {
    const found = this.noteTypes.find(t => t.value === typeVal);
    return found ? found.color : 'text-gray-500';
  }
}