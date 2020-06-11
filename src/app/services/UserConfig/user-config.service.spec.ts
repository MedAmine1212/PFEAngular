import { TestBed } from '@angular/core/testing';

import { UserConfigService } from './user-config.service';

describe('UserConfigService', () => {
  let service: UserConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
