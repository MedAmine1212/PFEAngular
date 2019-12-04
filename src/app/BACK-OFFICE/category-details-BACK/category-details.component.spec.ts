import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CategoryDetailsBACKComponent} from '../../BACK-OFFICE/category-details-BACK/category-details.component';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsBACKComponent;
  let fixture: ComponentFixture<CategoryDetailsBACKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailsBACKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsBACKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
