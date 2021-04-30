import { Pipe, PipeTransform, OnChanges } from '@angular/core';

@Pipe({
  name: 'itemPrice'
})
export class ItemPricePipe implements PipeTransform {

  transform(price?: number, quantity?: number): number | null {

    if (!price || !quantity) { return null; }

    return quantity * price;
  }
}
