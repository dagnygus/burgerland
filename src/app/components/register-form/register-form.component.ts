import { Router } from '@angular/router';
import { AuthStateManager } from './../../state-managers/auth-state-manager';
import { DnngComponentBase } from 'src/app/component-base/dnng-component-base';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: RegisterFormComponent }]
})
export class RegisterFormComponent extends DnngComponentBase implements OnInit {
  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public authStateManager: AuthStateManager,
              private _router: Router) {
    super(cd, ngz);
  }

  private submitButtonClick(form: NgForm): void {
    for (const controlName in form.controls) {
      if (controlName) {
        form.controls[controlName].markAsDirty();
        form.controls[controlName].markAsTouched();
      }
    }
    this.markForCheckLocaly();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.authStateManager.clearFields();
  }

  ngOnInit(): void {
    this.authStateManager.onChanged.listen(this, () => {
      if (this.authStateManager.state) {
        this._router.navigate(['/']);
      }
    });

    this.authStateManager.init();
  }
}
