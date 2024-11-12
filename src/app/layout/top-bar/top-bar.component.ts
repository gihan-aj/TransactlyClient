import { Component, effect, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: 'top-bar.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', [animate('300ms ease-out')]),
      transition('out => in', [animate('300ms ease-in')]),
    ]),
  ],
})
export class TopBarComponent {
  darkMode = signal<boolean>(true);
  sideNavbarOpened = input.required<boolean>();
  changeSideNavbarOpened = output<boolean>();

  menuItems = [
    {
      routerLink: 'login',
      icon: 'login',
      label: 'Log In',
    },
    {
      routerLink: 'register',
      icon: 'person_add',
      label: 'Create New Account',
    },
    {
      routerLink: 'user-settings',
      icon: 'settings',
      label: 'Settings',
    },
    {
      routerLink: 'logout',
      icon: 'logout',
      label: 'Log Out',
    },
  ];

  toggleSideNavbar(): void {
    this.changeSideNavbarOpened.emit(!this.sideNavbarOpened());
  }

  setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
    document.documentElement.classList.toggle('light', !this.darkMode());
  });
}
