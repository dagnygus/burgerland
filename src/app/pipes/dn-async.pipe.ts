import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { Observable, Subscription } from 'rxjs';
import { Pipe, PipeTransform, OnDestroy, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';

@Pipe({
  name: 'dnAsync',
  pure: false,
})
export class DnAsyncPipe implements PipeTransform, OnDestroy {

  private _currentValue: any;
  private _initialized = false;
  private _subscription?: Subscription;

  constructor(private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef) {}

  transform(value: Observable<any>, arg?: DnngComponentBase): any {

    if (!this._initialized) {
      this._initialized = true;
      this._subscription = value.subscribe((data) => {
        this._currentValue = data;
        if (arg) {
          arg.markForCheckLocaly();
          return;
        }
        const subscription = this.ngZone.onMicrotaskEmpty.subscribe(() => {
          this.changeDetectorRef.detectChanges();
          subscription.unsubscribe();
        });
      });
    }

    return this._currentValue;
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
