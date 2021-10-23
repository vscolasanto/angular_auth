import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Credentials } from '../models/credentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    const credentials: Credentials = { ...this.loginForm.value };

    this.authService.login(credentials).subscribe(
      (response) => {
        if (response) {
          this.snackbarService.open('Success', 'OK', 'success-snackbar');
          this.router.navigateByUrl('/main/people');
        }
      },
      (err) => this.loading = false
    );
  }
}
