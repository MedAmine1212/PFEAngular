import { TestBed } from '@angular/core/testing';

import { TempUserService } from './temp-user.service';

describe('TempUserService', () => {
  let service: TempUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
