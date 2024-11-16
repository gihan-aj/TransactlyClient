import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryConfigurationService } from './category-configuration.service';
import { PagedListInterface } from '../../shared/models/paged-list.interface';
import { CategoryResponseInterface } from './category-response.interface';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { ErrorHandlingService } from '../../shared/services/error-handling.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { DialogService } from '../../shared/services/dialog.service';
import { AlertTypeEnum } from '../../shared/enums/alert-type.enum';
import { AlertService } from '../../shared/services/alert.service';
import { SortOrderEnum } from '../../shared/enums/sort-order.enum';
import { CategorySortColumnsEnum } from './category-sort-columns.enum';
import { CategoryDataSource } from './category.datasource';

@Component({
  selector: 'app-category-configuration',
  standalone: true,
  imports: [
    SearchBarComponent,
    TableComponent,
    ProgressBarComponent,
    MatButtonModule,
  ],
  templateUrl: './category-configuration.component.html',
  styleUrl: './category-configuration.component.scss',
})
export class CategoryConfigurationComponent implements OnInit {
  private categoryService = inject(CategoryConfigurationService);

  private errorHandling = inject(ErrorHandlingService);

  private dialogService = inject(DialogService);

  private alertService = inject(AlertService);

  loadingData = signal<boolean>(true);

  categoryDataSource: CategoryDataSource = new CategoryDataSource(
    this.categoryService,
    this.errorHandling
  );

  tableData: CategoryResponseInterface[] = [];

  tableColumns: string[] = ['name', 'description', 'isActive'];

  selectedRows: CategoryResponseInterface[] = [];

  page: number = 1;

  pageSize: number = 5;

  searchTerm: string = '';

  sortOrder: SortOrderEnum = SortOrderEnum.ascending;

  sortColumn: CategorySortColumnsEnum = CategorySortColumnsEnum.Id;

  ngOnInit(): void {
    // this.categoryDataSource.loadCategories(this.page, this.pageSize, this.sortOrder, this.sortColumn, this.searchTerm)
    this.getCategories();
  }

  private getCategories() {
    // this.loadingData.set(true);

    this.categoryService
      .get(
        this.page,
        this.pageSize,
        this.sortColumn,
        this.sortOrder,
        this.searchTerm
      )
      .subscribe({
        next: (data: PagedListInterface<CategoryResponseInterface>) => {
          this.tableData = data.items;
          this.loadingData.set(false);
        },
        error: (error) => {
          this.errorHandling.handle(error);
          this.loadingData.set(false);
        },
      });
  }

