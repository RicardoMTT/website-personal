import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /*
  Contador que se incrementa cada vez que se intercepta una solicitud.
  Esto se utiliza para llevar un registro de las solicitudes pendientes.
  */
  private count = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.count++;
    this.loadingService.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.count--;
          this.loadingService.setLoading(false, request.url);
          return throwError(error);
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.count--;
            if (this.count === 0) {
              this.loadingService.setLoading(false, request.url);
            }
          }
          return evt;
        })
      );
  }
}
