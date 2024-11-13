import { TestBed } from '@angular/core/testing';

import { CategoryConfigurationService } from './category-configuration.service';

describe('CategoryConfigurationService', () => {
  let service: CategoryConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
