import { Component, OnInit } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { InitialDataEntryService } from '../services/initial-data-entry.service';
import { refStatusPerkawinan } from 'app/verification/service/config/refStatusPerkawinan.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { modelCustomer } from '../services/config/modelCustomer.model';
import { refListTipePerusahaan } from 'app/data-entry/services/config/refListTipePerusahaan.model';
import { getListTipePekerjaan } from 'app/data-entry/services/config/getListTipePekerjaan.model';
import { refBidang } from '../services/config/refBidang.model';
import { refSektor } from '../services/config/refSektor.model';
import { modelJobIde } from '../services/config/modelJobIde.model';
@Component({
  selector: 'jhi-initial-data-entry-fix',
  templateUrl: './initial-data-entry-fix.component.html',
  styleUrls: ['./initial-data-entry-fix.component.scss'],
})
export class InitialDataEntryFixComponent implements OnInit {
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
  modelTipePerusahaan: refListTipePerusahaan[] = [];
  modelJob: modelJobIde = new modelJobIde();
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
  sendProJobSebelum: any;
  sendKotaJobSebelum: any;
  sendKecJobSebelum: any;
  sendKelJobSebelum: any;
  sendJenisBidang: any;
  sendJenisBidangSebelum: any;
  // //////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////
  daWaprof: any;
  postId: any;
  daWakota: any;
  daWakecamatan: any;
  daWakelurahan: any;
  daWakodepos: any;
  ideForm!: FormGroup;
  jobForm!: FormGroup;
  // //////////////////////////////////////////
  refStatusPerkawinan?: refStatusPerkawinan[];
  nama: string | undefined;
  nama_pasangan: string | undefined;
  jenis_kelamin: string | undefined;
  jenis_kelamin_pasangan: string | undefined;
  tanggal_lahir: string | undefined;
  tanggal_lahir_pasangan: string | undefined;
  tempat_lahir: string | undefined;
  tempat_lahir_pasangan: string | undefined;
  status_perkawinan: string | undefined;
  agama: string | undefined;
  agama_pasangan: string | undefined;
  pendidikan: string | undefined;
  pendidikan_pasangan: string | undefined;
  kewarganegaraan: string | undefined;
  kewarganegaraan_pasangan: string | undefined;
  nama_ibu_kandung: string | undefined;
  nama_ibu_kandung_pasangan: string | undefined;
  npwp: string | undefined;
  npwp_pasangan: string | undefined;
  alamat_ktp: string | undefined;
  alamat_ktp_pasangan: string | undefined;
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kecamatan_pasangan: any;
  kelurahan: any;
  kelurahan_pasangan: any;
  kode_pos: string | undefined;
  kode_pos_pasangan: any;
  rt: string | undefined;
  rw: string | undefined;
  rt_pasangan: string | undefined;
  rw_pasangan: string | undefined;
  no_ktp: string | undefined;
  tanggal_terbit_ktp: string | undefined;
  tanggal_exp_ktp: string | undefined;
  no_handphone: string | undefined;
  no_ktp_pasangan: string | undefined;
  tanggal_terbit_ktp_pasangan: string | undefined;
  tanggal_exp_ktp_pasangan: string | undefined;
  no_handphone_pasangan: string | undefined;
  contohdata: any;
  daWakotaD: any;
  kecamatanD: any;
  kelurahanD: any;
  umur: any;

