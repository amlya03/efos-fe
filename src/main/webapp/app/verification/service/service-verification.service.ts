import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class ServiceVerificationService {
  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////getListAppAppraisal
  protected getListAppAppraisalUrl = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/list_app_appraisal'
  );
  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Waiting Assigment ///////////////////////////////////////////////////////////
  protected getListAllVerifUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_app_verif');
  // ///////////////////////////////// Daftar APlikasi Waiting Assigment ///////////////////////////////////////////////////////////

  // //////////////////////// MAPIS ///////////////////////////////////////////////////////////////////////
  protected getMapis = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/getDataAppraisal?sd=');
  // //////////////////////// MAPIS ///////////////////////////////////////////////////////////////////////

  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataVerif = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_app_verif');
  protected listAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_appraisal');
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////////////////////GET ANALISA KEUANGAN///////////////////////////////////////////////////////////
  protected getAnalisaKeuangan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getAnalisaKeuangan?sd='
  );
  // ////////////////////////////////////GET ANALISA KEUANGAN///////////////////////////////////////////////////////////

  // //////////////////////////////////// SILK ///////////////////////////////////////////////////////////
  protected getSlik = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/fetchDataSlik?sd=');
  // //////////////////////////////////// SILK ///////////////////////////////////////////////////////////

  // //////////////////////////////////// DATA CALON NASABAH ///////////////////////////////////////////////////////////
  protected getDataCalonNasabah = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getAnalisaCalonNasabah?sd='
  );
  // //////////////////////////////////// DATA CALON NASABAH ///////////////////////////////////////////////////////////

  // //////////////////////////////////// DATA KANTOR ///////////////////////////////////////////////////////////
  protected getDataKantor = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getAnalisaDataKantor?sd='
  );
  // //////////////////////////////////// DATA KANTOR ///////////////////////////////////////////////////////////

  // //////////////////////////////////// LIST MUTASI ///////////////////////////////////////////////////////////
  protected allDataMutasiRekening = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/list_verif_mutasi?si='
  );
  // //////////////////////////////////// LIST MUTASI ///////////////////////////////////////////////////////////

  // //////////////////////////////////// GET MUTASI ///////////////////////////////////////////////////////////
  protected getMutasi = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/get_verif_mutasi?si=');
  // //////////////////////////////////// GET MUTASI ///////////////////////////////////////////////////////////

  // ////////////////////// Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getKesimpulan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getKesimpulanVerifikasi?sd='
  );
  // ////////////////////// Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Get Struktur Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getStrukturPembiayaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getAnalisaStrukturPembiayaan?sd='
  );
  // ////////////////////// Get Struktur Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////////////// URL List Syarat Persetujuan ///////////////////////////////////////////////////////////
  protected fetchSyaratPersetujuan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getSyaratPersetujuan?sd='
  );
  // //////////////////////////////////// URL List Syarat Persetujuan ///////////////////////////////////////////////////////////

  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataOnProcess = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/list_analisa_process'
  );
  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataWaitingUpdateStatus = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-verif/list_app_analisa_review'
  );
  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Analaisa Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allAnalisaPembiayaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getAnalisaPembiayaan?sd='
  );
  // ////////////////////// Analaisa Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// REFF \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ////////////////////// Ref Hubungan Angunan /////////////////////////////
  protected refHubunganAgunan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_hubungan_agunan'
  );
  // ////////////////////// Ref Hubungan Angunan /////////////////////////////

  // ////////////////////// Ref Jabatan /////////////////////////////
  protected refJabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_jabatan');
  // ////////////////////// Ref Jabatan /////////////////////////////

  // ////////////////////// Ref Jumlah Karyawan /////////////////////////////
  protected refJumlahKaryawan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jumlah_karyawan'
  );
  // ////////////////////// Ref Jumlah Karyawan /////////////////////////////

  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  protected refHubunganEmergency = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_hubungan_emergency'
  );
  // ////////////////////// Ref Hubungan Emergency /////////////////////////////

  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  protected refStatusPerkawinan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_perkawinan'
  );
  // ////////////////////// Ref Hubungan Emergency /////////////////////////////

  // ////////////////////// Ref Status Rumah  /////////////////////////////
  protected refStatusRumah = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_status_rumah');
  // ////////////////////// Ref Status Rumah /////////////////////////////

  // ////////////////////// Ref Skema  /////////////////////////////
  protected refSkema = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_skema?ss=');
  // ////////////////////// Ref Skema /////////////////////////////

  // ////////////////////// Ref Tenor  /////////////////////////////
  protected refTenorFix = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tenor_fix?ss=');
  protected refTenorNon = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tenor_stepup?ss=');
  // ////////////////////// Ref Tenor /////////////////////////////

  // ////////////////////// REFF \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ///////////////////////////contoh post get di angular////////////////////////////////////////////////
  // getDaWa(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.allDataVerif, { params: options, observe: 'response' });
  // }
  // ///////////////////////////contoh post get di angular////////////////////////////////////////////////
  getAllVerif(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListAllVerifUrl);
  }

  getDaWa(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataVerif);
  }

  getDaWaAprisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listAprisal);
  }
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaOp(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataOnProcess);
  }
  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaWuS(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataWaitingUpdateStatus);
  }
  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////////////////// Analisa \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchAnalisaKeuangan(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getAnalisaKeuangan + app_no_de);
  }
  // ////////////////////////////////// Analisa \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////// Slik \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchSlik(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getSlik + app_no_de);
  }
  // //////////////////////////// Slik \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////////////// DATA CALON NASABAH ///////////////////////////////////////////////////////////
  fetchDataNasabah(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getDataCalonNasabah + app_no_de);
  }
  // //////////////////////////////////// DATA CALON NASABAH ///////////////////////////////////////////////////////////

  // //////////////////////////////////// DATA KANTOR ///////////////////////////////////////////////////////////
  fetchDataKantor(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getDataKantor + app_no_de);
  }
  // //////////////////////////////////// DATA KANTOR ///////////////////////////////////////////////////////////

  // /////////////////////LIST mutasi Rekening\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchListMutasiRekening(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataMutasiRekening + app_no_de);
  }
  // //////////////////////LIST mutasi Rekening\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // /////////////////////get mutasi Rekening\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getMutasiRekening(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getMutasi + id);
  }
  // //////////////////////get mutasi Rekening\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////// Get Struktur Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getFetchStrukturPembiayaan(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getStrukturPembiayaan + app_no_de);
  }
  // ////////////////////// Get Struktur Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Syarat Persetujuan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getfetchSyaratPersetujuan(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSyaratPersetujuan + app_no_de);
  }
  // ////////////////////// Syarat Persetujuan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchKesimpulan(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getKesimpulan + app_no_de);
  }
  // ////////////////////// get Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchAnalisaPembiayaan(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allAnalisaPembiayaan + app_no_de);
  }
  // ////////////////////// get Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////// MAPIS ///////////////////////////////////////////////////////////////////////
  fetchMapis(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getMapis + app_no_de);
  }
  // //////////////////////// MAPIS ///////////////////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////
  getListAppAppraisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListAppAppraisalUrl);
  }
  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////

  // ///////////////////// REF ////////////////////////////////////////////////
  // ////////////////////// Ref Hubungan Agunan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getHubunganAgunan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refHubunganAgunan);
  }
  // ////////////////////// Ref Hubungan Agunan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Jabatan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getJabatan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refJabatan);
  }
  // ////////////////////// Ref Jabatan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Jumlah Karyawan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getJumlahKaryawan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refJumlahKaryawan);
  }
  // ////////////////////// Ref Jumlah Karyawan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getHubunganEmergency(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refHubunganEmergency);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getStatusPerkawinan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refStatusPerkawinan);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Status Rumah \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getStatusRumah(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refStatusRumah);
  }
  // ////////////////////// Ref Status Rumah \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref SKema \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getSkema(produk: string | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refSkema + produk);
  }
  // ////////////////////// Ref SKema \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Tenor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getTenorFix(skema: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refTenorFix + skema);
  }
  getTenorNon(skema: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refTenorNon + skema);
  }
  // ////////////////////// Ref Tenor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ///////////////////// REF ////////////////////////////////////////////////
}
