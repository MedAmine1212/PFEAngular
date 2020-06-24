import { TestBed } from '@angular/core/testing';

import { DataBaseExportImportService } from './data-base-export-import.service';

describe('DataBaseExportImportService', () => {
  let service: DataBaseExportImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseExportImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
