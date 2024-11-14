import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertTypeEnum } from '../enums/alert-type.enum';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { AlertInterface } from '../models/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  showNotification(
    type: AlertTypeEnum,
    message: string,
    duration: number = 5000
  ): void {
    const alert: AlertInterface = {
      type: type,
      text: message,
    };

    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      data: alert,
    });
  }
}
