import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteMonitoringComponent } from './remote-monitoring.component';

describe('RemmoteMonotoringComponent', () => {
  let component: RemoteMonitoringComponent;
  let fixture: ComponentFixture<RemoteMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
