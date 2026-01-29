import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Profile } from './profile/profile';
import { ContentManagement } from './components/content-management/content-management';
import { ManageExamsQuizzes } from './components/manage-exams-quizzes/manage-exams-quizzes';
import { ManageLessonsNotes } from './components/manage-lessons-notes/manage-lessons-notes';
import { ManageSubject } from './components/manage-subject/manage-subject';
import { ManageGradesComponent } from './components/manage-grades/manage-grades';
import { GradeStructure } from './components/grade-structure/grade-structure';
import { Grade1StructureComponent } from './components/grade-structure/grade-1/grade-1-structure';
import { Grade2StructureComponent } from './components/grade-structure/grade-2/grade-2-structure';
import { MathematicsComponent } from './components/grade-structure/grade-1/mathematics/mathematics';
import { AlgebraComponent } from './components/grade-structure/grade-1/mathematics/subtopics/algebra/algebra';

const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: '', component: ContentManagement },
      { path: 'profile', component: Profile },
      { path: 'exams', component: ManageExamsQuizzes  },
      { path: 'lessons', component: ManageLessonsNotes  },
      { path: 'subjects', component: ManageSubject  },
      { path: 'grades', component: ManageGradesComponent },
      { path: 'content', component: GradeStructure },
      { path: 'grade1', component: Grade1StructureComponent },
      { path: 'grade2', component: Grade2StructureComponent },
      { path: 'grade1/mathematics', component: MathematicsComponent },
      { path: 'grade1/mathematics/algebra', component: AlgebraComponent },
      { path: 'grade1/mathematics/algebra/addition', component: ManageLessonsNotes },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}