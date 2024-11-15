import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertTypeEnum } from '../enums/alert-type.enum';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogInterface } from '../models/dialog.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  openDilaog(
    type: AlertTypeEnum,
    title: string,
    text: string,
    action: string
  ): MatDialogRef<DialogComponent, any> {
    const data: DialogInterface = {
      type: type,
      title: title,
      text: text,
      action: action,
    };

    const dialogRef = this.dialog.open(DialogComponent, { data: data });

    return dialogRef;
  }
}
