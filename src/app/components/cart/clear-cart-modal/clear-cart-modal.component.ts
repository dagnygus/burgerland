import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, EventEmitter, Output, ChangeDetectorRef, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';

@Component({
  selector: 'app-clear-cart-modal',
  templateUrl: './clear-cart-modal.component.html',
  styleUrls: ['./clear-cart-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ClearCartModalComponent }]
})
export class ClearCartModalComponent extends DnngComponentBase {
  private _clearCart = new EventEmitter<void>();
  @Output() get clearCart(): Observable<void> { return this._clearCart; }

  private _open = false;
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    if (this._open === value) { return; }
    if (value) {
      this._renderer.addClass(this._elementRef.nativeElement, 'open');
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, 'open');
    }
    this._open = value;
  }

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _elementRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2) {
    super(cd, ngz);
  }
}
