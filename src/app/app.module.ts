import { CartStateManager } from './state-managers/cart-state-manager';
import { AuthStateManager } from './state-managers/auth-state-manager';
import { ProductsStateManager } from './state-managers/products-state-manager';
import './rxjs-extension/rxjs-extension';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsItemComponent } from './components/products/products-item/products-item.component';
import { ProductItemPlaceholderComponent } from './components/products/product-item-placeholder/product-item-placeholder.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { DnngForDirective } from './directives/dnng-for.directive';
import { EmailAlreadyInUseValidatorDirective } from './directives/email-already-in-use-validator.directive';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DnAsyncPipe } from './pipes/dn-async.pipe';
import { ProductModalComponent } from './components/products/product-modal/product-modal.component';
import { ItemPricePipe } from './pipes/item-price.pipe';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CartPanelComponent } from './components/cart/cart-panel/cart-panel.component';
import { ClearCartModalComponent } from './components/cart/clear-cart-modal/clear-cart-modal.component';
import { OrderModalComponent } from './components/cart/order-modal/order-modal.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BurgerlandCarouselComponent } from './components/burgerlad-carousel/burgerlad-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductsItemComponent,
    ProductItemPlaceholderComponent,
    RegisterFormComponent,
    DnngForDirective,
    EmailAlreadyInUseValidatorDirective,
    LoginFormComponent,
    DnAsyncPipe,
    ProductModalComponent,
    ItemPricePipe,
    CartComponent,
    CartItemComponent,
    CartPanelComponent,
    ClearCartModalComponent,
    OrderModalComponent,
    OrderSuccessComponent,
    SidebarComponent,
    BurgerlandCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RxReactiveFormsModule,
  ],
  providers: [
    ProductsStateManager,
    AuthStateManager,
    CartStateManager,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
