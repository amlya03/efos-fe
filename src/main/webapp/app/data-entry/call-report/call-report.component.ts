import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { getCallReportModel } from '../services/config/getCallReportModel.model';
import { refStatusRumah } from 'app/verification/service/config/refStatusRumah.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { refListTipeKendaraan } from '../services/config/refListTipeKendaraan.model';
import { refStatusPerkawinan } from '../services/config/refStatusPerkawinan.model';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refStatusSertifikat } from '../services/config/refStatusSertifikat.model';

@Component({
  selector: 'jhi-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.scss'],
})
export class CallReportComponent implements OnInit {
  callReportForm!: FormGroup;
  datakirimiancure: any;
  curef: string | undefined;
  statusPerkawinan: string | undefined;
  app_no_de: string | undefined;
  daWa: getCallReportModel = new getCallReportModel();
  daWa1: fetchAllDe = new fetchAllDe();
  ref_status_perkawinan: refStatusPerkawinan[] = [];
  ref_status_rumah: refStatusRumah[] = [];
  ref_list_tipe_kendaraan: refListTipeKendaraan[] = [];
  pemegangHak: refListJumlahKaryawan[] = [];
  listSertif: refStatusSertifikat[] = [];
  nowawancara: any;
  contohtex: any;
  skalaprusahaan: any;
  checkboxCekaktapendirian: any;
  tempunganCek: Array<number> = [];
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService,
    private localStorageService: LocalStorageService,
    protected verificationServices: ServiceVerificationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
      this.statusPerkawinan = params['statusPerkawinan'];
    });
  }

  ngOnInit(): void {
    this.untukSessionUserName = this.localStorageService.retrieve('sessionUserName');
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionFullName = this.localStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.localStorageService.retrieve('sessionKdCabang');
    this.load();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.callReportForm = this.formBuilder.group({
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
      keterangan: '',
      take_home_pay: '',
    });
  }

  load() {
    this.dataEntryService.getFetchCallReport(this.app_no_de).subscribe(call => {
      this.daWa = call.result;

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
      };
      this.callReportForm.setValue(retriveCallReport);

      this.checkboxCek = this.daWa.legalitas_usaha.split(', ');
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
    });
    setTimeout(() => {
      if (this.daWa !== null) {
        this.nowawancara = this.daWa.no_wawancara;
      } else {
        this.dataEntryService.getFetchGetWawancara().subscribe(wawancara => {
          this.nowawancara = 'CR_' + this.app_no_de + '_' + wawancara.result;
        });
      }
    }, 300);
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(de => {
      this.daWa1 = de.result;

      this.contohtex =
        'Dengan ini saya menyatakan hasil wawancara yang diisi oleh saya ' +
        this.untukSessionFullName +
        ' dan pemberi Informasi yang disebut nasabah adalah benar adanya ' +
        this.daWa1.nama;
    });

    // /////////////////////////Ref////////////////////////////////////
    this.dataEntryService.getFetchStatusPerkawinan().subscribe(data => {
      this.ref_status_perkawinan = data.result;
    });
    this.verificationServices.getStatusRumah().subscribe(data => {
      this.ref_status_rumah = data.result;
    });
    this.dataEntryService.getFetchListTipeKendaraaan().subscribe(data => {
      this.ref_list_tipe_kendaraan = data.result;
    });
    this.dataEntryService.getFetchListPemegangHak().subscribe(data => {
      this.pemegangHak = data.result;
    });
    this.dataEntryService.getFetchRefSkalaPerusahaan().subscribe(skala => {
      this.skalaprusahaan = skala.result;
    });
    this.dataEntryService.getFetchListSertifikat().subscribe(sertif => {
      this.listSertif = sertif.result;
    });
  }

  goto() {
    this.router.navigate(['/data-entry/memo'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
      },
    });
  }

  onCheckCek(e: any) {
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

  onclikwawancara(e: any) {
    if (e.target.checked) {
      $('#buttonsimpan').removeAttr('hidden');
    } else {
      $('#buttonsimpan').attr('hidden', 'hidden');
    }
  }

  simpancallreport() {
    const legalitas = this.tempunganCek.join(', ');

    // Legalitas Usaha
    if (legalitas !== '') {
      this.legalitasUsaha = legalitas;
    } else {
      this.legalitasUsaha = this.daWa.legalitas_usaha;
    }
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_call_report', {
        alamat_perusahaan: this.callReportForm.get('alamat_perusahaan')?.value,
        alamat_perusahaan_pasangan: this.callReportForm.get('alamat_perusahaan_pasangan')?.value,
        alamat_tinggal: this.callReportForm.get('alamat_tinggal')?.value,
        app_no_de: this.app_no_de,
        bidang_usaha: this.callReportForm.get('bidang_usaha')?.value,
        bidang_usaha_pasangan: this.callReportForm.get('bidang_usaha_pasangan')?.value,
        cabang: this.localStorageService.retrieve('sessionKdCabang'),
        catatan_dokumen_agunan: this.callReportForm.get('catatan_dokumen_agunan')?.value,
        catatan_posisi_dokumen: this.callReportForm.get('catatan_posisi_dokumen')?.value,
        catatan_status_agunan: this.callReportForm.get('catatan_status_agunan')?.value,
        created_by: this.localStorageService.retrieve('sessionUserName'),
        curef: this.curef,
        dokumen_agunan: this.callReportForm.get('dokumen_agunan')?.value,
        estimasi_angsuran: this.callReportForm.get('estimasi_angsuran')?.value,
        id: 0,
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
        nama_ao: this.localStorageService.retrieve('sessionFullName'),
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
      })
      .subscribe({
        next: bawaan => {
          alert('Berhasil Menyimpan Data');
          this.router.navigate(['/data-entry/memo'], {
            queryParams: {
              curef: this.curef,
              statusPerkawinan: this.statusPerkawinan,
              app_no_de: this.app_no_de,
            },
          });
        },
      });
  }
}
