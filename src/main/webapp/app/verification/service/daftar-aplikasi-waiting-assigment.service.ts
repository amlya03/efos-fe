import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
// import { createRequestOption } from 'app/core/request/request-util';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class DaftarAplikasiWaitingAssigmentService {
  protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_appraisal');
  // protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-verif/list_appraisal_process');
  // protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-verif/list_app_verif');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_app_verif');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // ///////////////////////////contoh post get di angular////////////////////////////////////////////////
  // getDaWa(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  // }
  // ///////////////////////////contoh post get di angular////////////////////////////////////////////////

  getDaWa(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.resourceUrl);
  }

  getDaWaAprisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.resourceUrlAprisal);
  }
}
