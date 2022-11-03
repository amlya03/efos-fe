import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { refStatusPerkawinan } from 'app/verification/service/config/refStatusPerkawinan.model';
import { refStatusRumah } from 'app/verification/service/config/refStatusRumah.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { refListTipeKendaraan } from '../services/config/refListTipeKendaraan.model';

// export type EntityResponseDaWa = HttpResponse<dataentrymodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  personalInfoForm!: FormGroup;
  submitted = false;
  numbers: number[] | undefined;
  curef!: string;
  tampungandataygdibawa: any;
  app_no_de: any;
  daWa: any;
  personalInfoModel: fetchAllDe = new fetchAllDe();
  // /////////////REF//////////////////////////////////
  ref_status_perkawinan: refStatusPerkawinan[] = [];
  ref_status_rumah: refStatusRumah[] = [];
  ref_list_tipe_kendaraan: refListTipeKendaraan[] = [];

  // Retrive Radio BUtoon dan select Option Kondisi
  ktp_seumur_hidup: any;
  tipe_kendaraan: any;

  hasildhn: any;
  personal_info_value: any;

  // nama: string | undefined;
  // jenis_kelamin: string | undefined;
  // app_no_ide: string | undefined;
  // tanggal_lahir: string | undefined;
  // tempat_lahir: string | undefined;
  // status_perkawinan: string | undefined;
  // agama: string | undefined;
  // pendidikan: string | undefined;
  // kewarganegaraan: string | undefined;
  // nama_ibu_kandung: string | undefined;
  // npwp: string | undefined;
  // alamat_ktp: string | undefined;
  // alamat_domisili: string | undefined;
  provinsi_domisili: string | undefined;
  kabkota_domisili: string | undefined;
  kecamatan_domisili: string | undefined;
  kelurahan_domisili: string | undefined;
  kode_pos_domisili: string | undefined;
  // rt_domisili: string | undefined;
  // rw_domisili: string | undefined;
  provinsi_cabang: any;
  kabkota_cabang: any;
  // no_telepon: any;
  // email: any;
  // jumlah_anak: any;
  // status_rumah: any;
  // lama_menetap: any;
  // status_kendaraan: any;
  // tipe_kendaraan: any;
  kecamatan: any;
  // usia: any;
  kelurahan: any;
  kode_pos: string | undefined;
  // rt: string | undefined;
  // rw: string | undefined;
  // no_ktp: string | undefined;
  // tanggal_terbit_ktp: string | undefined;
  // tanggal_exp_ktp: string | undefined;
  // no_handphone: string | undefined;
  databawaan: any;
  contohdata: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  daWakodepos: any;
  daWakotaD: any;
  kecamatanD: any;
  kelurahanD: any;
  daWakodeposD: any;
  contohcontoh: any;
  kirimanstatusktp: any;
  statusPerkawinan: any;
  untukSessionRole: any;
  curefGetDE: any;
  statusKawin: any;
  /////

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    protected verificationServices: ServiceVerificationService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
      this.app_no_de = params['app_no_de'];
      this.statusPerkawinan = params.statusPerkawinan;
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.load();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.personalInfoForm = this.formBuilder.group({
      nama: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      jenis_kelamin: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      tanggal_lahir: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      tempat_lahir: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      usia: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      agama: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      pendidikan: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      kewarganegaraan: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      email: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      no_handphone: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      no_ktp: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      tanggal_terbit_ktp: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      status_ktp: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      tanggal_exp_ktp: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      npwp: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      status_perkawinan: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      jumlah_anak: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      status_rumah: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      lama_menetap: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      status_kendaraan: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      tipe_kendaraan: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      alamat_ktp: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      rt: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      rw: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      alamat_domisili: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      rt_domisili: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      rw_domisili: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
      no_telepon: [{ value: !null || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER'}],
    });
  }

  load(): void {
    this.gettokendukcapil();
    this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data =>{
      this.personalInfoModel = data.result;
      this.curefGetDE = this.personalInfoModel.curef;
      this.statusKawin = this.personalInfoModel.status_perkawinan;

      /////////////////////////////////////////////////////////////////////////////
      let retrivePersonalInfo = {
        nama: this.personalInfoModel.nama,
        jenis_kelamin: this.personalInfoModel.jenis_kelamin,
        tanggal_lahir: this.personalInfoModel.tanggal_lahir,
        tempat_lahir: this.personalInfoModel.tempat_lahir,
        usia: this.personalInfoModel.usia,
        agama: this.personalInfoModel.agama,
        pendidikan: this.personalInfoModel.pendidikan,
        kewarganegaraan: this.personalInfoModel.kewarganegaraan,
        email: this.personalInfoModel.email,
        no_handphone: this.personalInfoModel.no_handphone,
        no_telepon: this.personalInfoModel.no_telepon,
        no_ktp: this.personalInfoModel.no_ktp,
        tanggal_terbit_ktp: this.personalInfoModel.tanggal_terbit_ktp,
        status_ktp: this.personalInfoModel.status_ktp,
        tanggal_exp_ktp: this.personalInfoModel.tanggal_exp_ktp,
        npwp: this.personalInfoModel.npwp,
        status_perkawinan: this.personalInfoModel.status_perkawinan,
        jumlah_anak: this.personalInfoModel.jumlah_anak,
        status_rumah: this.personalInfoModel.status_rumah,
        lama_menetap: this.personalInfoModel.lama_menetap,
        status_kendaraan: this.personalInfoModel.status_kendaraan,
        tipe_kendaraan: this.personalInfoModel.tipe_kendaraan,
        alamat_ktp: this.personalInfoModel.alamat_ktp,
        rt: this.personalInfoModel.rt,
        rw: this.personalInfoModel.rw,
        alamat_domisili: this.personalInfoModel.alamat_domisili,
        rt_domisili: this.personalInfoModel.rt_domisili,
        rw_domisili: this.personalInfoModel.rw_domisili,
      };
      this.personalInfoForm.setValue(retrivePersonalInfo);
    })
    // /////////////////////////Ref////////////////////////////////////
    this.datEntryService.getFetchStatusPerkawinan().subscribe(data => {
      this.ref_status_perkawinan = data.result;
    })
    this.verificationServices.getStatusRumah().subscribe(data =>{
      this.ref_status_rumah = data.result;
    })
    this.datEntryService.getFetchListTipeKendaraaan().subscribe(data =>{
      this.ref_list_tipe_kendaraan = data.result;
    })
  }

  gotojobinfo(contohtampungancuref: any, contohtampungstatuskawain: any, contohtampunganappde: any): void {
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        curef: contohtampungancuref,
        statusPerkawinan: contohtampungstatuskawain,
        app_no_de: contohtampunganappde,
      },
    });
  }

  gotojobandupdate(
    contohtampungancuref: any,
    contohtampungstatuskawain: any,
    contohtampunganappde: any,
    contohtampungankategoripekerjaan: any
  ) {
    //const nama = document.getElementById('nama') as HTMLInputElement | any;
    //const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
    //const app_no_ide = document.getElementById('app_no_ide') as HTMLInputElement | any;
    // const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    // const tempat_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    // const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    // const agama = document.getElementById('agama') as HTMLInputElement | any;
    // const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
    // const kewarganegaraan = document.getElementById('kewarganegaraan') as HTMLInputElement | any;
    // const nama_ibu_kandung = document.getElementById('nama_ibu_kandung') as HTMLInputElement | any;
    // const npwp = document.getElementById('npwp') as HTMLInputElement | any;
    // const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
    // const alamat_domisili = document.getElementById('alamat_domisili') as HTMLInputElement | any;
    const provinsi_domisili = document.getElementById('provinsi_domisili') as HTMLInputElement | any;
    const kabkota_domisili = document.getElementById('kabkota_domisili') as HTMLInputElement | any;
    const kecamatan_domisili = document.getElementById('kecamatan_domisili') as HTMLInputElement | any;
    const kelurahan_domisili = document.getElementById('kelurahan_domisili') as HTMLInputElement | any;
    const kode_pos_domisili = document.getElementById('kode_pos_domisili') as HTMLInputElement | any;
    //const rt_domisili = document.getElementById('rt_domisili') as HTMLInputElement | any;
    //const rw_domisili = document.getElementById('rw_domisili') as HTMLInputElement | any;
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    // const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
    // const email = document.getElementById('email') as HTMLInputElement | any;
    // const jumlah_anak = document.getElementById('jumlah_anak') as HTMLInputElement | any;
    // const status_rumah = document.getElementById('status_rumah') as HTMLInputElement | any;
    // const lama_menetap = document.getElementById('lama_menetap') as HTMLInputElement | any;
    // const status_kendaraan = document.getElementById('status_kendaraan') as HTMLInputElement | any;
    // const tipe_kendaraan = document.getElementById('tipe_kendaraan') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    // const usia = document.getElementById('usia') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    // const rt = document.getElementById('rt') as HTMLInputElement | any;
    // const rw = document.getElementById('rw') as HTMLInputElement | any;
    // const no_ktp = document.getElementById('no_ktp') as HTMLInputElement | any;
    // const tanggal_terbit_ktp = document.getElementById('tanggal_terbit_ktp') as HTMLInputElement | any;
    // const tanggal_exp_ktp = document.getElementById('tanggal_exp_ktp') as HTMLInputElement | any;
    // const no_handphone = document.getElementById('no_handphone') as HTMLInputElement | any;
    // const id = document.getElementById('id') as HTMLInputElement | any;

    //const statusktpia = (<HTMLInputElement>document.getElementById('ktp_seumur_hidup_ya')).checked;
    // const statusktptidak = (<HTMLInputElement>document.getElementById('ktp_seumur_hidup_tidak')).checked;
    //const radiobuttonia = (<HTMLInputElement>document.getElementById('alamat_sama_ktp_sama')).checked;
    //const radiobuttontidak = (<HTMLInputElement>document.getElementById('alamat_sama_ktp_tidak')).checked;
    // const radiobuttonia=document.getElementById('alamat_sama_ktp_sama') as HTMLInputElement | any;
    // const radiobuttontidak=document.getElementById('alamat_sama_ktp_tidak') as HTMLInputElement | any;
    // alert(id.value);
    // alert(contohtampungancuref);

    // if (radiobuttonia == true) {
    //   this.contohcontoh = 1;
    // } else if (radiobuttontidak == true) {
    //   this.contohcontoh = 0;
    // } else {
    //   this.contohcontoh = 9;
    // }

    // if (statusktpia == true) {
    //   this.kirimanstatusktp = 1;
    // } else if (statusktptidak == true) {
    //   this.kirimanstatusktp = 0;
    // } else {
    //   this.kirimanstatusktp = 9;
    // }

    //  alert('gajeals'+ contohcontoh)
    // else if(radiobuttontidak==true){
    // //   var statusktp='0';
    // //  }
    // // else{
    // // //   var statusktp='tidak dipilih';
    // // // }

    var kirimanpotonganprovinsi = provinsi_cabang.value.split('|');
    var cekdatapipe = provinsi_cabang.value.indexOf('|');

    if (cekdatapipe !== -1) {
      var kirimanprovinsi = kirimanpotonganprovinsi[1];

      // alert('update provinsi bawa value pipe |' + kirimanprovinsi);
    } else {
      //  var kirimanprovinsi =kirimanpotonganprovinsi[1];
      var kirimanprovinsi = provinsi_cabang.value;
      // alert('update provinsi bawa value' + kirimanprovinsi);
    }
    var potongankabkota = kabkota_cabang.value.split('|');
    if (kabkota_cabang.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankabkota[1];
    } else {
      var kirimankabkota = kabkota_cabang.value;
    }
    var potongankecamatan = kecamatan.value.split('|');
    if (kecamatan.value.indexOf('|') !== -1) {
      var kirimankecamatan = potongankecamatan[1];
    } else {
      var kirimankecamatan = kecamatan.value;
    }
    var potongankelurahan = kelurahan.value.split('|');
    if (kelurahan.value.indexOf('|') !== -1) {
      var kirimankelurahan = potongankelurahan[1];
    } else {
      var kirimankelurahan = kelurahan.value;
    }
    var kirimanpotonganprovinsid = provinsi_domisili.value.split('|');
    if (provinsi_domisili.value.indexOf('|') !== -1) {
      var kirimanprovinsid = kirimanpotonganprovinsid[1];
    } else {
      var kirimanprovinsid = provinsi_domisili.value;
    }
    var potongankabkota = kabkota_domisili.value.split('|');
    if (kabkota_domisili.value.indexOf('|') !== -1) {
      var kirimankabkotad = potongankabkota[1];
    } else {
      var kirimankabkotad = kabkota_domisili.value;
    }
    var potongankecamatan = kecamatan_domisili.value.split('|');
    if (kecamatan_domisili.value.indexOf('|') !== -1) {
      var kirimankecamatand = potongankecamatan[1];
    } else {
      var kirimankecamatand = kecamatan_domisili.value;
    }
    var potongankelurahan = kelurahan_domisili.value.split('|');
    if (kelurahan_domisili.value.indexOf('|') !== -1) {
      var kirimankelurahand = potongankelurahan[1];
    } else {
      var kirimankelurahand = kelurahan_domisili.value;
    }

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_customer', {
        // headers: headers,

        nama: this.personalInfoForm.get('nama')?.value,
        kategori_pekerjaan: contohtampungankategoripekerjaan,
        curef: contohtampungancuref,
        jenis_kelamin: this.personalInfoForm.get('jenis_kelamin')?.value,
        usia: this.personalInfoForm.get('usia')?.value,
        app_no_ide: this.personalInfoModel.app_no_ide,
        app_no_de: contohtampunganappde,
        tanggal_lahir: this.personalInfoForm.get('tanggal_lahir')?.value,
        tempat_lahir: this.personalInfoForm.get('tempat_lahir')?.value,
        status_perkawinan: this.personalInfoForm.get('status_perkawinan')?.value,
        status_alamat: this.personalInfoForm.get('status_alamat')?.value,
        status_kendaraan: this.personalInfoForm.get('status_kendaraan')?.value,
        status_ktp: this.personalInfoForm.get('status_ktp')?.value,
        status_rumah: this.personalInfoForm.get('status_rumah')?.value,
        agama: this.personalInfoForm.get('agama')?.value,
        pendidikan: this.personalInfoForm.get('pendidikan')?.value,
        kewarganegaraan: this.personalInfoForm.get('kewarganegaraan')?.value,
        npwp: this.personalInfoForm.get('npwp')?.value,
        alamat_ktp: this.personalInfoForm.get('alamat_ktp')?.value,
        id: this.personalInfoModel.id_customer,
        alamat_domisili: this.personalInfoForm.get('alamat_domisili')?.value,
        provinsi: kirimanprovinsi,
        provinsi_domisili: kirimanprovinsid,
        kabkota: kirimankabkota,
        kabkota_domisili: kirimankabkotad,
        kecamatan: kirimankecamatan,
        kecamatan_domisili: kirimankecamatand,
        kelurahan: kirimankelurahan,
        kelurahan_domisili: kirimankelurahand,
        kode_pos: kode_pos.value,
        kode_pos_domisili: kode_pos_domisili.value,
        lama_menetap: this.personalInfoForm.get('lama_menetap')?.value,
        email: this.personalInfoForm.get('email')?.value,
        jumlah_anak: this.personalInfoForm.get('jumlah_anak')?.value,
        rt: this.personalInfoForm.get('rt')?.value,
        rt_domisili: this.personalInfoForm.get('rt_domisili')?.value,
        rw: this.personalInfoForm.get('rw')?.value,
        rw_domisili: this.personalInfoForm.get('rw_domisili')?.value,
        no_ktp: this.personalInfoForm.get('no_ktp')?.value,
        tanggal_terbit_ktp: this.personalInfoForm.get('tanggal_terbit_ktp')?.value,
        tanggal_exp_ktp: this.personalInfoForm.get('tanggal_exp_ktp')?.value,
        no_handphone: this.personalInfoForm.get('no_handphone')?.value,
        no_telepon: this.personalInfoForm.get('no_telepon')?.value,
        updated_by: this.localStorageService.retrieve('sessionUserName'),
        tipe_kendaraan: this.personalInfoForm.get('tipe_kendaraan')?.value,
        // updated_date: '1 ',
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/job-info'], {
            queryParams: {
              curef: this.curefGetDE,
              statusPerkawinan: this.statusKawin,
              app_no_de: this.app_no_de,
              // datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
            },
          });
        },
      });

    // alert(contohtampungancuref);
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: contohtampungancuref,
    //     statusPerkawinan: contohtampungstatuskawain,
    //     app_no_de: contohtampunganappde,
    //     datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
    //   },
    // });
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: contohtampungancuref,
    //     statusPerkawinan: contohtampungstatuskawain,
    //     app_no_de: contohtampunganappde,
    //     datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
    //   },
    // });
  }

  gettokendukcapil(): void {
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

          this.datEntryService.getprovinsi(this.postId).subscribe({
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
      });
  }

  onChange(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    // alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodepos;
    // alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }

  onChangeD(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_domisili') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotaD = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekotaD(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_domisili') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatanD = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatanD(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_domisili') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahanD = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahanD(selectedStatus: any) {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_domisili') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_domisili') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodeposD = datakodepos[0];

    // alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodeposD;
    // alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }
  onItemChange(event: any){
    // alert(event.value)
    if(event.value == 1){
      this.personalInfoForm.get('alamat_domisili')?.setValue(this.personalInfoForm.get('alamat_ktp')?.value);
      this.personalInfoForm.get('rt_domisili')?.setValue(this.personalInfoForm.get('rt')?.value);
      this.personalInfoForm.get('rw_domisili')?.setValue(this.personalInfoForm.get('rw')?.value);
      this.personalInfoModel.provinsi_domisili = this.personalInfoModel.provinsi;
      this.personalInfoModel.kabkota_domisili = this.personalInfoModel.kabkota;
      this.personalInfoModel.kecamatan_domisili = this.personalInfoModel.kecamatan;
      this.personalInfoModel.kelurahan_domisili = this.personalInfoModel.kelurahan;
      this.personalInfoModel.kode_pos_domisili = this.personalInfoModel.kode_pos;
    } else {
      this.personalInfoForm.get('alamat_domisili')?.setValue(' ');
      this.personalInfoForm.get('rt_domisili')?.setValue(' ');
      this.personalInfoForm.get('rw_domisili')?.setValue(' ');
      this.personalInfoModel.provinsi_domisili = '';
      this.personalInfoModel.kabkota_domisili = '';
      this.personalInfoModel.kecamatan_domisili = '';
      this.personalInfoModel.kelurahan_domisili = '';
    }
  }
}
