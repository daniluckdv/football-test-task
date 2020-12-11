import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSectionListComponent } from './sport-section-list.component';

describe('SportSectionListComponent', () => {
  let component: SportSectionListComponent;
  let fixture: ComponentFixture<SportSectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportSectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
