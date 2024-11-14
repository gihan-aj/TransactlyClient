import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PagedListInterface } from '../../shared/models/paged-list.interface';
import { CategoryResponseInterface } from './category-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryConfigurationService {
  http = inject(HttpClient);
  baseUrl: string = `${environment.baseUrl}/api/v1/categories`;

  constructor() {}

  get(
    page: number,
    pageSize: number,
    sortColumn?: string,
    sortOrder?: string,
    searchTerm?: string
  ): Observable<PagedListInterface<CategoryResponseInterface>> {
    const url = this.baseUrl;

    let queryParams = new HttpParams();
    if (searchTerm) {
      queryParams = queryParams.append('searchTerm', searchTerm);
    }
    if (sortColumn) {
      queryParams = queryParams.append('sortColumn', sortColumn);
    }
    if (sortOrder) {
      queryParams = queryParams.append('sortOrder', sortOrder);
    }
    queryParams = queryParams.append('page', page.toString());
    queryParams = queryParams.append('pageSize', pageSize.toString());

    return this.http.get<PagedListInterface<CategoryResponseInterface>>(url, {
      params: queryParams,
    });
  }

  getById(id: string): Observable<CategoryResponseInterface> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<CategoryResponseInterface>(url);
  }
}
