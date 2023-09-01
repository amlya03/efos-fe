/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';
import { dhnModel } from './config/dhnModel.model';

@Injectable({
  providedIn: 'root'
})
export class InitialDataEntryService {
  koderetirvt = '';
  baseUrl: string = environment.baseUrl;
  baseUrlDukcapil: string = environment.baseUrlDukcapil;

  // ///////////////////////////////////////////////// get Data Dukcapil ///////////////////////////////////////////////////
  protected cekDhn = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/cekDhn');
  // /////////////////////////////////////////////////  get Data Dukcapil  //////////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Data Dukcapil ///////////////////////////////////////////////////
  protected getDataDukcapilManual = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/get_data_dukcapil_manual');
  // /////////////////////////////////////////////////  get Data Dukcapil  //////////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Information SLik ///////////////////////////////////////////////////
  protected informasiSlik = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getMessageInformationSlik');
  // /////////////////////////////////////////////////////// get Information SLik ////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Upload SLik ///////////////////////////////////////////////////
  protected uploadSlik = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/getDokumenUploadByType?sd=');
  // /////////////////////////////////////////////////////// get Upload SLik ////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Cek Data Dhn ///////////////////////////////////////////////////
  protected cekDataDhn = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/fetchDataDhn?sd=');
  // /////////////////////////////////////////////////////// get Cek Data Dhn ////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Duplicate Check ///////////////////////////////////////////////////
  protected duplicateCheck = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getDuplicateCheck?sk=');
  // /////////////////////////////////////////////////////// get Duplicate Check ////////////////////////////////////////////

  // /////////////////////////// Get Job By Cuef IDE ////////////////////////////////////////////
  protected getJobByCurefIDEUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getJobByCuref?sj=');
  // /////////////////////////// Get Job By Cuef IDE ////////////////////////////////////////////

  // /////////////////////////// List Tipe Perusahaan ////////////////////////////////////////////
  protected getListTipPerusahaanUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_tipe_perusahaan');
  // /////////////////////////// List Tipe Perusahaan ////////////////////////////////////////////

  // /////////////////////////// Get Customer ////////////////////////////////////////////
  protected getCustomerUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getCustomerByAppId?sc=');
  // /////////////////////////// Get Customer ////////////////////////////////////////////

  // /////////////////////////// Download Slik ////////////////////////////////////////////
  protected getDownloadSlikUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/fetchSlikPdf?sd=');
  // /////////////////////////// Download Slik ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI INITIAL DATA ENTRY ////////////////////////////////////////////
  protected daftarAplikasiInitialDataEntry = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/list_app_ide?sc=');
  // /////////////////////////// DAFTAR APLIKASI INITIAL DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected ideByCuref = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getCuref');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected ideAppId = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getAppId');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////
  protected getProvinsi = this.applicationConfigService.getEndpointFor(this.baseUrlDukcapil + 'wilayahSvc/getProvinsi/');
  // /////////////////////////// DAFTAR APLIKASI DATA ENTRY ////////////////////////////////////////////

  // /////////////////////////// Get Token Ducapil ////////////////////////////////////////////
  protected getTokenDucpil = this.applicationConfigService.getEndpointFor(this.baseUrlDukcapil + 'token/generate-token');
  // /////////////////////////// Get Token Ducapil ////////////////////////////////////////////

  // /////////////////////////// Reff Jenis Bidang ////////////////////////////////////////////
  protected getJenisBidang = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/list_jenis_bidang');
  // /////////////////////////// Reff Jenis Bidang ////////////////////////////////////////////

  // /////////////////////////// Reff Sektor Ekonomi ////////////////////////////////////////////
  protected getListSektor = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/list_sektor_ekonomi?se=');
  // /////////////////////////// Reff Sektor Ekonomi ////////////////////////////////////////////

  // /////////////////////////////// Get APP IDE by ID ////////////////////////////////////////////////////////////////////////////
  protected getIdeByIdUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/getIdeById?si=');
  // /////////////////////////////// Get APP IDE by ID ////////////////////////////////////////////////////////////////////////////

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
  getAppId(kode_fasilitas: any, cabang: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ideAppId + '?cabang=' + cabang + '&kode_fasilitas=' + kode_fasilitas);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getProvinsiDucapil(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getProvinsi);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Get Token Ducapil \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getTokenDukcapil(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.getTokenDucpil, {
      password: '3foWeb@pp',
      username: 'efo'
    });
  }
  // ////////////////////// Get Token Ducapil \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

  // /////////////////////////// Customer ////////////////////////////////////////////
  getCustomer(curef: string | number | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getCustomerUrl + curef);
  }
  // /////////////////////////// Customer ////////////////////////////////////////////

  // /////////////////////////// List Tipe Perusahaan ////////////////////////////////////////////
  getListTipPerusahaan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListTipPerusahaanUrl);
  }
  // /////////////////////////// List Tipe Perusahaan ////////////////////////////////////////////

  // /////////////////////////// Get Job By Cuef IDE ////////////////////////////////////////////
  getJobByCurefIDE(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getJobByCurefIDEUrl + curef);
  }
  // /////////////////////////// Get Job By Cuef IDE ////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Duplicate Check ///////////////////////////////////////////////////
  getDuplicateCheck(noktp: any, nama: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.duplicateCheck + noktp);
  }
  // ///////////////////////////////////////////////// get Duplicate Check ///////////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Cek Data Dhn ///////////////////////////////////////////////////
  getDataDhn(app_no_ide: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.cekDataDhn + app_no_ide);
  }
  // ///////////////////////////////////////////////// get Cek Data Dhn ///////////////////////////////////////////////////

  // /////////////////////////////////////////////////////// get Upload SLik ////////////////////////////////////////////
  getUploadSlik(app_no_ide: any, id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.uploadSlik + app_no_ide + '&st=' + id);
  }
  // /////////////////////////////////////////////////////// get Upload SLik ////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Information SLik ///////////////////////////////////////////////////
  getInformasiSlik(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.informasiSlik);
  }
  // /////////////////////////////////////////////////////// get Information SLik ////////////////////////////////////////////

  // /////////////////////////////// Get APP IDE by ID ////////////////////////////////////////////////////////////////////////////
  getIdeById(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getIdeByIdUrl + id);
  }
  // /////////////////////////////// Get APP IDE by ID ////////////////////////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Data Dukcapil ///////////////////////////////////////////////////
  getDataDukcapil(ktp: any): Observable<ApiResponse> {
    const nik = { nik: ktp };
    return this.http.post<ApiResponse>(this.getDataDukcapilManual, nik);
  }
  // ///////////////////////////////////////////////// get Data Dukcapil ///////////////////////////////////////////////////

  // ///////////////////////////////////////////////// get Data Dukcapil ///////////////////////////////////////////////////
  postCekDhn(body: dhnModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.getDataDukcapilManual, body);
  }
  // ///////////////////////////////////////////////// get Data Dukcapil ///////////////////////////////////////////////////
}
