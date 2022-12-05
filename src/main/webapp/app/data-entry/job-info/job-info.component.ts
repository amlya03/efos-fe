import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { jobinfolist } from './job-info-modellist';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { getJob } from '../services/config/getJob.model';
import Swal from 'sweetalert2';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';
import { getListTipePekerjaan } from '../services/config/getListTipePekerjaan.model';

export type EntityResponseDaWa = HttpResponse<jobinfolist>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss'],
})
export class JobInfoComponent implements OnInit {
  jobInfoForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  jobInfo: getJob[] = [];
  listJabatan: refJenisPekerjaan[] = [];
  listTipePekerjaan: getListTipePekerjaan[] = [];
  datakiriman!: string;
  statusPerkawinan!: string;
  app_no_de!: string;
  datakirimanakategoripekerjaan!: string;
  daWa: any;
  nampungsebelum: any;
  tampunganid: any;
  bawaidjob: any;
  nampungdatakatagoripekerjaan: any;
  getjenispekerjaandariapi: any;
  gettipeperusahaandariapi: any;
  getjenisbidangdariapi: any;
  getdatasektorekonomi: any;
  getjumlahkaryawandariapi: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  daWakotaD: any;
  kecamatanD: any;
  kelurahanD: any;
  daWakodeposD: any;
  daWakotasebelum: any;
  getjabatandariapi: any;
  getjabatansebelum: any;
  getjumlahkaryawansebelumdariapi: any;
  keteranganstatusnikah: any;
  curef: any;
  tampungantipepekerjaan: any;
  tampungantipeagunan: any;
  contohkirimanpayrol: any;
  contohkirimpyrol: any;
  untukSessionRole: any;
  datajobsebelum: any;
  dataretrivejobsebelumMap: any;
  dataretriveprovinsisebelum: any;
  dataretrivekabkotasebelum: any;
  dataretrivekecamatansebelum: any;
  dataretrivekelurahansebelum: any;
  dataretrivetipepegawaiansebelum: any;
  dataretrivetikategoripekerjaansebelum: any;
  dataretrivetipepekerjaansebelum: any;
  dataretrivejenisbidangsebelum: any;
  dataretrivesektorekosebelum: any;
  pendapatan!: number;
  pendapatanlain!: number;
  tunjangan!: number;
  formattedAmount: any;
  amount: any;
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;
  retriveKodeProvinsi: any;
  retriveKodeKota: any;
  retriveKodeKecamatan: any;
  retriveKodeKelurahan: any;
  retriveprovinsisebelum: any;
  retrivekabkotasebelum: any;
  retrivekecamatansebelum: any;
  retrivekelurahansebelum: any;
  /// Validasi
  tipePekerjaanValidasi: any;
  payrollValidasi: any;
  posisiValidasi: any;
  jenisPekerjaanValidasi: any;
  namaPerusahaanValidasi: any;
  alamatValidasi: any;
  rtValidasi: any;
  rwValidasi: any;
  noSiupValidasi: any;
  jenisBidangValidasi: any;
  sektorEkonomiValidasi: any;
  umurPensiunValidasi: any;
  lamaBekerjaTahunValidasi: any;
  lamaBekerjaBulanValidasi: any;
  jumlahKaryawanValidasi: any;
  tipePerusahaanValidasi: any;
  tipeKepegawaianValidasi: any;

