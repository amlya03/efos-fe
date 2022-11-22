import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class KomiteService {
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // //////////////////////////////////////////////// List Approval ///////////////////////////////////////////////////////////////////////
  protected getListApproval = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-approval/list_app_approval'
  );
  // //////////////////////////////////////////////// List Approval ///////////////////////////////////////////////////////////////////////

  // //////////////////////////////////////////////// List Approval ///////////////////////////////////////////////////////////////////////
  getDaftarAplikasiApproval(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListApproval);
  }
  // //////////////////////////////////////////////// List Approval ///////////////////////////////////////////////////////////////////////
}
