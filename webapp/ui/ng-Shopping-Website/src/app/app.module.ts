import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatTooltipModule
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import {LoginComponent} from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { RunmanModule } from './modules/runman/runman.module';

export const MONTH_YEAR_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM'
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    ProductCardComponent,
    FeaturesBannerComponent,
    ImagesBannerComponent,
    ProductsSectionComponent,
    FilterCollectionPipe,
    CartPageComponent,
    CartItemComponent,
    CheckoutComponent,
    CardItemComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbCarouselModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatCheckboxModule,
    RunmanModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_DATE_FORMAT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
