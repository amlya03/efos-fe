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

  gotoprescreaning(app_no_ide: any, curef: any) {
    const kirimanprovinsi = this.provinsi_cabang.split('|');
    const kirimankabkota = this.kabkota_cabang.split('|');
    const kirimankecamatan = this.kecamatan.split('|');
    const kirimankelurahan = this.kelurahan.split('|');
    const kirimanprovinsipsng = this.provinsi_cabang.split('|');
    const kirimankabkotapsng = this.kabkota_cabang.split('|');
    const kirimankecamatanpsng = this.kecamatan.split('|');
    const kirimankelurahanpsng = this.kelurahan.split('|');
    const httpOptions = {
      'Content-Type': 'text/plain',
    };

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/create_app_ide', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: this.nama_pasangan,
        kategori_pekerjaan: 'Fixincome',
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
        provinsi: kirimanprovinsi[1],
        provinsi_domisili: 'this.nama_pasangan',
        provinsi_pasangan: kirimanprovinsipsng[1],
        kabkota: kirimankabkota[1],
        kabkota_domisili: '',
        kabkota_pasangan: kirimankabkotapsng[1],
        kecamatan: kirimankecamatan[1],
        kecamatan_domisili: '',
        kecamatan_pasangan: kirimankecamatanpsng[1],
        kelurahan: kirimankelurahan[1],
        kelurahan_domisili: '',
        kelurahan_pasangan: kirimankelurahanpsng[1],
        kode_pos: this.kode_pos,
        kode_pos_domisili: '',
        kode_pos_pasangan: this.kode_pos_pasangan,
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
        tipe_kendaraan: '',
        no_handphone: this.no_handphone,
        no_handphone_pasangan: this.no_handphone_pasangan,
        no_telepon: '',
        updated_by: '',
        updated_date: '',
        usia_pasangan: '',
        alamat_pekerjaan: this.alamat_perusahaan,
        alamat_pekerjaan_sebelum: this.alamat_pekerjaan_sebelum,
      })
      .subscribe(resposne => {
        console.log(resposne);
      });

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/create_job_info', {
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
        kabkota: this.kabkota_perusahaan,
        kategori_pekerjaan: this.agama,
        kategori_pekerjaan_sebelum: this.nama,
        kecamatan: this.kecamatan_perusahaan,
        kecamatan_sebelum: '',
        kelurahan: this.kelurahan_perusahaan,
        kelurahan_sebelum: '',
        kepemilikan_perusahaan: this.kepemilikan_perusahaan,
        kode_pos: '',
        kode_pos_sebelum: '',
        lama_bekerja_tahun: this.nama,
        lama_bekerja_bulan_sebelum: this.alamat_ktp,
        lama_bekerja_tahun_sebelum: this.nama,
        nama_perusahaan: this.nama,
        nama_perusahaan_sebelum: kirimanprovinsi[1],
        no_siup: this.no_siup,
        no_telepon: this.no_telepon,
        npwp: kirimankabkota[1],
        payroll: '',
        payroll_sebelum: '',
        pemilik_usaha: this.pemilik_usaha,
        pendapatan: '',
        pendapatan_lain: '',
        posisi: '',
        posisi_sebelum: '',
        provinsi: this.provinsi_perusahaan,
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
      .subscribe(resposne => {
        console.log(resposne);
      });

    this.router.navigate(['/hasilprescreening'], {
      queryParams: {},
    });
  }

  gotodaftaraplikasiide(app_no_ide: any, curef: any) {
    const kirimanprovinsi = this.provinsi_cabang.split('|');
    const kirimankabkota = this.kabkota_cabang.split('|');
    const kirimankecamatan = this.kecamatan.split('|');
    const kirimankelurahan = this.kelurahan.split('|');
    const kirimanprovinsipsng = this.provinsi_cabang.split('|');
    const kirimankabkotapsng = this.kabkota_cabang.split('|');
    const kirimankecamatanpsng = this.kecamatan.split('|');
    const kirimankelurahanpsng = this.kelurahan.split('|');
    const httpOptions = {
      'Content-Type': 'text/plain',
    };

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/create_app_ide', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: this.nama_pasangan,
        kategori_pekerjaan: 'Fixincome',
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
        provinsi: kirimanprovinsi[1],
        provinsi_domisili: 'this.nama_pasangan',
        provinsi_pasangan: kirimanprovinsipsng[1],
        kabkota: kirimankabkota[1],
        kabkota_domisili: '',
        kabkota_pasangan: kirimankabkotapsng[1],
        kecamatan: kirimankecamatan[1],
        kecamatan_domisili: '',
        kecamatan_pasangan: kirimankecamatanpsng[1],
        kelurahan: kirimankelurahan[1],
        kelurahan_domisili: '',
        kelurahan_pasangan: kirimankelurahanpsng[1],
        kode_pos: this.kode_pos,
        kode_pos_domisili: '',
        kode_pos_pasangan: this.kode_pos_pasangan,
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
        tipe_kendaraan: '',
        no_handphone: this.no_handphone,
        no_handphone_pasangan: this.no_handphone_pasangan,
        no_telepon: '',
        updated_by: '',
        updated_date: '',
        usia_pasangan: '',
        alamat_pekerjaan: this.alamat_perusahaan,
        alamat_pekerjaan_sebelum: this.alamat_pekerjaan_sebelum,
      })
      .subscribe(resposne => {
        console.log(resposne);
      });

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/create_job_info', {
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
        kabkota: this.kabkota_perusahaan,
        kategori_pekerjaan: this.agama,
        kategori_pekerjaan_sebelum: this.nama,
        kecamatan: this.kecamatan_perusahaan,
        kecamatan_sebelum: '',
        kelurahan: this.kelurahan_perusahaan,
        kelurahan_sebelum: '',
        kepemilikan_perusahaan: this.kepemilikan_perusahaan,
        kode_pos: '',
        kode_pos_sebelum: '',
        lama_bekerja_tahun: this.nama,
        lama_bekerja_bulan_sebelum: this.alamat_ktp,
        lama_bekerja_tahun_sebelum: this.nama,
        nama_perusahaan: this.nama,
        nama_perusahaan_sebelum: kirimanprovinsi[1],
        no_siup: this.no_siup,
        no_telepon: this.no_telepon,
        npwp: kirimankabkota[1],
        payroll: '',
        payroll_sebelum: '',
        pemilik_usaha: this.pemilik_usaha,
        pendapatan: '',
        pendapatan_lain: '',
        posisi: '',
        posisi_sebelum: '',
        provinsi: this.provinsi_perusahaan,
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
      .subscribe(resposne => {
        console.log(resposne);
      });

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
