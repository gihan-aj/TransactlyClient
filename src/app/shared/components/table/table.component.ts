import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  OnInit,
  output,
  Signal,
} from '@angular/core';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize-first-letter.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    CapitalizeFirstLetterPipe,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements OnInit {
  /**
   * INPUT SIGNALS
   */
  loading = input.required<boolean>();
  allowSelect = input<boolean>(false);
  data = input.required<T[]>();
  columnsToBeDisplayed = input.required<string[]>();
  enableActions = input<boolean>(false);
  enableBulkActions = input<boolean>(false);

  initialSelection = [];
  allowMultiSelect = true;

  /**
   * COMPUTED SIGNALS
   */
  displayColumns: Signal<string[]> = computed(() => {
    const newColumns = this.columnsToBeDisplayed();
    if (this.allowSelect()) {
      newColumns.unshift('select');
    }
    if (this.enableActions()) {
      newColumns.push('actions');
    }
    return newColumns;
  });

  columns: Signal<string[]> = computed(() =>
    this.data().length > 0 ? Object.keys(this.data()[0] as string) : []
  );

  dataSource: Signal<MatTableDataSource<T>> = computed(
    () => new MatTableDataSource<T>(this.data())
  );

  selection: Signal<SelectionModel<T>> = computed(() => {
    return new SelectionModel<T>(this.allowMultiSelect, this.initialSelection);
  });

  /**
   * OUTPUT SIGNALS
   */
  selectedChange = output<T[]>();
  edit = output<T>();
  activate = output<T>();
  deactivate = output<T>();
  delete = output<T>();
  activateMultiple = output<T[]>();
  deactivateMultiple = output<T[]>();
  deleteMultiple = output<T[]>();

  /**
   * ON INITIALIZING
   */
  ngOnInit(): void {
    // this.selection().clear();
    // this.onSelect();
  }

  isAllSelected() {
    const numSelected = this.selection().selected.length;
    const numRows = this.dataSource().data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection().clear();
      return;
    }

    this.selection().select(...this.dataSource().data);
  }

  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${
      this.selection().isSelected(row) ? 'deselect' : 'select'
    } row ${row}`;
  }

  onSelect(): void {
    this.selection().changed.subscribe({
      next: () => {
        this.selectedChange.emit(this.selection().selected);
      },
      error: () => {
        this.selectedChange.emit([]);
      },
    });
  }

  onEdit(row: T): void {
    this.edit.emit(row);
  }

  onActivate(row: T): void {
    this.activate.emit(row);
  }

  onDeactivate(row: T): void {
    this.deactivate.emit(row);
  }

  onDelete(row: T): void {
    this.delete.emit(row);
  }

  onMultipleActivate(): void {
    this.activateMultiple.emit(this.selection().selected);
  }

  onMultipleDeactivate(): void {
    this.deactivateMultiple.emit(this.selection().selected);
  }

  onMultipleDelete(): void {
    this.deleteMultiple.emit(this.selection().selected);
  }
}
