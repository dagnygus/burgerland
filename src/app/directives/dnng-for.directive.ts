import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dnngFor]'
})
export class DnngForDirective {

  @Input() set dnngForIn(value: any) {
    this._viewContainerRef.clear();
    for (const prop in value) {
      if (prop) {
        this._viewContainerRef.createEmbeddedView(this._templateRef, {
          $implicit: value[prop]
        });
      }
    }
  }

  constructor(private _viewContainerRef: ViewContainerRef,
              private _templateRef: TemplateRef<any>) { }

}
