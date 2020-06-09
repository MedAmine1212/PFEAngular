import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlanningDialogComponent } from './delete-planning-dialog.component';

describe('DeletePlanningDialogComponent', () => {
  let component: DeletePlanningDialogComponent;
  let fixture: ComponentFixture<DeletePlanningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePlanningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlanningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
