import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './layout/footer/footer.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './shared/components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopBarComponent,
    SidenavComponent,
    FooterComponent,
    BreadcrumbComponent,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'transactly-app';
  screenWidth = signal<number>(window.innerWidth);
  sideNavbarOpened = signal<boolean>(true);

  constructor(public breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.sideNavbarOpened.set(this.screenWidth() > 768);
  }

  changeSideNavbarOpened($event: boolean) {
    this.sideNavbarOpened.set($event);
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.sideNavbarOpened.set(false);
    } else {
      this.sideNavbarOpened.set(true);
    }
  }
}