  private getById(id: string) {
    this.categoryService.getById(id).subscribe({
      next: (data: CategoryResponseInterface) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.errorHandling.handle(error);
      },
    });
  }

  getSearchTerm(value: string): void {
    this.searchTerm = value;
    this.getCategories();
  }

  onSelect(items: CategoryResponseInterface[]): void {
    this.selectedRows = items;
  }

  onEdit(item: CategoryResponseInterface): void {
    this.dialogService
      .openDilaog(
        AlertTypeEnum.info,
        'Edit Confirmation',
        'Are you sure you want to edit the selected category?',
        'Yes'
      )
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) console.log('edit', item);
          else console.log('cancelled');
        },
      });
  }

  onActvate(item: CategoryResponseInterface): void {
    this.dialogService
      .openDilaog(
        AlertTypeEnum.info,
        'Activate Confirmation',
        'Are you sure you want to activate the selected category?',
        'Yes'
      )
      .afterClosed()
      .subscribe({
        next: (accepted) => {
          if (accepted) {
            this.categoryService.activate([item.id]).subscribe({
              next: () => {
                this.alertService.alert(
                  AlertTypeEnum.success,
                  'Success',
                  'Category was successfully activated.'
                );
              },
              error: (error) => {
                this.errorHandling.handle(error);
              },
              complete: () => {
                this.getCategories();
              },
            });
          }
        },
      });
  }

  onDeactivate(item: CategoryResponseInterface): void {
    this.dialogService
      .openDilaog(
        AlertTypeEnum.info,
        'Deactivate Confirmation',
        'Are you sure you want to deactivate the selected category?',
        'Yes'
      )
      .afterClosed()
      .subscribe({
        next: (accepted) => {
          if (accepted) {
            this.categoryService.deactivate([item.id]).subscribe({
              next: () => {
                this.alertService.alert(
                  AlertTypeEnum.success,
                  'Success',
                  'Category was successfully deactivated.'
                );
              },
              error: (error) => {
                this.errorHandling.handle(error);
              },
              complete: () => {
                this.getCategories();
              },
            });
          }
        },
      });
  }

  onDelete(item: CategoryResponseInterface): void {
    this.dialogService
      .openDilaog(
        AlertTypeEnum.danger,
        'Delete Confirmation',
        'Are you sure you want to delete the selected category?',
        'Yes'
      )
      .afterClosed()
      .subscribe({
        next: (accepted) => {
          if (accepted) {
            this.categoryService.delete([item.id]).subscribe({
              next: () => {
                this.dialogService.openDilaog(
                  AlertTypeEnum.success,
                  'Success',
                  'The category was successfully deleted ',
                  'Ok'
                );
              },
              error: (error) => {
                this.errorHandling.handle(error);
              },
              complete: () => {
                this.getCategories();
              },
            });
          }
        },
      });
  }

  onMultipleActivate(items: CategoryResponseInterface[]): void {
    if (items.length > 0) {
      const ids: string[] = items.map((c) => c.id);
      console.log(ids);

      this.dialogService
        .openDilaog(
          AlertTypeEnum.info,
          'Activate Confirmation',
          `Are you sure you want to activate ${
            ids.length > 1
              ? 'these selected catogories?'
              : 'the selected category?'
          }`,
          'Yes'
        )
        .afterClosed()
        .subscribe({
          next: (accepted) => {
            if (accepted) {
              this.categoryService.activate(ids).subscribe({
                next: () => {
                  this.alertService.alert(
                    AlertTypeEnum.success,
                    'Success',
                    `${
                      ids.length > 1 ? 'Categories were' : 'Category was'
                    }  successfully activated.`
                  );
                },
                error: (error) => {
                  this.errorHandling.handle(error);
                },
                complete: () => {
                  this.getCategories();
                },
              });
            }
          },
        });
    }
  }

  onMultipleDeactivate(items: CategoryResponseInterface[]): void {
    if (items.length > 0) {
      const ids: string[] = items.map((c) => c.id);

      this.dialogService
        .openDilaog(
          AlertTypeEnum.info,
          'Deactivate Confirmation',
          `Are you sure you want to deactivate ${
            ids.length > 1
              ? 'these selected catogories?'
              : 'the selected category?'
          }`,
          'Yes'
        )
        .afterClosed()
        .subscribe({
          next: (accepted) => {
            if (accepted) {
              this.categoryService.deactivate(ids).subscribe({
                next: () => {
                  this.alertService.alert(
                    AlertTypeEnum.success,
                    'Success',
                    `${
                      ids.length > 1 ? 'Categories were' : 'Category was'
                    }  successfully deactivated.`
                  );
                },
                error: (error) => {
                  this.errorHandling.handle(error);
                },
                complete: () => {
                  this.getCategories();
                },
              });
            }
          },
        });
    }
  }
  onMultipleDelete(items: CategoryResponseInterface[]): void {
    if (items.length > 0) {
      const ids: string[] = items.map((c) => c.id);
      console.log(ids);

      this.dialogService
        .openDilaog(
          AlertTypeEnum.info,
          'Delete Confirmation',
          `Are you sure you want to delete ${
            ids.length > 1
              ? 'these selected catogories?'
              : 'the selected category?'
          }`,
          'Yes'
        )
        .afterClosed()
        .subscribe({
          next: (accepted) => {
            if (accepted) {
              this.categoryService.delete(ids).subscribe({
                next: () => {
                  this.alertService.alert(
                    AlertTypeEnum.success,
                    'Success',
                    `${
                      ids.length > 1 ? 'Categories were' : 'Category was'
                    }  successfully deleted.`
                  );
                },
                error: (error) => {
                  this.errorHandling.handle(error);
                },
                complete: () => {
                  this.getCategories();
                },
              });
            }
          },
        });
    }
  }
}
