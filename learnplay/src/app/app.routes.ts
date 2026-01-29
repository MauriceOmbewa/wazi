import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./landing-page/landing-page-module').then(m => m.LandingPageModule)
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/sign-up-module.js').then(m => m.SignUpModule)
    },
    {   
        path: 'kid',
        loadChildren: () => import('./kid/kid-module').then(m => m.KidModule)
    },
    {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher-module').then(m => m.TeacherModule)
    },
    {
        path: 'parent',
        loadChildren: () => import('./parent/parent-module').then(m => m.ParentModule)
    }
];
