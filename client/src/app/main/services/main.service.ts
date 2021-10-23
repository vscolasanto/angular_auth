import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Person } from '../models/person';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('api/people')
      .pipe(
        catchError((err) => {
          console.error(err)
          return throwError(err);
        })
      );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('api/products')
      .pipe(
        catchError((err) => {
          console.error(err)
          return throwError(err);
        })
      );
  }
}
