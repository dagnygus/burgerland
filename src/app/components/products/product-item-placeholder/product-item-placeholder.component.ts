import { Observable } from 'rxjs';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-item-placeholder',
  templateUrl: './product-item-placeholder.component.html',
  styleUrls: ['./product-item-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductItemPlaceholderComponent }]
})
export class ProductItemPlaceholderComponent extends DnngComponentBase {

}
