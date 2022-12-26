import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { ApiResponseDa } from './config/apiResponse_daWa';
import { Observable } from 'rxjs';

import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { jobinfolist } from './job-info-modellist';
import { environment } from 'environments/environment';

export type EntityResponseDaWa = HttpResponse<jobinfolist>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class DaftarAplikasiWaitingAssigmentService {
  baseUrl: string = environment.baseUrl;
  protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_appraisal');
  // protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_appraisal_process');
  protected resourceUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_app_verif');
  // protected resourceUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_app_verif');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getDaWa(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
