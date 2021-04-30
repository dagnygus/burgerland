import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartItem } from './../../../models/cart-item-model';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output, ChangeDetectorRef, NgZone, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CartItemComponent }]
})
export class CartItemComponent extends DnngComponentBase {
  @Input() cartItem: CartItem | null = null;
  @Input() cartItemChanged: Observable<number> | null = null;

  private _decrease = new EventEmitter<void>();
  private _increase = new EventEmitter<void>();
  private _delete = new EventEmitter<void>();

  @Output() get decrease(): Observable<void> {
    return this._decrease;
  }
  @Output() get increase(): Observable<void> {
    return this._increase;
  }
  @Output() get delete(): Observable<void> {
    return this._delete;
  }

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _elementRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2) {
    super(cd, ngz);
  }

  private onDeleteClick(): void {
    this._renderer.addClass(this._elementRef.nativeElement, 'delete');
    setTimeout(() => {
      this._delete.emit();
      this.markForCheckLocaly();
    }, 300);

  }
}
