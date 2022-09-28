import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';

// export type EntityResponseDaWa = HttpResponse<dataentrymodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  numbers: number[] | undefined;
  datakiriman!: string;
  tampungandataygdibawa: any;
  app_no_de: any;
  daWa: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  hasildhn: any;
  personal_info_value: any;

  ////
  // refStatusPerkawinan?: refStatusPerkawinan[];
  nama: string | undefined;
  jenis_kelamin: string | undefined;
  app_no_ide: string | undefined;
  tanggal_lahir: string | undefined;
  tempat_lahir: string | undefined;
  status_perkawinan: string | undefined;
  agama: string | undefined;
  pendidikan: string | undefined;
  kewarganegaraan: string | undefined;
  nama_ibu_kandung: string | undefined;
  npwp: string | undefined;
  alamat_ktp: string | undefined;
  alamat_domisili: string | undefined;
  provinsi_domisili: string | undefined;
  kabkota_domisili: string | undefined;
  kecamatan_domisili: string | undefined;
  kelurahan_domisili: string | undefined;
  kode_pos_domisili: string | undefined;
  rt_domisili: string | undefined;
  rw_domisili: string | undefined;
  provinsi_cabang: any;
  kabkota_cabang: any;
  no_telepon: any;
  email: any;
  jumlah_anak: any;
  status_rumah: any;
  lama_menetap: any;
  status_kendaraan: any;
  tipe_kendaraan: any;
  kecamatan: any;
  usia: any;
  kelurahan: any;
  kode_pos: string | undefined;
  rt: string | undefined;
  rw: string | undefined;
  no_ktp: string | undefined;
  tanggal_terbit_ktp: string | undefined;
  tanggal_exp_ktp: string | undefined;
  no_handphone: string | undefined;

  /////

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
  }

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    // alert(personal_info_retrive)
    // localStorage.setItem('daftar_aplikasi_de', personal_info_retrive);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        // console.warn('tabel', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.app_no_de, { params: options, observe: 'response' });
  }

  gotojobinfo(
    contohtampungancuref: any,
    contohtampungstatuskawain: any,
    contohtampunganappde: any,
    contohtampungankategoripekerjaan: any
  ): void {
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        datakiriman: contohtampungancuref,
        datakirimanstatus: contohtampungstatuskawain,
        app_no_de: contohtampunganappde,
        datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
      },
    });
  }

  gotojobandupdate(
    contohtampungancuref: any,
    contohtampungstatuskawain: any,
    contohtampunganappde: any,
    contohtampungankategoripekerjaan: any
  ): void {
    // this.onResponseSuccess(res);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_customer', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: '',
        kategori_pekerjaan: 'Fixincome',
        curef: '',
        jenis_kelamin: this.jenis_kelamin,
        jenis_kelamin_pasangan: '',
        usia: '0',
        app_no_ide: '',
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
        provinsi: '',
        provinsi_domisili: '',
        provinsi_pasangan: '',
        kabkota: '',
        kabkota_domisili: '',
        kecamatan: '',
        kecamatan_domisili: '',
        kecamatan_pasangan: '',
        kelurahan: '',
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
          // this.contohdata = data.result.app_no_de;

          this.router.navigate(['/data-entry/personalinfo'], {
            // queryParams: {app_no_de: this.contohdata},
          });
        },
      });

    // alert(contohtampungancuref);
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        datakiriman: contohtampungancuref,
        datakirimanstatus: contohtampungstatuskawain,
        app_no_de: contohtampunganappde,
        datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
      },
    });
  }
}
