import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  OnInit,
  output,
  Signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { GenericDataSource } from '../../models/generic-data-source';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormatHeaderPipe } from '../../pipes/format-header.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule,
    FormatHeaderPipe,
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatCheckboxModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends HasId> implements OnInit {
  cellHeaders = input.required<string[]>();
  dataSource = input.required<GenericDataSource<T>>();
  columnsToBeDisplayed = input.required<string[]>();

  allowActions = input<boolean>(false);

  initialSelection: T[] = [];
  allowMultiSelect = input<boolean>(false);
  selection: Signal<SelectionModel<T>> = computed(
    () => new SelectionModel<T>(this.allowMultiSelect(), this.initialSelection)
  );

  allowBulkActions = input<boolean>(false);

  view = output<T>();
  edit = output<T>();
  activate = output<T[]>();
  deactivate = output<T[]>();
  delete = output<T[]>();
  selectionChange = output<T[]>();
  bulkActivate = output<T[]>();
  bulkDeactivate = output<T[]>();
  bulkDelete = output<T[]>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource().dataStream$.subscribe({
      next: () => this.selection().clear(),
    });

    this.selection().changed.subscribe({
      next: () => {
        this.selectionChange.emit(this.selection().selected);
      },
    });
  }

  isAllSelected() {
    const numSelected = this.selection().selected.length;
    const numRows = this.dataSource().itemCount;

    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection().clear();
      return;
    }
    this.selection().select(...this.dataSource().items);
  }

  checkboxLabel(row?: any) {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection().isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

  onView(row: T) {
    this.view.emit(row);
  }
  onDelete(row: T) {
    this.delete.emit([row]);
  }
  onEdit(row: T) {
    this.edit.emit(row);
  }
  onActivate(row: T) {
    this.activate.emit([row]);
  }
  onDeactivate(row: T) {
    this.deactivate.emit([row]);
  }

  onMultipleDelete() {
    this.bulkDelete.emit(this.selection().selected);
  }
  onMultipleDeactivate() {
    this.bulkDeactivate.emit(this.selection().selected);
  }
  onMultipleActivate() {
    this.bulkActivate.emit(this.selection().selected);
  }
}

/**
 * TO MAKE SURE T TYPE HAS AN ID
 */

interface HasId {
  id: string | number;
}
