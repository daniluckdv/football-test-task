import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSectionsComponent } from './sport-sections.component';

describe('SportSectionsComponent', () => {
  let component: SportSectionsComponent;
  let fixture: ComponentFixture<SportSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
