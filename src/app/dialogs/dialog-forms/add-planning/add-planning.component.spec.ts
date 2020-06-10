import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanningComponent } from './add-planning.component';

describe('AddPlanningComponent', () => {
  let component: AddPlanningComponent;
  let fixture: ComponentFixture<AddPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
