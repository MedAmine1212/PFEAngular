import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepDialogComponent } from './delete-dep-dialog.component';

describe('DeleteDepDialogComponent', () => {
  let component: DeleteDepDialogComponent;
  let fixture: ComponentFixture<DeleteDepDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDepDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
