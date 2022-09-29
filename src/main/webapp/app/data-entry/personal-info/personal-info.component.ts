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
  databawaan: any;
  contohdata: any;

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
        console.warn('tabel', res);
        console.warn('!!!!!!!!!!!!!!!!!!!', this.app_no_de);
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
  ) {
    const nama = document.getElementById('nama') as HTMLInputElement | any;
    const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
    const app_no_ide = document.getElementById('app_no_ide') as HTMLInputElement | any;
    const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const tempat_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    const agama = document.getElementById('agama') as HTMLInputElement | any;
    const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
    const kewarganegaraan = document.getElementById('kewarganegaraan') as HTMLInputElement | any;
    const nama_ibu_kandung = document.getElementById('nama_ibu_kandung') as HTMLInputElement | any;
    const npwp = document.getElementById('npwp') as HTMLInputElement | any;
    const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
    const alamat_domisili = document.getElementById('alamat_domisili') as HTMLInputElement | any;
    const provinsi_domisili = document.getElementById('provinsi_domisili') as HTMLInputElement | any;
    const kabkota_domisili = document.getElementById('kabkota_domisili') as HTMLInputElement | any;
    const kecamatan_domisili = document.getElementById('kecamatan_domisili') as HTMLInputElement | any;
    const kelurahan_domisili = document.getElementById('kelurahan_domisili') as HTMLInputElement | any;
    const kode_pos_domisili = document.getElementById('kode_pos_domisili') as HTMLInputElement | any;
    const rt_domisili = document.getElementById('rt_domisili') as HTMLInputElement | any;
    const rw_domisili = document.getElementById('rw_domisili') as HTMLInputElement | any;
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
    const email = document.getElementById('email') as HTMLInputElement | any;
    const jumlah_anak = document.getElementById('jumlah_anak') as HTMLInputElement | any;
    const status_rumah = document.getElementById('status_rumah') as HTMLInputElement | any;
    const lama_menetap = document.getElementById('lama_menetap') as HTMLInputElement | any;
    const status_kendaraan = document.getElementById('status_kendaraan') as HTMLInputElement | any;
    const tipe_kendaraan = document.getElementById('tipe_kendaraan') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const usia = document.getElementById('usia') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kelurahan') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_ktp = document.getElementById('no_ktp') as HTMLInputElement | any;
    const tanggal_terbit_ktp = document.getElementById('tanggal_terbit_ktp') as HTMLInputElement | any;
    const tanggal_exp_ktp = document.getElementById('tanggal_exp_ktp') as HTMLInputElement | any;
    const no_handphone = document.getElementById('no_handphone') as HTMLInputElement | any;
    const id = document.getElementById('id') as HTMLInputElement | any;
    alert(id.value);
    alert(jenis_kelamin.value);

    // input?.addEventListener('input', function (event: { target: HTMLInputElement; }) {
    //   const target = event.target as HTMLInputElement |any;
    //   console.log(target.value);
    // });

    // alert(target.value);

    //   const headers = {     'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   // 'Access-Control-Allow-Origin': 'http://localhost:9000',
    //   // 'Access-Control-Allow-Credentials': 'true',
    //   // 'Access-Control-Allow-Methods' : "GET,POST,OPTIONS,DELETE,PUT",
    //   // 'Access-Control-Allow-Headers': "Access-Control-Allow-Headers: *",
    //   // Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar',

    // };
    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_customer', {
        // headers: headers,

        nama: nama.value,
        kategori_pekerjaan: contohtampungankategoripekerjaan,
        curef: contohtampungancuref,
        jenis_kelamin: jenis_kelamin.value,
        usia: usia.value,
        app_no_ide: app_no_ide.value,
        app_no_de: contohtampunganappde,
        tanggal_lahir: tanggal_lahir.value,
        tempat_lahir: tempat_lahir.value,
        status_perkawinan: status_perkawinan.value,
        status_alamat: ' 1',
        status_kendaraan: '1 ',
        status_ktp: ' 1',
        status_rumah: ' 1',
        agama: agama.value,
        pendidikan: pendidikan.value,
        kewarganegaraan: kewarganegaraan.value,
        // nama_ibu_kandung: ' 1',
        npwp: npwp.value,
        alamat_ktp: alamat_ktp.value,
        id: id.value,
        alamat_domisili: alamat_domisili.value,
        provinsi: provinsi_cabang.value,
        provinsi_domisili: provinsi_domisili.value,
        kabkota: kabkota_cabang.value,
        kabkota_domisili: kabkota_domisili.value,
        kecamatan: kecamatan.value,
        kecamatan_domisili: kecamatan_domisili.value,
        kelurahan: kelurahan.value,
        kelurahan_domisili: kelurahan_domisili.value,
        kode_pos: kode_pos.value,
        kode_pos_domisili: kode_pos_domisili.value,
        lama_menetap: lama_menetap.value,
        // cabang: '1',
        // created_by: '1',
        // created_date: '1',
        email: 'emaik',
        jumlah_anak: jumlah_anak.value,
        rt: rt.value,
        rt_domisili: rt_domisili.value,
        rw: rw.value,
        rw_domisili: rw_domisili.value,
        no_ktp: no_ktp.value,
        tanggal_terbit_ktp: tanggal_terbit_ktp.value,
        tanggal_exp_ktp: tanggal_exp_ktp.value,
        no_handphone: no_handphone.value,
        no_telepon: '123123',
        updated_by: ' 1',
        // updated_date: '1 ',
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/job-info'], {
            queryParams: {
              datakiriman: contohtampungancuref,
              datakirimanstatus: contohtampungstatuskawain,
              datakirimanappde: contohtampunganappde,
              datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
            },
          });
        },
      });

    // alert(contohtampungancuref);
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: contohtampungancuref,
    //     datakirimanstatus: contohtampungstatuskawain,
    //     datakirimanappde: contohtampunganappde,
    //     datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
    //   },
    // });
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
