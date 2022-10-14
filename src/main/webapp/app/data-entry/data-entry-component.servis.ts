import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dataentrymodel } from '../data-entry/data-entry-model';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

export type EntityResponseDaWa = HttpResponse<dataentrymodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class DaftarAplikasiWaitingAssigmentService {
  protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_appraisal');
  protected resourceUrl = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=de220820000148'
  );

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected daftarAplikasiDataEntry = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?sc=20000'
  );
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  }

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaftarAplikasiDataEntry(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.daftarAplikasiDataEntry);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
