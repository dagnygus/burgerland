import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, NgZone, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-burgerlad-carousel',
  templateUrl: './burgerlad-carousel.component.html',
  styleUrls: ['./burgerlad-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: BurgerlandCarouselComponent }]
})
export class BurgerlandCarouselComponent extends DnngComponentBase implements AfterViewInit {
  @ViewChild('image1') private image1Ref!: ElementRef<HTMLElement>;
  @ViewChild('image2') private image2Ref!: ElementRef<HTMLElement>;
  @ViewChild('image3') private image3Ref!: ElementRef<HTMLElement>;
  @ViewChild('image4') private image4Ref!: ElementRef<HTMLElement>;
  @ViewChild('image5') private image5Ref!: ElementRef<HTMLElement>;
  @ViewChild('image6') private image6Ref!: ElementRef<HTMLElement>;

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _renderer: Renderer2) {
    super(cd, ngz);
  }

  ngAfterViewInit(): void {
    const imageArr = [
      this.image1Ref,
      this.image2Ref,
      this.image3Ref,
      this.image4Ref,
      this.image5Ref,
      this.image6Ref,
    ];
    let index = 1;
    this._renderer.setStyle(
      imageArr[0].nativeElement,
      'opacity',
      '1'
    );

    this.ngZone.runOutsideAngular(() => {
      interval(4000).listen(this, () => {
        if (index === 6) {
          this._renderer.setStyle(
            imageArr[index - 1].nativeElement,
            'opacity',
            '0'
          );
          this._renderer.setStyle(
            imageArr[0].nativeElement,
            'opacity',
            '1'
          );

          index = 1;
          return;
        }

        this._renderer.setStyle(
          imageArr[index - 1].nativeElement,
          'opacity',
          '0'
        );
        this._renderer.setStyle(
          imageArr[index].nativeElement,
          'opacity',
          '1'
        );
        index++;
      });
    });
  }
}
