import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductsComponent} from './components/products/products.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: AppComponent},
  {path: '*', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
