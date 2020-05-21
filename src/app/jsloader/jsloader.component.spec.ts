import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsloaderComponent } from './jsloader.component';

describe('JsloaderComponent', () => {
  let component: JsloaderComponent;
  let fixture: ComponentFixture<JsloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
