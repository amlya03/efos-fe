import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { InitialDataEntryService } from '../services/initial-data-entry.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;

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
  provinsi_cabangkode: any;
  kabkota_cabangkode: any;
  kecamatankode: any;
  kelurahankode: any;
  provinsi_perusahaankode: any;
  kabkota_perusahaankode: any;
  kecamatan_perusahaankode: any;
  kelurahan_perusahaankode: any;
  provinsi_cabang_pasangankode: any;
  kabkota_cabang_pasangankode: any;
  kecamatan_pasangankode: any;
  kelurahan_pasangankode: any;
  contohdata: any;
  gettipeperusahaandariapi: any;
  getjenispekerjaandariapi: any;
  getjenisbidangdariapi: any;
  getdatasektorekonomi: any;
  gettipeperusahaandariapisebelum: any;
  getjenispekerjaandariapisebelum: any;
  getjenisbidangdariapisebelum: any;
  getdatasektorekonomisebelum: any;

  dataentrynonfixfrom!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected ideNonServices: InitialDataEntryService,
    private formBuilder: FormBuilder
  ) {}

  // protected getcuref = this.applicationConfigService.getEndpointFor(' http://10.20.34.110:8805/api/v1/efos-ide/getCuref');
  // protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getAppId');
  // protected getprovinsi = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/wilayahSvc/getProvinsi/');
  // protected gettokenducapil = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/token/generate-token');
  protected apilisttipeperusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_perusahaan'
  );
  protected apigetjenispekeraan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_pekerjaan?sc='
  );
  protected apilistjenisbidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');

  ngOnInit(): void {
    this.load();

    this.dataentrynonfixfrom = this.formBuilder.group({
      noaplikasi: null,
      nama: null,
      jeniskelamin: null,
      tanggallahir: null,
      umurform: null,
      tempatlahir: null,
      statusperkawinan: null,
      agamaform: null,
      pendidikanform: null,
      kewarganegaraanform: null,
      ibukandung: null,
      npwpform: null,
      alamatktp: null,
      provinsiform: null,
      kotaform: null,
      kecamatanform: null,
      kelurahanform: null,
      kodeposform: null,
      rtform: null,
      rwform: null,
      noktp: null,
      tanggalterbit: null,
      ktpseumurhidup: null,
      tanggalexpktp: null,
      nohandphone: null,

      namapasangan: null,
      jeniskelaminpasangan: null,
      tanggallahirpasangan: null,
      umurformpasangan: null,
      tempatlahirpasangan: null,
      statusperkawinanpasangan: null,
      agamaformpasangan: null,
      pendidikanformpasangan: null,
      kewarganegaraanformpasangan: null,
      ibukandungpasangan: null,
      npwpformpasangan: null,
      alamatktppasangan: null,
      provinsiformpasangan: null,
      kotaformpasangan: null,
      kecamatanformpasangan: null,
      kelurahanformpasangan: null,
      kodeposformpasangan: null,
      rtformpasangan: null,
      rwformpasangan: null,
      noktppasangan: null,
      tanggalterbitpasangan: null,
      ktpseumurhiduppasangan: null,
      tanggalexpktppasangan: null,
      nohandphonepasangan: null,

      namaperusahaan: null,
      tipeperusahaan: null,
      tipepekerjaan: null,
      kepemilikanperusahaan: null,
      pemilikusaha: null,
      nomorteleponperusahaan: null,
      jenisbidang: null,
      jenissektor: null,
      alamatperusahaan: null,
      provinsiformperusahaan: null,
      kotaformperusahaan: null,
      kecamatanformperusahaan: null,
      kelurahanperusahaan: null,
      kodeposformperusahaan: null,
      rtformperusahaan: null,
      rwformperusahaan: null,
      jumlahkaryawan: null,
      npwpformperusahan: null,
      berdirisejakbulan: null,
      berdirisejaktahun: null,
      nosiup: null,
      barangajasa: null,

      namaperusahansebelum: null,
      tipeperushaansebelum: null,
      tipepekerjaansebelum: null,
      alamatsebelum: null,
      jenisbidangsebelum: null,
      jenissektorsebelum: null,
      berdirisejakbulansebelum: null,
      berdirisejaktahunsebelum: null,
    });
  }

  load() {
    this.postUpdateStatus();

    console.warn('loadingNIH', this.postId);

    this.ideNonServices.getIdeById().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWa = (data as any).result;
      } else {
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
      } else {
        this.daWacuref = (data as any).result;
      }
      // alert(  this.daWacuref);
    });
    // this.getcurefnih().subscribe({
    //   next: (res: EntityArrayResponseDaWa) => {
    //     this.daWacuref = res.body?.result;
    //     // this.onResponseSuccess(res);
    //   },
    // });

    this.getlisttipeperusahaan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('tipe_perusahaan', res.body?.result);
        this.gettipeperusahaandariapi = res.body?.result;
      },
    });

    this.getlisttipeperusahaansebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('tipe_perusahaan', res.body?.result);
        this.gettipeperusahaandariapisebelum = res.body?.result;
      },
    });

    this.getjenispekerjaan(2).subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenispekerjaan', res.body?.result);
        this.getjenispekerjaandariapi = res.body?.result;
      },
    });

    this.getjenispekerjaansebelum(2).subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenispekerjaan', res.body?.result);
        this.getjenispekerjaandariapisebelum = res.body?.result;
      },
    });

    this.getlistjenisbidang().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenisbidang', res.body?.result);
        this.getjenisbidangdariapi = res.body?.result;
      },
    });

    this.getlistjenisbidangsebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenisbidang', res.body?.result);
        this.getjenisbidangdariapisebelum = res.body?.result;
      },
    });
  }
  getlisttipeperusahaan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilisttipeperusahaan, { params: options, observe: 'response' });
  }

  getlisttipeperusahaansebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilisttipeperusahaan, { params: options, observe: 'response' });
  }

  getjenispekerjaan(katagori_pekerjaan: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + katagori_pekerjaan, { params: options, observe: 'response' });
  }
  getjenispekerjaansebelum(katagori_pekerjaan: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + katagori_pekerjaan, { params: options, observe: 'response' });
  }

  getlistjenisbidang(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjenisbidang, { params: options, observe: 'response' });
  }

  getlistjenisbidangsebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjenisbidang, { params: options, observe: 'response' });
  }

  jenisbidangselect() {
    const id_sektor = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');

    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomi = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
  }

  jenisbidangselectsebelum() {
    const id_sektor = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');

    // console.log('kode' + selectedStatus);
    this.getsektorekonomisebelum(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomisebelum = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
  }

  getsektorekonomi(idsktor: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // const httpOptions = {
    //   // 'Authorization': token,
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // };
    // const kodepotongan = kodekota.split('|');
    return this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + idsktor, {
      params: options,
      observe: 'response',
    });
  }

  getsektorekonomisebelum(idsktor: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // const httpOptions = {
    //   // 'Authorization': token,
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // };
    // const kodepotongan = kodekota.split('|');
    return this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + idsktor, {
      params: options,
      observe: 'response',
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
          // alert('dapetnih');

          this.getdataentry1(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
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
        error: error => {
          // this.errorMessage = error.message;
          // console.error('There was an error!', error);
          // alert('gk dapet token');
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
  provinsi_perusahaan: any;
  kabkota_perusahaan: any;
  kecamatan_perusahaan: any;
  kelurahan_perusahaan: any;
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
  kode_pos_perusahaan: string | undefined;

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
  provinsi_cabang_pasangan: any;
  kabkota_cabang_pasangan: any;
  no_ktp_pasangan: string | undefined;
  kecamatan_pasangan: any;
  kelurahan_pasangan: any;
  kode_pos_pasangan: string | undefined;
  rt_pasangan: string | undefined;
  rw_pasangan: string | undefined;
  tanggal_terbit_ktp_pasangan: string | undefined;

  tanggal_exp_ktp_pasangan: string | undefined;
  no_handphone_pasangan: string | undefined;

  gotoprescreaning(app_no_ide: any, curef: any) {
    alert('cekcuref' + curef);
    if (this.status_perkawinan == 'Menikah') {
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

      const kirimanprovinsipsng = this.provinsi_cabang_pasangan.split('|');
      if (this.provinsi_cabang_pasangan.indexOf('|') !== -1) {
        var kirimanprovpsg = kirimanprovinsipsng[1];
      } else {
        var kirimanprovpsg = this.provinsi_cabang_pasangan;
      }
      const kirimankabkotapsng = this.kabkota_cabang_pasangan.split('|');
      if (this.kabkota_cabang_pasangan.indexOf('|') !== -1) {
        var kirimankotapsg = kirimankabkotapsng[1];
      } else {
        var kirimankotapsg = this.kabkota_cabang_pasangan;
      }
      const kirimankecamatanpsng = this.kecamatan_pasangan.split('|');
      if (this.kecamatan_pasangan.indexOf('|') !== -1) {
        var kirimankecamatanpsg = kirimankecamatanpsng[1];
      } else {
        var kirimankecamatanpsg = this.kecamatan_pasangan;
      }
      const kirimankelurahanpsng = this.kelurahan_pasangan.split('|');
      if (this.kelurahan_pasangan.indexOf('|') !== -1) {
        var kirimankelurahanpsg = kirimankelurahanpsng[1];
      } else {
        var kirimankelurahanpsg = this.kelurahan_pasangan;
      }

      const kirimanprovinsijob = this.provinsi_perusahaan.split('|');
      if (this.provinsi_perusahaan.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = this.provinsi_perusahaan;
      }
      const kirimankabkotajob = this.kabkota_perusahaan.split('|');
      if (this.kabkota_perusahaan.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = this.kabkota_perusahaan;
      }
      const kirimankecamatanjob = this.kecamatan_perusahaan.split('|');
      if (this.kecamatan_perusahaan.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = this.kecamatan_perusahaan;
      }
      const kirimankelurahanjob = this.kelurahan_perusahaan.split('|');
      if (this.kelurahan_perusahaan.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = this.kelurahan_perusahaan;
      }

      const httpOptions = {
        'Content-Type': 'text/plain',
      };

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
          headers: headers,
          nama: this.nama,
          nama_pasangan: this.nama_pasangan,
          kategori_pekerjaan: 'Non Fix Income',
          curef: curef,
          jenis_kelamin: this.jenis_kelamin,
          jenis_kelamin_pasangan: this.jenis_kelamin_pasangan,
          usia: '0',
          app_no_ide: app_no_ide,
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
          provinsi_pasangan: kirimanprovpsg,
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: kirimankotapsg,
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: kirimankecamatanpsg,
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: kirimankelurahanpsg,
          kode_pos: '',
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
        .subscribe(resposne => {
          this.contohdata = resposne.result.id;

          console.log(resposne);
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
              headers: headers,
              alamat_perusahaan: this.alamat_perusahaan,
              barang_jasa: this.barang_jasa,
              bulan_berdiri: this.bulan_berdiri_perusahaan,
              bulan_berdiri_sebelum: this.bulan_berdiri_perusahaan_sebelum,
              created_by: '',
              created_date: '',
              curef: curef,
              id: '',
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: this.jenis_bidang,
              jenis_bidang_sebelum: this.jenis_bidang_sebelum,
              jenis_pekerjaan: '',
              jenis_pekerjaan_sebelum: '',
              jumlah_karyawan: this.jumlah_karyawan,
              jumlah_karyawan_sebelum: '',
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: '',
              kategori_pekerjaan_sebelum: '',
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: this.kepemilikan_perusahaan,
              kode_pos: '',
              kode_pos_sebelum: '',
              lama_bekerja_tahun: '',
              lama_bekerja_bulan: '',
              lama_bekerja_bulan_sebelum: '',
              lama_bekerja_tahun_sebelum: '',
              nama_perusahaan: this.nama,
              nama_perusahaan_sebelum: '',
              no_siup: this.no_siup,
              no_telepon: this.no_telepon,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: this.pemilik_usaha,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: this.rt_perusahaan,
              rt_sebelum: '',
              rw: this.rw_perusahaan,
              rw_sebelum: '',
              sektor_ekonomi: this.jenis_sektor,
              sektor_ekonomi_sebelum: this.jenis_sektor_sebelum,
              status_active: '',
              tahun_berdiri: this.tahun_berdiri_perusahaan,
              tahun_berdiri_sebelum: this.tahun_berdiri_perusahaan_sebelum,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: this.tipe_pekerjaan,
              tipe_pekerjaan_sebelum: this.tipe_pekerjaan_sebelum,
              tipe_perusahaan: this.tipe_perusahaan,
              tipe_perusahaan_sebelum: this.tipe_perusahaan_sebelum,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = data.result.app_no_ide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    datakirimanid: this.contohdata,
                    datakirimantgllahir: this.tanggal_lahir,
                    datakirimanappide: this.app_no_ide,
                  },
                });

                alert(this.contohdata);
              },
            });
        });
    } else {
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

      const kirimanprovinsijob = this.provinsi_perusahaan.split('|');
      if (this.provinsi_perusahaan.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = this.provinsi_perusahaan;
      }
      const kirimankabkotajob = this.kabkota_perusahaan.split('|');
      if (this.kabkota_perusahaan.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = this.kabkota_perusahaan;
      }

      const kirimankecamatanjob = this.kecamatan_perusahaan.split('|');
      if (this.kecamatan_perusahaan.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = this.kecamatan_perusahaan;
      }
      const kirimankelurahanjob = this.kelurahan_perusahaan.split('|');
      if (this.kelurahan_perusahaan.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = this.kelurahan_perusahaan;
      }

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
      const umur = document.getElementById('umur') as HTMLInputElement | any;

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
          headers: headers,
          nama: this.nama,
          nama_pasangan: '',
          kategori_pekerjaan: 'Non Fix Income',
          curef: curef,
          jenis_kelamin: this.jenis_kelamin,
          jenis_kelamin_pasangan: '',
          usia: umur.value,
          app_no_ide: app_no_ide,
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
          provinsi_pasangan: '',
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: '',
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: '',
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: '',
          kode_pos: '',
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
        .subscribe(resposne => {
          alert(resposne.result);
          console.log('ini respon' + resposne.result);
          this.contohdata = resposne.result.id;
          this.app_no_ide = resposne.result.app_no_ide;
          this.tanggal_lahir = resposne.result.tanggal_lahir;

          alert('gagal nih ');
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
              headers: headers,
              alamat_perusahaan: this.alamat_perusahaan,
              barang_jasa: this.barang_jasa,
              bulan_berdiri: this.bulan_berdiri_perusahaan,
              bulan_berdiri_sebelum: this.bulan_berdiri_perusahaan_sebelum,
              created_by: '',
              created_date: '',
              curef: curef,
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: this.jenis_bidang,
              jenis_bidang_sebelum: this.jenis_bidang_sebelum,
              jenis_pekerjaan: this.status_perkawinan,
              jenis_pekerjaan_sebelum: '',
              jumlah_karyawan: this.jumlah_karyawan,
              jumlah_karyawan_sebelum: '',
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: '',
              kategori_pekerjaan_sebelum: '',
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: this.kepemilikan_perusahaan,
              kode_pos: '',
              kode_pos_sebelum: '',
              lama_bekerja_tahun: '',
              lama_bekerja_bulan: '',
              lama_bekerja_bulan_sebelum: '',
              lama_bekerja_tahun_sebelum: '',
              nama_perusahaan: this.nama,
              nama_perusahaan_sebelum: '',
              no_siup: this.no_siup,
              no_telepon: this.no_telepon,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: this.pemilik_usaha,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: this.rt_perusahaan,
              rt_sebelum: '',
              rw: this.rw_perusahaan,
              rw_sebelum: '',
              sektor_ekonomi: this.jenis_sektor,
              sektor_ekonomi_sebelum: this.jenis_sektor_sebelum,
              status_active: '',
              tahun_berdiri: this.tahun_berdiri_perusahaan,
              tahun_berdiri_sebelum: this.tahun_berdiri_perusahaan_sebelum,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: this.tipe_pekerjaan,
              tipe_pekerjaan_sebelum: this.tipe_pekerjaan_sebelum,
              tipe_perusahaan: this.tipe_perusahaan,
              tipe_perusahaan_sebelum: this.tipe_perusahaan_sebelum,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                alert(data.result);
                // this.contohdata = data.result.id;

                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    datakirimanid: this.contohdata,
                    datakirimantgllahir: this.tanggal_lahir,
                    datakirimanappide: this.app_no_ide,
                  },
                });

                alert(this.contohdata);
              },
            });
        });
    }
  }

  gotodaftaraplikasiide(app_no_ide: any, curef: any) {
    // alert('cekcuref'+curef)
    if (this.status_perkawinan == 'Menikah') {
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

      const kirimanprovinsipsng = this.provinsi_cabang_pasangan.split('|');
      if (this.provinsi_cabang_pasangan.indexOf('|') !== -1) {
        var kirimanprovpsg = kirimanprovinsipsng[1];
      } else {
        var kirimanprovpsg = this.provinsi_cabang_pasangan;
      }
      const kirimankabkotapsng = this.kabkota_cabang_pasangan.split('|');
      if (this.kabkota_cabang_pasangan.indexOf('|') !== -1) {
        var kirimankotapsg = kirimankabkotapsng[1];
      } else {
        var kirimankotapsg = this.kabkota_cabang_pasangan;
      }
      const kirimankecamatanpsng = this.kecamatan_pasangan.split('|');
      if (this.kecamatan_pasangan.indexOf('|') !== -1) {
        var kirimankecamatanpsg = kirimankecamatanpsng[1];
      } else {
        var kirimankecamatanpsg = this.kecamatan_pasangan;
      }
      const kirimankelurahanpsng = this.kelurahan_pasangan.split('|');
      if (this.kelurahan_pasangan.indexOf('|') !== -1) {
        var kirimankelurahanpsg = kirimankelurahanpsng[1];
      } else {
        var kirimankelurahanpsg = this.kelurahan_pasangan;
      }

      const kirimanprovinsijob = this.provinsi_perusahaan.split('|');
      if (this.provinsi_perusahaan.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = this.provinsi_perusahaan;
      }
      const kirimankabkotajob = this.kabkota_perusahaan.split('|');
      if (this.kabkota_perusahaan.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = this.kabkota_perusahaan;
      }
      const kirimankecamatanjob = this.kecamatan_perusahaan.split('|');
      if (this.kecamatan_perusahaan.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = this.kecamatan_perusahaan;
      }
      const kirimankelurahanjob = this.kelurahan_perusahaan.split('|');
      if (this.kelurahan_perusahaan.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = this.kelurahan_perusahaan;
      }

      const httpOptions = {
        'Content-Type': 'text/plain',
      };

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
          headers: headers,
          nama: this.nama,
          nama_pasangan: this.nama_pasangan,
          kategori_pekerjaan: 'Non Fix Income',
          curef: curef,
          jenis_kelamin: this.jenis_kelamin,
          jenis_kelamin_pasangan: this.jenis_kelamin_pasangan,
          usia: '0',
          app_no_ide: app_no_ide,
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
          provinsi_pasangan: kirimanprovpsg,
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: kirimankotapsg,
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: kirimankecamatanpsg,
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: kirimankelurahanpsg,
          kode_pos: '',
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
        .subscribe(resposne => {
          this.contohdata = resposne.result.id;

          console.log(resposne);
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
              headers: headers,
              alamat_perusahaan: this.alamat_perusahaan,
              barang_jasa: this.barang_jasa,
              bulan_berdiri: this.bulan_berdiri_perusahaan,
              bulan_berdiri_sebelum: this.bulan_berdiri_perusahaan_sebelum,
              created_by: '',
              created_date: '',
              curef: curef,
              id: '',
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: this.jenis_bidang,
              jenis_bidang_sebelum: this.jenis_bidang_sebelum,
              jenis_pekerjaan: this.status_perkawinan,
              jenis_pekerjaan_sebelum: this.nama,
              jumlah_karyawan: this.jumlah_karyawan,
              jumlah_karyawan_sebelum: this.nama,
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: this.agama,
              kategori_pekerjaan_sebelum: this.nama,
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: this.kepemilikan_perusahaan,
              kode_pos: '',
              kode_pos_sebelum: '',
              lama_bekerja_tahun: this.nama,
              lama_bekerja_bulan_sebelum: this.alamat_ktp,
              lama_bekerja_tahun_sebelum: this.nama,
              nama_perusahaan: this.nama,
              nama_perusahaan_sebelum: '',
              no_siup: this.no_siup,
              no_telepon: this.no_telepon,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: this.pemilik_usaha,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: this.rt_perusahaan,
              rt_sebelum: '',
              rw: this.rw_perusahaan,
              rw_sebelum: '',
              sektor_ekonomi: this.jenis_sektor,
              sektor_ekonomi_sebelum: this.jenis_sektor_sebelum,
              status_active: '',
              tahun_berdiri: this.tahun_berdiri_perusahaan,
              tahun_berdiri_sebelum: this.tahun_berdiri_perusahaan_sebelum,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: this.tipe_pekerjaan,
              tipe_pekerjaan_sebelum: this.tipe_pekerjaan_sebelum,
              tipe_perusahaan: this.tipe_perusahaan,
              tipe_perusahaan_sebelum: this.tipe_perusahaan_sebelum,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = data.result.app_no_ide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                this.router.navigate(['/daftaraplikasiide'], {
                  queryParams: {},
                });

                // alert(this.contohdata);
              },
            });
        });
    } else {
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

      const kirimanprovinsijob = this.provinsi_perusahaan.split('|');
      if (this.provinsi_perusahaan.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = this.provinsi_perusahaan;
      }
      const kirimankabkotajob = this.kabkota_perusahaan.split('|');
      if (this.kabkota_perusahaan.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = this.kabkota_perusahaan;
      }

      const kirimankecamatanjob = this.kecamatan_perusahaan.split('|');
      if (this.kecamatan_perusahaan.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = this.kecamatan_perusahaan;
      }
      const kirimankelurahanjob = this.kelurahan_perusahaan.split('|');
      if (this.kelurahan_perusahaan.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = this.kelurahan_perusahaan;
      }

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
      const umur = document.getElementById('umur') as HTMLInputElement | any;

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
          headers: headers,
          nama: this.nama,
          nama_pasangan: '',
          kategori_pekerjaan: 'Non Fix Income',
          curef: curef,
          jenis_kelamin: this.jenis_kelamin,
          jenis_kelamin_pasangan: '',
          usia: umur.value,
          app_no_ide: app_no_ide,
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
          provinsi_pasangan: '',
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: '',
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: '',
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: '',
          kode_pos: '',
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
        .subscribe(resposne => {
          console.log(resposne);
          this.contohdata = resposne.result.id;

          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
              headers: headers,
              alamat_perusahaan: this.alamat_perusahaan,
              barang_jasa: this.barang_jasa,
              bulan_berdiri: this.bulan_berdiri_perusahaan,
              bulan_berdiri_sebelum: this.bulan_berdiri_perusahaan_sebelum,
              created_by: '',
              created_date: '',
              curef: curef,
              id: '',
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: this.jenis_bidang,
              jenis_bidang_sebelum: this.jenis_bidang_sebelum,
              jenis_pekerjaan: this.status_perkawinan,
              jenis_pekerjaan_sebelum: this.nama,
              jumlah_karyawan: this.jumlah_karyawan,
              jumlah_karyawan_sebelum: this.nama,
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: this.agama,
              kategori_pekerjaan_sebelum: this.nama,
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: this.kepemilikan_perusahaan,
              kode_pos: '',
              kode_pos_sebelum: '',
              lama_bekerja_tahun: this.nama,
              lama_bekerja_bulan_sebelum: this.alamat_ktp,
              lama_bekerja_tahun_sebelum: this.nama,
              nama_perusahaan: this.nama,
              nama_perusahaan_sebelum: '',
              no_siup: this.no_siup,
              no_telepon: this.no_telepon,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: this.pemilik_usaha,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: this.rt_perusahaan,
              rt_sebelum: '',
              rw: this.rw_perusahaan,
              rw_sebelum: '',
              sektor_ekonomi: this.jenis_sektor,
              sektor_ekonomi_sebelum: this.jenis_sektor_sebelum,
              status_active: '',
              tahun_berdiri: this.tahun_berdiri_perusahaan,
              tahun_berdiri_sebelum: this.tahun_berdiri_perusahaan_sebelum,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: this.tipe_pekerjaan,
              tipe_pekerjaan_sebelum: this.tipe_pekerjaan_sebelum,
              tipe_perusahaan: this.tipe_perusahaan,
              tipe_perusahaan_sebelum: this.tipe_perusahaan_sebelum,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = data.result.app_no_ide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                this.router.navigate(['/daftaraplikasiide'], {
                  queryParams: {},
                });

                // alert(this.contohdata);
              },
            });
        });
    }
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

  carimenggunakankodepost(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsi_cabang = res.body?.result.provKec.nm_prov;
        this.provinsi_cabangkode = res.body?.result.provKec.kd_prov;

        this.kabkota_cabang = res.body?.result.provKec.nm_kota;
        this.kabkota_cabangkode = res.body?.result.provKec.kd_kota;

        this.kecamatan = res.body?.result.provKec.nm_kec;
        this.kecamatankode = res.body?.result.provKec.kd_kec;

        this.kelurahan = res.body?.result.provKec.nm_kel;
        this.kelurahankode = res.body?.result.provKec.kd_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang option:first').text(this.provinsi_cabang);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang option:first').text(this.kabkota_cabang);
        $('#kabkota_cabang')
          .attr('selected', 'selected')
          .val(this.kabkota_cabangkode + '|' + this.kabkota_cabang);

        $('#kecamatan')
          .attr('selected', 'selected')
          .val(this.kecamatankode + '|' + this.kecamatan);
        $('#kecamatan option:first').text(this.kecamatan);

        $('#kelurahan')
          .attr('selected', 'selected')
          .val(this.kelurahankode + '|' + this.kelurahan);
        $('#kelurahan option:first').text(this.kelurahan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  getkodepostnya(kodepst: any, req: any) {
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
  }

  carimenggunakankodepostj(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsi_perusahaan = res.body?.result.provKec.nm_prov;
        this.provinsi_perusahaankode = res.body?.result.provKec.kd_prov;

        this.kabkota_perusahaan = res.body?.result.provKec.nm_kota;
        this.kabkota_perusahaankode = res.body?.result.provKec.kd_kota;

        this.kecamatan_perusahaan = res.body?.result.provKec.nm_kec;
        this.kecamatan_perusahaankode = res.body?.result.provKec.kd_kec;

        this.kelurahan_perusahaan = res.body?.result.provKec.nm_kel;
        this.kelurahan_perusahaankode = res.body?.result.provKec.kd_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_perusahaan option:first').text(this.provinsi_perusahaan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_perusahaan option:first').text(this.kabkota_perusahaan);
        $('#kabkota_perusahaan')
          .attr('selected', 'selected')
          .val(this.kabkota_perusahaankode + '|' + this.kabkota_perusahaan);

        $('#kecamatan_perusahaan')
          .attr('selected', 'selected')
          .val(this.kecamatan_perusahaankode + '|' + this.kecamatan_perusahaan);
        $('#kecamatan_perusahaan option:first').text(this.kecamatan_perusahaan);

        $('#kelurahan_perusahaan')
          .attr('selected', 'selected')
          .val(this.kelurahan_perusahaankode + '|' + this.kelurahan_perusahaan);
        $('#kelurahan_perusahaan option:first').text(this.kelurahan_perusahaan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  getkodepostnyaj(kodepst: any, req: any) {
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
  }

  carimenggunakankodepostp(kodepost: any, req: any) {
    this.getkodepostnyap(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsi_cabang_pasangan = res.body?.result.provKec.nm_prov;
        this.provinsi_cabang_pasangankode = res.body?.result.provKec.kd_prov;

        this.kabkota_cabang_pasangan = res.body?.result.provKec.nm_kota;
        this.kabkota_cabang_pasangankode = res.body?.result.provKec.kd_kota;

        this.kecamatan_pasangan = res.body?.result.provKec.nm_kec;
        this.kecamatan_pasangankode = res.body?.result.provKec.kd_kec;

        this.kelurahan_pasangan = res.body?.result.provKec.nm_kel;
        this.kelurahan_pasangankode = res.body?.result.provKec.kd_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang_pasangan option:first').text(this.provinsi_cabang_pasangan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang_pasangan option:first').text(this.kabkota_cabang_pasangan);
        $('#kabkota_cabang_pasangan')
          .attr('selected', 'selected')
          .val(this.kabkota_cabang_pasangankode + '|' + this.kabkota_cabang_pasangan);

        $('#kecamatan_pasangan')
          .attr('selected', 'selected')
          .val(this.kecamatan_pasangankode + '|' + this.kecamatan_pasangan);
        $('#kecamatan_pasangan option:first').text(this.kecamatan_pasangan);

        $('#kelurahan_pasangan')
          .attr('selected', 'selected')
          .val(this.kelurahan_pasangankode + '|' + this.kelurahan_pasangan);
        $('#kelurahan_pasangan option:first').text(this.kelurahan_pasangan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  getkodepostnyap(kodepst: any, req: any) {
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
  }

  submitBday() {
    const contoh = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const contoh2 = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    var Q4A = '';
    var Bdate = contoh.value;
    var Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    var theBday = document.getElementById('umur');
    $('#umur').val(Q4A);
  }

  submitBdayp() {
    const contoh = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;

    var Q4A = '';
    var Bdate = contoh.value;
    var Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    var theBday = document.getElementById('umur');
    $('#umurpasangan').val(Q4A);
  }
}
