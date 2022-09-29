import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService {
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  // protected daftarAplikasiDataEntry = this.applicationConfigService.getEndpointFor(
  //   'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?su=199183174 '
  // );
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;
  daftarAplikasiDataEntry: any;

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.localStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.localStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.localStorageService.retrieve('sessionKdCabang');
  }

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaftarAplikasiDataEntry(): Observable<ApiResponse> {
    // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
    this.daftarAplikasiDataEntry = this.applicationConfigService.getEndpointFor(
      // 'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?sc='+this.untukSessionKodeCabang+'&su='+this.untukSessionUserName
      'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?sc=&su=' + this.untukSessionUserName
    );
    // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

    return this.http.get<ApiResponse>(this.daftarAplikasiDataEntry);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
