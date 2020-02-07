import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteMonotoringComponent } from './remote-monotoring.component';

describe('RemmoteMonotoringComponent', () => {
  let component: RemoteMonotoringComponent;
  let fixture: ComponentFixture<RemoteMonotoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteMonotoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteMonotoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
