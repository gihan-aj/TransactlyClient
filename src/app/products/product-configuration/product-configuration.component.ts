import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CategoryConfigurationService } from '../category-configuration/category-configuration.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { PagedListInterface } from '../../shared/models/paged-list.interface';

@Component({
  selector: 'app-product-configuration',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './product-configuration.component.html',
  styleUrl: './product-configuration.component.scss',
})
export class ProductConfigurationComponent {}
