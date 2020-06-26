import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDataBaseComponent } from './import-data-base.component';

describe('ImportDataBaseComponent', () => {
  let component: ImportDataBaseComponent;
  let fixture: ComponentFixture<ImportDataBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportDataBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
