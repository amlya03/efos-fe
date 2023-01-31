import { Component, Input, OnInit } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { InitialDataEntryService } from '../services/initial-data-entry.service';
import { refStatusPerkawinan } from 'app/verification/service/config/refStatusPerkawinan.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { modelCustomer } from '../services/config/modelCustomer.model';
import { refListTipePerusahaan } from 'app/data-entry/services/config/refListTipePerusahaan.model';
import { getListTipePekerjaan } from 'app/data-entry/services/config/getListTipePekerjaan.model';
import { refBidang } from '../services/config/refBidang.model';
import { refSektor } from '../services/config/refSektor.model';
import { modelJobIde } from '../services/config/modelJobIde.model';
import { refJenisPekerjaan } from '../../data-entry/services/config/refJenisPekerjaan.model';
import { refJabatan } from '../../verification/service/config/refJabatan.model';
import { Subscription } from 'rxjs';
import { refListJumlahKaryawan } from '../../data-entry/services/config/refListJumlahKaryawan.model';
import { environment } from 'environments/environment';
import { ServicesUploadDocumentService } from 'app/upload-document/services/services-upload-document.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-initial-data-entry-fix',
  templateUrl: './initial-data-entry-fix.component.html',
  styleUrls: ['./initial-data-entry-fix.component.scss'],
})
export class InitialDataEntryFixComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  subscription?: Subscription;
  jumlahKaryawanModel: refListJumlahKaryawan[] = [];
  app_no_ide: any;
  curef: any;
  paramCuref: any;
  paramId: any;
  modelIde: modelCustomer = new modelCustomer();
  cekResultIde = 0;
  kategori: any;
  getjenispekerjaandariapi: getListTipePekerjaan[] = [];
  getjenisbidangdariapi: refBidang[] = [];
  getdatasektorekonomi: refSektor[] = [];
  getdatasektorekonomiSebelum: refSektor[] = [];
  modelTipePerusahaan: refListTipePerusahaan[] = [];
  modelJob: modelJobIde = new modelJobIde();
  listJabatan: refJenisPekerjaan[] = [];
  refJabatanModel: refJabatan[] = [];
  pendidikanModel: refJenisPekerjaan[] = [];
  termAndCondition: any;
  // Upload /////////
  file?: File;
  hideDocChange = 0;
  showProggres = 1;
  resultUpload = 0;
  isiUpload: any;
  popup: any;
  // Upload ////////
  /////
  untukKodeProvinsi: any;
  untukKodeKobkota: any;
  untukKodeKecamatan: any;
  untukprovinsi: any;
  untukkobkota: any;
  untukkecamatan: any;
  untukKodeKelurahan: any;
  untukkelurahan: any;
  //////
  untukKodeProvinsiD: any;
  untukKodeKobkotaD: any;
  untukKodeKecamatanD: any;
  untukprovinsiD: any;
  untukkobkotaD: any;
  untukkecamatanD: any;
  untukKodeKelurahanD: any;
  untukkelurahanD: any;
  //////
  proJob: any;
  kotaJob: any;
  kecJob: any;
  kelJob: any;
  kdProJob: any;
  kdKotaJob: any;
  kdKecJob: any;
  kdKelJob: any;

  kotaChangeJob: any;
  kecChangeJob: any;
  kelChangeJob: any;
  ///////
  kirimKatePeker: any;
  kirimProPas: any;
  kirimKotaPas: any;
  kirimKecPas: any;
  kirimKelPas: any;
  // //////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////
  sendProJob: any;
  sendKotaJob: any;
  sendKecJob: any;
  sendKelJob: any;
  sendJenisBidang: any;
  sendJenisBidangSebelum: any;
  retriveBidang: any;
  retriveBidangSebelum: any;
  retriveSektor: any;
  retriveSektorSebelum: any;
  // //////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////
  daWaprof: any;
  daWakota: any;
  ideForm!: FormGroup;
  jobForm!: FormGroup;
  // //////////////////////////////////////////////////////////////
  clickKdPostLajang = 0;
  clickKdPostMenikah = 0;
  clickKdPostJob = 0;
  responseKels: refJenisPekerjaan[] = [];
  responseKelsMenikah: refJenisPekerjaan[] = [];
  responseKelsJob: refJenisPekerjaan[] = [];
  responseNamaWilayah: refJenisPekerjaan[] = [];
  responseNamaWilayahMenikah: refJenisPekerjaan[] = [];
  responseNamaWilayahJob: refJenisPekerjaan[] = [];
  // //////////////////////////////////////////
  refStatusPerkawinan?: refStatusPerkawinan[];
  paramtanggal_lahir: string | undefined;
  kecamatan: any;
  kecamatan_pasangan: any;
  kelurahan: any;
  kelurahan_pasangan: any;
  contohdata: any;
  daWakotaD: any;
  kecamatanD: any;
  kelurahanD: any;
  saveCabang: any;
  // ///////////////////////////////////////////
  // /////////////////////////////////////////////
  validasiNamaPasangan: any;
  validasiJenis_kelamin_pasangan: any;
  validasiTanggal_lahir_pasangan: any;
  validasiTempat_lahir_pasangan: any;
  validasiAgama_pasangan: any;
  validasiPendidikan_pasangan: any;
  validasiKewarganegaraan_pasangan: any;
  validasiNama_ibu_kandung_pasangan: any;
  validasiAlamat_ktp_pasangan: any;
  validasiProvinsi_pasangan: any;
  validasiKabkota_pasangan: any;
  validasiKecamatan_pasangan: any;
  validasiKelurahan_pasangan: any;
  validasiKode_pos_pasangan: any;
  validasiRt_pasangan: any;
  validasiRw_pasangan: any;
  validasiNo_ktp_pasangan: any;
  validasiTanggal_terbit_ktp_pasangan: any;
  validasiNo_handphone_pasangan: any;
  // ////////////////////////////////////////////
  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    protected applicationConfigService: ApplicationConfigService,
    protected ideFixServices: InitialDataEntryService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService,
    protected sessionServices: SessionStorageService,
    protected uploadServices: ServicesUploadDocumentService
  ) {
    this.route.queryParams.subscribe(params => {
      this.paramCuref = params.curef;
      this.paramId = params.id;
      this.kategori = params.kategori;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);

    this.saveCabang = this.sessionServices.retrieve('sessionKdCabang');
    this.load();
    this.ideForm = this.formBuilder.group({
      nama: ['', Validators.required],
      jenis_kelamin: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      usia: '',
      tempat_lahir: ['', Validators.required],
      status_perkawinan: ['', Validators.required],
      agama: ['', Validators.required],
      pendidikan: ['', Validators.required],
      kewarganegaraan: ['WNI', Validators.required],
      nama_ibu_kandung: ['', Validators.required],
      npwp: '',
      alamat_ktp: ['', Validators.required],
      provinsi: ['', Validators.required],
      kabkota: ['', Validators.required],
      kecamatan: ['', Validators.required],
      kelurahan: ['', Validators.required],
      kode_pos: ['', Validators.required],
      rt: ['', Validators.required],
      rw: ['', Validators.required],
      no_ktp: ['', Validators.required],
      tanggal_terbit_ktp: ['', Validators.required],
      tanggal_exp_ktp: '',
      status_ktp: '1',
      no_handphone: ['', Validators.required],

      // /////////////// Pasangan /////////////////////////////////
      nama_pasangan: '',
      jenis_kelamin_pasangan: '',
      tanggal_lahir_pasangan: '',
      usia_pasangan: '',
      tempat_lahir_pasangan: '',
      agama_pasangan: '',
      pendidikan_pasangan: '',
      kewarganegaraan_pasangan: 'WNI',
      nama_ibu_kandung_pasangan: '',
      npwp_pasangan: '',
      alamat_ktp_pasangan: '',
      provinsi_pasangan: '',
      kabkota_pasangan: '',
      kecamatan_pasangan: '',
      kelurahan_pasangan: '',
      kode_pos_pasangan: '',
      rt_pasangan: '',
      rw_pasangan: '',
      no_ktp_pasangan: '',
      status_alamat: '0',
      tanggal_terbit_ktp_pasangan: '',
      tanggal_exp_ktp_pasangan: '',
      status_ktp_pasangan: '1',
      no_handphone_pasangan: '',
    });

    const validasiStatusPerkawinan = <FormControl>this.ideForm.get('status_perkawinan');
    this.validasiNamaPasangan = <FormControl>this.ideForm.get('nama_pasangan');
    this.validasiJenis_kelamin_pasangan = <FormControl>this.ideForm.get('jenis_kelamin_pasangan');
    this.validasiTanggal_lahir_pasangan = <FormControl>this.ideForm.get('tanggal_lahir_pasangan');
    this.validasiTempat_lahir_pasangan = <FormControl>this.ideForm.get('tempat_lahir_pasangan');
    this.validasiAgama_pasangan = <FormControl>this.ideForm.get('agama_pasangan');
    this.validasiPendidikan_pasangan = <FormControl>this.ideForm.get('pendidikan_pasangan');
    this.validasiKewarganegaraan_pasangan = <FormControl>this.ideForm.get('kewarganegaraan_pasangan');
    this.validasiNama_ibu_kandung_pasangan = <FormControl>this.ideForm.get('nama_ibu_kandung_pasangan');
    this.validasiAlamat_ktp_pasangan = <FormControl>this.ideForm.get('alamat_ktp_pasangan');
    this.validasiProvinsi_pasangan = <FormControl>this.ideForm.get('provinsi_pasangan');
    this.validasiKabkota_pasangan = <FormControl>this.ideForm.get('kabkota_pasangan');
    this.validasiKecamatan_pasangan = <FormControl>this.ideForm.get('kecamatan_pasangan');
    this.validasiKelurahan_pasangan = <FormControl>this.ideForm.get('kelurahan_pasangan');
    this.validasiKode_pos_pasangan = <FormControl>this.ideForm.get('kode_pos_pasangan');
    this.validasiRt_pasangan = <FormControl>this.ideForm.get('rt_pasangan');
    this.validasiRw_pasangan = <FormControl>this.ideForm.get('rw_pasangan');
    this.validasiNo_ktp_pasangan = <FormControl>this.ideForm.get('no_ktp_pasangan');
    this.validasiTanggal_terbit_ktp_pasangan = <FormControl>this.ideForm.get('tanggal_terbit_ktp_pasangan');
    this.validasiNo_handphone_pasangan = <FormControl>this.ideForm.get('no_handphone_pasangan');

    this.subscription = validasiStatusPerkawinan.valueChanges.subscribe(value => {
      if (value === 'Menikah') {
        this.validasiNamaPasangan.setValidators([Validators.required]);
        this.validasiJenis_kelamin_pasangan.setValidators([Validators.required]);
        this.validasiTanggal_lahir_pasangan.setValidators([Validators.required]);
        this.validasiTempat_lahir_pasangan.setValidators([Validators.required]);
        this.validasiAgama_pasangan.setValidators([Validators.required]);
        this.validasiPendidikan_pasangan.setValidators([Validators.required]);
        this.validasiKewarganegaraan_pasangan.setValidators([Validators.required]);
        this.validasiNama_ibu_kandung_pasangan.setValidators([Validators.required]);
        this.validasiAlamat_ktp_pasangan.setValidators([Validators.required]);
        this.validasiProvinsi_pasangan.setValidators([Validators.required]);
        this.validasiKabkota_pasangan.setValidators([Validators.required]);
        this.validasiKecamatan_pasangan.setValidators([Validators.required]);
        this.validasiKelurahan_pasangan.setValidators([Validators.required]);
        this.validasiKode_pos_pasangan.setValidators([Validators.required]);
        this.validasiRt_pasangan.setValidators([Validators.required]);
        this.validasiRw_pasangan.setValidators([Validators.required]);
        this.validasiNo_ktp_pasangan.setValidators([Validators.required]);
        this.validasiTanggal_terbit_ktp_pasangan.setValidators([Validators.required]);
        this.validasiNo_handphone_pasangan.setValidators([Validators.required]);
      } else {
        this.validasiNamaPasangan.setValidators(null);
        this.validasiJenis_kelamin_pasangan.setValidators(null);
        this.validasiTanggal_lahir_pasangan.setValidators(null);
        this.validasiTempat_lahir_pasangan.setValidators(null);
        this.validasiAgama_pasangan.setValidators(null);
        this.validasiPendidikan_pasangan.setValidators(null);
        this.validasiKewarganegaraan_pasangan.setValidators(null);
        this.validasiNama_ibu_kandung_pasangan.setValidators(null);
        this.validasiAlamat_ktp_pasangan.setValidators(null);
        this.validasiProvinsi_pasangan.setValidators(null);
        this.validasiKabkota_pasangan.setValidators(null);
        this.validasiKecamatan_pasangan.setValidators(null);
        this.validasiKelurahan_pasangan.setValidators(null);
        this.validasiKode_pos_pasangan.setValidators(null);
        this.validasiRt_pasangan.setValidators(null);
        this.validasiRw_pasangan.setValidators(null);
        this.validasiNo_ktp_pasangan.setValidators(null);
        this.validasiTanggal_terbit_ktp_pasangan.setValidators(null);
        this.validasiNo_handphone_pasangan.setValidators(null);
      }
      this.validasiNamaPasangan.updateValueAndValidity();
      this.validasiJenis_kelamin_pasangan.updateValueAndValidity();
      this.validasiTanggal_lahir_pasangan.updateValueAndValidity();
      this.validasiTempat_lahir_pasangan.updateValueAndValidity();
      this.validasiAgama_pasangan.updateValueAndValidity();
      this.validasiPendidikan_pasangan.updateValueAndValidity();
      this.validasiKewarganegaraan_pasangan.updateValueAndValidity();
      this.validasiNama_ibu_kandung_pasangan.updateValueAndValidity();
      this.validasiAlamat_ktp_pasangan.updateValueAndValidity();
      this.validasiProvinsi_pasangan.updateValueAndValidity();
      this.validasiKabkota_pasangan.updateValueAndValidity();
      this.validasiKecamatan_pasangan.updateValueAndValidity();
      this.validasiKelurahan_pasangan.updateValueAndValidity();
      this.validasiKode_pos_pasangan.updateValueAndValidity();
      this.validasiRt_pasangan.updateValueAndValidity();
      this.validasiRw_pasangan.updateValueAndValidity();
      this.validasiNo_ktp_pasangan.updateValueAndValidity();
      this.validasiTanggal_terbit_ktp_pasangan.updateValueAndValidity();
      this.validasiNo_handphone_pasangan.updateValueAndValidity();
    });

    this.jobForm = this.formBuilder.group({
      nama_perusahaan: '',
      tipe_perusahaan: '',
      tipe_pekerjaan: '',
      kepemilikan_perusahaan: '',
      pemilik_usaha: '',
      no_telepon: '',
      jenis_bidang: '',
      sektor_ekonomi: '',
      alamat_perusahaan: '',
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      rt: '',
      rw: '',
      jumlah_karyawan: '',
      npwp: '',
      lama_bekerja_bulan: '',
      lama_bekerja_tahun: '',
      no_siup: '',
      barang_jasa: '',
      posisi: '',
      /////////////////////////////////////
      nama_perusahaan_sebelum: '',
      tipe_perusahaan_sebelum: '',
      tipe_pekerjaan_sebelum: '',
      alamat_pekerjaan_sebelum: '',
      jenis_bidang_sebelum: '',
      sektor_ekonomi_sebelum: '',
      lama_bekerja_bulan_sebelum: '0',
      lama_bekerja_tahun_sebelum: '0',
    });

    const ValidasiNamaPerusahaaan = <FormControl>this.jobForm.get('nama_perusahaan');
    const ValidasiTipePerusahaan = <FormControl>this.jobForm.get('tipe_perusahaan');
    const ValidasiTipePekerjaan = <FormControl>this.jobForm.get('tipe_pekerjaan');
    const ValidasiKepemilikanPerusahaan = <FormControl>this.jobForm.get('kepemilikan_perusahaan');
    const ValidasiPemilikUsaha = <FormControl>this.jobForm.get('pemilik_usaha');
    const ValidasiNoTelepon = <FormControl>this.jobForm.get('no_telepon');
    // const ValidasiJenisBidang = <FormControl>this.jobForm.get('jenis_bidang');
    // const  = <FormControl>this.jobForm.get('sektor_ekonomi');
    const ValidasiAlamatPerusahaan = <FormControl>this.jobForm.get('alamat_perusahaan');
    // const ValidasiProvinsiPerusahaan = <FormControl>this.jobForm.get('provinsi');
    // const ValidasiKotaPerusahaan = <FormControl>this.jobForm.get('kabkota');
    // const ValidasiKecamatanPerusahaan = <FormControl>this.jobForm.get('kecamatan');
    // const ValidasiKelurahanPerusahaan = <FormControl>this.jobForm.get('kelurahan');
    const ValidasiKodePosPerusahaan = <FormControl>this.jobForm.get('kode_pos');
    const ValidasiRtPerusahaan = <FormControl>this.jobForm.get('rt');
    const ValidasiRwPerusahaan = <FormControl>this.jobForm.get('rw');
    const ValidasiJumlahKaryawan = <FormControl>this.jobForm.get('jumlah_karyawan');
    const ValidasiLamaBekerjaBulan = <FormControl>this.jobForm.get('lama_bekerja_bulan');
    const ValidasiLamaBekerjaTahun = <FormControl>this.jobForm.get('lama_bekerja_tahun');
    const ValidasiNoSiup = <FormControl>this.jobForm.get('no_siup');
    const ValidasiBarangJasa = <FormControl>this.jobForm.get('barang_jasa');
    const ValidasiPosisi = <FormControl>this.jobForm.get('posisi');
    if (this.kategori === '2') {
      ValidasiNamaPerusahaaan.setValidators([Validators.required]);
      ValidasiTipePerusahaan.setValidators([Validators.required]);
      ValidasiTipePekerjaan.setValidators([Validators.required]);
      ValidasiKepemilikanPerusahaan.setValidators([Validators.required]);
      ValidasiPemilikUsaha.setValidators([Validators.required]);
      ValidasiNoTelepon.setValidators([Validators.required]);
      // ValidasiJenisBidang.setValidators([Validators.required]);
      // ValidasiSektorEkonomi.setValidators([Validators.required]);
      ValidasiAlamatPerusahaan.setValidators([Validators.required]);
      // ValidasiProvinsiPerusahaan.setValidators([Validators.required]);
      // ValidasiKotaPerusahaan.setValidators([Validators.required]);
      // ValidasiKecamatanPerusahaan.setValidators([Validators.required]);
      // ValidasiKelurahanPerusahaan.setValidators([Validators.required]);
      ValidasiKodePosPerusahaan.setValidators([Validators.required]);
      ValidasiRtPerusahaan.setValidators([Validators.required]);
      ValidasiRwPerusahaan.setValidators([Validators.required]);
      ValidasiJumlahKaryawan.setValidators([Validators.required]);
      ValidasiLamaBekerjaBulan.setValidators([Validators.required]);
      ValidasiLamaBekerjaTahun.setValidators([Validators.required]);
      ValidasiNoSiup.setValidators([Validators.required]);
      ValidasiBarangJasa.setValidators([Validators.required]);
      ValidasiPosisi.setValidators([Validators.required]);
    } else {
      ValidasiNamaPerusahaaan.setValidators(null);
      ValidasiTipePerusahaan.setValidators(null);
      ValidasiTipePekerjaan.setValidators(null);
      ValidasiKepemilikanPerusahaan.setValidators(null);
      ValidasiPemilikUsaha.setValidators(null);
      ValidasiNoTelepon.setValidators(null);
      // ValidasiJenisBidang.setValidators(null);
      // ValidasiSektorEkonomi.setValidators(null);
      ValidasiAlamatPerusahaan.setValidators(null);
      // ValidasiProvinsiPerusahaan.setValidators(null);
      // ValidasiKotaPerusahaan.setValidators(null);
      // ValidasiKecamatanPerusahaan.setValidators(null);
      // ValidasiKelurahanPerusahaan.setValidators(null);
      ValidasiKodePosPerusahaan.setValidators(null);
      ValidasiRtPerusahaan.setValidators(null);
      ValidasiRwPerusahaan.setValidators(null);
      ValidasiJumlahKaryawan.setValidators(null);
      ValidasiLamaBekerjaBulan.setValidators(null);
      ValidasiLamaBekerjaTahun.setValidators(null);
      ValidasiNoSiup.setValidators(null);
      ValidasiBarangJasa.setValidators(null);
      ValidasiPosisi.setValidators(null);
    }
    setTimeout(() => {
      ValidasiNamaPerusahaaan.updateValueAndValidity();
      ValidasiTipePerusahaan.updateValueAndValidity();
      ValidasiTipePekerjaan.updateValueAndValidity();
      ValidasiKepemilikanPerusahaan.updateValueAndValidity();
      ValidasiPemilikUsaha.updateValueAndValidity();
      ValidasiNoTelepon.updateValueAndValidity();
      // ValidasiJenisBidang.updateValueAndValidity();
      // ValidasiSektorEkonomi.updateValueAndValidity();
      ValidasiAlamatPerusahaan.updateValueAndValidity();
      // ValidasiProvinsiPerusahaan.updateValueAndValidity();
      // ValidasiKotaPerusahaan.updateValueAndValidity();
      // ValidasiKecamatanPerusahaan.updateValueAndValidity();
      // ValidasiKelurahanPerusahaan.updateValueAndValidity();
      ValidasiKodePosPerusahaan.updateValueAndValidity();
      ValidasiRtPerusahaan.updateValueAndValidity();
      ValidasiRwPerusahaan.updateValueAndValidity();
      ValidasiJumlahKaryawan.updateValueAndValidity();
      ValidasiLamaBekerjaBulan.updateValueAndValidity();
      ValidasiLamaBekerjaTahun.updateValueAndValidity();
      ValidasiNoSiup.updateValueAndValidity();
      ValidasiBarangJasa.updateValueAndValidity();
      ValidasiPosisi.updateValueAndValidity();
    }, 100);
  }

  load(): void {
    if (this.paramId != null) {
      this.cekResultIde = 1;
    } else {
      this.cekResultIde = 0;
      this.ideFixServices.getIdeById().subscribe(data => {
        this.app_no_ide = data.result;
      });
      this.ideFixServices.getIdeByCuref().subscribe(data => {
        this.curef = data.result;
      });
    }
    setTimeout(() => {
      this.ideFixServices.getInformasiSlik().subscribe(term => {
        this.termAndCondition = term.result;
      });
    }, 10);
    setTimeout(() => {
      if (this.kategori == 1) {
        this.kirimKatePeker = 'Fix Income';
      } else {
        this.kirimKatePeker = 'Non Fix Income';
      }
    }, 150);

    setTimeout(() => {
      this.dataEntryService.getListPendidikan().subscribe({
        next: data => {
          this.pendidikanModel = data.result;
        },
      });
    }, 170);

    setTimeout(() => {
      this.dataEntryService.getFetchListJumlahKaryawan().subscribe(data => {
        this.jumlahKaryawanModel = data.result;
      });
    }, 210);

    setTimeout(() => {
      this.dataEntryService.getFetchListJenisPekerjaan().subscribe(data => {
        this.listJabatan = data.result;
      });
    }, 220);

    setTimeout(() => {
      this.dataEntryService.getFetchListJabatan().subscribe(data => {
        this.refJabatanModel = data.result;
      });
    }, 230);

    setTimeout(() => {
      // ref Status Menikah
      this.dataCalonNasabah.getStatusPerkawinan().subscribe(data => {
        // console.warn('ref', data);
        if (data.code === 200) {
          this.refStatusPerkawinan = data.result;
        }
      });
    }, 250);

    setTimeout(() => {
      this.dataEntryService.getFetchListTipePekerjaan(this.kategori).subscribe(data => {
        this.getjenispekerjaandariapi = data.result;
      });
    }, 260);

    setTimeout(() => {
      this.ideFixServices.getBidang().subscribe(data => {
        this.getjenisbidangdariapi = data.result;
      });
    }, 270);

    setTimeout(() => {
      this.dataEntryService.getFetchTipePerusahaan().subscribe(data => {
        this.modelTipePerusahaan = data.result;
      });
    }, 280);

    setTimeout(() => {
      this.dataEntryService.getprovinsi().subscribe({
        next: data => {
          this.daWaprof = data.result;
        },
      });
    }, 290);

    setTimeout(() => {
      this.ideFixServices.getCustomer(this.paramId).subscribe({
        next: data => {
          this.modelIde = data.result.customer;
          const retriveIde = {
            nama: this.modelIde.nama,
            jenis_kelamin: this.modelIde.jenis_kelamin,
            tanggal_lahir: this.modelIde.tanggal_lahir,
            usia: this.modelIde.usia,
            tempat_lahir: this.modelIde.tempat_lahir,
            status_perkawinan: this.modelIde.status_perkawinan,
            agama: this.modelIde.agama,
            pendidikan: this.modelIde.pendidikan,
            kewarganegaraan: this.modelIde.kewarganegaraan,
            nama_ibu_kandung: this.modelIde.nama_ibu_kandung,
            npwp: this.modelIde.npwp,
            alamat_ktp: this.modelIde.alamat_ktp,
            provinsi: this.modelIde.provinsi,
            kabkota: this.modelIde.kabkota,
            kecamatan: this.modelIde.kecamatan,
            kelurahan: this.modelIde.kelurahan,
            kode_pos: this.modelIde.kode_pos,
            rt: this.modelIde.rt,
            rw: this.modelIde.rw,
            no_ktp: this.modelIde.no_ktp,
            tanggal_terbit_ktp: this.modelIde.tanggal_terbit_ktp,
            tanggal_exp_ktp: this.modelIde.tanggal_exp_ktp,
            status_ktp: this.modelIde.status_ktp,
            no_handphone: this.modelIde.no_handphone,

            // /////////////// Pasangan /////////////////////////////////
            nama_pasangan: this.modelIde.nama_pasangan,
            jenis_kelamin_pasangan: this.modelIde.jenis_kelamin_pasangan,
            tanggal_lahir_pasangan: this.modelIde.tanggal_lahir_pasangan,
            usia_pasangan: this.modelIde.usia_pasangan,
            tempat_lahir_pasangan: this.modelIde.tempat_lahir_pasangan,
            agama_pasangan: this.modelIde.agama_pasangan,
            pendidikan_pasangan: this.modelIde.pendidikan_pasangan,
            kewarganegaraan_pasangan: this.modelIde.kewarganegaraan_pasangan,
            nama_ibu_kandung_pasangan: this.modelIde.nama_ibu_kandung_pasangan,
            npwp_pasangan: this.modelIde.npwp_pasangan,
            status_alamat: this.modelIde.status_alamat,
            alamat_ktp_pasangan: this.modelIde.alamat_ktp_pasangan,
            provinsi_pasangan: this.modelIde.provinsi_pasangan,
            kabkota_pasangan: this.modelIde.kabkota_pasangan,
            kecamatan_pasangan: this.modelIde.kecamatan_pasangan,
            kelurahan_pasangan: this.modelIde.kelurahan_pasangan,
            kode_pos_pasangan: this.modelIde.kode_pos_pasangan,
            rt_pasangan: this.modelIde.rt_pasangan,
            rw_pasangan: this.modelIde.rw_pasangan,
            no_ktp_pasangan: this.modelIde.no_ktp_pasangan,
            tanggal_terbit_ktp_pasangan: this.modelIde.tanggal_terbit_ktp_pasangan,
            tanggal_exp_ktp_pasangan: this.modelIde.tanggal_exp_ktp_pasangan,
            status_ktp_pasangan: this.modelIde.status_ktp_pasangan,
            no_handphone_pasangan: this.modelIde.no_handphone_pasangan,
          };
          this.ideForm.setValue(retriveIde);

          setTimeout(() => {
            this.carimenggunakankodepost(this.modelIde.kode_pos);
            this.carimenggunakankodepostp(this.modelIde.kode_pos_pasangan);
          }, 300);

          setTimeout(() => {
            if (this.cekResultIde == 1) {
              this.app_no_ide = this.modelIde.app_no_ide;
              this.curef = this.modelIde.curef;
            }
          }, 500);

          setTimeout(() => {
            this.ideFixServices.getUploadSlik(this.app_no_ide, '22').subscribe({
              next: data => {
                this.isiUpload = data.result;
                if (data.result == '') {
                  this.resultUpload = 0;
                } else {
                  this.resultUpload = 1;
                }
              },
            });
          }, 600);

          setTimeout(() => {
            this.ideFixServices.getJobByCurefIDE(this.modelIde.curef).subscribe(data => {
              this.modelJob = data.result;
              // console.warn(data)

              // setTimeout(() => {
              if (data.result == null) {
                const retriveJob = {
                  nama_perusahaan: '',
                  tipe_perusahaan: '',
                  tipe_pekerjaan: '',
                  kepemilikan_perusahaan: '',
                  pemilik_usaha: '',
                  no_telepon: '',
                  jenis_bidang: '',
                  sektor_ekonomi: '',
                  alamat_perusahaan: '',
                  provinsi: '',
                  kabkota: '',
                  kecamatan: '',
                  kelurahan: '',
                  kode_pos: '',
                  rt: '',
                  rw: '',
                  jumlah_karyawan: '',
                  npwp: '',
                  lama_bekerja_bulan: '',
                  lama_bekerja_tahun: '',
                  no_siup: '',
                  barang_jasa: '',
                  posisi: '',
                  /////////////////////////////////////
                  nama_perusahaan_sebelum: '',
                  tipe_perusahaan_sebelum: '',
                  tipe_pekerjaan_sebelum: '',
                  alamat_pekerjaan_sebelum: '',
                  jenis_bidang_sebelum: '',
                  sektor_ekonomi_sebelum: '',
                  lama_bekerja_bulan_sebelum: '',
                  lama_bekerja_tahun_sebelum: '',
                };
                this.jobForm.setValue(retriveJob);
                this.getLoading(false);

                this.retriveBidang = '';
                this.retriveBidangSebelum = '';
                this.retriveSektor = '';
                this.retriveSektorSebelum = '';
              } else {
                const retriveJob = {
                  nama_perusahaan: this.modelJob.nama_perusahaan,
                  tipe_perusahaan: this.modelJob.tipe_perusahaan,
                  tipe_pekerjaan: this.modelJob.tipe_pekerjaan,
                  kepemilikan_perusahaan: this.modelJob.kepemilikan_perusahaan,
                  pemilik_usaha: this.modelJob.pemilik_usaha,
                  no_telepon: this.modelJob.no_telepon,
                  jenis_bidang: this.modelJob.jenis_bidang,
                  sektor_ekonomi: this.modelJob.sektor_ekonomi,
                  alamat_perusahaan: this.modelJob.alamat_perusahaan,
                  provinsi: this.modelJob.provinsi,
                  kabkota: this.modelJob.kabkota,
                  kecamatan: this.modelJob.kecamatan,
                  kelurahan: this.modelJob.kelurahan,
                  kode_pos: this.modelJob.kode_pos,
                  rt: this.modelJob.rt,
                  rw: this.modelJob.rw,
                  jumlah_karyawan: this.modelJob.jumlah_karyawan,
                  npwp: this.modelJob.npwp,
                  lama_bekerja_bulan: this.modelJob.lama_bekerja_bulan,
                  lama_bekerja_tahun: this.modelJob.lama_bekerja_tahun,
                  no_siup: this.modelJob.no_siup,
                  barang_jasa: this.modelJob.barang_jasa,
                  posisi: this.modelJob.posisi,
                  /////////////////////////////////////
                  nama_perusahaan_sebelum: this.modelJob.nama_perusahaan_sebelum,
                  tipe_perusahaan_sebelum: this.modelJob.tipe_perusahaan_sebelum,
                  tipe_pekerjaan_sebelum: this.modelJob.tipe_pekerjaan_sebelum,
                  alamat_pekerjaan_sebelum: this.modelJob.alamat_pekerjaan_sebelum,
                  jenis_bidang_sebelum: this.modelJob.jenis_bidang_sebelum,
                  sektor_ekonomi_sebelum: this.modelJob.sektor_ekonomi_sebelum,
                  lama_bekerja_bulan_sebelum: this.modelJob.lama_bekerja_bulan_sebelum,
                  lama_bekerja_tahun_sebelum: this.modelJob.lama_bekerja_tahun_sebelum,
                };
                this.jobForm.setValue(retriveJob);
                this.getLoading(false);

                this.retriveBidang = this.modelJob.jenis_bidang;
                this.retriveBidangSebelum = this.modelJob.jenis_bidang_sebelum;
                this.retriveSektor = this.modelJob.sektor_ekonomi;
                this.retriveSektorSebelum = this.modelJob.sektor_ekonomi_sebelum;
                setTimeout(() => {
                  this.cariPekerPost(this.modelJob.kode_pos);
                }, 100);
              }
              // }, 200);

              setTimeout(() => {
                if (this.cekResultIde == 0) {
                  this.ideFixServices.getIdeById().subscribe(data => {
                    this.app_no_ide = data.result;
                  });
                  this.ideFixServices.getIdeByCuref().subscribe(data => {
                    this.curef = data.result;
                  });
                } else {
                  this.app_no_ide = this.modelIde.app_no_ide;
                  this.curef = this.modelIde.curef;
                }
              }, 1000);
            });
            setTimeout(() => {
              this.submitBday(this.modelIde.tanggal_lahir);
              this.submitBdayp(this.modelIde.tanggal_lahir_pasangan);
            }, 2000);
          }, 1000);
        },
        error: err => {
          if (err.status) {
            this.getLoading(false);
          }
        },
      });
    }, 300);
    // setTimeout(() => {
    //   alert(this.modelJob.id);
    // }, 1000);

    // alert(this.cekResultIde)
  }

  gotoprescreaning(): void {
    const kirimPro = this.ideForm.get('provinsi')?.value.split('|');
    const kirimKota = this.ideForm.get('kabkota')?.value.split('|');
    const kirimKec = this.ideForm.get('kecamatan')?.value.split('|');
    const kirimKel = this.ideForm.get('kelurahan')?.value.split('|');
    // ////////////////////pasangan//////////////////////////////////
    if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
      this.kirimProPas = this.ideForm.get('provinsi_pasangan')?.value.split('|');
      this.kirimKotaPas = this.ideForm.get('kabkota_pasangan')?.value.split('|');
      this.kirimKecPas = this.ideForm.get('kecamatan_pasangan')?.value.split('|');
      this.kirimKelPas = this.ideForm.get('kelurahan_pasangan')?.value.split('|');
    } else {
      this.kirimProPas = '';
      this.kirimKotaPas = '';
      this.kirimKecPas = '';
      this.kirimKelPas = '';
    }

    Swal.fire({
      title: 'Apakah yakin ingin Memproses Data ini?',
      text: this.termAndCondition.value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Data Sudah Lengkap dan Valid!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Berhasil!', 'Data Berhasil diproses Ke Pre Screening.', 'success').then(data => {
          this.getLoading(true);
          if (this.kategori == 2) {
            this.sendProJob = this.jobForm.get('provinsi')?.value.split('|');
            this.sendKotaJob = this.jobForm.get('kabkota')?.value.split('|');
            this.sendKecJob = this.jobForm.get('kecamatan')?.value.split('|');
            this.sendKelJob = this.jobForm.get('kelurahan')?.value.split('|');
            const bidangJobNow = this.jobForm.get('jenis_bidang')?.value.split('|');
            const bidangJobSebelum = this.jobForm.get('jenis_bidang_sebelum')?.value.split('|');
            if (this.jobForm.get('jenis_bidang')?.value.indexOf('|') !== -1) {
              this.sendJenisBidang = bidangJobNow[1];
            } else {
              this.sendJenisBidang = this.jobForm.get('jenis_bidang')?.value;
            }
            if (this.jobForm.get('jenis_bidang_sebelum')?.value.indexOf('|') !== -1) {
              this.sendJenisBidangSebelum = bidangJobSebelum[1];
            } else {
              this.sendJenisBidangSebelum = this.jobForm.get('jenis_bidang_sebelum')?.value;
            }

            // if (this.cekResultIde == 0) {
            //   this.http
            //     .post<any>(this.baseUrl + 'v1/efos-ide/create_job_info', {
            //       alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
            //       alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
            //       barang_jasa: this.jobForm.get('barang_jasa')?.value,
            //       bulan_berdiri: '',
            //       bulan_berdiri_sebelum: '',
            //       created_by: this.sessionServices.retrieve('sessionUserName'),
            //       created_date: '',
            //       curef: this.curef,
            //       id: 0,
            //       jabatan: this.jobForm.get('posisi')?.value,
            //       jabatan_sebelum: this.jobForm.get('posisi_sebelum')?.value,
            //       jenis_bidang: this.sendJenisBidang,
            //       jenis_bidang_sebelum: this.sendJenisBidangSebelum,
            //       jenis_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
            //       jenis_pekerjaan_sebelum: this.jobForm.get('tipe_pekerjaan_sebelum')?.value,
            //       jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
            //       jumlah_karyawan_sebelum: '',
            //       kabkota: this.sendKotaJob[1],
            //       kabkota_sebelum: '',
            //       kategori_pekerjaan: 'Non Fix Income',
            //       kategori_pekerjaan_sebelum: '',
            //       kecamatan: this.sendKecJob[1],
            //       kecamatan_sebelum: '',
            //       kelurahan: this.sendKelJob[1],
            //       kelurahan_sebelum: '',
            //       kepemilikan_perusahaan: this.jobForm.get('kepemilikan_perusahaan')?.value,
            //       kode_pos: this.jobForm.get('kode_pos')?.value,
            //       kode_pos_sebelum: '',
            //       lama_bekerja_bulan: this.jobForm.get('lama_bekerja_bulan')?.value,
            //       lama_bekerja_bulan_sebelum: this.jobForm.get('lama_bekerja_bulan_sebelum')?.value,
            //       lama_bekerja_tahun: this.jobForm.get('lama_bekerja_tahun')?.value,
            //       lama_bekerja_tahun_sebelum: this.jobForm.get('lama_bekerja_tahun_sebelum')?.value,
            //       nama_perusahaan: this.jobForm.get('nama_perusahaan')?.value,
            //       nama_perusahaan_sebelum: this.jobForm.get('nama_perusahaan_sebelum')?.value,
            //       no_siup: this.jobForm.get('no_siup')?.value,
            //       no_telepon: this.jobForm.get('no_telepon')?.value,
            //       npwp: this.jobForm.get('npwp')?.value,
            //       payroll: '',
            //       payroll_sebelum: '',
            //       pemilik_usaha: this.jobForm.get('pemilik_usaha')?.value,
            //       pendapatan: '',
            //       pendapatan_lain: '',
            //       posisi: this.jobForm.get('posisi')?.value,
            //       posisi_sebelum: this.jobForm.get('posisi_sebelum')?.value,
            //       provinsi: this.sendProJob[1],
            //       provinsi_sebelum: '',
            //       rt: this.jobForm.get('rt')?.value,
            //       rt_sebelum: '',
            //       rw: this.jobForm.get('rw')?.value,
            //       rw_sebelum: '',
            //       sektor_ekonomi: this.jobForm.get('sektor_ekonomi')?.value,
            //       sektor_ekonomi_sebelum: this.jobForm.get('sektor_ekonomi_sebelum')?.value,
            //       status_active: '',
            //       tahun_berdiri: '',
            //       tahun_berdiri_sebelum: '',
            //       tipe_kepegawaian: '',
            //       tipe_kepegawaian_sebelum: '',
            //       tipe_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
            //       tipe_pekerjaan_sebelum: this.jobForm.get('tipe_pekerjaan_sebelum')?.value,
            //       tipe_perusahaan: this.jobForm.get('tipe_perusahaan')?.value,
            //       tipe_perusahaan_sebelum: this.jobForm.get('tipe_perusahaan_sebelum')?.value,
            //       total_pendapatan: '',
            //       tunjangan: '',
            //       umur_pensiun: '',
            //       umur_pensiun_sebelum: '',
            //     })
            //     .subscribe({
            //       next: data => {
            //         this.http
            //           .post<any>(this.baseUrl + 'v1/efos-ide/create_app_ide', {
            //             nama: this.ideForm.get('nama')?.value,
            //             nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
            //             kategori_pekerjaan: this.kirimKatePeker,
            //             curef: this.curef,
            //             jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
            //             jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
            //             usia: this.ideForm.get('usia')?.value,
            //             app_no_ide: this.app_no_ide,
            //             tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
            //             tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
            //             tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
            //             tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
            //             status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
            //             status_alamat: this.ideForm.get('status_alamat')?.value,
            //             status_kendaraan: '',
            //             status_ktp: this.ideForm.get('status_ktp')?.value,
            //             status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
            //             status_rumah: '',
            //             agama: this.ideForm.get('agama')?.value,
            //             agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
            //             pendidikan: this.ideForm.get('pendidikan')?.value,
            //             pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
            //             kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
            //             kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
            //             nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
            //             nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
            //             npwp: this.ideForm.get('npwp')?.value,
            //             npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
            //             alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            //             alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
            //             alamat_domisili: '',
            //             provinsi: kirimPro[1],
            //             provinsi_domisili: '',
            //             provinsi_pasangan: this.kirimProPas[1],
            //             kabkota: kirimKota[1],
            //             kabkota_domisili: '',
            //             kabkota_pasangan: this.kirimKotaPas[1],
            //             kecamatan: kirimKec[1],
            //             kecamatan_domisili: '',
            //             kecamatan_pasangan: this.kirimKecPas[1],
            //             kelurahan: kirimKel[1],
            //             kelurahan_domisili: '',
            //             kelurahan_pasangan: this.kirimKelPas[1],
            //             kode_pos: this.ideForm.get('kode_pos')?.value,
            //             kode_pos_domisili: '',
            //             kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
            //             lama_menetap: '',
            //             cabang: this.saveCabang,
            //             created_by: this.sessionServices.retrieve('sessionUserName'),
            //             created_date: '',
            //             email: '',
            //             email_pasangan: '',
            //             id: 0,
            //             jumlah_anak: '',
            //             rt: this.ideForm.get('rt')?.value,
            //             rt_domisili: '',
            //             rt_pasangan: this.ideForm.get('rw_pasangan')?.value,
            //             rw: this.ideForm.get('rw')?.value,
            //             rw_domisili: '',
            //             rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
            //             no_ktp: this.ideForm.get('no_ktp')?.value,
            //             no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
            //             tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
            //             tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
            //             tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
            //             tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
            //             tipe_kendaraan: '',
            //             no_handphone: this.ideForm.get('no_handphone')?.value,
            //             no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
            //             no_telepon: '',
            //             // updated_by: '',
            //             // updated_date: '',
            //             usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
            //           })
            //           .subscribe({
            //             next: data => {
            //               this.contohdata = data.result.id;
            //               this.app_no_ide = data.result.app_no_ide;
            //               this.paramtanggal_lahir = data.result.tanggal_lahir;

            //               this.router.navigate(['/hasilprescreening'], {
            //                 queryParams: {
            //                   kategori: this.kategori,
            //                   id: data.result.id,
            //                 },
            //               });
            //             },
            //           });
            //       },
            //       error: error => {
            //         // if (error.error.code == 400) {
            //         alert('Gagal Menyimpan Data');
            //         alert(error.error.message);
            //         // }
            //       },
            //     });
            // }
            // else {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-ide/update_job_info', {
                alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                barang_jasa: this.jobForm.get('barang_jasa')?.value,
                bulan_berdiri: '',
                bulan_berdiri_sebelum: '',
                created_by: '',
                created_date: '',
                curef: this.curef,
                id: this.modelJob.id,
                jabatan: this.jobForm.get('posisi')?.value,
                jabatan_sebelum: this.jobForm.get('posisi_sebelum')?.value,
                jenis_bidang: this.sendJenisBidang,
                jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                jenis_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
                jenis_pekerjaan_sebelum: '',
                jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                jumlah_karyawan_sebelum: '',
                kabkota: this.sendKotaJob[1],
                kabkota_sebelum: '',
                kategori_pekerjaan: 'Non Fix Income',
                kategori_pekerjaan_sebelum: '',
                kecamatan: this.sendKecJob[1],
                kecamatan_sebelum: '',
                kelurahan: this.sendKelJob[1],
                kelurahan_sebelum: '',
                kepemilikan_perusahaan: this.jobForm.get('kepemilikan_perusahaan')?.value,
                kode_pos: this.jobForm.get('kode_pos')?.value,
                kode_pos_sebelum: '',
                lama_bekerja_bulan: this.jobForm.get('lama_bekerja_bulan')?.value,
                lama_bekerja_bulan_sebelum: this.jobForm.get('lama_bekerja_bulan_sebelum')?.value,
                lama_bekerja_tahun: this.jobForm.get('lama_bekerja_tahun')?.value,
                lama_bekerja_tahun_sebelum: this.jobForm.get('lama_bekerja_tahun_sebelum')?.value,
                nama_perusahaan: this.jobForm.get('nama_perusahaan')?.value,
                nama_perusahaan_sebelum: this.jobForm.get('nama_perusahaan_sebelum')?.value,
                no_siup: this.jobForm.get('no_siup')?.value,
                no_telepon: this.jobForm.get('no_telepon')?.value,
                npwp: this.jobForm.get('npwp')?.value,
                payroll: '',
                payroll_sebelum: '',
                pemilik_usaha: this.jobForm.get('pemilik_usaha')?.value,
                pendapatan: '',
                pendapatan_lain: '',
                posisi: this.jobForm.get('posisi')?.value,
                posisi_sebelum: this.jobForm.get('posisi_sebelum')?.value,
                provinsi: this.sendProJob[1],
                provinsi_sebelum: '',
                rt: this.jobForm.get('rt')?.value,
                rt_sebelum: '',
                rw: this.jobForm.get('rw')?.value,
                rw_sebelum: '',
                sektor_ekonomi: this.jobForm.get('sektor_ekonomi')?.value,
                sektor_ekonomi_sebelum: this.jobForm.get('sektor_ekonomi_sebelum')?.value,
                status_active: '',
                tahun_berdiri: '',
                tahun_berdiri_sebelum: '',
                tipe_kepegawaian: '',
                tipe_kepegawaian_sebelum: '',
                tipe_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
                tipe_pekerjaan_sebelum: this.jobForm.get('tipe_pekerjaan_sebelum')?.value,
                tipe_perusahaan: this.jobForm.get('tipe_perusahaan')?.value,
                tipe_perusahaan_sebelum: this.jobForm.get('tipe_perusahaan_sebelum')?.value,
                total_pendapatan: '',
                tunjangan: '',
                umur_pensiun: '',
                umur_pensiun_sebelum: '',
              })
              .subscribe({
                next: data => {
                  if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide', {
                        agama: this.ideForm.get('agama')?.value,
                        agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
                        alamat_domisili: '',
                        alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                        alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
                        app_no_ide: this.app_no_ide,
                        cabang: this.saveCabang,
                        // created_by: '',
                        // created_date: '',
                        curef: this.curef,
                        email: '',
                        email_pasangan: '',
                        id: this.paramId,
                        jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                        jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
                        jumlah_anak: '',
                        kabkota: kirimKota[1],
                        kabkota_domisili: '',
                        kabkota_pasangan: this.kirimKotaPas[1],
                        kategori_pekerjaan: this.kirimKatePeker,
                        kecamatan: kirimKec[1],
                        kecamatan_domisili: '',
                        kecamatan_pasangan: this.kirimKecPas[1],
                        kelurahan: kirimKel[1],
                        kelurahan_domisili: '',
                        kelurahan_pasangan: this.kirimKelPas[1],
                        kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                        kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
                        kode_pos: this.ideForm.get('kode_pos')?.value,
                        kode_pos_domisili: '',
                        kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
                        lama_menetap: '',
                        nama: this.ideForm.get('nama')?.value,
                        nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                        nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
                        nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
                        no_handphone: this.ideForm.get('no_handphone')?.value,
                        no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
                        no_ktp: this.ideForm.get('no_ktp')?.value,
                        no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
                        no_telepon: '',
                        npwp: this.ideForm.get('npwp')?.value,
                        npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
                        pendidikan: this.ideForm.get('pendidikan')?.value,
                        pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
                        provinsi: kirimPro[1],
                        provinsi_domisili: '',
                        provinsi_pasangan: this.kirimProPas[1],
                        rt: this.ideForm.get('rt')?.value,
                        rt_domisili: '',
                        rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
                        rw: this.ideForm.get('rw')?.value,
                        rw_domisili: '',
                        rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
                        status_alamat: this.ideForm.get('status_alamat')?.value,
                        status_kendaraan: '',
                        status_ktp: this.ideForm.get('status_ktp')?.value,
                        status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
                        status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                        status_rumah: '',
                        tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                        tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
                        tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                        tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
                        tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                        tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
                        tipe_kendaraan: '',
                        updated_by: this.sessionServices.retrieve('sessionUserName'),
                        updated_date: '',
                        usia: this.ideForm.get('usia')?.value,
                        usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
                        tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                        tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
                      })
                      .subscribe({
                        next: data => {
                          this.getLoading(false);
                          this.contohdata = data.result.id;
                          this.app_no_ide = data.result.app_no_ide;
                          this.paramtanggal_lahir = data.result.tanggal_lahir;
                          this.router.navigate(['/hasilprescreening'], {
                            queryParams: {
                              kategori: this.kategori,
                              id: this.paramId,
                            },
                          });
                        },
                      });
                  } else {
                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide', {
                        agama: this.ideForm.get('agama')?.value,
                        agama_pasangan: '',
                        alamat_domisili: '',
                        alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                        alamat_ktp_pasangan: '',
                        app_no_ide: this.app_no_ide,
                        cabang: this.saveCabang,
                        // created_by: '',
                        // created_date: '',
                        curef: this.curef,
                        email: '',
                        email_pasangan: '',
                        id: this.paramId,
                        jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                        jenis_kelamin_pasangan: '',
                        jumlah_anak: '',
                        kabkota: kirimKota[1],
                        kabkota_domisili: '',
                        kabkota_pasangan: '',
                        kategori_pekerjaan: this.kirimKatePeker,
                        kecamatan: kirimKec[1],
                        kecamatan_domisili: '',
                        kecamatan_pasangan: this.kirimKecPas[1],
                        kelurahan: kirimKel[1],
                        kelurahan_domisili: '',
                        kelurahan_pasangan: this.kirimKelPas[1],
                        kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                        kewarganegaraan_pasangan: '',
                        kode_pos: this.ideForm.get('kode_pos')?.value,
                        kode_pos_domisili: '',
                        kode_pos_pasangan: '',
                        lama_menetap: '',
                        nama: this.ideForm.get('nama')?.value,
                        nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                        nama_ibu_kandung_pasangan: '',
                        nama_pasangan: '',
                        no_handphone: this.ideForm.get('no_handphone')?.value,
                        no_handphone_pasangan: '',
                        no_ktp: this.ideForm.get('no_ktp')?.value,
                        no_ktp_pasangan: '',
                        no_telepon: '',
                        npwp: this.ideForm.get('npwp')?.value,
                        npwp_pasangan: '',
                        pendidikan: this.ideForm.get('pendidikan')?.value,
                        pendidikan_pasangan: '',
                        provinsi: kirimPro[1],
                        provinsi_domisili: '',
                        provinsi_pasangan: '',
                        rt: this.ideForm.get('rt')?.value,
                        rt_domisili: '',
                        rt_pasangan: '',
                        rw: this.ideForm.get('rw')?.value,
                        rw_domisili: '',
                        rw_pasangan: '',
                        status_alamat: this.ideForm.get('status_alamat')?.value,
                        status_kendaraan: '',
                        status_ktp: this.ideForm.get('status_ktp')?.value,
                        status_ktp_pasangan: '',
                        status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                        status_rumah: '',
                        tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                        tanggal_exp_ktp_pasangan: '',
                        tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                        tanggal_terbit_ktp_pasangan: '',
                        tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                        tanggal_lahir_pasangan: '',
                        tipe_kendaraan: '',
                        updated_by: this.sessionServices.retrieve('sessionUserName'),
                        updated_date: '',
                        usia: this.ideForm.get('usia')?.value,
                        usia_pasangan: '',
                        tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                        tempat_lahir_pasangan: '',
                      })
                      .subscribe({
                        next: data => {
                          this.getLoading(false);
                          this.contohdata = data.result.id;
                          this.app_no_ide = data.result.app_no_ide;
                          this.paramtanggal_lahir = data.result.tanggal_lahir;
                          this.router.navigate(['/hasilprescreening'], {
                            queryParams: {
                              kategori: this.kategori,
                              id: this.paramId,
                            },
                          });
                        },
                      });
                  }
                },
                error: error => {
                  this.getLoading(false);
                  if (error.error.code == 400) {
                    alert('Gagal Menyimpan Data');
                    alert(error.error.message);
                  }
                },
              });
            // }
          } else {
            // if (this.cekResultIde == 0) {
            //   this.http
            //     .post<any>(this.baseUrl + 'v1/efos-ide/create_app_ide', {
            //       nama: this.ideForm.get('nama')?.value,
            //       nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
            //       kategori_pekerjaan: this.kirimKatePeker,
            //       curef: this.curef,
            //       jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
            //       jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
            //       usia: this.ideForm.get('usia')?.value,
            //       app_no_ide: this.app_no_ide,
            //       tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
            //       tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
            //       tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
            //       tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
            //       status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
            //       status_alamat: this.ideForm.get('status_alamat')?.value,
            //       status_kendaraan: '',
            //       status_ktp: this.ideForm.get('status_ktp')?.value,
            //       status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
            //       status_rumah: '',
            //       agama: this.ideForm.get('agama')?.value,
            //       agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
            //       pendidikan: this.ideForm.get('pendidikan')?.value,
            //       pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
            //       kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
            //       kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
            //       nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
            //       nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
            //       npwp: this.ideForm.get('npwp')?.value,
            //       npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
            //       alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            //       alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
            //       alamat_domisili: '',
            //       provinsi: kirimPro[1],
            //       provinsi_domisili: '',
            //       provinsi_pasangan: this.kirimProPas[1],
            //       kabkota: kirimKota[1],
            //       kabkota_domisili: '',
            //       kabkota_pasangan: this.kirimKotaPas[1],
            //       kecamatan: kirimKec[1],
            //       kecamatan_domisili: '',
            //       kecamatan_pasangan: this.kirimKecPas[1],
            //       kelurahan: kirimKel[1],
            //       kelurahan_domisili: '',
            //       kelurahan_pasangan: this.kirimKelPas[1],
            //       kode_pos: this.ideForm.get('kode_pos')?.value,
            //       kode_pos_domisili: '',
            //       kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
            //       lama_menetap: '',
            //       cabang: this.saveCabang,
            //       created_by: this.sessionServices.retrieve('sessionUserName'),
            //       created_date: '',
            //       email: '',
            //       email_pasangan: '',
            //       id: 0,
            //       jumlah_anak: '',
            //       rt: this.ideForm.get('rt')?.value,
            //       rt_domisili: '',
            //       rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
            //       rw: this.ideForm.get('rw')?.value,
            //       rw_domisili: '',
            //       rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
            //       no_ktp: this.ideForm.get('no_ktp')?.value,
            //       no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
            //       tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
            //       tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
            //       tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
            //       tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
            //       tipe_kendaraan: '',
            //       no_handphone: this.ideForm.get('no_handphone')?.value,
            //       no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
            //       no_telepon: '',
            //       // updated_by: '',
            //       // updated_date: '',
            //       usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
            //     })
            //     .subscribe({
            //       next: data => {
            //         this.contohdata = data.result.id;
            //         this.app_no_ide = data.result.app_no_ide;
            //         this.paramtanggal_lahir = data.result.tanggal_lahir;

            //         this.router.navigate(['/hasilprescreening'], {
            //           queryParams: {
            //             kategori: this.kategori,
            //             id: data.result.id,
            //           },
            //         });
            //       },
            //     });
            // } else {
            if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide', {
                  agama: this.ideForm.get('agama')?.value,
                  agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
                  alamat_domisili: '',
                  alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                  alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
                  app_no_ide: this.app_no_ide,
                  cabang: this.saveCabang,
                  // created_by: '',
                  // created_date: '',
                  curef: this.curef,
                  email: '',
                  email_pasangan: '',
                  id: this.paramId,
                  jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                  jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
                  jumlah_anak: '',
                  kabkota: kirimKota[1],
                  kabkota_domisili: '',
                  kabkota_pasangan: this.kirimKotaPas[1],
                  kategori_pekerjaan: this.kirimKatePeker,
                  kecamatan: kirimKec[1],
                  kecamatan_domisili: '',
                  kecamatan_pasangan: this.kirimKecPas[1],
                  kelurahan: kirimKel[1],
                  kelurahan_domisili: '',
                  kelurahan_pasangan: this.kirimKelPas[1],
                  kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                  kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
                  kode_pos: this.ideForm.get('kode_pos')?.value,
                  kode_pos_domisili: '',
                  kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
                  lama_menetap: '',
                  nama: this.ideForm.get('nama')?.value,
                  nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                  nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
                  nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
                  no_handphone: this.ideForm.get('no_handphone')?.value,
                  no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
                  no_ktp: this.ideForm.get('no_ktp')?.value,
                  no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
                  no_telepon: '',
                  npwp: this.ideForm.get('npwp')?.value,
                  npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
                  pendidikan: this.ideForm.get('pendidikan')?.value,
                  pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
                  provinsi: kirimPro[1],
                  provinsi_domisili: '',
                  provinsi_pasangan: this.kirimProPas[1],
                  rt: this.ideForm.get('rt')?.value,
                  rt_domisili: '',
                  rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
                  rw: this.ideForm.get('rw')?.value,
                  rw_domisili: '',
                  rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
                  status_alamat: this.ideForm.get('status_alamat')?.value,
                  status_kendaraan: '',
                  status_ktp: this.ideForm.get('status_ktp')?.value,
                  status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
                  status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                  status_rumah: '',
                  tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                  tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
                  tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                  tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
                  tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                  tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
                  tipe_kendaraan: '',
                  updated_by: this.sessionServices.retrieve('sessionUserName'),
                  updated_date: '',
                  usia: this.ideForm.get('usia')?.value,
                  usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
                  tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                  tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
                })
                .subscribe({
                  next: data => {
                    this.getLoading(false);
                    this.contohdata = data.result.id;
                    this.app_no_ide = data.result.app_no_ide;
                    this.paramtanggal_lahir = data.result.tanggal_lahir;

                    this.router.navigate(['/hasilprescreening'], {
                      queryParams: {
                        kategori: this.kategori,
                        id: this.paramId,
                      },
                    });
                  },
                });
            } else {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide', {
                  agama: this.ideForm.get('agama')?.value,
                  agama_pasangan: '',
                  alamat_domisili: '',
                  alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                  alamat_ktp_pasangan: '',
                  app_no_ide: this.app_no_ide,
                  cabang: this.saveCabang,
                  // created_by: '',
                  // created_date: '',
                  curef: this.curef,
                  email: '',
                  email_pasangan: '',
                  id: this.paramId,
                  jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                  jenis_kelamin_pasangan: '',
                  jumlah_anak: '',
                  kabkota: kirimKota[1],
                  kabkota_domisili: '',
                  kabkota_pasangan: '',
                  kategori_pekerjaan: this.kirimKatePeker,
                  kecamatan: kirimKec[1],
                  kecamatan_domisili: '',
                  kecamatan_pasangan: this.kirimKecPas[1],
                  kelurahan: kirimKel[1],
                  kelurahan_domisili: '',
                  kelurahan_pasangan: this.kirimKelPas[1],
                  kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                  kewarganegaraan_pasangan: '',
                  kode_pos: this.ideForm.get('kode_pos')?.value,
                  kode_pos_domisili: '',
                  kode_pos_pasangan: '',
                  lama_menetap: '',
                  nama: this.ideForm.get('nama')?.value,
                  nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                  nama_ibu_kandung_pasangan: '',
                  nama_pasangan: '',
                  no_handphone: this.ideForm.get('no_handphone')?.value,
                  no_handphone_pasangan: '',
                  no_ktp: this.ideForm.get('no_ktp')?.value,
                  no_ktp_pasangan: '',
                  no_telepon: '',
                  npwp: this.ideForm.get('npwp')?.value,
                  npwp_pasangan: '',
                  pendidikan: this.ideForm.get('pendidikan')?.value,
                  pendidikan_pasangan: '',
                  provinsi: kirimPro[1],
                  provinsi_domisili: '',
                  provinsi_pasangan: '',
                  rt: this.ideForm.get('rt')?.value,
                  rt_domisili: '',
                  rt_pasangan: '',
                  rw: this.ideForm.get('rw')?.value,
                  rw_domisili: '',
                  rw_pasangan: '',
                  status_alamat: this.ideForm.get('status_alamat')?.value,
                  status_kendaraan: '',
                  status_ktp: this.ideForm.get('status_ktp')?.value,
                  status_ktp_pasangan: '',
                  status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                  status_rumah: '',
                  tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                  tanggal_exp_ktp_pasangan: '',
                  tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                  tanggal_terbit_ktp_pasangan: '',
                  tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                  tanggal_lahir_pasangan: '',
                  tipe_kendaraan: '',
                  updated_by: this.sessionServices.retrieve('sessionUserName'),
                  updated_date: '',
                  usia: this.ideForm.get('usia')?.value,
                  usia_pasangan: '',
                  tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                  tempat_lahir_pasangan: '',
                })
                .subscribe({
                  next: data => {
                    this.getLoading(false);
                    this.contohdata = data.result.id;
                    this.app_no_ide = data.result.app_no_ide;
                    this.paramtanggal_lahir = data.result.tanggal_lahir;

                    this.router.navigate(['/hasilprescreening'], {
                      queryParams: {
                        kategori: this.kategori,
                        id: this.paramId,
                      },
                    });
                  },
                });
            }
            // }
          }
        });
      }
    });
  }

  gotodaftaraplikasiide(): void {
    const kirimPro = this.ideForm.get('provinsi')?.value.split('|');
    const kirimKota = this.ideForm.get('kabkota')?.value.split('|');
    const kirimKec = this.ideForm.get('kecamatan')?.value.split('|');
    const kirimKel = this.ideForm.get('kelurahan')?.value.split('|');
    // ////////////////////pasangan//////////////////////////////////
    if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
      this.kirimProPas = this.ideForm.get('provinsi_pasangan')?.value.split('|');
      this.kirimKotaPas = this.ideForm.get('kabkota_pasangan')?.value.split('|');
      this.kirimKecPas = this.ideForm.get('kecamatan_pasangan')?.value.split('|');
      this.kirimKelPas = this.ideForm.get('kelurahan_pasangan')?.value.split('|');
    } else {
      this.kirimProPas = '';
      this.kirimKotaPas = '';
      this.kirimKecPas = '';
      this.kirimKelPas = '';
    }

    if (this.kategori == 2) {
      this.sendProJob = this.jobForm.get('provinsi')?.value.split('|');
      this.sendKotaJob = this.jobForm.get('kabkota')?.value.split('|');
      this.sendKecJob = this.jobForm.get('kecamatan')?.value.split('|');
      this.sendKelJob = this.jobForm.get('kelurahan')?.value.split('|');
      const bidangJobNow = this.jobForm.get('jenis_bidang')?.value.split('|');
      const bidangJobSebelum = this.jobForm.get('jenis_bidang_sebelum')?.value.split('|');
      if (this.jobForm.get('jenis_bidang')?.value.indexOf('|') !== -1) {
        this.sendJenisBidang = bidangJobNow[1];
      } else {
        this.sendJenisBidang = this.jobForm.get('jenis_bidang')?.value;
      }
      if (this.jobForm.get('jenis_bidang_sebelum')?.value.indexOf('|') !== -1) {
        this.sendJenisBidangSebelum = bidangJobSebelum[1];
      } else {
        this.sendJenisBidangSebelum = this.jobForm.get('jenis_bidang_sebelum')?.value;
      }

      if (this.cekResultIde == 0) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ide/create_job_info', {
            alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
            alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
            barang_jasa: this.jobForm.get('barang_jasa')?.value,
            bulan_berdiri: '',
            bulan_berdiri_sebelum: '',
            created_by: this.sessionServices.retrieve('sessionUserName'),
            created_date: '',
            curef: this.curef,
            id: 0,
            jabatan: this.jobForm.get('posisi')?.value,
            jabatan_sebelum: this.jobForm.get('posisi_sebelum')?.value,
            jenis_bidang: this.sendJenisBidang,
            jenis_bidang_sebelum: this.sendJenisBidangSebelum,
            jenis_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
            jenis_pekerjaan_sebelum: this.jobForm.get('tipe_pekerjaan_sebelum')?.value,
            jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
            jumlah_karyawan_sebelum: '',
            kabkota: this.sendKotaJob[1],
            kabkota_sebelum: '',
            kategori_pekerjaan: 'Non Fix Income',
            kategori_pekerjaan_sebelum: '',
            kecamatan: this.sendKecJob[1],
            kecamatan_sebelum: '',
            kelurahan: this.sendKelJob[1],
            kelurahan_sebelum: '',
            kepemilikan_perusahaan: this.jobForm.get('kepemilikan_perusahaan')?.value,
            kode_pos: this.jobForm.get('kode_pos')?.value,
            kode_pos_sebelum: '',
            lama_bekerja_bulan: this.jobForm.get('lama_bekerja_bulan')?.value,
            lama_bekerja_bulan_sebelum: this.jobForm.get('lama_bekerja_bulan_sebelum')?.value,
            lama_bekerja_tahun: this.jobForm.get('lama_bekerja_tahun')?.value,
            lama_bekerja_tahun_sebelum: this.jobForm.get('lama_bekerja_tahun_sebelum')?.value,
            nama_perusahaan: this.jobForm.get('nama_perusahaan')?.value,
            nama_perusahaan_sebelum: this.jobForm.get('nama_perusahaan_sebelum')?.value,
            no_siup: this.jobForm.get('no_siup')?.value,
            no_telepon: this.jobForm.get('no_telepon')?.value,
            npwp: this.jobForm.get('npwp')?.value,
            payroll: '',
            payroll_sebelum: '',
            pemilik_usaha: this.jobForm.get('pemilik_usaha')?.value,
            pendapatan: '',
            pendapatan_lain: '',
            posisi: this.jobForm.get('posisi')?.value,
            posisi_sebelum: this.jobForm.get('posisi_sebelum')?.value,
            provinsi: this.sendProJob[1],
            provinsi_sebelum: '',
            rt: this.jobForm.get('rt')?.value,
            rt_sebelum: '',
            rw: this.jobForm.get('rw')?.value,
            rw_sebelum: '',
            sektor_ekonomi: this.jobForm.get('sektor_ekonomi')?.value,
            sektor_ekonomi_sebelum: this.jobForm.get('sektor_ekonomi_sebelum')?.value,
            status_active: '',
            tahun_berdiri: '',
            tahun_berdiri_sebelum: '',
            tipe_kepegawaian: '',
            tipe_kepegawaian_sebelum: '',
            tipe_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
            tipe_pekerjaan_sebelum: this.jobForm.get('tipe_pekerjaan_sebelum')?.value,
            tipe_perusahaan: this.jobForm.get('tipe_perusahaan')?.value,
            tipe_perusahaan_sebelum: this.jobForm.get('tipe_perusahaan_sebelum')?.value,
            total_pendapatan: '',
            tunjangan: '',
            umur_pensiun: '',
            umur_pensiun_sebelum: '',
          })
          .subscribe({
            next: data => {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-ide/create_app_ide_temp', {
                  nama: this.ideForm.get('nama')?.value,
                  nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
                  kategori_pekerjaan: this.kirimKatePeker,
                  curef: this.curef,
                  jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                  jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
                  usia: this.ideForm.get('usia')?.value,
                  app_no_ide: this.app_no_ide,
                  tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                  tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
                  tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                  tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
                  status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                  status_alamat: this.ideForm.get('status_alamat')?.value,
                  status_kendaraan: '',
                  status_ktp: this.ideForm.get('status_ktp')?.value,
                  status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
                  status_rumah: '',
                  agama: this.ideForm.get('agama')?.value,
                  agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
                  pendidikan: this.ideForm.get('pendidikan')?.value,
                  pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
                  kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                  kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
                  nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                  nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
                  npwp: this.ideForm.get('npwp')?.value,
                  npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
                  alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                  alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
                  alamat_domisili: '',
                  provinsi: kirimPro[1],
                  provinsi_domisili: '',
                  provinsi_pasangan: this.kirimProPas[1],
                  kabkota: kirimKota[1],
                  kabkota_domisili: '',
                  kabkota_pasangan: this.kirimKotaPas[1],
                  kecamatan: kirimKec[1],
                  kecamatan_domisili: '',
                  kecamatan_pasangan: this.kirimKecPas[1],
                  kelurahan: kirimKel[1],
                  kelurahan_domisili: '',
                  kelurahan_pasangan: this.kirimKelPas[1],
                  kode_pos: this.ideForm.get('kode_pos')?.value,
                  kode_pos_domisili: '',
                  kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
                  lama_menetap: '',
                  cabang: this.saveCabang,
                  created_by: this.sessionServices.retrieve('sessionUserName'),
                  created_date: '',
                  email: '',
                  email_pasangan: '',
                  id: 0,
                  jumlah_anak: '',
                  rt: this.ideForm.get('rt')?.value,
                  rt_domisili: '',
                  rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
                  rw: this.ideForm.get('rw')?.value,
                  rw_domisili: '',
                  rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
                  no_ktp: this.ideForm.get('no_ktp')?.value,
                  no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
                  tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                  tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
                  tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                  tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
                  tipe_kendaraan: '',
                  no_handphone: this.ideForm.get('no_handphone')?.value,
                  no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
                  no_telepon: '',
                  // updated_by: '',
                  // updated_date: '',
                  usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
                })
                .subscribe({
                  next: data => {
                    this.router.navigate(['/daftaraplikasiide']);
                    setTimeout(() => {
                      this.uploadDataUntukSlik(data.result.app_no_ide, data.result.curef);
                    }, 300);
                  },
                });
            },
            error: error => {
              // if (error.error.code == 400) {
              alert('Gagal Menyimpan Data');
              alert(error.error.message);
              // }
            },
          });
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ide/update_job_info', {
            alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
            alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
            barang_jasa: this.jobForm.get('barang_jasa')?.value,
            bulan_berdiri: '',
            bulan_berdiri_sebelum: '',
            created_by: '',
            created_date: '',
            curef: this.curef,
            id: this.modelJob.id,
            jabatan: this.jobForm.get('posisi')?.value,
            jabatan_sebelum: this.jobForm.get('posisi_sebelum')?.value,
            jenis_bidang: this.sendJenisBidang,
            jenis_bidang_sebelum: this.sendJenisBidangSebelum,
            jenis_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
            jenis_pekerjaan_sebelum: '',
            jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
            jumlah_karyawan_sebelum: '',
            kabkota: this.sendKotaJob[1],
            kabkota_sebelum: '',
            kategori_pekerjaan: this.kirimKatePeker,
            kategori_pekerjaan_sebelum: '',
            kecamatan: this.sendKecJob[1],
            kecamatan_sebelum: '',
            kelurahan: this.sendKelJob[1],
            kelurahan_sebelum: '',
            kepemilikan_perusahaan: this.jobForm.get('kepemilikan_perusahaan')?.value,
            kode_pos: this.jobForm.get('kode_pos')?.value,
            kode_pos_sebelum: '',
            lama_bekerja_bulan: this.jobForm.get('lama_bekerja_bulan')?.value,
            lama_bekerja_bulan_sebelum: this.jobForm.get('lama_bekerja_bulan_sebelum')?.value,
            lama_bekerja_tahun: this.jobForm.get('lama_bekerja_tahun')?.value,
            lama_bekerja_tahun_sebelum: this.jobForm.get('lama_bekerja_tahun_sebelum')?.value,
            nama_perusahaan: this.jobForm.get('nama_perusahaan')?.value,
            nama_perusahaan_sebelum: this.jobForm.get('nama_perusahaan_sebelum')?.value,
            no_siup: this.jobForm.get('no_siup')?.value,
            no_telepon: this.jobForm.get('no_telepon')?.value,
            npwp: this.jobForm.get('npwp')?.value,
            payroll: '',
            payroll_sebelum: '',
            pemilik_usaha: this.jobForm.get('pemilik_usaha')?.value,
            pendapatan: '',
            pendapatan_lain: '',
            posisi: this.jobForm.get('posisi')?.value,
            posisi_sebelum: this.jobForm.get('posisi_sebelum')?.value,
            provinsi: this.sendProJob[1],
            provinsi_sebelum: '',
            rt: this.jobForm.get('rt')?.value,
            rt_sebelum: '',
            rw: this.jobForm.get('rw')?.value,
            rw_sebelum: '',
            sektor_ekonomi: this.jobForm.get('sektor_ekonomi')?.value,
            sektor_ekonomi_sebelum: this.jobForm.get('sektor_ekonomi_sebelum')?.value,
            status_active: '',
            tahun_berdiri: '',
            tahun_berdiri_sebelum: '',
            tipe_kepegawaian: '',
            tipe_kepegawaian_sebelum: '',
            tipe_pekerjaan: this.jobForm.get('tipe_pekerjaan')?.value,
            tipe_pekerjaan_sebelum: this.jobForm.get('tipe_pekerjaan_sebelum')?.value,
            tipe_perusahaan: this.jobForm.get('tipe_perusahaan')?.value,
            tipe_perusahaan_sebelum: this.jobForm.get('tipe_perusahaan_sebelum')?.value,
            total_pendapatan: '',
            tunjangan: '',
            umur_pensiun: '',
            umur_pensiun_sebelum: '',
          })
          .subscribe({
            next: data => {
              if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
                this.http
                  .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide_temp', {
                    agama: this.ideForm.get('agama')?.value,
                    agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
                    alamat_domisili: '',
                    alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                    alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
                    app_no_ide: this.app_no_ide,
                    cabang: this.saveCabang,
                    // created_by: '',
                    // created_date: '',
                    curef: this.curef,
                    email: '',
                    email_pasangan: '',
                    id: this.paramId,
                    jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                    jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
                    jumlah_anak: '',
                    kabkota: kirimKota[1],
                    kabkota_domisili: '',
                    kabkota_pasangan: this.kirimKotaPas[1],
                    kategori_pekerjaan: this.kirimKatePeker,
                    kecamatan: kirimKec[1],
                    kecamatan_domisili: '',
                    kecamatan_pasangan: this.kirimKecPas[1],
                    kelurahan: kirimKel[1],
                    kelurahan_domisili: '',
                    kelurahan_pasangan: this.kirimKelPas[1],
                    kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                    kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
                    kode_pos: this.ideForm.get('kode_pos')?.value,
                    kode_pos_domisili: '',
                    kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
                    lama_menetap: '',
                    nama: this.ideForm.get('nama')?.value,
                    nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                    nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
                    nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
                    no_handphone: this.ideForm.get('no_handphone')?.value,
                    no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
                    no_ktp: this.ideForm.get('no_ktp')?.value,
                    no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
                    no_telepon: '',
                    npwp: this.ideForm.get('npwp')?.value,
                    npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
                    pendidikan: this.ideForm.get('pendidikan')?.value,
                    pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
                    provinsi: kirimPro[1],
                    provinsi_domisili: '',
                    provinsi_pasangan: this.kirimProPas[1],
                    rt: this.ideForm.get('rt')?.value,
                    rt_domisili: '',
                    rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
                    rw: this.ideForm.get('rw')?.value,
                    rw_domisili: '',
                    rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
                    status_alamat: this.ideForm.get('status_alamat')?.value,
                    status_kendaraan: '',
                    status_ktp: this.ideForm.get('status_ktp')?.value,
                    status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
                    status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                    status_rumah: '',
                    tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                    tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
                    tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                    tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
                    tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                    tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
                    tipe_kendaraan: '',
                    updated_by: this.sessionServices.retrieve('sessionUserName'),
                    updated_date: '',
                    usia: this.ideForm.get('usia')?.value,
                    usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
                    tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                    tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
                  })
                  .subscribe({
                    next: data => {
                      this.router.navigate(['/daftaraplikasiide']);
                      setTimeout(() => {
                        this.uploadDataUntukSlik(data.result.app_no_ide, data.result.curef);
                      }, 300);
                    },
                  });
              } else {
                this.http
                  .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide_temp', {
                    agama: this.ideForm.get('agama')?.value,
                    agama_pasangan: '',
                    alamat_domisili: '',
                    alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
                    alamat_ktp_pasangan: '',
                    app_no_ide: this.app_no_ide,
                    cabang: this.saveCabang,
                    // created_by: '',
                    // created_date: '',
                    curef: this.curef,
                    email: '',
                    email_pasangan: '',
                    id: this.paramId,
                    jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
                    jenis_kelamin_pasangan: '',
                    jumlah_anak: '',
                    kabkota: kirimKota[1],
                    kabkota_domisili: '',
                    kabkota_pasangan: '',
                    kategori_pekerjaan: this.kirimKatePeker,
                    kecamatan: kirimKec[1],
                    kecamatan_domisili: '',
                    kecamatan_pasangan: this.kirimKecPas[1],
                    kelurahan: kirimKel[1],
                    kelurahan_domisili: '',
                    kelurahan_pasangan: this.kirimKelPas[1],
                    kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
                    kewarganegaraan_pasangan: '',
                    kode_pos: this.ideForm.get('kode_pos')?.value,
                    kode_pos_domisili: '',
                    kode_pos_pasangan: '',
                    lama_menetap: '',
                    nama: this.ideForm.get('nama')?.value,
                    nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
                    nama_ibu_kandung_pasangan: '',
                    nama_pasangan: '',
                    no_handphone: this.ideForm.get('no_handphone')?.value,
                    no_handphone_pasangan: '',
                    no_ktp: this.ideForm.get('no_ktp')?.value,
                    no_ktp_pasangan: '',
                    no_telepon: '',
                    npwp: this.ideForm.get('npwp')?.value,
                    npwp_pasangan: '',
                    pendidikan: this.ideForm.get('pendidikan')?.value,
                    pendidikan_pasangan: '',
                    provinsi: kirimPro[1],
                    provinsi_domisili: '',
                    provinsi_pasangan: '',
                    rt: this.ideForm.get('rt')?.value,
                    rt_domisili: '',
                    rt_pasangan: '',
                    rw: this.ideForm.get('rw')?.value,
                    rw_domisili: '',
                    rw_pasangan: '',
                    status_alamat: this.ideForm.get('status_alamat')?.value,
                    status_kendaraan: '',
                    status_ktp: this.ideForm.get('status_ktp')?.value,
                    status_ktp_pasangan: '',
                    status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
                    status_rumah: '',
                    tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
                    tanggal_exp_ktp_pasangan: '',
                    tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
                    tanggal_terbit_ktp_pasangan: '',
                    tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
                    tanggal_lahir_pasangan: '',
                    tipe_kendaraan: '',
                    updated_by: this.sessionServices.retrieve('sessionUserName'),
                    updated_date: '',
                    usia: this.ideForm.get('usia')?.value,
                    usia_pasangan: '',
                    tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
                    tempat_lahir_pasangan: '',
                  })
                  .subscribe({
                    next: data => {
                      this.router.navigate(['/daftaraplikasiide']);
                      setTimeout(() => {
                        this.uploadDataUntukSlik(data.result.app_no_ide, data.result.curef);
                      }, 300);
                    },
                  });
              }
            },
            error: error => {
              if (error.error.code == 400) {
                alert('Gagal Menyimpan Data');
                alert(error.error.message);
              }
            },
          });
      }
    } else {
      if (this.cekResultIde == 0) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ide/create_app_ide_temp', {
            nama: this.ideForm.get('nama')?.value,
            nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
            kategori_pekerjaan: this.kirimKatePeker,
            curef: this.curef,
            jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
            jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
            usia: this.ideForm.get('usia')?.value,
            app_no_ide: this.app_no_ide,
            tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
            tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
            tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
            tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
            status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
            status_alamat: this.ideForm.get('status_alamat')?.value,
            status_kendaraan: '',
            status_ktp: this.ideForm.get('status_ktp')?.value,
            status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
            status_rumah: '',
            agama: this.ideForm.get('agama')?.value,
            agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
            pendidikan: this.ideForm.get('pendidikan')?.value,
            pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
            kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
            kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
            nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
            nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
            npwp: this.ideForm.get('npwp')?.value,
            npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
            alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
            alamat_domisili: '',
            provinsi: kirimPro[1],
            provinsi_domisili: '',
            provinsi_pasangan: this.kirimProPas[1],
            kabkota: kirimKota[1],
            kabkota_domisili: '',
            kabkota_pasangan: this.kirimKotaPas[1],
            kecamatan: kirimKec[1],
            kecamatan_domisili: '',
            kecamatan_pasangan: this.kirimKecPas[1],
            kelurahan: kirimKel[1],
            kelurahan_domisili: '',
            kelurahan_pasangan: this.kirimKelPas[1],
            kode_pos: this.ideForm.get('kode_pos')?.value,
            kode_pos_domisili: '',
            kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
            lama_menetap: '',
            cabang: this.saveCabang,
            created_by: this.sessionServices.retrieve('sessionUserName'),
            created_date: '',
            email: '',
            email_pasangan: '',
            id: 0,
            jumlah_anak: '',
            rt: this.ideForm.get('rt')?.value,
            rt_domisili: '',
            rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
            rw: this.ideForm.get('rw')?.value,
            rw_domisili: '',
            rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
            no_ktp: this.ideForm.get('no_ktp')?.value,
            no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
            tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
            tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
            tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
            tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
            tipe_kendaraan: '',
            no_handphone: this.ideForm.get('no_handphone')?.value,
            no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
            no_telepon: '',
            // updated_by: '',
            // updated_date: '',
            usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
          })
          .subscribe({
            next: data => {
              this.router.navigate(['/daftaraplikasiide']);
              setTimeout(() => {
                this.uploadDataUntukSlik(data.result.app_no_ide, data.result.curef);
              }, 300);
            },
          });
      } else {
        if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide_temp', {
              agama: this.ideForm.get('agama')?.value,
              agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
              alamat_domisili: '',
              alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
              alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
              app_no_ide: this.app_no_ide,
              cabang: this.saveCabang,
              // created_by: '',
              // created_date: '',
              curef: this.curef,
              email: '',
              email_pasangan: '',
              id: this.paramId,
              jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
              jenis_kelamin_pasangan: this.ideForm.get('jenis_kelamin_pasangan')?.value,
              jumlah_anak: '',
              kabkota: kirimKota[1],
              kabkota_domisili: '',
              kabkota_pasangan: this.kirimKotaPas[1],
              kategori_pekerjaan: this.kirimKatePeker,
              kecamatan: kirimKec[1],
              kecamatan_domisili: '',
              kecamatan_pasangan: this.kirimKecPas[1],
              kelurahan: kirimKel[1],
              kelurahan_domisili: '',
              kelurahan_pasangan: this.kirimKelPas[1],
              kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
              kewarganegaraan_pasangan: this.ideForm.get('kewarganegaraan_pasangan')?.value,
              kode_pos: this.ideForm.get('kode_pos')?.value,
              kode_pos_domisili: '',
              kode_pos_pasangan: this.ideForm.get('kode_pos_pasangan')?.value,
              lama_menetap: '',
              nama: this.ideForm.get('nama')?.value,
              nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
              nama_ibu_kandung_pasangan: this.ideForm.get('nama_ibu_kandung_pasangan')?.value,
              nama_pasangan: this.ideForm.get('nama_pasangan')?.value,
              no_handphone: this.ideForm.get('no_handphone')?.value,
              no_handphone_pasangan: this.ideForm.get('no_handphone_pasangan')?.value,
              no_ktp: this.ideForm.get('no_ktp')?.value,
              no_ktp_pasangan: this.ideForm.get('no_ktp_pasangan')?.value,
              no_telepon: '',
              npwp: this.ideForm.get('npwp')?.value,
              npwp_pasangan: this.ideForm.get('npwp_pasangan')?.value,
              pendidikan: this.ideForm.get('pendidikan')?.value,
              pendidikan_pasangan: this.ideForm.get('pendidikan_pasangan')?.value,
              provinsi: kirimPro[1],
              provinsi_domisili: '',
              provinsi_pasangan: this.kirimProPas[1],
              rt: this.ideForm.get('rt')?.value,
              rt_domisili: '',
              rt_pasangan: this.ideForm.get('rt_pasangan')?.value,
              rw: this.ideForm.get('rw')?.value,
              rw_domisili: '',
              rw_pasangan: this.ideForm.get('rw_pasangan')?.value,
              status_alamat: this.ideForm.get('status_alamat')?.value,
              status_kendaraan: '',
              status_ktp: this.ideForm.get('status_ktp')?.value,
              status_ktp_pasangan: this.ideForm.get('status_ktp_pasangan')?.value,
              status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
              status_rumah: '',
              tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
              tanggal_exp_ktp_pasangan: this.ideForm.get('tanggal_exp_ktp_pasangan')?.value,
              tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
              tanggal_terbit_ktp_pasangan: this.ideForm.get('tanggal_terbit_ktp_pasangan')?.value,
              tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
              tanggal_lahir_pasangan: this.ideForm.get('tanggal_lahir_pasangan')?.value,
              tipe_kendaraan: '',
              updated_by: this.sessionServices.retrieve('sessionUserName'),
              updated_date: '',
              usia: this.ideForm.get('usia')?.value,
              usia_pasangan: this.ideForm.get('usia_pasangan')?.value,
              tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
              tempat_lahir_pasangan: this.ideForm.get('tempat_lahir_pasangan')?.value,
            })
            .subscribe({
              next: data => {
                this.router.navigate(['/daftaraplikasiide']);
                setTimeout(() => {
                  this.uploadDataUntukSlik(data.result.app_no_ide, data.result.curef);
                }, 300);
              },
            });
        } else {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-ide/update_app_ide_temp', {
              agama: this.ideForm.get('agama')?.value,
              agama_pasangan: '',
              alamat_domisili: '',
              alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
              alamat_ktp_pasangan: '',
              app_no_ide: this.app_no_ide,
              cabang: this.saveCabang,
              // created_by: '',
              // created_date: '',
              curef: this.curef,
              email: '',
              email_pasangan: '',
              id: this.paramId,
              jenis_kelamin: this.ideForm.get('jenis_kelamin')?.value,
              jenis_kelamin_pasangan: '',
              jumlah_anak: '',
              kabkota: kirimKota[1],
              kabkota_domisili: '',
              kabkota_pasangan: '',
              kategori_pekerjaan: this.kirimKatePeker,
              kecamatan: kirimKec[1],
              kecamatan_domisili: '',
              kecamatan_pasangan: this.kirimKecPas[1],
              kelurahan: kirimKel[1],
              kelurahan_domisili: '',
              kelurahan_pasangan: this.kirimKelPas[1],
              kewarganegaraan: this.ideForm.get('kewarganegaraan')?.value,
              kewarganegaraan_pasangan: '',
              kode_pos: this.ideForm.get('kode_pos')?.value,
              kode_pos_domisili: '',
              kode_pos_pasangan: '',
              lama_menetap: '',
              nama: this.ideForm.get('nama')?.value,
              nama_ibu_kandung: this.ideForm.get('nama_ibu_kandung')?.value,
              nama_ibu_kandung_pasangan: '',
              nama_pasangan: '',
              no_handphone: this.ideForm.get('no_handphone')?.value,
              no_handphone_pasangan: '',
              no_ktp: this.ideForm.get('no_ktp')?.value,
              no_ktp_pasangan: '',
              no_telepon: '',
              npwp: this.ideForm.get('npwp')?.value,
              npwp_pasangan: '',
              pendidikan: this.ideForm.get('pendidikan')?.value,
              pendidikan_pasangan: '',
              provinsi: kirimPro[1],
              provinsi_domisili: '',
              provinsi_pasangan: '',
              rt: this.ideForm.get('rt')?.value,
              rt_domisili: '',
              rt_pasangan: '',
              rw: this.ideForm.get('rw')?.value,
              rw_domisili: '',
              rw_pasangan: '',
              status_alamat: this.ideForm.get('status_alamat')?.value,
              status_kendaraan: '',
              status_ktp: this.ideForm.get('status_ktp')?.value,
              status_ktp_pasangan: '',
              status_perkawinan: this.ideForm.get('status_perkawinan')?.value,
              status_rumah: '',
              tanggal_exp_ktp: this.ideForm.get('tanggal_exp_ktp')?.value,
              tanggal_exp_ktp_pasangan: '',
              tanggal_terbit_ktp: this.ideForm.get('tanggal_terbit_ktp')?.value,
              tanggal_terbit_ktp_pasangan: '',
              tanggal_lahir: this.ideForm.get('tanggal_lahir')?.value,
              tanggal_lahir_pasangan: '',
              tipe_kendaraan: '',
              updated_by: this.sessionServices.retrieve('sessionUserName'),
              updated_date: '',
              usia: this.ideForm.get('usia')?.value,
              usia_pasangan: '',
              tempat_lahir: this.ideForm.get('tempat_lahir')?.value,
              tempat_lahir_pasangan: '',
            })
            .subscribe({
              next: data => {
                this.router.navigate(['/daftaraplikasiide']);
                setTimeout(() => {
                  this.uploadDataUntukSlik(data.result.app_no_ide, data.result.curef);
                }, 300);
              },
            });
        }
      }
    }
  }

  onChangeD(value: any) {
    const valueProv = value.split('|');
    this.dataEntryService.getkabkota(valueProv[0]).subscribe({
      next: data => {
        this.daWakotaD = data.result;
        this.ideForm.get('kabkota_pasangan')?.setValue(this.untukKodeKobkotaD + '|' + this.untukkobkotaD);
      },
    });
  }

  onChangekotaD(value: any) {
    const valueKota = value.split('|');
    this.dataEntryService.getkecamatan(valueKota[0]).subscribe({
      next: data => {
        this.kecamatanD = data.result;
        this.ideForm.get('kecamatan_pasangan')?.setValue(this.untukKodeKecamatanD + '|' + this.untukkecamatanD);
      },
    });
  }

  onChangekecamatanD(value: any) {
    const valueKecamatan = value.split('|');
    this.dataEntryService.getkelurahan(valueKecamatan[0]).subscribe({
      next: data => {
        this.kelurahanD = data.result;
        this.ideForm.get('kelurahan_pasangan')?.setValue(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
      },
    });
  }

  onChangekelurahanD(value: any) {
    const datakodepos = value.split('|');
    this.ideForm.get('kode_pos_pasangan')?.setValue(datakodepos[0]);
  }

  onChange(value: any) {
    const valueProv = value.split('|');
    this.dataEntryService.getkabkota(valueProv[0]).subscribe({
      next: data => {
        this.daWakota = data.result;
        this.ideForm.get('kabkota')?.setValue(this.untukKodeKobkota + '|' + this.untukkobkota);
      },
    });
  }

  onChangekota(value: any) {
    const valueKota = value.split('|');
    this.dataEntryService.getkecamatan(valueKota[0]).subscribe({
      next: data => {
        this.kecamatan = data.result;
        this.ideForm.get('kecamatan')?.setValue(this.untukKodeKecamatan + '|' + this.untukkecamatan);
      },
    });
  }

  onChangekecamatan(value: any) {
    const valueKecamatan = value.split('|');
    this.dataEntryService.getkelurahan(valueKecamatan[0]).subscribe({
      next: data => {
        this.kelurahan = data.result;
        this.ideForm.get('kelurahan')?.setValue(this.untukKodeKelurahan + '|' + this.untukkelurahan);
      },
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.ideForm.get('kode_pos')?.setValue(datakodepos[0]);
  }

  carimenggunakankodepost(kodepost: any) {
    this.dataEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        if (this.clickKdPostLajang == 1) {
          this.responseKels = sukses.result.kels;
          this.responseKels.forEach(element => {
            this.responseKels.push(element);
            if (element.kdPos == kodepost) {
              let namaWIl = element.namaWilayah;
              this.responseNamaWilayah.push(namaWIl);
            }
          });
        }
        this.untukKodeProvinsi = sukses.result.provKec.kd_prov;
        this.untukKodeKobkota = sukses.result.provKec.kd_kota;
        this.untukKodeKecamatan = sukses.result.provKec.kd_kec;
        this.untukprovinsi = sukses.result.provKec.nm_prov;
        this.untukkobkota = sukses.result.provKec.nm_kota;
        this.untukkecamatan = sukses.result.provKec.nm_kec;
        setTimeout(() => {
          if (this.clickKdPostLajang == 1) {
            if (sukses.result.kels == null) {
              this.untukKodeKelurahan = kodepost;
              this.untukkelurahan = '';
              this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
            } else if (sukses.result.provKec.kd_kel == null) {
              this.untukKodeKelurahan = kodepost;
              this.untukkelurahan = this.responseNamaWilayah[this.responseNamaWilayah.length - 1];
              this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
            } else {
              // alert('3');
              this.untukKodeKelurahan = kodepost;
              this.untukkelurahan = sukses.result.provKec.nm_kel;
              this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
            }
          } else {
            // alert('no clik')
            this.untukKodeKelurahan = kodepost;
            this.untukkelurahan = this.modelIde.kelurahan;
            this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
          }
        }, 10);
        this.ideForm.get('provinsi')?.setValue(this.untukKodeProvinsi + '|' + this.untukprovinsi);
        this.onChange(this.untukKodeProvinsi + '|' + this.untukprovinsi);
        this.onChangekota(this.untukKodeKobkota + '|' + this.untukkobkota);
        this.onChangekecamatan(this.untukKodeKecamatan + '|' + this.untukkecamatan);
      },
    });
  }

  carimenggunakankodepostp(kodepost: any) {
    this.dataEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        if (this.clickKdPostMenikah == 1) {
          this.responseKelsMenikah = sukses.result.kels;
          this.responseKelsMenikah.forEach(element => {
            this.responseKelsMenikah.push(element);
            if (element.kdPos == kodepost) {
              let namaWIl = element.namaWilayah;
              this.responseNamaWilayahMenikah.push(namaWIl);
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
          if (this.clickKdPostMenikah == 1) {
            if (sukses.result.kels == null) {
              this.untukKodeKelurahanD = kodepost;
              this.untukkelurahanD = '';
              this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
            } else if (sukses.result.provKec.kd_kel == null) {
              this.untukKodeKelurahanD = kodepost;
              this.untukkelurahanD = this.responseNamaWilayahMenikah[this.responseNamaWilayahMenikah.length - 1];
              this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
            } else {
              this.untukKodeKelurahanD = kodepost;
              this.untukkelurahanD = sukses.result.provKec.nm_kel;
              this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
            }
          } else {
            this.untukKodeKelurahanD = kodepost;
            this.untukkelurahanD = this.modelIde.kelurahan_pasangan;
            this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
          }
        }, 10);
        this.ideForm.get('provinsi_pasangan')?.setValue(this.untukKodeProvinsiD + '|' + this.untukprovinsiD);
        this.onChangeD(this.untukKodeProvinsiD + '|' + this.untukprovinsiD);
        this.onChangekotaD(this.untukKodeKobkotaD + '|' + this.untukkobkotaD);
        this.onChangekecamatanD(this.untukKodeKecamatanD + '|' + this.untukkecamatanD);
      },
    });
  }

  submitBday(tanggal: any) {
    let Q4A = '';
    let Bdate = tanggal;
    let Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    this.ideForm.get('usia')?.setValue(Q4A);

    setTimeout(() => {
      if (
        (this.ideForm.get('status_perkawinan')?.value === 'Lajang' && this.ideForm.get('usia')?.value < 21) ||
        (this.ideForm.get('status_perkawinan')?.value === '' && this.ideForm.get('usia')?.value < 21)
      ) {
        alert('Usia Minimal 21 Tahun');
      } else if (this.ideForm.get('status_perkawinan')?.value === 'Menikah' && this.ideForm.get('usia')?.value < 18) {
        alert('Usia Minimal 18 Tahun');
      }
    }, 100);
  }

  submitBdayp(tanggal: any) {
    let Q4A = '';
    let Bdate = tanggal;
    let Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    this.ideForm.get('usia_pasangan')?.setValue(Q4A);

    setTimeout(() => {
      if (this.ideForm.get('status_perkawinan')?.value === 'Menikah' && this.ideForm.get('usia_pasangan')?.value < 18) {
        alert('Usia Minimal 18 Tahun');
      }
    }, 100);
  }

  jenisbidangselect(value: any) {
    const sektor = value.split('|');
    this.ideFixServices.getSektor(sektor[0]).subscribe(data => {
      this.getdatasektorekonomi = data.result;
    });
  }
  provPeker(value: any) {
    const valueProv = value.split('|');
    this.dataEntryService.getkabkota(valueProv[0]).subscribe({
      next: data => {
        this.kotaChangeJob = data.result;
        this.jobForm.get('kabkota')?.setValue(this.kdKotaJob + '|' + this.kotaJob);
      },
    });
  }
  kotaPeker(value: any) {
    const valueKota = value.split('|');
    this.dataEntryService.getkecamatan(valueKota[0]).subscribe({
      next: data => {
        this.kecChangeJob = data.result;
        this.jobForm.get('kecamatan')?.setValue(this.kdKecJob + '|' + this.kecJob);
      },
    });
  }
  kecPeker(value: any) {
    const valueKecamatan = value.split('|');
    this.dataEntryService.getkelurahan(valueKecamatan[0]).subscribe({
      next: data => {
        this.kelChangeJob = data.result;
        this.jobForm.get('kelurahan')?.setValue(this.kdKelJob + '|' + this.kelJob);
      },
    });
  }
  kelPeker(value: any) {
    const datakodepos = value.split('|');
    this.jobForm.get('kode_pos')?.setValue(datakodepos[0]);
  }
  cariPekerPost(kodepost: any) {
    this.dataEntryService.getKdpost(kodepost).subscribe({
      next: sukses => {
        if (this.clickKdPostJob == 1) {
          this.responseKelsJob = sukses.result.kels;
          this.responseKelsJob.forEach(element => {
            this.responseKelsJob.push(element);
            if (element.kdPos == kodepost) {
              let namaWIl = element.namaWilayah;
              this.responseNamaWilayahJob.push(namaWIl);
            }
          });
        }
        this.kdProJob = sukses.result.provKec.kd_prov;
        this.kdKotaJob = sukses.result.provKec.kd_kota;
        this.kdKecJob = sukses.result.provKec.kd_kec;
        this.proJob = sukses.result.provKec.nm_prov;
        this.kotaJob = sukses.result.provKec.nm_kota;
        this.kecJob = sukses.result.provKec.nm_kec;
        // console.warn(sukses);
        setTimeout(() => {
          if (this.clickKdPostJob == 1) {
            if (sukses.result.kels == null) {
              this.kdKelJob = kodepost;
              this.kelJob = '';
              this.kelPeker(this.kdKelJob + '|' + this.kelJob);
            } else if (sukses.result.provKec.kd_kel == null) {
              this.kdKelJob = kodepost;
              this.kelJob = this.responseNamaWilayahJob[this.responseNamaWilayahJob.length - 1];
              this.kelPeker(this.kdKelJob + '|' + this.kelJob);
            } else {
              this.kdKelJob = kodepost;
              this.kelJob = sukses.result.provKec.nm_kel;
              this.kelPeker(this.kdKelJob + '|' + this.kelJob);
            }
          } else {
            this.kdKelJob = kodepost;
            this.kelJob = this.modelJob.kelurahan;
            this.kelPeker(this.kdKelJob + '|' + this.kelJob);
          }
        }, 10);
        this.jobForm.get('provinsi')?.setValue(this.kdProJob + '|' + this.proJob);
        this.provPeker(this.kdProJob + '|' + this.proJob);
        this.kotaPeker(this.kdKotaJob + '|' + this.kotaJob);
        this.kecPeker(this.kdKecJob + '|' + this.kecJob);
      },
    });
  }
  jenisbidangselectsebelum(value: any) {
    const sektor = value.split('|');
    this.ideFixServices.getSektor(sektor[0]).subscribe(data => {
      this.getdatasektorekonomiSebelum = data.result;
    });
  }
  changeJenis(value: string | undefined) {
    if (value === 'Laki-laki') {
      this.ideForm.get('jenis_kelamin_pasangan')?.setValue('Perempuan');
    } else {
      this.ideForm.get('jenis_kelamin_pasangan')?.setValue('Laki-laki');
    }
  }
  onItemChange(event: any) {
    // alert(event.value)
    if (event.value == 1) {
      this.ideForm.get('alamat_ktp_pasangan')?.setValue(this.ideForm.get('alamat_ktp')?.value);
      this.ideForm.get('rt_pasangan')?.setValue(this.ideForm.get('rt')?.value);
      this.ideForm.get('rw_pasangan')?.setValue(this.ideForm.get('rw')?.value);
      this.modelIde.provinsi_pasangan = this.modelIde.provinsi;
      this.modelIde.kabkota_pasangan = this.modelIde.kabkota;
      this.modelIde.kecamatan_pasangan = this.modelIde.kecamatan;
      this.modelIde.kelurahan_pasangan = this.modelIde.kelurahan;
      this.modelIde.kode_pos_pasangan = this.modelIde.kode_pos;
    } else {
      this.ideForm.get('alamat_ktp_pasangan')?.setValue(' ');
      this.ideForm.get('rt_pasangan')?.setValue(' ');
      this.ideForm.get('rw_pasangan')?.setValue(' ');
      this.modelIde.provinsi_pasangan = '';
      this.modelIde.kabkota_pasangan = '';
      this.modelIde.kecamatan_pasangan = '';
      this.modelIde.kelurahan_pasangan = '';
    }

    if (event.value == 1) {
      this.ideForm.get('alamat_pasangan')?.setValue(this.ideForm.get('alamat_ktp')?.value);
      this.ideForm.get('kode_pos_pasangan')?.setValue(this.ideForm.get('kode_pos')?.value);
      this.carimenggunakankodepostp(this.ideForm.get('kode_pos')?.value);
      this.ideForm.get('rt_pasangan')?.setValue(this.ideForm.get('rt')?.value);
      this.ideForm.get('rw_pasangan')?.setValue(this.ideForm.get('rw')?.value);
    } else {
      this.ideForm.get('alamat_pasangan')?.setValue('');
      this.ideForm.get('provinsi_pasangan')?.setValue('');
      this.ideForm.get('kabkota_pasangan')?.setValue('');
      this.ideForm.get('kecamatan_pasangan')?.setValue('');
      this.ideForm.get('kelurahan_pasangan')?.setValue('');
      this.ideForm.get('kode_pos_pasangan')?.setValue('');
      this.ideForm.get('rt_pasangan')?.setValue('');
      this.ideForm.get('rw_pasangan')?.setValue('');
    }
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
  // Baut KTP dan NPWP
  keyKtpNpwp(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.replace(/^0/g, '');
      // event.preventDefault();
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  pilihDoc(event: any) {
    if (Math.floor(event.target.files[0].size * 0.000001) > 2) {
      Swal.fire('Gagal', 'File Maksimal 2MB!', 'error').then(() => {
        window.location.reload();
      });
    } else {
      this.file = event.target.files[0];
      this.showProggres = 0;
    }
  }
  uploadDataUntukSlik(deUpload: any, curefUpload: any) {
    this.uploadServices.uploadDocument(this.file, deUpload, curefUpload, '22').subscribe({
      // next: data =>{
      //   console.warn('Upload ', data)
      //   this.ideFixServices.getUploadSlik(data.result.app_no_de, data.result.doc_id).subscribe({})
      // }
    });
  }
  download() {
    const buatPdf = this.isiUpload[0].nama_dokumen.split('.').pop();
    if (buatPdf == 'pdf') {
      window.open(this.baseUrl + 'v1/efos-de/downloadFile/' + this.isiUpload[0].nama_dokumen + '');
    } else {
      const url = this.baseUrl + 'v1/efos-de/downloadFile/' + this.isiUpload[0].nama_dokumen + '';
      const img = '<img src="' + url + '">';
      this.popup = window.open('');
      this.popup.document.write(img);
    }
  }
}
