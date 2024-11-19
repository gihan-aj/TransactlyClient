import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortOrderEnum } from '../enums/sort-order.enum';
import { PagedListInterface } from './paged-list.interface';
import { ErrorHandlingService } from '../services/error-handling.service';

export class GenericDataSource<T> implements DataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public dataStream$ = this.dataSubject.asObservable();

  public page: number | null = null;
  public pageSize: number | null = null;
  public items: T[] = [];
  public itemCount: number | null = null;
  public totalCount: number = 0;

  constructor(
    private dataService: {
      get: (
        page: number,
        pageSize: number,
        sortColumn?: string,
        sortOrder?: SortOrderEnum,
        searchTerm?: string
      ) => Observable<PagedListInterface<T>>;
    },
    private errorHandling: ErrorHandlingService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly T[]> {
    return this.dataStream$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData(
    page: number,
    pageSize: number,
    sortColumn?: string,
    sortOrder?: SortOrderEnum,
    searchTerm?: string
  ): void {
    this.loadingSubject.next(true);

    this.dataService
      .get(page, pageSize, sortColumn, sortOrder, searchTerm)
      .subscribe({
        next: (response) => {
          this.dataSubject.next(response.items);
          this.page = response.page;
          this.pageSize = response.pageSize;
          this.items = response.items;
          this.itemCount = response.items.length;
          this.totalCount = response.totalCount;
        },
        error: (error) => {
          this.errorHandling.handle(error);
          this.totalCount = 0;
        },
        complete: () => {
          this.loadingSubject.next(false);
        },
      });
  }
}