  //////////////////////////////
  untukListJob: any;
  tipePekerjaanChange: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService, // private currencyPipe: CurrencyPipe
    private currencyPipe: CurrencyPipe
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
      this.statusPerkawinan = params['statusPerkawinan'];
      this.app_no_de = params['app_no_de'];
    });
  }
  // URL DE
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  // Get Job Sebelum
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  protected apigetjenispekeraan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_pekerjaan?sc='
  );
  protected apilisttipeperusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_perusahaan'
  );
  protected apilistjabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_jabatan');
  protected apijumlahkaryawan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jumlah_karyawan'
  );
  protected apiuntukgetsemuadataebrdasarkande = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd='
  );

  protected apilistjenisbidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    // const job_info_retrive = (<HTMLInputElement>document.getElementById("job_info")).value;
    // localStorage.setItem('daftar_aplikasi_de', job_info_retrive)
    ////////////////////////////// Validasi ////////////////////////////////////////////////////////
    this.jobInfoForm = this.formBuilder.group({
      tipe_pekerjaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      payroll: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      posisi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      // ///////////////////////////////////////
      provinsi: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
      kabkota: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
      kecamatan: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
      kelurahan: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
      kode_pos: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
      // //////////////////////////////////////
      rt: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_siup: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      umur_pensiun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_tahun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_bulan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jumlah_karyawan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan_lain: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tunjangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      total_pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_kepegawaian: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
    this.datajobsebelum = this.formBuilder.group({
      kategori_pekerjaan_sebelum: '',
      tipe_pekerjaan_sebelum: '',
      // pay_roll: '',
      posisi_sebelum: '',
      nama_perusahaan_sebelum: '',
      id: '',
      curef: '',
      alamat_pekerjaan_sebelum: '',
      provinsi_sebelum: '',
      kabkota_sebelum: '',
      kecamatan_sebelum: '',
      kelurahan_sebelum: '',
      kode_pos_sebelum: '',
      rt_sebelum: '',
      rw_sebelum: '',
      jenis_bidang_sebelum: '',
      sektor_ekonomi_sebelum: '',
      lama_bekerja_tahun_sebelum: '',
      lama_bekerja_bulan_sebelum: '',
      jumlah_karyawan_sebelum: '',
      // jumlah_karyawan_sebelumnya: '',
      tipe_perusahaan_sebelum: '',
      tipe_kepegawaian_sebelum: '',
    });

    this.load();
  }

  // DE
  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  load() {
    // ambil semua data DE
    this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      // console.warn('contohdata', data.result);
      this.dataEntry = data.result;
      // this.
      this.nampungdatakatagoripekerjaan = this.dataEntry.kategori_pekerjaan;

      // untuk list job
      if (this.dataEntry.kategori_pekerjaan == 'Fix Income') {
        this.untukListJob = 1;
      } else if (this.dataEntry.kategori_pekerjaan == 'Non Fix Income') {
        this.untukListJob = 2;
      }

      this.datEntryService.getFetchListTipePekerjaan(this.untukListJob).subscribe(data => {
        this.listTipePekerjaan = data.result;
      });
    });

    this.datEntryService.getFetchListJenisPekerjaan().subscribe(data => {
      this.listJabatan = data.result;
    });

    this.gettokendukcapil();
    this.getstatuspernikahan();

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.daWa = res.body?.result;
      },
    });
    this.datEntryService.getFetchSemuaDataJob(this.curef).subscribe(data => {
      this.jobInfo = data.result;
      console.log(this.jobInfo);
      // alert(this.jobInfo[0] == null)
    });
    this.sebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);

        // if (res.body?.result == null) {
        this.nampungsebelum = res.body?.result;
        this.tampunganid = this.nampungsebelum[0];
        console.warn('tampunganid', this.tampunganid);
        // } else {

        //   this.tampunganid = this.nampungsebelum[0];

        //   // if (this.tampunganid.kategori_pekerjaan_sebelum == 'Non Fix Income') {
        //   //   this.tampungantipepekerjaan = 'Non Fix Income';
        //   // } else if (this.tampunganid.kategori_pekerjaan_sebelum == 'Fix Income') {
        //   //   this.tampungantipepekerjaan = 'Fix Income';
        //   // } else {
        //   //   this.tampungantipepekerjaan = 'tolong pilih kategori pekerjaan yang benar';
        //   // }
        //   // this.tampunganjobsebelumtipepekerjaan = this.nampungsebelum[0];
        //   console.warn('SEBELUMNYA', this.tampunganid);

        //   // this.onResponseSuccess(res);
        // }

        if (this.tampunganid == null || this.tampunganid == undefined) {
          this.dataretrivejobsebelumMap = res.body?.result;
          // alert('inijalan');
          let retrivejobsebelum = {
            kategori_pekerjaan_sebelum: '',
            tipe_pekerjaan_sebelum: '',
            // pay_roll: '',
            posisi_sebelum: '',
            nama_perusahaan_sebelum: '',
            id: '',
            curef: '',
            alamat_pekerjaan_sebelum: '',
            provinsi_sebelum: '',
            kabkota_sebelum: '',
            kecamatan_sebelum: '',
            kelurahan_sebelum: '',
            kode_pos_sebelum: '',
            rt_sebelum: '',
            rw_sebelum: '',
            jenis_bidang_sebelum: '',
            sektor_ekonomi_sebelum: '',
            lama_bekerja_tahun_sebelum: '',
            lama_bekerja_bulan_sebelum: '',
            jumlah_karyawan_sebelum: '',
            // jumlah_karyawan_sebelumnya: this.tampunganid.jumlah_karyawan_sebelumnya,
            tipe_perusahaan_sebelum: '',
            tipe_kepegawaian_sebelum: '',
          };
          this.datajobsebelum.setValue(retrivejobsebelum);
          this.dataretriveprovinsisebelum = 'pilih provinsi';
          this.dataretrivekabkotasebelum = 'pilih kota';
          this.dataretrivekecamatansebelum = 'pilih kecamatan';
          this.dataretrivekelurahansebelum = 'pilih kelurahan';
          this.dataretrivetipepegawaiansebelum = 'pilih tipe kepegawaian';
          this.dataretrivetikategoripekerjaansebelum = 'pilih kategori pekerjaan';
          this.dataretrivetipepekerjaansebelum = 'pilih tipe pekerjaan';
          this.dataretrivejenisbidangsebelum = 'pilih jenis bidang ';
          this.dataretrivesektorekosebelum = 'pilih jenis sektor';
        } else {
          this.dataretrivejobsebelumMap = res.body?.result;
          let retrivejobsebelum = {
            kategori_pekerjaan_sebelum: this.tampunganid.kategori_pekerjaan_sebelum,
            tipe_pekerjaan_sebelum: '',
            // pay_roll: '',
            posisi_sebelum: this.tampunganid.posisi_sebelum,
            nama_perusahaan_sebelum: this.tampunganid.nama_perusahaan_sebelum,
            id: this.tampunganid.id,
            curef: this.tampunganid.curef,
            alamat_pekerjaan_sebelum: this.tampunganid.alamat_pekerjaan_sebelum,
            provinsi_sebelum: this.tampunganid.provinsi_sebelum,
            kabkota_sebelum: '',
            kecamatan_sebelum: '',
            kelurahan_sebelum: '',
            kode_pos_sebelum: this.tampunganid.kode_pos_sebelum,
            rt_sebelum: this.tampunganid.rt_sebelum,
            rw_sebelum: this.tampunganid.rw_sebelum,
            jenis_bidang_sebelum: this.tampunganid.jenis_bidang_sebelum,
            sektor_ekonomi_sebelum: '',
            lama_bekerja_tahun_sebelum: this.tampunganid.lama_bekerja_tahun_sebelum,
            lama_bekerja_bulan_sebelum: this.tampunganid.lama_bekerja_bulan_sebelum,
            jumlah_karyawan_sebelum: this.tampunganid.jumlah_karyawan_sebelum,
            // jumlah_karyawan_sebelumnya: this.tampunganid.jumlah_karyawan_sebelumnya,
            tipe_perusahaan_sebelum: this.tampunganid.tipe_perusahaan_sebelum,
            tipe_kepegawaian_sebelum: this.tampunganid.tipe_kepegawaian_sebelum,
          };
          // alert(this.tampunganid.provinsi_sebelum);

          this.datajobsebelum.setValue(retrivejobsebelum);
          this.dataretriveprovinsisebelum = this.tampunganid.provinsi_sebelum;
          this.dataretrivekabkotasebelum = this.tampunganid.kabkota_sebelum;
          this.dataretrivekecamatansebelum = this.tampunganid.kecamatan_sebelum;
          this.dataretrivekelurahansebelum = this.tampunganid.kelurahan_sebelum;
          this.dataretrivetipepegawaiansebelum = this.tampunganid.tipe_kepegawaian_sebelum;
          this.dataretrivetikategoripekerjaansebelum = this.tampunganid.kategori_pekerjaan_sebelum;
          this.dataretrivetipepekerjaansebelum = this.tampunganid.tipe_pekerjaan_sebelum;
          this.dataretrivejenisbidangsebelum = this.tampunganid.jenis_bidang_sebelum;
          this.dataretrivesektorekosebelum = this.tampunganid.sektor_ekonomi_sebelum;
        }

        if (this.untukSessionRole == 'VER_PRE_SPV') {
          // alert('ini if');
          this.datajobsebelum.disable();
        } else {
          // alert('ini else');
          this.datajobsebelum.enable();
        }
      },
    });

    this.getlisttipeperusahaan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('tipe_perusahaan', res.body?.result);
        this.gettipeperusahaandariapi = res.body?.result;
      },
    });

    this.getlistjabatan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jabatan', res.body?.result);
        this.getjabatandariapi = res.body?.result;
      },
    });

    this.getlistjenisbidang().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenisbidang', res.body?.result);
        this.getjenisbidangdariapi = res.body?.result;
      },
    });
    this.getjumlahkaryawan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jumlahkaryawan', res.body?.result);
        this.getjumlahkaryawandariapi = res.body?.result;
      },
    });

    this.getjumlahkaryawansebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jumlahkaryawan', res.body?.result);
        this.getjumlahkaryawansebelumdariapi = res.body?.result;
      },
    });

    this.getlistjabatansebelum().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('jabatansebelum', res);

        this.getjabatansebelum = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
  }

  load2() {
    this.sebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;

        console.warn('SEBELUMNYA', this.nampungsebelum);

        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.curef, { params: options, observe: 'response' });
  }

  sebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.curef, { params: options, observe: 'response' });
  }

  getjenispekerjaan(katagori_pekerjaan: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);

    if (katagori_pekerjaan == 'Non Fix Income') {
      var idkatagoripekerjaan = '2';
    }
    {
      var idkatagoripekerjaan = '1';
    }

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + idkatagoripekerjaan, { params: options, observe: 'response' });
  }

  getjenispekerjaansebelum(katagori_pekerjaansebelum: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    var katagori_pekerjaansebelumvalue = katagori_pekerjaansebelum.split('|');

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + katagori_pekerjaansebelumvalue[0], {
      params: options,
      observe: 'response',
    });
  }
  getlistjabatansebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjabatan, { params: options, observe: 'response' });
  }

  getlistjabatan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjabatan, { params: options, observe: 'response' });
  }

  getlisttipeperusahaan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilisttipeperusahaan, { params: options, observe: 'response' });
  }
  getlistjenisbidang(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjenisbidang, { params: options, observe: 'response' });
  }

  jenisbidangselect() {
    const id_sektor = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');

    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomi = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
  }

  jenisbidangsebelumselect() {
    const id_sektor = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');

    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomi = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
  }

  getsektorekonomi(idsktor: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // const httpOptions = {
    //   // 'Authorization': token,
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // };
    // const kodepotongan = kodekota.split('|');
    return this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + idsktor, {
      params: options,
      observe: 'response',
    });
  }

  transformAmount(element: any) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'Rp');

    element.target.value = this.formattedAmount;
  }

  getjumlahkaryawan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apijumlahkaryawan, { params: options, observe: 'response' });
  }
  getjumlahkaryawansebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apijumlahkaryawan, { params: options, observe: 'response' });
  }
  getsemuadataberdasarkanappde(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apiuntukgetsemuadataebrdasarkande + this.app_no_de, {
      params: options,
      observe: 'response',
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
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          console.warn(data.result.token);
          console.warn(this.postId);

          this.datEntryService.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
            },
          });

          // this.getdataentry(this.postId).subscribe({
          //   next: (res: EntityArrayResponseDaWa) => {
          //     this.daWa = res.body?.result;
          //     // this.onResponseSuccess(res);
          //     console.warn('loadingNIH',this.postId );

          //   },
          // });
        },
      });
  }

  getstatuspernikahan(): void {
    this.getsemuadataberdasarkanappde().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('cekstatuspernikahan', res.body?.result);
        this.keteranganstatusnikah = res.body?.result.status_perkawinan;
      },
    });
  }

  katagoripekerjaanselect() {
    const provinsi_cabang = document.getElementById('kategori_pekerjaan_sebelum') as HTMLInputElement | any;

    var pemisahjumlahkaryawan = provinsi_cabang.value.split('|');
    if (provinsi_cabang.value.indexOf('|') !== -1) {
      var pemisahnya = pemisahjumlahkaryawan[1];
    } else {
      var pemisahnya = provinsi_cabang.value;
    }

    this.nampungdatakatagoripekerjaan = pemisahnya;

    this.getjenispekerjaansebelum(provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res.body?.result);

        this.daWakotasebelum = res.body?.result;

        // if (pemisahnya == 1 || pemisahnya == 'Fix Income') {
        //   this.tampungantipeagunan = '1';
        // } else if (pemisahnya == 2 || pemisahnya == 'Non Fix Income') {
        //   this.tampungantipeagunan = '2';
        // } else if (pemisahnya == 2 || pemisahnya == 'Lain-lainnya') {
        //   this.tampungantipeagunan = '3';
        // } else {
        //   this.tampungantipeagunan = '4';
        // }

        // this.onResponseSuccess(res);
      },
    });
  }

  onChange(value: any) {
    const proValue = value.split('|');
    this.datEntryService.getkabkota(this.postId, proValue[0]).subscribe(data => {
      this.daWakota = data.body?.result;
      this.jobInfoForm.get('kabkota')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(this.postId, kotaValue[0]).subscribe(data => {
      this.kecamatan = data.body?.result;
      this.jobInfoForm.get('kecamatan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(this.postId, kecValue[0]).subscribe(data => {
      this.kelurahan = data.body?.result;
      this.jobInfoForm.get('kelurahan')?.setValue(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.jobInfoForm.get('kode_pos')?.setValue(this.daWakodepos);
  }

  onChangeD() {
    const provinsi_cabang = document.getElementById('provinsi_sebelum') as HTMLInputElement | any;

    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotaD = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekotaD() {
    const provinsi_cabang = document.getElementById('kabkota_sebelum') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatanD = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekecamatanD() {
    const provinsi_cabang = document.getElementById('kecamatan_sebelum') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahanD = res.body?.result;

        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekelurahanD() {
    const provinsi_cabang = document.getElementById('kelurahan_sebelum') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_sebelum') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodeposD = datakodepos[0];

    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodeposD;

    // document.getElementById('kode_pos').value=this.daWakodepos;

    // this.onResponseSuccess(res);
  }

  goto() {
    // this.onResponseSuccess(res);
    // alert(this.statusPerkawinan);
    if (this.statusPerkawinan === 'Menikah') {
      this.router.navigate(['/data-entry/data-pasangan'], {
        queryParams: {
          curef: this.curef,
          statusPerkawinan: this.statusPerkawinan,
          app_no_de: this.app_no_de,
        },
      });

      console.warn(this.curef);
    } else {
      this.router.navigate(['/data-entry/collateral'], {
        queryParams: {
          curef: this.curef,
          statusPerkawinan: this.statusPerkawinan,
          app_no_de: this.app_no_de,
        },
      });
    }
  }

  updatejobsebelum() {
    if (this.daWa == '') {
      alert('Perkerjaan Belum Ada');
      return;
    } else {
      const kategori_pekerjaan_sebelum = document.getElementById('kategori_pekerjaan_sebelum') as HTMLInputElement | any;
      const tipe_pekerjaan_sebelum = document.getElementById('tipe_pekerjaan_sebelum') as HTMLInputElement | any;
      const posisi_sebelum = document.getElementById('posisi_sebelum') as HTMLInputElement | any;
      const nama_perusahaan_sebelum = document.getElementById('nama_perusahaan_sebelum') as HTMLInputElement | any;
      const alamat_pekerjaan_sebelum = document.getElementById('alamat_pekerjaan_sebelum') as HTMLInputElement | any;
      const provinsi_sebelum = document.getElementById('provinsi_sebelum') as HTMLInputElement | any;
      const kabkota_sebelum = document.getElementById('kabkota_sebelum') as HTMLInputElement | any;
      const kecamatan_sebelum = document.getElementById('kecamatan_sebelum') as HTMLInputElement | any;
      const kelurahan_sebelum = document.getElementById('kelurahan_sebelum') as HTMLInputElement | any;
      const kode_pos_sebelum = document.getElementById('kode_pos_sebelum') as HTMLInputElement | any;
      const rt_sebelum = document.getElementById('rt_sebelum') as HTMLInputElement | any;
      const rw_sebelum = document.getElementById('rw_sebelum') as HTMLInputElement | any;
      const jenis_bidang_sebelum = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
      const sektor_ekonomi_sebelum = document.getElementById('sektor_ekonomi_sebelum') as HTMLInputElement | any;
      const lama_bekerja_tahun_sebelum = document.getElementById('lama_bekerja_tahun_sebelum') as HTMLInputElement | any;
      const lama_bekerja_bulan_sebelum = document.getElementById('lama_bekerja_bulan_sebelum') as HTMLInputElement | any;
      const jumlah_karyawan_sebelum = document.getElementById('jumlah_karyawan_sebelum') as HTMLInputElement | any;
      const jumlah_karyawan_sebelumnya = document.getElementById('jumlah_karyawan_sebelumnya') as HTMLInputElement | any;
      const tipe_perusahaan_sebelum = document.getElementById('tipe_perusahaan_sebelum') as HTMLInputElement | any;
      const tipe_kepegawaian_sebelum = document.getElementById('tipe_kepegawaian_sebelum') as HTMLInputElement | any;
      const id = document.getElementById('id') as HTMLInputElement | any;
      const curef = document.getElementById('curef') as HTMLInputElement | any;

      var kirimanpotonganprovinsi = provinsi_sebelum.value.split('|');
      var cekdatapipe = provinsi_sebelum.value.indexOf('|');
      var cekpipejenisbidang = jenis_bidang_sebelum.value.indexOf('|');
      var kirimanjenisbidang1 = jenis_bidang_sebelum.value.split('|');

      const kirimanpayrol = (<HTMLInputElement>document.getElementById('payrollid')).checked;
      const kirimannonpayrol = (<HTMLInputElement>document.getElementById('nonpayrollid')).checked;

      if (kirimanpayrol == true) {
        this.contohkirimanpayrol = 1;
      } else if (kirimannonpayrol == true) {
        this.contohkirimanpayrol = 0;
      } else {
        this.contohkirimanpayrol = 9;
      }

      if (cekdatapipe !== -1) {
        var kirimanprovinsi = kirimanpotonganprovinsi[1];

        // alert("update provinsi bawa value pipe |"+kirimanprovinsi)
      } else {
        //  var kirimanprovinsi =kirimanpotonganprovinsi[1];
        var kirimanprovinsi = provinsi_sebelum.value;
        // alert("update provinsi bawa value"+kirimanprovinsi)
      }
      var potongankabkota = kabkota_sebelum.value.split('|');
      if (kabkota_sebelum.value.indexOf('|') !== -1) {
        var kirimankabkota = potongankabkota[1];
      } else {
        var kirimankabkota = kabkota_sebelum.value;
      }
      var potongankecamatan = kecamatan_sebelum.value.split('|');
      if (kecamatan_sebelum.value.indexOf('|') !== -1) {
        var kirimankecamatan = potongankecamatan[1];
      } else {
        var kirimankecamatan = kecamatan_sebelum.value;
      }
      var potongankelurahan = kelurahan_sebelum.value.split('|');
      if (kelurahan_sebelum.value.indexOf('|') !== -1) {
        var kirimankelurahan = potongankelurahan[1];
      } else {
        var kirimankelurahan = kelurahan_sebelum.value;
      }

      var potongankategori = kelurahan_sebelum.value.split('|');
      if (kelurahan_sebelum.value.indexOf('|') !== -1) {
        var kirimankategori = potongankategori[1];
      } else {
        var kirimankategori = kelurahan_sebelum.value;
      }

      // if (jenis_bidang_sebelum.value.indexOf('|') !== -1) {
      //   var jneisbidangsebelumnya = jenis_bidang_sebelum.value.split('|');
      //   var kirimanjenisbidang = jneisbidangsebelumnya[1];
      //   alert('ada piope nya' + jenis_bidang_sebelum.values + jneisbidangsebelumnya[1]);
      // } else {
      //   alert('gkada');
      //   var kirimanjenisbidang = jenis_bidang_sebelum.value;
      // }
      var potonganjenisbidang = jenis_bidang_sebelum.value.split('|');
      if (jenis_bidang_sebelum.value.indexOf('|') !== -1) {
        var kirimanjenisbidang = potonganjenisbidang[1];
      } else {
        var kirimanjenisbidang = jenis_bidang_sebelum.value;
      }

      var potongansektor = sektor_ekonomi_sebelum.value.split('|');
      if (sektor_ekonomi_sebelum.value.indexOf('|') !== -1) {
        var kirimansektor = potongansektor[1];
      } else {
        var kirimansektor = sektor_ekonomi_sebelum.value;
      }

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_job_sebelum_de', {
          // headers: headers,

          alamat_pekerjaan_sebelum: alamat_pekerjaan_sebelum.value,
          id: id.value,
          // jabatan_sebelum: contohtampungancuref,
          jenis_bidang_sebelum: kirimanjenisbidang,
          // jenis_pekerjaan_sebelum: usia.value,
          // jumlah_karyawan_sebelum: jumlah_karyawan_sebelum.value,
          kategori_pekerjaan_sebelum: kategori_pekerjaan_sebelum.value,
          kabkota_sebelum: kirimankabkota,
          kecamatan_sebelum: kirimankecamatan,
          kelurahan_sebelum: kirimankelurahan,
          kode_pos_sebelum: kode_pos_sebelum.value,
          lama_bekerja_bulan_sebelum: lama_bekerja_bulan_sebelum.value,
          lama_bekerja_tahun_sebelum: lama_bekerja_tahun_sebelum.value,
          nama_perusahaan_sebelum: nama_perusahaan_sebelum.value,
          payroll_sebelum: this.contohkirimanpayrol,
          posisi_sebelum: posisi_sebelum.value,
          provinsi_sebelum: kirimanprovinsi,
          rt_sebelum: rt_sebelum.value,
          // nama_ibu_kandung: ' 1',
          rw_sebelum: rw_sebelum.value,
          sektor_ekonomi_sebelum: kirimansektor,
          // tahun_berdiri_sebelum: id.value,
          tipe_kepegawaian_sebelum: tipe_kepegawaian_sebelum.value,
          tipe_pekerjaan_sebelum: tipe_pekerjaan_sebelum.value,
          tipe_perusahaan_sebelum: tipe_perusahaan_sebelum.value,
          // umur_pensiun_sebelum: kirimankabkota,
          curef: curef.value,
        })

        .subscribe({
          next: bawaan => {
            //           this.contohdata = bawaan.result.app_no_de;
            // this.databawaan = bawaan.result.app_no_de;

            // this.router.navigate(['/data-entry/job-info'], {
            //   queryParams: {
            //     datakiriman:  this.datakiriman,
            //     datakirimanstatus: this.datakirimanstatus,
            //     datakirimanappde: this.datakirimanappde,
            //     datakirimanakategoripekerjaan:   this.datakirimanakategoripekerjaan,
            //   },
            // });

            if (this.keteranganstatusnikah === 'Menikah') {
              this.router.navigate(['/data-entry/data-pasangan'], {
                queryParams: {
                  curef: this.curef,
                  statusPerkawinan: this.statusPerkawinan,
                  app_no_de: this.app_no_de,
                },
              });
              // alert(' ini NIKAH');
              console.warn(this.curef);
            } else {
              // alert('ini jomblo');
              // alert(contohtampungancuref);
              this.router.navigate(['/data-entry/collateral'], {
                queryParams: {
                  curef: this.curef,
                  statusPerkawinan: this.statusPerkawinan,
                  app_no_de: this.app_no_de,
                },
              });
            }
          },
        });
    }
  }

  vieweditjobinfo(contohtampungancuref: any, id: any): void {
    // alert(getAppNoDe);
    // alert(id);
    this.router.navigate(['/data-entry/editjobinfo'], {
      // queryParams: { app_no_de: getAppNoDe }
      queryParams: {
        app_no_de: this.app_no_de,
        // datakirimanakategoripekerjaan: this.curefakategoripekerjaan,
        curef: this.curef,
        datakirimanid: id,
        statusPerkawinan: this.statusPerkawinan,
      },
    });
  }

  buatcreatejobinfo() {
    if (
      this.tipePekerjaanValidasi == '' ||
      this.payrollValidasi == '' ||
      this.posisiValidasi == '' ||
      this.jenisPekerjaanValidasi == '' ||
      this.namaPerusahaanValidasi == '' ||
      this.alamatValidasi == '' ||
      this.rtValidasi == '' ||
      this.rwValidasi == '' ||
      this.noSiupValidasi == '' ||
      this.jenisBidangValidasi == '' ||
      this.sektorEkonomiValidasi == '' ||
      this.umurPensiunValidasi == '' ||
      this.lamaBekerjaTahunValidasi == '' ||
      this.lamaBekerjaBulanValidasi == '' ||
      this.jumlahKaryawanValidasi == '' ||
      this.tipePerusahaanValidasi == '' ||
      this.tipeKepegawaianValidasi == ''
    ) {
      // alert("Bisa")
      return;
    } else {
      const kategori_pekerjaan = document.getElementById('kategori_pekerjaan') as HTMLInputElement | any;
      const curef_id = document.getElementById('curef_id') as HTMLInputElement | any;
      const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
      // const npwp = document.getElementById('npwp') as HTMLInputElement | any;
      // const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
      const jabatan = document.getElementById('jabatan') as HTMLInputElement | any;
      const jenis_pekerjaan = document.getElementById('jenis_pekerjaan') as HTMLInputElement | any;
      const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
      const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
      const provinsi_cabang_perusahaan = document.getElementById('provinsi_cabang_perusahaan') as HTMLInputElement | any;
      const kabkota_cabang_perusahaan = document.getElementById('kabkota_cabang_perusahaan') as HTMLInputElement | any;
      const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
      const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
      const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
      const rt = document.getElementById('rt') as HTMLInputElement | any;
      const rw = document.getElementById('rw') as HTMLInputElement | any;
      const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
      const jenis_bidang_perusahaan = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
      const jenis_sektor_perusahaan = document.getElementById('jenis_sektor_perusahaan') as HTMLInputElement | any;
      const posisi = document.getElementById('posisi') as HTMLInputElement | any;
      const umur_pensiun = document.getElementById('umur_pensiun') as HTMLInputElement | any;
      const lama_bekerja_tahun = document.getElementById('lama_bekerja_tahun') as HTMLInputElement | any;
      const lama_bekerja_bulan = document.getElementById('lama_bekerja_bulan') as HTMLInputElement | any;
      const jumlah_karyawan = document.getElementById('jumlah_karyawan') as HTMLInputElement | any;
      const jumlah_karyawan2 = document.getElementById('jumlah_karyawan2') as HTMLInputElement | any;
      const pendapatan = document.getElementById('pendapatan') as HTMLInputElement | any;
      const pendapatan_lain = document.getElementById('pendapatan_lain') as HTMLInputElement | any;
      const tunjangan = document.getElementById('tunjangan') as HTMLInputElement | any;
      const total_pendapatan = document.getElementById('total_pendapatan') as HTMLInputElement | any;
      const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
      const tipe_kepegawaian = document.getElementById('tipe_kepegawaian') as HTMLInputElement | any;

      // alert(jumlah_karyawan.value);
      // alert(jumlah_karyawan2.value);

      const kirimanpyroljob = (<HTMLInputElement>document.getElementById('payroll')).checked;
      const kirimanpyroljob1 = (<HTMLInputElement>document.getElementById('payroll1')).checked;

      if (kirimanpyroljob == true) {
        this.contohkirimpyrol = 1;
      } else if (kirimanpyroljob1 == true) {
        this.contohkirimpyrol = 0;
      } else {
        this.contohkirimpyrol = 9;
      }

      const kirimanprovinsi = this.jobInfoForm.get('provinsi')?.value.split('|');
      const kirimankabkota = this.jobInfoForm.get('kabkota')?.value.split('|');
      const kirimankecamatan = this.jobInfoForm.get('kecamatan')?.value.split('|');
      const kirimankelurahan = this.jobInfoForm.get('kelurahan')?.value.split('|');

      var potonganjenisbidang = jenis_bidang_perusahaan.value.split('|');
      if (jenis_bidang_perusahaan.value.indexOf('|') !== -1) {
        var jenisbidangkirim = potonganjenisbidang[1];
      } else {
        var jenisbidangkirim = jenis_bidang_perusahaan.value;
      }

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
          // headers: headers,
          alamat_perusahaan: this.jobInfoForm.get('alamat_perusahaan')?.value,
          curef: this.curef,
          id: '',
          payroll: this.jobInfoForm.get('payroll')?.value,
          jabatan: this.jobInfoForm.get('posisi')?.value,
          jenis_bidang: jenisbidangkirim,
          jenis_pekerjaan: this.jobInfoForm.get('jenis_pekerjaan')?.value,
          jumlah_karyawan: this.jobInfoForm.get('jumlah_karyawan')?.value,
          kategori_pekerjaan: this.dataEntry.kategori_pekerjaan,
          lama_bekerja_bulan: this.jobInfoForm.get('lama_bekerja_bulan')?.value,
          lama_bekerja_tahun: this.jobInfoForm.get('lama_bekerja_tahun')?.value,
          nama_perusahaan: this.jobInfoForm.get('nama_perusahaan')?.value,
          no_siup: this.jobInfoForm.get('no_siup')?.value,
          pendapatan: this.jobInfoForm.get('pendapatan')?.value,
          pendapatan_lain: this.jobInfoForm.get('pendapatan_lain')?.value,
          posisi: this.jobInfoForm.get('posisi')?.value,
          provinsi: kirimanprovinsi[1],
          kabkota: kirimankabkota[1],
          kecamatan: kirimankecamatan[1],
          kelurahan: kirimankelurahan[1],
          kode_pos: this.jobInfoForm.get('kode_pos')?.value,
          rt: this.jobInfoForm.get('rt')?.value,
          rw: this.jobInfoForm.get('rw')?.value,
          sektor_ekonomi: jenis_sektor_perusahaan.value,
          tipe_kepegawaian: this.jobInfoForm.get('tipe_kepegawaian')?.value,
          tipe_pekerjaan: this.jobInfoForm.get('tipe_pekerjaan')?.value,
          tipe_perusahaan: this.jobInfoForm.get('tipe_perusahaan')?.value,
          total_pendapatan:
            Number(this.jobInfoForm.get('pendapatan')?.value) +
            Number(this.jobInfoForm.get('pendapatan_lain')?.value) +
            Number(this.jobInfoForm.get('tunjangan')?.value),
          tunjangan: this.jobInfoForm.get('tunjangan')?.value,
          umur_pensiun: this.jobInfoForm.get('umur_pensiun')?.value,
          lama_bekerja_bulan_sebelum: '',
          lama_bekerja_tahun_sebelum: '',
        })

        .subscribe({
          next: response => {
            if (response.code) {
              alert('Berhasil Menyimpan Data');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
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
  }

  carimenggunakankodepost(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe(data => {
      this.retriveKodeProvinsi = data.body?.result.provKec.kd_prov;
      this.retriveKodeKota = data.body?.result.provKec.kd_kota;
      this.retriveKodeKecamatan = data.body?.result.provKec.kd_kec;
      this.retriveprovinsi = data.body?.result.provKec.nm_prov;
      this.retrivekabkota = data.body?.result.provKec.nm_kota;
      this.retrivekecamatan = data.body?.result.provKec.nm_kec;

      if (data.body?.result.provKec.kd_kel == null) {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.body?.result.kels[0].namaWilayah;
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      } else {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.body?.result.provKec.nm_kel;
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      }
      this.jobInfoForm.get('provinsi')?.setValue(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChange(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChangekota(this.retriveKodeKota + '|' + this.retrivekabkota);
      this.onChangekecamatan(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  ////sebelum

  carimenggunakankodepostsebelum(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.dataretriveprovinsisebelum = res.body?.result.provKec.nm_prov;

        this.dataretrivekabkotasebelum = res.body?.result.provKec.nm_kota;

        this.dataretrivekecamatansebelum = res.body?.result.provKec.nm_kec;

        this.dataretrivekelurahansebelum = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.dataretriveprovinsisebelum + '|' +    this.dataretriveprovinsisebelum);
        $('#provinsi_sebelum option:first').text(this.dataretriveprovinsisebelum);
        // $('#provinsi_cabang_perusahaan option:first').text(this.dataretriveprovinsisebelum);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_sebelum option:first').text(this.dataretrivekabkotasebelum);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_sebelum option:first').text(this.dataretrivekecamatansebelum);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_sebelum option:first').text(this.dataretrivekelurahansebelum);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  ////sebelum

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

  hapusJobList(idJob: any): void {
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
          .post<any>('http://10.20.34.110:8805/api/v1/efos-de/delete_jobinfo', {
            id: idJob,
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
