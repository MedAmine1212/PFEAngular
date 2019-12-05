import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimeUserComponent } from './supprime-user.component';

describe('SupprimeUserComponent', () => {
  let component: SupprimeUserComponent;
  let fixture: ComponentFixture<SupprimeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
