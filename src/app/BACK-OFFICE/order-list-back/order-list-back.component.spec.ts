import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListBackComponent } from './order-list-back.component';

describe('OrderListBackComponent', () => {
  let component: OrderListBackComponent;
  let fixture: ComponentFixture<OrderListBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
