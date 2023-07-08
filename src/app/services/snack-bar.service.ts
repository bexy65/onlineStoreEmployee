import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: string = 'Close') {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };

    this.snackBar.open(message, action, config);
  }
}
