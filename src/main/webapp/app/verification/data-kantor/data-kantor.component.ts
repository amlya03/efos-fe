import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { EntityArrayResponseDaWa, ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganAgunan } from '../service/config/refHubunganAgunan.model';
import { refJabatan } from '../service/config/refJabatan.model';
import { refJumlahKaryawan } from '../service/config/refJumlahKaryawan.model';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { refAnalisaDataKantor } from './refAnalisaDataKantor.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';

@Component({
  selector: 'jhi-data-kantor',
  templateUrl: './data-kantor.component.html',
  styleUrls: ['./data-kantor.component.scss'],
})
export class DataKantorComponent implements OnInit {
  // model dukcapil
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  // model dukcapil

  editor!: Editor;
  html = '';
  dataKantorForm!: FormGroup;
  submitted = false;
  refHubunganAgunan?: refHubunganAgunan[];
  refJabatan?: refJabatan[];
  refJumlahKaryawan?: refJumlahKaryawan[];
  refBidang?: refBidang[];
  refSektor?: refSektor[];
  getToken: any;
  getProvinsi: any;
  getKodePos: any;
  getKelurahan: any;
  getKecamatan: any;
  getKota: any;
  app_no_de: any;
  dataKantorMap: refAnalisaDataKantor = new refAnalisaDataKantor();
  dataEntry: fetchAllDe = new fetchAllDe();

