import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/internal/operators';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from '~/app/auth/user.model';
import { RouterExtensions } from 'nativescript-angular';
import { getString, hasKey, remove, setString } from 'tns-core-modules/application-settings';

const FIREBASE_API_KEY = 'API-KEY'; // YOUR FIREBASE API KEY

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

interface LoggedInUserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: number;

  constructor(private httpClient: HttpClient,
              private router: RouterExtensions) {
  }

  get user() {
    return this._user.asObservable();
  }

  register(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {
        this.handleError(errorResponse.error.error.message);
        return throwError(errorResponse);
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleUserLogin(resData.email, resData.idToken, resData.localId, parseInt(resData.expiresIn));
        }
      })
    );
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {
        this.handleError(errorResponse.error.error.message);
        return throwError(errorResponse);
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleUserLogin(resData.email, resData.idToken, resData.localId, parseInt(resData.expiresIn));
        }
      })
    );
  }

  logout() {
    this._user.next(null);
    remove('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/auth'], {clearHistory: true});
  }

  autoLogin() {
    if (!hasKey('lastLoggedInUser')) {
      return of(false);
    }

    const lastLoggedInUserData: LoggedInUserData = JSON.parse(getString('lastLoggedInUser'));
    const loadedUser = new User(
      lastLoggedInUserData.email,
      lastLoggedInUserData.id,
      lastLoggedInUserData._token,
      new Date(lastLoggedInUserData._tokenExpirationDate)
    );

    if (loadedUser.isAuth) {
      this._user.next(loadedUser);
      this.autoLogout(loadedUser.timeToExpiry);
      return of(true);
    }

    return of(false);
  }

  autoLogout(expiryDuration: number) {
    this.tokenExpirationTimer = setTimeout(this.logout.bind(this), expiryDuration);
  }

  private handleUserLogin(email: string, token: string, userId: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    setString('lastLoggedInUser', JSON.stringify(user));
    this.autoLogout(user.timeToExpiry);
    this._user.next(user);
  }

  private handleError(errorMessage: string) {
    console.log(errorMessage);
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        alert('This email address exists already!');
        break;
      case 'INVALID_PASSWORD':
        alert('Your password is invalid!');
        break;
      default:
        alert('Something went wrong, please try again.');
    }
  }
}
