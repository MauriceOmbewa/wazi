import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import { GoogleAuthService } from '../../../services/google-auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  constructor(private router: Router, private userRoleService: UserRoleService, private googleAuth: GoogleAuthService) {}

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  navigateToWhoAreYou() {
    this.router.navigate(['/who-are-you']);
  }

  onSignIn() {
    // After successful sign-in, redirect based on role
    const redirectPath = this.userRoleService.getRedirectPath();
    this.router.navigate([redirectPath]);
  }

  async onGoogleSignIn() {
    try {
      const response = await this.googleAuth.simpleGoogleSignIn();
      const userInfo = this.googleAuth.decodeJWT(response.credential);
      
      // Handle successful Google sign-in
      console.log('Google Sign-In successful:', userInfo);
      
      // Store user info if needed
      localStorage.setItem('googleUser', JSON.stringify(userInfo));
      
      // Redirect based on role
      const redirectPath = this.userRoleService.getRedirectPath();
      this.router.navigate([redirectPath]);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      // Fallback to regular sign-in or show error message
      alert('Google Sign-In failed. Please try again or use regular sign-in.');
    }
  }
}
