/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refTipeAgunan } from '../services/config/refTipeAgunan.model';
import { refListTipeProperti } from 'app/verification/service/config/refListTipeProperti.model';
import { refObjekAgunan } from '../services/config/refObjekAgunan.model';
import { refListDeveloper } from '../services/config/refListDeveloper.model';
import { refStatusSertifikat } from '../services/config/refStatusSertifikat.model';
import { listAgunan } from '../services/config/listAgunan.model';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss'],
})
export class CollateralComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  collateralForm!: FormGroup;
  pemegangHak: refListJumlahKaryawan[] = [];
  listTipeAgunan: refTipeAgunan[] = [];
  tipeProperti: refListTipeProperti[] = [];
  objekAgunan: refObjekAgunan[] = [];
  listDeveloper: refListDeveloper[] = [];
  listSertif: refStatusSertifikat[] = [];
  listKendaraan: refListJumlahKaryawan[] = [];
  negaraProdusen: refListJumlahKaryawan[] = [];
  tableAgunan: listAgunan[] = [];
  app_no_de: any;
  curef: any;
  daWa: any;
  tampungantipeagunan: any;
  tambahatautidak: any;
  daWaprof: any;
  daWakota: any;
  daWakotas: any;
  kecamatan: any;
  kecamatans: any;
  kelurahan: any;
  kelurahans: any;
  daWakodepos: any;
  untukSessionRole: any;
  untukprovinsiagunan: any;
  untukkobkotaagunan: any;
  untukkecamatanagunan: any;
  untukkelurahanagunan: any;
  untukKodeProvinsiAgunan: any;
  untukKodeKobkotAagunan: any;
  untukKodeKecamatanAgunan: any;
  untukKodeKelurahanAgunan: any;

  untukProvinsiSertif: any;
  untukKobkotaSertif: any;
  untukKecamatanSertif: any;
  untukKelurahanSertif: any;
  untukKodeProvinsiSertif: any;
  untukKodeKobkotaSertif: any;
  untukKodeKecamatanSertif: any;
  untukKodeKelurahanSertif: any;

  responseKels: refJenisPekerjaan[] = [];
  responseNamaWilayah: refJenisPekerjaan[] = [];
  responseKelsSertif: refJenisPekerjaan[] = [];
  responseNamaWilayahSertif: refJenisPekerjaan[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected datEntryService: DataEntryService,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private sessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.load();
    // ////////////////////////// validasi /////////////////////////////////////////
    this.collateralForm = this.formBuilder.group({
      tipe_agunan: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      jenis_objek: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_kendaraan: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      merk: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      model: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      seri: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      nomor_bpkb: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_plat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      warna: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_mesin: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_rangka: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_bpkb: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      hubungan_pemegang_hak: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      hubungan_pemegang_hak_input: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],

      tipe_properti: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_agunan: [
        { value: 'baru', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_developer: [
        { value: 'pks', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      developer: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_jaminan_sebelumnya: [
        { value: '0', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      tahun_dibuat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      usia_bangunan: { value: '', disabled: true },
      status_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_pemegang_hak: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_handphone_cp: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_id_pemegang_hak_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_agunan: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      //
      provinsi_agunan: [{ value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' }],
      kabkota_agunan: [{ value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' }],
      kecamatan_agunan: [{ value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' }],
      kelurahan_agunan: [{ value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' }],
      //
      kode_pos_agunan: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      rt: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      luas_tanah: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      luas_bangunan: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      harga_objek: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_sesuai_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      provinsi_sesuai_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      ],
      kabkota_sesuai_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      ],
      kecamatan_sesuai_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      ],
      kelurahan_sesuai_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      ],
      kode_pos_sesuai_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      rt_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw_sertifikat: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      id_rumah: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      blok_rumah: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      nomor_rumah: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_terbit: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_expired: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      negara_produsen: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      berwawasan_lingkungan: [
        { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load(): void {
    // /////////////// REF ////////////////////////////////////////
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
    // /////////////// REF ////////////////////////////////////////
    this.datEntryService.getprovinsi().subscribe(res => {
      this.daWaprof = res.result;
    });

    this.datEntryService.getfetchlistagunan(this.curef).subscribe(table => {
      this.tableAgunan = table.result;
    });

    this.datEntryService.getlistNegaraProdusen().subscribe(negara => {
      this.negaraProdusen = negara.result;
    });
  }
  agunanChange(code: any): void {
    this.datEntryService.getFetchListTipeProperti(code).subscribe(data => {
      this.tipeProperti = data.result;
    });
  }

  provinsiChange(value: any): void {
    this.getLoading(true);
    const valueProvinsi = value.split('|');
    this.datEntryService.getkabkota(valueProvinsi[0]).subscribe(data => {
      this.getLoading(false);
      this.daWakota = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.collateralForm.get('kabkota_agunan')?.setValue(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);
    });
  }

  provinsiSertifChange(value: any): void {
    this.getLoading(true);
    const valueKota = value.split('|');
    this.datEntryService.getkabkota(valueKota[0]).subscribe(data => {
      this.getLoading(false);
      this.daWakotas = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.collateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif);
      // this.collateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.collateralForm.get('kabkota_agunan')?.value);
    });
  }
  kotaChange(value: any): void {
    this.getLoading(true);
    const valueKota = value.split('|');
    this.datEntryService.getkecamatan(valueKota[0]).subscribe(data => {
      this.getLoading(false);
      this.kecamatan = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.collateralForm.get('kecamatan_agunan')?.setValue(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);
    });
  }
  kotasSertifChange(value: any): void {
    this.getLoading(true);
    const proValue = value.split('|');
    this.datEntryService.getkecamatan(proValue[0]).subscribe(data => {
      this.getLoading(false);
      this.kecamatans = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.collateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.untukKodeKecamatanSertif + '|' + this.untukKecamatanSertif);
      // this.collateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.collateralForm.get('kecamatan_agunan')?.value);
    });
  }
  kecamatanChange(value: any): void {
    this.getLoading(true);
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(valueKecamatan[0]).subscribe(data => {
      this.getLoading(false);
      this.kelurahan = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.collateralForm.get('kelurahan_agunan')?.setValue(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
    });
  }
  kecamatanSertifChange(value: any): void {
    this.getLoading(true);
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(valueKecamatan[0]).subscribe(data => {
      this.getLoading(false);
      this.kelurahans = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.collateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
      // this.collateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.collateralForm.get('kelurahan_agunan')?.value);
    });
  }

  kelurahanChange(value: any): void {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.collateralForm.get('kode_pos_agunan')?.setValue(this.daWakodepos);
  }
  kelurahanSertifChange(value: any): void {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.collateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.daWakodepos);
  }

  changefom(): void {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  tambahcollateral(): void {
    Swal.fire({
      title: 'Apakah Fasilitas yang dipilih adalah PTA?',
      text: 'Pilih Ya! jika yang dipilih adalah PTA',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, PTA!',
      cancelButtonText: 'Tidak, Bukan PTA!',
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/data-entry/struktur-pembiayaan'], {
          queryParams: {
            curef: this.curef,
            app_no_de: this.app_no_de,
          },
        });
      }
      this.tambahatautidak = 'benar';
      $('#tambahdata').attr('hidden', 'hidden');
    });
  }

  goto(): void {
    this.sessionStorageService.store('collateral', 1);
    this.router.navigate(['/data-entry/struktur-pembiayaan'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }

  gotoeditcollateral(idcollateral: any): void {
    this.router.navigate(['/data-entry/editcollateral'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
        datakirimanid: idcollateral,
      },
    });
  }

  createcollateral(): void {
    const provinsi_agunan = this.collateralForm.get('provinsi_agunan')?.value;
    const kabkota_agunan = this.collateralForm.get('kabkota_agunan')?.value;
    const kecamatan_agunan = this.collateralForm.get('kecamatan_agunan')?.value;
    const kelurahan_agunan = this.collateralForm.get('kelurahan_agunan')?.value;
    const provinsi_sesuai_sertifikat = this.collateralForm.get('provinsi_sesuai_sertifikat')?.value;
    const kabkota_sesuai_sertifikat = this.collateralForm.get('kabkota_sesuai_sertifikat')?.value;
    const kecamatan_sesuai_sertifikat = this.collateralForm.get('kecamatan_sesuai_sertifikat')?.value;
    const kelurahan_sesuai_sertifikat = this.collateralForm.get('kelurahan_sesuai_sertifikat')?.value;
    // alert(kabkota_sesuai_sertifikat)
    const kirimankabkota_agunan = kabkota_agunan.split('|');
    const kirimankabkota_sesuai_sertifikat = kabkota_sesuai_sertifikat.split('|');
    const kirimankecamatan_agunan = kecamatan_agunan.split('|');
    const kirimankecamatan_sesuai_sertifikat = kecamatan_sesuai_sertifikat.split('|');
    const kirimankelurahan_agunan = kelurahan_agunan.split('|');
    const kirimankelurahan_sesuai_sertifikat = kelurahan_sesuai_sertifikat.split('|');
    const kirimanprovinsi_agunan = provinsi_agunan.split('|');
    const kirimanprovinsi_sesuai_sertifikat = provinsi_sesuai_sertifikat.split('|');
    // alert(kabkota_sesuai_sertifikat.value);

    let tipeAgunan: any;
    let kirimhubunganpemeganghak: any;
    if (this.collateralForm.get('tipe_agunan')?.value === 'C01') {
      tipeAgunan = 'Kendaraan';
    } else if (this.collateralForm.get('tipe_agunan')?.value === 'E01') {
      tipeAgunan = 'Emas';
    } else if (this.collateralForm.get('tipe_agunan')?.value === 'H01') {
      tipeAgunan = 'Tanah';
    } else if (this.collateralForm.get('tipe_agunan')?.value === 'H02') {
      tipeAgunan = 'Bangunan';
    } else {
      tipeAgunan = 'Tanah dan Bangunan';
    }

    if (this.collateralForm.get('hubungan_pemegang_hak')?.value === 'Lainya') {
      kirimhubunganpemeganghak = this.collateralForm.get('hubungan_pemegang_hak_input')?.value;
    } else {
      kirimhubunganpemeganghak = this.collateralForm.get('hubungan_pemegang_hak')?.value;
    }

    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_collateral', {
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
        hubungan_pemegang_hak: kirimhubunganpemeganghak,
        tipe_properti: this.collateralForm.get('tipe_properti')?.value,
        status_agunan: this.collateralForm.get('status_agunan')?.value,
        status_developer: this.collateralForm.get('status_developer')?.value,
        developer: this.collateralForm.get('developer')?.value,
        status_jaminan_sebelumnya: this.collateralForm.get('status_jaminan_sebelumnya')?.value,
        tahun_dibuat: this.collateralForm.get('tahun_dibuat')?.value,
        usia_bangunan: this.collateralForm.get('usia_bangunan')?.value,
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
        negara_produsen: this.collateralForm.get('negara_produsen')?.value,
        berwawasan_lingkungan: this.collateralForm.get('berwawasan_lingkungan')?.value,

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
        next(bawaan) {
          //console.warn(bawaan);
          alert('Berhasil Menyimpan Data');
          window.location.reload();
        },
      });
  }

  carimenggunakankodeposagunan(kodepost: any): void {
    this.datEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        this.responseKels = sukses.result.kels;
        this.responseKels.forEach(element => {
          this.responseKels.push(element);
          // eslint-disable-next-line eqeqeq
          if (element.kdPos == kodepost) {
            const namaWIl = element.namaWilayah;
            this.responseNamaWilayah.push(namaWIl);
          }
        });
        this.untukKodeProvinsiAgunan = sukses.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = sukses.result.provKec.kd_kec;
        this.untukprovinsiagunan = sukses.result.provKec.nm_prov;
        this.untukkobkotaagunan = sukses.result.provKec.nm_kota;
        this.untukkecamatanagunan = sukses.result.provKec.nm_kec;
        // console.warn(sukses);
        setTimeout(() => {
          if (sukses.result.kels == null) {
            this.untukKodeKelurahanAgunan = kodepost;
            this.untukkelurahanagunan = '';
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.kelurahanChange(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
          } else if (sukses.result.provKec.kd_kel == null) {
            this.untukKodeKelurahanAgunan = kodepost;
            this.untukkelurahanagunan = this.responseNamaWilayah[this.responseNamaWilayah.length - 1];
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.kelurahanChange(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
            // alert(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan)
          } else {
            this.untukKodeKelurahanAgunan = kodepost;
            this.untukkelurahanagunan = sukses.result.provKec.nm_kel;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.kelurahanChange(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
            // alert(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan)
          }
        }, 10);
        this.collateralForm.get('provinsi_agunan')?.setValue(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
        this.provinsiChange(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
        this.kotaChange(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);
        this.kecamatanChange(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);
      },
    });
  }

  // /sertifikat

  carimenggunakankodepossertifikat(kodepost: any): void {
    this.datEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        this.responseKelsSertif = sukses.result.kels;
        this.responseKelsSertif.forEach(element => {
          this.responseKelsSertif.push(element);
          // eslint-disable-next-line eqeqeq
          if (element.kdPos == kodepost) {
            const namaWIl = element.namaWilayah;
            this.responseNamaWilayahSertif.push(namaWIl);
          }
        });
        this.untukProvinsiSertif = sukses.result.provKec.nm_prov;
        this.untukKobkotaSertif = sukses.result.provKec.nm_kota;
        this.untukKecamatanSertif = sukses.result.provKec.nm_kec;
        this.untukKodeProvinsiSertif = sukses.result.provKec.kd_prov;
        this.untukKodeKobkotaSertif = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatanSertif = sukses.result.provKec.kd_kec;
        if (sukses.result.kels == null) {
          this.untukKodeKelurahanSertif = kodepost;
          this.untukKelurahanSertif = '';
          this.kelurahanSertifChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
        } else if (sukses.result.provKec.kd_kel == null) {
          this.untukKodeKelurahanSertif = kodepost;
          this.untukKelurahanSertif = this.responseNamaWilayahSertif[this.responseNamaWilayahSertif.length - 1];
          this.kelurahanSertifChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
        } else {
          this.untukKodeKelurahanSertif = kodepost;
          this.untukKelurahanSertif = sukses.result.provKec.nm_kel;
          this.kelurahanSertifChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
        }
        this.collateralForm.get('provinsi_sesuai_sertifikat')?.setValue(this.untukKodeProvinsiSertif + '|' + this.untukProvinsiSertif);
        this.provinsiSertifChange(this.untukKodeProvinsiSertif + '|' + this.untukProvinsiSertif);
        this.kotasSertifChange(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif);
        this.kecamatanSertifChange(this.untukKodeKecamatanSertif + '|' + this.untukKecamatanSertif);
      },
    });
  }

  // /serifikat

  onItemChange(event: any): void {
    // eslint-disable-next-line eqeqeq
    if (event.value == 1) {
      this.collateralForm.get('alamat_sesuai_sertifikat')?.setValue(this.collateralForm.get('alamat_agunan')?.value);
      this.collateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.collateralForm.get('kode_pos_agunan')?.value);
      this.carimenggunakankodepossertifikat(this.collateralForm.get('kode_pos_agunan')?.value);
      this.collateralForm.get('rt_sertifikat')?.setValue(this.collateralForm.get('rt')?.value);
      this.collateralForm.get('rw_sertifikat')?.setValue(this.collateralForm.get('rw')?.value);
    } else {
      this.collateralForm.get('alamat_sesuai_sertifikat')?.setValue('');
      this.collateralForm.get('provinsi_sesuai_sertifikat')?.setValue(this.collateralForm.get('')?.value);
      this.collateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.collateralForm.get('')?.value);
      this.collateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.collateralForm.get('')?.value);
      this.collateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.collateralForm.get('')?.value);
      this.collateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.collateralForm.get('')?.value);
      this.collateralForm.get('rt_sertifikat')?.setValue('');
      this.collateralForm.get('rw_sertifikat')?.setValue('');
    }
  }

  hapusJobList(idjob: any): void {
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
          .post<any>(this.baseUrl + 'v1/efos-de/delete_collateral', {
            id: idjob,
          })
          .subscribe({});
        Swal.fire('Terhapus!', 'File Sudah Tidak Ada', 'success').then(() => {
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

  hitungUsiaBangunan(tahun: any): void {
    const d = new Date();
    const year = d.getFullYear();
    const total = Number(year) - Number(tahun);
    this.collateralForm.get('usia_bangunan')?.setValue(total);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
