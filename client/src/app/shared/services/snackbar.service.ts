import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  public open(
    message: string,
    action: string,
    panelClass: 'default-snackbar' | 'danger-snackbar' | 'warning-snackbar' | 'success-snackbar'
  ) {
    this.snackBar.open(message, action, { panelClass });
  }
}

