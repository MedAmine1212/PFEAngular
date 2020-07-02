import { TestBed } from '@angular/core/testing';

import { HoveredUserService } from './hovered-user.service';

describe('HoveredUserService', () => {
  let service: HoveredUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoveredUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
