/* eslint-disable @typescript-eslint/prefer-for-of */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganEmergency } from '../service/config/refHubunganEmergency.model';
import { refStatusPerkawinan } from '../service/config/refStatusPerkawinan.model';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { refStatusRumah } from '../service/config/refStatusRumah.model';
import { refListTipeProperti } from '../service/config/refListTipeProperti.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { refAnalisaCalonNasabah } from './refAnalisaCalonNasabah.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';
import { callreport } from 'app/data-entry/call-report/call-report-model';

@Component({
  selector: 'jhi-data-calon-nasabah',
  templateUrl: './data-calon-nasabah.component.html',
  styleUrls: ['./data-calon-nasabah.component.scss'],
})
export class DataCalonNasabahComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  dataCalonNasabahForm!: FormGroup;
  submitted = false;
  editor!: Editor;
  html = '';
  refHubunganEmergency?: refHubunganEmergency[];
  refStatusPerkawinan?: refStatusPerkawinan[];
  refBidang?: refBidang[];
  refSektor?: refSektor[];
  refStatusRumah?: refStatusRumah[];
  refListTipeProperti?: refListTipeProperti[];
  app_no_de: any;
  dataCalonNasabahMap: refAnalisaCalonNasabah = new refAnalisaCalonNasabah();
  dataEntry: fetchAllDe = new fetchAllDe();
  tempunganCek: number[] = [];
  tampunganIsiRum: number[] = [];
  modelCallReport: callreport = new callreport();
  // checkbox cek ke
  checkboxCek: any;
  checkboxCekSertif: any;
  checkboxCekAkte: any;
  checkboxCekRekTel: any;
  checkboxCekPbb: any;
  checkboxCekRekLis: any;

  // checkbox isi rumah
  checkboxIsiRumah: any;
  isiRumahMobil: any;
  isiRumahMotor: any;
  isiRumahTV: any;
  isiRumahSofa: any;
  isiRumahPerabot: any;
  curef: any;

  // Role
  untukSessionRole: any;
  listaksesrumah: any;
  listfasilitaslistrik: any;
  listkondisilingkungan: any;
  listlokasirumah: any;

  // disable
  verifikatorMelihat: any;

  // Cek Result
  cekResult: any;

  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    private sessionStorageService: SessionStorageService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.verifikatorMelihat = this.untukSessionRole === 'VER_PRESCR';
    this.editor = new Editor();
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataCalonNasabahForm = this.formBuilder.group({
      tanggal_verifikasi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pemberi_keterangan: { value: '', disabled: this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' },
      hubungan_pemberi_keterangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_alamat: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_alamat: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_rt_rw: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_rt_rw: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_provinsi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_provinsi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kabkota: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kabkota: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kecamatan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kecamatan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kelurahan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kelurahan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kode_pos: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kode_pos: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_tanggal_lahir: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_tanggal_lahir: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_pendidikan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_pendidikan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_status_menikah: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_status_menikah: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_ibu_kandung: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_ibu_kandung: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      // verif_jumlah_tanggungan: '',
      // note_verif_jumlah_tanggungan: '',
      verif_nama_pasangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_nama_pasangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_pekerjaan_pasangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_pekerjaan_pasangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      fasilitas_pembiayaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      karakter_calon_nasabah: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      status_rumah: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        Validators.required,
      ],
      // cek: '',
      // cek: this.formBuilder.array([]),
      // cek: new FormArray([
      //   new FormControl(true),
      //   new FormControl(false),
      // ]),
      rumah_dihuni: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      lama_menetap_bulan: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        Validators.required,
      ],
      lama_menetap_tahun: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        Validators.required,
      ],
      jenis_bangunan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      lokasi_perumahan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      fasilitas_listrik: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      // isi_rumah: '',
      kondisi_lingkungan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      akses_jalan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      garasi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      carport: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      kendaraan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      jumlah_kendaraan: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        Validators.required,
      ],
      kondisi_kendaraan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_thp: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_thp: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_fasilitas_pembiayaan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_fasilitas_pembiayaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      // created_date: "",
      // updated_date: "",
      // created_by: "",
      // updated_by: ""
    });
    this.load();
  }

  onCheckCek(e: any): void {
    this.checkboxCekSertif = '';
    this.checkboxCekAkte = '';
    this.checkboxCekRekTel = '';
    this.checkboxCekPbb = '';
    this.checkboxCekRekLis = '';
    if (e.target.checked) {
      this.tempunganCek.push(e.target.value);
    }
  }

  onCheckRumah(e: any): void {
    this.isiRumahMobil = '';
    this.isiRumahMotor = '';
    this.isiRumahTV = '';
    this.isiRumahSofa = '';
    this.isiRumahPerabot = '';
    if (e.target.checked) {
      this.tampunganIsiRum.push(e.target.value);
    }
  }

  onSubmit(): void {
    const cekKe = this.tempunganCek.join(', ');
    const isiRumahCek = this.tampunganIsiRum.join(', ');
    this.submitted = true;
    if (this.dataCalonNasabahForm.invalid) {
      return;
    } else if (this.cekResult === 0) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/create_analisa_nasabah', {
          nama: this.dataCalonNasabahForm.get('nama')?.value,
          no_handphone: this.dataCalonNasabahForm.get('no_handphone')?.value,
          jenis_kelamin: this.dataCalonNasabahForm.get('jenis_kelamin')?.value,
          akses_jalan: this.dataCalonNasabahForm.get('akses_jalan')?.value,
          app_no_de: this.app_no_de,
          carport: this.dataCalonNasabahForm.get('carport')?.value,
          cek: cekKe,
          // created_by: this.dataCalonNasabahForm.get('created_by')?.value,
          // created_date: this.dataCalonNasabahForm.get('created_date')?.value,
          fasilitas_listrik: this.dataCalonNasabahForm.get('fasilitas_listrik')?.value,
          fasilitas_pembiayaan: this.dataCalonNasabahForm.get('fasilitas_pembiayaan')?.value,
          garasi: this.dataCalonNasabahForm.get('garasi')?.value,
          hubungan_pemberi_keterangan: this.dataCalonNasabahForm.get('hubungan_pemberi_keterangan')?.value,
          // id: this.dataCalonNasabahForm.get('id')?.value,
          isi_rumah: isiRumahCek,
          jenis_bangunan: this.dataCalonNasabahForm.get('jenis_bangunan')?.value,
          jumlah_kendaraan: this.dataCalonNasabahForm.get('jumlah_kendaraan')?.value,
          karakter_calon_nasabah: this.dataCalonNasabahForm.get('karakter_calon_nasabah')?.value,
          kendaraan: this.dataCalonNasabahForm.get('kendaraan')?.value,
          kondisi_kendaraan: this.dataCalonNasabahForm.get('kondisi_kendaraan')?.value,
          kondisi_lingkungan: this.dataCalonNasabahForm.get('kondisi_lingkungan')?.value,
          lama_menetap_bulan: this.dataCalonNasabahForm.get('lama_menetap_bulan')?.value,
          lama_menetap_tahun: this.dataCalonNasabahForm.get('lama_menetap_tahun')?.value,
          lokasi_perumahan: this.dataCalonNasabahForm.get('lokasi_perumahan')?.value,
          note_verif_alamat: this.dataCalonNasabahForm.get('note_verif_alamat')?.value,
          note_verif_ibu_kandung: this.dataCalonNasabahForm.get('note_verif_ibu_kandung')?.value,
          // note_verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('note_verif_jumlah_tanggungan')?.value,
          note_verif_kabkota: this.dataCalonNasabahForm.get('note_verif_kabkota')?.value,
          note_verif_kecamatan: this.dataCalonNasabahForm.get('note_verif_kecamatan')?.value,
          note_verif_kelurahan: this.dataCalonNasabahForm.get('note_verif_kelurahan')?.value,
          note_verif_kode_pos: this.dataCalonNasabahForm.get('note_verif_kode_pos')?.value,
          note_verif_nama_pasangan: this.dataCalonNasabahForm.get('note_verif_nama_pasangan')?.value,
          note_verif_pekerjaan_pasangan: this.dataCalonNasabahForm.get('note_verif_pekerjaan_pasangan')?.value,
          note_verif_pendidikan: this.dataCalonNasabahForm.get('note_verif_pendidikan')?.value,
          note_verif_provinsi: this.dataCalonNasabahForm.get('note_verif_provinsi')?.value,
          note_verif_rt_rw: this.dataCalonNasabahForm.get('note_verif_rt_rw')?.value,
          note_verif_status_menikah: this.dataCalonNasabahForm.get('note_verif_status_menikah')?.value,
          note_verif_tanggal_lahir: this.dataCalonNasabahForm.get('note_verif_tanggal_lahir')?.value,
          pemberi_keterangan: this.dataCalonNasabahForm.get('pemberi_keterangan')?.value,
          rumah_dihuni: this.dataCalonNasabahForm.get('rumah_dihuni')?.value,
          status_rumah: this.dataCalonNasabahForm.get('status_rumah')?.value,
          tanggal_verifikasi: this.dataCalonNasabahForm.get('tanggal_verifikasi')?.value,
          // updated_by: this.dataCalonNasabahForm.get('updated_by')?.value,
          // updated_date: this.dataCalonNasabahForm.get('updated_date')?.value,
          verif_alamat: this.dataCalonNasabahForm.get('verif_alamat')?.value,
          verif_ibu_kandung: this.dataCalonNasabahForm.get('verif_ibu_kandung')?.value,
          // verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('verif_jumlah_tanggungan')?.value,
          verif_kabkota: this.dataCalonNasabahForm.get('verif_kabkota')?.value,
          verif_kecamatan: this.dataCalonNasabahForm.get('verif_kecamatan')?.value,
          verif_kelurahan: this.dataCalonNasabahForm.get('verif_kelurahan')?.value,
          verif_kode_pos: this.dataCalonNasabahForm.get('verif_kode_pos')?.value,
          verif_nama_pasangan: this.dataCalonNasabahForm.get('verif_nama_pasangan')?.value,
          verif_pekerjaan_pasangan: this.dataCalonNasabahForm.get('verif_pekerjaan_pasangan')?.value,
          verif_pendidikan: this.dataCalonNasabahForm.get('verif_pendidikan')?.value,
          verif_provinsi: this.dataCalonNasabahForm.get('verif_provinsi')?.value,
          verif_rt_rw: this.dataCalonNasabahForm.get('verif_rt_rw')?.value,
          verif_status_menikah: this.dataCalonNasabahForm.get('verif_status_menikah')?.value,
          verif_tanggal_lahir: this.dataCalonNasabahForm.get('verif_tanggal_lahir')?.value,
          note_verif_thp: this.dataCalonNasabahForm.get('note_verif_thp')?.value,
          verif_thp: this.dataCalonNasabahForm.get('verif_thp')?.value,
          verif_fasilitas_pembiayaan: this.dataCalonNasabahForm.get('verif_fasilitas_pembiayaan')?.value,
          note_verif_fasilitas_pembiayaan: this.dataCalonNasabahForm.get('note_verif_fasilitas_pembiayaan')?.value,
        })
        .subscribe({});
      this.router.navigate(['/data-kantor'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
      // alert('Coba Validasi');
    }
    // Cek Ke
    else if (cekKe !== '') {
      this.dataCalonNasabahMap.cek = cekKe;
    } else {
      this.dataCalonNasabahMap.cek;
    }

    // Isi Rumah
    if (cekKe !== '') {
      this.dataCalonNasabahMap.isi_rumah = isiRumahCek;
    } else {
      this.dataCalonNasabahMap.isi_rumah;
    }
    this.http
      .post<any>(this.baseUrl + 'v1/efos-verif/update_analisa_calon_nasabah', {
        nama: this.dataCalonNasabahForm.get('nama')?.value,
        no_handphone: this.dataCalonNasabahForm.get('no_handphone')?.value,
        jenis_kelamin: this.dataCalonNasabahForm.get('jenis_kelamin')?.value,
        akses_jalan: this.dataCalonNasabahForm.get('akses_jalan')?.value,
        app_no_de: this.app_no_de,
        carport: this.dataCalonNasabahForm.get('carport')?.value,
        cek: this.dataCalonNasabahMap.cek,
        // created_by: this.dataCalonNasabahForm.get('created_by')?.value,
        // created_date: this.dataCalonNasabahForm.get('created_date')?.value,
        fasilitas_listrik: this.dataCalonNasabahForm.get('fasilitas_listrik')?.value,
        fasilitas_pembiayaan: this.dataCalonNasabahForm.get('fasilitas_pembiayaan')?.value,
        garasi: this.dataCalonNasabahForm.get('garasi')?.value,
        hubungan_pemberi_keterangan: this.dataCalonNasabahForm.get('hubungan_pemberi_keterangan')?.value,
        // id: this.dataCalonNasabahForm.get('id')?.value,
        isi_rumah: this.dataCalonNasabahMap.isi_rumah,
        jenis_bangunan: this.dataCalonNasabahForm.get('jenis_bangunan')?.value,
        jumlah_kendaraan: this.dataCalonNasabahForm.get('jumlah_kendaraan')?.value,
        karakter_calon_nasabah: this.dataCalonNasabahForm.get('karakter_calon_nasabah')?.value,
        kendaraan: this.dataCalonNasabahForm.get('kendaraan')?.value,
        kondisi_kendaraan: this.dataCalonNasabahForm.get('kondisi_kendaraan')?.value,
        kondisi_lingkungan: this.dataCalonNasabahForm.get('kondisi_lingkungan')?.value,
        lama_menetap_bulan: this.dataCalonNasabahForm.get('lama_menetap_bulan')?.value,
        lama_menetap_tahun: this.dataCalonNasabahForm.get('lama_menetap_tahun')?.value,
        lokasi_perumahan: this.dataCalonNasabahForm.get('lokasi_perumahan')?.value,
        note_verif_alamat: this.dataCalonNasabahForm.get('note_verif_alamat')?.value,
        note_verif_ibu_kandung: this.dataCalonNasabahForm.get('note_verif_ibu_kandung')?.value,
        // note_verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('note_verif_jumlah_tanggungan')?.value,
        note_verif_kabkota: this.dataCalonNasabahForm.get('note_verif_kabkota')?.value,
        note_verif_kecamatan: this.dataCalonNasabahForm.get('note_verif_kecamatan')?.value,
        note_verif_kelurahan: this.dataCalonNasabahForm.get('note_verif_kelurahan')?.value,
        note_verif_kode_pos: this.dataCalonNasabahForm.get('note_verif_kode_pos')?.value,
        note_verif_nama_pasangan: this.dataCalonNasabahForm.get('note_verif_nama_pasangan')?.value,
        note_verif_pekerjaan_pasangan: this.dataCalonNasabahForm.get('note_verif_pekerjaan_pasangan')?.value,
        note_verif_pendidikan: this.dataCalonNasabahForm.get('note_verif_pendidikan')?.value,
        note_verif_provinsi: this.dataCalonNasabahForm.get('note_verif_provinsi')?.value,
        note_verif_rt_rw: this.dataCalonNasabahForm.get('note_verif_rt_rw')?.value,
        note_verif_status_menikah: this.dataCalonNasabahForm.get('note_verif_status_menikah')?.value,
        note_verif_tanggal_lahir: this.dataCalonNasabahForm.get('note_verif_tanggal_lahir')?.value,
        pemberi_keterangan: this.dataCalonNasabahForm.get('pemberi_keterangan')?.value,
        rumah_dihuni: this.dataCalonNasabahForm.get('rumah_dihuni')?.value,
        status_rumah: this.dataCalonNasabahForm.get('status_rumah')?.value,
        tanggal_verifikasi: this.dataCalonNasabahForm.get('tanggal_verifikasi')?.value,
        // updated_by: this.dataCalonNasabahForm.get('updated_by')?.value,
        // updated_date: this.dataCalonNasabahForm.get('updated_date')?.value,
        verif_alamat: this.dataCalonNasabahForm.get('verif_alamat')?.value,
        verif_ibu_kandung: this.dataCalonNasabahForm.get('verif_ibu_kandung')?.value,
        // verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('verif_jumlah_tanggungan')?.value,
        verif_kabkota: this.dataCalonNasabahForm.get('verif_kabkota')?.value,
        verif_kecamatan: this.dataCalonNasabahForm.get('verif_kecamatan')?.value,
        verif_kelurahan: this.dataCalonNasabahForm.get('verif_kelurahan')?.value,
        verif_kode_pos: this.dataCalonNasabahForm.get('verif_kode_pos')?.value,
        verif_nama_pasangan: this.dataCalonNasabahForm.get('verif_nama_pasangan')?.value,
        verif_pekerjaan_pasangan: this.dataCalonNasabahForm.get('verif_pekerjaan_pasangan')?.value,
        verif_pendidikan: this.dataCalonNasabahForm.get('verif_pendidikan')?.value,
        verif_provinsi: this.dataCalonNasabahForm.get('verif_provinsi')?.value,
        verif_rt_rw: this.dataCalonNasabahForm.get('verif_rt_rw')?.value,
        verif_status_menikah: this.dataCalonNasabahForm.get('verif_status_menikah')?.value,
        verif_tanggal_lahir: this.dataCalonNasabahForm.get('verif_tanggal_lahir')?.value,
        note_verif_thp: this.dataCalonNasabahForm.get('note_verif_thp')?.value,
        verif_thp: this.dataCalonNasabahForm.get('verif_thp')?.value,
        verif_fasilitas_pembiayaan: this.dataCalonNasabahForm.get('verif_fasilitas_pembiayaan')?.value,
        note_verif_fasilitas_pembiayaan: this.dataCalonNasabahForm.get('note_verif_fasilitas_pembiayaan')?.value,
      })
      .subscribe({});
    this.router.navigate(['/data-kantor'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }

  load(): void {
    // ambil semua data
    setTimeout(() => {
      this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        // if(data.code === 200) {
        this.dataEntry = data.result;
        // console.log(this.dataEntry);
        // console.log("ini data de "+this.fetchAllDe);
        // }
      });
    }, 1);

    setTimeout(() => {
      this.dataEntryService.getFetchListAksesRumah().subscribe(data => {
        // if(data.code === 200) {
        this.listaksesrumah = data.result;
        // console.log("ini data de "+this.fetchAllDe);
        // }
      });
    }, 2);
    setTimeout(() => {
      this.dataEntryService.getFetchListFasilitasListrik().subscribe(data => {
        // if(data.code === 200) {
        this.listfasilitaslistrik = data.result;
        // console.log("ini data de "+this.fetchAllDe);
        // }
      });
    }, 5);
    setTimeout(() => {
      this.dataEntryService.getFetchListKondisiLingkungan().subscribe(data => {
        // if(data.code === 200) {
        this.listkondisilingkungan = data.result;
        //  console.log('lin',this.listkondisilingkungan);
        // console.log("ini data de "+this.fetchAllDe);
        // }
      });
    }, 7);

    setTimeout(() => {
      this.dataEntryService.getFetchListLokasiRumah().subscribe(data => {
        // if(data.code === 200) {
        this.listlokasirumah = data.result;
        //  console.log('lin',this.listkondisilingkungan);
        // console.log("ini data de "+this.fetchAllDe);
        // }
      });
    }, 10);

    // call Report
    setTimeout(() => {
      this.dataEntryService.getFetchCallReport(this.app_no_de).subscribe(call => {
        this.modelCallReport = call.result;
        // console.warn('call ', call);
      });
    }, 17);

    // ref Hubungan Emergency
    setTimeout(() => {
      this.dataCalonNasabah.getHubunganEmergency().subscribe(data => {
        // console.warn('ref', data);
        if (data.code === 200) {
          this.refHubunganEmergency = data.result;
        }
      });
    }, 15);

    // ref Status Menikah
    setTimeout(() => {
      this.dataCalonNasabah.getStatusPerkawinan().subscribe(data => {
        // console.warn('ref', data);
        if (data.code === 200) {
          this.refStatusPerkawinan = data.result;
        }
      });
    }, 20);

    // ref Status Rumah
    setTimeout(() => {
      this.dataCalonNasabah.getStatusRumah().subscribe(data => {
        // console.warn('ref', data);
        if (data.code === 200) {
          this.refStatusRumah = data.result;
        }
      });
    }, 25);

    // ref Jenis Bangunan
    setTimeout(() => {
      this.http.get<ApiResponse>(this.baseUrl + 'v1/efos-de/list_tipe_properti?sp=H03').subscribe(data => {
        if (data.code === 200) {
          this.refListTipeProperti = data.result;
        }
      });
    }, 30);

    setTimeout(() => {
      this.dataCalonNasabah.fetchDataNasabah(this.app_no_de).subscribe(data => {
        this.dataCalonNasabahMap = data.result;
        if (data.result === null) {
          this.getLoading(false);
          this.cekResult = 0;
        } else {
          this.getLoading(false);
          this.cekResult = 1;
        }
        // console.warn(data.result === null)
        // alert(this.dataCalonNasabahMap.verif_fasilitas_pembiayaan);
        if (data.result === null) {
          const retriveCalonNasabah = {
            tanggal_verifikasi: '',
            pemberi_keterangan: '',
            hubungan_pemberi_keterangan: '',
            verif_alamat: '',
            note_verif_alamat: '',
            verif_rt_rw: '',
            note_verif_rt_rw: '',
            verif_provinsi: '',
            note_verif_provinsi: '',
            verif_kabkota: '',
            note_verif_kabkota: '',
            verif_kecamatan: '',
            note_verif_kecamatan: '',
            verif_kelurahan: '',
            note_verif_kelurahan: '',
            verif_kode_pos: '',
            note_verif_kode_pos: '',
            verif_tanggal_lahir: '',
            note_verif_tanggal_lahir: '',
            verif_pendidikan: '',
            note_verif_pendidikan: '',
            verif_status_menikah: '',
            note_verif_status_menikah: '',
            verif_ibu_kandung: '',
            note_verif_ibu_kandung: '',
            // verif_jumlah_tanggungan: '',
            // note_verif_jumlah_tanggungan: '',
            verif_nama_pasangan: '',
            note_verif_nama_pasangan: '',
            verif_pekerjaan_pasangan: '',
            note_verif_pekerjaan_pasangan: '',
            fasilitas_pembiayaan: '',
            karakter_calon_nasabah: '',
            status_rumah: '',
            // cek: '',
            rumah_dihuni: '',
            lama_menetap_bulan: '',
            lama_menetap_tahun: '',
            jenis_bangunan: '',
            lokasi_perumahan: '',
            fasilitas_listrik: '',
            // isi_rumah: '',
            kondisi_lingkungan: '',
            akses_jalan: '',
            garasi: '',
            carport: '',
            kendaraan: '',
            jumlah_kendaraan: '',
            kondisi_kendaraan: '',
            note_verif_thp: '',
            verif_thp: '',
            verif_fasilitas_pembiayaan: '0',
            note_verif_fasilitas_pembiayaan: '',
            // created_date: this.dataCalonNasabahMap ,
            // updated_date: this.dataCalonNasabahMap ,
            // created_by: this.dataCalonNasabahMap ,
            // updated_by: this.dataCalonNasabahMap
          };
          this.dataCalonNasabahForm.setValue(retriveCalonNasabah);
        } else {
          const retriveCalonNasabah = {
            tanggal_verifikasi: this.dataCalonNasabahMap.tanggal_verifikasi,
            pemberi_keterangan: this.dataCalonNasabahMap.pemberi_keterangan,
            hubungan_pemberi_keterangan: this.dataCalonNasabahMap.hubungan_pemberi_keterangan,
            verif_alamat: this.dataCalonNasabahMap.verif_alamat,
            note_verif_alamat: this.dataCalonNasabahMap.note_verif_alamat,
            verif_rt_rw: this.dataCalonNasabahMap.verif_rt_rw,
            note_verif_rt_rw: this.dataCalonNasabahMap.note_verif_rt_rw,
            verif_provinsi: this.dataCalonNasabahMap.verif_provinsi,
            note_verif_provinsi: this.dataCalonNasabahMap.note_verif_provinsi,
            verif_kabkota: this.dataCalonNasabahMap.verif_kabkota,
            note_verif_kabkota: this.dataCalonNasabahMap.note_verif_kabkota,
            verif_kecamatan: this.dataCalonNasabahMap.verif_kecamatan,
            note_verif_kecamatan: this.dataCalonNasabahMap.note_verif_kecamatan,
            verif_kelurahan: this.dataCalonNasabahMap.verif_kelurahan,
            note_verif_kelurahan: this.dataCalonNasabahMap.note_verif_kelurahan,
            verif_kode_pos: this.dataCalonNasabahMap.verif_kode_pos,
            note_verif_kode_pos: this.dataCalonNasabahMap.note_verif_kode_pos,
            verif_tanggal_lahir: this.dataCalonNasabahMap.verif_tanggal_lahir,
            note_verif_tanggal_lahir: this.dataCalonNasabahMap.note_verif_tanggal_lahir,
            verif_pendidikan: this.dataCalonNasabahMap.verif_pendidikan,
            note_verif_pendidikan: this.dataCalonNasabahMap.note_verif_pendidikan,
            verif_status_menikah: this.dataCalonNasabahMap.verif_status_menikah,
            note_verif_status_menikah: this.dataCalonNasabahMap.note_verif_status_menikah,
            verif_ibu_kandung: this.dataCalonNasabahMap.verif_ibu_kandung,
            note_verif_ibu_kandung: this.dataCalonNasabahMap.note_verif_ibu_kandung,
            // verif_jumlah_tanggungan: this.dataCalonNasabahMap.verif_jumlah_tanggungan,
            // note_verif_jumlah_tanggungan: this.dataCalonNasabahMap.note_verif_jumlah_tanggungan,
            verif_nama_pasangan: this.dataCalonNasabahMap.verif_nama_pasangan,
            note_verif_nama_pasangan: this.dataCalonNasabahMap.note_verif_nama_pasangan,
            verif_pekerjaan_pasangan: this.dataCalonNasabahMap.verif_pekerjaan_pasangan,
            note_verif_pekerjaan_pasangan: this.dataCalonNasabahMap.note_verif_pekerjaan_pasangan,
            fasilitas_pembiayaan: this.dataCalonNasabahMap.fasilitas_pembiayaan,
            karakter_calon_nasabah: this.dataCalonNasabahMap.karakter_calon_nasabah,
            status_rumah: this.dataCalonNasabahMap.status_rumah,
            // cek: this.dataCalonNasabahMap.cek,
            rumah_dihuni: this.dataCalonNasabahMap.rumah_dihuni,
            lama_menetap_bulan: this.dataCalonNasabahMap.lama_menetap_bulan,
            lama_menetap_tahun: this.dataCalonNasabahMap.lama_menetap_tahun,
            jenis_bangunan: this.dataCalonNasabahMap.jenis_bangunan,
            lokasi_perumahan: this.dataCalonNasabahMap.lokasi_perumahan,
            fasilitas_listrik: this.dataCalonNasabahMap.fasilitas_listrik,
            // isi_rumah: this.dataCalonNasabahMap.isi_rumah,
            kondisi_lingkungan: this.dataCalonNasabahMap.kondisi_lingkungan,
            akses_jalan: this.dataCalonNasabahMap.akses_jalan,
            garasi: this.dataCalonNasabahMap.garasi,
            carport: this.dataCalonNasabahMap.carport,
            kendaraan: this.dataCalonNasabahMap.kendaraan,
            jumlah_kendaraan: this.dataCalonNasabahMap.jumlah_kendaraan,
            kondisi_kendaraan: this.dataCalonNasabahMap.kondisi_kendaraan,
            note_verif_thp: this.dataCalonNasabahMap.note_verif_thp,
            verif_thp: this.dataCalonNasabahMap.verif_thp,
            verif_fasilitas_pembiayaan: this.dataCalonNasabahMap.verif_fasilitas_pembiayaan,
            note_verif_fasilitas_pembiayaan: this.dataCalonNasabahMap.note_verif_fasilitas_pembiayaan,
            // created_date: this.dataCalonNasabahMap ,
            // updated_date: this.dataCalonNasabahMap ,
            // created_by: this.dataCalonNasabahMap ,
            // updated_by: this.dataCalonNasabahMap
          };
          this.dataCalonNasabahForm.setValue(retriveCalonNasabah);

          // Checkbox Cek Ke
          this.checkboxCek = this.dataCalonNasabahMap.cek?.split(', ');
          for (let i = 0; i < this.checkboxCek.length; i++) {
            // alert(this.checkboxCek[i] === "Sertifikat")
            if (this.checkboxCek[i] === 'Sertifikat') {
              this.checkboxCekSertif = 'Sertifikat';
              // alert("1 "+ this.checkboxCekSertif)
            } else if (this.checkboxCek[i] === 'Akta Jual Beli') {
              this.checkboxCekAkte = 'Akta Jual Beli';
              // alert("2 "+ this.checkboxCekAkte)
            } else if (this.checkboxCek[i] === 'Rekening Telepon') {
              this.checkboxCekRekTel = 'Rekening Telepon';
              // alert("3 "+ this.checkboxCekRekTel)
            } else if (this.checkboxCek[i] === 'PBB') {
              this.checkboxCekPbb = 'PBB';
              // alert("4 "+ this.checkboxCekPbb)
            } else if (this.checkboxCek[i] === 'Rekening Listrik') {
              this.checkboxCekRekLis = 'Rekening Listrik';
              // alert("5 "+ this.checkboxCekRekLis)
            }
          }

          // Checkbox Isi Rumah
          this.checkboxIsiRumah = this.dataCalonNasabahMap.isi_rumah?.split(', ');
          for (let i = 0; i < this.checkboxIsiRumah.length; i++) {
            if (this.checkboxIsiRumah[i] === 'Mobil') {
              this.isiRumahMobil = 'Mobil';
            } else if (this.checkboxIsiRumah[i] === 'Motor') {
              this.isiRumahMotor = 'Motor';
            } else if (this.checkboxIsiRumah[i] === 'TV') {
              this.isiRumahTV = 'TV';
            } else if (this.checkboxIsiRumah[i] === 'Sofa') {
              this.isiRumahSofa = 'Sofa';
            } else if (this.checkboxIsiRumah[i] === 'Perabot Lainnya') {
              this.isiRumahPerabot = 'Perabot Lainnya';
            }
          }
        }
      });
    }, 50);
  }

  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }
  // Selanjutnya
  Next(): void {
    this.router.navigate(['/data-kantor'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
