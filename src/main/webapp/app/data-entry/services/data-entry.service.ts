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

  // //////////////////////////// REF Tujuan Pembiayaan //////////////////////////////////////////////////
  protected getRefTujuan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_tujuan_pembiayaan');
  // //////////////////////////// REF Tujuan Pembiayaan //////////////////////////////////////////////////

  // //////////////////////////// Margin Step Up //////////////////////////////////////////////////
  protected getMarginStepUp = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/list_margin_stepup?ss='
  );
  // //////////////////////////// Margin Step Up //////////////////////////////////////////////////

  // ////////////////////// Ref Tenor  /////////////////////////////
  protected refTenorFix = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tenor_fix?ss=');
  protected refTenorNon = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tenor_stepup?ss=');
  // ////////////////////// Ref Tenor /////////////////////////////

  // //////////////////////////// Kode Skema //////////////////////////////////////////////////
  protected getskema = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_skema?ss=');
  // //////////////////////////// Kode Skema //////////////////////////////////////////////////

  // //////////////////////////// Kode Produk //////////////////////////////////////////////////
  protected getKodeProduknya = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_produk?sp=');
  // //////////////////////////// Kode Produk //////////////////////////////////////////////////

  // //////////////////////////// Kode Program //////////////////////////////////////////////////
  protected getKodeProgram = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_program?sp=');
  // //////////////////////////// Kode Program //////////////////////////////////////////////////

  // //////////////////////////// Kode Fasilitas //////////////////////////////////////////////////
  protected getKodeFasilitas = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_fasilitas');
  // //////////////////////////// Kode Fasilitas //////////////////////////////////////////////////

  // //////////////////////////// Ref List Kendaraan //////////////////////////////////////////////////
  protected refListKendaraan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_kendaraan');
  // //////////////////////////// Ref List Kendaraan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Sertifikat //////////////////////////////////////////////////
  protected refListSertifikat = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_sertifikat'
  );
  // //////////////////////////// Ref List Sertifikat //////////////////////////////////////////////////

  // //////////////////////////// Ref List Objek Agunan //////////////////////////////////////////////////
  protected refListDeveloper = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_developer');
  // //////////////////////////// Ref List Objek Agunan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Objek Agunan //////////////////////////////////////////////////
  protected refListObjekAgunan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jenis_objek_agunan'
  );
  // //////////////////////////// Ref List Objek Agunan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Properti //////////////////////////////////////////////////
  protected refListTipeAgunan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tipe_agunan');
  // //////////////////////////// Ref List Pemegang Hak //////////////////////////////////////////////////

  // //////////////////////////// Ref List Properti //////////////////////////////////////////////////
  protected refListProperti = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/list_tipe_properti?sp='
  );
  // //////////////////////////// Ref List Pemegang Hak //////////////////////////////////////////////////

  // //////////////////////////// Ref List Pemegang Hak //////////////////////////////////////////////////
  protected refListPemegangHak = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_hubungan_agunan'
  );
  // //////////////////////////// Ref List Pemegang Hak //////////////////////////////////////////////////

  // //////////////////////////// Ref List Tipe Perusahaan //////////////////////////////////////////////////
  protected refTipePerusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_perusahaan'
  );
  // //////////////////////////// Ref List Tipe Perusahaan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Jumlah Karyawan //////////////////////////////////////////////////
  protected refListJumlahKaryawan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jumlah_karyawan'
  );
  // //////////////////////////// Ref List Jumlah Karyawan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Jabatan //////////////////////////////////////////////////
  protected refListJabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_jabatan');
  // //////////////////////////// Ref List Jabatan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Jabatan //////////////////////////////////////////////////
  protected refJenisPekerjaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jenis_pekerjaan'
  );
  // //////////////////////////// Ref List Jabatan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Tipe Pekerjaan //////////////////////////////////////////////////
  protected refListTipePekerjaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_pekerjaan?sc='
  );
  // //////////////////////////// Ref List Tipe Pekerjaan //////////////////////////////////////////////////

  // //////////////////////////// Ref Tipe Kendaraan //////////////////////////////////////////////////
  protected ListTipeKendaraaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_kendaraan'
  );
  // //////////////////////////// Ref Tipe Kendaraan //////////////////////////////////////////////////

  // //////////////////////////// Ref Status Perkawinan //////////////////////////////////////////////////
  protected refStatusPerkawinan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_perkawinan'
  );
  // //////////////////////////// Ref Status Perkawinan //////////////////////////////////////////////////

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

  // ///////////////////////////// Get Job \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getJobById = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobById?si=');
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

  // ///////////////////////////// Get ai List Agunan BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getListAgunanById = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getCollateralById?si='
  );
  // ///////////////////////////// Get api List Agunan BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
    return this.http.get<ApiResponse>(this.fetchSemuaStrukturDE + curef + '&sd=' + app_no_de);
  }
  // /////////////////////////// Ref Semua Struktur Pembiayaan Data DE ////////////////////////////////////////////

  // /////////////////////////// Ref Semua Data Job ////////////////////////////////////////////
  getFetchSemuaDataJob(curef: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaJob + curef);
  }
  // /////////////////////////// Ref Semua Data Job ////////////////////////////////////////////

  // /////////////////////////// Get Job By id ////////////////////////////////////////////
  getEditJobById(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getJobById + id);
  }
  // /////////////////////////// Get Job By id ////////////////////////////////////////////

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

  ////////////////////////////////////// REF Status Perkawinan //////////////////////////////////////////////
  getFetchListTipeKendaraaan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ListTipeKendaraaan);
  }
  ////////////////////////////////////// REF Status Perkawinan //////////////////////////////////////////////

  ////////////////////////////////////// REF Status Perkawinan //////////////////////////////////////////////
  getFetchStatusPerkawinan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refStatusPerkawinan);
  }
  ////////////////////////////////////// REF Status Perkawinan //////////////////////////////////////////////

  ////////////////////////////////////// REF List Tipe Pekerjaan //////////////////////////////////////////////
  getFetchListTipePekerjaan(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListTipePekerjaan + id);
  }
  ////////////////////////////////////// REF List Tipe Pekerjaan //////////////////////////////////////////////

  ////////////////////////////////////// REF List Jabatan //////////////////////////////////////////////
  getFetchListJabatan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListJabatan);
  }
  ////////////////////////////////////// REF List Jabatan //////////////////////////////////////////////

  ////////////////////////////////////// REF List Jabatan //////////////////////////////////////////////
  getFetchListJenisPekerjaan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refJenisPekerjaan);
  }
  ////////////////////////////////////// REF List Jabatan //////////////////////////////////////////////

  ////////////////////////////////////// REF List Jumlah Karyawan //////////////////////////////////////////////
  getFetchListJumlahKaryawan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListJumlahKaryawan);
  }
  ////////////////////////////////////// REF List Jumlah Karyawan //////////////////////////////////////////////

  // //////////////////////////// Ref List Tipe Perusahaan //////////////////////////////////////////////////
  getFetchTipePerusahaan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refTipePerusahaan);
  }
  // //////////////////////////// Ref List Tipe Perusahaan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Pemegang Hak //////////////////////////////////////////////////
  getFetchListPemegangHak(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListPemegangHak);
  }
  // //////////////////////////// Ref List Pemegang Hak //////////////////////////////////////////////////

  // //////////////////////////// Ref List Properti //////////////////////////////////////////////////
  getFetchListTipeProperti(agunan: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListProperti + agunan);
  }
  // //////////////////////////// Ref List Properti //////////////////////////////////////////////////

  // //////////////////////////// Ref List Agunan //////////////////////////////////////////////////
  getFetchListTipeAgunan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListTipeAgunan);
  }
  // //////////////////////////// Ref List Agunan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Objek Agunan //////////////////////////////////////////////////
  getFetchListObjekAgunan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListObjekAgunan);
  }
  // //////////////////////////// Ref List Objek Agunan //////////////////////////////////////////////////

  // //////////////////////////// Ref List Developer //////////////////////////////////////////////////
  getFetchListDeveloper(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListDeveloper);
  }
  // //////////////////////////// Ref List Developer //////////////////////////////////////////////////

  // //////////////////////////// Ref List Sertifikat //////////////////////////////////////////////////
  getFetchListSertifikat(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListSertifikat);
  }
  // //////////////////////////// Ref List Sertifikat //////////////////////////////////////////////////

  // //////////////////////////// Ref List Kendaraan //////////////////////////////////////////////////
  getFetchListKendaraan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refListKendaraan);
  }
  // //////////////////////////// Ref List Kendaraan //////////////////////////////////////////////////

  // //////////////////////////// Kode Fasilitas //////////////////////////////////////////////////
  getFetchKodeFasilitas(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getKodeFasilitas);
  }
  // //////////////////////////// Kode Fasilitas //////////////////////////////////////////////////

  // //////////////////////////// Kode Program //////////////////////////////////////////////////
  getFetchProgramByKode(program: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getKodeProgram + program);
  }
  // //////////////////////////// Kode Program //////////////////////////////////////////////////

  // //////////////////////////// Kode Produk //////////////////////////////////////////////////
  getFetchProdukByKode(produk: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getKodeProduknya + produk);
  }
  // //////////////////////////// Kode Produk //////////////////////////////////////////////////

  // //////////////////////////// Kode Skema //////////////////////////////////////////////////
  getFetchSkemaByKode(skema: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getskema + skema);
  }
  // //////////////////////////// Kode Skema //////////////////////////////////////////////////

  // ////////////////////// Ref Tenor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getTenorFix(skema: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refTenorFix + skema);
  }
  getTenorNon(skema: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refTenorNon + skema);
  }
  // ////////////////////// Ref Tenor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////////// Kode Skema //////////////////////////////////////////////////
  getFetchMarginStepUp(jangkaWaktu: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getMarginStepUp + jangkaWaktu);
  }
  // //////////////////////////// Kode Skema //////////////////////////////////////////////////

  // //////////////////////////// REF Tujuan Pembiayaan //////////////////////////////////////////////////
  getFetchTujuanPembiayaan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getRefTujuan);
  }
  // //////////////////////////// REF Tujuan Pembiayaan //////////////////////////////////////////////////

  // ///////////////////////////// Get api List Agunan BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getFetchListAgunanById(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getListAgunanById + id);
  }
  // ///////////////////////////// Get api List Agunan BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