  constructor(
    protected dataKantor: ServiceVerificationService,
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
  protected getDataKantor = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-verif/getAnalisaDataKantor?sd='
  );
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  ngOnInit(): void {
    // this.postGetTokenDuckapil();
    // this.editor = new Editor();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataKantorForm = this.formBuilder.group({
      // tanggal_verification: ['', Validators.required],
      // waktu_verification: '', //['', Validators.required],
      no_telepon: '', //['', Validators.required],
      fax: '', //['', Validators.required],
      // pemberi_keterangan: ['', Validators.required],
      // hungungan_pemohon_dengan_pemberi_keterangan: ['', Validators.required],
      // nama_perusahaan: '', //['', Validators.required],
      // alamat_perusahaan: '', //['', Validators.required],
      provinsi: '', //['', Validators.required],
      kabkota: '', //['', Validators.required],
      kecamatan: '', //['', Validators.required],
      kelurahan: '', //['', Validators.required],
      kode_pos: '', //['', Validators.required],
      // lama_bekerja_tahun: '', //['', Validators.required],
      // lama_bekerja_bulan: '', //['', Validators.required],
      // lama_beroperasi_tahun: '', //['', Validators.required],
      // lama_beroperasi_bulan: '', //['', Validators.required],
      // bidang_usaha: '', //['', Validators.required],
      // sektor_ekonomi: '', //['', Validators.required],
      // tipe_pekerjaan: '',//'', //['', Validators.required],
      // status_kepegawaian: '', //['', Validators.required],
      // bagian_atau_divisi: '', //['', Validators.required],
      // posisi: '', //['', Validators.required],
      // jumlah_karyawan: '', //['', Validators.required],
      // usia_pensiun: '', //['', Validators.required],
      // kesimpulan_hasil_investigasi: '', //['', Validators.required],

      // id: '',
      // app_no_de: '',
      tanggal_verifikasi: '', //['', Validators.required],
      pemberi_keterangan: '', //['', Validators.required],
      hubungan_pemberi_keterangan: '', //['', Validators.required],
      verif_fax: '',
      note_verif_fax: '',
      verif_no_telepon: '',
      note_verif_no_telepon: '',
      verif_alamat_perusahaan: '',
      note_verif_alamat_perusahaan: '',
      verif_nama_perusahaan: '',
      note_verif_nama_perusahaan: '',
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
      verif_lama_bekerja: '',
      note_verif_lama_bekerja: '',
      // verif_lama_beroperasi: '',
      // note_verif_lama_beroperasi: '',
      verif_bidang_usaha: '',
      note_verif_bidang_usaha: '',
      // // verif_tipe_perusahaan: '',
      // // note_verif_tipe_perusahaan: '',
      // // verif_jenis_pekerjaan: '',
      // // note_verif_jenis_pekerjaan: '',
      // // verif_jumlah_karyawan: '',
      // // note_verif_jumlah_karyawan: '',
      verif_sektor_ekonomi: '',
      note_verif_sektor_ekonomi: '',
      verif_tipe_pekerjaan: '',
      note_verif_tipe_pekerjaan: '',
      verif_status_kepegawaian: '',
      note_verif_status_kepegawaian: '',
      verif_jabatan: '',
      note_verif_jabatan: '',
      verif_usia_pensiun: '',
      note_verif_usia_pensiun: '',
      divisi: '',
      aspek_syariah: '',
      // created_date: '',
      // updated_date: '',
      // created_by: '',
      // updated_by: '',
    });

    this.load();
  }

  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  onSubmit(): void {
    // // const getSekarang = new Date();
    // const getValueTanggal = +new Date(this.dataKantorForm.value.waktu_verification);
    // // alert(getValueTanggal.getTime());
    // // /////////////ini buat dapet bulan//////////////////////////
    // const getTahun = +~~((Date.now() - getValueTanggal) / 31557600000);
    // // const calculateSekarang = Math.abs(Date.now() - getValueTanggal.getTime());
    // // const getBulan = Math.floor(calculateSekarang / (1000 * 3600 * 24) / 365.25);
    // // alert('Bulannya ' + getTahun);
    // // /////////////ini buat dapet bulan/////////////////////////
    // // var getHariIni = Math.abs(getSekarang.getTime() / (1000 * 3600 * 24) / 365.25);
    // // const getHari = +~~(calculateSekarang / (24 * 60 * 60 * 1000));
    // // const getHari = calculateSekarang / (-86400000);
    // // let tanggalExpNya = "";
    // // var Bday = +new Date(this.dataKantorForm.value.tanggal_verification);
    // let tanggalExpNya = +~~((Date.now() - getValueTanggal) / 86400000);
    // let tanggalExpNyaPakeKoma = (Date.now() - getValueTanggal) / 86400000;
    // alert("tanggal expnya "+ tanggalExpNya)
    // const getHari = getValueTanggal.getUTCDate()
    // alert(tanggalExpNyaPakeKoma)
    this.submitted = true;
    if (this.dataKantorForm.invalid) {
      return;
    } else if (this.dataKantor == null) {
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_analisa_kantor', {
          id: 0,
          app_no_de: this.app_no_de,
          aspek_syariah: this.dataKantorForm.get('aspek_syariah')?.value,
          // created_by: this.dataKantorForm.get('created_by')?.value,
          // created_date: this.dataKantorForm.get('created_date')?.value,
          divisi: this.dataKantorForm.get('divisi')?.value,
          hubungan_pemberi_keterangan: this.dataKantorForm.get('hubungan_pemberi_keterangan')?.value,
          note_verif_alamat_perusahan: this.dataKantorForm.get('note_verif_alamat_perusahan')?.value,
          note_verif_bidang_usaha: this.dataKantorForm.get('note_verif_bidang_usaha')?.value,
          note_verif_fax: this.dataKantorForm.get('note_verif_fax')?.value,
          note_verif_jabatan: this.dataKantorForm.get('note_verif_jabatan')?.value,
          // note_verif_jenis_pekerjaan: this.dataKantorForm.get('note_verif_jenis_pekerjaan')?.value,
          // note_verif_jumlah_karyawan: this.dataKantorForm.get('note_verif_jumlah_karyawan')?.value,
          note_verif_kabkota: this.dataKantorForm.get('note_verif_kabkota')?.value,
          note_verif_kecamatan: this.dataKantorForm.get('note_verif_kecamatan')?.value,
          note_verif_kelurahan: this.dataKantorForm.get('note_verif_kelurahan')?.value,
          note_verif_kode_pos: this.dataKantorForm.get('note_verif_kode_pos')?.value,
          note_verif_lama_bekerja: this.dataKantorForm.get('note_verif_lama_bekerja')?.value,
          note_verif_lama_beroperasi: this.dataKantorForm.get('note_verif_lama_beroperasi')?.value,
          note_verif_nama_perusahan: this.dataKantorForm.get('note_verif_nama_perusahan')?.value,
          note_verif_no_telepon: this.dataKantorForm.get('note_verif_no_telepon')?.value,
          note_verif_provinsi: this.dataKantorForm.get('note_verif_provinsi')?.value,
          note_verif_rt_rw: this.dataKantorForm.get('note_verif_rt_rw')?.value,
          note_verif_sektor_ekonomi: this.dataKantorForm.get('note_verif_sektor_ekonomi')?.value,
          note_verif_status_kepegawaian: this.dataKantorForm.get('note_verif_status_kepegawaian')?.value,
          note_verif_tipe_pekerjaan: this.dataKantorForm.get('note_verif_tipe_pekerjaan')?.value,
          // note_verif_tipe_perusahaan: this.dataKantorForm.get('note_verif_tipe_perusahaan')?.value,
          note_verif_usia_pensiun: this.dataKantorForm.get('note_verif_usia_pensiun')?.value,
          pemberi_keterangan: this.dataKantorForm.get('pemberi_keterangan')?.value,
          tanggal_verifikasi: this.dataKantorForm.get('tanggal_verifikasi')?.value,
          // updated_by: this.dataKantorForm.get('updated_by')?.value,
          // updated_date: this.dataKantorForm.get('updated_date')?.value,
          verif_alamat_perusahan: this.dataKantorForm.get('verif_alamat_perusahan')?.value,
          verif_bidang_usaha: this.dataKantorForm.get('verif_bidang_usaha')?.value,
          verif_fax: this.dataKantorForm.get('verif_fax')?.value,
          verif_jabatan: this.dataKantorForm.get('verif_jabatan')?.value,
          // verif_jenis_pekerjaan: this.dataKantorForm.get('verif_jenis_pekerjaan')?.value,
          // verif_jumlah_karyawan: this.dataKantorForm.get('verif_jumlah_karyawan')?.value,
          verif_kabkota: this.dataKantorForm.get('verif_kabkota')?.value,
          verif_kecamatan: this.dataKantorForm.get('verif_kecamatan')?.value,
          verif_kelurahan: this.dataKantorForm.get('verif_kelurahan')?.value,
          verif_kode_pos: this.dataKantorForm.get('verif_kode_pos')?.value,
          verif_lama_bekerja: this.dataKantorForm.get('verif_lama_bekerja')?.value,
          verif_lama_beroperasi: this.dataKantorForm.get('verif_lama_beroperasi')?.value,
          verif_nama_perusahan: this.dataKantorForm.get('verif_nama_perusahan')?.value,
          verif_no_telepon: this.dataKantorForm.get('verif_no_telepon')?.value,
          verif_provinsi: this.dataKantorForm.get('verif_provinsi')?.value,
          verif_rt_rw: this.dataKantorForm.get('verif_rt_rw ')?.value,
          verif_sektor_ekonomi: this.dataKantorForm.get('verif_sektor_ekonomi')?.value,
          verif_status_kepegawaian: this.dataKantorForm.get('verif_status_kepegawaian')?.value,
          verif_tipe_pekerjaan: this.dataKantorForm.get('verif_tipe_pekerjaan')?.value,
          // verif_tipe_perusahaan: this.dataKantorForm.get('verif_tipe_perusahaan')?.value,
          verif_usia_pensiun: this.dataKantorForm.get('verif_usia_pensiun')?.value,
          verif_nama_perusahaan: this.dataKantorForm.get('verif_nama_perusahaan')?.value,
          note_verif_nama_perusahaan: this.dataKantorForm.get('note_verif_nama_perusahaan')?.value,
          verif_alamat_perusahaan: this.dataKantorForm.get('verif_alamat_perusahaan')?.value,
          note_verif_alamat_perusahaan: this.dataKantorForm.get('note_verif_alamat_perusahaan')?.value
        })
        .subscribe({});
      this.router.navigate(['/mutasi-rekening'], { queryParams: { app_no_de: this.app_no_de } });
    } else
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/update_analisa_data_kantor', {
          id: 0,
          app_no_de: this.app_no_de,
          aspek_syariah: this.dataKantorForm.get('aspek_syariah')?.value,
          // created_by: this.dataKantorForm.get('created_by')?.value,
          // created_date: this.dataKantorForm.get('created_date')?.value,
          divisi: this.dataKantorForm.get('divisi')?.value,
          hubungan_pemberi_keterangan: this.dataKantorForm.get('hubungan_pemberi_keterangan')?.value,
          note_verif_alamat_perusahan: this.dataKantorForm.get('note_verif_alamat_perusahan')?.value,
          note_verif_bidang_usaha: this.dataKantorForm.get('note_verif_bidang_usaha')?.value,
          note_verif_fax: this.dataKantorForm.get('note_verif_fax')?.value,
          note_verif_jabatan: this.dataKantorForm.get('note_verif_jabatan')?.value,
          // note_verif_jenis_pekerjaan: this.dataKantorForm.get('note_verif_jenis_pekerjaan')?.value,
          // note_verif_jumlah_karyawan: this.dataKantorForm.get('note_verif_jumlah_karyawan')?.value,
          note_verif_kabkota: this.dataKantorForm.get('note_verif_kabkota')?.value,
          note_verif_kecamatan: this.dataKantorForm.get('note_verif_kecamatan')?.value,
          note_verif_kelurahan: this.dataKantorForm.get('note_verif_kelurahan')?.value,
          note_verif_kode_pos: this.dataKantorForm.get('note_verif_kode_pos')?.value,
          note_verif_lama_bekerja: this.dataKantorForm.get('note_verif_lama_bekerja')?.value,
          note_verif_lama_beroperasi: this.dataKantorForm.get('note_verif_lama_beroperasi')?.value,
          note_verif_nama_perusahan: this.dataKantorForm.get('note_verif_nama_perusahan')?.value,
          note_verif_no_telepon: this.dataKantorForm.get('note_verif_no_telepon')?.value,
          note_verif_provinsi: this.dataKantorForm.get('note_verif_provinsi')?.value,
          note_verif_rt_rw: this.dataKantorForm.get('note_verif_rt_rw')?.value,
          note_verif_sektor_ekonomi: this.dataKantorForm.get('note_verif_sektor_ekonomi')?.value,
          note_verif_status_kepegawaian: this.dataKantorForm.get('note_verif_status_kepegawaian')?.value,
          note_verif_tipe_pekerjaan: this.dataKantorForm.get('note_verif_tipe_pekerjaan')?.value,
          // note_verif_tipe_perusahaan: this.dataKantorForm.get('note_verif_tipe_perusahaan')?.value,
          note_verif_usia_pensiun: this.dataKantorForm.get('note_verif_usia_pensiun')?.value,
          pemberi_keterangan: this.dataKantorForm.get('pemberi_keterangan')?.value,
          tanggal_verifikasi: this.dataKantorForm.get('tanggal_verifikasi')?.value,
          // updated_by: this.dataKantorForm.get('updated_by')?.value,
          // updated_date: this.dataKantorForm.get('updated_date')?.value,
          verif_alamat_perusahan: this.dataKantorForm.get('verif_alamat_perusahan')?.value,
          verif_bidang_usaha: this.dataKantorForm.get('verif_bidang_usaha')?.value,
          verif_fax: this.dataKantorForm.get('verif_fax')?.value,
          verif_jabatan: this.dataKantorForm.get('verif_jabatan')?.value,
          // verif_jenis_pekerjaan: this.dataKantorForm.get('verif_jenis_pekerjaan')?.value,
          // verif_jumlah_karyawan: this.dataKantorForm.get('verif_jumlah_karyawan')?.value,
          verif_kabkota: this.dataKantorForm.get('verif_kabkota')?.value,
          verif_kecamatan: this.dataKantorForm.get('verif_kecamatan')?.value,
          verif_kelurahan: this.dataKantorForm.get('verif_kelurahan')?.value,
          verif_kode_pos: this.dataKantorForm.get('verif_kode_pos')?.value,
          verif_lama_bekerja: this.dataKantorForm.get('verif_lama_bekerja')?.value,
          verif_lama_beroperasi: this.dataKantorForm.get('verif_lama_beroperasi')?.value,
          verif_nama_perusahan: this.dataKantorForm.get('verif_nama_perusahan')?.value,
          verif_no_telepon: this.dataKantorForm.get('verif_no_telepon')?.value,
          verif_provinsi: this.dataKantorForm.get('verif_provinsi')?.value,
          verif_rt_rw: this.dataKantorForm.get('verif_rt_rw ')?.value,
          verif_sektor_ekonomi: this.dataKantorForm.get('verif_sektor_ekonomi')?.value,
          verif_status_kepegawaian: this.dataKantorForm.get('verif_status_kepegawaian')?.value,
          verif_tipe_pekerjaan: this.dataKantorForm.get('verif_tipe_pekerjaan')?.value,
          // verif_tipe_perusahaan: this.dataKantorForm.get('verif_tipe_perusahaan')?.value,
          verif_usia_pensiun: this.dataKantorForm.get('verif_usia_pensiun')?.value,
          verif_nama_perusahaan: this.dataKantorForm.get('verif_nama_perusahaan')?.value,
          note_verif_nama_perusahaan: this.dataKantorForm.get('note_verif_nama_perusahaan')?.value,
          verif_alamat_perusahaan: this.dataKantorForm.get('verif_alamat_perusahaan')?.value,
          note_verif_alamat_perusahaan: this.dataKantorForm.get('note_verif_alamat_perusahaan')?.value
        })
        .subscribe({});
    this.router.navigate(['/mutasi-rekening'], { queryParams: { app_no_de: this.app_no_de } });

    // // else{
    // if (tanggalExpNya > 30) {
    //   alert('Data Sudah Expired / Data Sudah Melebihin 30 Hari');
    //   return;
    // } else if (tanggalExpNyaPakeKoma < 0.1) {
    //   alert('Data Tidak Boleh Melebihi Hari ini');
    //   return;
    // }
    // // }
  }

  fetchDataKantor(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getDataKantor + this.app_no_de);
  }

  load(): void {
    // ambil semua data
    this.getFetchSemuaData().subscribe(data => {
      // if(data.code === 200) {
      this.dataEntry = data.result;
      // console.log('INI DE ',this.dataEntry);
      // console.log("ini data de "+this.fetchAllDe);
      // }
    });

    this.fetchDataKantor().subscribe(data => {
      this.dataKantorMap = data.result;
      // alert(this.dataKantorMap.note_verif_alamat_perusahaan)

      let retriveDataKantor = {
        // retrive de
        no_telepon: this.dataEntry.no_telepon,
        fax: this.dataEntry.no_telepon,
        // nama_perusahaan: this.dataEntry.nama_perusahaan,
        // alamat_perusahaan: this.dataEntry.alamat_perusahaan,
        provinsi: this.dataEntry.provinsi,
        kabkota: this.dataEntry.kabkota,
        kecamatan: this.dataEntry.kecamatan,
        kelurahan: this.dataEntry.kelurahan,
        kode_pos: this.dataEntry.kode_pos,
        // lama_bekerja_tahun: this.dataEntry.lama_bekerja_tahun,
        // lama_bekerja_bulan: this.dataEntry.lama_bekerja_bulan,
        // bidang_usaha: this.dataEntry.bidang_usaha,
        // sektor_ekonomi: this.dataEntry.sektor_ekonomi,
        // tipe_pekerjaan: this.dataEntry.tipe_pekerjaan,
        // status_kepegawaian: this.dataEntry.status_kepegawaian,
        // posisi: this.dataEntry.posisi,
        // usia_pensiun: this.dataEntry.usia_pensiun,

        // id: this.dataKantorMap.id,
        // app_no_de: this.dataKantorMap.app_no_de,
        tanggal_verifikasi: this.dataKantorMap.tanggal_verifikasi,
        pemberi_keterangan: this.dataKantorMap.pemberi_keterangan,
        hubungan_pemberi_keterangan: this.dataKantorMap.hubungan_pemberi_keterangan,
        verif_fax: this.dataKantorMap.verif_fax,
        note_verif_fax: this.dataKantorMap.note_verif_fax,
        verif_no_telepon: this.dataKantorMap.verif_no_telepon,
        note_verif_no_telepon: this.dataKantorMap.note_verif_no_telepon,
        verif_alamat_perusahaan: this.dataKantorMap.verif_alamat_perusahaan,
        note_verif_alamat_perusahaan: this.dataKantorMap.note_verif_alamat_perusahaan,
        verif_nama_perusahaan: this.dataKantorMap.verif_nama_perusahaan,
        note_verif_nama_perusahaan: this.dataKantorMap.note_verif_nama_perusahaan,
        verif_provinsi: this.dataKantorMap.verif_provinsi,
        note_verif_provinsi: this.dataKantorMap.note_verif_provinsi,
        verif_kabkota: this.dataKantorMap.verif_kabkota,
        note_verif_kabkota: this.dataKantorMap.note_verif_kabkota,
        verif_kecamatan: this.dataKantorMap.verif_kecamatan,
        note_verif_kecamatan: this.dataKantorMap.note_verif_kecamatan,
        verif_kelurahan: this.dataKantorMap.verif_kelurahan,
        note_verif_kelurahan: this.dataKantorMap.note_verif_kelurahan,
        verif_kode_pos: this.dataKantorMap.verif_kode_pos,
        note_verif_kode_pos: this.dataKantorMap.note_verif_kode_pos,
        verif_lama_bekerja: this.dataKantorMap.verif_lama_bekerja,
        note_verif_lama_bekerja: this.dataKantorMap.note_verif_lama_bekerja,
        // verif_lama_beroperasi: this.dataKantorMap.verif_lama_beroperasi,
        // note_verif_lama_beroperasi: this.dataKantorMap.note_verif_lama_beroperasi,
        verif_bidang_usaha: this.dataKantorMap.verif_bidang_usaha,
        note_verif_bidang_usaha: this.dataKantorMap.note_verif_bidang_usaha,
        // // verif_tipe_perusahaan: this.dataKantorMap.verif_tipe_perusahaan,
        // // note_verif_tipe_perusahaan: this.dataKantorMap.note_verif_tipe_perusahaan,
        // // verif_jenis_pekerjaan: this.dataKantorMap.verif_jenis_pekerjaan,
        // // note_verif_jenis_pekerjaan: this.dataKantorMap.note_verif_jenis_pekerjaan,
        // // verif_jumlah_karyawan: this.dataKantorMap.verif_jumlah_karyawan,
        // // note_verif_jumlah_karyawan: this.dataKantorMap.note_verif_jumlah_karyawan,
        verif_sektor_ekonomi: this.dataKantorMap.verif_sektor_ekonomi,
        note_verif_sektor_ekonomi: this.dataKantorMap.note_verif_sektor_ekonomi,
        verif_tipe_pekerjaan: this.dataKantorMap.verif_tipe_pekerjaan,
        note_verif_tipe_pekerjaan: this.dataKantorMap.note_verif_tipe_pekerjaan,
        verif_status_kepegawaian: this.dataKantorMap.verif_status_kepegawaian,
        note_verif_status_kepegawaian: this.dataKantorMap.note_verif_status_kepegawaian,
        verif_jabatan: this.dataKantorMap.verif_jabatan,
        note_verif_jabatan: this.dataKantorMap.note_verif_jabatan,
        verif_usia_pensiun: this.dataKantorMap.verif_usia_pensiun,
        note_verif_usia_pensiun: this.dataKantorMap.note_verif_usia_pensiun,
        divisi: this.dataKantorMap.divisi,

        aspek_syariah: this.dataKantorMap.aspek_syariah,
        // created_date: this.dataKantorMap.created_date,
        // updated_date: this.dataKantorMap.updated_date,
        // created_by: this.dataKantorMap.created_by,
        // updated_by: this.dataKantorMap.updated_by,
      };
      this.dataKantorForm.setValue(retriveDataKantor);
    });

    // ref hubungan agunan
    this.dataKantor.getHubunganAgunan().subscribe(data => {
      // console.warn('ref hubungan Agunan', data);
      if (data.code === 200) {
        this.refHubunganAgunan = data.result;
      }
    });

    // // ref jabatan
    // this.dataKantor.getJabatan().subscribe(data => {
    //   // console.warn('ref', data);
    //   if (data.code === 200) {
    //     this.refJabatan = data.result;
    //   }
    // });
    // // ref Jumlah Karyawan
    // this.dataKantor.getJumlahKaryawan().subscribe(data => {
    //   // console.warn('ref', data);
    //   if (data.code === 200) {
    //     this.refJumlahKaryawan = data.result;
    //   }
    // });
    // // ref Jenis Bidang
    // this.IdeService.getBidang().subscribe(data => {
    //   // console.log('jenis Bidang', data.result);
    //   if (data.code === 200) {
    //     this.refBidang = data.result;
    //   }
    // });
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
  // postGetTokenDuckapil(): void {
  //   this.http
  //     .post<any>('http://10.20.82.12:8083/token/generate-token', {
  //       password: '3foWeb@pp',
  //       username: 'efo',
  //     })
  //     .subscribe({
  //       next: data => {
  //         this.getToken = data.result.token;

  //         this.getProvinsiDukcapil(this.getToken).subscribe(data => {
  //           console.warn('ref', data);
  //           if (data.status === 200) {
  //             this.getProvinsi = data.body?.result;
  //           }
  //         });
  //       },
  //     });
  // }
  // getProvinsiDukcapil(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   const httpOptions = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };

  //   return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvinsi/', {
  //     headers: httpOptions,
  //     params: options,
  //     observe: 'response',
  //   });
  // }
  // getkabkota(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   const httpOptions = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const kodepotongan = kodekota.split('|');

  //   return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKota/' + kodepotongan[0], {
  //     headers: httpOptions,
  //     params: options,
  //     observe: 'response',
  //   });
  // }

  // getkecamatan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   const httpOptions = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };

  //   const kodepotongan = kodekecamatan.split('|');
  //   return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKec/' + kodepotongan[0], {
  //     headers: httpOptions,
  //     params: options,
  //     observe: 'response',
  //   });
  // }

  // getkodepos(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   const httpOptions = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const kodepotongan = kodekecamatan.split('|');
  //   return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKdPos/' + kodepotongan[0], {
  //     headers: httpOptions,
  //     params: options,
  //     observe: 'response',
  //   });
  // }

  // getkelurahan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   const httpOptions = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const kodepotongan = kodekecamatan.split('|');
  //   return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKel/' + kodepotongan[0], {
  //     headers: httpOptions,
  //     params: options,
  //     observe: 'response',
  //   });
  // }
  // onChangeProvinsi(valueProvinsi: any) {
  //   this.getkabkota(this.getToken, valueProvinsi).subscribe({
  //     next: (res: EntityArrayResponseDaWa) => {
  //       this.getKota = res.body?.result;
  //     },
  //   });
  // }

  // onChangekota(valueKota: any) {
  //   this.getkecamatan(this.getToken, valueKota).subscribe({
  //     next: (res: EntityArrayResponseDaWa) => {
  //       this.getKecamatan = res.body?.result;
  //     },
  //   });
  // }

  // onChangekecamatan(valueKecamatan: any) {
  //   this.getkelurahan(this.getToken, valueKecamatan).subscribe({
  //     next: (res: EntityArrayResponseDaWa) => {
  //       this.getKelurahan = res.body?.result;
  //     },
  //   });
  // }

  // onChangekelurahan(valueKelurahan: any) {
  //   const datakodepos = valueKelurahan.split('|');
  //   this.getKodePos = datakodepos[0];
  // }

  // onChangeBidang(bidang: any) {
  //   const poyonganGrupSektor = bidang.split('|');
  //   // alert(poyonganGrupSektor[0])
  //   return this.http
  //     .get<ApiResponse>('http://10.20.34.178:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + poyonganGrupSektor[0])
  //     .subscribe(data => {
  //       // console.log('Sektor Ekonomi', data.result);
  //       if (data.code === 200) {
  //         this.refSektor = data.result;
  //       }
  //     });
  // }
}
