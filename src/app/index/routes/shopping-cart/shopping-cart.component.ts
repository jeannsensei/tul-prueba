import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrdersService } from './../../services/orders.service';
import { UserCartService } from './../../services/user-cart.service';
import { Item } from './../products/products.component';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  items!: Observable<Item[]>;
  uid = localStorage.getItem('uid');

  constructor(
    private _userCart: UserCartService,
    private _orders: OrdersService,
    private notification: NzNotificationService
  ) {
    this._userCart.init(this.uid);
    this.items = this._userCart.cc;
  }

  ngOnInit(): void {}

  init() {}

  removeItemFromCart(itemID: string | undefined) {
    this._userCart.cart.doc(itemID).delete();
  }

  async createOrder() {
    const order: any = {
      products: [],
      status: 'pending',
    };
    // Recibo la lista de productos del carrito
    await this._userCart.cart
      .get()
      .toPromise()
      .then((querySnapshot) => {
        order.products = querySnapshot.docs.map((doc) => doc.data());
      });
    // Crear la orden
    this._orders.createOrder(order, this.uid).then(() => {
      this.notification.create('success', '¡La orden se ha creado!', '');
      this._userCart.deleteUserCart();
    });
  }
}
