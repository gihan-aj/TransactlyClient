import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CategoryResponseInterface } from './category-response.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryConfigurationService } from './category-configuration.service';
import { PagedListInterface } from '../../shared/models/paged-list.interface';
import { ErrorHandlingService } from '../../shared/services/error-handling.service';
import { SortOrderEnum } from '../../shared/enums/sort-order.enum';
import { CategorySortColumnsEnum } from './category-sort-columns.enum';

export class CategoryDataSource
  implements DataSource<CategoryResponseInterface>
{
  private categorySubject = new BehaviorSubject<CategoryResponseInterface[]>(
    []
  );

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private categoryService: CategoryConfigurationService,
    private errorHandling: ErrorHandlingService
  ) {}

  connect(
    collectionViewer: CollectionViewer
  ): Observable<readonly CategoryResponseInterface[]> {
    return this.categorySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categorySubject.complete();
    this.loadingSubject.complete();
  }

  loadCategories(
    page: number,
    pageSize: number,
    sortOrder: SortOrderEnum,
    sortColumn: CategorySortColumnsEnum,
    searchTerm: string
  ): void {
    this.loadingSubject.next(true);

    this.categoryService
      .get(page, pageSize, sortColumn, sortOrder, searchTerm)
      .subscribe({
        next: (response: PagedListInterface<CategoryResponseInterface>) => {
          this.categorySubject.next(response.items);
        },
        error: (error) => {
          this.errorHandling.handle(error);
        },
        complete: () => {
          this.loadingSubject.next(false);
        },
      });
  }
}
