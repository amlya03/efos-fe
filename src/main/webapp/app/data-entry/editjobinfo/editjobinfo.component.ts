import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getJobById } from '../services/config/getJobById.model';
import { getListTipePekerjaan } from '../services/config/getListTipePekerjaan.model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-editjobinfo',
  templateUrl: './editjobinfo.component.html',
  styleUrls: ['./editjobinfo.component.scss'],
})
export class EditjobinfoComponent implements OnInit {
  editJobForm!: FormGroup;
  listTipePekerjaan: getListTipePekerjaan[] = [];
  listJabatan: refJenisPekerjaan[] = [];
  ListJumlahKaryawan: refListJumlahKaryawan[] = [];
  editJob: getJobById = new getJobById();
  submitted = false;
  app_no_de: any;
  datakirimanakategoripekerjaan: any;
  datakiriman: any;
  datakirimanid: any;
  statusPerkawinan: any;

  protected apigetjenispekeraan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_pekerjaan?sc='
  );
  protected apilisttipeperusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_perusahaan'
  );
  protected apilistjenisbidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');

  protected apilistjabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_jabatan');
  daWa: any;
  contohkirimpyrol: any;
  edittipepekerjaan: any;
  databawakategori: any;
  getjabatandariapi: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  getdatasektorekonomi: any;
  getjenisbidangdariapi: any;
  gettipeperusahaandariapi: any;
  untukSessionRole: any;
  nampungdatakatagoripekerjaan: any;
  kirimanjumlahkaryawan: any;
  pendapatan!: number;
  curef: any;
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;
  //////////////////////////////
  tipePekerjaanChange: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanid = params['datakirimanid'];
    });
    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params['statusPerkawinan'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();

    ////////////////////////////// Validasi ////////////////////////////////////////////////////////
    this.editJobForm = this.formBuilder.group({
      tipe_pekerjaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      payroll: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      posisi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rt: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_siup: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      umur_pensiun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_tahun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_bulan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jumlah_karyawan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan_lain: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tunjangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      total_pendapatan: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
      tipe_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_kepegawaian: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }
  load() {
    this.gettokendukcapil();
    this.datEntryService.getEditJobById(this.datakirimanid).subscribe({
      next: response => {
        this.editJob = response.result;
        this.retriveprovinsi = this.editJob.provinsi;
        this.retrivekabkota = this.editJob.kabkota;
        this.retrivekecamatan = this.editJob.kecamatan;
        this.retrivekelurahan = this.editJob.kelurahan;
        this.nampungdatakatagoripekerjaan = this.editJob.kategori_pekerjaan;
        /////////////////////////////////////////////////////////////////////////////
        let retriveEditJob = {
          tipe_pekerjaan: this.editJob.tipe_pekerjaan,
          payroll: this.editJob.payroll,
          posisi: this.editJob.posisi,
          nama_perusahaan: this.editJob.nama_perusahaan,
          alamat_perusahaan: this.editJob.alamat_perusahaan,
          rt: this.editJob.rt,
          rw: this.editJob.rw,
          no_siup: this.editJob.no_siup,
          umur_pensiun: this.editJob.umur_pensiun,
          lama_bekerja_tahun: this.editJob.lama_bekerja_tahun,
          lama_bekerja_bulan: this.editJob.lama_bekerja_bulan,
          jumlah_karyawan: this.editJob.jumlah_karyawan,
          pendapatan: this.editJob.pendapatan,
          pendapatan_lain: this.editJob.pendapatan_lain,
          tunjangan: this.editJob.tunjangan,
          total_pendapatan: this.editJob.total_pendapatan,
          tipe_perusahaan: this.editJob.tipe_perusahaan,
          tipe_kepegawaian: this.editJob.tipe_kepegawaian,
        };
        this.editJobForm.setValue(retriveEditJob);

        ////////////////////////////////////////////////////////////////////////////
        if (this.editJob.kategori_pekerjaan == 'Fix Income') {
          this.databawakategori = 1;
        } else if (this.editJob.kategori_pekerjaan == 'Non Fix Income') {
          this.databawakategori = 2;
        }
        this.datEntryService.getFetchListTipePekerjaan(this.databawakategori).subscribe(data => {
          this.listTipePekerjaan = data.result;
        });
      },
      error: error => console.warn(error),
    });

    this.datEntryService.getFetchListJenisPekerjaan().subscribe(data => {
      this.listJabatan = data.result;
    });

    this.datEntryService.getFetchListJumlahKaryawan().subscribe(data => {
      this.ListJumlahKaryawan = data.result;
    });

    this.getlistjabatan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('jabatan', res.body?.result);
        this.getjabatandariapi = res.body?.result;
      },
    });

    this.getlistjenisbidang().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('jenisbidang', res.body?.result);
        this.getjenisbidangdariapi = res.body?.result;
      },
    });

    this.getlisttipeperusahaan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tipe_perusahaan', res.body?.result);
        this.gettipeperusahaandariapi = res.body?.result;
      },
    });
  }

  getlisttipeperusahaan(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilisttipeperusahaan, { params: options, observe: 'response' });
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
        },
      });
  }

  getlistjabatan(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjabatan, { params: options, observe: 'response' });
  }

  getlistjenisbidang(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjenisbidang, { params: options, observe: 'response' });
  }

  getjenispekerjaan(contoh: any, req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    const katagori_pekerjaansebelum = document.getElementById('kategori_pekerjaan') as HTMLInputElement | any;
    // var katagori_pekerjaansebelumvalue = katagori_pekerjaansebelum.split('|');
    // alert('asdwaAAA' + contoh);
    // alert('contohonoh' + this.databawakategori);
    // alert('inivalue' + katagori_pekerjaansebelum.value);
    if (contoh == 'Fix Income') {
      var kiriman = 1;
    } else if (contoh == 'Non Fix Income') {
      var kiriman = 2;
    } else {
      var kiriman = 3;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + kiriman, {
      params: options,
      observe: 'response',
    });
  }

  onChange() {
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;

    // alert(this.postId);

    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekota() {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekecamatan() {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekelurahan() {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    // alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodepos;
    // alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
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
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  jenisbidangselect() {
    const id_sektor = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');
    // alert(this.postId);
    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomi = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  updatejobinfo() {
    // contohtampungankategoripekerjaan: any // contohtampunganappde: any, // contohtampungstatuskawain: any, // contohtampungancuref: any,
    const kategori_pekerjaan = document.getElementById('kategori_pekerjaan') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const posisi = document.getElementById('posisi') as HTMLInputElement | any;
    const jenis_pekerjaan = document.getElementById('jenis_pekerjaan') as HTMLInputElement | any;
    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const provinsi = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const sektor_ekonomi = document.getElementById('jenis_sektor') as HTMLInputElement | any;
    const umur = document.getElementById('umur1') as HTMLInputElement | any;
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

    // alert(pendapatan.value);
    // alert(tunjangan.value);

    const kirimanpyroljob = (<HTMLInputElement>document.getElementById('payroll')).checked;
    const kirimanpyroljob1 = (<HTMLInputElement>document.getElementById('payroll1')).checked;

    var kirimanpendapatan = Number(pendapatan.value.replace(/[^0-9\.-]+/g, ''));
    var kirimanpendapatanlain = Number(pendapatan_lain.value.replace(/[^0-9\.-]+/g, ''));
    var kirimantunjangan = Number(tunjangan.value.replace(/[^0-9\.-]+/g, ''));
    var kirimantotalpendapatan = Number(total_pendapatan.value.replace(/[^0-9\.-]+/g, ''));

    if (kategori_pekerjaan.value == 'Fix Income') {
      var kirimanjumlahkaryawan = jumlah_karyawan.value;
    } else if (kategori_pekerjaan.value == 'Non Fix Income') {
      var kirimanjumlahkaryawan = jumlah_karyawan2.value;
    } else {
      var kirimanjumlahkaryawan = null;
    }

    if (kirimanpyroljob == true) {
      this.contohkirimpyrol = 1;
    } else if (kirimanpyroljob1 == true) {
      this.contohkirimpyrol = 0;
    } else {
      this.contohkirimpyrol = 9;
    }
    var potonganprov = provinsi.value.split('|');
    if (provinsi.value.indexOf('|') !== -1) {
      var kirimanprovinsi = potonganprov[1];
    } else {
      var kirimanprovinsi = provinsi.value;
    }
    var potongankabkota = kabkota.value.split('|');
    if (kabkota.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankabkota[1];
    } else {
      var kirimankabkota = kabkota.value;
    }
    var potongankecamatan = kecamatan.value.split('|');
    if (kecamatan.value.indexOf('|') !== -1) {
      var kirimankecamatan = potongankecamatan[1];
    } else {
      var kirimankecamatan = kecamatan.value;
    }
    var potongankelurahan = kelurahan.value.split('|');
    if (kelurahan.value.indexOf('|') !== -1) {
      var kirimankelurahan = potongankelurahan[1];
    } else {
      var kirimankelurahan = kelurahan.value;
    }
    var potonganjenisbidang = jenis_bidang.value.split('|');
    if (jenis_bidang.value.indexOf('|') !== -1) {
      var jenisbidangkirim = potonganjenisbidang[1];
    } else {
      var jenisbidangkirim = jenis_bidang.value;
    }

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    if (this.editJobForm.invalid) {
      alert('Isi data dengan Benar');
      return;
    } else {
      this.submitted = true;
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_job_info_de', {
          // headers: headers,

          // alamat_pekerjaan_sebelum: alamat_perusahaan.value,
          alamat_perusahaan: this.editJobForm.get('alamat_perusahaan')?.value,
          // barang_jasa: contohtampungancuref,
          bulan_berdiri: this.editJobForm.get('bulan_berdiri')?.value,
          // bulan_berdiri_sebelum: usia.value,
          // created_by: app_no_ide.value,
          // created_date: contohtampunganappde,
          curef: this.curef,
          id: this.datakirimanid,
          // jabatan: this.editJobForm.get('posisi')?.value,
          jenis_bidang: jenisbidangkirim,
          jenis_pekerjaan: this.editJobForm.get('posisi')?.value,
          jumlah_karyawan: this.editJobForm.get('jumlah_karyawan')?.value,
          kabkota: kirimankabkota,
          kategori_pekerjaan: this.editJob.kategori_pekerjaan,
          kecamatan: kirimankecamatan,
          kelurahan: kirimankelurahan,
          // nama_ibu_kandung: ' 1',
          // kepemilikan_perusahaan: npwp.value,
          kode_pos: kode_pos.value,
          lama_bekerja_bulan: this.editJobForm.get('lama_bekerja_bulan')?.value,
          lama_bekerja_tahun: this.editJobForm.get('lama_bekerja_tahun')?.value,
          nama_perusahaan: this.editJobForm.get('nama_perusahaan')?.value,
          no_siup: this.editJobForm.get('no_siup')?.value,
          // no_telepon: kabkota_cabang.value,
          // npwp: kabkota_domisili.value,
          payroll: this.editJobForm.get('payroll')?.value,
          // pemilik_usaha: kecamatan_domisili.value,
          pendapatan: this.editJobForm.get('pendapatan')?.value,
          pendapatan_lain: this.editJobForm.get('pendapatan_lain')?.value,
          posisi: this.editJobForm.get('posisi')?.value,
          provinsi: kirimanprovinsi,
          rt: this.editJobForm.get('rt')?.value,
          rw: this.editJobForm.get('rw')?.value,
          sektor_ekonomi: sektor_ekonomi.value,
          tahun_berdiri: this.editJobForm.get('tahun_berdiri')?.value,
          tipe_kepegawaian: this.editJobForm.get('tipe_kepegawaian')?.value,
          tipe_pekerjaan: this.editJobForm.get('tipe_pekerjaan')?.value,
          tipe_perusahaan: this.editJobForm.get('tipe_perusahaan')?.value,
          total_pendapatan: this.editJobForm.get('total_pendapatan')?.value,
          tunjangan: this.editJobForm.get('tunjangan')?.value,
          umur_pensiun: this.editJobForm.get('umur_pensiun')?.value,
        })

        .subscribe({
          next: bawaan => {
            //           this.contohdata = bawaan.result.app_no_de;
            // this.databawaan = bawaan.result.app_no_de;
            // alert('MASUKAJAHSUSAH');
            this.router.navigate(['/data-entry/job-info'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
                //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
              },
            });
          },
        });
    }
    // alert(contohtampungancuref);
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: contohtampungancuref,
    //     statusPerkawinan: contohtampungstatuskawain,
    //     app_no_de: contohtampunganappde,
    //     datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
    //   },
    // });
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: this.datakiriman,
    //     statusPerkawinan: this.statusPerkawinan,
    //     app_no_de: this.app_no_de,
    //     // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
    //   },
    // });
  }

  gotojobinfo() {
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
        //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
      },
    });
  }

  carimenggunakankodepos(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.retriveprovinsi = res.body?.result.provKec.nm_prov;

        this.retrivekabkota = res.body?.result.provKec.nm_kota;

        this.retrivekecamatan = res.body?.result.provKec.nm_kec;

        this.retrivekelurahan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang option:first').text(this.retriveprovinsi);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang option:first').text(this.retrivekabkota);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan option:first').text(this.retrivekecamatan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan option:first').text(this.retrivekelurahan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
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
  }
}
