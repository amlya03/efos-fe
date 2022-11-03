import { Component, OnInit } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { initialdataentryfix } from './initial-data-entry-model';
import { InitialDataEntryService } from '../services/initial-data-entry.service';
import { refStatusPerkawinan } from 'app/verification/service/config/refStatusPerkawinan.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';

export type EntityResponseDaWa = HttpResponse<initialdataentryfix>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-fix',
  templateUrl: './initial-data-entry-fix.component.html',
  styleUrls: ['./initial-data-entry-fix.component.scss'],
})
export class InitialDataEntryFixComponent implements OnInit {
  daWa: any;
  errorMessage: any;
  daWaprof: any;
  postId: any;
  daWakota: any;
  daWakecamatan: any;
  daWakelurahan: any;
  daWakodepos: any;
  daWacuref: any;
  ktp_seumur_hidup: any;

  // //////////////////////////////////////////
  refStatusPerkawinan?: refStatusPerkawinan[];
  nama: string | undefined;
  nama_pasangan: string | undefined;
  jenis_kelamin: string | undefined;
  jenis_kelamin_pasangan: string | undefined;
  app_no_ide: string | undefined;
  tanggal_lahir: string | undefined;
  tanggal_lahir_pasangan: string | undefined;
  tempat_lahir: string | undefined;
  tempat_lahir_pasangan: string | undefined;
  status_perkawinan: string | undefined;
  agama: string | undefined;
  agama_pasangan: string | undefined;
  pendidikan: string | undefined;
  pendidikan_pasangan: string | undefined;
  kewarganegaraan: string | undefined;
  kewarganegaraan_pasangan: string | undefined;
  nama_ibu_kandung: string | undefined;
  nama_ibu_kandung_pasangan: string | undefined;
  npwp: string | undefined;
  npwp_pasangan: string | undefined;
  alamat_ktp: string | undefined;
  alamat_ktp_pasangan: string | undefined;
  provinsi_cabang: any;
  provinsi_cabang_pasangan: any;
  kabkota_cabang: any;
  kabkota_cabang_pasangan: any;
  kecamatan: any;
  kecamatan_pasangan: any;
  kelurahan: any;
  kelurahan_pasangan: any;
  kode_pos: string | undefined;
  kode_pos_pasangan: any;
  rt: string | undefined;
  rw: string | undefined;
  rt_pasangan: string | undefined;
  rw_pasangan: string | undefined;
  no_ktp: string | undefined;
  tanggal_terbit_ktp: string | undefined;
  tanggal_exp_ktp: string | undefined;
  no_handphone: string | undefined;
  no_ktp_pasangan: string | undefined;
  tanggal_terbit_ktp_pasangan: string | undefined;
  tanggal_exp_ktp_pasangan: string | undefined;
  no_handphone_pasangan: string | undefined;
  contohdata: any;
  daWakotap: any;
  daWakecamatanp: any;
  daWakelurahanp: any;
  daWakodeposp: any;
  daWaprofp: any;
  dawakodepost: any;
  provinsi_cabangkode: any;
  kabkota_cabangkode: any;
  kecamatankode: any;
  kelurahankode: any;
  provinsi_cabang_pasangankode: any;
  kabkota_cabang_pasangankode: any;
  kecamatan_pasangankode: any;
  kelurahan_pasangankode: any;








