import { CartStateManager } from './../../state-managers/cart-state-manager';
import { AuthStateManager } from './../../state-managers/auth-state-manager';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy,
         ChangeDetectorRef,
         Component,
         ElementRef,
         HostListener,
         Inject,
         NgZone,
         OnInit,
         PLATFORM_ID,
         AfterViewInit, } from '@angular/core';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { tap, subscribeOn } from 'rxjs/operators';
import { animationFrameScheduler } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: HeaderComponent }]
})
export class HeaderComponent extends DnngComponentBase implements OnInit, AfterViewInit {

  dropdownOpen = false;

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public authStateManager: AuthStateManager,
              public cartStateManager: CartStateManager,
              private _elementRef: ElementRef<HTMLElement>,
              @Inject(PLATFORM_ID) private _platformId: object) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.cartStateManager.onChanged.listen(this, this.markForCheckLocaly.bind(this));
    this.authStateManager.onChanged.pipe(
      tap(this.markForCheckLocaly.bind(this))
    ).listen(this, this.startButtonAnimation.bind(this));
    this.authStateManager.init();
    this.cartStateManager.init();
  }

  ngAfterViewInit(): void {
    this.startEntryAnimation();
  }

  @HostListener('document:click', ['$event.target'])
  private contextClicked(target: HTMLElement): void {
    if (target.closest('.header__burgerland-button')) {
      return;
    }
    if (!target.closest('.header__dropdown-menu') && this.dropdownOpen) {
      this.dropdownOpen = false;
      this.markForCheckLocaly();
    }
  }

  private startEntryAnimation(): void {
    if (isPlatformBrowser(this._platformId)) {
      const burgerladMenuButton = this._elementRef
        .nativeElement
        .querySelector('.header__burgerland-button') as HTMLElement;

      const burgerlandLogo = this._elementRef
        .nativeElement
        .querySelector('.header__title') as HTMLElement;

      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          burgerladMenuButton.style.transform = 'scale(1)';
        }, 500);

        setTimeout(() => {
          burgerlandLogo.style.transform = 'scale(1)';
        }, 300);

      });
    }

    this.startButtonAnimation();
  }

  private startButtonAnimation(): void {

    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        const headerButtons = Array.from(
          this._elementRef
            .nativeElement
            .querySelectorAll('.header__btn-entry') as NodeListOf<HTMLElement>
        ).reverse();

        if (headerButtons[0].classList.contains('header__btn-entry-start')) {
          headerButtons[0].classList.remove('header__btn-entry-start');
        }

        this.ngZone.runOutsideAngular(() => {
          headerButtons.forEach((button, index) => {
            setTimeout(() => {
              button.classList.add('header__btn-entry-start');
            }, (index + 1) * 200 + 490);
          });
        });
      }, 10);
    }
  }
}
