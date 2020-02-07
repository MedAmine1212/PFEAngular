import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablesComponent } from './timetables.component';

describe('TimetablesComponent', () => {
  let component: TimetablesComponent;
  let fixture: ComponentFixture<TimetablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
