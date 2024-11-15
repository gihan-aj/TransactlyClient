import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlertInterface } from '../../models/alert.interface';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  readonly dialogRef = inject(MatDialogRef<AlertComponent>);
  readonly data = inject<AlertInterface>(MAT_DIALOG_DATA);

  onOk(): void {
    this.dialogRef.close();
  }
}
