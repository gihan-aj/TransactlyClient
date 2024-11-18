import { Component, computed, input, model, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SortOrderEnum } from '../../enums/sort-order.enum';
import { FormatHeaderPipe } from '../../pipes/format-header.pipe';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormatHeaderPipe,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  // Search bar
  searchBarPlaceholder = input.required<string>();
  searchTerm = model.required<string>();
  // Sort by
  sortByOptions = input.required<string[]>();
  sortBy = model.required<string>();
  // Sort order
  sortOrderTypes = SortOrderEnum;
  sortOrder = model.required<SortOrderEnum>();
}
