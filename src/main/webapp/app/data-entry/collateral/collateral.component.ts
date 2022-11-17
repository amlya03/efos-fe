import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { colateralmodel } from './collateral-model';
import { LocalStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refTipeAgunan } from '../services/config/refTipeAgunan.model';
import { refListTipeProperti } from 'app/verification/service/config/refListTipeProperti.model';
import { refObjekAgunan } from '../services/config/refObjekAgunan.model';
import { refListDeveloper } from '../services/config/refListDeveloper.model';
import { refStatusSertifikat } from '../services/config/refStatusSertifikat.model';
import { listAgunan } from '../services/config/listAgunan.model';
import Swal from 'sweetalert2';

export type EntityResponseDaWa = HttpResponse<colateralmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss'],
})
export class CollateralComponent implements OnInit {
  collateralForm!: FormGroup;
  pemegangHak: refListJumlahKaryawan[] = [];
  listTipeAgunan: refTipeAgunan[] = [];
  tipeProperti: refListTipeProperti[] = [];
  objekAgunan: refObjekAgunan[] = [];
  listDeveloper: refListDeveloper[] = [];
  listSertif: refStatusSertifikat[] = [];
  listKendaraan: refListJumlahKaryawan[] = [];
  tableAgunan: listAgunan[] = [];

