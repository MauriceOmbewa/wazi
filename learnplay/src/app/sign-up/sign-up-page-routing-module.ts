import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUp } from './components/sign-up/sign-up.js';
import { SignIn } from './components/sign-in/sign-in.js';

const routes: Routes = [
  {
    path: '',
    component: SignUp
  },
  {
    path: 'sign-in',
    component: SignIn
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }