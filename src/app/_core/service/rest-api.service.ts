import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IHttpClientRequestConfig } from "../model/ihttp-client-request-config";

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  constructor(private http: HttpClient) {}
  IHttpClientRequestConfig;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  get(
    endpoint: string,
    httpRequst?: IHttpClientRequestConfig
  ): Observable<any> {
    return this.http
      .get<any>(
        this.buildRequestUrl(endpoint),
        this.buildHttpOptions(httpRequst)
      )
      .pipe(catchError(this.errorHandler));
  }

  post(
    endpoint: string,
    data: any,
    httpRequst?: IHttpClientRequestConfig
  ): Observable<any> {
    return this.http
      .post<any>(
        this.buildRequestUrl(endpoint),
        data,
        this.buildHttpOptions(httpRequst)
      )
      .pipe(catchError(this.errorHandler));
  }

  options(
    endpoint: string,
    httpRequst?: IHttpClientRequestConfig
  ): Observable<any> {
    return this.http
      .options<any>(
        this.buildRequestUrl(endpoint),
        this.buildHttpOptions(httpRequst)
      )
      .pipe(catchError(this.errorHandler));
  }

  put(
    endpoint: string,
    data: any,
    httpRequst?: IHttpClientRequestConfig
  ): Observable<any> {
    return this.http
      .put<any>(
        this.buildRequestUrl(endpoint),
        data,
        this.buildHttpOptions(httpRequst)
      )
      .pipe(catchError(this.errorHandler));
  }

  patch(
    endpoint: string,
    data: any,
    httpRequst?: IHttpClientRequestConfig
  ): Observable<any> {
    return this.http
      .patch<any>(
        this.buildRequestUrl(endpoint),
        data,
        this.buildHttpOptions(httpRequst)
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(
    endpoint: string,
    data: any,
    httpRequst?: IHttpClientRequestConfig
  ): Observable<any> {
    return this.http
      .delete<any>(
        this.buildRequestUrl(endpoint),
        this.buildHttpOptions(httpRequst)
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  private buildRequestUrl(endpoint: string): string {
    return `${environment.baseUrl}${endpoint}`;
  }

  private buildHttpOptions(config: IHttpClientRequestConfig): any {
    return {
      headers: config?.headers ? config.headers : this.httpOptions,
      observe: config?.observe,
      params: config?.params,
      reportProgress: config?.reportProgress,
      responseType: config?.responseType,
      withCredentials: config?.withCredentials,
    };
  }
}
