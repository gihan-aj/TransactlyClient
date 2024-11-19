import { Component, computed, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PopupInterface } from '../../../shared/models/popup.interface';
import { CategoryInterface } from '../category.interface';
import { PopupTypeEnum } from '../../../shared/enums/popup-type.enum';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss',
})
export class CategoryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CategoryDialogComponent>);
  popupData = inject<PopupInterface<CategoryInterface>>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  isViewMode = computed<boolean>(
    () => this.popupData.popupType === PopupTypeEnum.View
  );

  categoryForm = this.fb.group({
    id: this.popupData.data?.id,
    name: [
      this.popupData.data?.name || '',
      [Validators.required, Validators.maxLength(50)],
    ],
    description: [
      this.popupData.data?.description || '',
      [Validators.maxLength(255)],
    ],
  });

  onSubmit() {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}
