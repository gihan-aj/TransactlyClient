import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertTypeEnum } from '../enums/alert-type.enum';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { SnackBarInterface } from '../models/snack-bar.interface';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  showNotification(
    type: AlertTypeEnum,
    text: string,
    duration: number = 5000
  ): void {
    const alert: SnackBarInterface = {
      type: type,
      text: text,
    };

    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      data: alert,
    });
  }
}
