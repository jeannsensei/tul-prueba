import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { IndexComponent } from './routes/index/index.component';
import { ProductsComponent } from './routes/products/products.component';
import { ShoppingCartComponent } from './routes/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'cart',
        component: ShoppingCartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
