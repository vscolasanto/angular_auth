import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MustMatchValidator } from 'src/utils/validators/must-match.validator';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: [''],
    phone: [''],
    mobilephone: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6),]],
  }, { validator: MustMatchValidator('password', 'confirmPassword') });

  states: string[] = ['PR', 'MG', 'RJ', 'SP'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    let user: User = { ...this.formRegister.value };

    this.authService.register(user).subscribe(
      (response) => {
        this.snackbarService.open('User registered successfully!', 'OK', 'success-snackbar');
        this.router.navigateByUrl('/auth/login');
      }
    )
  }
}