  app_no_de: any;
  curef: any;
  statusPerkawinan: any;
  daWa: any;
  datatipeagunan: any;
  tampungantipeagunan: any;
  tambahatautidak: any;
  statussertifikat: any;
  listagunan: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  daWakotas: any;
  kecamatan: any;
  kecamatans: any;
  kelurahan: any;
  kelurahans: any;
  daWakodepos: any;
  untukstatusdev: any;
  pemisahuntukdevloper: any;
  untukstatusagunan: any;
  untukstatusdevini: any;
  untukjaminansebelum: any;
  untukstatussertifikat: any;
  kirimandatadevloper: any;
  untukSessionRole: any;
  getjenisobjek: any;
  getlistkendaraan: any;
  listhubunganagunan: any;
  kirimannama_perumahan:any
  kirimanalamatagunan:any;
  kirimanalamat_sesuai_sertifikat:any
  kirimanblok_rumah:any;
  kirimanharga_objek:any;
  kirimanhubungan_pemegang_hak:any;
  kirimanjenisobjek:any;
  kirimankabkota_agunan:any;
  kirimankabkota_sesuai_sertifikat:any;
  kirimankecamatan_agunan:any;
  kirimankecamatan_sesuai_sertifikat:any;
  kirimankelurahan_agunan:any;
  kirimankelurahan_sesuai_sertifikat:any;
  kirimankode_pos_agunan:any;
  kirimankode_pos_sesuai_sertifikat:any;
  kirimanluas_bangunan:any;
  kirimanluas_tanah:any;
  kirimanmerek:any;
  kirimanmodel:any;
  kirimannamabpkb:any;
  kirimannama_pemegang_hak:any;
  kirimanno_handphone_cp:any;
  kirimanno_id_pemegang_hak_sertifikat:any;
  kirimannomesin:any;
  kirimannoplat:any;
  kirimannorangka:any;
  kirimanno_sertifikat:any;
  kirimannobpkb:any;
  kirimannomor_rumah:any;
  kirimanprovinsi_agunan:any;
  kirimanprovinsi_sesuai_sertifikat:any;
  kirimanrt:any;
  kirimanrt_sertifikat:any;
  kirimanrw:any;
  kirimanrw_sertifikat:any;
  kirimanseri:any;
  kirimanstatus_agunan:any;
  kirimanstatus_developer:any;
  kirimanstatus_jaminan_sebelumnya:any;
  kirimanstatus_sertifikat:any;
  kirimantahun_dibuat:any;
  kirimantanggal_expired:any;
  kirimantanggal_terbit:any;
  kirimantipe_agunan:any;
  kirimantipekendaraan:any;
  kirimantipe_properti:any;
  kirimanwarna:any;
  untukprovinsiagunan: any;
  untukkobkotaagunan: any;
  untukkecamatanagunan: any;
  untukkelurahanagunan: any;
  untukKodeProvinsiAgunan: any;
  untukKodeKobkotAagunan: any;
  untukKodeKecamatanAgunan: any;
  untukKodeKelurahanAgunan: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected datEntryService: DataEntryService,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params['statusPerkawinan'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.load();
    //////////////////////////// validasi /////////////////////////////////////////
    this.collateralForm = this.formBuilder.group({
      tipe_agunan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jenis_objek: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_kendaraan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      merk: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      model: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      seri: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nomor_bpkb: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_plat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      warna: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_mesin: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_rangka: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_bpkb: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      hubungan_pemegang_hak: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_properti: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_agunan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_developer: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      developer: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_jaminan_sebelumnya: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tahun_dibuat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_pemegang_hak: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_handphone_cp: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_id_pemegang_hak_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_agunan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_pos_agunan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rt: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      luas_tanah: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      luas_bangunan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      harga_objek: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_sesuai_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_pos_sesuai_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rt_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw_sertifikat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      id_rumah: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      blok_rumah: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nomor_rumah: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_terbit: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_expired: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load() {
    ///////////////// REF ////////////////////////////////////////
    this.datEntryService.getFetchListPemegangHak().subscribe(data => {
      this.pemegangHak = data.result;
    });
    this.datEntryService.getFetchListTipeAgunan().subscribe(agunan => {
      this.listTipeAgunan = agunan.result;
    });
    this.datEntryService.getFetchListObjekAgunan().subscribe(objek => {
      this.objekAgunan = objek.result;
    });
    this.datEntryService.getFetchListDeveloper().subscribe(dev => {
      this.listDeveloper = dev.result;
    });
    this.datEntryService.getFetchListSertifikat().subscribe(sertif => {
      this.listSertif = sertif.result;
    });
    this.datEntryService.getFetchListKendaraan().subscribe(kendaraan => {
      this.listKendaraan = kendaraan.result;
    });
    ///////////////// REF ////////////////////////////////////////
    this.gettokendukcapil();

    this.datEntryService.getfetchlistagunan(this.curef).subscribe(table => {
      this.tableAgunan = table.result;
    });
  }
  agunanChange(code: any) {
    this.datEntryService.getFetchListTipeProperti(code).subscribe(data => {
      this.tipeProperti = data.result;
    });
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
          this.datEntryService.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
            },
          });
        },
      });
  }
  onChange(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_agunan') as HTMLInputElement | any;

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

  onChanges(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_sesuai_sertifikat') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotas = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }
  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
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
  onChangekotas(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_sesuai_sertifikat') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatans = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }
  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
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
  onChangekecamatans(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_sesuai_sertifikat') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahans = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }
  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    // kode_post.value = this.daWakodepos;
    this.collateralForm.get('kode_pos_agunan')?.setValue(this.daWakodepos);
  }
  onChangekelurahans(selectedStatus: any) {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_sesuai_sertifikat') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_sesuai_sertifikat') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];
    this.collateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.daWakodepos);
  }

  changefom() {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  tambahcollateral() {
    this.tambahatautidak = 'benar';
    $('#tambahdata').attr('hidden', 'hidden');
  }

  goto() {
    this.router.navigate(['/data-entry/struktur-pembiayaan'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
      },
    });
  }

  gotoeditcollateral(idcollateral: any) {
    this.router.navigate(['/data-entry/editcollateral'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
        datakirimanid: idcollateral,
      },
    });
  }

  createcollateral() {
    const provinsi_agunan = document.getElementById('provinsi_agunan') as HTMLInputElement | any;
    const kabkota_agunan = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
    const kecamatan_agunan = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
    const kelurahan_agunan = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    const provinsi_sesuai_sertifikat = document.getElementById('provinsi_sesuai_sertifikat') as HTMLInputElement | any;
    const kabkota_sesuai_sertifikat = document.getElementById('kabkota_sesuai_sertifikat') as HTMLInputElement | any;
    const kecamatan_sesuai_sertifikat = document.getElementById('kecamatan_sesuai_sertifikat') as HTMLInputElement | any;
    const kelurahan_sesuai_sertifikat = document.getElementById('kelurahan_sesuai_sertifikat') as HTMLInputElement | any;
    // alert(kabkota_sesuai_sertifikat)
    let kirimankabkota_agunan = kabkota_agunan.value.split('|');
    let kirimankabkota_sesuai_sertifikat = kabkota_sesuai_sertifikat.value.split('|');
    let kirimankecamatan_agunan = kecamatan_agunan.value.split('|');
    let kirimankecamatan_sesuai_sertifikat = kecamatan_sesuai_sertifikat.value.split('|');
    let kirimankelurahan_agunan = kelurahan_agunan.value.split('|');
    let kirimankelurahan_sesuai_sertifikat = kelurahan_sesuai_sertifikat.value.split('|');
    let kirimanprovinsi_agunan = provinsi_agunan.value.split('|');
    let kirimanprovinsi_sesuai_sertifikat = provinsi_sesuai_sertifikat.value.split('|');
    alert(kabkota_sesuai_sertifikat.value);
  
    if (this.collateralForm.get('tipe_agunan')?.value == 'C01') {
      var tipeAgunan = 'Kendaraan';
    } else if (this.collateralForm.get('tipe_agunan')?.value == 'E01') {
      var tipeAgunan = 'Emas';
    } else if (this.collateralForm.get('tipe_agunan')?.value == 'H01') {
      var tipeAgunan = 'Tanah';
    } else if (this.collateralForm.get('tipe_agunan')?.value == 'H02') {
      var tipeAgunan = 'Bangunan';
    } else {
      var tipeAgunan = 'Tanah dan Bangunan';
    }

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_collateral', {
        tipe_agunan: tipeAgunan,
        jenis_objek: this.collateralForm.get('jenis_objek')?.value,
        tipe_kendaraan: this.collateralForm.get('tipe_kendaraan')?.value,
        merk: this.collateralForm.get('merk')?.value,
        model: this.collateralForm.get('model')?.value,
        seri: this.collateralForm.get('seri')?.value,
        nomor_bpkb: this.collateralForm.get('nomor_bpkb')?.value,
        no_plat: this.collateralForm.get('no_plat')?.value,
        warna: this.collateralForm.get('warna')?.value,
        no_mesin: this.collateralForm.get('no_mesin')?.value,
        no_rangka: this.collateralForm.get('no_rangka')?.value,
        nama_bpkb: this.collateralForm.get('nama_bpkb')?.value,
        hubungan_pemegang_hak: this.collateralForm.get('hubungan_pemegang_hak')?.value,
        tipe_properti: this.collateralForm.get('tipe_properti')?.value,
        status_agunan: this.collateralForm.get('status_agunan')?.value,
        status_developer: this.collateralForm.get('status_developer')?.value,
        developer: this.collateralForm.get('developer')?.value,
        status_jaminan_sebelumnya: this.collateralForm.get('status_jaminan_sebelumnya')?.value,
        tahun_dibuat: this.collateralForm.get('tahun_dibuat')?.value,
        status_sertifikat: this.collateralForm.get('status_sertifikat')?.value,
        no_sertifikat: this.collateralForm.get('no_sertifikat')?.value,
        nama_pemegang_hak: this.collateralForm.get('nama_pemegang_hak')?.value,
        no_handphone_cp: this.collateralForm.get('no_handphone_cp')?.value,
        no_id_pemegang_hak_sertifikat: this.collateralForm.get('no_id_pemegang_hak_sertifikat')?.value,
        alamat_agunan: this.collateralForm.get('alamat_agunan')?.value,
        kode_pos_agunan: this.collateralForm.get('kode_pos_agunan')?.value,
        rt: this.collateralForm.get('rt')?.value,
        rw: this.collateralForm.get('rw')?.value,
        alamat_sesuai_sertifikat: this.collateralForm.get('alamat_sesuai_sertifikat')?.value,
        kode_pos_sesuai_sertifikat: this.collateralForm.get('kode_pos_sesuai_sertifikat')?.value,
        rt_sertifikat: this.collateralForm.get('rt_sertifikat')?.value,
        rw_sertifikat: this.collateralForm.get('rw_sertifikat')?.value,
        id_rumah: this.collateralForm.get('id_rumah')?.value,
        blok_rumah: this.collateralForm.get('blok_rumah')?.value,
        nomor_rumah: this.collateralForm.get('nomor_rumah')?.value,
        app_no_de: this.app_no_de,
        curef: this.curef,
        harga_objek: this.collateralForm.get('harga_objek')?.value,
        harga_objek_sertifikat: this.collateralForm.get('harga_objek')?.value,
        luas_bangunan: this.collateralForm.get('luas_bangunan')?.value,
        luas_bangunan_sertifikat: this.collateralForm.get('luas_bangunan')?.value,
        luas_tanah: this.collateralForm.get('luas_tanah')?.value,
        luas_tanah_sertifikat: this.collateralForm.get('luas_tanah')?.value,
        tanggal_terbit: this.collateralForm.get('tanggal_terbit')?.value,
        tanggal_expired: this.collateralForm.get('tanggal_expired')?.value,

        /// provinsiiiaanann
        provinsi_agunan: kirimanprovinsi_agunan[1],
        provinsi_sesuai_sertifikat: kirimanprovinsi_sesuai_sertifikat[1],
        kabkota_agunan: kirimankabkota_agunan[1],
        kabkota_sesuai_sertifikat: kirimankabkota_sesuai_sertifikat[1],
        kecamatan_agunan: kirimankecamatan_agunan[1],
        kecamatan_sesuai_sertifikat: kirimankecamatan_sesuai_sertifikat[1],
        kelurahan_agunan: kirimankelurahan_agunan[1],
        kelurahan_sesuai_sertifikat: kirimankelurahan_sesuai_sertifikat[1],
        status_active: '',
        id_collateral: '',
        id_collateral_detail: 0,
        nama_perumahan: '',
      })
      .subscribe({
        next: bawaan => {
          alert('Berhasil Menyimpan Data');
          window.location.reload();
        },
      });
  }

  carimenggunakankodeposagunan(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);kd_kec
        this.untukKodeProvinsiAgunan = res.body?.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = res.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = res.body?.result.provKec.kd_kec;
        this.untukKodeKelurahanAgunan = res.body?.result.provKec.kd_kel;
        this.untukprovinsiagunan = res.body?.result.provKec.nm_prov;
        this.untukkobkotaagunan = res.body?.result.provKec.nm_kota;
        this.untukkecamatanagunan = res.body?.result.provKec.nm_kec;
        this.untukkelurahanagunan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_agunan option:first').text(this.untukprovinsiagunan);
        $('#provinsi_agunan option:first').val(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_agunan option:first').text(this.untukkobkotaagunan);
        $('#kabkota_agunan option:first').val(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_agunan option:first').text(this.untukkecamatanagunan);
        $('#kecamatan_agunan option:first').val(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_agunan option:first').text(this.untukkelurahanagunan);
        $('#kelurahan_agunan option:first').val(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  ///sertifikat

  carimenggunakankodepossertifikat(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.untukKodeProvinsiAgunan = res.body?.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = res.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = res.body?.result.provKec.kd_kec;
        this.untukKodeKelurahanAgunan = res.body?.result.provKec.kd_kel;
        this.untukprovinsiagunan = res.body?.result.provKec.nm_prov;
        this.untukkobkotaagunan = res.body?.result.provKec.nm_kota;
        this.untukkecamatanagunan = res.body?.result.provKec.nm_kec;
        this.untukkelurahanagunan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_sesuai_sertifikat option:first').text(this.untukprovinsiagunan);
        $('#provinsi_sesuai_sertifikat option:first').val(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_sesuai_sertifikat option:first').text(this.untukkobkotaagunan);
        $('#kabkota_sesuai_sertifikat option:first').val(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_sesuai_sertifikat option:first').text(this.untukkecamatanagunan);
        $('#kecamatan_sesuai_sertifikat option:first').val(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_sesuai_sertifikat option:first').text(this.untukkelurahanagunan);
        $('#kelurahan_sesuai_sertifikat option:first').val(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  ///serifikat

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

  onItemChange(event: any) {
    const provinsi_agunan = document.getElementById('provinsi_agunan') as HTMLInputElement | any;
    const kabkota_agunan = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
    const kecamatan_agunan = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
    const kelurahan_agunan = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    let kirimankabkota_agunan = kabkota_agunan.value.split('|');
    let kirimankecamatan_agunan = kecamatan_agunan.value.split('|');
    let kirimankelurahan_agunan = kelurahan_agunan.value.split('|');
    let kirimanprovinsi_agunan = provinsi_agunan.value.split('|');
    if (event.value == 1) {
      this.collateralForm.get('alamat_sesuai_sertifikat')?.setValue(this.collateralForm.get('alamat_agunan')?.value);
      this.collateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.collateralForm.get('kode_pos_agunan')?.value);
      this.collateralForm.get('rt_sertifikat')?.setValue(this.collateralForm.get('rt')?.value);
      this.collateralForm.get('rw_sertifikat')?.setValue(this.collateralForm.get('rw')?.value);

      $('#provinsi_sesuai_sertifikat option:first').text(kirimanprovinsi_agunan[1]);
      $('#kabkota_sesuai_sertifikat option:first').text(kirimankabkota_agunan[1]);
      $('#kecamatan_sesuai_sertifikat option:first').text(kirimankecamatan_agunan[1]);
      $('#kelurahan_sesuai_sertifikat option:first').text(kirimankelurahan_agunan[1]);
      $('#provinsi_sesuai_sertifikat').val(kirimanprovinsi_agunan[1]);
      $('#kabkota_sesuai_sertifikat').val(kirimankabkota_agunan[1]);
      $('#kecamatan_sesuai_sertifikat').val(kirimankecamatan_agunan[1]);
      $('#kelurahan_sesuai_sertifikat').val(kirimankelurahan_agunan[1]);
    } else {
      this.collateralForm.get('alamat_sesuai_sertifikat')?.setValue(' ');
      this.collateralForm.get('rt_sertifikat')?.setValue(' ');
      this.collateralForm.get('rw_sertifikat')?.setValue(' ');
    }
  }

  hapusJobList(id: any): void {
    Swal.fire({
      title: 'Apakah Yakin Ingin Menghapus Data Job Ini?',
      text: 'File akan hilang',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus Data Job!',
      cancelButtonText: 'Tidak, Simpan Data',
    }).then(result => {
      if (result.value) {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-de/delete_collateral', {
            id: id,
          })
          .subscribe({});
        Swal.fire('Terhapus!', 'File Sudah Tidak Ada', 'success').then((message: any) => {
          window.location.reload();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'File disimpan', 'error');
      }
    });
  }

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
}
