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
  //   'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?su=199183174 '
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
  protected fetchSemuaDataDE = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  // ///////////////////////////// Data Entry \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Struktur Pembiayaan Data entry \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchSemuaStrukturDE = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getStrukturBiayaByDe?sc='
  );
  // ///////////////////////////// Struktur Pembiayaan Data entry \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get Job \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchSemuaJob = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  // ///////////////////////////// Get Job \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get View Job \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getViewJob = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getVJobByCuref?sj=');
  // ///////////////////////////// Get ViewJob \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////////////////////////////// Get Job Pasangan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getJobPasangan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getJobPasanganByCuref?sc='
  );
  // //////////////////////////////////////////////////// Get Job Pasangan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get MEMO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchMemo = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getMemoByDe?sd=');
  // ///////////////////////////// Get MEMO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get api list_akses_rumah \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchlistaksesrumah = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_akses_rumah');
  // ///////////////////////////// Get api list_akses_rumah \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get api list_fasilitas_listrik \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchlistfasilitaslistrik = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_fasilitas_listrik'
  );
  // ///////////////////////////// Get api list_fasilitas_listrik \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get api list_kondisi_lingkungan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchlistkondisilingkungan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_kondisi_lingkungan'
  );
  // ///////////////////////////// Get api list_kondisi_lingkungan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get ai list_lokasi_rumah \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchlistlokasirumah = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_lokasi_rumah'
  );
  // ///////////////////////////// Get api list_lokasi_rumah \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////// Get ai listagunan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected fetchgetlistaguunan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getCollateralByCuref?sc='
  );
  // ///////////////////////////// Get api listagunan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  getDaftarAplikasiDataEntry(): Observable<ApiResponse> {
    this.daftarAplikasiDataEntry = this.applicationConfigService.getEndpointFor(
      // 'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?sc='+this.untukSessionKodeCabang+'&su='+this.untukSessionUserName
      'http://10.20.34.110:8805/api/v1/efos-de/list_app_de?sc=&su=' + this.untukSessionUserName
    );
    return this.http.get<ApiResponse>(this.daftarAplikasiDataEntry);
  }
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Data DE ////////////////////////////////////////////
  getFetchSemuaDataDE(app_no_de: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaDataDE + app_no_de);
  }
  // /////////////////////////// Ref Semua Data DE ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Struktur Pembiayaan Data DE ////////////////////////////////////////////
  getFetchStrukturDE(app_no_de: any, curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaDataDE + curef + '&sd=' + app_no_de);
  }
  // /////////////////////////// Ref Semua Struktur Pembiayaan Data DE ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Data Job ////////////////////////////////////////////
  getFetchSemuaDataJob(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaJob + curef);
  }
  // /////////////////////////// Ref Semua Data Job ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Data Job Pasangan ////////////////////////////////////////////
  getSemuaDataJobPasangan(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getJobPasangan + curef);
  }
  // /////////////////////////// Ref Semua Data Job Pasangan ////////////////////////////////////////////

  // /////////////////////////// Ref View Job ////////////////////////////////////////////
  getGetViewDataJob(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getViewJob + curef);
  }
  // /////////////////////////// Ref View Job ////////////////////////////////////////////

  // /////////////////////////// MEMO ////////////////////////////////////////////
  getfetchMemo(app_no_de: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchMemo + app_no_de);
  }
  // /////////////////////////// MEMO ////////////////////////////////////////////

  // /////////////////////////// list_akses_rumah ////////////////////////////////////////////
  getFetchListAksesRumah(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchlistaksesrumah);
  }
  // /////////////////////////// list_akses_rumah ////////////////////////////////////////////

  // /////////////////////////// list_fasilitas_listrik ////////////////////////////////////////////
  getFetchListFasilitasListrik(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchlistfasilitaslistrik);
  }
  // /////////////////////////// list_fasilitas_listrik ////////////////////////////////////////////

  // /////////////////////////// list_kondisi_lingkungan ////////////////////////////////////////////
  getFetchListKondisiLingkungan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchlistkondisilingkungan);
  }
  // /////////////////////////// list_kondisi_lingkungan ////////////////////////////////////////////

  // /////////////////////////// list_lokasi_rumah ////////////////////////////////////////////
  getFetchListLokasiRumah(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchlistlokasirumah);
  }
  // /////////////////////////// list_lokasi_rumah ////////////////////////////////////////////

  // /////////////////////////// listagunan ////////////////////////////////////////////
  getfetchlistagunan(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchgetlistaguunan + curef);
  }
  // /////////////////////////// listagunan ////////////////////////////////////////////

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
