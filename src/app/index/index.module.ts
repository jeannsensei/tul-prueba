import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { ProductsComponent } from './routes/products/products.component';
import { IndexComponent } from './routes/index/index.component';
import { ShoppingCartComponent } from './routes/shopping-cart/shopping-cart.component';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [ProductsComponent, IndexComponent, ShoppingCartComponent, StepperComponent],
  imports: [CommonModule, IndexRoutingModule, SharedModule],
})
export class IndexModule {}
