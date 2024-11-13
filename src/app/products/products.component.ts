import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  items = [
    {
      routerLink: 'category-configuration',
      icon: 'category',
      label: 'Categories',
    },
    {
      routerLink: 'product-configuration',
      icon: 'inventory_2',
      label: 'Products',
    },
  ];
}
