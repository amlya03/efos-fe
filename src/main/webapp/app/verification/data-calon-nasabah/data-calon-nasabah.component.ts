import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { EntityArrayResponseDaWa, ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganEmergency } from '../service/config/refHubunganEmergency.model';
import { refStatusPerkawinan } from '../service/config/refStatusPerkawinan.model';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { Observable } from 'rxjs';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { refStatusRumah } from '../service/config/refStatusRumah.model';
import { refListTipeProperti } from '../service/config/refListTipeProperti.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { refAnalisaCalonNasabah } from './refAnalisaCalonNasabah.model';

@Component({
  selector: 'jhi-data-calon-nasabah',
  templateUrl: './data-calon-nasabah.component.html',
  styleUrls: ['./data-calon-nasabah.component.scss'],
})
export class DataCalonNasabahComponent implements OnInit {
  // model dukcapil
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  // model dukcapil

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
  getToken: any;
  getProvinsi: any;
  getKodePos: any;
  getKelurahan: any;
  getKecamatan: any;
  getKota: any;
  app_no_de: any;
  dataCalonNasabahMap: refAnalisaCalonNasabah = new refAnalisaCalonNasabah();
  dataEntry?: fetchAllDe = new fetchAllDe();

  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected IdeService: InitialDataEntryService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  // API url
  protected getDataCalonNasabah = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-verif/getAnalisaCalonNasabah?sd='
  );
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  ngOnInit(): void {
    this.postGetTokenDuckapil();
    this.editor = new Editor();
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataCalonNasabahForm = this.formBuilder.group({
      // tanggal_verification: ['', Validators.required],
      // no_customer: ['', [Validators.required, Validators.minLength(12)]],
      // hubungan_dengen_pemberi_keterangan: ['', Validators.required],
      // pemberi_keterangan: ['', Validators.required],
      // alamat_rumah: ['', Validators.required],
      // rt: ['', Validators.required],
      // rw: ['', Validators.required],
      // provinsi: ['', Validators.required],
      // kota: ['', Validators.required],
      // kecamatan: ['', Validators.required],
      // kelurahan: ['', Validators.required],
      // kode_pos: ['', Validators.required],
      // tanggal_lahir: ['', Validators.required],
      // pedidikan: ['', Validators.required],
      // status_menikah: ['', Validators.required],
      // tanggal_pemeriksa: ['', Validators.required],
      // // nama_pasangan: ['', Validators.required],
      // // pekerjaan_pasangan: ['', Validators.required],
      // nama_ibu_kandung: ['', Validators.required],
      // jumlah_tanggunan: ['', Validators.required],
      // karakter_nasabah: ['', Validators.required],
      // fasilitas_pembiayaan_ke: ['', Validators.required],
      // kondisi_lingkungan: ['', Validators.required],
      // akses_jalan_ke_rumah_tinggal: ['', Validators.required],
      // jumlah_kendaraan: ['', Validators.required],
      // kesimpulan_hasil_investigasi: ['', Validators.required],
      // lama_menetap_bulan: ['', Validators.required],
      // lama_menetap_tahun: ['', Validators.required],

      // ini tambahan
      nama: '',
      curef: '',
      no_handphone: '',
      jenis_kelamin: '',
      alamat_ktp: '',
      rt: '',
      rw: '',
      // provinsi: '',
      // kabkota: '',
      // kecamatan: '',
      // kelurahan: '',
      kode_pos: '',
      status_perkawinan: '',
      tanggal_lahir: '',
      pendidikan: '',
      nama_ibu_kandung: '',
      kode_fasilitas: '',

      // id: "",
      app_no_de: '',
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
      verif_jumlah_tanggungan: '',
      note_verif_jumlah_tanggungan: '',
      verif_nama_pasangan: '',
      note_verif_nama_pasangan: '',
      verif_pekerjaan_pasangan: '',
      note_verif_pekerjaan_pasangan: '',
      fasilitas_pembiayaan: '',
      karakter_calon_nasabah: '',
      status_rumah: '',
      cek: '',
      rumah_dihuni: '',
      lama_menetap_bulan: '',
      lama_menetap_tahun: '',
      jenis_bangunan: '',
      lokasi_perumahan: '',
      fasilitas_listrik: '',
      isi_rumah: '',
      kondisi_lingkungan: '',
      akses_jalan: '',
      garasi: '',
      carport: '',
      kendaraan: '',
      jumlah_kendaraan: '',
      kondisi_kendaraan: '',
      // created_date: "",
      // updated_date: "",
      // created_by: "",
      // updated_by: ""
    });
    this.load();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dataCalonNasabahForm.invalid) {
      return;
    } else if (this.dataCalonNasabahMap == null) {
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_analisa_nasabah', {
          akses_jalan: this.dataCalonNasabahForm.get('akses_jalan')?.value,
          app_no_de: this.dataCalonNasabahForm.get('app_no_de')?.value,
          carport: this.dataCalonNasabahForm.get('carport')?.value,
          cek: this.dataCalonNasabahForm.get('cek')?.value,
          // created_by: this.dataCalonNasabahForm.get('created_by')?.value,
          // created_date: this.dataCalonNasabahForm.get('created_date')?.value,
          fasilitas_listrik: this.dataCalonNasabahForm.get('fasilitas_listrik')?.value,
          fasilitas_pembiayaan: this.dataCalonNasabahForm.get('fasilitas_pembiayaan')?.value,
          garasi: this.dataCalonNasabahForm.get('garasi')?.value,
          hubungan_pemberi_keterangan: this.dataCalonNasabahForm.get('hubungan_pemberi_keterangan')?.value,
          // id: this.dataCalonNasabahForm.get('id')?.value,
          isi_rumah: this.dataCalonNasabahForm.get('isi_rumah')?.value,
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
          note_verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('note_verif_jumlah_tanggungan')?.value,
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
          verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('verif_jumlah_tanggungan')?.value,
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
        })
        .subscribe({});
      this.router.navigate(['/data-kantor'], { queryParams: { app_no_de: this.app_no_de } });
      // alert('Coba Validasi');
    } else
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/update_analisa_calon_nasabah', {
          akses_jalan: this.dataCalonNasabahForm.get('akses_jalan')?.value,
          app_no_de: this.dataCalonNasabahForm.get('app_no_de')?.value,
          carport: this.dataCalonNasabahForm.get('carport')?.value,
          cek: this.dataCalonNasabahForm.get('cek')?.value,
          // created_by: this.dataCalonNasabahForm.get('created_by')?.value,
          // created_date: this.dataCalonNasabahForm.get('created_date')?.value,
          fasilitas_listrik: this.dataCalonNasabahForm.get('fasilitas_listrik')?.value,
          fasilitas_pembiayaan: this.dataCalonNasabahForm.get('fasilitas_pembiayaan')?.value,
          garasi: this.dataCalonNasabahForm.get('garasi')?.value,
          hubungan_pemberi_keterangan: this.dataCalonNasabahForm.get('hubungan_pemberi_keterangan')?.value,
          // id: this.dataCalonNasabahForm.get('id')?.value,
          isi_rumah: this.dataCalonNasabahForm.get('isi_rumah')?.value,
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
          note_verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('note_verif_jumlah_tanggungan')?.value,
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
          verif_jumlah_tanggungan: this.dataCalonNasabahForm.get('verif_jumlah_tanggungan')?.value,
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
        })
        .subscribe({});
    this.router.navigate(['/data-kantor'], { queryParams: { app_no_de: this.app_no_de } });
  }

  fetchDataNasabah(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getDataCalonNasabah + this.app_no_de);
  }

  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  load(): void {
    // ambil semua data
    this.getFetchSemuaData().subscribe(data => {
      // if(data.code === 200) {
      this.dataEntry = data.result;
      // console.log(this.dataEntry);
      // console.log("ini data de "+this.fetchAllDe);
      // }
    });

    this.fetchDataNasabah().subscribe(data => {
      this.dataCalonNasabahMap = data.result;
      let retriveCalonNasabah = {
        /// tambahan dari de
        nama: this.dataEntry?.nama,
        curef: this.dataEntry?.curef,
        no_handphone: this.dataEntry?.no_handphone,
        jenis_kelamin: this.dataEntry?.jenis_kelamin,
        alamat_ktp: this.dataEntry?.alamat_ktp,
        rt: this.dataEntry?.rt,
        rw: this.dataEntry?.rw,
        // provinsi: this.dataEntry?.provinsi,
        // kabkota: this.dataEntry?.kabkota,
        // kecamatan: this.dataEntry?.kecamatan,
        // kelurahan: this.dataEntry?.kelurahan,
        kode_pos: this.dataEntry?.kode_pos,
        status_perkawinan: this.dataEntry?.status_perkawinan,
        tanggal_lahir: this.dataEntry?.tanggal_lahir,
        pendidikan: this.dataEntry?.pendidikan,
        nama_ibu_kandung: this.dataEntry?.nama_ibu_kandung,
        kode_fasilitas: this.dataEntry?.kode_fasilitas,

        // id: this.dataCalonNasabahMap ,
        app_no_de: this.dataCalonNasabahMap.app_no_de,
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
        verif_jumlah_tanggungan: this.dataCalonNasabahMap.verif_jumlah_tanggungan,
        note_verif_jumlah_tanggungan: this.dataCalonNasabahMap.note_verif_jumlah_tanggungan,
        verif_nama_pasangan: this.dataCalonNasabahMap.verif_nama_pasangan,
        note_verif_nama_pasangan: this.dataCalonNasabahMap.note_verif_nama_pasangan,
        verif_pekerjaan_pasangan: this.dataCalonNasabahMap.verif_pekerjaan_pasangan,
        note_verif_pekerjaan_pasangan: this.dataCalonNasabahMap.note_verif_pekerjaan_pasangan,
        fasilitas_pembiayaan: this.dataCalonNasabahMap.fasilitas_pembiayaan,
        karakter_calon_nasabah: this.dataCalonNasabahMap.karakter_calon_nasabah,
        status_rumah: this.dataCalonNasabahMap.status_rumah,
        cek: this.dataCalonNasabahMap.cek,
        rumah_dihuni: this.dataCalonNasabahMap.rumah_dihuni,
        lama_menetap_bulan: this.dataCalonNasabahMap.lama_menetap_bulan,
        lama_menetap_tahun: this.dataCalonNasabahMap.lama_menetap_tahun,
        jenis_bangunan: this.dataCalonNasabahMap.jenis_bangunan,
        lokasi_perumahan: this.dataCalonNasabahMap.lokasi_perumahan,
        fasilitas_listrik: this.dataCalonNasabahMap.fasilitas_listrik,
        isi_rumah: this.dataCalonNasabahMap.isi_rumah,
        kondisi_lingkungan: this.dataCalonNasabahMap.kondisi_lingkungan,
        akses_jalan: this.dataCalonNasabahMap.akses_jalan,
        garasi: this.dataCalonNasabahMap.garasi,
        carport: this.dataCalonNasabahMap.carport,
        kendaraan: this.dataCalonNasabahMap.kendaraan,
        jumlah_kendaraan: this.dataCalonNasabahMap.jumlah_kendaraan,
        kondisi_kendaraan: this.dataCalonNasabahMap.kondisi_kendaraan,
        // created_date: this.dataCalonNasabahMap ,
        // updated_date: this.dataCalonNasabahMap ,
        // created_by: this.dataCalonNasabahMap ,
        // updated_by: this.dataCalonNasabahMap
      };
      this.dataCalonNasabahForm.setValue(retriveCalonNasabah);
    });

    // ref Hubungan Emergency
    this.dataCalonNasabah.getHubunganEmergency().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refHubunganEmergency = data.result;
      }
    });

    // ref Status Menikah
    this.dataCalonNasabah.getStatusPerkawinan().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refStatusPerkawinan = data.result;
      }
    });

    // ref Status Rumah
    this.dataCalonNasabah.getStatusRumah().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refStatusRumah = data.result;
      }
    });

    // ref Jenis Bangunan
    this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-de/list_tipe_properti?sp=H03').subscribe(data => {
      if (data.code === 200) {
        this.refListTipeProperti = data.result;
      }
    });
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
  // Untuk Ducapil
  postGetTokenDuckapil(): void {
    this.http
      .post<any>('http://10.20.82.12:8083/token/generate-token', {
        password: '3foWeb@pp',
        username: 'efo',
      })
      .subscribe({
        next: data => {
          this.getToken = data.result.token;

          this.getProvinsiDukcapil(this.getToken).subscribe(data => {
            console.warn('ref', data);
            if (data.status === 200) {
              this.getProvinsi = data.body?.result;
            }
          });
        },
      });
  }
  getProvinsiDukcapil(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvinsi/', {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }
  getkabkota(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKota/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkecamatan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKec/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkodepos(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKdPos/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkelurahan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKel/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }
  onChangeProvinsi(valueProvinsi: any) {
    this.getkabkota(this.getToken, valueProvinsi).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.getKota = res.body?.result;
      },
    });
  }

  onChangekota(valueKota: any) {
    this.getkecamatan(this.getToken, valueKota).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.getKecamatan = res.body?.result;
      },
    });
  }

  onChangekecamatan(valueKecamatan: any) {
    this.getkelurahan(this.getToken, valueKecamatan).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.getKelurahan = res.body?.result;
      },
    });
  }

  onChangekelurahan(valueKelurahan: any) {
    const datakodepos = valueKelurahan.split('|');
    this.getKodePos = datakodepos[0];
  }
}
