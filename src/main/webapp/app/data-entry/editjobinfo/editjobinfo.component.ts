/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
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
  // ////////////////////////////
  tipePekerjaanChange: any;
  clickKdPost = 0;
  responseKels: refJenisPekerjaan[] = [];
  responseNamaWilayah: refJenisPekerjaan[] = [];

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    private sessionStorageService: SessionStorageService,
    protected initialDataEntry: InitialDataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params.datakirimanakategoripekerjaan;
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanid = params.datakirimanid;
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.load();
    // //////////////////////////// Validasi ////////////////////////////////////////////////////////
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
      jumlah_karyawan: ['', [Validators.min(25), Validators.required]],
      pendapatan: ['', Validators.required],
      pendapatan_lain: ['', Validators.required],
      tunjangan: ['', Validators.required],
      total_pendapatan: '',
      tipe_perusahaan: ['', Validators.required],
      tipe_kepegawaian: ['', Validators.required],
    });
  }
  load(): void {
    setTimeout(() => {
      if (this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER') {
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
      this.datEntryService.getprovinsi().subscribe(res => {
        this.daWaprof = res.result;
      });
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
          // ///////////////////////////////////////////////////////////////////////////
          const retriveEditJob = {
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

          // //////////////////////////////////////////////////////////////////////////
          if (this.editJob.kategori_pekerjaan === 'Fix Income') {
            this.databawakategori = 1;
          } else if (this.editJob.kategori_pekerjaan === 'Non Fix Income') {
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

  onChange(value: any): void {
    this.getLoading(true);
    const proValue = value.split('|');
    this.datEntryService.getkabkota(proValue[0]).subscribe(data => {
      this.getLoading(false);
      this.daWakota = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.editJobForm.get('kabkota')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any): void {
    this.getLoading(true);
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(kotaValue[0]).subscribe(data => {
      this.getLoading(false);
      this.kecamatan = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.editJobForm.get('kecamatan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any): void {
    this.getLoading(true);
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(kecValue[0]).subscribe(data => {
      this.getLoading(false);
      this.kelurahan = data.result;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.editJobForm.get('kelurahan')?.setValue(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
    });
  }

  onChangekelurahan(value: any): void {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.editJobForm.get('kode_pos')?.setValue(this.daWakodepos);
  }

  jenisbidangselect(): void {
    this.getLoading(true);
    const id_sektor = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');
    this.initialDataEntry.getSektor(idsektorpotongan[0]).subscribe(data => {
      this.getLoading(false);
      this.getdatasektorekonomi = data.result;
    });
  }

  updatejobinfo(): void {
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const sektor_ekonomi = document.getElementById('jenis_sektor') as HTMLInputElement | any;

    const kirimanprovinsi = this.editJobForm.get('provinsi')?.value.split('|');
    const kirimankabkota = this.editJobForm.get('kabkota')?.value.split('|');
    const kirimankecamatan = this.editJobForm.get('kecamatan')?.value.split('|');
    const kirimankelurahan = this.editJobForm.get('kelurahan')?.value.split('|');

    const potonganjenisbidang = jenis_bidang.value.split('|');
    let jenisbidangkirim: any;
    if (jenis_bidang.value.indexOf('|') !== -1) {
      jenisbidangkirim = potonganjenisbidang[1];
    } else {
      jenisbidangkirim = jenis_bidang.value;
    }

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
          sektor_ekonomi: sektor_ekonomi.value,
          jenis_pekerjaan: this.editJobForm.get('posisi')?.value,
          jumlah_karyawan: this.editJobForm.get('jumlah_karyawan')?.value,
          kategori_pekerjaan: this.editJob.kategori_pekerjaan,
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
          kabkota: kirimankabkota[1],
          kecamatan: kirimankecamatan[1],
          kelurahan: kirimankelurahan[1],
          rt: this.editJobForm.get('rt')?.value,
          rw: this.editJobForm.get('rw')?.value,
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

  gotojobinfo(): void {
    this.sessionStorageService.store('jobInfo', 1);
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }

  carimenggunakankodepos(kodepost: any): void {
    this.datEntryService.getKdpost(kodepost).subscribe(data => {
      if (this.clickKdPost == 1) {
        this.responseKels = data.result.kels;
        this.responseKels.forEach(element => {
          this.responseKels.push(element);
          if (element.kdPos == kodepost) {
            const namaWIl = element.namaWilayah;
            this.responseNamaWilayah.push(namaWIl);
          }
        });
      }
      this.retriveKodeProvinsi = data.result.provKec.kd_prov;
      this.retriveKodeKota = data.result.provKec.kd_kota;
      this.retriveKodeKecamatan = data.result.provKec.kd_kec;
      this.retriveprovinsi = data.result.provKec.nm_prov;
      this.retrivekabkota = data.result.provKec.nm_kota;
      this.retrivekecamatan = data.result.provKec.nm_kec;

      setTimeout(() => {
        // eslint-disable-next-line eqeqeq
        if (this.clickKdPost == 1) {
          if (data.result.kels == null) {
            this.retriveKodeKelurahan = kodepost;
            this.retrivekelurahan = '';
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
          } else if (data.result.provKec.kd_kel == null) {
            this.retriveKodeKelurahan = kodepost;
            this.retrivekelurahan = this.responseNamaWilayah[this.responseNamaWilayah.length - 1];
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
          } else {
            this.retriveKodeKelurahan = kodepost;
            this.retrivekelurahan = data.result.provKec.nm_kel;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
          }
        } else {
          this.retriveKodeKelurahan = kodepost;
          this.retrivekelurahan = this.editJob.kelurahan;
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
        }
      }, 10);
      this.editJobForm.get('provinsi')?.setValue(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChange(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChangekota(this.retriveKodeKota + '|' + this.retrivekabkota);
      this.onChangekecamatan(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
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

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
