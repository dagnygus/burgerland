import { ProductModel } from './../models/product-model';
import { CartItem } from './../models/cart-item-model';
import { DnngStateManager } from '../state-manager-base/dnng-state-manager';
import * as storageKeys from '../utils/storage-keys';

export class CartStateManager extends DnngStateManager<CartItem[]> {

  selectedItem: CartItem | null = null;
  trackFn = (index: number, item: CartItem) => item.id;

  get totalPrice(): number {
    if (!this.writableState) { return 0; }
    let price = 0;
    for (const item of this.writableState) {
      price += item.price * item.quantity;
    }
    return price;
  }

  protected provideInitialState(): CartItem[] {
    this.prepareCartInLocalStorageIfItIsNotThere();
    return this.getCartFromLocalStorage();
  }

  addSelectedItemToCart(): void {

    if (!this.writableState) { return; }

    if (this.selectedItem) {
      const index = this.writableState?.findIndex((ci) => ci.id === this.selectedItem?.id);

      if (index > -1) {
        this.writableState[index].quantity += this.selectedItem.quantity;
        this.saveCartInLocalStorage();
        return;
      }

      this.writableState?.push(this.selectedItem);
      this.saveCartInLocalStorage();
      this.notifyChanges();
    }
  }

  increaseQuantityOfSelectedItem(): void {
    if (this.selectedItem) {
      if (this.selectedItem.quantity === 99) { return; }
      this.selectedItem.quantity++;
    }
  }

  decreaseQuantityOfSelectedItem(): void {
    if (this.selectedItem) {
      if (this.selectedItem.quantity === 1) { return; }
      this.selectedItem.quantity--;
    }
  }

  clearSelection(): void {
    this.selectedItem = null;
  }

  setSelectedItemFromSelectedProduct(product: ProductModel): void {
    this.selectedItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    };
  }

  increaseItemQuantity(index: number): void {
    if (!this.writableState) { return; }
    if (this.writableState[index].quantity === 99) { return; }
    this.writableState[index].quantity++;
    this.saveCartInLocalStorage();
    this.notifyChanges();
  }

  decraseItemQuantity(index: number): void {
    if (!this.writableState) { return; }
    if (this.writableState[index].quantity === 1) { return; }
    this.writableState[index].quantity--;
    this.saveCartInLocalStorage();
    this.notifyChanges();
  }

  removeItemFromCart(index: number): void {
    if (!this.writableState) { return; }
    this.writableState.splice(index, 1);
    this.saveCartInLocalStorage();
    this.notifyChanges();
  }

  clearCart(): void {
    if (!this.writableState) { return; }
    this.writableState.splice(0);
    this.saveCartInLocalStorage();
    this.notifyChanges();
  }

  private prepareCartInLocalStorageIfItIsNotThere(): void {
    const cartJSON = localStorage.getItem(storageKeys.CART);
    if (!cartJSON) {
      localStorage.setItem(storageKeys.CART, JSON.stringify([]));
    }
  }

  private getCartFromLocalStorage(): CartItem[] {
    // tslint:disable-next-line: no-non-null-assertion
    return JSON.parse(localStorage.getItem(storageKeys.CART)!);
  }

  private saveCartInLocalStorage(): void {
    localStorage.setItem(storageKeys.CART, JSON.stringify(this.state));
  }
}
