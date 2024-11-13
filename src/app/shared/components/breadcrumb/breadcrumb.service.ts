import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbItemInterface } from './breadcrumbItem.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  // Subject emit the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<
    BreadcrumbItemInterface[]
  >([]);

  // Observable expose the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        // Construct  the breadcrumb hierarchy
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: BreadcrumbItemInterface[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: BreadcrumbItemInterface[]
  ) {
    if (route) {
      // Construct the route url
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      // Add an element for the current route part
      if (route.data['breadcrumb']) {
        // Check for duplicate breadcrumb
        const breadcrumbLabel = this.getLabel(route.data);

        if (
          !breadcrumbs.length ||
          breadcrumbs[breadcrumbs.length - 1].label !== breadcrumbLabel
        ) {
          const breadcrumb: BreadcrumbItemInterface = {
            label: breadcrumbLabel,
            url: '/' + routeUrl.join('/'),
          };

          breadcrumbs.push(breadcrumb);
        }
      }

      // Add another element for the next route part
      if (route.firstChild)
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data['breadcrumb'] === 'function'
      ? data['breadcrumb'](data)
      : data['breadcrumb'];
  }
}
