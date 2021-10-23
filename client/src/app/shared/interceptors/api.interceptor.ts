import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next:HttpHandler) {
    const apiUrl = req.clone({
      url: `${env.api_url}/${req.url}`
    });

    return next.handle(apiUrl);
  }
}
