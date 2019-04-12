import { Component, OnInit } from '@angular/core';
import {Banner} from '../../models/banner';

@Component({
  selector: 'app-images-banner',
  templateUrl: './images-banner.component.html',
  styleUrls: ['./images-banner.component.scss']
})
export class ImagesBannerComponent implements OnInit {

  private images: Banner[];

  constructor() { }

  ngOnInit() {
    this.images = [
      {
        src: 'assets/images/banner-1.png',
        caption: 'Shirts',
        text: 'Winter Collection'
      },
      {
        src: 'assets/images/banner-2.jpg',
        caption: 'Bottoms',
        text: 'Uber Cool Styles'
      }
    ];
  }

}
