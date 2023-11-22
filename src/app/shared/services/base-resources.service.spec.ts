import { TestBed } from '@angular/core/testing';

import { BaseResourcesService } from './base-resources.service';

describe('BaseResourcesService', () => {
  let service: BaseResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
