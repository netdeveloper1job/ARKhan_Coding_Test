import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: any, headers?: any): Observable<T> {
    return this.http.get<T>(url, {
      params: params ? new HttpParams({ fromObject: params }) : undefined,
      headers: headers ? new HttpHeaders(headers) : undefined
    }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: headers ? new HttpHeaders(headers) : undefined
    }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http.put<T>(url, body, {
      headers: headers ? new HttpHeaders(headers) : undefined
    }).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http.patch<T>(url, body, {
      headers: headers ? new HttpHeaders(headers) : undefined
    }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, headers?: any): Observable<T> {
    return this.http.delete<T>(url, {
      headers: headers ? new HttpHeaders(headers) : undefined
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMsg = '';
    if (error.error && error.error.message) {
      errorMsg = error.error.message;
    } else if (error.message) {
      errorMsg = error.message;
    } else {
      errorMsg = 'An unknown error occurred';
    }
    return throwError(() => errorMsg);
  }
}
