import { TestBed } from '@angular/core/testing';

import { AbsenceService } from './absence.service';

describe('AbsenceService', () => {
  let service: AbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