  // ///////////////////////////////////////////
  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    protected applicationConfigService: ApplicationConfigService,
    protected ideFixServices: InitialDataEntryService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService,
    protected sessionServices: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.paramCuref = params.curef;
      this.paramId = params.id;
      this.kategori = params.kategori;
    });
  }

  ngOnInit(): void {
    this.load();
    this.ideForm = this.formBuilder.group({
      nama: '',
      jenis_kelamin: '',
      tanggal_lahir: '',
      usia: '',
      tempat_lahir: '',
      status_perkawinan: '',
      agama: '',
      pendidikan: '',
      kewarganegaraan: '',
      nama_ibu_kandung: '',
      npwp: '',
      alamat_ktp: '',
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      rt: '',
      rw: '',
      no_ktp: '',
      tanggal_terbit_ktp: '',
      tanggal_exp_ktp: '',
      status_ktp: '1',
      no_handphone: '',

      // /////////////// Pasangan /////////////////////////////////
      nama_pasangan: '',
      jenis_kelamin_pasangan: '',
      tanggal_lahir_pasangan: '',
      usia_pasangan: '',
      tempat_lahir_pasangan: '',
      agama_pasangan: '',
      pendidikan_pasangan: '',
      kewarganegaraan_pasangan: '',
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

      /////////////////////////////////////
      nama_perusahaan_sebelum: '',
      tipe_perusahaan_sebelum: '',
      tipe_pekerjaan_sebelum: '',
      alamat_pekerjaan_sebelum: '',
      jenis_bidang_sebelum: '',
      sektor_ekonomi_sebelum: '',
      lama_bekerja_bulan_sebelum: '',
      lama_bekerja_tahun_sebelum: '',
    });
  }

  load(): void {
    setTimeout(() => {
      if (this.kategori == 1) {
        this.kirimKatePeker = 'Fix Income';
      } else {
        this.kirimKatePeker = 'Non Fix Income';
      }
    }, 1000);

    if (this.paramId != null) {
      this.cekResultIde = 1;
    } else {
      this.cekResultIde = 0;
    }
    // alert(this.cekResultIde)
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
          this.submitBday(this.modelIde.tanggal_lahir);
          this.submitBdayp(this.modelIde.tanggal_lahir_pasangan);
        }, 300);

        this.ideFixServices.getJobByCurefIDE(this.modelIde.curef).subscribe(data => {
          this.modelJob = data.result;
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

            /////////////////////////////////////
            nama_perusahaan_sebelum: this.modelJob.nama_perusahaan_sebelum,
            tipe_perusahaan_sebelum: this.modelJob.nama_perusahaan_sebelum,
            tipe_pekerjaan_sebelum: this.modelJob.tipe_pekerjaan_sebelum,
            alamat_pekerjaan_sebelum: this.modelJob.alamat_pekerjaan_sebelum,
            jenis_bidang_sebelum: this.modelJob.jenis_bidang_sebelum,
            sektor_ekonomi_sebelum: this.modelJob.sektor_ekonomi_sebelum,
            lama_bekerja_bulan_sebelum: this.modelJob.lama_bekerja_bulan_sebelum,
            lama_bekerja_tahun_sebelum: this.modelJob.lama_bekerja_tahun_sebelum,
          };
          this.jobForm.setValue(retriveJob);
        });
      },
    });
    // setTimeout(() => {
    //   alert(this.curef);
    //   alert(this.app_no_ide);
    // }, 300);

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
    }, 100);
    // alert(this.cekResultIde)
    // ref Status Menikah
    this.dataCalonNasabah.getStatusPerkawinan().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refStatusPerkawinan = data.result;
      }
    });

    this.dataEntryService.getFetchListTipePekerjaan(this.kategori).subscribe(data => {
      this.getjenispekerjaandariapi = data.result;
    });

    this.ideFixServices.getBidang().subscribe(data => {
      this.getjenisbidangdariapi = data.result;
    });

    this.dataEntryService.getFetchTipePerusahaan().subscribe(data => {
      this.modelTipePerusahaan = data.result;
    });

    this.ideFixServices.getTokenDukcapil().subscribe({
      next: data => {
        this.postId = data.result.token;
        this.dataEntryService.getprovinsi(this.postId).subscribe({
          next: data => {
            this.daWaprof = data.body?.result;
          },
        });
      },
    });
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

    if (this.cekResultIde == 0) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
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
          cabang: this.sessionServices.retrieve('sessionKdCabang'),
          created_by: this.sessionServices.retrieve('sessionUserName'),
          created_date: '',
          email: '',
          email_pasangan: '',
          id: 0,
          jumlah_anak: '',
          rt: this.ideForm.get('rt')?.value,
          rt_domisili: '',
          rt_pasangan: this.ideForm.get('rw_pasangan')?.value,
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
            this.contohdata = data.result.id;
            this.app_no_ide = data.result.app_no_ide;
            this.tanggal_lahir = data.result.tanggal_lahir;

            if (this.kategori == 2) {
              const proJobSebelum = this.jobForm.get('provinsi')?.value.split('|');
              const kotaJobSebelum = this.jobForm.get('kabkota')?.value.split('|');
              const kecJobSebelum = this.jobForm.get('kecamatan')?.value.split('|');
              const kelJobSebelum = this.jobForm.get('kelurahan')?.value.split('|');
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

              this.http
                .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
                  alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                  alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                  barang_jasa: this.jobForm.get('barang_jasa')?.value,
                  bulan_berdiri: '',
                  bulan_berdiri_sebelum: '',
                  created_by: this.sessionServices.retrieve('sessionUserName'),
                  created_date: '',
                  curef: '',
                  id: 0,
                  jabatan: '',
                  jabatan_sebelum: '',
                  jenis_bidang: this.sendJenisBidang,
                  jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                  jenis_pekerjaan: '',
                  jenis_pekerjaan_sebelum: '',
                  jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                  jumlah_karyawan_sebelum: '',
                  kabkota: kotaJobSebelum[1],
                  kabkota_sebelum: '',
                  kategori_pekerjaan: '',
                  kategori_pekerjaan_sebelum: '',
                  kecamatan: kecJobSebelum[1],
                  kecamatan_sebelum: '',
                  kelurahan: kelJobSebelum[1],
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
                  posisi: '',
                  posisi_sebelum: '',
                  provinsi: proJobSebelum[1],
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
                    this.router.navigate(['/hasilprescreening'], {
                      queryParams: {
                        datakirimanid: this.contohdata,
                        datakirimantgllahir: this.tanggal_lahir,
                        datakirimanappide: this.app_no_ide,
                      },
                    });
                  },
                });
            } else {
              this.router.navigate(['/hasilprescreening'], {
                queryParams: {
                  datakirimanid: this.contohdata,
                  datakirimantgllahir: this.tanggal_lahir,
                  datakirimanappide: this.app_no_ide,
                },
              });
            }
          },
        });
    } else {
      if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
            agama: this.ideForm.get('agama')?.value,
            agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
            alamat_domisili: '',
            alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
            app_no_ide: this.app_no_ide,
            cabang: this.sessionServices.retrieve('sessionKdCabang'),
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
            rt_pasangan: this.ideForm.get('rw_pasangan')?.value,
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
          })
          .subscribe({
            next: data => {
              this.contohdata = data.result.id;
              this.app_no_ide = data.result.app_no_ide;
              this.tanggal_lahir = data.result.tanggal_lahir;

              if (this.kategori == 2) {
                const proJobSebelum = this.jobForm.get('provinsi')?.value.split('|');
                const kotaJobSebelum = this.jobForm.get('kabkota')?.value.split('|');
                const kecJobSebelum = this.jobForm.get('kecamatan')?.value.split('|');
                const kelJobSebelum = this.jobForm.get('kelurahan')?.value.split('|');
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

                this.http
                  .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
                    alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                    alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                    barang_jasa: this.jobForm.get('barang_jasa')?.value,
                    bulan_berdiri: '',
                    bulan_berdiri_sebelum: '',
                    created_by: '',
                    created_date: '',
                    curef: '',
                    id: 0,
                    jabatan: '',
                    jabatan_sebelum: '',
                    jenis_bidang: this.sendJenisBidang,
                    jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                    jenis_pekerjaan: '',
                    jenis_pekerjaan_sebelum: '',
                    jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                    jumlah_karyawan_sebelum: '',
                    kabkota: kotaJobSebelum[1],
                    kabkota_sebelum: '',
                    kategori_pekerjaan: '',
                    kategori_pekerjaan_sebelum: '',
                    kecamatan: kecJobSebelum[1],
                    kecamatan_sebelum: '',
                    kelurahan: kelJobSebelum[1],
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
                    posisi: '',
                    posisi_sebelum: '',
                    provinsi: proJobSebelum[1],
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
                      this.router.navigate(['/hasilprescreening'], {
                        queryParams: {
                          datakirimanid: this.contohdata,
                          datakirimantgllahir: this.tanggal_lahir,
                          datakirimanappide: this.app_no_ide,
                        },
                      });
                    },
                  });
              } else {
                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    datakirimanid: this.contohdata,
                    datakirimantgllahir: this.tanggal_lahir,
                    datakirimanappide: this.app_no_ide,
                  },
                });
              }
            },
          });
      } else {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
            agama: this.ideForm.get('agama')?.value,
            agama_pasangan: '',
            alamat_domisili: '',
            alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            alamat_ktp_pasangan: '',
            app_no_ide: this.app_no_ide,
            cabang: this.sessionServices.retrieve('sessionKdCabang'),
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
          })
          .subscribe({
            next: data => {
              this.contohdata = data.result.id;
              this.app_no_ide = data.result.app_no_ide;
              this.tanggal_lahir = data.result.tanggal_lahir;

              if (this.kategori == 2) {
                const proJobSebelum = this.jobForm.get('provinsi')?.value.split('|');
                const kotaJobSebelum = this.jobForm.get('kabkota')?.value.split('|');
                const kecJobSebelum = this.jobForm.get('kecamatan')?.value.split('|');
                const kelJobSebelum = this.jobForm.get('kelurahan')?.value.split('|');
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

                this.http
                  .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
                    alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                    alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                    barang_jasa: this.jobForm.get('barang_jasa')?.value,
                    bulan_berdiri: '',
                    bulan_berdiri_sebelum: '',
                    created_by: '',
                    created_date: '',
                    curef: '',
                    id: 0,
                    jabatan: '',
                    jabatan_sebelum: '',
                    jenis_bidang: this.sendJenisBidang,
                    jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                    jenis_pekerjaan: '',
                    jenis_pekerjaan_sebelum: '',
                    jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                    jumlah_karyawan_sebelum: '',
                    kabkota: kotaJobSebelum[1],
                    kabkota_sebelum: '',
                    kategori_pekerjaan: '',
                    kategori_pekerjaan_sebelum: '',
                    kecamatan: kecJobSebelum[1],
                    kecamatan_sebelum: '',
                    kelurahan: kelJobSebelum[1],
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
                    posisi: '',
                    posisi_sebelum: '',
                    provinsi: proJobSebelum[1],
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
                      this.router.navigate(['/hasilprescreening'], {
                        queryParams: {
                          datakirimanid: this.contohdata,
                          datakirimantgllahir: this.tanggal_lahir,
                          datakirimanappide: this.app_no_ide,
                        },
                      });
                    },
                  });
              } else {
                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    datakirimanid: this.contohdata,
                    datakirimantgllahir: this.tanggal_lahir,
                    datakirimanappide: this.app_no_ide,
                  },
                });
              }
            },
          });
      }
    }
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

    if (this.cekResultIde == 0) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
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
          cabang: this.sessionServices.retrieve('sessionKdCabang'),
          created_by: this.sessionServices.retrieve('sessionUserName'),
          created_date: '',
          email: '',
          email_pasangan: '',
          id: 0,
          jumlah_anak: '',
          rt: this.ideForm.get('rt')?.value,
          rt_domisili: '',
          rt_pasangan: this.ideForm.get('rw_pasangan')?.value,
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
            if (this.kategori == 2) {
              const proJobSebelum = this.jobForm.get('provinsi')?.value.split('|');
              const kotaJobSebelum = this.jobForm.get('kabkota')?.value.split('|');
              const kecJobSebelum = this.jobForm.get('kecamatan')?.value.split('|');
              const kelJobSebelum = this.jobForm.get('kelurahan')?.value.split('|');
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

              this.http
                .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
                  alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                  alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                  barang_jasa: this.jobForm.get('barang_jasa')?.value,
                  bulan_berdiri: '',
                  bulan_berdiri_sebelum: '',
                  created_by: this.sessionServices.retrieve('sessionUserName'),
                  created_date: '',
                  curef: '',
                  id: 0,
                  jabatan: '',
                  jabatan_sebelum: '',
                  jenis_bidang: this.sendJenisBidang,
                  jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                  jenis_pekerjaan: '',
                  jenis_pekerjaan_sebelum: '',
                  jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                  jumlah_karyawan_sebelum: '',
                  kabkota: kotaJobSebelum[1],
                  kabkota_sebelum: '',
                  kategori_pekerjaan: '',
                  kategori_pekerjaan_sebelum: '',
                  kecamatan: kecJobSebelum[1],
                  kecamatan_sebelum: '',
                  kelurahan: kelJobSebelum[1],
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
                  posisi: '',
                  posisi_sebelum: '',
                  provinsi: proJobSebelum[1],
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
                    this.router.navigate(['/daftaraplikasiide']);
                  },
                });
            } else {
              this.router.navigate(['/daftaraplikasiide']);
            }
          },
        });
    } else {
      if (this.ideForm.get('status_perkawinan')?.value === 'Menikah') {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
            agama: this.ideForm.get('agama')?.value,
            agama_pasangan: this.ideForm.get('agama_pasangan')?.value,
            alamat_domisili: '',
            alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            alamat_ktp_pasangan: this.ideForm.get('alamat_ktp_pasangan')?.value,
            app_no_ide: this.app_no_ide,
            cabang: this.sessionServices.retrieve('sessionKdCabang'),
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
            rt_pasangan: this.ideForm.get('rw_pasangan')?.value,
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
          })
          .subscribe({
            next: data => {
              if (this.kategori == 2) {
                const proJobSebelum = this.jobForm.get('provinsi')?.value.split('|');
                const kotaJobSebelum = this.jobForm.get('kabkota')?.value.split('|');
                const kecJobSebelum = this.jobForm.get('kecamatan')?.value.split('|');
                const kelJobSebelum = this.jobForm.get('kelurahan')?.value.split('|');
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

                this.http
                  .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
                    alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                    alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                    barang_jasa: this.jobForm.get('barang_jasa')?.value,
                    bulan_berdiri: '',
                    bulan_berdiri_sebelum: '',
                    created_by: '',
                    created_date: '',
                    curef: '',
                    id: 0,
                    jabatan: '',
                    jabatan_sebelum: '',
                    jenis_bidang: this.sendJenisBidang,
                    jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                    jenis_pekerjaan: '',
                    jenis_pekerjaan_sebelum: '',
                    jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                    jumlah_karyawan_sebelum: '',
                    kabkota: kotaJobSebelum[1],
                    kabkota_sebelum: '',
                    kategori_pekerjaan: '',
                    kategori_pekerjaan_sebelum: '',
                    kecamatan: kecJobSebelum[1],
                    kecamatan_sebelum: '',
                    kelurahan: kelJobSebelum[1],
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
                    posisi: '',
                    posisi_sebelum: '',
                    provinsi: proJobSebelum[1],
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
                      this.router.navigate(['/daftaraplikasiide']);
                    },
                  });
              } else {
                this.router.navigate(['/daftaraplikasiide']);
              }
            },
          });
      } else {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
            agama: this.ideForm.get('agama')?.value,
            agama_pasangan: '',
            alamat_domisili: '',
            alamat_ktp: this.ideForm.get('alamat_ktp')?.value,
            alamat_ktp_pasangan: '',
            app_no_ide: this.app_no_ide,
            cabang: this.sessionServices.retrieve('sessionKdCabang'),
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
          })
          .subscribe({
            next: data => {
              if (this.kategori == 2) {
                const proJobSebelum = this.jobForm.get('provinsi')?.value.split('|');
                const kotaJobSebelum = this.jobForm.get('kabkota')?.value.split('|');
                const kecJobSebelum = this.jobForm.get('kecamatan')?.value.split('|');
                const kelJobSebelum = this.jobForm.get('kelurahan')?.value.split('|');
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

                this.http
                  .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
                    alamat_pekerjaan_sebelum: this.jobForm.get('alamat_pekerjaan_sebelum')?.value,
                    alamat_perusahaan: this.jobForm.get('alamat_perusahaan')?.value,
                    barang_jasa: this.jobForm.get('barang_jasa')?.value,
                    bulan_berdiri: '',
                    bulan_berdiri_sebelum: '',
                    created_by: '',
                    created_date: '',
                    curef: '',
                    id: 0,
                    jabatan: '',
                    jabatan_sebelum: '',
                    jenis_bidang: this.sendJenisBidang,
                    jenis_bidang_sebelum: this.sendJenisBidangSebelum,
                    jenis_pekerjaan: '',
                    jenis_pekerjaan_sebelum: '',
                    jumlah_karyawan: this.jobForm.get('jumlah_karyawan')?.value,
                    jumlah_karyawan_sebelum: '',
                    kabkota: kotaJobSebelum[1],
                    kabkota_sebelum: '',
                    kategori_pekerjaan: '',
                    kategori_pekerjaan_sebelum: '',
                    kecamatan: kecJobSebelum[1],
                    kecamatan_sebelum: '',
                    kelurahan: kelJobSebelum[1],
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
                    posisi: '',
                    posisi_sebelum: '',
                    provinsi: proJobSebelum[1],
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
                      this.router.navigate(['/daftaraplikasiide']);
                    },
                  });
              } else {
                this.router.navigate(['/daftaraplikasiide']);
              }
            },
          });
      }
    }
  }

  onChangeD(value: any) {
    const valueProv = value.split('|');
    this.dataEntryService.getkabkota(this.postId, valueProv[0]).subscribe({
      next: data => {
        this.daWakotaD = data.body?.result;
        this.ideForm.get('kabkota_pasangan')?.setValue(this.untukKodeKobkotaD + '|' + this.untukkobkotaD);
      },
    });
  }

  onChangekotaD(value: any) {
    const valueKota = value.split('|');
    this.dataEntryService.getkecamatan(this.postId, valueKota[0]).subscribe({
      next: data => {
        this.kecamatanD = data.body?.result;
        this.ideForm.get('kecamatan_pasangan')?.setValue(this.untukKodeKecamatanD + '|' + this.untukkecamatanD);
      },
    });
  }

  onChangekecamatanD(value: any) {
    const valueKecamatan = value.split('|');
    this.dataEntryService.getkelurahan(this.postId, valueKecamatan[0]).subscribe({
      next: data => {
        this.kelurahanD = data.body?.result;
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
    this.dataEntryService.getkabkota(this.postId, valueProv[0]).subscribe({
      next: data => {
        this.daWakota = data.body?.result;
        this.ideForm.get('kabkota')?.setValue(this.untukKodeKobkota + '|' + this.untukkobkota);
      },
    });
  }

  onChangekota(value: any) {
    const valueKota = value.split('|');
    this.dataEntryService.getkecamatan(this.postId, valueKota[0]).subscribe({
      next: data => {
        this.kecamatan = data.body?.result;
        this.ideForm.get('kecamatan')?.setValue(this.untukKodeKecamatan + '|' + this.untukkecamatan);
      },
    });
  }

  onChangekecamatan(value: any) {
    const valueKecamatan = value.split('|');
    this.dataEntryService.getkelurahan(this.postId, valueKecamatan[0]).subscribe({
      next: data => {
        this.kelurahan = data.body?.result;
        this.ideForm.get('kelurahan')?.setValue(this.untukKodeKelurahan + '|' + this.untukkelurahan);
      },
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.ideForm.get('kode_pos')?.setValue(datakodepos[0]);
  }

  carimenggunakankodepost(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe({
      next: sukses => {
        this.untukKodeProvinsi = sukses.body?.result.provKec.kd_prov;
        this.untukKodeKobkota = sukses.body?.result.provKec.kd_kota;
        this.untukKodeKecamatan = sukses.body?.result.provKec.kd_kec;
        this.untukprovinsi = sukses.body?.result.provKec.nm_prov;
        this.untukkobkota = sukses.body?.result.provKec.nm_kota;
        this.untukkecamatan = sukses.body?.result.provKec.nm_kec;
        // console.warn(sukses);
        if (sukses.body?.result.provKec.kd_kel == null) {
          this.untukKodeKelurahan = kodepost;
          this.untukkelurahan = sukses.body?.result.kels[0].namaWilayah;
          this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
        } else {
          this.untukKodeKelurahan = kodepost;
          this.untukkelurahan = sukses.body?.result.provKec.nm_kel;
          this.onChangekelurahan(this.untukKodeKelurahan + '|' + this.untukkelurahan);
        }
        this.ideForm.get('provinsi')?.setValue(this.untukKodeProvinsi + '|' + this.untukprovinsi);
        this.onChange(this.untukKodeProvinsi + '|' + this.untukprovinsi);
        this.onChangekota(this.untukKodeKobkota + '|' + this.untukkobkota);
        this.onChangekecamatan(this.untukKodeKecamatan + '|' + this.untukkecamatan);
      },
    });
  }

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
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  carimenggunakankodepostp(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe({
      next: sukses => {
        this.untukKodeProvinsiD = sukses.body?.result.provKec.kd_prov;
        this.untukKodeKobkotaD = sukses.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanD = sukses.body?.result.provKec.kd_kec;
        this.untukprovinsiD = sukses.body?.result.provKec.nm_prov;
        this.untukkobkotaD = sukses.body?.result.provKec.nm_kota;
        this.untukkecamatanD = sukses.body?.result.provKec.nm_kec;
        // console.warn(sukses);
        if (sukses.body?.result.provKec.kd_kel == null) {
          this.untukKodeKelurahanD = kodepost;
          this.untukkelurahanD = sukses.body?.result.kels[0].namaWilayah;
          this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
        } else {
          this.untukKodeKelurahanD = kodepost;
          this.untukkelurahanD = sukses.body?.result.provKec.nm_kel;
          this.onChangekelurahanD(this.untukKodeKelurahanD + '|' + this.untukkelurahanD);
        }
        this.ideForm.get('provinsi_pasangan')?.setValue(this.untukKodeProvinsiD + '|' + this.untukprovinsiD);
        this.onChangeD(this.untukKodeProvinsiD + '|' + this.untukprovinsiD);
        this.onChangekotaD(this.untukKodeKobkotaD + '|' + this.untukkobkotaD);
        this.onChangekecamatanD(this.untukKodeKecamatanD + '|' + this.untukkecamatanD);
      },
    });
  }

  getkodepostnyap(kodepst: any, req: any) {
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
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  submitBday(tanggal: any) {
    var Q4A = '';
    var Bdate = tanggal;
    var Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    var theBday = document.getElementById('umur');
    this.ideForm.get('usia')?.setValue(Q4A);
  }

  submitBdayp(tanggal: any) {
    var Q4A = '';
    var Bdate = tanggal;
    var Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    var theBday = document.getElementById('umur');
    this.ideForm.get('usia_pasangan')?.setValue(Q4A);
  }

  jenisbidangselect(value: any) {
    const sektor = value.split('|');
    this.ideFixServices.getSektor(sektor[0]).subscribe(data => {
      this.getdatasektorekonomi = data.result;
    });
  }
  provPeker(value: any) {
    const valueProv = value.split('|');
    this.dataEntryService.getkabkota(this.postId, valueProv[0]).subscribe({
      next: data => {
        this.kotaChangeJob = data.body?.result;
        this.jobForm.get('kabkota')?.setValue(this.kdKotaJob + '|' + this.kotaJob);
      },
    });
  }
  kotaPeker(value: any) {
    const valueKota = value.split('|');
    this.dataEntryService.getkecamatan(this.postId, valueKota[0]).subscribe({
      next: data => {
        this.kecChangeJob = data.body?.result;
        this.jobForm.get('kecamatan')?.setValue(this.kdKecJob + '|' + this.kecJob);
      },
    });
  }
  kecPeker(value: any) {
    const valueKecamatan = value.split('|');
    this.dataEntryService.getkelurahan(this.postId, valueKecamatan[0]).subscribe({
      next: data => {
        this.kelChangeJob = data.body?.result;
        this.jobForm.get('kelurahan')?.setValue(this.kdKelJob + '|' + this.kelJob);
      },
    });
  }
  kelPeker(value: any) {
    const datakodepos = value.split('|');
    this.jobForm.get('kode_pos')?.setValue(datakodepos[0]);
  }
  cariPekerPost(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe({
      next: sukses => {
        this.kdProJob = sukses.body?.result.provKec.kd_prov;
        this.kdKotaJob = sukses.body?.result.provKec.kd_kota;
        this.kdKecJob = sukses.body?.result.provKec.kd_kec;
        this.proJob = sukses.body?.result.provKec.nm_prov;
        this.kotaJob = sukses.body?.result.provKec.nm_kota;
        this.kecJob = sukses.body?.result.provKec.nm_kec;
        // console.warn(sukses);
        if (sukses.body?.result.provKec.kd_kel == null) {
          this.kdKelJob = kodepost;
          this.kelJob = sukses.body?.result.kels[0].namaWilayah;
          this.kelPeker(this.kdKelJob + '|' + this.kelJob);
        } else {
          this.kdKelJob = kodepost;
          this.kelJob = sukses.body?.result.provKec.nm_kel;
          this.kelPeker(this.kdKelJob + '|' + this.kelJob);
        }
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
      this.getdatasektorekonomi = data.result;
    });
  }
}
