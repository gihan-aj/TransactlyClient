import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PagedListInterface } from '../../shared/models/paged-list.interface';
import { BulkRequest } from '../../shared/models/bulk-request.interface';
import { CategoryInterface } from './category.interface';

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
  ): Observable<PagedListInterface<CategoryInterface>> {
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

    return this.http.get<PagedListInterface<CategoryInterface>>(url, {
      params: queryParams,
    });
  }

  getById(id: string): Observable<CategoryInterface> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<CategoryInterface>(url);
  }

  activate(ids: string[]) {
    const url = `${this.baseUrl}/activate`;
    const body: BulkRequest = { ids: ids };
    return this.http.put(url, body);
  }

  deactivate(ids: string[]) {
    const url = `${this.baseUrl}/deactivate`;
    const body: BulkRequest = { ids: ids };
    return this.http.put(url, body);
  }

  delete(ids: string[]) {
    const url = `${this.baseUrl}/delete`;
    const body: BulkRequest = { ids: ids };
    // const req = new HttpRequest('DELETE', url, body);
    return this.http.put(url, body);
  }

  add(category: CategoryInterface) {
    const url = this.baseUrl;
    const body: CategoryRequest = {
      name: category.name,
      description: category.description,
    };

    return this.http.post(url, body);
  }

  update(category: CategoryInterface) {
    const url = `${this.baseUrl}/${category.id}`;
    const body: CategoryRequest = {
      name: category.name,
      description: category.description,
    };

    return this.http.put(url, body);
  }
}

interface CategoryRequest {
  name: string;
  description: string;
}
