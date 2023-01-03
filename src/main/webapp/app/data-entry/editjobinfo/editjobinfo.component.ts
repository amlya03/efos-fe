import { Component, Input, OnInit } from '@angular/core';
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
import { refJabatan } from 'app/verification/service/config/refJabatan.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { environment } from 'environments/environment';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-editjobinfo',
  templateUrl: './editjobinfo.component.html',
  styleUrls: ['./editjobinfo.component.scss'],
})
export class EditjobinfoComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
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
  daWa: any;
  contohkirimpyrol: any;
  edittipepekerjaan: any;
  databawakategori: any;
  getjabatandariapi: refJabatan[] = [];
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  getdatasektorekonomi: refSektor[] = [];
  getjenisbidangdariapi: refBidang[] = [];
  gettipeperusahaandariapi: any;
  untukSessionRole: any;
  nampungdatakatagoripekerjaan: any;
  kirimanjumlahkaryawan: any;
  pendapatan!: number;
  curef: any;
  retriveKodeProvinsi: any;
  retriveKodeKota: any;
  retriveKodeKecamatan: any;
  retriveKodeKelurahan: any;
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
    private SessionStorageService: SessionStorageService,
    protected initialDataEntry: InitialDataEntryService
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
      this.curef = params['curef'];
    });
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();

    ////////////////////////////// Validasi ////////////////////////////////////////////////////////
    this.editJobForm = this.formBuilder.group({
      tipe_pekerjaan: ['', Validators.required],
      payroll: ['', Validators.required],
      posisi: ['', Validators.required],
      nama_perusahaan: ['', Validators.required],
      alamat_perusahaan: ['', Validators.required],
      // ///////////////////////////////////////
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      // //////////////////////////////////////
      rt: ['', Validators.required],
      rw: ['', Validators.required],
      no_siup: '',
      umur_pensiun: ['', Validators.required],
      lama_bekerja_tahun: ['', Validators.required],
      lama_bekerja_bulan: ['', Validators.required],
      jumlah_karyawan: ['', Validators.required],
      pendapatan: ['', Validators.required],
      pendapatan_lain: ['', Validators.required],
      tunjangan: ['', Validators.required],
      total_pendapatan: '',
      tipe_perusahaan: ['', Validators.required],
      tipe_kepegawaian: ['', Validators.required],
    });
  }
  load() {
    setTimeout(() => {
      if (this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER') {
        this.editJobForm.disable();
      } else {
        this.editJobForm.enable();
      }
    }, 5);
    setTimeout(() => {
      this.datEntryService.getFetchListJenisPekerjaan().subscribe(data => {
        this.listJabatan = data.result;
      });
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchListJumlahKaryawan().subscribe(data => {
        this.ListJumlahKaryawan = data.result;
      });
    }, 20);
    setTimeout(() => {
      this.datEntryService.getFetchListJabatan().subscribe(data => {
        this.getjabatandariapi = data.result;
      });
    }, 30);
    setTimeout(() => {
      this.initialDataEntry.getBidang().subscribe(data => {
        this.getjenisbidangdariapi = data.result;
      });
    }, 40);
    setTimeout(() => {
      this.datEntryService.getFetchTipePerusahaan().subscribe(data => {
        this.gettipeperusahaandariapi = data.result;
      });
    }, 50);
    setTimeout(() => {
      this.gettokendukcapil();
    }, 60);

    setTimeout(() => {
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
            // ///////////////////////////////////////
            provinsi: '',
            kabkota: '',
            kecamatan: '',
            kelurahan: '',
            kode_pos: this.editJob.kode_pos,
            // //////////////////////////////////////
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

          setTimeout(() => {
            this.carimenggunakankodepos(this.editJob.kode_pos);
          }, 100);

          setTimeout(() => {
            this.datEntryService.getFetchListTipePekerjaan(this.databawakategori).subscribe(data => {
              this.listTipePekerjaan = data.result;
              this.getLoading(false);
            });
          }, 200);
        },
        error: error => console.warn(error),
      });
    }, 100);
  }

  gettokendukcapil() {
    this.http
      .post<any>('http://10.20.82.12:8083/token/generate-token', {
        password: '3foWeb@pp',
        username: 'efo',
      })
      .subscribe({
        next: data => {
          this.postId = data.result.token;
          this.datEntryService.getprovinsi(this.postId).subscribe(res => {
            this.daWaprof = res.body?.result;
          });
        },
      });
  }

  onChange(value: any) {
    const proValue = value.split('|');
    this.datEntryService.getkabkota(this.postId, proValue[0]).subscribe(data => {
      this.daWakota = data.body?.result;
      this.editJobForm.get('kabkota')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(this.postId, kotaValue[0]).subscribe(data => {
      this.kecamatan = data.body?.result;
      this.editJobForm.get('kecamatan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(this.postId, kecValue[0]).subscribe(data => {
      this.kelurahan = data.body?.result;
      this.editJobForm.get('kelurahan')?.setValue(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.editJobForm.get('kode_pos')?.setValue(this.daWakodepos);
  }

  jenisbidangselect() {
    const id_sektor = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');
    this.initialDataEntry.getSektor(idsektorpotongan[0]).subscribe(data => {
      this.getdatasektorekonomi = data.result;
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

    const kirimanprovinsi = this.editJobForm.get('provinsi')?.value.split('|');
    const kirimankabkota = this.editJobForm.get('kabkota')?.value.split('|');
    const kirimankecamatan = this.editJobForm.get('kecamatan')?.value.split('|');
    const kirimankelurahan = this.editJobForm.get('kelurahan')?.value.split('|');

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
        .post<any>(this.baseUrl + 'v1/efos-de/update_job_info_de', {
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
          kabkota: kirimankabkota[1],
          kategori_pekerjaan: this.editJob.kategori_pekerjaan,
          kecamatan: kirimankecamatan[1],
          kelurahan: kirimankelurahan[1],
          // nama_ibu_kandung: ' 1',
          // kepemilikan_perusahaan: npwp.value,
          kode_pos: this.editJobForm.get('kode_pos')?.value,
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
          provinsi: kirimanprovinsi[1],
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
    //     app_no_de: contohtampunganappde,
    //     datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
    //   },
    // });
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: this.datakiriman,
    //     app_no_de: this.app_no_de,
    //     // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
    //   },
    // });
  }

  gotojobinfo() {
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }

  carimenggunakankodepos(kodepost: any) {
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
      this.editJobForm.get('provinsi')?.setValue(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChange(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChangekota(this.retriveKodeKota + '|' + this.retrivekabkota);
      this.onChangekecamatan(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
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
