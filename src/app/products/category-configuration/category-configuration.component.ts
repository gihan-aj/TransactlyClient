import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SortOrderEnum } from '../../shared/enums/sort-order.enum';
import { environment } from '../../../environments/environment.development';
import { TableComponent } from '../../shared/components/table/table.component';
import { GenericDataSource } from '../../shared/models/generic-data-source';
import { CategoryInterface } from './category.interface';
import { CategoryConfigurationService } from './category-configuration.service';
import { ErrorHandlingService } from '../../shared/services/error-handling.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../shared/services/dialog.service';
import { AlertTypeEnum } from '../../shared/enums/alert-type.enum';
import { AlertService } from '../../shared/services/alert.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-configuration',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    MatButtonModule,
    MatIconModule,
    TableComponent,
    MatPaginatorModule,
  ],
  templateUrl: './category-configuration.component.html',
  styleUrl: './category-configuration.component.scss',
})
export class CategoryConfigurationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private categoryService = inject(CategoryConfigurationService);

  private dialogService = inject(DialogService);

  private alerService = inject(AlertService);

  private errorHandling = inject(ErrorHandlingService);

  cellHeaders = ['id', 'name', 'description', 'isActive'];

  columnsToBeDisplayed = [
    'select',
    'name',
    'description',
    'isActive',
    'actions',
  ];

  dataSource: GenericDataSource<CategoryInterface> =
    new GenericDataSource<CategoryInterface>(
      this.categoryService,
      this.errorHandling
    );

  page: number = 1;

  pageSize: number = environment.defaultPageSize;

  pageSizeOptions = environment.pageSizeOptions;

  sortByOptions = ['id', 'name'];

  searchTerm: string = '';

  sortOrder: SortOrderEnum = SortOrderEnum.ascending;

  sortBy = this.sortByOptions[0];

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.dataSource.loadData(
      this.page,
      this.pageSize,
      this.sortBy,
      this.sortOrder,
      this.searchTerm
    );
  }

  addNewCategory() {
    console.log('Add new');
  }

  getSearchTerm(str: string) {
    this.searchTerm = str;
    this.refresh();
  }

  getSortBy(str: string) {
    this.sortBy = str;
    this.refresh();
  }

  getSortOrder(str: SortOrderEnum) {
    this.sortOrder = str;
    this.refresh();
  }

  pageChanged(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.refresh();
  }

  viewCategory(item: CategoryInterface) {
    console.log(item);
  }

  editCategory(item: CategoryInterface) {
    console.log(item);
  }

  activateCategories(items: CategoryInterface[]) {
    const ids = items.map((item) => item.id);
    this.dialogService
      .openDilaog(
        AlertTypeEnum.info,
        'Activate Confirmation',
        `Are you sure you want to activate ${
          items.length > 1 ? 'these categories' : 'this category'
        }?`,
        'Activate'
      )
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accepted) => {
          if (accepted) {
            return this.categoryService.activate(ids);
          }

          return [];
        })
      )
      .subscribe({
        next: () => {
          this.alerService.alert(
            AlertTypeEnum.success,
            'Success',
            `${
              items.length > 1 ? 'Categories were' : 'The category was'
            } successfully activated.`
          );
        },
        error: (error) => {
          this.errorHandling.handle(error);
        },
        complete: () => {
          this.refresh();
        },
      });
  }

  deactivateCategories(items: CategoryInterface[]) {
    const ids = items.map((item) => item.id);
    this.dialogService
      .openDilaog(
        AlertTypeEnum.info,
        'Deactivate Confirmation',
        `Are you sure you want to deactivate ${
          items.length > 1 ? 'these categories' : 'this category'
        }?`,
        'Deactivate'
      )
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accepted) => {
          if (accepted) {
            return this.categoryService.deactivate(ids);
          }

          return [];
        })
      )
      .subscribe({
        next: () => {
          this.alerService.alert(
            AlertTypeEnum.success,
            'Success',
            `${
              items.length > 1 ? 'Categories were' : 'The category was'
            } successfully deactivated.`
          );
        },
        error: (error) => {
          this.errorHandling.handle(error);
        },
        complete: () => {
          this.refresh();
        },
      });
  }

  deleteCategories(items: CategoryInterface[]) {
    const ids = items.map((item) => item.id);
    this.dialogService
      .openDilaog(
        AlertTypeEnum.danger,
        'Delete Confirmation',
        `Are you sure you want to delete ${
          items.length > 1 ? 'these categories' : 'this category'
        }?`,
        'Delete'
      )
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((accepted) => {
          if (accepted) {
            return this.categoryService.delete(ids);
          }

          return [];
        })
      )
      .subscribe({
        next: () => {
          this.alerService.alert(
            AlertTypeEnum.success,
            'Success',
            `${
              items.length > 1 ? 'Categories were' : 'The category was'
            } successfully deleted.`
          );
        },
        error: (error) => {
          this.errorHandling.handle(error);
        },
        complete: () => {
          this.refresh();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
