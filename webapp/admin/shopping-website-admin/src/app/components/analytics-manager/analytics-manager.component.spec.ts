import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsManagerComponent } from './analytics-manager.component';

describe('AnalyticsManagerComponent', () => {
  let component: AnalyticsManagerComponent;
  let fixture: ComponentFixture<AnalyticsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
