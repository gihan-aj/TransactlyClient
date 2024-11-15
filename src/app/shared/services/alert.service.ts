import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertTypeEnum } from '../enums/alert-type.enum';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly dialog = inject(MatDialog);

  alert(type: AlertTypeEnum, title: string, message: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { type: type, title: title, text: message },
    });
  }
}
