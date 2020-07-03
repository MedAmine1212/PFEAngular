import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDepartmentPlanningComponent } from './set-department-planning.component';

describe('SetDepartmentPlanningComponent', () => {
  let component: SetDepartmentPlanningComponent;
  let fixture: ComponentFixture<SetDepartmentPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDepartmentPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDepartmentPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
