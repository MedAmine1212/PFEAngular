import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFrontComponent } from './orders-front.component';

describe('OrdersFrontComponent', () => {
  let component: OrdersFrontComponent;
  let fixture: ComponentFixture<OrdersFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
