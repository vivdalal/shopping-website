import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesBannerComponent } from './images-banner.component';

describe('ImagesBannerComponent', () => {
  let component: ImagesBannerComponent;
  let fixture: ComponentFixture<ImagesBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
