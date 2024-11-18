import { Router, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CategoryResolver } from './products/category-configuration/category.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'products',
    providers: [Router],
    loadChildren: () =>
      import('./products/products.routes').then((m) => m.routes),
    data: { breadcrumb: 'Products' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { breadcrumb: 'Not Found' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
    data: { breadcrumb: 'Not Found' },
  },
];
