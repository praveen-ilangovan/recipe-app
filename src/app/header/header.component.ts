import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/services/data-storage.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // View the collapsibleButton
  @ViewChild("collapsibleButton", {static:true}) collapsibleButton;

  // Listen to click events and if the click is outside the navBar
  // then set the collapse state to true.
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && !this.collapsed) {
      this.collapsed = true;
    }
  }

  // Show the collapsed contents or not.
  collapsed = true;
  // Subscriptions
  userSubscription: Subscription;
  // Authenticated
  isAuthenticated = false;


  constructor(private elementRef: ElementRef,
              private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

      this.isAuthenticated = this.authService.user ? true : false;

      this.userSubscription = this.authService.authSuccess.subscribe(user => {
          this.isAuthenticated = user ? true : false;
          this.router.navigate(["/recipes"]);
      });
  }

  onSaveDataClicked() {
    this.dataStorageService.saveRecipes();
  }

  onFetchDataClicked() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.signout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
