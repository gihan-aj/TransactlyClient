import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CategoryConfigurationComponent } from './category-configuration/category-configuration.component';
import { ProductConfigurationComponent } from './product-configuration/product-configuration.component';
import { CategoryResolver } from './category-configuration/category.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'category-configuration',
    component: CategoryConfigurationComponent,
    data: { breadcrumb: 'Category Configuration' },
  },
  {
    path: 'product-configuration',
    component: ProductConfigurationComponent,
    data: { breadcrumb: 'Product Configuration' },
  },
];
