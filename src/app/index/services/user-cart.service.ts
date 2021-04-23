import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserCartService {
  public doc!: AngularFirestoreDocument<any>;
  public cart!: AngularFirestoreCollection<any>;
  public cc!: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  init(uid: string | null) {
    if (!uid) {
      this.auth.signOut().then((data) => {
        this.router.navigate(['']);
        localStorage.clear();
      });
      return;
    }
    this.doc = this.firestore.doc(`carts/${uid}`);
    this.cart = this.doc.collection<any>('product_carts');
    this.cc = this.cart.valueChanges({ idField: 'id' });
  }

  async checkIfItemExists(itemID: string | undefined) {
    let exists: any = {
      exists: false,
      doc: null,
    };

    await this.cart
      .doc(itemID)
      .get()
      .toPromise()
      .then((doc: any) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          exists = { exists: true, doc: doc.data() };
        } else {
          exists = { exists: false, doc: null };
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    return exists;
  }

  // Borra los documentos del carrito uno por uno
  async deleteUserCart() {
    this.cart
      .get()
      .toPromise()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  }
}
