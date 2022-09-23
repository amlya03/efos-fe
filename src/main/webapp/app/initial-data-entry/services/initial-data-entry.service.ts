import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class InitialDataEntryService {
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected daftarAplikasiInitialDataEntry = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-ide/list_app_ide?sc=20000'
  );
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaftarAplikasiInitialDataEntry(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.daftarAplikasiInitialDataEntry);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
