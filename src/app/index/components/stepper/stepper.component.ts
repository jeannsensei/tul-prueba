import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from './../../routes/products/products.component';
import { UserCartService } from './../../services/user-cart.service';
import { Component, OnInit, Input, forwardRef } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true,
    },
  ],
})
export class StepperComponent implements OnInit {
  @Input() itemOnCart!: Item;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor(private _userCart: UserCartService) {}

  ngOnInit(): void {}

  sumQtyItem() {
    this.onTouch();
    this.onChange(this.itemOnCart.quantity);
    this.itemOnCart.quantity++;
    this._userCart.cart.doc(this.itemOnCart.id).update(this.itemOnCart);
  }

  reduceQtyItem() {
    if (this.itemOnCart.quantity > 1) {
      this.itemOnCart.quantity--;
      this._userCart.cart.doc(this.itemOnCart.id).update(this.itemOnCart);
      this.onTouch();
      this.onChange(this.itemOnCart.quantity);
    } else {
      this.removeItemFromCart();
    }
  }

  removeItemFromCart() {
    this._userCart.cart.doc(this.itemOnCart.id).delete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
