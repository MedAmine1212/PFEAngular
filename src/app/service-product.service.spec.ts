import { TestBed } from '@angular/core/testing';

import { ServiceProductService } from './service-product.service';

describe('ServiceProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceProductService = TestBed.get(ServiceProductService);
    expect(service).toBeTruthy();
  });
});
