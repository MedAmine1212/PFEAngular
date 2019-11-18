import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPanierComponent } from './mini-panier.component';

describe('MiniPanierComponent', () => {
  let component: MiniPanierComponent;
  let fixture: ComponentFixture<MiniPanierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPanierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
