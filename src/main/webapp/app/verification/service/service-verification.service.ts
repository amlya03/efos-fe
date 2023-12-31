/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { environment } from 'environments/environment';
import { changePassword } from 'app/login/changePassword.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class ServiceVerificationService {
  baseUrl: string = environment.baseUrl;
  // /////////////////////////////////// NAVBAR /////////////////////////////////////////////////////////////////////////////////////
  protected getNavbar = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos/users/menu');
  // /////////////////////////////////// NAVBAR /////////////////////////////////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Head Appraisal ///////////////////////////////////////////////////////////getListAppAppraisal
  protected getListHeadAppraisalUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_app_appraisal');
  // ///////////////////////////////// Daftar APlikasi Head Appraisal ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////getListAppAppraisal
  protected getListAppAppraisalProcessUrl = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-verif/list_app_appraisal_process'
  );
  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////getListAppAppraisal
  protected getListAppAppraisalByUserNameUrl = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-verif/list_app_appraisal_assign?su='
  );
  // ///////////////////////////////// Daftar APlikasi Appraisal ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Appraisal Review ///////////////////////////////////////////////////////////getListAppAppraisal
  protected getListAppraisalReviewUrl = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-verif/list_app_appraisal_review'
  );
  // ///////////////////////////////// Daftar APlikasi Appraisal Review ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Waiting Assigment ///////////////////////////////////////////////////////////
  protected getListAllVerifUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_app_verif');
  // ///////////////////////////////// Daftar APlikasi Waiting Assigment ///////////////////////////////////////////////////////////

  // //////////////////////// MAPIS ///////////////////////////////////////////////////////////////////////
  protected getMapis = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getDataAppraisal?sd=');
  // //////////////////////// MAPIS ///////////////////////////////////////////////////////////////////////

  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected listAprisal = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_appraisal');
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////////////////////GET ANALISA KEUANGAN///////////////////////////////////////////////////////////
  protected getAnalisaKeuangan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getAnalisaKeuangan?sd=');
  // ////////////////////////////////////GET ANALISA KEUANGAN///////////////////////////////////////////////////////////

  // //////////////////////////////////// SILK ///////////////////////////////////////////////////////////
  protected getSlik = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ide/fetchDataSlik?sd=');
  // //////////////////////////////////// SILK ///////////////////////////////////////////////////////////

  // //////////////////////////////////// DATA CALON NASABAH ///////////////////////////////////////////////////////////
  protected getDataCalonNasabah = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getAnalisaCalonNasabah?sd=');
  // //////////////////////////////////// DATA CALON NASABAH ///////////////////////////////////////////////////////////

  // //////////////////////////////////// DATA KANTOR ///////////////////////////////////////////////////////////
  protected getDataKantor = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getAnalisaDataKantor?sd=');
  // //////////////////////////////////// DATA KANTOR ///////////////////////////////////////////////////////////

  // //////////////////////////////////// LIST MUTASI ///////////////////////////////////////////////////////////
  protected allDataMutasiRekening = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_verif_mutasi?si=');
  // //////////////////////////////////// LIST MUTASI ///////////////////////////////////////////////////////////

  // //////////////////////////////////// GET MUTASI ///////////////////////////////////////////////////////////
  protected getMutasi = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/get_verif_mutasi?si=');
  // //////////////////////////////////// GET MUTASI ///////////////////////////////////////////////////////////

  // ////////////////////// Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getKesimpulan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getKesimpulanVerifikasi?sd=');
  // ////////////////////// Kesimpulan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Get Struktur Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getStrukturPembiayaan = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-verif/getAnalisaStrukturPembiayaan?sd='
  );
  // ////////////////////// Get Struktur Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////////////// URL List Syarat Persetujuan ///////////////////////////////////////////////////////////
  protected fetchSyaratPersetujuan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getSyaratPersetujuan?sd=');
  // //////////////////////////////////// URL List Syarat Persetujuan ///////////////////////////////////////////////////////////

  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataOnProcess = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_analisa_process');
  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////////////////// Daftar APlikasi Analis Nama Alais ///////////////////////////////////////////////////////////
  protected getListAppProcessDanNamaAnalisUrl = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-verif/list_analisa_process_analis?su='
  );
  // ///////////////////////////////// Daftar APlikasi Analis Nama Alais ///////////////////////////////////////////////////////////

  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataWaitingUpdateStatus = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-verif/list_app_analisa_review'
  );
  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi SPV 2 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected listAppAnalisaReview2 = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_app_analisa_review2');
  // //////////////////////service daftar aplikasi SPV 2 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Analaisa Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allAnalisaPembiayaan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/getAnalisaPembiayaan?sd=');
  // ////////////////////// Analaisa Pembiayaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// REFF \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ////////////////////// Ref Hubungan Angunan /////////////////////////////
  protected refHubunganAgunan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_hubungan_agunan');
  // ////////////////////// Ref Hubungan Angunan /////////////////////////////

  // ////////////////////// Ref Jabatan /////////////////////////////
  protected refJabatan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_jabatan');
  // ////////////////////// Ref Jabatan /////////////////////////////

  // ////////////////////// Ref Jumlah Karyawan /////////////////////////////
  protected refJumlahKaryawan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_jumlah_karyawan');
  // ////////////////////// Ref Jumlah Karyawan /////////////////////////////

  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  protected refHubunganEmergency = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_hubungan_emergency');
  // ////////////////////// Ref Hubungan Emergency /////////////////////////////

  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  protected refStatusPerkawinan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_status_perkawinan');
  // ////////////////////// Ref Hubungan Emergency /////////////////////////////

  // ////////////////////// Ref Status Rumah  /////////////////////////////
  protected refStatusRumah = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_status_rumah');
  // ////////////////////// Ref Status Rumah /////////////////////////////

  // ////////////////////// Ref Skema  /////////////////////////////
  protected refSkema = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/list_skema?ss=');
  // ////////////////////// Ref Skema /////////////////////////////

  // ////////////////////// Ref Tenor  /////////////////////////////
  protected refTenorFix = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/list_tenor_fix?ss=');
  protected refTenorNon = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/list_tenor_stepup?ss=');
  // ////////////////////// Ref Tenor /////////////////////////////

  // ///////////////////////////////////////////////////////////// Ref Jabatan Pemberi Keterangan  ///////////////////////////////////////////////////////////
  // protected jabatanPemberiKeterangan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_jabatan_pemberi_ket');
  protected jabatanPemberiKeterangan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_jabatan_pemberi_ket');
  // //////////////////////////////////////////////////////////// Ref Jabatan Pemberi Keterangan ////////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////// Ref list marketabilitas appraisal  ///////////////////////////////////////////////////////////
  protected listMarketabilitasAppraisal = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-ref/list_marketabilitas_appraisal'
  );
  // //////////////////////////////////////////////////////////// Ref list marketabilitas appraisal ////////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////// Ref list imb appraisal  ///////////////////////////////////////////////////////////
  protected listImbAppraisal = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_imb_appraisal');
  // //////////////////////////////////////////////////////////// Ref list imb appraisal ////////////////////////////////////////////////////////////

  // ////////////////////////////////// List Analis //////////////////////////////////////////////////////////////
  protected listAnalys = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-verif/list_analyst');
  // ////////////////////////////////// List Analis //////////////////////////////////////////////////////////////

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
    return this.http.get<ApiResponse>(this.getListAllVerifUrl);
  }

  getListAnalys(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listAnalys);
  }

  getDaWaAprisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listAprisal);
  }
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaOp(url: any): Observable<ApiResponse> {
    if (url) {
      return this.http.get<ApiResponse>(this.getListAppProcessDanNamaAnalisUrl + url);
    } else {
      return this.http.get<ApiResponse>(this.allDataOnProcess);
    }
  }
  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaWuS(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataWaitingUpdateStatus);
  }
  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi SPV 2 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getListAppAnalisaReview2(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listAppAnalisaReview2);
  }
  // //////////////////////service daftar aplikasi SPV 2 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////////////////// Analisa \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchAnalisaKeuangan(app_no_de: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getAnalisaKeuangan + app_no_de);
  }
  // ////////////////////////////////// Analisa \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////// Slik \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  fetchSlik(app_no_ide: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getSlik + app_no_ide);
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

  // ///////////////////////////////// Daftar APlikasi Head Appraisal ///////////////////////////////////////////////////////////
  getListHeadAppraisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListHeadAppraisalUrl);
  }
  // ///////////////////////////////// Daftar APlikasi Head Appraisal ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Appraisal proses ///////////////////////////////////////////////////////////
  getListAppraisalProcess(full_name: any): Observable<ApiResponse> {
    if (full_name) {
      return this.http.get<ApiResponse>(this.getListAppAppraisalByUserNameUrl + full_name);
    } else {
      return this.http.get<ApiResponse>(this.getListAppAppraisalProcessUrl);
    }
  }
  // ///////////////////////////////// Daftar APlikasi Appraisal proses ///////////////////////////////////////////////////////////

  // ///////////////////////////////// Daftar APlikasi Appraisal review ///////////////////////////////////////////////////////////
  getListAppraisalReview(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListAppraisalReviewUrl);
  }
  // ///////////////////////////////// Daftar APlikasi Appraisal review ///////////////////////////////////////////////////////////

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

  // ///////////////////////////////////////////////////////////// Ref Jabatan Pemberi Keterangan  ///////////////////////////////////////////////////////////
  getJabatanPemberiKeterangan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.jabatanPemberiKeterangan);
  }
  // ///////////////////////////////////////////////////////////// Ref Jabatan Pemberi Keterangan  ///////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////// Ref list marketabilitas appraisal  ///////////////////////////////////////////////////////////
  getlistMarketabilitasAppraisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listMarketabilitasAppraisal);
  }
  // //////////////////////////////////////////////////////////// Ref list marketabilitas appraisal ////////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////// Ref list imb appraisal  ///////////////////////////////////////////////////////////
  getlistImbAppraisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listImbAppraisal);
  }
  // //////////////////////////////////////////////////////////// Ref list imb appraisal ////////////////////////////////////////////////////////////
  // ///////////////////// REF ////////////////////////////////////////////////

  // /////////////////////////////////// NAVBAR /////////////////////////////////////////////////////////////////////////////////////
  postNavbar(roleName: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.getNavbar, {
      role_name: roleName,
    });
  }
  // /////////////////////////////////// NAVBAR /////////////////////////////////////////////////////////////////////////////////////

  login(loginPayload: changePassword): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://10.20.34.110:8096/users/resetPassword', loginPayload, httpOptions);
  }
}
