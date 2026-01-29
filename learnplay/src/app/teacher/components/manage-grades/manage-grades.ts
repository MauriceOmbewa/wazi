import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface GradeLevel {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-manage-grades',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './manage-grades.html',
  styleUrl: './manage-grades.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        marginTop: '0px',
        marginBottom: '0px'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        marginTop: '20px',
        marginBottom: '20px'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class ManageGradesComponent {
  isFormOpen = false;
  gradeForm: FormGroup;

  // Mock data for the grade levels
  grades: GradeLevel[] = [
    { id: 1, name: 'Grade 1', description: 'Primary foundation level' },
    { id: 2, name: 'Grade 2', description: 'Primary foundation level' },
    { id: 3, name: 'Grade 3', description: 'Primary foundation level' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    if (!this.isFormOpen) {
      this.gradeForm.reset();
    }
  }

  saveGrade() {
    if (this.gradeForm.valid) {
      const formVal = this.gradeForm.value;

      const newGrade: GradeLevel = {
        id: Date.now(),
        name: formVal.name,
        description: formVal.description || 'No description'
      };

      this.grades.unshift(newGrade);
      this.isFormOpen = false;
      this.gradeForm.reset();
    }
  }

  cancel() {
    this.isFormOpen = false;
    this.gradeForm.reset();
  }

  editGrade(grade: GradeLevel) {
    console.log('Edit Grade clicked for:', grade.name);
  }

  deleteGrade(grade: GradeLevel) {
    this.grades = this.grades.filter(g => g.id !== grade.id);
  }

  nextStep() {
    console.log('Next Step clicked');
  }

  goBackToContentOverview() {
    this.router.navigate(['/teacher']).catch(() => {
      // Fallback if router navigation fails
      window.location.href = '/teacher';
    });
  }
}