import { Component, Input, OnInit } from '@angular/core';
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
import { environment } from 'environments/environment';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { refTipePerusahaan } from '../services/config/refTipePerusahaan.model';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { refJabatan } from 'app/verification/service/config/refJabatan.model';
import { refJumlahKaryawan } from 'app/verification/service/config/refJumlahKaryawan.model';

export type EntityResponseDaWa = HttpResponse<jobinfolist>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss'],
})
export class JobInfoComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  jobInfoForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  jobInfo: getJob[] = [];
  ideJob: getJob[] = [];
  listJabatan: refJenisPekerjaan[] = [];
  listTipePekerjaan: getListTipePekerjaan[] = [];
  datakiriman!: string;
  statusPerkawinan!: string;
  app_no_de!: string;
  datakirimanakategoripekerjaan!: string;
  nampungsebelum: any;
  tampunganid: any;
  bawaidjob: any;
  nampungdatakatagoripekerjaan: any;
  getjenispekerjaandariapi: refJenisPekerjaan[] = [];
  gettipeperusahaandariapi: refTipePerusahaan[] = [];
  getjenisbidangdariapi: refBidang[] = [];
  getdatasektorekonomi: refSektor[] = [];
  getjumlahkaryawandariapi: refJumlahKaryawan[] = [];
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
  tipePekerjaanSebelum: getListTipePekerjaan[] = [];
  getjabatandariapi: refJabatan[] = [];
  getjabatansebelum: refJabatan[] = [];
  jumlahKaryawanSebelum: refJumlahKaryawan[] = [];
  keteranganstatusnikah: any;
  curef: any;
  tampungantipepekerjaan: any;
  tampungantipeagunan: any;
  contohkirimanpayrol: any;
  contohkirimpyrol: any;
  untukSessionRole: any;
  datajobsebelum!: FormGroup;
  dataretrivejobsebelumMap: any;
  kodeProvSeb: any;
  kodeKotaSeb: any;
  kodeKelSeb: any;
  kodeKecSeb: any;
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
    private currencyPipe: CurrencyPipe,
    protected initialDataEntry: InitialDataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
      this.statusPerkawinan = params['statusPerkawinan'];
      this.app_no_de = params['app_no_de'];
    });
  }

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
      payroll_sebelum: '1',
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

  load() {
    // ambil semua data DE
    this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;

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
    this.initialDataEntry.getTokenDukcapil().subscribe({
      next: data => {
        this.postId = data.result.token;
        this.datEntryService.getprovinsi(this.postId).subscribe({
          next: (res: EntityArrayResponseDaWa) => {
            this.daWaprof = res.body?.result;
          },
        });
      },
    });

    this.datEntryService.getFetchSemuaDataJob(this.curef).subscribe(data => {
      this.jobInfo = data.result;
      //console.log(this.jobInfo);
      // alert(this.jobInfo[0] == null)
    });

    this.initialDataEntry.getJobByCurefIDE(this.curef).subscribe(job => {
      this.ideJob = job.result;

      this.nampungsebelum = job.result;
      this.tampunganid = job.result[0];

      if (job.result == null) {
        // alert('inijalan');
        let retrivejobsebelum = {
          kategori_pekerjaan_sebelum: '',
          tipe_pekerjaan_sebelum: '',
          payroll_sebelum: '',
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
      } else {
        let retrivejobsebelum = {
          kategori_pekerjaan_sebelum: this.tampunganid.kategori_pekerjaan_sebelum,
          tipe_pekerjaan_sebelum: '',
          payroll_sebelum: this.tampunganid.payroll_sebelum,
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
      }

      if (this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER') {
        this.datajobsebelum.disable();
      } else {
        this.datajobsebelum.enable();
      }
    });

    this.datEntryService.getFetchTipePerusahaan().subscribe(tipe => {
      this.gettipeperusahaandariapi = tipe.result;
    });

    this.datEntryService.getFetchListJabatan().subscribe(jab => {
      this.getjabatandariapi = jab.result;
    });

    this.initialDataEntry.getBidang().subscribe(bidang => {
      this.getjenisbidangdariapi = bidang.result;
    });

    this.datEntryService.getFetchListJumlahKaryawan().subscribe(karyawan => {
      this.getjumlahkaryawandariapi = karyawan.result;
    });

    this.datEntryService.getFetchListJumlahKaryawan().subscribe(karyawan => {
      this.jumlahKaryawanSebelum = karyawan.result;
    });

    this.datEntryService.getFetchListJabatan().subscribe(jab => {
      this.getjabatansebelum = jab.result;
    });
  }

  getjenispekerjaan(katagori_pekerjaan: any, req1?: any) {
    const options = createRequestOption(req1);

    if (katagori_pekerjaan == 'Non Fix Income') {
      var idkatagoripekerjaan = '2';
    }
    {
      var idkatagoripekerjaan = '1';
    }

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    // return this.http.get<ApiResponse>(this.apigetjenispekeraan + idkatagoripekerjaan, { params: options, observe: 'response' });
  }

  getjenispekerjaansebelum(katagori_pekerjaansebelum: any, req1?: any) {
    // const options = createRequestOption(req1);
    // var katagori_pekerjaansebelumvalue = katagori_pekerjaansebelum.split('|');
    // // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    // return this.http.get<ApiResponse>(this.apigetjenispekeraan + katagori_pekerjaansebelumvalue[0], {
    //   params: options,
    //   observe: 'response',
    // });
  }

  jenisbidangselect() {
    const id_sektor = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');

    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        //console.warn('kota', res);

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
        //console.warn('kota', res);

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
    return this.http.get<ApiResponse>(this.baseUrl + 'v1/efos-ide/list_sektor_ekonomi?se=' + idsktor, {
      params: options,
      observe: 'response',
    });
  }

  transformAmount(element: any) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'Rp');

    element.target.value = this.formattedAmount;
  }

  katagoripekerjaanselect(value: any) {
    const pemisahjumlahkaryawan = value.split('|');
    if (value.indexOf('|') !== -1) {
      this.nampungdatakatagoripekerjaan = pemisahjumlahkaryawan[0];
    } else {
      this.nampungdatakatagoripekerjaan = value;
    }
    this.datEntryService.getFetchListTipePekerjaan(this.nampungdatakatagoripekerjaan).subscribe({
      next: data => {
        this.tipePekerjaanSebelum = data.result;
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

  onChangeD(value: any) {
    const proValue = value.split('|');
    this.datEntryService.getkabkota(this.postId, proValue[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.daWakotaD = res.body?.result;
        this.datajobsebelum.get('kabkota_sebelum')?.setValue(this.kodeKotaSeb + '|' + this.dataretrivekabkotasebelum);
      },
    });
  }

  onChangekotaD(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(this.postId, kotaValue[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.kecamatanD = res.body?.result;
        this.datajobsebelum.get('kecamatan_sebelum')?.setValue(this.kodeKecSeb + '|' + this.dataretrivekecamatansebelum);
      },
    });
    //console.log();
  }

  onChangekecamatanD(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(this.postId, kecValue[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.kelurahanD = res.body?.result;
        this.datajobsebelum.get('kelurahan_sebelum')?.setValue(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
      },
    });
    //console.log();
  }

  onChangekelurahanD(value: any) {
    const kelValue = value.split('|');
    this.daWakodeposD = kelValue[0];
    this.datajobsebelum.get('kode_pos_sebelum')?.setValue(this.daWakodeposD);
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

      //console.warn(this.curef);
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
    if (this.ideJob == null) {
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
        .post<any>(this.baseUrl + 'v1/efos-de/update_job_sebelum_de', {
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
            if (this.dataEntry.status_perkawinan === 'Menikah') {
              this.router.navigate(['/data-entry/data-pasangan'], {
                queryParams: {
                  curef: this.curef,
                  statusPerkawinan: this.statusPerkawinan,
                  app_no_de: this.app_no_de,
                },
              });
            } else {
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
    this.getLoading(true);
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
      const jenis_bidang_perusahaan = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
      const jenis_sektor_perusahaan = document.getElementById('jenis_sektor_perusahaan') as HTMLInputElement | any;
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
        .post<any>(this.baseUrl + 'v1/efos-ide/create_job_info', {
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
                this.getLoading(false);
                window.location.reload();
              }, 1000);
            }
          },
          error: error => {
            if (error.error.code == 400) {
              this.getLoading(false);
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

  carimenggunakankodepostsebelum(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe({
      next: data => {
        this.dataretriveprovinsisebelum = data.body?.result.provKec.nm_prov;
        this.dataretrivekabkotasebelum = data.body?.result.provKec.nm_kota;
        this.dataretrivekecamatansebelum = data.body?.result.provKec.nm_kec;
        // this.dataretrivekelurahansebelum = data.body?.result.provKec.nm_kel;
        this.kodeProvSeb = data.body?.result.provKec.kd_prov;
        this.kodeKotaSeb = data.body?.result.provKec.kd_kota;
        this.kodeKecSeb = data.body?.result.provKec.kd_kec;
        // this.kodeKelSeb = data.body?.result.provKec.kd_kel;
        // alert(this.dataretriveprovinsisebelum + this.dataretrivekabkotasebelum + this.dataretrivekecamatansebelum)

        if (data.body?.result.provKec.kd_kel == null) {
          this.kodeKelSeb = kodepost;
          this.dataretrivekelurahansebelum = data.body?.result.kels[0].namaWilayah;
          this.onChangekelurahanD(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
        } else {
          this.kodeKelSeb = kodepost;
          this.dataretrivekelurahansebelum = data.body?.result.provKec.nm_kel;
          this.onChangekelurahanD(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
        }
        this.datajobsebelum.get('provinsi_sebelum')?.setValue(this.kodeProvSeb + '|' + this.dataretriveprovinsisebelum);
        this.onChangeD(this.kodeProvSeb + '|' + this.dataretriveprovinsisebelum);
        this.onChangekotaD(this.kodeKotaSeb + '|' + this.dataretrivekabkotasebelum);
        this.onChangekecamatanD(this.kodeKecSeb + '|' + this.dataretrivekecamatansebelum);
      },
    });

    //console.log(req);
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
          .post<any>(this.baseUrl + 'v1/efos-de/delete_jobinfo', {
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

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
