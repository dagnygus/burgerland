import { ProductModel } from './../../../models/product-model';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductsItemComponent }]
})
export class ProductsItemComponent extends DnngComponentBase {
  @Input() product: ProductModel | null = null;

  private _selected = new EventEmitter();
  @Output() get selected(): Observable<void> {
    return this._selected;
  }
}
