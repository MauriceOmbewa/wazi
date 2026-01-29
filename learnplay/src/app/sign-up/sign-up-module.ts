import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpRoutingModule } from './sign-up-page-routing-module'; 
import { SignUp } from './components/sign-up/sign-up';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SignUpRoutingModule,
    SignUp
  ]
})
export class SignUpModule { }
