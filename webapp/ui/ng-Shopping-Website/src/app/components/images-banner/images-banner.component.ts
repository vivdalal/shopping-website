import { Component, OnInit } from '@angular/core';
import { Banner } from '../../models/banner';

@Component({
  selector: 'app-images-banner',
  templateUrl: './images-banner.component.html',
  styleUrls: ['./images-banner.component.scss']
})
export class ImagesBannerComponent implements OnInit {

  private images: Banner[];

  constructor() {
  }

  ngOnInit() {
    this.images = [
      {
        src: 'assets/images/shirt-banner.jpg',
        caption: 'Shirts',
        text: 'Summer Collection'
      },
      {
        src: 'assets/images/trouser-banner.jpg',
        caption: 'Bottoms',
        text: 'Uber Cool Styles'
      }
    ];
  }

}
