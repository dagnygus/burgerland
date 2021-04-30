import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: OrderSuccessComponent }]
})
export class OrderSuccessComponent extends DnngComponentBase {

}
