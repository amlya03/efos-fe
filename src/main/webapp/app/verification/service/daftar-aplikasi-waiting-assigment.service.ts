import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseDa } from './config/apiResponse_daWa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DaftarAplikasiWaitingAssigmentService {
  constructor(private http: HttpClient) {}

  public getDaWa(): Observable<ApiResponseDa[]> {
    return this.http.get<ApiResponseDa[]>('http://jsonplaceholder.typicode.com/posts');
  }
}
