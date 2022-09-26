import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { InitialDataEntryService } from '../services/initial-data-entry.service';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-non',
  templateUrl: './initial-data-entry-non.component.html',
  styleUrls: ['./initial-data-entry-non.component.scss'],
})
export class InitialDataEntryNonComponent implements OnInit {
  postId: any;
  daWacuref: any;
  daWa: any;
  daWaprof: any;
  daWakodepos: any;
  daWakelurahan: any;
  daWakecamatan: any;
  daWakota: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected ideNonServices: InitialDataEntryService
  ) {}

  // protected getcuref = this.applicationConfigService.getEndpointFor(' http://10.20.34.178:8805/api/v1/efos-ide/getCuref');
  // protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-ide/getAppId');
  // protected getprovinsi = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/wilayahSvc/getProvinsi/');
  // protected gettokenducapil = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/token/generate-token');

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.postUpdateStatus();

    console.warn('loadingNIH', this.postId);

    this.ideNonServices.getIdeById().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWa = (data as any).result;
      }
    });
    // this.getdataentry().subscribe({
    //   next: (res: EntityArrayResponseDaWa) => {
    //     this.daWa = res.body?.result;
    //     // this.onResponseSuccess(res);
    //   },
    // });

    this.ideNonServices.getIdeByCuref().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWacuref = (data as any).result;
      }
    });
    // this.getcurefnih().subscribe({
    //   next: (res: EntityArrayResponseDaWa) => {
    //     this.daWacuref = res.body?.result;
    //     // this.onResponseSuccess(res);
    //   },
    // });
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvinsi/', {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkabkota(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekota.split('|');

    //  this.http.get('http://10.20.82.12:8083/wilayahSvc/getProvinsi/',httpOptions)
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKota/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkota');
    alert(kodepotongan[0]);

    // return this.http.get<ApiResponse>(this.getprovinsi, { params: options, observe: 'response' });
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

    // return this.http.get<ApiResponse>(this.getprovinsi, { params: options, observe: 'response' });
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

    // return this.http.get<ApiResponse>(this.getprovinsi, { params: options, observe: 'response' });
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

    // return this.http.get<ApiResponse>(this.getprovinsi, { params: options, observe: 'response' });
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
          alert('dapetnih');

          this.getdataentry1(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
              alert(this.postId);
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
        error: error => {
          // this.errorMessage = error.message;
          // console.error('There was an error!', error);
          alert('gk dapet token');
        },
      });
  }

  nama: string | undefined;
  jenis_kelamin: string | undefined;
  app_no_ide: string | undefined = 'cara dapet valuenya';
  tanggal_lahir: string | undefined;
  tempat_lahir: string | undefined;
  status_perkawinan: string | undefined;
  agama: string | undefined;
  pendidikan: string | undefined;
  kewarganegaraan: string | undefined;
  nama_ibu_kandung: string | undefined;
  npwp: string | undefined;
  alamat_ktp: string | undefined;
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;

  rt: string | undefined;
  rw: string | undefined;
  no_ktp: string | undefined;
  tanggal_terbit_ktp: string | undefined;
  tanggal_exp_ktp: string | undefined;
  no_handphone: string | undefined;

  nama_perusahaan: string | undefined;
  tipe_perusahaan: string | undefined;
  tipe_pekerjaan: string | undefined;
  kepemilikan_perusahaan: string | undefined;
  pemilik_usaha: string | undefined;
  no_telepon: string | undefined;
  jenis_bidang: string | undefined;
  jenis_sektor: string | undefined;
  alamat_perusahaan: string | undefined;
  provinsi_perusahaan: string | undefined;
  kabkota_perusahaan: string | undefined;
  kecamatan_perusahaan: string | undefined;
  kelurahan_perusahaan: string | undefined;
  rt_perusahaan: string | undefined;
  rw_perusahaan: string | undefined;
  jumlah_karyawan: string | undefined;
  npwp_perusahaan: string | undefined;
  bulan_berdiri_perusahaan: string | undefined;
  tahun_berdiri_perusahaan: string | undefined;
  no_siup: string | undefined;
  barang_jasa: string | undefined;
  nama_perusahaan_sebelum: string | undefined;
  tipe_perusahaan_sebelum: string | undefined;
  tipe_pekerjaan_sebelum: string | undefined;
  alamat_pekerjaan_sebelum: string | undefined;

  jenis_bidang_sebelum: string | undefined;
  jenis_sektor_sebelum: string | undefined;
  bulan_berdiri_perusahaan_sebelum: string | undefined;
  tahun_berdiri_perusahaan_sebelum: string | undefined;

  nama_pasangan: string | undefined;
  jenis_kelamin_pasangan: string | undefined;
  tanggal_lahir_pasangan: string | undefined;
  tempat_lahir_pasangan: string | undefined;
  agama_pasangan: string | undefined;
  pendidikan_pasangan: string | undefined;
  kewarganegaraan_pasangan: string | undefined;
  nama_ibu_kandung_pasangan: string | undefined;
  npwp_pasangan: string | undefined;
  alamat_ktp_pasangan: string | undefined;
  provinsi_cabang_pasangan: string | undefined;
  kabkota_cabang_pasangan: string | undefined;
  no_ktp_pasangan: string | undefined;
  kecamatan_pasangan: string | undefined;
  kelurahan_pasangan: string | undefined;
  kode_pos_pasangan: string | undefined;
  rt_pasangan: string | undefined;
  rw_pasangan: string | undefined;
  tanggal_terbit_ktp_pasangan: string | undefined;

  tanggal_exp_ktp_pasangan: string | undefined;
  no_handphone_pasangan: string | undefined;

  gotoprescreaning() {
    this.router.navigate(['/hasilprescreening'], {
      queryParams: {},
    });
  }

  gotodaftaraplikasiide() {
    this.router.navigate(['/daftaraplikasiide'], {
      queryParams: {},
    });
  }

  onChange(selectedStatus: any) {
    alert(this.postId);

    this.getkabkota(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });

    console.log(selectedStatus);
  }

  onChangekota(selectedStatus: any) {
    alert(this.postId);
    this.getkecamatan(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.daWakecamatan = res.body?.result;
        alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatan(selectedStatus: any) {
    alert(this.postId);
    this.getkelurahan(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.daWakelurahan = res.body?.result;
        alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahan(selectedStatus: any) {
    alert(this.postId);
    const datakodepos = selectedStatus.split('|');

    this.daWakodepos = datakodepos[0];

    alert(this.daWakodepos);
    // this.onResponseSuccess(res);

    console.log(selectedStatus);
  }
}
