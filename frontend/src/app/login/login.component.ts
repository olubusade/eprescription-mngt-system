import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email : string = '';
  username : string = '';
  password : string = '';
  errorMessage : string = '';
  loading: boolean = false;
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.toastr.error('Please enter both username and password!', 'Login Error');
      return;
    }
    this.loading = true;
    const loginData = { username: this.username, password: this.password };
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res:any) => {
        localStorage.setItem('token', res.token); // Store token
        this.toastr.success('Login successful!', 'Welcome');
        this.router.navigate(['/dashboard']); // Redirect after login
      },
      error: (err:any) => {
        this.toastr.error(err.error.message || 'Invalid credentials!', 'Login Failed');
        this.loading = false;
      }
    });
  }
}
