import { CartStateManager } from './../../state-managers/cart-state-manager';
import { ActivatedRoute } from '@angular/router';
import { ProductsStateManager } from './../../state-managers/products-state-manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductsComponent }]
})
export class ProductsComponent extends DnngComponentBase implements OnInit {
  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public productsStateManager: ProductsStateManager,
              public cartStateManager: CartStateManager,
              private _activatedRoute: ActivatedRoute) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.productsStateManager.onChanged.listen(this, this.markForCheckLocaly.bind(this));
    this._activatedRoute.paramMap.listen(this, (paramMap) => {
      const category = paramMap.get('category');
      if (category) {
        if (this.productsStateManager.category === category) { return; }
        this.productsStateManager.category = category;
        this.productsStateManager.load();
      }
    });
    this.cartStateManager.init();
  }
}
