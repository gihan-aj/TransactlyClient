import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CategoryConfigurationService } from '../category-configuration/category-configuration.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CategoryResponseInterface } from '../category-configuration/category-response.interface';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { PagedListInterface } from '../../shared/models/paged-list.interface';

@Component({
  selector: 'app-product-configuration',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './product-configuration.component.html',
  styleUrl: './product-configuration.component.scss',
})
export class ProductConfigurationComponent {
  private serivce = inject(CategoryConfigurationService);

  dataSource: CourseLessonInterface[] = [
    {
      sequenceNumber: 1,
      description:
        'Angular tutorial for beginners - Build your first App - Hello wolrd Step by step',
      duration: '4.17',
    },
    {
      sequenceNumber: 2,
      description: 'Building first Component - Component coposition',
      duration: '2.07',
    },
    {
      sequenceNumber: 3,
      description: 'Component @Input - How to Pass Input Data to an Component.',
      duration: '2.33',
    },
  ];

  displayedColumns = ['sequenceNumber', 'description', 'duration'];

  onRowClicked(_t42: any) {
    console.log(_t42);
  }
}

export interface CourseLessonInterface {
  sequenceNumber: number;
  description: string;
  duration: string;
}

// export class CategoryDataSource
//   implements DataSource<CategoryResponseInterface>
// {
//   private categorySubject = new BehaviorSubject<CategoryResponseInterface[]>(
//     []
//   );
//   private loadingSubject = new BehaviorSubject<boolean>(false);

//   public loading = this.loadingSubject.asObservable();

//   private serivce = inject(CategoryConfigurationService);

//   connect(
//     collectionViewer: CollectionViewer
//   ): Observable<readonly CategoryResponseInterface[]> {
//     return this.categorySubject.asObservable();
//   }
//   disconnect(collectionViewer: CollectionViewer): void {
//     this.categorySubject.complete();
//     this.loadingSubject.complete();
//   }

//   // loadCategories(page = 1, pageSize = 5, sortOrder='', sortColumn= 'name', searchTerm=''){
//   //   this.loadingSubject.next(true);

//   //   this.serivce.get(page, pageSize, sortColumn, sortOrder, searchTerm)
//   //     .pipe(
//   //       catchError(() => of([])),
//   //       finalize(() => this.loadingSubject.next(false))
//   //     )
//   //     .subscribe(catogories => this.categorySubject.next(catogories))
//   // }
// }
