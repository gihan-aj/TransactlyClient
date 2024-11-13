import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class SidenavComponent {
  closeSidemenu = output<boolean>();

  menuItems = [
    {
      routerLink: 'dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
    },
    {
      routerLink: 'sales',
      icon: 'point_of_sale',
      label: 'Sales',
    },
    {
      routerLink: 'products',
      icon: 'category',
      label: 'Products',
    },
    {
      routerLink: 'inventory',
      icon: 'inventory',
      label: 'Inventory',
    },
    {
      routerLink: 'customers',
      icon: 'groups',
      label: 'Customers',
    },
    {
      routerLink: 'reports',
      icon: 'summarize',
      label: 'Reports',
    },
    {
      routerLink: 'settings',
      icon: 'settings',
      label: 'Settings',
    },
  ];

  menuItemClicked() {
    if (window.innerWidth < 768) {
      this.closeSidemenu.emit(true);
    }
  }
}
