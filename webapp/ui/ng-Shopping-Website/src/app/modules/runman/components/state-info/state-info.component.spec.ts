/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateInfoComponent } from './state-info.component';

describe('StateInfoComponent', () => {
  let component: StateInfoComponent;
  let fixture: ComponentFixture<StateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StateInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
