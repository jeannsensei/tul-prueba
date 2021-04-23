import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public doc!: AngularFirestoreDocument<any>;
  public orders!: AngularFirestoreCollection<any>;
  public cc: any;

  constructor(private firestore: AngularFirestore) {}

  createOrder(order: any, uid: any) {
    this.doc = this.firestore.doc(`product_carts/${uid}`);
    this.orders = this.doc.collection<any>('orders');
    return this.orders.add(order);
  }
}
