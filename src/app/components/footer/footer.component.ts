import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: FooterComponent }]
})
export class FooterComponent extends DnngComponentBase {

}
