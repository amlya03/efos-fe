/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { getCallReportModel } from '../services/config/getCallReportModel.model';
import { refStatusRumah } from 'app/verification/service/config/refStatusRumah.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { refListTipeKendaraan } from '../services/config/refListTipeKendaraan.model';
import { refStatusPerkawinan } from '../services/config/refStatusPerkawinan.model';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refStatusSertifikat } from '../services/config/refStatusSertifikat.model';
import { environment } from 'environments/environment';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';
import { modelCustomer } from 'app/initial-data-entry/services/config/modelCustomer.model';

@Component({
  selector: 'jhi-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.scss'],
})
export class CallReportComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  callReportForm!: FormGroup;
  datakirimiancure: any;
  curef: string | undefined;
  app_no_de: string | undefined;
  daWa: getCallReportModel = new getCallReportModel();
  daWa1: fetchAllDe = new fetchAllDe();
  ref_status_perkawinan: refStatusPerkawinan[] = [];
  ref_status_rumah: refStatusRumah[] = [];
  ref_list_tipe_kendaraan: refListTipeKendaraan[] = [];
  pemegangHak: refListJumlahKaryawan[] = [];
  listSertif: refStatusSertifikat[] = [];
  pendidikanModel: refJenisPekerjaan[] = [];
  kepemilikanAgunan: refJenisPekerjaan[] = [];
  nowawancara: any;
  contohtex: any;
  skalaprusahaan: any;
  checkboxCekaktapendirian: any;
  tempunganCek: number[] = [];
  checkboxCek: any;
  textwawancara: any;
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;
  checkboxCeksiu: any;
  checkboxCeksiup: any;
  checkboxCeknib: any;
  checkboxCekskdu: any;
  checkboxCekskdp: any;
  legalitasUsaha: any;
  cekSimpanData = 0;
  tanggalWawancara: any;
  customerModel: modelCustomer = new modelCustomer();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService,
    private sessionStorageService: SessionStorageService,
    protected verificationServices: ServiceVerificationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionFullName = this.sessionStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.sessionStorageService.retrieve('sessionKdCabang');
    this.load();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.callReportForm = this.formBuilder.group({
      alamat_tinggal: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_lahir: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_kawin: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      pendidikan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kendaraan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      catatan_status_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      dokumen_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      catatan_dokumen_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      posisi_dokumen: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      catatan_posisi_dokumen: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      jenis_usaha: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      lama_usaha: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tipe_pekerjaan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_pekerjaan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      lama_bekerja_tahun: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      lama_bekerja_bulan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      jabatan_terakhir: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nama_perusahaan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      bidang_usaha: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      jenis_produk: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      skala_perusahaan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tahun_berdiri_perusahaan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      alamat_perusahaan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      jumlah_karyawan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kondisi_pandemi: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kepemilikan_usaha: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_kontak_hr: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tipe_pekerjaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      status_pekerjaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      lama_bekerja_bulan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      lama_bekerja_tahun_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      jabatan_terakhir_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      nama_perusahaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      bidang_usaha_pasangan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      skala_perusahaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      tahun_berdiri_perusahaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      alamat_perusahaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      jumlah_karyawan_perusahaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kondisi_pandemi_perusahaan_pasangan: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      no_kontak_hr_pasangan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      laba_periode_1: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      laba_periode_2: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      laba_periode_3: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      laba_periode_4: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rata_rata_laba: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      estimasi_angsuran: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      validasi_rekening: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_wawancara: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      keterangan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      take_home_pay: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_appraisal: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
    });
  }

  load(): void {
    // /////////////////////////Ref////////////////////////////////////
    setTimeout(() => {
      this.dataEntryService.getCustomerByCuref(this.curef).subscribe(customer => {
        this.customerModel = customer.result;
      });
    }, 2);
    setTimeout(() => {
      setTimeout(() => {
        this.dataEntryService.getListKepemilikanAgunan().subscribe(kep => {
          this.kepemilikanAgunan = kep.result;
        });
      }, 5);
      this.dataEntryService.getFetchStatusPerkawinan().subscribe(data => {
        this.ref_status_perkawinan = data.result;
      });
    }, 10);
    setTimeout(() => {
      this.verificationServices.getStatusRumah().subscribe(data => {
        this.ref_status_rumah = data.result;
      });
    }, 20);
    setTimeout(() => {
      this.dataEntryService.getFetchListTipeKendaraaan().subscribe(data => {
        this.ref_list_tipe_kendaraan = data.result;
      });
    }, 30);
    setTimeout(() => {
      this.dataEntryService.getFetchListPemegangHak().subscribe(data => {
        this.pemegangHak = data.result;
      });
    }, 40);
    setTimeout(() => {
      this.dataEntryService.getFetchRefSkalaPerusahaan().subscribe(skala => {
        this.skalaprusahaan = skala.result;
      });
    }, 50);
    setTimeout(() => {
      this.dataEntryService.getFetchListSertifikat().subscribe(sertif => {
        this.listSertif = sertif.result;
      });
    }, 60);
    setTimeout(() => {
      this.dataEntryService.getListPendidikan().subscribe({
        next: data => {
          this.pendidikanModel = data.result;
        },
      });
    }, 70);
    // /////////////////////////Ref////////////////////////////////////

    setTimeout(() => {
      this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(de => {
        this.daWa1 = de.result;

        this.contohtex =
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          'Dengan ini saya menyatakan hasil wawancara yang diisi oleh saya ' +
          this.untukSessionFullName +
          ' dan pemberi Informasi yang disebut nasabah adalah benar adanya ' +
          this.daWa1.nama;

        const ValidasiAlamatTinggal = <FormControl>this.callReportForm.get('alamat_tinggal');
        const ValidasiTanggalLahir = <FormControl>this.callReportForm.get('tanggal_lahir');
        const ValidasiStatusKawin = <FormControl>this.callReportForm.get('status_kawin');
        const ValidasiPendidikan = <FormControl>this.callReportForm.get('pendidikan');
        const ValidasiKendaraan = <FormControl>this.callReportForm.get('kendaraan');
        const ValidasiStatusAgunan = <FormControl>this.callReportForm.get('status_agunan');
        const ValidasiDokumenAgunan = <FormControl>this.callReportForm.get('dokumen_agunan');
        const ValidasiPosisiDokumen = <FormControl>this.callReportForm.get('posisi_dokumen');
        const ValidasiTanggalWawancara = <FormControl>this.callReportForm.get('tanggal_wawancara');
        const ValidasiTanggalAppraisal = <FormControl>this.callReportForm.get('tanggal_appraisal');
        const ValidasiValidasiRekening = <FormControl>this.callReportForm.get('validasi_rekening');
        const ValidasiEstimasiAngsuran = <FormControl>this.callReportForm.get('estimasi_angsuran');

        const ValidasiTipePekerjaan = <FormControl>this.callReportForm.get('tipe_pekerjaan');
        const ValidasiStatusPekerjaan = <FormControl>this.callReportForm.get('status_pekerjaan');
        const ValidasiLamaBekerjaTahun = <FormControl>this.callReportForm.get('lama_bekerja_tahun');
        const ValidasiLamaBekerjaBulan = <FormControl>this.callReportForm.get('lama_bekerja_bulan');
        const ValidasiJabatanTerakhir = <FormControl>this.callReportForm.get('jabatan_terakhir');
        const ValidasiNamaPerusahaan = <FormControl>this.callReportForm.get('nama_perusahaan');
        const ValidasiBidangUsaha = <FormControl>this.callReportForm.get('bidang_usaha');
        const ValidasiSkalaPerusahaan = <FormControl>this.callReportForm.get('skala_perusahaan');
        const ValidasiJumlahKaryawan = <FormControl>this.callReportForm.get('jumlah_karyawan');
        const ValidasiKondisiPandemi = <FormControl>this.callReportForm.get('kondisi_pandemi');
        const ValidasiNoKontakHr = <FormControl>this.callReportForm.get('no_kontak_hr');
        const ValidasiTakeHomePay = <FormControl>this.callReportForm.get('take_home_pay');

        const Validasitipe_pekerjaan_pasangan = <FormControl>this.callReportForm.get('tipe_pekerjaan_pasangan');
        const Validasistatus_pekerjaan_pasangan = <FormControl>this.callReportForm.get('status_pekerjaan_pasangan');
        const Validasilama_bekerja_bulan_pasangan = <FormControl>this.callReportForm.get('lama_bekerja_bulan_pasangan');
        const Validasilama_bekerja_tahun_pasangan = <FormControl>this.callReportForm.get('lama_bekerja_tahun_pasangan');
        const Validasijabatan_terakhir_pasangan = <FormControl>this.callReportForm.get('jabatan_terakhir_pasangan');
        const Validasinama_perusahaan_pasangan = <FormControl>this.callReportForm.get('nama_perusahaan_pasangan');
        const Validasibidang_usaha_pasangan = <FormControl>this.callReportForm.get('bidang_usaha_pasangan');
        const Validasiskala_perusahaan_pasangan = <FormControl>this.callReportForm.get('skala_perusahaan_pasangan');
        const Validasitahun_berdiri_perusahaan_pasangan = <FormControl>this.callReportForm.get('tahun_berdiri_perusahaan_pasangan');
        const Validasialamat_perusahaan_pasangan = <FormControl>this.callReportForm.get('alamat_perusahaan_pasangan');
        const Validasijumlah_karyawan_perusahaan_pasangan = <FormControl>this.callReportForm.get('jumlah_karyawan_perusahaan_pasangan');
        const Validasikondisi_pandemi_perusahaan_pasangan = <FormControl>this.callReportForm.get('kondisi_pandemi_perusahaan_pasangan');
        const Validasino_kontak_hr_pasangan = <FormControl>this.callReportForm.get('no_kontak_hr_pasangan');

        ValidasiAlamatTinggal.setValidators([Validators.required]);
        ValidasiTanggalLahir.setValidators([Validators.required]);
        ValidasiStatusKawin.setValidators([Validators.required]);
        ValidasiPendidikan.setValidators([Validators.required]);
        ValidasiKendaraan.setValidators([Validators.required]);
        ValidasiTanggalWawancara.setValidators([Validators.required]);
        ValidasiTanggalAppraisal.setValidators([Validators.required]);
        ValidasiValidasiRekening.setValidators([Validators.required]);
        ValidasiEstimasiAngsuran.setValidators([Validators.required]);

        if (this.customerModel.fasilitas_name === 'PTA') {
          ValidasiStatusAgunan.setValidators(null);
          ValidasiDokumenAgunan.setValidators(null);
          ValidasiPosisiDokumen.setValidators(null);
          Validasitipe_pekerjaan_pasangan.setValidators(null);
          Validasistatus_pekerjaan_pasangan.setValidators(null);
          Validasilama_bekerja_bulan_pasangan.setValidators(null);
          Validasilama_bekerja_tahun_pasangan.setValidators(null);
          Validasijabatan_terakhir_pasangan.setValidators(null);
          Validasinama_perusahaan_pasangan.setValidators(null);
          Validasibidang_usaha_pasangan.setValidators(null);
          Validasiskala_perusahaan_pasangan.setValidators(null);
          Validasitahun_berdiri_perusahaan_pasangan.setValidators(null);
          Validasialamat_perusahaan_pasangan.setValidators(null);
          Validasijumlah_karyawan_perusahaan_pasangan.setValidators(null);
          Validasikondisi_pandemi_perusahaan_pasangan.setValidators(null);
          Validasino_kontak_hr_pasangan.setValidators(null);
        } else {
          if (this.daWa1.kategori_pekerjaan === 'Fix Income') {
            ValidasiTipePekerjaan.setValidators([Validators.required]);
            ValidasiStatusPekerjaan.setValidators([Validators.required]);
            ValidasiLamaBekerjaTahun.setValidators([Validators.required]);
            ValidasiLamaBekerjaBulan.setValidators([Validators.required]);
            ValidasiJabatanTerakhir.setValidators([Validators.required]);
            ValidasiNamaPerusahaan.setValidators([Validators.required]);
            ValidasiBidangUsaha.setValidators([Validators.required]);
            ValidasiSkalaPerusahaan.setValidators([Validators.required]);
            ValidasiJumlahKaryawan.setValidators([Validators.required]);
            ValidasiKondisiPandemi.setValidators([Validators.required]);
            ValidasiNoKontakHr.setValidators([Validators.required]);
            ValidasiTakeHomePay.setValidators([Validators.required]);
            // eslint-disable-next-line eqeqeq
            if (this.daWa1.joint_income == 1) {
              Validasitipe_pekerjaan_pasangan.setValidators([Validators.required]);
              Validasistatus_pekerjaan_pasangan.setValidators([Validators.required]);
              Validasilama_bekerja_bulan_pasangan.setValidators([Validators.required]);
              Validasilama_bekerja_tahun_pasangan.setValidators([Validators.required]);
              Validasijabatan_terakhir_pasangan.setValidators([Validators.required]);
              Validasinama_perusahaan_pasangan.setValidators([Validators.required]);
              Validasibidang_usaha_pasangan.setValidators([Validators.required]);
              Validasiskala_perusahaan_pasangan.setValidators([Validators.required]);
              Validasitahun_berdiri_perusahaan_pasangan.setValidators([Validators.required]);
              Validasialamat_perusahaan_pasangan.setValidators([Validators.required]);
              Validasijumlah_karyawan_perusahaan_pasangan.setValidators([Validators.required]);
              Validasikondisi_pandemi_perusahaan_pasangan.setValidators([Validators.required]);
              Validasino_kontak_hr_pasangan.setValidators([Validators.required]);
            } else {
              Validasitipe_pekerjaan_pasangan.setValidators(null);
              Validasistatus_pekerjaan_pasangan.setValidators(null);
              Validasilama_bekerja_bulan_pasangan.setValidators(null);
              Validasilama_bekerja_tahun_pasangan.setValidators(null);
              Validasijabatan_terakhir_pasangan.setValidators(null);
              Validasinama_perusahaan_pasangan.setValidators(null);
              Validasibidang_usaha_pasangan.setValidators(null);
              Validasiskala_perusahaan_pasangan.setValidators(null);
              Validasitahun_berdiri_perusahaan_pasangan.setValidators(null);
              Validasialamat_perusahaan_pasangan.setValidators(null);
              Validasijumlah_karyawan_perusahaan_pasangan.setValidators(null);
              Validasikondisi_pandemi_perusahaan_pasangan.setValidators(null);
              Validasino_kontak_hr_pasangan.setValidators(null);
            }
          } else {
            ValidasiTipePekerjaan.setValidators(null);
            ValidasiStatusPekerjaan.setValidators(null);
            ValidasiLamaBekerjaTahun.setValidators(null);
            ValidasiLamaBekerjaBulan.setValidators(null);
            ValidasiJabatanTerakhir.setValidators(null);
            ValidasiNamaPerusahaan.setValidators(null);
            ValidasiBidangUsaha.setValidators(null);
            ValidasiSkalaPerusahaan.setValidators(null);
            ValidasiJumlahKaryawan.setValidators(null);
            ValidasiKondisiPandemi.setValidators(null);
            ValidasiNoKontakHr.setValidators(null);
            ValidasiTakeHomePay.setValidators(null);
            // eslint-disable-next-line eqeqeq
            if (this.daWa1.joint_income == 1) {
              Validasitipe_pekerjaan_pasangan.setValidators([Validators.required]);
              Validasistatus_pekerjaan_pasangan.setValidators([Validators.required]);
              Validasilama_bekerja_bulan_pasangan.setValidators([Validators.required]);
              Validasilama_bekerja_tahun_pasangan.setValidators([Validators.required]);
              Validasijabatan_terakhir_pasangan.setValidators([Validators.required]);
              Validasinama_perusahaan_pasangan.setValidators([Validators.required]);
              Validasibidang_usaha_pasangan.setValidators([Validators.required]);
              Validasiskala_perusahaan_pasangan.setValidators([Validators.required]);
              Validasitahun_berdiri_perusahaan_pasangan.setValidators([Validators.required]);
              Validasialamat_perusahaan_pasangan.setValidators([Validators.required]);
              Validasijumlah_karyawan_perusahaan_pasangan.setValidators([Validators.required]);
              Validasikondisi_pandemi_perusahaan_pasangan.setValidators([Validators.required]);
              Validasino_kontak_hr_pasangan.setValidators([Validators.required]);
            } else {
              Validasitipe_pekerjaan_pasangan.setValidators(null);
              Validasistatus_pekerjaan_pasangan.setValidators(null);
              Validasilama_bekerja_bulan_pasangan.setValidators(null);
              Validasilama_bekerja_tahun_pasangan.setValidators(null);
              Validasijabatan_terakhir_pasangan.setValidators(null);
              Validasinama_perusahaan_pasangan.setValidators(null);
              Validasibidang_usaha_pasangan.setValidators(null);
              Validasiskala_perusahaan_pasangan.setValidators(null);
              Validasitahun_berdiri_perusahaan_pasangan.setValidators(null);
              Validasialamat_perusahaan_pasangan.setValidators(null);
              Validasijumlah_karyawan_perusahaan_pasangan.setValidators(null);
              Validasikondisi_pandemi_perusahaan_pasangan.setValidators(null);
              Validasino_kontak_hr_pasangan.setValidators(null);
            }
          }
        }
        setTimeout(() => {
          ValidasiAlamatTinggal.updateValueAndValidity();
          ValidasiTanggalLahir.updateValueAndValidity();
          ValidasiStatusKawin.updateValueAndValidity();
          ValidasiPendidikan.updateValueAndValidity();
          ValidasiKendaraan.updateValueAndValidity();
          ValidasiTanggalWawancara.updateValueAndValidity();
          ValidasiTanggalAppraisal.updateValueAndValidity();
          ValidasiValidasiRekening.updateValueAndValidity();
          ValidasiEstimasiAngsuran.updateValueAndValidity();
          ValidasiStatusAgunan.updateValueAndValidity();
          ValidasiDokumenAgunan.updateValueAndValidity();
          ValidasiPosisiDokumen.updateValueAndValidity();
          Validasitipe_pekerjaan_pasangan.updateValueAndValidity();
          Validasistatus_pekerjaan_pasangan.updateValueAndValidity();
          Validasilama_bekerja_bulan_pasangan.updateValueAndValidity();
          Validasilama_bekerja_tahun_pasangan.updateValueAndValidity();
          Validasijabatan_terakhir_pasangan.updateValueAndValidity();
          Validasinama_perusahaan_pasangan.updateValueAndValidity();
          Validasibidang_usaha_pasangan.updateValueAndValidity();
          Validasiskala_perusahaan_pasangan.updateValueAndValidity();
          Validasitahun_berdiri_perusahaan_pasangan.updateValueAndValidity();
          Validasialamat_perusahaan_pasangan.updateValueAndValidity();
          Validasijumlah_karyawan_perusahaan_pasangan.updateValueAndValidity();
          Validasikondisi_pandemi_perusahaan_pasangan.updateValueAndValidity();
          Validasino_kontak_hr_pasangan.updateValueAndValidity();
          ValidasiTipePekerjaan.updateValueAndValidity();
          ValidasiStatusPekerjaan.updateValueAndValidity();
          ValidasiLamaBekerjaTahun.updateValueAndValidity();
          ValidasiLamaBekerjaBulan.updateValueAndValidity();
          ValidasiJabatanTerakhir.updateValueAndValidity();
          ValidasiNamaPerusahaan.updateValueAndValidity();
          ValidasiBidangUsaha.updateValueAndValidity();
          ValidasiSkalaPerusahaan.updateValueAndValidity();
          ValidasiJumlahKaryawan.updateValueAndValidity();
          ValidasiKondisiPandemi.updateValueAndValidity();
          ValidasiNoKontakHr.updateValueAndValidity();
          ValidasiTakeHomePay.updateValueAndValidity();
        }, 100);
      });
    }, 80);

    setTimeout(() => {
      this.dataEntryService.getFetchCallReport(this.app_no_de).subscribe(call => {
        this.daWa = call.result;
        if (call.result == null) {
          this.getLoading(false);
          const retriveCallReport = {
            alamat_tinggal: '',
            tanggal_lahir: '',
            status_kawin: '',
            pendidikan: '',
            kendaraan: '',
            status_agunan: '',
            catatan_status_agunan: '',
            dokumen_agunan: '',
            catatan_dokumen_agunan: '',
            posisi_dokumen: '',
            catatan_posisi_dokumen: '',
            jenis_usaha: '',
            lama_usaha: '',
            tipe_pekerjaan: '',
            status_pekerjaan: '',
            lama_bekerja_tahun: '',
            lama_bekerja_bulan: '',
            jabatan_terakhir: '',
            nama_perusahaan: '',
            bidang_usaha: '',
            jenis_produk: '',
            skala_perusahaan: '',
            tahun_berdiri_perusahaan: '',
            alamat_perusahaan: '',
            jumlah_karyawan: '',
            kondisi_pandemi: '',
            kepemilikan_usaha: '',
            no_kontak_hr: '',
            tipe_pekerjaan_pasangan: '',
            status_pekerjaan_pasangan: '',
            lama_bekerja_bulan_pasangan: '',
            lama_bekerja_tahun_pasangan: '',
            jabatan_terakhir_pasangan: '',
            nama_perusahaan_pasangan: '',
            bidang_usaha_pasangan: '',
            skala_perusahaan_pasangan: '',
            tahun_berdiri_perusahaan_pasangan: '',
            alamat_perusahaan_pasangan: '',
            jumlah_karyawan_perusahaan_pasangan: '',
            kondisi_pandemi_perusahaan_pasangan: '',
            no_kontak_hr_pasangan: '',
            laba_periode_1: '',
            laba_periode_2: '',
            laba_periode_3: '',
            laba_periode_4: '',
            rata_rata_laba: '',
            estimasi_angsuran: '',
            validasi_rekening: '',
            tanggal_wawancara: '',
            take_home_pay: '',
            keterangan: '',
            tanggal_appraisal: '',
          };
          this.callReportForm.setValue(retriveCallReport);
        } else {
          const retriveCallReport = {
            alamat_tinggal: this.daWa.alamat_tinggal,
            tanggal_lahir: this.daWa.tanggal_lahir,
            status_kawin: this.daWa.status_kawin,
            pendidikan: this.daWa.pendidikan,
            kendaraan: this.daWa.kendaraan,
            status_agunan: this.daWa.status_agunan,
            catatan_status_agunan: this.daWa.catatan_status_agunan,
            dokumen_agunan: this.daWa.dokumen_agunan,
            catatan_dokumen_agunan: this.daWa.catatan_dokumen_agunan,
            posisi_dokumen: this.daWa.posisi_dokumen,
            catatan_posisi_dokumen: this.daWa.catatan_posisi_dokumen,
            jenis_usaha: this.daWa.jenis_usaha,
            lama_usaha: this.daWa.lama_usaha,
            tipe_pekerjaan: this.daWa.tipe_pekerjaan,
            status_pekerjaan: this.daWa.status_pekerjaan,
            lama_bekerja_tahun: this.daWa.lama_bekerja_tahun,
            lama_bekerja_bulan: this.daWa.lama_bekerja_bulan,
            jabatan_terakhir: this.daWa.jabatan_terakhir,
            nama_perusahaan: this.daWa.nama_perusahaan,
            bidang_usaha: this.daWa.bidang_usaha,
            jenis_produk: this.daWa.jenis_produk,
            skala_perusahaan: this.daWa.skala_perusahaan,
            tahun_berdiri_perusahaan: this.daWa.tahun_berdiri_perusahaan,
            alamat_perusahaan: this.daWa.alamat_perusahaan,
            jumlah_karyawan: this.daWa.jumlah_karyawan,
            kondisi_pandemi: this.daWa.kondisi_pandemi,
            kepemilikan_usaha: this.daWa.kepemilikan_usaha,
            no_kontak_hr: this.daWa.no_kontak_hr,
            tipe_pekerjaan_pasangan: this.daWa.tipe_pekerjaan_pasangan,
            status_pekerjaan_pasangan: this.daWa.status_pekerjaan_pasangan,
            lama_bekerja_bulan_pasangan: this.daWa.lama_bekerja_bulan_pasangan,
            lama_bekerja_tahun_pasangan: this.daWa.lama_bekerja_tahun_pasangan,
            jabatan_terakhir_pasangan: this.daWa.jabatan_terakhir_pasangan,
            nama_perusahaan_pasangan: this.daWa.nama_perusahaan_pasangan,
            bidang_usaha_pasangan: this.daWa.bidang_usaha_pasangan,
            skala_perusahaan_pasangan: this.daWa.skala_perusahaan_pasangan,
            tahun_berdiri_perusahaan_pasangan: this.daWa.tahun_berdiri_perusahaan_pasangan,
            alamat_perusahaan_pasangan: this.daWa.alamat_perusahaan_pasangan,
            jumlah_karyawan_perusahaan_pasangan: this.daWa.jumlah_karyawan_perusahaan_pasangan,
            kondisi_pandemi_perusahaan_pasangan: this.daWa.kondisi_pandemi_perusahaan_pasangan,
            no_kontak_hr_pasangan: this.daWa.no_kontak_hr_pasangan,
            laba_periode_1: this.daWa.laba_periode_1,
            laba_periode_2: this.daWa.laba_periode_2,
            laba_periode_3: this.daWa.laba_periode_3,
            laba_periode_4: this.daWa.laba_periode_4,
            rata_rata_laba: this.daWa.rata_rata_laba,
            estimasi_angsuran: this.daWa.estimasi_angsuran,
            validasi_rekening: this.daWa.validasi_rekening,
            tanggal_wawancara: this.daWa.tanggal_wawancara,
            take_home_pay: this.daWa.take_home_pay,
            keterangan: this.daWa.keterangan,
            tanggal_appraisal: this.daWa.tanggal_appraisal,
          };
          this.callReportForm.setValue(retriveCallReport);
        }
        setTimeout(() => {
          if (this.daWa1.kode_fasilitas_name === 'PTA') {
            this.checkboxCek = '';
          } else {
            if (call.result === null) {
              this.checkboxCek = '';
            } else {
              this.checkboxCek = this.daWa.legalitas_usaha.split(', ');
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for (let i = 0; i < this.checkboxCek.length; i++) {
                if (this.checkboxCek[i] === 'SIU') {
                  this.checkboxCeksiu = 'SIU';
                } else if (this.checkboxCek[i] === 'SIUP') {
                  this.checkboxCeksiup = 'SIUP';
                } else if (this.checkboxCek[i] === 'NIB') {
                  this.checkboxCeknib = 'NIB';
                } else if (this.checkboxCek[i] === 'SKDU') {
                  this.checkboxCekskdu = 'SKDU';
                } else if (this.checkboxCek[i] === 'SKDP') {
                  this.checkboxCekskdp = 'SKDP';
                } else if (this.checkboxCek[i] === 'Akta Pendirian') {
                  this.checkboxCekaktapendirian = 'Akta Pendirian';
                }
              }
            }
          }
        }, 30);

        setTimeout(() => {
          if (call.result !== null) {
            this.nowawancara = this.daWa.no_wawancara;
          } else {
            this.dataEntryService.getFetchGetWawancara().subscribe(wawancara => {
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              this.nowawancara = 'CR_' + this.app_no_de + '_' + wawancara.result;
            });
          }
        }, 80);

        setTimeout(() => {
          this.getLoading(false);
          this.datepicker();
        }, 100);
      });
    }, 200);
  }

  goto(): void {
    this.sessionStorageService.store('callReport', 1);
    this.router.navigate(['/upload_document/upload_document_de'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }

  onCheckCek(e: any): void {
    this.checkboxCeksiu = '';
    this.checkboxCeksiup = '';
    this.checkboxCeknib = '';
    this.checkboxCekskdu = '';
    this.checkboxCekskdp = '';
    this.checkboxCekaktapendirian = '';
    if (e.target.checked) {
      this.tempunganCek.push(e.target.value);
    }
  }

  onclikwawancara(e: any): void {
    if (e.target.checked) {
      this.cekSimpanData = 1;
    } else {
      this.cekSimpanData = 0;
    }
  }

  simpancallreport(): void {
    const legalitas = this.tempunganCek.join(', ');
    if (legalitas !== '') {
      this.legalitasUsaha = legalitas;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (this.daWa === null) {
        this.legalitasUsaha = '';
      } else {
        this.legalitasUsaha = this.daWa.legalitas_usaha;
      }
    }
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_call_report', {
        alamat_perusahaan: this.callReportForm.get('alamat_perusahaan')?.value,
        alamat_perusahaan_pasangan: this.callReportForm.get('alamat_perusahaan_pasangan')?.value,
        alamat_tinggal: this.callReportForm.get('alamat_tinggal')?.value,
        app_no_de: this.app_no_de,
        bidang_usaha: this.callReportForm.get('bidang_usaha')?.value,
        bidang_usaha_pasangan: this.callReportForm.get('bidang_usaha_pasangan')?.value,
        cabang: this.sessionStorageService.retrieve('sessionKdCabang'),
        catatan_dokumen_agunan: this.callReportForm.get('catatan_dokumen_agunan')?.value,
        catatan_posisi_dokumen: this.callReportForm.get('catatan_posisi_dokumen')?.value,
        catatan_status_agunan: this.callReportForm.get('catatan_status_agunan')?.value,
        created_by: this.sessionStorageService.retrieve('sessionUserName'),
        curef: this.curef,
        dokumen_agunan: this.callReportForm.get('dokumen_agunan')?.value,
        estimasi_angsuran: this.callReportForm.get('estimasi_angsuran')?.value,
        id: 0,
        jabatan_terakhir: this.callReportForm.get('jabatan_terakhir')?.value,
        jabatan_terakhir_pasangan: this.callReportForm.get('jabatan_terakhir_pasangan')?.value,
        jenis_produk: this.callReportForm.get('jenis_produk')?.value,
        jenis_usaha: this.callReportForm.get('jenis_usaha')?.value,
        jumlah_karyawan: this.callReportForm.get('jumlah_karyawan')?.value,
        jumlah_karyawan_perusahaan_pasangan: this.callReportForm.get('jumlah_karyawan_perusahaan_pasangan')?.value,
        kategori_pekerjaan: this.daWa1.kategori_pekerjaan,
        kendaraan: this.callReportForm.get('kendaraan')?.value,
        kepemilikan_usaha: this.callReportForm.get('kepemilikan_usaha')?.value,
        kondisi_pandemi: this.callReportForm.get('kondisi_pandemi')?.value,
        kondisi_pandemi_perusahaan_pasangan: this.callReportForm.get('kondisi_pandemi_perusahaan_pasangan')?.value,
        laba_periode_1: this.callReportForm.get('laba_periode_1')?.value,
        laba_periode_2: this.callReportForm.get('laba_periode_2')?.value,
        laba_periode_3: this.callReportForm.get('laba_periode_3')?.value,
        laba_periode_4: this.callReportForm.get('laba_periode_4')?.value,
        lama_bekerja_bulan_pasangan: this.callReportForm.get('lama_bekerja_bulan_pasangan')?.value,
        lama_bekerja_tahun_pasangan: this.callReportForm.get('lama_bekerja_tahun_pasangan')?.value,
        lama_usaha: this.callReportForm.get('lama_usaha')?.value,
        legalitas_usaha: this.legalitasUsaha,
        nama_ao: this.sessionStorageService.retrieve('sessionFullName'),
        nama_perusahaan: this.callReportForm.get('nama_perusahaan')?.value,
        nama_perusahaan_pasangan: this.callReportForm.get('nama_perusahaan_pasangan')?.value,
        no_kontak_hr_pasangan: this.callReportForm.get('no_kontak_hr_pasangan')?.value,
        no_wawancara: this.nowawancara,
        pendidikan: this.callReportForm.get('pendidikan')?.value,
        posisi_dokumen: this.callReportForm.get('posisi_dokumen')?.value,
        rata_rata_laba: this.callReportForm.get('rata_rata_laba')?.value,
        skala_perusahaan: this.callReportForm.get('skala_perusahaan')?.value,
        skala_perusahaan_pasangan: this.callReportForm.get('skala_perusahaan_pasangan')?.value,
        status_agunan: this.callReportForm.get('status_agunan')?.value,
        status_kawin: this.callReportForm.get('status_kawin')?.value,
        status_pekerjaan_pasangan: this.callReportForm.get('status_pekerjaan_pasangan')?.value,
        tahun_berdiri_perusahaan: this.callReportForm.get('tahun_berdiri_perusahaan')?.value,
        tahun_berdiri_perusahaan_pasangan: this.callReportForm.get('tahun_berdiri_perusahaan_pasangan')?.value,
        tanggal_lahir: this.callReportForm.get('tanggal_lahir')?.value,
        tanggal_wawancara: this.callReportForm.get('tanggal_wawancara')?.value,
        tipe_pekerjaan_pasangan: this.callReportForm.get('tipe_pekerjaan_pasangan')?.value,
        validasi_rekening: this.callReportForm.get('validasi_rekening')?.value,
        tipe_pekerjaan: this.callReportForm.get('tipe_pekerjaan')?.value,
        status_pekerjaan: this.callReportForm.get('status_pekerjaan')?.value,
        lama_bekerja_tahun: this.callReportForm.get('lama_bekerja_tahun')?.value,
        lama_bekerja_bulan: this.callReportForm.get('lama_bekerja_bulan')?.value,
        no_kontak_hr: this.callReportForm.get('no_kontak_hr')?.value,
        take_home_pay: this.callReportForm.get('take_home_pay')?.value,
        keterangan: this.callReportForm.get('keterangan')?.value,
        tanggal_appraisal: this.callReportForm.get('tanggal_appraisal')?.value,
      })
      .subscribe({
        next: () => {
          alert('Berhasil Menyimpan Data');
          this.router.navigate(['/data-entry/memo'], {
            queryParams: {
              curef: this.curef,
              app_no_de: this.app_no_de,
            },
          });
        },
      });
  }

  datepicker(): any {
    const getValueTanggal = +new Date(this.callReportForm.get('tanggal_wawancara')?.value);
    const tanggalExpNyaPakeKoma = (Date.now() - getValueTanggal) / 86400000;
    this.tanggalWawancara = Math.floor(tanggalExpNyaPakeKoma);
    // alert(this.tanggalWawancara)
    if (this.tanggalWawancara > 60) {
      alert('Tanggal Wawancara Tidak Boleh < 60 Hari Kerja, Tanggal Wawancara Sudah Expired');
    } else if (this.tanggalWawancara < 0) {
      alert('Tanggal Wawancara Tidak Boleh Lebih Hari Ini');
    }
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
