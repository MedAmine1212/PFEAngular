import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceVerificationComponent } from './absence-verification.component';

describe('AbsenceVerificationComponent', () => {
  let component: AbsenceVerificationComponent;
  let fixture: ComponentFixture<AbsenceVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
