import { isPlatformBrowser } from '@angular/common';
import { AuthStateManager } from './../../state-managers/auth-state-manager';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy,
         ChangeDetectorRef,
         Component,
         NgZone,
         OnInit,
         ViewChild,
         ElementRef,
         AfterViewInit,
         Inject,
         PLATFORM_ID,
         Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: HomeComponent }]
})
export class HomeComponent extends DnngComponentBase implements OnInit, AfterViewInit {

  @ViewChild('greeterOne') private greeterOneElRef!: ElementRef<HTMLElement>;
  @ViewChild('greeterTwo') private greeterTwoElRef!: ElementRef<HTMLElement>;

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public authStateManager: AuthStateManager,
              @Inject(PLATFORM_ID) private _platformId: object,
              private renderer: Renderer2) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.authStateManager.init();
    this.authStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      // tslint:disable-next-line: no-non-null-assertion
      const arrOfLettersOne = this.greeterOneElRef
        .nativeElement
        .textContent!
        .split('');

      // tslint:disable-next-line: no-non-null-assertion
      const arrOfLettersTwo = this.greeterTwoElRef
        .nativeElement
        .textContent!
        .split('');

      this.greeterOneElRef.nativeElement.textContent = '';
      this.greeterTwoElRef.nativeElement.textContent = '';

      let i = 0;
      const arrOfSpans: HTMLElement[] = [];

      arrOfLettersOne.forEach((letter) => {
        const span = this.renderer.createElement('span') as HTMLElement;
        span.textContent = letter;
        span.classList.add('home__animated-letter');
        this.greeterOneElRef.nativeElement.appendChild(span);
        arrOfSpans.push(span);
      });

      arrOfLettersTwo.forEach((letter) => {
        const span = this.renderer.createElement('span') as HTMLElement;
        span.textContent = letter;
        span.classList.add('home__animated-letter');
        this.greeterTwoElRef.nativeElement.appendChild(span);
        arrOfSpans.push(span);
        i++;
      });

      this.ngZone.runOutsideAngular(() => {
        arrOfSpans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add('home__animated-letter-entry');
          }, 800 + index * 50);
        });
      });

    }
  }
}
