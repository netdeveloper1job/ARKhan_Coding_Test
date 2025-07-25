import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../core/service/http.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule ,RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private router: Router, 
    private httpService: HttpService, 
    private fb: FormBuilder, 
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const url = environment.apiUrl + '/auth/login';
    this.httpService.post<any>(url, this.form.value).subscribe({
      next: (response) => {
        this.authService.setAuthToken(response.data.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed: ' + err);
      }
    });
  }
}