import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { AppComponent } from './app.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'login', component: AppComponent },
  { path: '*', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
