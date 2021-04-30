import { Observable } from 'rxjs';
import { CartStateManager } from './../../../state-managers/cart-state-manager';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent extends DnngComponentBase implements OnInit {

  private _clearCart = new EventEmitter<void>();
  private _makeOrder = new EventEmitter<void>();

  @Input() cartStateManager: CartStateManager | null = null;
  @Output() get clearCart(): Observable<void> { return this._clearCart; }
  @Output() get makeOrder(): Observable<void> { return this._makeOrder; }

  ngOnInit(): void {
    if (this.cartStateManager) {
      this.cartStateManager.onChanged.listen(this, this.markForCheckLocaly.bind(this));
    }
  }
}
