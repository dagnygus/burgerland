import { isPlatformBrowser } from '@angular/common';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, NgZone, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: SidebarComponent }]
})
export class SidebarComponent extends DnngComponentBase implements AfterViewInit {
  @ViewChild('navList') private navListElRef!: ElementRef<HTMLElement>;

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              @Inject(PLATFORM_ID) private _platformId: object) {
    super(cd, ngz);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      const listItems = Array.from(
        this.navListElRef
          .nativeElement
          .querySelectorAll('li')
      );

      this.ngZone.runOutsideAngular(() => {
        listItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('sidebar__nav-link-entry');
          }, 700 + index * 200);
        });
      });
    }
  }
}
