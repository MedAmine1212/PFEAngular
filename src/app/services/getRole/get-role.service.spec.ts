import { TestBed } from '@angular/core/testing';

import { GetRoleService } from './get-role.service';

describe('GetRoleService', () => {
  let service: GetRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
