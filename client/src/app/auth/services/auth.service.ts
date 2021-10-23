import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';

import { StorageService } from './storage.service';
import { environment as env } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  private subLoggedIn$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private router: Router,
    private storageService: StorageService
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('auth/register', user)
      .pipe(
        catchError(err => {
          this.snackbarService.open(err.error.message, 'OK', 'danger-snackbar')
          return throwError(err)
        })
      );
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>('auth/login', credentials)
      .pipe(
        tap((user: User) => {
          this.storageService.saveLocalStorage(env.token_LS, user.token || '');
          this.subLoggedIn$.next(true);
          this.subUser$.next(user);
        }),
        catchError(err => {
          this.snackbarService.open(err.error.message, 'OK', 'danger-snackbar')
          return throwError(err)
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.storageService.getFromLocalStorage(env.token_LS);

    if (token && !this.subLoggedIn$.value) {
      return this.checkTokenValidation();
    }

    return this.subLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>('auth/user')
      .pipe(
        tap(user => {
          if (user) {
            this.storageService.saveLocalStorage(env.token_LS, user.token || '');
            this.subLoggedIn$.next(true);
            this.subUser$.next(user);
          }
        }),
        map(user => user ? true : false),
        catchError(err => {
          this.logout();
          return of(false);
        })
      );
  }

  getUser(): Observable<User> {
    return this.subUser$.asObservable();
  }

  logout() {
    this.storageService.removeFromLocalStorage(env.token_LS);
    this.subLoggedIn$.next(false);
    this.subUser$.next(null);
    this.router.navigateByUrl('/auth/login');
  }
}
