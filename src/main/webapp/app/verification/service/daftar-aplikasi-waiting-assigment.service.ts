import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { ApiResponseDa } from './config/apiResponse_daWa';
import { Observable } from 'rxjs';
import { daWaModel } from '../daftar-aplikasi-waiting-assigment/daWa.model';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

export type EntityResponseDaWa = HttpResponse<daWaModel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class DaftarAplikasiWaitingAssigmentService {
  // constructor(private http: HttpClient) {}

  // public getDaWa(): Observable<ApiResponseDa[]> {
  //   return this.http.get<ApiResponseDa[]>('http://jsonplaceholder.typicode.com/posts');
  // }

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-verif/list_app_verif');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getDaWa(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
