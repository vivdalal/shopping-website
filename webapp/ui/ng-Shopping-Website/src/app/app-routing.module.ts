import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { AppComponent } from './app.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {LoginComponent} from './components/login/login.component';
import { RunmanComponent } from './modules/runman/runman.component';
import {RegisterComponent} from './components/register/register.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'orders', component: OrderPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game', component: RunmanComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
