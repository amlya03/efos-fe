import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';

export type EntityArrayResponseDaWuS = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class DaftarAplikasiWaitingUpdateStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/list_app_analisa_review'
  );
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}
  getDaWuS(req?: any): Observable<EntityArrayResponseDaWuS> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
