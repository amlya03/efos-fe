import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class InitialDataEntryService {
  koderetirvt = '';

  // /////////////////////////// Download Slik ////////////////////////////////////////////
  protected getDownloadSlikUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-ide/fetchSlikPdf?sd=');
  // /////////////////////////// Download Slik ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI INITIAL DATA ENTRY ////////////////////////////////////////////
  protected daftarAplikasiInitialDataEntry = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ide/list_app_ide?sc='
  );
  // /////////////////////////// DAFTAR APLIKASI INITIAL DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected ideByCuref = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getCuref');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected ideByAppId = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getAppId');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected getProvinsi = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/wilayahSvc/getProvinsi/');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected getTokenDucpil = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/token/generate-token');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// Reff Jenis Bidang ////////////////////////////////////////////
  protected getJenisBidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');
  // /////////////////////////// Reff Jenis Bidang ////////////////////////////////////////////

  // /////////////////////////// Reff Sektor Ekonomi ////////////////////////////////////////////
  protected getListSektor = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se='
  );
  // /////////////////////////// Reff Sektor Ekonomi ////////////////////////////////////////////

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localstorateservice: SessionStorageService
  ) {}

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaftarAplikasiInitialDataEntry(): Observable<ApiResponse> {
    this.koderetirvt = this.localstorateservice.retrieve('sessionKdCabang');
    return this.http.get<ApiResponse>(this.daftarAplikasiInitialDataEntry + this.koderetirvt);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getIdeByCuref(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ideByCuref);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getIdeById(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ideByAppId);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getProvinsiDucapil(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getProvinsi);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getTokenDukcapil(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getTokenDucpil);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Jenis BIdang  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getBidang(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getJenisBidang);
  }
  // ////////////////////// Ref Jenis BIdang  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // /////////////////////////// Reff Sektor Ekonomi ////////////////////////////////////////////
  getSektor(id: string | number | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListSektor + id);
  }
  // /////////////////////////// Reff Sektor Ekonomi ////////////////////////////////////////////

  // /////////////////////////// Download Slik ////////////////////////////////////////////
  getDownloadSlik(id_number: string | number | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getDownloadSlikUrl + id_number);
  }
  // /////////////////////////// Download Slik ////////////////////////////////////////////
}
