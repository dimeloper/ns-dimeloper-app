import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/internal/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from '~/app/auth/user.model';
import { RouterExtensions } from 'nativescript-angular';

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

@Injectable({providedIn: 'root'})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

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
    this.router.navigate(['/'], {clearHistory: true});
  }

  private handleUserLogin(email: string, token: string, userId: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
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
