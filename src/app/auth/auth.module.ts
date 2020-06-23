import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { AuthInterceptorService } from './auth-interceptor.service';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
          {path: '', component:  AuthComponent}
    ]),
    NgbModule,
    FormsModule,
    SharedModule
  ],
  providers: [{
                  provide: HTTP_INTERCEPTORS,
                  useClass: AuthInterceptorService,
                  multi: true
              }],
})
export class AuthModule { }
