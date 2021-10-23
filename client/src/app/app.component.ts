import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth/models/user';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated$: Observable<boolean> = new Observable();
  user$: Observable<User> = new Observable();

  constructor(
    private authService: AuthService
  ) {
    this.isAuthenticated();
  }

  isAuthenticated(): void {
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
