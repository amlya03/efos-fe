/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { refListTipeProperti } from 'app/verification/service/config/refListTipeProperti.model';
import { listAgunan } from '../services/config/listAgunan.model';
import { refListDeveloper } from '../services/config/refListDeveloper.model';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refObjekAgunan } from '../services/config/refObjekAgunan.model';
import { refStatusSertifikat } from '../services/config/refStatusSertifikat.model';
import { refTipeAgunan } from '../services/config/refTipeAgunan.model';
import { environment } from 'environments/environment';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';
// import { colateralmodel } from './collateral-model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral-edit',
  templateUrl: './collateral-edit.component.html',
  styleUrls: ['./collateral-edit.component.scss'],
})
export class CollateralEditComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  editCollateralForm!: FormGroup;
  pemegangHak: refListJumlahKaryawan[] = [];
  listTipeAgunan: refTipeAgunan[] = [];
  tipeProperti: refListTipeProperti[] = [];
  objekAgunan: refObjekAgunan[] = [];
  listDeveloper: refListDeveloper[] = [];
  listSertif: refStatusSertifikat[] = [];
  listKendaraan: refListJumlahKaryawan[] = [];
  tableAgunan: listAgunan = new listAgunan();
  negaraProdusen: refListJumlahKaryawan[] = [];
  app_no_de: any;
  curef: any;
  datakirimanid: any;

  daWa: any;
  datatipeagunan: any;
  tampungantipeagunan: any;
  tambahatautidak: any;
  statussertifikat: any;
  listagunan: any;
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
  untukprovinsiagunan: any;
  untukkobkotaagunan: any;
  untukkecamatanagunan: any;
  untukkelurahanagunan: any;
  untukKodeProvinsiAgunan: any;
  untukKodeKobkotAagunan: any;
  untukKodeKecamatanAgunan: any;
  untukKodeKelurahanAgunan: any;

  kirimanid_rumah: any;
  kirimannama_perumahan: any;
  kirimanalamatagunan: any;
  kirimanalamat_sesuai_sertifikat: any;
  kirimanblok_rumah: any;
  kirimanharga_objek: any;
  kirimanhubungan_pemegang_hak: any;
  kirimanjenisobjek: any;
  kirimankabkota_agunan: any;
  kirimankabkota_sesuai_sertifikat: any;
  kirimankecamatan_agunan: any;
  kirimankecamatan_sesuai_sertifikat: any;
  kirimankelurahan_agunan: any;
  kirimankelurahan_sesuai_sertifikat: any;
  kirimankode_pos_agunan: any;
  kirimankode_pos_sesuai_sertifikat: any;
  kirimanluas_bangunan: any;
  kirimanluas_tanah: any;
  kirimanmerek: any;
  kirimanmodel: any;
  kirimannamabpkb: any;
  kirimannama_pemegang_hak: any;
  kirimanno_handphone_cp: any;
  kirimanno_id_pemegang_hak_sertifikat: any;
  kirimannomesin: any;
  kirimannoplat: any;
  kirimannorangka: any;
  kirimanno_sertifikat: any;
  kirimannobpkb: any;
  kirimannomor_rumah: any;
  kirimanprovinsi_agunan: any;
  kirimanprovinsi_sesuai_sertifikat: any;
  kirimanrt: any;
  kirimanrt_sertifikat: any;
  kirimanrw: any;
  kirimanrw_sertifikat: any;
  kirimanseri: any;
  kirimanstatus_agunan: any;
  kirimanstatus_developer: any;
  kirimanstatus_jaminan_sebelumnya: any;
  kirimanstatus_sertifikat: any;
  kirimantahun_dibuat: any;
  kirimantanggal_expired: any;
  kirimantanggal_terbit: any;
  kirimantipe_agunan: any;
  kirimantipekendaraan: any;
  kirimantipe_properti: any;
  sertifInput: any;
  sertifTrue: any;

  untukProvinsiSertif: any;
  untukKobkotaSertif: any;
  untukKecamatanSertif: any;
  untukKelurahanSertif: any;
  untukKodeProvinsiSertif: any;
  untukKodeKobkotaSertif: any;
  untukKodeKecamatanSertif: any;
  untukKodeKelurahanSertif: any;
  kirimanhubungan1: any;
  kirimanhubungan1lainya: any;

  // /////////////////////////////////////
  clickKdPost = 0;
  clickKdPostSertif = 0;
  responseKels: refJenisPekerjaan[] = [];
  responseKelsSertif: refJenisPekerjaan[] = [];
  responseNamaWilayah: refJenisPekerjaan[] = [];
  responseNamaWilayahSertif: refJenisPekerjaan[] = [];
  // /////////////////////////////////////

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
    this.route.queryParams.subscribe(params => {
      this.datakirimanid = params.datakirimanid;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.load();
    // ////////////////////////// validasi /////////////////////////////////////////
    this.editCollateralForm = this.formBuilder.group({
      tipe_agunan: { value: '', disabled: true },
      jenis_objek: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tipe_kendaraan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      merk: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      model: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      seri: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nomor_bpkb: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_plat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      warna: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_mesin: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_rangka: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nama_bpkb: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      hubungan_pemegang_hak: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tipe_properti: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_developer: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      developer: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_jaminan_sebelumnya: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      tahun_dibuat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      usia_bangunan: { value: '', disabled: true },
      status_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nama_pemegang_hak: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_handphone_cp: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_id_pemegang_hak_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      alamat_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      negara_produsen: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      berwawasan_lingkungan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      //
      provinsi_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kabkota_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kecamatan_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kelurahan_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      //
      kode_pos_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rt: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rw: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      luas_tanah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      luas_bangunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      harga_objek: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      alamat_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      //
      provinsi_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kabkota_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kecamatan_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kelurahan_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      //
      kode_pos_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      rt_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rw_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      id_rumah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      blok_rumah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nomor_rumah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_terbit: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_expired: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      hubungan_pemegang_hak_lainya: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      nilai_agunan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      nilai_indikasi: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      no_spk: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      no_faktur: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      nilai_pasar: {
        value: '0',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      nilai_likuidasi: {
        value: '0',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      harga_transaksi: { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_imb: { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_imb: { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_sertifikat_input: { value: '', disabled: this.untukSessionRole === 'VER_PRESCR' || this.untukSessionRole === 'BRANCHMANAGER' },
    });
  }

  load(): void {
    // /////////////// REF ////////////////////////////////////////
    setTimeout(() => {
      this.datEntryService.getFetchListPemegangHak().subscribe(data => {
        this.pemegangHak = data.result;
        // if(data.result.deskripsi !='Diri Sendiri'||data.result.deskripsi !='Orang Tua'||data.result.deskripsi !='Anak' || data.result.deskripsi !='Lainya'){
        //   this.pemegangHak = 'Lainya';
        // }else{
        //   this.pemegangHak = data.result;
        // }
      });
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchListTipeAgunan().subscribe(agunan => {
        this.listTipeAgunan = agunan.result;
      });
    }, 20);
    setTimeout(() => {
      this.datEntryService.getFetchListObjekAgunan().subscribe(objek => {
        this.objekAgunan = objek.result;
      });
    }, 30);
    setTimeout(() => {
      this.datEntryService.getFetchListDeveloper().subscribe(dev => {
        this.listDeveloper = dev.result;
      });
    }, 40);
    setTimeout(() => {
      this.datEntryService.getFetchListSertifikat().subscribe(sertif => {
        this.listSertif = sertif.result;
      });
    }, 50);
    setTimeout(() => {
      this.datEntryService.getFetchListKendaraan().subscribe(kendaraan => {
        this.listKendaraan = kendaraan.result;
      });
      this.datEntryService.getlistNegaraProdusen().subscribe(negara => {
        this.negaraProdusen = negara.result;
      });
    }, 60);
    // /////////////// REF ////////////////////////////////////////
    setTimeout(() => {
      this.datEntryService.getprovinsi().subscribe(res => {
        this.daWaprof = res.result;
      });
    }, 70);

    let tipeAgunan: any;
    setTimeout(() => {
      this.datEntryService.getCollateralByCurefById(this.datakirimanid).subscribe(table => {
        this.tableAgunan = table.result;
        // alert(this.tableAgunan.provinsi_agunan)
        if (this.tableAgunan.tipe_agunan === 'Kendaraan') {
          tipeAgunan = 'C01';
        } else if (this.tableAgunan.tipe_agunan === 'Emas') {
          tipeAgunan = 'E01';
        } else if (this.tableAgunan.tipe_agunan === 'Tanah') {
          tipeAgunan = 'H01';
        } else if (this.tableAgunan.tipe_agunan === 'Bangunan') {
          tipeAgunan = 'H02';
        } else {
          tipeAgunan = 'H03';
        }

        if (
          this.pemegangHak.find((value: refListJumlahKaryawan) => value.deskripsi == this.tableAgunan.hubungan_pemegang_hak)
          // table.result.hubungan_pemegang_hak === 'Diri Sendiri' ||
          // table.result.hubungan_pemegang_hak === 'Orang Tua' ||
          // table.result.hubungan_pemegang_hak === 'Anak' ||
          // table.result.hubungan_pemegang_hak === 'Lainya'
        ) {
          // alert("ini if");
          // alert(table.result.hubungan_pemegang_hak =='Anak');
          this.kirimanhubungan1 = table.result.hubungan_pemegang_hak;
          this.kirimanhubungan1lainya = '';
        } else {
          // alert("ini else");
          this.kirimanhubungan1 = 'Lainya';
          this.kirimanhubungan1lainya = table.result.hubungan_pemegang_hak;
        }
        // console.warn(this.pemegangHak.find((value: refListJumlahKaryawan) => value.deskripsi == this.tableAgunan.hubungan_pemegang_hak))

        if (this.listSertif.find((value: refStatusSertifikat) => value.sertifikat_deskripsi == this.tableAgunan.status_sertifikat)) {
          this.sertifTrue = this.tableAgunan.status_sertifikat;
          this.sertifInput = '';
        } else {
          this.sertifTrue = 'Lainnya';
          this.sertifInput = this.tableAgunan.status_sertifikat;
        }

        const ValidasiTipeAgunan = <FormControl>this.editCollateralForm.get('tipe_agunan');
        const ValidasiJenisObjek = <FormControl>this.editCollateralForm.get('jenis_objek');
        const ValidasiTipeKendaraan = <FormControl>this.editCollateralForm.get('tipe_kendaraan');
        const ValidasiMerk = <FormControl>this.editCollateralForm.get('merk');
        const ValidasiModel = <FormControl>this.editCollateralForm.get('model');
        const ValidasiSeri = <FormControl>this.editCollateralForm.get('seri');
        const ValidasiNomorBpkb = <FormControl>this.editCollateralForm.get('nomor_bpkb');
        const ValidasiNoplat = <FormControl>this.editCollateralForm.get('no_plat');
        const ValidasiWarna = <FormControl>this.editCollateralForm.get('warna');
        const ValidasiNomesin = <FormControl>this.editCollateralForm.get('no_mesin');
        const ValidasiNorangka = <FormControl>this.editCollateralForm.get('no_rangka');
        const ValidasiNamaBpkb = <FormControl>this.editCollateralForm.get('nama_bpkb');
        const ValidasiNegaraProdusen = <FormControl>this.editCollateralForm.get('negara_produsen');
        const ValidasiHubunganPemilikHak = <FormControl>this.editCollateralForm.get('hubungan_pemegang_hak');
        const ValidasiTipeProperti = <FormControl>this.editCollateralForm.get('tipe_properti');
        const ValidasiStatusAgunan = <FormControl>this.editCollateralForm.get('status_agunan');
        const ValidasiStatusDevloper = <FormControl>this.editCollateralForm.get('status_developer');
        const ValidasiDevloper = <FormControl>this.editCollateralForm.get('developer');
        const ValidasiStatusJaminanSebelum = <FormControl>this.editCollateralForm.get('status_jaminan_sebelumnya');
        const ValidasiTahunDibuat = <FormControl>this.editCollateralForm.get('tahun_dibuat');
        const ValidasiUsiaBangunan = <FormControl>this.editCollateralForm.get('usia_bangunan');
        const ValidasiStatusSertifikat = <FormControl>this.editCollateralForm.get('status_sertifikat');
        const ValidasiNoSertifikat = <FormControl>this.editCollateralForm.get('no_sertifikat');
        const ValidasiNoKontakHr = <FormControl>this.editCollateralForm.get('nama_pemegang_hak');
        const ValidasiNoHandphoneCp = <FormControl>this.editCollateralForm.get('no_handphone_cp');
        const ValidasiNoIdPemegangHakSertifikat = <FormControl>this.editCollateralForm.get('no_id_pemegang_hak_sertifikat');
        const ValidasiAlamatAgunan = <FormControl>this.editCollateralForm.get('alamat_agunan');
        const ValidasiProvinsiAgunan = <FormControl>this.editCollateralForm.get('provinsi_agunan');
        const ValidasiKabkotaAgunan = <FormControl>this.editCollateralForm.get('kabkota_agunan');
        const ValidasiKecamatanAgunan = <FormControl>this.editCollateralForm.get('kecamatan_agunan');
        const ValidasiKelurahanAgunan = <FormControl>this.editCollateralForm.get('kelurahan_agunan');
        const ValidasiKodePosAgunan = <FormControl>this.editCollateralForm.get('kode_pos_agunan');
        const Validasirt = <FormControl>this.editCollateralForm.get('rt');
        const Validasirw = <FormControl>this.editCollateralForm.get('rw');
        const ValidasiLuasTanah = <FormControl>this.editCollateralForm.get('luas_tanah');
        const ValidasiLuasBangunan = <FormControl>this.editCollateralForm.get('luas_bangunan');
        const ValidasiHargaObjek = <FormControl>this.editCollateralForm.get('harga_objek');
        const ValidasiHargaTransaksi = <FormControl>this.editCollateralForm.get('harga_transaksi');
        const ValidasiAlamatSesuaiSertifikat = <FormControl>this.editCollateralForm.get('alamat_sesuai_sertifikat');
        const ValidasiProvinsiSesuaiSertifikat = <FormControl>this.editCollateralForm.get('provinsi_sesuai_sertifikat');
        const ValidasiKabkotaSesuaiSertifikat = <FormControl>this.editCollateralForm.get('kabkota_sesuai_sertifikat');
        const ValidasiKecamatanSesuaiSertifikat = <FormControl>this.editCollateralForm.get('kecamatan_sesuai_sertifikat');
        const ValidasiKelurahanSesuaiSertifikat = <FormControl>this.editCollateralForm.get('kelurahan_sesuai_sertifikat');
        const ValidasiRtSertifikat = <FormControl>this.editCollateralForm.get('rt_sertifikat');
        const ValidasiRwSertifikat = <FormControl>this.editCollateralForm.get('rw_sertifikat');
        const ValidasiIdRumah = <FormControl>this.editCollateralForm.get('id_rumah');
        const ValidasiBlokRumah = <FormControl>this.editCollateralForm.get('blok_rumah');
        const ValidasiNomorRumah = <FormControl>this.editCollateralForm.get('nomor_rumah');
        const ValidasiTanggalTerbit = <FormControl>this.editCollateralForm.get('tanggal_terbit');
        const ValidasiTanggalExpired = <FormControl>this.editCollateralForm.get('tanggal_expired');
        const ValidasiHubunganPemegangHakLainya = <FormControl>this.editCollateralForm.get('hubungan_pemegang_hak_lainya');
        ValidasiIdRumah.setValidators([Validators.required]);
        ValidasiBlokRumah.setValidators([Validators.required]);
        ValidasiNomorRumah.setValidators([Validators.required]);
        ValidasiTipeAgunan.setValidators([Validators.required]);
        ValidasiJenisObjek.setValidators([Validators.required]);
        ValidasiTipeKendaraan.setValidators([Validators.required]);
        ValidasiMerk.setValidators([Validators.required]);
        ValidasiModel.setValidators([Validators.required]);
        ValidasiSeri.setValidators([Validators.required]);
        ValidasiNomorBpkb.setValidators([Validators.required]);
        ValidasiNoplat.setValidators([Validators.required]);
        ValidasiWarna.setValidators([Validators.required]);
        ValidasiNomesin.setValidators([Validators.required]);
        ValidasiNorangka.setValidators([Validators.required]);
        ValidasiNamaBpkb.setValidators([Validators.required]);
        ValidasiNegaraProdusen.setValidators([Validators.required]);
        ValidasiHubunganPemilikHak.setValidators([Validators.required]);
        ValidasiTipeProperti.setValidators([Validators.required]);
        ValidasiStatusAgunan.setValidators([Validators.required]);
        ValidasiStatusDevloper.setValidators([Validators.required]);
        ValidasiDevloper.setValidators([Validators.required]);
        ValidasiStatusJaminanSebelum.setValidators([Validators.required]);
        ValidasiTahunDibuat.setValidators([Validators.required]);
        ValidasiUsiaBangunan.setValidators([Validators.required]);
        ValidasiStatusSertifikat.setValidators([Validators.required]);
        ValidasiNoSertifikat.setValidators([Validators.required]);
        ValidasiNoKontakHr.setValidators([Validators.required]);
        ValidasiNoHandphoneCp.setValidators([Validators.required]);
        ValidasiNoIdPemegangHakSertifikat.setValidators([Validators.required]);
        ValidasiAlamatAgunan.setValidators([Validators.required]);
        ValidasiProvinsiAgunan.setValidators([Validators.required]);
        ValidasiKabkotaAgunan.setValidators([Validators.required]);
        ValidasiKecamatanAgunan.setValidators([Validators.required]);
        ValidasiKelurahanAgunan.setValidators([Validators.required]);
        ValidasiKodePosAgunan.setValidators([Validators.required]);
        Validasirt.setValidators([Validators.required]);
        Validasirw.setValidators([Validators.required]);
        ValidasiLuasTanah.setValidators([Validators.required]);
        ValidasiLuasBangunan.setValidators([Validators.required]);
        ValidasiHargaObjek.setValidators([Validators.required]);
        ValidasiHargaTransaksi.setValidators([Validators.required]);
        ValidasiAlamatSesuaiSertifikat.setValidators([Validators.required]);
        ValidasiProvinsiSesuaiSertifikat.setValidators([Validators.required]);
        ValidasiKabkotaSesuaiSertifikat.setValidators([Validators.required]);
        ValidasiKecamatanSesuaiSertifikat.setValidators([Validators.required]);
        ValidasiKelurahanSesuaiSertifikat.setValidators([Validators.required]);
        ValidasiRtSertifikat.setValidators([Validators.required]);
        ValidasiRwSertifikat.setValidators([Validators.required]);
        ValidasiTanggalTerbit.setValidators([Validators.required]);
        ValidasiTanggalExpired.setValidators([Validators.required]);
        ValidasiHubunganPemegangHakLainya.setValidators([Validators.required]);

        this.datEntryService.getFetchListTipeProperti(tipeAgunan).subscribe(data => {
          this.tipeProperti = data.result;
        });
        const retriveAgunan = {
          tipe_agunan: tipeAgunan,
          jenis_objek: this.tableAgunan.jenis_objek,
          tipe_kendaraan: this.tableAgunan.tipe_kendaraan,
          merk: this.tableAgunan.merk,
          model: this.tableAgunan.model,
          seri: this.tableAgunan.seri,
          nomor_bpkb: this.tableAgunan.nomor_bpkb,
          no_plat: this.tableAgunan.no_plat,
          warna: this.tableAgunan.warna,
          hubungan_pemegang_hak_lainya: this.kirimanhubungan1lainya,
          no_mesin: this.tableAgunan.no_mesin,
          no_rangka: this.tableAgunan.no_rangka,
          nama_bpkb: this.tableAgunan.nama_bpkb,
          hubungan_pemegang_hak: this.kirimanhubungan1,
          tipe_properti: this.tableAgunan.tipe_properti,
          status_agunan: this.tableAgunan.status_agunan,
          status_developer: this.tableAgunan.status_developer,
          developer: this.tableAgunan.developer,
          status_jaminan_sebelumnya: this.tableAgunan.status_jaminan_sebelumnya,
          tahun_dibuat: this.tableAgunan.tahun_dibuat,
          usia_bangunan: this.tableAgunan.usia_bangunan,
          status_sertifikat: this.sertifTrue,
          no_sertifikat: this.tableAgunan.no_sertifikat,
          nama_pemegang_hak: this.tableAgunan.nama_pemegang_hak,
          no_handphone_cp: this.tableAgunan.no_handphone_cp,
          no_id_pemegang_hak_sertifikat: this.tableAgunan.no_id_pemegang_hak_sertifikat,
          alamat_agunan: this.tableAgunan.alamat_agunan,
          negara_produsen: this.tableAgunan.negara_produsen,
          berwawasan_lingkungan: this.tableAgunan.berwawasan_lingkungan,
          //
          provinsi_agunan: '',
          kabkota_agunan: '',
          kecamatan_agunan: '',
          kelurahan_agunan: '',
          //
          kode_pos_agunan: this.tableAgunan.kode_pos_agunan,
          rt: this.tableAgunan.rt,
          rw: this.tableAgunan.rw,
          luas_tanah: this.tableAgunan.luas_tanah,
          luas_bangunan: this.tableAgunan.luas_bangunan,
          harga_objek: this.tableAgunan.harga_objek,
          harga_transaksi: this.tableAgunan.harga_transaksi,
          alamat_sesuai_sertifikat: this.tableAgunan.alamat_sesuai_sertifikat,
          //
          provinsi_sesuai_sertifikat: '',
          kabkota_sesuai_sertifikat: '',
          kecamatan_sesuai_sertifikat: '',
          kelurahan_sesuai_sertifikat: '',
          //
          kode_pos_sesuai_sertifikat: this.tableAgunan.kode_pos_sesuai_sertifikat,
          rt_sertifikat: this.tableAgunan.rt_sertifikat,
          rw_sertifikat: this.tableAgunan.rw_sertifikat,
          id_rumah: this.tableAgunan.id_rumah,
          blok_rumah: this.tableAgunan.blok_rumah,
          nomor_rumah: this.tableAgunan.nomor_rumah,
          tanggal_terbit: this.tableAgunan.tanggal_terbit,
          tanggal_expired: this.tableAgunan.tanggal_expired,
          nilai_agunan: this.tableAgunan.nilai_agunan,
          nilai_indikasi: this.tableAgunan.nilai_indikasi,
          no_spk: this.tableAgunan.no_spk,
          no_faktur: this.tableAgunan.no_faktur,
          nilai_pasar: this.tableAgunan.nilai_pasar,
          nilai_likuidasi: this.tableAgunan.nilai_likuidasi,
          no_imb: this.tableAgunan.no_imb,
          tanggal_imb: this.tableAgunan.tanggal_imb,
          status_sertifikat_input: this.sertifInput,
        };
        this.editCollateralForm.setValue(retriveAgunan);

        setTimeout(() => {
          this.getLoading(false);
          if (this.tableAgunan.kode_pos_agunan === '') {
            //
          } else {
            this.carimenggunakankodeposagunan(this.tableAgunan.kode_pos_agunan);
            this.carimenggunakankodepossertifikat(this.tableAgunan.kode_pos_sesuai_sertifikat);
          }
        }, 300);
      });
    }, 80);
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
      this.editCollateralForm.get('kabkota_agunan')?.setValue(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);
    });
  }

  SertifProvChange(value: any): void {
    this.getLoading(true);
    const valueKota = value.split('|');
    this.datEntryService.getkabkota(valueKota[0]).subscribe(data => {
      this.getLoading(false);
      this.daWakotas = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.editCollateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif);
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
      this.editCollateralForm.get('kecamatan_agunan')?.setValue(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);
    });
  }
  SertifKotaChange(value: any): void {
    this.getLoading(true);
    const proValue = value.split('|');
    this.datEntryService.getkecamatan(proValue[0]).subscribe(data => {
      this.getLoading(false);
      this.kecamatans = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.editCollateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.untukKodeKecamatanSertif + '|' + this.untukKecamatanSertif);
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
      this.editCollateralForm.get('kelurahan_agunan')?.setValue(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
    });
  }
  SertifKecamatanChange(value: any): void {
    this.getLoading(true);
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(valueKecamatan[0]).subscribe(data => {
      this.getLoading(false);
      this.kelurahans = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.editCollateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
      // this.collateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.collateralForm.get('kelurahan_agunan')?.value);
    });
  }
  kelurahanChange(value: any): void {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.editCollateralForm.get('kode_pos_agunan')?.setValue(this.daWakodepos);
  }
  SertifKelurahanChange(value: any): void {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.daWakodepos);
  }

  changefom(): void {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  tambahcollateral(): void {
    this.tambahatautidak = 'benar';
    $('#tambahdata').attr('hidden', 'hidden');
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

  createcollateral(): void {
    const provinsiSplit = this.editCollateralForm.get('provinsi_agunan')?.value.split('|');
    const kotaSplit = this.editCollateralForm.get('kabkota_agunan')?.value.split('|');
    const kecSplit = this.editCollateralForm.get('kecamatan_agunan')?.value.split('|');
    const kelSplit = this.editCollateralForm.get('kelurahan_agunan')?.value.split('|');
    const provSerSplit = this.editCollateralForm.get('provinsi_sesuai_sertifikat')?.value.split('|');
    const kotaSerSplit = this.editCollateralForm.get('kabkota_sesuai_sertifikat')?.value.split('|');
    const kecSerSplit = this.editCollateralForm.get('kecamatan_sesuai_sertifikat')?.value.split('|');
    const kelSerSplit = this.editCollateralForm.get('kelurahan_sesuai_sertifikat')?.value.split('|');

    let tipeAgunan: any;
    let kirimhubunganpemeganghak: any;
    let kirimStatusSertif: any;
    if (this.editCollateralForm.get('tipe_agunan')?.value === 'C01') {
      tipeAgunan = 'Kendaraan';
    } else if (this.editCollateralForm.get('tipe_agunan')?.value === 'E01') {
      tipeAgunan = 'Emas';
    } else if (this.editCollateralForm.get('tipe_agunan')?.value === 'H01') {
      tipeAgunan = 'Tanah';
    } else if (this.editCollateralForm.get('tipe_agunan')?.value === 'H02') {
      tipeAgunan = 'Bangunan';
    } else {
      tipeAgunan = 'Tanah dan Bangunan';
    }

    if (this.editCollateralForm.get('hubungan_pemegang_hak')?.value === 'Lainya') {
      kirimhubunganpemeganghak = this.editCollateralForm.get('hubungan_pemegang_hak_lainya')?.value;
    } else {
      kirimhubunganpemeganghak = this.editCollateralForm.get('hubungan_pemegang_hak')?.value;
    }

    if (this.editCollateralForm.get('status_sertifikat')?.value === 'Lainnya') {
      kirimStatusSertif = this.editCollateralForm.get('status_sertifikat_input')?.value;
    } else {
      kirimStatusSertif = this.editCollateralForm.get('status_sertifikat')?.value;
    }

    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/update_collateral', {
        tipe_agunan: tipeAgunan,
        jenis_objek: this.editCollateralForm.get('jenis_objek')?.value,
        tipe_kendaraan: this.editCollateralForm.get('tipe_kendaraan')?.value,
        merk: this.editCollateralForm.get('merk')?.value,
        model: this.editCollateralForm.get('model')?.value,
        seri: this.editCollateralForm.get('seri')?.value,
        nomor_bpkb: this.editCollateralForm.get('nomor_bpkb')?.value,
        no_plat: this.editCollateralForm.get('no_plat')?.value,
        warna: this.editCollateralForm.get('warna')?.value,
        no_mesin: this.editCollateralForm.get('no_mesin')?.value,
        no_rangka: this.editCollateralForm.get('no_rangka')?.value,
        nama_bpkb: this.editCollateralForm.get('nama_bpkb')?.value,
        hubungan_pemegang_hak: kirimhubunganpemeganghak,
        tipe_properti: this.editCollateralForm.get('tipe_properti')?.value,
        status_agunan: this.editCollateralForm.get('status_agunan')?.value,
        status_developer: this.editCollateralForm.get('status_developer')?.value,
        developer: this.editCollateralForm.get('developer')?.value,
        status_jaminan_sebelumnya: this.editCollateralForm.get('status_jaminan_sebelumnya')?.value,
        tahun_dibuat: this.editCollateralForm.get('tahun_dibuat')?.value,
        usia_bangunan: this.editCollateralForm.get('usia_bangunan')?.value,
        status_sertifikat: kirimStatusSertif,
        no_sertifikat: this.editCollateralForm.get('no_sertifikat')?.value,
        nama_pemegang_hak: this.editCollateralForm.get('nama_pemegang_hak')?.value,
        no_handphone_cp: this.editCollateralForm.get('no_handphone_cp')?.value,
        no_id_pemegang_hak_sertifikat: this.editCollateralForm.get('no_id_pemegang_hak_sertifikat')?.value,
        alamat_agunan: this.editCollateralForm.get('alamat_agunan')?.value,
        kode_pos_agunan: this.editCollateralForm.get('kode_pos_agunan')?.value,
        rt: this.editCollateralForm.get('rt')?.value,
        rw: this.editCollateralForm.get('rw')?.value,
        alamat_sesuai_sertifikat: this.editCollateralForm.get('alamat_sesuai_sertifikat')?.value,
        kode_pos_sesuai_sertifikat: this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.value,
        rt_sertifikat: this.editCollateralForm.get('rt_sertifikat')?.value,
        rw_sertifikat: this.editCollateralForm.get('rw_sertifikat')?.value,
        id_rumah: this.editCollateralForm.get('id_rumah')?.value,
        blok_rumah: this.editCollateralForm.get('blok_rumah')?.value,
        nomor_rumah: this.editCollateralForm.get('nomor_rumah')?.value,
        app_no_de: this.app_no_de,
        curef: this.curef,
        harga_objek: this.editCollateralForm.get('harga_objek')?.value,
        harga_objek_sertifikat: this.editCollateralForm.get('harga_objek')?.value,
        luas_bangunan: this.editCollateralForm.get('luas_bangunan')?.value,
        luas_bangunan_sertifikat: this.editCollateralForm.get('luas_bangunan')?.value,
        luas_tanah: this.editCollateralForm.get('luas_tanah')?.value,
        luas_tanah_sertifikat: this.editCollateralForm.get('luas_tanah')?.value,
        tanggal_terbit: this.editCollateralForm.get('tanggal_terbit')?.value,
        tanggal_expired: this.editCollateralForm.get('tanggal_expired')?.value,
        negara_produsen: this.editCollateralForm.get('negara_produsen')?.value,
        berwawasan_lingkungan: this.editCollateralForm.get('berwawasan_lingkungan')?.value,
        nilai_agunan: this.editCollateralForm.get('nilai_agunan')?.value,
        nilai_indikasi: this.editCollateralForm.get('nilai_indikasi')?.value,
        no_spk: this.editCollateralForm.get('no_spk')?.value,
        no_faktur: this.editCollateralForm.get('no_faktur')?.value,
        nilai_pasar: this.editCollateralForm.get('nilai_pasar')?.value,
        nilai_likuidasi: this.editCollateralForm.get('nilai_likuidasi')?.value,
        no_imb: this.editCollateralForm.get('no_imb')?.value,
        tanggal_imb: this.editCollateralForm.get('tanggal_imb')?.value,
        harga_transaksi: this.editCollateralForm.get('harga_transaksi')?.value,
        // / provinsiiiaanann
        provinsi_agunan: provinsiSplit[1],
        provinsi_sesuai_sertifikat: provSerSplit[1],
        kabkota_agunan: kotaSplit[1],
        kabkota_sesuai_sertifikat: kotaSerSplit[1],
        kecamatan_agunan: kecSplit[1],
        kecamatan_sesuai_sertifikat: kecSerSplit[1],
        kelurahan_agunan: kelSplit[1],
        kelurahan_sesuai_sertifikat: kelSerSplit[1],
        status_active: '',
        id_collateral: this.tableAgunan.id_collateral,
        id_collateral_detail: this.tableAgunan.id_collateral_detail,
        nama_perumahan: '',
      })
      .subscribe({
        next: () => {
          alert('Berhasil Menyimpan Data');
          this.router.navigate(['/data-entry/collateral'], {
            queryParams: {
              curef: this.curef,
              app_no_de: this.app_no_de,
            },
          });
        },
      });
  }

  carimenggunakankodeposagunan(kodepost: any): void {
    this.datEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        if (this.clickKdPost == 1) {
          this.responseKels = sukses.result.kels;
          this.responseKels.forEach(element => {
            this.responseKels.push(element);
            if (element.kdPos == kodepost) {
              const namaWIl = element.namaWilayah;
              this.responseNamaWilayah.push(namaWIl);
            }
          });
        }
        this.untukKodeProvinsiAgunan = sukses.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = sukses.result.provKec.kd_kec;
        this.untukprovinsiagunan = sukses.result.provKec.nm_prov;
        this.untukkobkotaagunan = sukses.result.provKec.nm_kota;
        this.untukkecamatanagunan = sukses.result.provKec.nm_kec;
        // console.warn(sukses);
        setTimeout(() => {
          if (this.clickKdPost == 1) {
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
          } else {
            this.untukKodeKelurahanAgunan = kodepost;
            this.untukkelurahanagunan = this.tableAgunan.kelurahan_agunan;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.kelurahanChange(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
          }
        }, 10);
        this.editCollateralForm.get('provinsi_agunan')?.setValue(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
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
        if (this.clickKdPostSertif == 1) {
          this.responseKelsSertif = sukses.result.kels;
          this.responseKelsSertif.forEach(element => {
            this.responseKelsSertif.push(element);
            if (element.kdPos == kodepost) {
              const namaWIl = element.namaWilayah;
              this.responseNamaWilayahSertif.push(namaWIl);
            }
          });
        }
        this.untukProvinsiSertif = sukses.result.provKec.nm_prov;
        this.untukKobkotaSertif = sukses.result.provKec.nm_kota;
        this.untukKecamatanSertif = sukses.result.provKec.nm_kec;
        this.untukKodeProvinsiSertif = sukses.result.provKec.kd_prov;
        this.untukKodeKobkotaSertif = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatanSertif = sukses.result.provKec.kd_kec;
        setTimeout(() => {
          if (this.clickKdPostSertif == 1) {
            if (sukses.result.kels == null) {
              this.untukKodeKelurahanSertif = kodepost;
              this.untukKelurahanSertif = '';
              this.SertifKelurahanChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
            } else if (sukses.result.provKec.kd_kel == null) {
              this.untukKodeKelurahanSertif = kodepost;
              this.untukKelurahanSertif = this.responseNamaWilayahSertif[this.responseNamaWilayahSertif.length - 1];
              this.SertifKelurahanChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
            } else {
              this.untukKodeKelurahanSertif = kodepost;
              this.untukKelurahanSertif = sukses.result.provKec.nm_kel;
              this.SertifKelurahanChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
            }
          } else {
            this.untukKodeKelurahanSertif = kodepost;
            this.untukKelurahanSertif = this.tableAgunan.kelurahan_agunan;
            this.SertifKelurahanChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
          }
        }, 10);
        this.editCollateralForm.get('provinsi_sesuai_sertifikat')?.setValue(this.untukKodeProvinsiSertif + '|' + this.untukProvinsiSertif);
        this.SertifProvChange(this.untukKodeProvinsiSertif + '|' + this.untukProvinsiSertif);
        this.SertifKotaChange(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif);
        this.SertifKecamatanChange(this.untukKodeKecamatanSertif + '|' + this.untukKecamatanSertif);
      },
    });
  }

  // /serifikat

  onItemChange(event: any): void {
    if (event.value == 1) {
      this.editCollateralForm.get('alamat_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('alamat_agunan')?.value);
      this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('kode_pos_agunan')?.value);
      this.carimenggunakankodepossertifikat(this.editCollateralForm.get('kode_pos_agunan')?.value);
      this.editCollateralForm.get('rt_sertifikat')?.setValue(this.editCollateralForm.get('rt')?.value);
      this.editCollateralForm.get('rw_sertifikat')?.setValue(this.editCollateralForm.get('rw')?.value);
    } else {
      this.editCollateralForm.get('alamat_sesuai_sertifikat')?.setValue('');
      this.editCollateralForm.get('provinsi_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('rt_sertifikat')?.setValue('');
      this.editCollateralForm.get('rw_sertifikat')?.setValue('');
    }
  }

  hitungUsiaBangunan(tahun: any): void {
    const d = new Date();
    const year = d.getFullYear();
    const total = Number(year) - Number(tahun);
    this.editCollateralForm.get('usia_bangunan')?.setValue(total);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  setHargaObjek(hargaObjek: any): void {
    this.editCollateralForm.get('harga_objek')?.setValue(hargaObjek);
  }
}
