import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDetailsComponent } from './planning-details.component';

describe('PlanningDetailsComponent', () => {
  let component: PlanningDetailsComponent;
  let fixture: ComponentFixture<PlanningDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
