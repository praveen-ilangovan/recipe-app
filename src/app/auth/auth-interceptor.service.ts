import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpParams } from '@angular/common/http'

import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

      if (!this.authService.user) {
          return next.handle(req);
      }

      const modifiedReq = req.clone({
              params: new HttpParams().set("auth", this.authService.user.token)
          });

      console.log("Request is being sent with the auth token");
      return next.handle(modifiedReq);
    }
}
