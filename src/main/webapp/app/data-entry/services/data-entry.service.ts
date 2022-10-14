import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { LocalStorageService } from 'ngx-webstorage';
import { EntityArrayResponseDaWa } from '../data-entry-component.servis';
import { createRequestOption } from 'app/core/request/request-util';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService {
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  // protected daftarAplikasiDataEntry = this.applicationConfigService.getEndpointFor(
  //   'http://10.20.34.178:8805/api/v1/efos-de/list_app_de?su=199183174 '
  // );
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;
  daftarAplikasiDataEntry: any;
  postId: any;

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

  // ///////////////////////////// Data Entry \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchSemuaDataDE = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  // ///////////////////////////// Data Entry \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get Job \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchSemuaJob = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  // ///////////////////////////// Get Job \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get MEMO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchMemo = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getMemoByDe?sd=');
  // ///////////////////////////// Get MEMO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  getDaftarAplikasiDataEntry(): Observable<ApiResponse> {
    this.daftarAplikasiDataEntry = this.applicationConfigService.getEndpointFor(
      // 'http://10.20.34.178:8805/api/v1/efos-de/list_app_de?sc='+this.untukSessionKodeCabang+'&su='+this.untukSessionUserName
      'http://10.20.34.178:8805/api/v1/efos-de/list_app_de?sc=&su=' + this.untukSessionUserName
    );
    return this.http.get<ApiResponse>(this.daftarAplikasiDataEntry);
  }
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Data DE ////////////////////////////////////////////
  getFetchSemuaDataDE(app_no_de: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaDataDE + app_no_de);
  }
  // /////////////////////////// Ref Semua Data DE ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Data Job ////////////////////////////////////////////
  getFetchSemuaDataJob(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaJob + curef);
  }
  // /////////////////////////// Ref Semua Data Job ////////////////////////////////////////////

  // /////////////////////////// MEMO ////////////////////////////////////////////
  getfetchMemo(app_no_de: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchMemo + app_no_de);
  }
  // /////////////////////////// MEMO ////////////////////////////////////////////

  getprovinsi(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvinsi/', {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOH' + token);
  }

  getkabkota(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKota/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  getkecamatan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKec/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkecamatan');
  }

  getkelurahan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKel/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkecamatan');
  }
}
