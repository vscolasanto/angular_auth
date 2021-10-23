import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  saveLocalStorage(prop: string, value: string) {
    return localStorage.setItem(prop, value);
  }

  getFromLocalStorage(prop: string) {
    return localStorage.getItem(prop);
  }

  removeFromLocalStorage(prop: string) {
    return localStorage.removeItem(prop);
  }
}
