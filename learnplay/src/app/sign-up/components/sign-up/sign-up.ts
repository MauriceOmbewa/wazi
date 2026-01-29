import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import { GoogleAuthService } from '../../../services/google-auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(private router: Router, private userRoleService: UserRoleService, private googleAuth: GoogleAuthService) {}

  navigateToSignIn() {
    this.router.navigate(['/sign-up/sign-in']);
  }

  navigateToWhoAreYou() {
    this.router.navigate(['/who-are-you']);
  }

  onSignUp() {
    const redirectPath = this.userRoleService.getRedirectPath();
    this.router.navigate([redirectPath]);
  }

  async onGoogleSignUp() {
    try {
      const response = await this.googleAuth.simpleGoogleSignIn();
      const userInfo = this.googleAuth.decodeJWT(response.credential);
      
      // Handle successful Google sign-up
      console.log('Google Sign-Up successful:', userInfo);
      
      // Store user info if needed
      localStorage.setItem('googleUser', JSON.stringify(userInfo));
      
      // Redirect based on role
      const redirectPath = this.userRoleService.getRedirectPath();
      this.router.navigate([redirectPath]);
    } catch (error) {
      console.error('Google Sign-Up failed:', error);
      // Fallback to regular sign-up or show error message
      alert('Google Sign-Up failed. Please try again or use regular sign-up.');
    }
  }
}
