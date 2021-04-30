import { Observable } from 'rxjs';
import { ProductModel } from './../models/product-model';
import { DnngStateManager } from '../state-manager-base/dnng-state-manager';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs/operators';

@Injectable()
export class ProductsStateManager extends DnngStateManager<ProductModel[]> {

  private _category: string | null = null;
  private _url: string | null = null;
  set category(value: string | null) {
    if (this._category === value) { return; }
    this._category = value;
    this._url = 'assets/products_data/' + value + '.json';
  }
  get category(): string | null {
    return this._category;
  }

  trackFn = (index: number, item: ProductModel) => {
    return item.id;
  }

  constructor(private _httpClient: HttpClient) {
    super();
  }

  protected provideInitialState(): Observable<ProductModel[]> | null {
    if (!this._url) { return null; }
    return this._httpClient.get<ProductModel[]>(this._url).pipe(delay(2000), first());
  }
}
