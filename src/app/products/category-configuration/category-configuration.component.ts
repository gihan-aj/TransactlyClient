import { Component, inject, OnInit } from '@angular/core';
import { CategoryConfigurationService } from './category-configuration.service';
import { PagedListInterface } from '../../shared/models/paged-list.interface';
import { CategoryResponseInterface } from './category-response.interface';
import { AlertTypeEnum } from '../../shared/enums/alert-type.enum';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { AlertService } from '../../shared/services/alert.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-category-configuration',
  standalone: true,
  imports: [SearchBarComponent, MatButtonModule],
  templateUrl: './category-configuration.component.html',
  styleUrl: './category-configuration.component.scss',
})
export class CategoryConfigurationComponent implements OnInit {
  categoryService = inject(CategoryConfigurationService);
  snackBarService = inject(SnackBarService);
  alertService = inject(AlertService);
  dialogService = inject(DialogService);
  alertTypes = AlertTypeEnum;

  ngOnInit(): void {
    this.categoryService
      .getById('bef3f647-6833-465e-b180-034337ef524c')
      .subscribe({
        next: (data: CategoryResponseInterface) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
          if (error.error.title) {
            this.alertService.alert(
              this.alertTypes.danger,
              error.error.title,
              error.error.detail
            );
          } else {
            this.alertService.alert(
              this.alertTypes.danger,
              'Unknown Error',
              'Unidentified error occured'
            );
          }
        },
      });
  }

  get() {
    this.categoryService.get(1, 5).subscribe({
      next: (data: PagedListInterface<CategoryResponseInterface>) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showAlert() {
    this.alertService.alert(
      this.alertTypes.success,
      'Success',
      'Category added successfully.'
    );
  }

  showDialog() {
    this.dialogService
      .openDilaog(
        this.alertTypes.danger,
        'Delete Confirmation',
        'Are you sure you want to delete these records?',
        'Delete'
      )
      .afterClosed()
      .subscribe({
        next: (yes) => {
          if (yes) console.log('deleted');
          else console.log('cancelled');
        },
      });
  }

  getSearchTerm(value: string): void {
    console.log(value);
  }
}
