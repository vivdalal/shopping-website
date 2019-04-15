/* tslint:disable:no-unused-variable */

import { async, TestBed } from '@angular/core/testing';
import { RunmanComponent } from './runman.component';

describe('RunmanComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RunmanComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(RunmanComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(RunmanComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(RunmanComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
