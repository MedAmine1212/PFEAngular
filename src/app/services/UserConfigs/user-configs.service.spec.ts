import { TestBed } from '@angular/core/testing';

import { UserConfigsService } from './user-configs.service';

describe('UserConfigService', () => {
  let service: UserConfigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserConfigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
