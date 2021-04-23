import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UserCartService } from '../../services/user-cart.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface Item {
  id?: string;
  createdAt?: Date;
  nombre: string;
  sku: string;
  descripcion: string;
  quantity: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items!: Observable<Item[]>;
  uid = localStorage.getItem('uid');

  constructor(
    private firestore: AngularFirestore,
    private _userCart: UserCartService,
    private notification: NzNotificationService
  ) {
    this._userCart.init(this.uid);
    this.itemsCollection = this.firestore.collection<Item>('products', (ref) =>
      ref.orderBy('createdAt', 'desc')
    );
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {}

  async addItemToCart(item: Item) {
    const newItem: Item = {
      nombre: item?.nombre,
      descripcion: item?.descripcion,
      sku: item?.sku,
      quantity: 1,
      id: item.id,
    };

    const _item = await this._userCart.checkIfItemExists(item.id);
    if (_item.exists) {
      this.sumQtyItem(newItem.id, _item.doc);
      return;
    }
    this._userCart.cart.doc(item.id).set(newItem);
    this.notification.create(
      'success',
      '¡El producto se añadió al carrito!',
      ''
    );
  }

  sumQtyItem(itemID: string | undefined, item: Item) {
    item.quantity++;
    this._userCart.cart.doc(itemID).update(item);
    this.notification.create('success', '¡El producto se sumó al carrito!', '');
  }
}
