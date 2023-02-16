/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { SessionStorageService } from 'ngx-webstorage';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { refStatusPerkawinan } from 'app/verification/service/config/refStatusPerkawinan.model';
import { refStatusRumah } from 'app/verification/service/config/refStatusRumah.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { refListTipeKendaraan } from '../services/config/refListTipeKendaraan.model';
import { environment } from 'environments/environment';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';

@Component({
  selector: 'jhi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
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
  pendidikanModel: refJenisPekerjaan[] = [];
  // Retrive Radio BUtoon dan select Option Kondisi
  tipe_kendaraan: any;

  hasildhn: any;
  personal_info_value: any;
  provinsi_domisili: string | undefined;
  kabkota_domisili: string | undefined;
  kecamatan_domisili: string | undefined;
  kelurahan_domisili: string | undefined;
  kode_pos_domisili: string | undefined;
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  databawaan: any;
  contohdata: any;
  daWaprof: any;
  daWakota: any;
  daWakodepos: any;
  daWakotaD: any;
  kecamatanD: any;
  kelurahanD: any;
  daWakodeposD: any;
  contohcontoh: any;
  kirimanstatusktp: any;
  untukSessionRole: any;
  curefGetDE: any;
  statusKawin: any;
  // ///
  untukKodeProvinsi: any;
  untukKodeKobkota: any;
  untukKodeKecamatan: any;
  untukprovinsi: any;
  untukkobkota: any;
  untukkecamatan: any;
  untukKodeKelurahan: any;
  untukkelurahan: any;
  // ////
  untukKodeProvinsiD: any;
  untukKodeKobkotaD: any;
  untukKodeKecamatanD: any;
  untukprovinsiD: any;
  untukkobkotaD: any;
  untukkecamatanD: any;
  untukKodeKelurahanD: any;
  untukkelurahanD: any;

  // ///////////////////
  clickKdPostDomisili = 0;
  responseKelsDomisili: refJenisPekerjaan[] = [];
  responseNamaWilayahDomisili: refJenisPekerjaan[] = [];
  // //////////////////

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private sessionStorageService: SessionStorageService,
    private formBuilder: FormBuilder,
    protected verificationServices: ServiceVerificationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
      this.app_no_de = params.app_no_de;
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.load();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.personalInfoForm = this.formBuilder.group({
      nama: [{ value: '' || null, disabled: true }, Validators.required],
      jenis_kelamin: [{ value: '' || null, disabled: true }, Validators.required],
      tanggal_lahir: [{ value: '' || null, disabled: true }, Validators.required],
      tempat_lahir: [{ value: '' || null, disabled: true }, Validators.required],
      usia: [{ value: '' || null, disabled: true }, Validators.required],
      agama: [{ value: '' || null, disabled: true }, Validators.required],
      pendidikan: [{ value: '' || null, disabled: true }, Validators.required],
      kewarganegaraan: [{ value: '' || null, disabled: true }, Validators.required],
      email: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_handphone: [{ value: '' || null, disabled: true }, Validators.required],
      no_ktp: [{ value: '' || null, disabled: true }, Validators.required],
      tanggal_terbit_ktp: [{ value: '' || null, disabled: true }, Validators.required],
      status_ktp: [{ value: '' || null, disabled: true }, Validators.required],
      tanggal_exp_ktp: [{ value: '' || null, disabled: true }, Validators.required],
      npwp: [{ value: '' || null, disabled: true }, Validators.required],
      status_perkawinan: [{ value: '' || null, disabled: true }, Validators.required],
      jumlah_anak: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_rumah: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_menetap: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_kendaraan: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_kendaraan: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_ktp: [{ value: '' || null, disabled: true }, Validators.required],
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      provinsi: [{ value: '' || null, disabled: true }, Validators.required],
      kabkota: [{ value: '' || null, disabled: true }, Validators.required],
      kecamatan: [{ value: '' || null, disabled: true }, Validators.required],
      kelurahan: [{ value: '' || null, disabled: true }, Validators.required],
      kode_pos: [{ value: '' || null, disabled: true }, Validators.required],
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      rt: [{ value: '' || null, disabled: true }, Validators.required],
      rw: [{ value: '' || null, disabled: true }, Validators.required],
      alamat_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      provinsi_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      kabkota_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      kecamatan_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      kelurahan_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_pos_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      rt_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw_domisili: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_telepon: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load(): void {
    this.datEntryService.getprovinsi().subscribe({
      next: data => {
        this.daWaprof = data.result;
      },
    });
    // /////////////////////////Ref////////////////////////////////////
    setTimeout(() => {
      this.datEntryService.getListPendidikan().subscribe({
        next: data => {
          this.pendidikanModel = data.result;
        },
      });
    }, 10);

    setTimeout(() => {
      this.datEntryService.getFetchStatusPerkawinan().subscribe(data => {
        this.ref_status_perkawinan = data.result;
      });
    }, 20);
    setTimeout(() => {
      this.verificationServices.getStatusRumah().subscribe(data => {
        this.ref_status_rumah = data.result;
      });
    }, 30);
    setTimeout(() => {
      this.datEntryService.getFetchListTipeKendaraaan().subscribe(data => {
        this.ref_list_tipe_kendaraan = data.result;
      });
    }, 40);

    setTimeout(() => {
      this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        this.personalInfoModel = data.result;
        this.curefGetDE = this.personalInfoModel.curef;
        this.statusKawin = this.personalInfoModel.status_perkawinan;
        // alert(this.personalInfoModel.jenis_kelamin)
        // ///////////////////////////////////////////////////////////////////////////
        const retrivePersonalInfo = {
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
          // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          provinsi: '',
          kabkota: '',
          kecamatan: '',
          kelurahan: '',
          kode_pos: this.personalInfoModel.kode_pos,
          // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          rt: this.personalInfoModel.rt,
          rw: this.personalInfoModel.rw,
          alamat_domisili: this.personalInfoModel.alamat_domisili,
          // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          provinsi_domisili: '',
          kabkota_domisili: '',
          kecamatan_domisili: '',
          kelurahan_domisili: '',
          kode_pos_domisili: this.personalInfoModel.kode_pos_domisili,
          // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          rt_domisili: this.personalInfoModel.rt_domisili,
          rw_domisili: this.personalInfoModel.rw_domisili,
        };
        this.personalInfoForm.setValue(retrivePersonalInfo);
        setTimeout(() => {
          this.kodePosApi(this.personalInfoModel.kode_pos);
          this.kodePosApiDomisili(this.personalInfoModel.kode_pos_domisili);
        }, 300);
      });
    }, 60);
  }

  hitungUsia(): void {
    const getValueTanggal = +new Date(this.personalInfoForm.value.tanggal_lahir);
    // ////////////////////////// ini buat dapet bulan ////////////////////////////
    // eslint-disable-next-line no-bitwise
    const getTahun = +~~((Date.now() - getValueTanggal) / 31557600000);
    this.personalInfoForm.get('usia')?.setValue(getTahun);
  }

  gotojobinfo(contohtampungancuref: any, contohtampungstatuskawain: any, contohtampunganappde: any): void {
    this.sessionStorageService.store('personalInfo', 1);
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        curef: contohtampungancuref,
        app_no_de: contohtampunganappde,
      },
    });
  }

  gotojobandupdate(
    contohtampungancuref: any,
    contohtampungstatuskawain: any,
    contohtampunganappde: any,
    contohtampungankategoripekerjaan: any
  ): void {
    this.submitted = true;

    const kirimanpotonganprovinsi = this.personalInfoForm.get('provinsi')?.value.split('|');
    const potongankabkota = this.personalInfoForm.get('kabkota')?.value.split('|');
    const potongankecamatan = this.personalInfoForm.get('kecamatan')?.value.split('|');
    const potongankelurahan = this.personalInfoForm.get('kelurahan')?.value.split('|');
    const kirimanpotonganprovinsid = this.personalInfoForm.get('provinsi_domisili')?.value.split('|');
    const potongankabkotaD = this.personalInfoForm.get('kabkota_domisili')?.value.split('|');
    const potongankecamatanD = this.personalInfoForm.get('kecamatan_domisili')?.value.split('|');
    const potongankelurahanD = this.personalInfoForm.get('kelurahan_domisili')?.value.split('|');

    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/update_customer', {
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
        provinsi: kirimanpotonganprovinsi[1],
        provinsi_domisili: kirimanpotonganprovinsid[1],
        kabkota: potongankabkota[1],
        kabkota_domisili: potongankabkotaD[1],
        kecamatan: potongankecamatan[1],
        kecamatan_domisili: potongankecamatanD[1],
        kelurahan: potongankelurahan[1],
        kelurahan_domisili: potongankelurahanD[1],
        kode_pos: this.personalInfoForm.get('kode_pos')?.value,
        kode_pos_domisili: this.personalInfoForm.get('kode_pos_domisili')?.value,
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
        updated_by: this.sessionStorageService.retrieve('sessionUserName'),
        tipe_kendaraan: this.personalInfoForm.get('tipe_kendaraan')?.value,
        // updated_date: '1 ',
      })

      .subscribe({
        next: () => {
          alert('Berhasil Menyimpan Data');
          // setTimeout(() => {
          this.router.navigate(['/data-entry/job-info'], {
            queryParams: {
              curef: this.curefGetDE,
              app_no_de: this.app_no_de,
            },
          });
          // }, 1000);
        },
      });
    // }
  }

  onChangeD(value: any): void {
    this.getLoading(true);
    const valueProv = value.split('|');
    this.datEntryService.getkabkota(valueProv[0]).subscribe({
      next: data => {
        this.getLoading(false);
        this.daWakotaD = data.result;
        this.personalInfoForm.get('kabkota_domisili')?.setValue(this.untukKodeKobkotaD + '|' + this.untukkobkotaD);
      },
    });
  }

  onChangekotaD(value: any): void {
    this.getLoading(true);
    const valueKota = value.split('|');
    this.datEntryService.getkecamatan(valueKota[0]).subscribe({
      next: data => {
        this.getLoading(false);
        this.kecamatanD = data.result;
        this.personalInfoForm.get('kecamatan_domisili')?.setValue(this.untukKodeKecamatanD + '|' + this.untukkecamatanD);
      },
    });
  }

  onChangekecamatanD(value: any): void {
    this.getLoading(true);
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(valueKecamatan[0]).subscribe({
      next: data => {
        this.getLoading(false);
        this.kelurahanD = data.result;
        this.personalInfoForm.get('kelurahan_domisili')?.setValue(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
      },
    });
  }

  onChangekelurahanD(value: any): void {
    const datakodepos = value.split('|');
    this.personalInfoForm.get('kode_pos_domisili')?.setValue(datakodepos[0]);
  }

  onChange(value: any): void {
    const valueProv = value.split('|');
    this.datEntryService.getkabkota(valueProv[0]).subscribe({
      next: data => {
        this.daWakota = data.result;
        this.personalInfoForm.get('kabkota')?.setValue(this.untukKodeKobkota + '|' + this.untukkobkota);
      },
    });
  }

  onChangekota(value: any): void {
    const valueKota = value.split('|');
    this.datEntryService.getkecamatan(valueKota[0]).subscribe({
      next: data => {
        this.kecamatan = data.result;
        this.personalInfoForm.get('kecamatan')?.setValue(this.untukKodeKecamatan + '|' + this.untukkecamatan);
      },
    });
  }

  onChangekecamatan(value: any): void {
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(valueKecamatan[0]).subscribe({
      next: data => {
        this.kelurahan = data.result;
        this.personalInfoForm.get('kelurahan')?.setValue(this.untukKodeKelurahan + '|' + this.untukkelurahan);
      },
    });
  }

  onChangekelurahan(value: any): void {
    const datakodepos = value.split('|');
    this.personalInfoForm.get('kode_pos')?.setValue(datakodepos[0]);
  }

  onItemChange(event: any): void {
    // alert(event.value)
    // if (event.value == 1) {
    //   this.personalInfoForm.get('alamat_domisili')?.setValue(this.personalInfoForm.get('alamat_ktp')?.value);
    //   this.personalInfoForm.get('rt_domisili')?.setValue(this.personalInfoForm.get('rt')?.value);
    //   this.personalInfoForm.get('rw_domisili')?.setValue(this.personalInfoForm.get('rw')?.value);
    //   this.personalInfoModel.provinsi_domisili = this.personalInfoModel.provinsi;
    //   this.personalInfoModel.kabkota_domisili = this.personalInfoModel.kabkota;
    //   this.personalInfoModel.kecamatan_domisili = this.personalInfoModel.kecamatan;
    //   this.personalInfoModel.kelurahan_domisili = this.personalInfoModel.kelurahan;
    //   this.personalInfoModel.kode_pos_domisili = this.personalInfoModel.kode_pos;
    // } else {
    //   this.personalInfoForm.get('alamat_domisili')?.setValue(' ');
    //   this.personalInfoForm.get('rt_domisili')?.setValue(' ');
    //   this.personalInfoForm.get('rw_domisili')?.setValue(' ');
    //   this.personalInfoModel.provinsi_domisili = '';
    //   this.personalInfoModel.kabkota_domisili = '';
    //   this.personalInfoModel.kecamatan_domisili = '';
    //   this.personalInfoModel.kelurahan_domisili = '';
    // }

    if (event.value == 1) {
      this.clickKdPostDomisili = 1;
      this.personalInfoForm.get('alamat_domisili')?.setValue(this.personalInfoForm.get('alamat_ktp')?.value);
      this.personalInfoForm.get('kode_pos_domisili')?.setValue(this.personalInfoForm.get('kode_pos')?.value);
      this.kodePosApiDomisili(this.personalInfoForm.get('kode_pos')?.value);
      this.personalInfoForm.get('rt_domisili')?.setValue(this.personalInfoForm.get('rt')?.value);
      this.personalInfoForm.get('rw_domisili')?.setValue(this.personalInfoForm.get('rw')?.value);
    } else {
      this.personalInfoForm.get('alamat_domisili')?.setValue('');
      this.personalInfoForm.get('provinsi_domisili')?.setValue('');
      this.personalInfoForm.get('kabkota_domisili')?.setValue('');
      this.personalInfoForm.get('kecamatan_domisili')?.setValue('');
      this.personalInfoForm.get('kelurahan_domisili')?.setValue('');
      this.personalInfoForm.get('kode_pos_domisili')?.setValue('');
      this.personalInfoForm.get('rt_domisili')?.setValue('');
      this.personalInfoForm.get('rw_domisili')?.setValue('');
    }
  }

  kodePosApi(kodepost: any): void {
    this.datEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        this.untukKodeProvinsi = sukses.result.provKec.kd_prov;
        this.untukKodeKobkota = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatan = sukses.result.provKec.kd_kec;
        this.untukprovinsi = sukses.result.provKec.nm_prov;
        this.untukkobkota = sukses.result.provKec.nm_kota;
        this.untukkecamatan = sukses.result.provKec.nm_kec;
        this.untukKodeKelurahan = kodepost;
        this.untukkelurahan = this.personalInfoModel.kelurahan;
        this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
        this.personalInfoForm.get('provinsi')?.setValue(this.untukKodeProvinsi + '|' + this.untukprovinsi);
        this.onChange(this.untukKodeProvinsi + '|' + this.untukprovinsi);
        this.onChangekota(this.untukKodeKobkota + '|' + this.untukkobkota);
        this.onChangekecamatan(this.untukKodeKecamatan + '|' + this.untukkecamatan);
      },
    });
  }

  // //// domisili
  kodePosApiDomisili(kodepost: any): void {
    this.datEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        if (this.clickKdPostDomisili == 1) {
          this.responseKelsDomisili = sukses.result.kels;
          this.responseKelsDomisili.forEach(element => {
            this.responseKelsDomisili.push(element);
            if (element.kdPos == kodepost) {
              const namaWIl = element.namaWilayah;
              this.responseNamaWilayahDomisili.push(namaWIl);
            }
          });
        }
        this.untukKodeProvinsiD = sukses.result.provKec.kd_prov;
        this.untukKodeKobkotaD = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatanD = sukses.result.provKec.kd_kec;
        this.untukprovinsiD = sukses.result.provKec.nm_prov;
        this.untukkobkotaD = sukses.result.provKec.nm_kota;
        this.untukkecamatanD = sukses.result.provKec.nm_kec;
        // console.warn(sukses);
        setTimeout(() => {
          if (this.clickKdPostDomisili == 1) {
            if (sukses.result.kels == null) {
              this.untukKodeKelurahanD = kodepost;
              this.untukkelurahanD = '';
              this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
            } else if (sukses.result.provKec.kd_kel == null) {
              this.untukKodeKelurahanD = kodepost;
              this.untukkelurahanD = this.responseNamaWilayahDomisili[this.responseNamaWilayahDomisili.length - 1];
              this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
            } else {
              this.untukKodeKelurahanD = kodepost;
              this.untukkelurahanD = sukses.result.provKec.nm_kel;
              this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
            }
          } else {
            this.untukKodeKelurahanD = kodepost;
            this.untukkelurahanD = this.personalInfoModel.kelurahan_domisili;
            this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
          }
        }, 10);
        this.personalInfoForm.get('provinsi_domisili')?.setValue(this.untukKodeProvinsiD + '|' + this.untukprovinsiD);
        this.onChangeD(this.untukKodeProvinsiD + '|' + this.untukprovinsiD);
        this.onChangekotaD(this.untukKodeKobkotaD + '|' + this.untukkobkotaD);
        this.onChangekecamatanD(this.untukKodeKecamatanD + '|' + this.untukkecamatanD);
      },
    });
  }

  // /domisili

  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // charCode.toLocaleString('id-ID',{style: 'currency', currency:'IDR'})
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
