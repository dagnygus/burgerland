import { Subject, Observable } from 'rxjs';
import { AuthModel } from './../models/auth-model';
import { DnngStateManager } from '../state-manager-base/dnng-state-manager';
import * as storageKeys from '../utils/storage-keys';

export class AuthStateManager extends DnngStateManager<AuthModel> {

  private _failedToLogin$ = new Subject<boolean>();
  get failedToLogin$(): Observable<boolean> {
    return this._failedToLogin$;
  }

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  canExecuteSignIn = false;
  canExecuteSignUp = false;

  signUp(): void {

    if (!this.canExecuteSignUp) { return; }

    const newUser: AuthModel = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.saveNewUser(newUser);
    this.setLoggedUser(newUser);
    this.writableState = newUser;
    this.notifyChanges();
  }

  signIn(): void {

    if (!this.canExecuteSignIn) { return; }

    const registeredUsers = this.getRegisteredUsers();
    const user = registeredUsers.find((u) => u.email === this.email && u.password === this.password);
    if (user) {
      this.writableState = user;
      this.setLoggedUser(user);
      this.notifyChanges();
    } else {
      this._failedToLogin$.next(true);
    }
  }

  signOut(): void {
    if (!this.state) { return; }
    this.removeLoggedUser();
    this.writableState = null;
    this.notifyChanges();
  }

  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  isEmailAlreaddyInUse(email: string): boolean {
    const registeredUsers = this.getRegisteredUsers();
    return registeredUsers.some(u => u.email === email);
  }

  protected provideInitialState(): AuthModel | null {
    this.prepareLocalStorageIfIsNotPrepared();
    return this.getLoggedUser();
  }

  private prepareLocalStorageIfIsNotPrepared(): void {
    if (!localStorage.getItem(storageKeys.REGISTERED_USERS)) {
      localStorage.setItem(storageKeys.REGISTERED_USERS, JSON.stringify([]));
    }
  }

  private getRegisteredUsers(): AuthModel[] {
    // tslint:disable-next-line: no-non-null-assertion
    return JSON.parse(localStorage.getItem(storageKeys.REGISTERED_USERS)!) as AuthModel[];
  }

  private setRegisteredUsers(registeredUsers: AuthModel[]): void {
    localStorage.setItem(storageKeys.REGISTERED_USERS, JSON.stringify(registeredUsers));
  }

  private saveNewUser(user: AuthModel): void {
    const registerdUsers = this.getRegisteredUsers();
    registerdUsers.push(user);
    this.setRegisteredUsers(registerdUsers);
  }

  private setLoggedUser(user: AuthModel): void {
    localStorage.setItem(storageKeys.LOGGED_USER, JSON.stringify(user));
  }

  private getLoggedUser(): AuthModel | null {
    const loggedUserJSON = localStorage.getItem(storageKeys.LOGGED_USER);
    if (loggedUserJSON) {
      return JSON.parse(loggedUserJSON);
    } else {
      return null;
    }
  }

  private removeLoggedUser(): void {
    localStorage.removeItem(storageKeys.LOGGED_USER);
  }

}
