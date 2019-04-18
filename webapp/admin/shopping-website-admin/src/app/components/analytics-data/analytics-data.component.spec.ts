import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDataComponent } from './analytics-data.component';

describe('AnalyticsDataComponent', () => {
  let component: AnalyticsDataComponent;
  let fixture: ComponentFixture<AnalyticsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
