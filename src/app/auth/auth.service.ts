import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    });
  }

  login(email: string, password: string) {
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    });
  }
}
