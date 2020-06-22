import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) form: NgForm;
  errorText: string;
  isLoading: boolean = false;

  // Subscriptions
  authSuccessSubscription: Subscription;
  authFailedSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

      this.authSuccessSubscription = this.authService.authSuccess.subscribe(user => {
          this.isLoading = false;
      });

      this.authFailedSubscription = this.authService.authFailed.subscribe(message => {
          this.isLoading = false;
          this.displayAuthFailedMessage(message);
      });
  }

  onSubmit() {
      this.authenticate(true);
  }

  authenticate(signup = false) {
      this.isLoading = true;
      if (signup) {
          this.authService.signup(this.form.value.email, this.form.value.password);
      } else {
          this.authService.signin(this.form.value.email, this.form.value.password);
      }
  }

  displayAuthFailedMessage(message: string) {
      if (message === "EMAIL_EXISTS") {
          this.errorText = "This email address is already linked to an account. Please sign in.";
      } else if (message === "EMAIL_NOT_FOUND") {
          this.errorText = "This email address is not registered. Please sign up.";
      } else if (message === "INVALID_PASSWORD") {
          this.errorText = "Invalid Username/Password";
      } else {
          this.errorText = message;
      }

      setTimeout(() => {this.errorText = undefined}, 2000);
  }

  ngOnDestroy() {
      this.authSuccessSubscription.unsubscribe();
      this.authFailedSubscription.unsubscribe();
  }

}
