import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BACKOFFICEComponent } from './back-office.component';

describe('BACKOFFICEComponent', () => {
  let component: BACKOFFICEComponent;
  let fixture: ComponentFixture<BACKOFFICEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BACKOFFICEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BACKOFFICEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
