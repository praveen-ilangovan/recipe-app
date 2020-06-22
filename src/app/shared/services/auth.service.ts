import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { User } from '../models/user.model';

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // CurrentAuthenticated user
  user: User = undefined;

  // Subjects
  authSuccess = new Subject<User>();
  authFailed = new Subject<string>();

  autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
      this.http.post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGr_uhPHkocrfj6VRJS1NBbGxzaU88a_Y",
          {email: email, password: password, returnSecureToken: true}
      ).subscribe(
          responseData => {
              this.signedIn(responseData);
          },
          errorResponse => {
              this.authFailed.next(errorResponse.error.error.message);
          })
  }

  signin(email: string, password: string) {
      this.http.post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGr_uhPHkocrfj6VRJS1NBbGxzaU88a_Y",
          {email: email, password: password, returnSecureToken: true}
      ).subscribe(
          responseData => {
              this.signedIn(responseData);
          },
          errorResponse => {
              this.authFailed.next(errorResponse.error.error.message);
          })
  }


  autoLogIn() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiration: string
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return
    }
    // convert userData into User
    const loadedUser = new User(userData.email,
                                userData.id,
                                userData._token,
                                new Date(userData._tokenExpiration));

    // Check if the user is still valid
    if (!loadedUser.token) {
      return
    }

    this.user = loadedUser;

    // Setup an autoLogoutTimer
    const expirationTime = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
    this.autoLogOut(expirationTime);

    this.authSuccess.next(this.user);
  }

  autoLogOut(duration) {
    this.autoLogoutTimer = setTimeout(() => {this.signout()}, duration);
  }

  signedIn(responseData: AuthResponseData) {
    const expirationTime = new Date()
    expirationTime.setSeconds(expirationTime.getSeconds() + (+responseData.expiresIn));

    this.user = new User(responseData.email,
                          responseData.localId,
                          responseData.idToken,
                          expirationTime);

    // Add to the local storage
    localStorage.setItem("userData", JSON.stringify(this.user));

    // Setup an autoLogoutTimer
    this.autoLogOut((+responseData.expiresIn)*1000);
    this.authSuccess.next(this.user);
  }

  signout() {
    this.user = null;
    this.authSuccess.next(this.user);
    localStorage.removeItem("userData");

    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }

    this.router.navigate(["/"]);
  }
}
