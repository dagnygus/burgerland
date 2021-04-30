import { AuthStateManager } from './../../../state-managers/auth-state-manager';
import { Observable } from 'rxjs';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { Component, OnInit, EventEmitter, ChangeDetectorRef, NgZone, ElementRef, Renderer2, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: OrderModalComponent }]
})
export class OrderModalComponent extends DnngComponentBase implements OnInit {
  private _makeOrder = new EventEmitter<void>();
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

  @Output() get makeOrder(): Observable<void> { return this._makeOrder; }

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _elementRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2,
              public authStateManager: AuthStateManager) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.authStateManager.onChanged.listen(this, this.markForCheckLocaly.bind(this));
    this.authStateManager.init();
  }

  _riseMakeOrder(): void {
    this._makeOrder.emit();
  }
}
