import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Retrieve JWT Token
    let modifiedReq = req;

    // Clone request and attach headers
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-api-key': environment.apiKey // API Key for Gateway
        }
      });
    } else {
      modifiedReq = req.clone({
        setHeaders: { 'x-api-key': environment.apiKey } // API Key only
      });
    }

    return next.handle(modifiedReq);
  }
}
