import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { TokenStorage } from "../guard/token-storage";
import { LogService } from "../log/log.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: TokenStorage,
    private log: LogService,
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.log.info("AuthInterceptor called ...");
    // Get the auth token from the service.
    const authToken = this.auth?.getToken();

    // Clone the request and set the new header in one step.

    const clonedRequest = req.clone({
      headers: req.headers
        // .set('Cache-Control','no-cache')
        // .set('Content-Type',contentType)
        // .set('Pragma','no-cache')
        .set("Authorization", "Bearer " + authToken),
    });

    // this.log.info('Bearer ' + authToken);
    // send cloned request with header to the next handler.
    return next.handle(clonedRequest);
  }
}
