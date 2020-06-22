import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToPostComponent } from './add-users-to-post.component';

describe('AddUsersToPostComponent', () => {
  let component: AddUsersToPostComponent;
  let fixture: ComponentFixture<AddUsersToPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersToPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersToPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