  // ///////////////////////////////////////////
  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected http: HttpClient,
    private router: Router,
    protected applicationConfigService: ApplicationConfigService,
    protected ideFixServices: InitialDataEntryService
  ) {}

  protected getcuref = this.applicationConfigService.getEndpointFor(' http://10.20.34.110:8805/api/v1/efos-ide/getCuref');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getAppId');
  protected getprovinsi = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/wilayahSvc/getProvinsi/');
  protected gettokenducapil = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/token/generate-token');
  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.postUpdateStatus();

    this.ideFixServices.getIdeById().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWa = (data as any).result;
      } else {
        this.daWa = (data as any).result;
      }
    });

    this.ideFixServices.getIdeByCuref().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWacuref = (data as any).result;
      } else {
        this.daWacuref = (data as any).result;
      }
    });

    // ref Status Menikah
    this.dataCalonNasabah.getStatusPerkawinan().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refStatusPerkawinan = data.result;
      }
    });
  }

  // getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  // }

  // getcurefnih(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.getcuref, { params: options, observe: 'response' });
  // }

  getdataentry1(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  getdataentry1p(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  getkabkotap(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  getkecamatanp(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  getkodepos(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKdPos/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkecamatan');
  }

  getkodeposp(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKdPos/' + kodepotongan[0], {
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

  getkelurahanp(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  gotoprescreaning(getappide: any, kodeposget: any, getcuref: any,kodeposgetp:any): void {



if( this.status_perkawinan =='Menikah'){
  const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

  const kirimanprovinsi = this.provinsi_cabang.split('|');
  if (this.provinsi_cabang.indexOf('|') !== -1) {
    var kirimanprovinsid = kirimanprovinsi[1];
  } else {
    var kirimanprovinsid = this.provinsi_cabang;
  }
  const kirimankabkota = this.kabkota_cabang.split('|');
  if (this.kabkota_cabang.indexOf('|') !== -1) {
    var kirimankabkotaid = kirimankabkota[1];
  } else {
    var kirimankabkotaid = this.kabkota_cabang;
  }
  const kirimankecamatan = this.kecamatan.split('|');
  if (this.kecamatan.indexOf('|') !== -1) {
    var kirimankecamatanid = kirimankecamatan[1];
  } else {
    var kirimankecamatanid = this.kecamatan;
  }
  const kirimankelurahan = this.kelurahan.split('|');
  if (this.kelurahan.indexOf('|') !== -1) {
    var kirimankelurahanid = kirimankelurahan[1];
  } else {
    var kirimankelurahanid = this.kelurahan;
  }



  const kirimanprovinsipasangan = this.provinsi_cabang_pasangan.split('|');
  if (this.provinsi_cabang_pasangan.indexOf('|') !== -1) {
    var kirimanprovinsidpasangan = kirimanprovinsipasangan[1];
  } else {
    var kirimanprovinsidpasangan = this.provinsi_cabang_pasangan;
  }
  const kirimankabkotapasangan = this.kabkota_cabang_pasangan.split('|');
  if (this.kabkota_cabang_pasangan.indexOf('|') !== -1) {
    var kirimankabkotaidpasangan = kirimankabkotapasangan[1];
  } else {
    var kirimankabkotaidpasangan = this.kabkota_cabang_pasangan;
  }
  const kirimankecamatanpasangan = this.kecamatan_pasangan.split('|');
  if (this.kecamatan_pasangan.indexOf('|') !== -1) {
    var kirimankecamatanidpasangan = kirimankecamatanpasangan[1];
  } else {
    var kirimankecamatanidpasangan = this.kecamatan_pasangan;
  }
  const kirimankelurahanpasangan = this.kelurahan_pasangan.split('|');
  if ( this.kelurahan_pasangan.indexOf('|') !== -1) {
    var kirimankelurahanidpasangan = kirimankelurahanpasangan[1];
  } else {
    var kirimankelurahanidpasangan = this.kelurahan_pasangan;
  }

  alert(kirimanprovinsipasangan);
  alert(kirimanprovinsipasangan.indexOf('|') !== -1);
  this.http
  .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
    headers: headers,
    nama: this.nama,
    nama_pasangan: this.nama_pasangan,
    kategori_pekerjaan: 'Fixincome',
    curef: getcuref,
    jenis_kelamin: this.jenis_kelamin,
    jenis_kelamin_pasangan: this.jenis_kelamin_pasangan,
    usia: '0',
    app_no_ide: getappide,
    tanggal_lahir: this.tanggal_lahir,
    tanggal_lahir_pasangan: this.tanggal_lahir_pasangan,
    tempat_lahir: this.tempat_lahir,
    tempat_lahir_pasangan: this.tempat_lahir_pasangan,
    status_perkawinan: this.status_perkawinan,
    status_alamat: '',
    status_kendaraan: '',
    status_ktp: '',
    status_ktp_pasangan: '',
    status_rumah: '',
    agama: this.agama,
    agama_pasangan: this.agama_pasangan,
    pendidikan: this.pendidikan,
    pendidikan_pasangan: this.pendidikan_pasangan,
    kewarganegaraan: this.kewarganegaraan,
    kewarganegaraan_pasangan: this.kewarganegaraan_pasangan,
    nama_ibu_kandung: this.nama_ibu_kandung,
    nama_ibu_kandung_pasangan: this.nama_ibu_kandung_pasangan,
    npwp: this.npwp,
    npwp_pasangan: this.npwp_pasangan,
    alamat_ktp: this.alamat_ktp,
    alamat_ktp_pasangan: this.alamat_ktp_pasangan,
    alamat_domisili: '',
    provinsi: kirimanprovinsid,
    provinsi_domisili: '',
    provinsi_pasangan: kirimanprovinsidpasangan,
    kabkota: kirimankabkotaid,
    kabkota_domisili: '',
    kabkota_pasangan:kirimankabkotaidpasangan,
    kecamatan: kirimankecamatanid,
    kecamatan_domisili: '',
    kecamatan_pasangan: kirimankecamatanidpasangan,
    kelurahan: kirimankelurahanid,
    kelurahan_domisili: '',
    kelurahan_pasangan:  kirimankelurahanidpasangan,
    kode_pos: kodeposget,
    kode_pos_domisili: '',
    kode_pos_pasangan: kodeposgetp,
    lama_menetap: '',
    cabang: '',
    created_by: '',
    created_date: '',
    email: '',
    email_pasangan: '',
    id: 0,
    jumlah_anak: '',
    rt: this.rt,
    rt_domisili: '',
    rt_pasangan: this.rt_pasangan,
    rw: this.rw,
    rw_domisili: '',
    rw_pasangan: this.rw_pasangan,
    no_ktp: this.no_ktp,
    no_ktp_pasangan: this.no_ktp_pasangan,
    tanggal_terbit_ktp: this.tanggal_terbit_ktp,
    tanggal_terbit_ktp_pasangan: this.tanggal_terbit_ktp_pasangan,
    tanggal_exp_ktp: this.tanggal_exp_ktp,
    tanggal_exp_ktp_pasangan: this.tanggal_exp_ktp_pasangan,
    tipe_kendaraan: '',
    no_handphone: this.no_handphone,
    no_handphone_pasangan: this.no_handphone_pasangan,
    no_telepon: '',
    updated_by: '',
    updated_date: '',
    usia_pasangan: '',
  })
  .subscribe({
    next: data => {
      this.contohdata = data.result.id;
      this.app_no_ide = data.result.app_no_ide;
      this.tanggal_lahir = data.result.tanggal_lahir;

      this.router.navigate(['/hasilprescreening'], {
        queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
      });

      alert(this.contohdata);
    },
  });

}else{
  const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

  const kirimanprovinsi = this.provinsi_cabang.split('|');
  if (kirimanprovinsi.indexOf('|') !== -1) {
    var kirimanprovinsid = kirimanprovinsi[1];
  } else {
    var kirimanprovinsid = this.provinsi_cabang;
  }
  const kirimankabkota = this.kabkota_cabang.split('|');
  if (kirimankabkota.indexOf('|') !== -1) {
    var kirimankabkotaid = kirimankabkota[1];
  } else {
    var kirimankabkotaid = this.kabkota_cabang;
  }
  const kirimankecamatan = this.kecamatan.split('|');
  if (kirimankecamatan.indexOf('|') !== -1) {
    var kirimankecamatanid = kirimankecamatan[1];
  } else {
    var kirimankecamatanid = this.kecamatan;
  }
  const kirimankelurahan = this.kelurahan.split('|');
  if (kirimankelurahan.indexOf('|') !== -1) {
    var kirimankelurahanid = kirimankelurahan[1];
  } else {
    var kirimankelurahanid = this.kelurahan;
  }

  this.http
  .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
    headers: headers,
    nama: this.nama,
    nama_pasangan: '',
    kategori_pekerjaan: 'Fixincome',
    curef: getcuref,
    jenis_kelamin: this.jenis_kelamin,
    jenis_kelamin_pasangan: '',
    usia: '0',
    app_no_ide: getappide,
    tanggal_lahir: this.tanggal_lahir,
    tanggal_lahir_pasangan: '',
    tempat_lahir: this.tempat_lahir,
    tempat_lahir_pasangan: '',
    status_perkawinan: this.status_perkawinan,
    status_alamat: '',
    status_kendaraan: '',
    status_ktp: '',
    status_ktp_pasangan: '',
    status_rumah: '',
    agama: this.agama,
    agama_pasangan: '',
    pendidikan: this.pendidikan,
    pendidikan_pasangan: '',
    kewarganegaraan: this.kewarganegaraan,
    kewarganegaraan_pasangan: '',
    nama_ibu_kandung: this.nama_ibu_kandung,
    nama_ibu_kandung_pasangan: '',
    npwp: this.npwp,
    npwp_pasangan: '',
    alamat_ktp: this.alamat_ktp,
    alamat_ktp_pasangan: '',
    alamat_domisili: '',
    provinsi: kirimanprovinsid,
    provinsi_domisili: '',
    provinsi_pasangan:'' ,
    kabkota: kirimankabkotaid,
    kabkota_domisili: '',
    kabkota_pasangan:'',
    kecamatan: kirimankecamatanid,
    kecamatan_domisili: '',
    kecamatan_pasangan:'' ,
    kelurahan: kirimankelurahanid,
    kelurahan_domisili: '',
    kelurahan_pasangan: '',
    kode_pos: kodeposget,
    kode_pos_domisili: '',
    kode_pos_pasangan: '',
    lama_menetap: '',
    cabang: '',
    created_by: '',
    created_date: '',
    email: '',
    email_pasangan: '',
    id: 0,
    jumlah_anak: '',
    rt: this.rt,
    rt_domisili: '',
    rt_pasangan: '',
    rw: this.rw,
    rw_domisili: '',
    rw_pasangan: '',
    no_ktp: this.no_ktp,
    no_ktp_pasangan: '',
    tanggal_terbit_ktp: this.tanggal_terbit_ktp,
    tanggal_terbit_ktp_pasangan: '',
    tanggal_exp_ktp: this.tanggal_exp_ktp,
    tanggal_exp_ktp_pasangan: '',
    tipe_kendaraan: '',
    no_handphone: this.no_handphone,
    no_handphone_pasangan: '',
    no_telepon: '',
    updated_by: '',
    updated_date: '',
    usia_pasangan: '',
  })
  .subscribe({
    next: data => {
      this.contohdata = data.result.id;
      this.app_no_ide = data.result.app_no_ide;
      this.tanggal_lahir = data.result.tanggal_lahir;

      this.router.navigate(['/hasilprescreening'], {
        queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
      });

      alert(this.contohdata);
    },
  });

}
  }

  postUpdateStatus(): void {
    this.http
      .post<any>('http://10.20.82.12:8083/token/generate-token', {
        password: '3foWeb@pp',
        username: 'efo',
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.postId = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          console.warn(data.result.token);
          console.warn(this.postId);
          // this.router.navigate(['/daftaraplikasiide'], {
          //   queryParams: {},
          // });
          // alert('dapetnih');

          this.getdataentry1(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;

              // alert(this.postId);
              // this.onResponseSuccess(res);
            },
          });

          this.getdataentry1p(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprofp = res.body?.result;

              // alert(this.postId);
              // this.onResponseSuccess(res);
            },
          });

          // this.getdataentry(this.postId).subscribe({
          //   next: (res: EntityArrayResponseDaWa) => {
          //     this.daWa = res.body?.result;
          //     // this.onResponseSuccess(res);
          //     console.warn('loadingNIH',this.postId );
          //     alert(this.postId)
          //   },
          // });
        },
      });
  }
  gotodaftaraplikasiide(getappide: any, kodeposget: any, getcuref: any,kodeposgetp:any): void {

    if( this.status_perkawinan =='Menikah'){

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      const kirimanprovinsi = this.provinsi_cabang.split('|');
      if (this.provinsi_cabang.indexOf('|') !== -1) {
        var kirimanprovinsid = kirimanprovinsi[1];
      } else {
        var kirimanprovinsid = this.provinsi_cabang;
      }
      const kirimankabkota = this.kabkota_cabang.split('|');
      if (this.kabkota_cabang.indexOf('|') !== -1) {
        var kirimankabkotaid = kirimankabkota[1];
      } else {
        var kirimankabkotaid = this.kabkota_cabang;
      }
      const kirimankecamatan = this.kecamatan.split('|');
      if (this.kecamatan.indexOf('|') !== -1) {
        var kirimankecamatanid = kirimankecamatan[1];
      } else {
        var kirimankecamatanid = this.kecamatan;
      }
      const kirimankelurahan = this.kelurahan.split('|');
      if (this.kelurahan.indexOf('|') !== -1) {
        var kirimankelurahanid = kirimankelurahan[1];
      } else {
        var kirimankelurahanid = this.kelurahan;
      }



      const kirimanprovinsipasangan = this.provinsi_cabang_pasangan.split('|');
      if (this.provinsi_cabang_pasangan.indexOf('|') !== -1) {
        var kirimanprovinsidpasangan = kirimanprovinsipasangan[1];
      } else {
        var kirimanprovinsidpasangan = this.provinsi_cabang_pasangan;
      }
      const kirimankabkotapasangan = this.kabkota_cabang_pasangan.split('|');
      if (this.kabkota_cabang_pasangan.indexOf('|') !== -1) {
        var kirimankabkotaidpasangan = kirimankabkotapasangan[1];
      } else {
        var kirimankabkotaidpasangan = this.kabkota_cabang_pasangan;
      }
      const kirimankecamatanpasangan = this.kecamatan_pasangan.split('|');
      if (this.kecamatan_pasangan.indexOf('|') !== -1) {
        var kirimankecamatanidpasangan = kirimankecamatanpasangan[1];
      } else {
        var kirimankecamatanidpasangan = this.kecamatan_pasangan;
      }
      const kirimankelurahanpasangan = this.kelurahan_pasangan.split('|');
      if ( this.kelurahan_pasangan.indexOf('|') !== -1) {
        var kirimankelurahanidpasangan = kirimankelurahanpasangan[1];
      } else {
        var kirimankelurahanidpasangan = this.kelurahan_pasangan;
      }

      alert(kirimanprovinsipasangan);
      alert(kirimanprovinsipasangan.indexOf('|') !== -1);
      this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: this.nama_pasangan,
        kategori_pekerjaan: 'Fixincome',
        curef: getcuref,
        jenis_kelamin: this.jenis_kelamin,
        jenis_kelamin_pasangan: this.jenis_kelamin_pasangan,
        usia: '0',
        app_no_ide: getappide,
        tanggal_lahir: this.tanggal_lahir,
        tanggal_lahir_pasangan: this.tanggal_lahir_pasangan,
        tempat_lahir: this.tempat_lahir,
        tempat_lahir_pasangan: this.tempat_lahir_pasangan,
        status_perkawinan: this.status_perkawinan,
        status_alamat: '',
        status_kendaraan: '',
        status_ktp: '',
        status_ktp_pasangan: '',
        status_rumah: '',
        agama: this.agama,
        agama_pasangan: this.agama_pasangan,
        pendidikan: this.pendidikan,
        pendidikan_pasangan: this.pendidikan_pasangan,
        kewarganegaraan: this.kewarganegaraan,
        kewarganegaraan_pasangan: this.kewarganegaraan_pasangan,
        nama_ibu_kandung: this.nama_ibu_kandung,
        nama_ibu_kandung_pasangan: this.nama_ibu_kandung_pasangan,
        npwp: this.npwp,
        npwp_pasangan: this.npwp_pasangan,
        alamat_ktp: this.alamat_ktp,
        alamat_ktp_pasangan: this.alamat_ktp_pasangan,
        alamat_domisili: '',
        provinsi: kirimanprovinsid,
        provinsi_domisili: '',
        provinsi_pasangan: kirimanprovinsidpasangan,
        kabkota: kirimankabkotaid,
        kabkota_domisili: '',
        kabkota_pasangan:kirimankabkotaidpasangan,
        kecamatan: kirimankecamatanid,
        kecamatan_domisili: '',
        kecamatan_pasangan: kirimankecamatanidpasangan,
        kelurahan: kirimankelurahanid,
        kelurahan_domisili: '',
        kelurahan_pasangan:  kirimankelurahanidpasangan,
        kode_pos: kodeposget,
        kode_pos_domisili: '',
        kode_pos_pasangan: kodeposgetp,
        lama_menetap: '',
        cabang: '',
        created_by: '',
        created_date: '',
        email: '',
        email_pasangan: '',
        id: 0,
        jumlah_anak: '',
        rt: this.rt,
        rt_domisili: '',
        rt_pasangan: this.rt_pasangan,
        rw: this.rw,
        rw_domisili: '',
        rw_pasangan: this.rw_pasangan,
        no_ktp: this.no_ktp,
        no_ktp_pasangan: this.no_ktp_pasangan,
        tanggal_terbit_ktp: this.tanggal_terbit_ktp,
        tanggal_terbit_ktp_pasangan: this.tanggal_terbit_ktp_pasangan,
        tanggal_exp_ktp: this.tanggal_exp_ktp,
        tanggal_exp_ktp_pasangan: this.tanggal_exp_ktp_pasangan,
        tipe_kendaraan: '',
        no_handphone: this.no_handphone,
        no_handphone_pasangan: this.no_handphone_pasangan,
        no_telepon: '',
        updated_by: '',
        updated_date: '',
        usia_pasangan: '',
      })
      .subscribe({
        next: data => {
          this.contohdata = data.result.id;
          this.app_no_ide = data.result.app_no_ide;
          this.tanggal_lahir = data.result.tanggal_lahir;

          this.router.navigate(['/daftaraplikasiide'], {
            // queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
          });

          alert(this.contohdata);
        },
      });

    }else{

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      const kirimanprovinsi = this.provinsi_cabang.split('|');
      if (kirimanprovinsi.indexOf('|') !== -1) {
        var kirimanprovinsid = kirimanprovinsi[1];
      } else {
        var kirimanprovinsid = this.provinsi_cabang;
      }
      const kirimankabkota = this.kabkota_cabang.split('|');
      if (kirimankabkota.indexOf('|') !== -1) {
        var kirimankabkotaid = kirimankabkota[1];
      } else {
        var kirimankabkotaid = this.kabkota_cabang;
      }
      const kirimankecamatan = this.kecamatan.split('|');
      if (kirimankecamatan.indexOf('|') !== -1) {
        var kirimankecamatanid = kirimankecamatan[1];
      } else {
        var kirimankecamatanid = this.kecamatan;
      }
      const kirimankelurahan = this.kelurahan.split('|');
      if (kirimankelurahan.indexOf('|') !== -1) {
        var kirimankelurahanid = kirimankelurahan[1];
      } else {
        var kirimankelurahanid = this.kelurahan;
      }

      this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: '',
        kategori_pekerjaan: 'Fixincome',
        curef: getcuref,
        jenis_kelamin: this.jenis_kelamin,
        jenis_kelamin_pasangan: '',
        usia: '0',
        app_no_ide: getappide,
        tanggal_lahir: this.tanggal_lahir,
        tanggal_lahir_pasangan: '',
        tempat_lahir: this.tempat_lahir,
        tempat_lahir_pasangan: '',
        status_perkawinan: this.status_perkawinan,
        status_alamat: '',
        status_kendaraan: '',
        status_ktp: '',
        status_ktp_pasangan: '',
        status_rumah: '',
        agama: this.agama,
        agama_pasangan: '',
        pendidikan: this.pendidikan,
        pendidikan_pasangan: '',
        kewarganegaraan: this.kewarganegaraan,
        kewarganegaraan_pasangan: '',
        nama_ibu_kandung: this.nama_ibu_kandung,
        nama_ibu_kandung_pasangan: '',
        npwp: this.npwp,
        npwp_pasangan: '',
        alamat_ktp: this.alamat_ktp,
        alamat_ktp_pasangan: '',
        alamat_domisili: '',
        provinsi: kirimanprovinsid,
        provinsi_domisili: '',
        provinsi_pasangan:'' ,
        kabkota: kirimankabkotaid,
        kabkota_domisili: '',
        kabkota_pasangan:'',
        kecamatan: kirimankecamatanid,
        kecamatan_domisili: '',
        kecamatan_pasangan:'' ,
        kelurahan: kirimankelurahanid,
        kelurahan_domisili: '',
        kelurahan_pasangan: '',
        kode_pos: kodeposget,
        kode_pos_domisili: '',
        kode_pos_pasangan: '',
        lama_menetap: '',
        cabang: '',
        created_by: '',
        created_date: '',
        email: '',
        email_pasangan: '',
        id: 0,
        jumlah_anak: '',
        rt: this.rt,
        rt_domisili: '',
        rt_pasangan: '',
        rw: this.rw,
        rw_domisili: '',
        rw_pasangan: '',
        no_ktp: this.no_ktp,
        no_ktp_pasangan: '',
        tanggal_terbit_ktp: this.tanggal_terbit_ktp,
        tanggal_terbit_ktp_pasangan: '',
        tanggal_exp_ktp: this.tanggal_exp_ktp,
        tanggal_exp_ktp_pasangan: '',
        tipe_kendaraan: '',
        no_handphone: this.no_handphone,
        no_handphone_pasangan: '',
        no_telepon: '',
        updated_by: '',
        updated_date: '',
        usia_pasangan: '',
      })
      .subscribe({
        next: data => {
          this.contohdata = data.result.id;
          this.app_no_ide = data.result.app_no_ide;
          this.tanggal_lahir = data.result.tanggal_lahir;

          this.router.navigate(['/daftaraplikasiide'], {
            // queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
          });

          alert(this.contohdata);
        },
      });


    }

    // const kirimanprovinsi = this.provinsi_cabang.split('|');
    // const kirimankabkota = this.kabkota_cabang.split('|');
    // const kirimankecamatan = this.kecamatan.split('|');
    // const kirimankelurahan = this.kelurahan.split('|');
    // const kirimanprovinsipasangan = this.provinsi_cabang_pasangan.split('|');
    // const kirimankabkotapasangan = this.kabkota_cabang_pasangan.split('|');
    // const kirimankecamatanpasangan = this.kecamatan_pasangan.split('|');
    // const kirimankelurahanpasangan = this.kelurahan_pasangan.split('|');

    // // const headers =   'Content-Type': 'application/json';
    // // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // //     let headers = new Headers();
    // // headers.append('Content-Type', 'application/json');
    // // headers.append('X-Authorization','');
    // // headers.append('Authorization', 'Bearer ' );

    // // {'Content-Type': 'application/json'}

    // const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    // // let headers = new HttpHeaders();
    // // headers = headers.append('Access-Control-Allow-Origin', '*');
    // // headers = headers.append('Access-Control-Allow-Credentials', 'true');

    // // alert(kodeposget);

    // // alert(this.provinsi_cabang);

    // // this.http.post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', body, { headers })
    // // http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide
    // // http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide
    // // this.http
    // //   .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', body,{headers: httpOptions} )

    // this.http
    //   .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
    //     headers: headers,
    //     nama: this.nama,
    //     nama_pasangan: '',
    //     kategori_pekerjaan: 'Fixincome',
    //     curef: getcuref,
    //     jenis_kelamin: this.jenis_kelamin,
    //     jenis_kelamin_pasangan: this.jenis_kelamin_pasangan,
    //     usia: '0',
    //     app_no_ide: getappide,
    //     tanggal_lahir: this.tanggal_lahir,
    //     tanggal_lahir_pasangan: this.tanggal_lahir_pasangan,
    //     tempat_lahir: this.tempat_lahir,
    //     tempat_lahir_pasangan: this.tempat_lahir_pasangan,
    //     status_perkawinan: this.status_perkawinan,
    //     status_alamat: '',
    //     status_kendaraan: '',
    //     status_ktp: '',
    //     status_ktp_pasangan: '',
    //     status_rumah: '',
    //     agama: this.agama,
    //     agama_pasangan: this.agama_pasangan,
    //     pendidikan: this.pendidikan,
    //     pendidikan_pasangan: this.pendidikan_pasangan,
    //     kewarganegaraan: this.kewarganegaraan,
    //     kewarganegaraan_pasangan: this.kewarganegaraan_pasangan,
    //     nama_ibu_kandung: this.nama_ibu_kandung,
    //     nama_ibu_kandung_pasangan: this.nama_ibu_kandung_pasangan,
    //     npwp: this.npwp,
    //     npwp_pasangan: this.npwp_pasangan,
    //     alamat_ktp: this.alamat_ktp,
    //     alamat_ktp_pasangan: this.alamat_ktp_pasangan,
    //     alamat_domisili: '',
    //     provinsi: kirimanprovinsi[1],
    //     provinsi_domisili: '',
    //     provinsi_pasangan:  kirimanprovinsipasangan[1],
    //     kabkota: kirimankabkota[1],
    //     kabkota_domisili: '',
    //     kabkota_pasangan:  kirimankabkotapasangan[1],
    //     kecamatan: kirimankecamatan[1],
    //     kecamatan_domisili: '',
    //     kecamatan_pasangan:  kirimankecamatanpasangan[1],
    //     kelurahan: kirimankelurahan[1],
    //     kelurahan_domisili: '',
    //     kelurahan_pasangan:  kirimankelurahanpasangan[1],
    //     kode_pos: kodeposget,
    //     kode_pos_domisili: '',
    //     kode_pos_pasangan: kodeposgetp,
    //     lama_menetap: '',
    //     cabang: '',
    //     created_by: '',
    //     created_date: '',
    //     email: '',
    //     email_pasangan: '',
    //     id: 0,
    //     jumlah_anak: '',
    //     rt: this.rt,
    //     rt_domisili: '',
    //     rt_pasangan: this.rt_pasangan,
    //     rw: this.rw,
    //     rw_domisili: '',
    //     rw_pasangan: this.rw_pasangan,
    //     no_ktp: this.no_ktp,
    //     no_ktp_pasangan: this.no_ktp_pasangan,
    //     tanggal_terbit_ktp: this.tanggal_terbit_ktp,
    //     tanggal_terbit_ktp_pasangan: this.tanggal_exp_ktp_pasangan,
    //     tanggal_exp_ktp: this.tanggal_exp_ktp,
    //     tanggal_exp_ktp_pasangan: this.tanggal_exp_ktp_pasangan,
    //     tipe_kendaraan: '',
    //     no_handphone: this.no_handphone,
    //     no_handphone_pasangan: this.no_handphone_pasangan,
    //     no_telepon: '',
    //     updated_by: '',
    //     updated_date: '',
    //     usia_pasangan: '',
    //   })
    //   .subscribe({
    //     next: data => {
    //       this.contohdata = data.result.id;

    //       this.router.navigate(['/daftaraplikasiide'], {
    //         //   queryParams: {},
    //       });

    //       alert(this.contohdata);
    //     },
    //   });
  }

  onSubmit(event: any) {
    return event.target.nama.value;
  }

  onChangep(selectedStatus: any) {
    // alert(this.postId);

    this.getkabkotap(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotap = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });

    console.log(selectedStatus);
  }

  onChangekotap(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatanp(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.daWakecamatanp = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatanp(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahanp(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.daWakelurahanp = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahanp(selectedStatus: any) {
    // alert(this.postId);
    const datakodepos = selectedStatus.split('|');

    this.daWakodeposp = datakodepos[0];

    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);

    console.log(selectedStatus);
  }

  onChange(selectedStatus: any) {
    // alert(this.postId);

    this.getkabkota(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });

    console.log(selectedStatus);
  }

  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatan(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.daWakecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahan(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.daWakelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    const datakodepos = selectedStatus.split('|');

    this.daWakodepos = datakodepos[0];

    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);

    console.log(selectedStatus);
  }


  carimenggunakankodepost(kodepost:any,req:any){

    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsi_cabang=res.body?.result.provKec.nm_prov;
        this.provinsi_cabangkode=res.body?.result.provKec.kd_prov;

        this.kabkota_cabang=res.body?.result.provKec.nm_kota;
        this.kabkota_cabangkode=res.body?.result.provKec.kd_kota;

        this.kecamatan=res.body?.result.provKec.nm_kec;
        this.kecamatankode=res.body?.result.provKec.kd_kec;

        this.kelurahan=res.body?.result.provKec.nm_kel;
        this.kelurahankode=res.body?.result.provKec.kd_kel;


        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang option:first').text(this.provinsi_cabang);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang option:first').text(this.kabkota_cabang);
        $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan option:first').text(this.kecamatan);

        $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan option:first').text(this.kelurahan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);


  }

  getkodepostnya(kodepst:any,req:any){

    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.postId}`,
    };
    // const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvKecByKdPos/' + kodepst, {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);

  }


  carimenggunakankodepostp(kodepost:any,req:any){

    this.getkodepostnyap(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsi_cabang_pasangan=res.body?.result.provKec.nm_prov;
        this.provinsi_cabang_pasangankode=res.body?.result.provKec.kd_prov;

        this.kabkota_cabang_pasangan=res.body?.result.provKec.nm_kota;
        this.kabkota_cabang_pasangankode=res.body?.result.provKec.kd_kota;

        this.kecamatan_pasangan=res.body?.result.provKec.nm_kec;
        this.kecamatan_pasangankode=res.body?.result.provKec.kd_kec;

        this.kelurahan_pasangan=res.body?.result.provKec.nm_kel;
        this.kelurahan_pasangankode=res.body?.result.provKec.kd_kel;


        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_pasangan option:first').text(this.provinsi_cabang_pasangan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_pasangan option:first').text(this.kabkota_cabang_pasangan);
        $('#kabkota_pasangan').attr('selected', 'selected').val(this.kabkota_cabang_pasangankode + '|' +    this.kabkota_cabang_pasangan);

        $('#kecamatan_pasangan').attr('selected', 'selected').val(this.kecamatan_pasangankode + '|' +    this.kecamatan_pasangan);
        $('#kecamatan_pasangan option:first').text(this.kecamatan_pasangan);

        $('#kelurahan_pasangan').attr('selected', 'selected').val(this.kelurahan_pasangankode + '|' +    this.kelurahan_pasangan);
        $('#kelurahan_pasangan option:first').text(this.kelurahan_pasangan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);


  }

  getkodepostnyap(kodepst:any,req:any){

    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.postId}`,
    };
    // const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvKecByKdPos/' + kodepst, {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);

  }


}
