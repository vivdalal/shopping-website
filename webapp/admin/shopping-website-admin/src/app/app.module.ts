import { BrowserModule } from '@angular/platform-browser';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule, MatCardModule,
  MatExpansionModule, MatInputModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component';
import { AnalyticsManagerComponent } from './components/analytics-manager/analytics-manager.component';
import { AnalyticsDataComponent } from './components/analytics-data/analytics-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductCardComponent,
    ProductManagerComponent,
    ProductListComponent,
    AddProductFormComponent,
    AnalyticsManagerComponent,
    AnalyticsDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
