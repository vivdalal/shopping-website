import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FeaturesBannerComponent } from './components/features-banner/features-banner.component';
import { ImagesBannerComponent } from './components/images-banner/images-banner.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { FilterCollectionPipe } from './pipes/filter-collection.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    ProductCardComponent,
    FeaturesBannerComponent,
    ImagesBannerComponent,
    ProductsSectionComponent,
    FilterCollectionPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbCarouselModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
