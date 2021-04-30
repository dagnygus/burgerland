import { Router } from '@angular/router';
import { CartStateManager } from './../../state-managers/cart-state-manager';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CartComponent }]
})
export class CartComponent extends DnngComponentBase implements OnInit {
  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public cartStateManager: CartStateManager,
              private _router: Router) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.cartStateManager.init();
  }

  makeOrder(): void {
    this.cartStateManager.clearCart();
    this._router.navigate(['/order-success']);
  }
}
