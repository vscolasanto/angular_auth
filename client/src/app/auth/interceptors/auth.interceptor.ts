import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

import { environment as env } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.getFromLocalStorage(env.token_LS);

    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: token }
      });
      return next.handle(authReq)
        .pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.authService.logout();
              }
            }
            return throwError(err);
          })
        );
    }
    return next.handle(req);
  }
}
