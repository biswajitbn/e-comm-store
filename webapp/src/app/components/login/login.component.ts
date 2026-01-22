import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  authService = inject(AuthService);
  router = inject(Router);
  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe((result:any) => {
      alert('login successfully');
      console.log(result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user',JSON.stringify(result.user));
      this.router.navigateByUrl('/');
    })
  }

}
