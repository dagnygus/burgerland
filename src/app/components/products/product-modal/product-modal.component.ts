import { Router } from '@angular/router';
import { CartStateManager } from './../../../state-managers/cart-state-manager';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductModalComponent }]
})
export class ProductModalComponent extends DnngComponentBase {

  @Input() cartStateManager: CartStateManager | null = null;

  private _open = false;
  set open(value: boolean) {
    if (this._open === value) { return; }
    this._open = value;
    if (value) {
      this._renderer.addClass(this._elementRef.nativeElement, 'open');
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, 'open');
    }
  }
  get open(): boolean {
    return this._open;
  }

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _elementRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2,
              private _router: Router) {
    super(cd, ngz);
  }

  private navigateToCart(): void {
    this._router.navigate(['/cart']);
  }

}
