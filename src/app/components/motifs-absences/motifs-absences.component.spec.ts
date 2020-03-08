import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifsAbsencesComponent } from './motifs-absences.component';

describe('MotifsAbsencesComponent', () => {
  let component: MotifsAbsencesComponent;
  let fixture: ComponentFixture<MotifsAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotifsAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifsAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
