import { Component, inject, OnInit } from '@angular/core';
import { CategoryConfigurationService } from './category-configuration.service';
import { PagedListInterface } from '../../shared/models/paged-list.interface';
import { CategoryResponseInterface } from './category-response.interface';

@Component({
  selector: 'app-category-configuration',
  standalone: true,
  imports: [],
  templateUrl: './category-configuration.component.html',
  styleUrl: './category-configuration.component.scss',
})
export class CategoryConfigurationComponent implements OnInit {
  categoryService = inject(CategoryConfigurationService);

  ngOnInit(): void {
    this.categoryService.get(1, 5).subscribe({
      next: (data: PagedListInterface<CategoryResponseInterface>) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.categoryService
      .getById('bef3f647-6833-465e-b180-034337ef524c')
      .subscribe({
        next: (data: CategoryResponseInterface) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
