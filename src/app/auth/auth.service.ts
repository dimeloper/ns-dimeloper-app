import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';

const FIREBASE_API_KEY = 'API-KEY'; // YOUR FIREBASE API KEY

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  register(email: string, password: string) {
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        this.handleError(errorResponse.error.error.message);
        return throwError(errorResponse);
      })
    );
  }

  login(email: string, password: string) {
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        this.handleError(errorResponse.error.error.message);
        return throwError(errorResponse);
      })
    );
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
