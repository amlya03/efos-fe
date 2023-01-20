import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { modelJobIde } from 'app/initial-data-entry/services/config/modelJobIde.model';

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
  ideJob: modelJobIde = new modelJobIde();
  listJabatan: refJenisPekerjaan[] = [];
  listTipePekerjaan: getListTipePekerjaan[] = [];
  app_no_de!: string;
  nampungsebelum: any;
  tampunganid: modelJobIde = new modelJobIde();
  nampungdatakatagoripekerjaan: any;
  gettipeperusahaandariapi: refTipePerusahaan[] = [];
  getjenisbidangdariapi: refBidang[] = [];
  getdatasektorekonomi: refSektor[] = [];
  getjumlahkaryawandariapi: refJumlahKaryawan[] = [];
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
  curef: any;
  untukSessionRole: any;
  datajobsebelum!: FormGroup;
  kodeProvSeb: any;
  kodeKotaSeb: any;
  kodeKelSeb: any;
  kodeKecSeb: any;
  dataretriveprovinsisebelum: any;
  dataretrivekabkotasebelum: any;
  dataretrivekecamatansebelum: any;
  dataretrivekelurahansebelum: any;
  dataretrivejenisbidangsebelum: any;
  dataretrivesektorekosebelum: any;
  pendapatan!: number;
  tunjangan!: number;
  formattedAmount: any;
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;
  retriveKodeProvinsi: any;
  retriveKodeKota: any;
  retriveKodeKecamatan: any;
  retriveKodeKelurahan: any;
  //////////////////////////////
  untukListJob: any;
  // //////////////////////////
  clickKdPostSebelum = 0;
  responseKels: refJenisPekerjaan[] = [];
  responseKelsSebelum: refJenisPekerjaan[] = [];
  responseNamaWilayah: refJenisPekerjaan[] = [];
  responseNamaWilayahSebelum: refJenisPekerjaan[] = [];
  // //////////////////////////
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
      this.app_no_de = params['app_no_de'];
    });
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    // const job_info_retrive = (<HTMLInputElement>document.getElementById("job_info")).value;
    // localStorage.setItem('daftar_aplikasi_de', job_info_retrive)
    ////////////////////////////// Validasi ////////////////////////////////////////////////////////
    this.jobInfoForm = this.formBuilder.group({
      tipe_pekerjaan: '',
      payroll: '1',
      posisi: '',
      nama_perusahaan: '',
      alamat_perusahaan: '',
      // ///////////////////////////////////////
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      // //////////////////////////////////////
      rt: '',
      rw: '',
      no_siup: '',
      umur_pensiun: '',
      lama_bekerja_tahun: '',
      lama_bekerja_bulan: '',
      jumlah_karyawan: '',
      pendapatan: '',
      pendapatan_lain: '0',
      tunjangan: '',
      total_pendapatan: '',
      tipe_perusahaan: '',
      tipe_kepegawaian: '',
      jenis_bidang: '',
      sektor_ekonomi: '',
    });
    this.datajobsebelum = this.formBuilder.group({
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
      // jumlah_karyawan_sebelumnya: '',
      tipe_perusahaan_sebelum: '',
      tipe_kepegawaian_sebelum: '',
    });
    this.load();
  }

  load() {
    setTimeout(() => {
      if (this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER') {
        this.jobInfoForm.disable();
        this.datajobsebelum.disable();
      } else {
        this.jobInfoForm.enable();
        this.datajobsebelum.enable();
      }
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchTipePerusahaan().subscribe(tipe => {
        this.gettipeperusahaandariapi = tipe.result;
      });
    }, 15);
    setTimeout(() => {
      this.datEntryService.getFetchListJabatan().subscribe(jab => {
        this.getjabatandariapi = jab.result;
      });
    }, 20);
    setTimeout(() => {
      this.initialDataEntry.getBidang().subscribe(bidang => {
        this.getjenisbidangdariapi = bidang.result;
      });
    }, 35);
    setTimeout(() => {
      this.datEntryService.getFetchListJumlahKaryawan().subscribe(karyawan => {
        this.getjumlahkaryawandariapi = karyawan.result;
      });
    }, 40);
    setTimeout(() => {
      this.datEntryService.getFetchListJumlahKaryawan().subscribe(karyawan => {
        this.jumlahKaryawanSebelum = karyawan.result;
      });
    }, 45);
    setTimeout(() => {
      this.datEntryService.getFetchListJabatan().subscribe(jab => {
        this.getjabatansebelum = jab.result;
      });
    }, 50);
    setTimeout(() => {
      this.datEntryService.getprovinsi().subscribe({
        next: res => {
          this.daWaprof = res.result;
        },
      });
    }, 55);
    setTimeout(() => {
      this.datEntryService.getFetchListJenisPekerjaan().subscribe(data => {
        this.listJabatan = data.result;
      });
    }, 60);

    setTimeout(() => {
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
    }, 65);

    setTimeout(() => {
      this.datEntryService.getFetchSemuaDataJob(this.curef).subscribe(data => {
        this.jobInfo = data.result;
        //console.log(this.jobInfo);
        // alert(this.jobInfo[0] == null)
        const validasiTipePek = <FormControl>this.jobInfoForm.get('tipe_pekerjaan');
        // const validasiPosisi = <FormControl>this.jobInfoForm.get('posisi');
        const validasiNamaPer = <FormControl>this.jobInfoForm.get('nama_perusahaan');
        const validasiAlamatPer = <FormControl>this.jobInfoForm.get('alamat_perusahaan');
        const validasiPro = <FormControl>this.jobInfoForm.get('provinsi');
        const validasiKot = <FormControl>this.jobInfoForm.get('kabkota');
        const validasiKec = <FormControl>this.jobInfoForm.get('kecamatan');
        const validasiKel = <FormControl>this.jobInfoForm.get('kelurahan');
        const validasiKodePos = <FormControl>this.jobInfoForm.get('kode_pos');
        const validasiRt = <FormControl>this.jobInfoForm.get('rt');
        const validasiRw = <FormControl>this.jobInfoForm.get('rw');
        // const validasiNoSi = <FormControl>this.jobInfoForm.get('no_siup');
        const validasiJeBid = <FormControl>this.jobInfoForm.get('jenis_bidang');
        const validasiSektor = <FormControl>this.jobInfoForm.get('sektor_ekonomi');
        const validasiUmurPen = <FormControl>this.jobInfoForm.get('umur_pensiun');
        const validasiBekTahun = <FormControl>this.jobInfoForm.get('lama_bekerja_tahun');
        const validasiBekBulan = <FormControl>this.jobInfoForm.get('lama_bekerja_bulan');
        // const validasiJumKar = <FormControl>this.jobInfoForm.get('jumlah_karyawan');
        const validasiPendapatan = <FormControl>this.jobInfoForm.get('pendapatan');
        const validasiPendapatanLain = <FormControl>this.jobInfoForm.get('pendapatan_lain');
        const validasiTunjangan = <FormControl>this.jobInfoForm.get('tunjangan');
        const validasiTipePerusahaan = <FormControl>this.jobInfoForm.get('tipe_perusahaan');
        const validasiTipeKepegawaian = <FormControl>this.jobInfoForm.get('tipe_kepegawaian');
        if (this.jobInfo[0] == null) {
          validasiTipePek.setValidators([Validators.required]);
          // validasiPosisi.setValidators([Validators.required]);
          validasiNamaPer.setValidators([Validators.required]);
          validasiAlamatPer.setValidators([Validators.required]);
          validasiPro.setValidators([Validators.required]);
          validasiKot.setValidators([Validators.required]);
          validasiKec.setValidators([Validators.required]);
          validasiKel.setValidators([Validators.required]);
          validasiKodePos.setValidators([Validators.required]);
          validasiRt.setValidators([Validators.required]);
          validasiRw.setValidators([Validators.required]);
          validasiJeBid.setValidators([Validators.required]);
          validasiSektor.setValidators([Validators.required]);
          validasiUmurPen.setValidators([Validators.required]);
          validasiBekTahun.setValidators([Validators.required]);
          validasiBekBulan.setValidators([Validators.required]);
          // validasiJumKar.setValidators([Validators.required]);
          validasiPendapatan.setValidators([Validators.required]);
          validasiPendapatanLain.setValidators([Validators.required]);
          validasiTunjangan.setValidators([Validators.required]);
          validasiTipePerusahaan.setValidators([Validators.required]);
          validasiTipeKepegawaian.setValidators([Validators.required]);
        } else {
          validasiTipePek.setValidators(null);
          // validasiPosisi.setValidators(null);
          validasiNamaPer.setValidators(null);
          validasiAlamatPer.setValidators(null);
          validasiPro.setValidators(null);
          validasiKot.setValidators(null);
          validasiKec.setValidators(null);
          validasiKel.setValidators(null);
          validasiKodePos.setValidators(null);
          validasiRt.setValidators(null);
          validasiRw.setValidators(null);
          validasiJeBid.setValidators(null);
          validasiSektor.setValidators(null);
          validasiUmurPen.setValidators(null);
          validasiBekTahun.setValidators(null);
          validasiBekBulan.setValidators(null);
          // validasiJumKar.setValidators(null);
          validasiPendapatan.setValidators(null);
          validasiPendapatanLain.setValidators(null);
          validasiTunjangan.setValidators(null);
          validasiTipePerusahaan.setValidators(null);
          validasiTipeKepegawaian.setValidators(null);
        }
        validasiTipePek.updateValueAndValidity();
        // validasiPosisi.updateValueAndValidity();
        validasiNamaPer.updateValueAndValidity();
        validasiAlamatPer.updateValueAndValidity();
        validasiPro.updateValueAndValidity();
        validasiKot.updateValueAndValidity();
        validasiKec.updateValueAndValidity();
        validasiKel.updateValueAndValidity();
        validasiKodePos.updateValueAndValidity();
        validasiRt.updateValueAndValidity();
        validasiRw.updateValueAndValidity();
        validasiJeBid.updateValueAndValidity();
        validasiSektor.updateValueAndValidity();
        validasiUmurPen.updateValueAndValidity();
        validasiBekTahun.updateValueAndValidity();
        validasiBekBulan.updateValueAndValidity();
        // validasiJumKar.updateValueAndValidity();
        validasiPendapatan.updateValueAndValidity();
        validasiPendapatanLain.updateValueAndValidity();
        validasiTunjangan.updateValueAndValidity();
        validasiTipePerusahaan.updateValueAndValidity();
        validasiTipeKepegawaian.updateValueAndValidity();
      });
    }, 70);

    setTimeout(() => {
      this.initialDataEntry.getJobByCurefIDE(this.curef).subscribe(job => {
        if (job.result == null) {
          this.getLoading(false);
        } else {
          this.getLoading(false);

          setTimeout(() => {
            // untuk list job
            if (this.tampunganid.kategori_pekerjaan_sebelum === 'Fix Income') {
              this.nampungsebelum = 1;
            } else if (this.tampunganid.kategori_pekerjaan_sebelum === 'Non Fix Income') {
              this.nampungsebelum = 2;
            } else {
              this.nampungsebelum = 3;
            }
          }, 10);
        }
        this.ideJob = job.result;
        this.tampunganid = job.result;

        setTimeout(() => {
          if (job.result.kategori_pekerjaan_sebelum == null) {
            // alert('inijalan');
            let retrivejobsebelum = {
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
              // jumlah_karyawan_sebelumnya: this.tampunganid.jumlah_karyawan_sebelumnya,
              tipe_perusahaan_sebelum: '',
              tipe_kepegawaian_sebelum: '',
            };
            this.datajobsebelum.setValue(retrivejobsebelum);
          } else {
            let retrivejobsebelum = {
              kategori_pekerjaan_sebelum: this.nampungsebelum + '|' + this.tampunganid.kategori_pekerjaan_sebelum,
              tipe_pekerjaan_sebelum: this.tampunganid.tipe_pekerjaan_sebelum,
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
              jenis_bidang_sebelum: '',
              sektor_ekonomi_sebelum: '',
              lama_bekerja_tahun_sebelum: this.tampunganid.lama_bekerja_tahun_sebelum,
              lama_bekerja_bulan_sebelum: this.tampunganid.lama_bekerja_bulan_sebelum,
              jumlah_karyawan_sebelum: this.tampunganid.jumlah_karyawan_sebelum,
              // jumlah_karyawan_sebelumnya: this.tampunganid.jumlah_karyawan_sebelumnya,
              tipe_perusahaan_sebelum: this.tampunganid.tipe_perusahaan_sebelum,
              tipe_kepegawaian_sebelum: this.tampunganid.tipe_kepegawaian_sebelum,
            };
            this.datajobsebelum.setValue(retrivejobsebelum);
            setTimeout(() => {
              setTimeout(() => {
                this.dataretrivesektorekosebelum = this.tampunganid.sektor_ekonomi_sebelum;
                this.dataretrivejenisbidangsebelum = this.tampunganid.jenis_bidang_sebelum;
              }, 5);
              setTimeout(() => {
                this.carimenggunakankodepostsebelum(this.tampunganid.kode_pos_sebelum);
              }, 10);
              setTimeout(() => {
                this.katagoripekerjaanselect(this.nampungsebelum + '|' + this.tampunganid.kategori_pekerjaan_sebelum);
              }, 20);
            }, 20);
          }
        }, 25);
      });
    }, 75);
  }

  jenisbidangselect(value: any) {
    const idsektorpotongan = value.split('|');
    this.initialDataEntry.getSektor(idsektorpotongan[0]).subscribe({
      next: data => {
        this.getdatasektorekonomi = data.result;
      },
    });
  }

  jenisbidangsebelumselect(value: any) {
    const idsektorpotongan = value.split('|');
    this.initialDataEntry.getSektor(idsektorpotongan[0]).subscribe({
      next: data => {
        this.getdatasektorekonomi = data.result;
      },
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
    this.datEntryService.getkabkota(proValue[0]).subscribe(data => {
      this.daWakota = data.result;
      this.jobInfoForm.get('kabkota')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(kotaValue[0]).subscribe(data => {
      this.kecamatan = data.result;
      this.jobInfoForm.get('kecamatan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(kecValue[0]).subscribe(data => {
      this.kelurahan = data.result;
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
    this.datEntryService.getkabkota(proValue[0]).subscribe({
      next: res => {
        this.daWakotaD = res.result;
        this.datajobsebelum.get('kabkota_sebelum')?.setValue(this.kodeKotaSeb + '|' + this.dataretrivekabkotasebelum);
      },
    });
  }

  onChangekotaD(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(kotaValue[0]).subscribe({
      next: res => {
        this.kecamatanD = res.result;
        this.datajobsebelum.get('kecamatan_sebelum')?.setValue(this.kodeKecSeb + '|' + this.dataretrivekecamatansebelum);
      },
    });
    //console.log();
  }

  onChangekecamatanD(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(kecValue[0]).subscribe({
      next: res => {
        this.kelurahanD = res.result;
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
    this.SessionStorageService.store('jobInfo', 1);
    // this.onResponseSuccess(res);
    if (this.dataEntry.status_perkawinan === 'Menikah') {
      this.router.navigate(['/data-entry/data-pasangan'], {
        queryParams: {
          curef: this.curef,
          app_no_de: this.app_no_de,
        },
      });

      //console.warn(this.curef);
    } else {
      this.router.navigate(['/data-entry/collateral'], {
        queryParams: {
          curef: this.curef,
          app_no_de: this.app_no_de,
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
      },
    });
  }

  buatcreatejobinfo() {
    this.getLoading(true);
    // if () {
    //   // alert("Bisa")
    //   return;
    // } else {
    const kirimanprovinsi = this.jobInfoForm.get('provinsi')?.value.split('|');
    const kirimankabkota = this.jobInfoForm.get('kabkota')?.value.split('|');
    const kirimankecamatan = this.jobInfoForm.get('kecamatan')?.value.split('|');
    const kirimankelurahan = this.jobInfoForm.get('kelurahan')?.value.split('|');
    const potonganjenisbidang = this.jobInfoForm.get('jenis_bidang')?.value.split('|');

    this.http
      .post<any>(this.baseUrl + 'v1/efos-ide/create_job_info', {
        // headers: headers,
        alamat_perusahaan: this.jobInfoForm.get('alamat_perusahaan')?.value,
        curef: this.curef,
        id: '',
        payroll: this.jobInfoForm.get('payroll')?.value,
        jabatan: this.jobInfoForm.get('posisi')?.value,
        jenis_bidang: potonganjenisbidang[1],
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
        sektor_ekonomi: this.jobInfoForm.get('sektor_ekonomi')?.value,
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
    // }
  }

  updatejobsebelum() {
    if (this.ideJob == null) {
      alert('Perkerjaan Belum Ada');
      return;
    } else {
      const kirimKatePeker = this.datajobsebelum.get('kategori_pekerjaan_sebelum')?.value.split('|');

      const potonganPro = this.datajobsebelum.get('provinsi_sebelum')?.value.split('|');
      if (this.datajobsebelum.get('provinsi_sebelum')?.value.indexOf('|') !== -1) {
        var kirimanprovinsi = potonganPro[1];
      } else {
        var kirimanprovinsi = this.datajobsebelum.get('provinsi_sebelum')?.value;
      }

      const potonganKot = this.datajobsebelum.get('kabkota_sebelum')?.value.split('|');
      if (this.datajobsebelum.get('kabkota_sebelum')?.value.indexOf('|') !== -1) {
        var kirimankabkota = potonganKot[1];
      } else {
        var kirimankabkota = this.datajobsebelum.get('kabkota_sebelum')?.value;
      }

      const potonganKec = this.datajobsebelum.get('kecamatan_sebelum')?.value.split('|');
      if (this.datajobsebelum.get('kecamatan_sebelum')?.value.indexOf('|') !== -1) {
        var kirimankecamatan = potonganKec[1];
      } else {
        var kirimankecamatan = this.datajobsebelum.get('kecamatan_sebelum')?.value;
      }

      const potonganKel = this.datajobsebelum.get('kelurahan_sebelum')?.value.split('|');
      if (this.datajobsebelum.get('kelurahan_sebelum')?.value.indexOf('|') !== -1) {
        var kirimankelurahan = potonganKel[1];
      } else {
        var kirimankelurahan = this.datajobsebelum.get('kelurahan_sebelum')?.value;
      }

      if (this.datajobsebelum.get('jenis_bidang_sebelum')?.value.indexOf('|') !== -1) {
        const potonganjenisbidang = this.datajobsebelum.get('jenis_bidang_sebelum')?.value.split('|');
        var kirimanjenisbidang = potonganjenisbidang[1];
      } else {
        var kirimanjenisbidang = this.dataretrivejenisbidangsebelum;
      }
      if (this.datajobsebelum.get('jenis_bidang_sebelum')?.value.indexOf('|') !== -1) {
        this.datajobsebelum.get('sektor_ekonomi_sebelum')?.value;
      } else {
        this.datajobsebelum.get('sektor_ekonomi_sebelum')?.setValue(this.dataretrivesektorekosebelum);
      }
      // setTimeout(() => {
      //   alert(this.dataretrivesektorekosebelum);
      //   alert(this.datajobsebelum.get('sektor_ekonomi_sebelum')?.value);
      // }, 100);
      // return;
      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/update_job_sebelum_de', {
          alamat_pekerjaan_sebelum: this.datajobsebelum.get('alamat_pekerjaan_sebelum')?.value,
          id: this.tampunganid.id,
          jabatan_sebelum: this.datajobsebelum.get('jabatan_sebelum')?.value,
          jenis_bidang_sebelum: kirimanjenisbidang,
          // jenis_pekerjaan_sebelum: usia.value,
          jumlah_karyawan_sebelum: this.datajobsebelum.get('jumlah_karyawan_sebelum')?.value,
          kategori_pekerjaan_sebelum: kirimKatePeker[1],
          kabkota_sebelum: kirimankabkota,
          kecamatan_sebelum: kirimankecamatan,
          kelurahan_sebelum: kirimankelurahan,
          kode_pos_sebelum: this.datajobsebelum.get('kode_pos_sebelum')?.value,
          lama_bekerja_bulan_sebelum: this.datajobsebelum.get('lama_bekerja_bulan_sebelum')?.value,
          lama_bekerja_tahun_sebelum: this.datajobsebelum.get('lama_bekerja_tahun_sebelum')?.value,
          nama_perusahaan_sebelum: this.datajobsebelum.get('nama_perusahaan_sebelum')?.value,
          payroll_sebelum: this.datajobsebelum.get('payroll_sebelum')?.value,
          posisi_sebelum: this.datajobsebelum.get('posisi_sebelum')?.value,
          provinsi_sebelum: kirimanprovinsi,
          rt_sebelum: this.datajobsebelum.get('rt_sebelum')?.value,
          // nama_ibu_kandung: ' 1',
          rw_sebelum: this.datajobsebelum.get('rw_sebelum')?.value,
          sektor_ekonomi_sebelum: this.datajobsebelum.get('sektor_ekonomi_sebelum')?.value,
          // tahun_berdiri_sebelum: id.value,
          tipe_kepegawaian_sebelum: this.datajobsebelum.get('tipe_kepegawaian_sebelum')?.value,
          tipe_pekerjaan_sebelum: this.datajobsebelum.get('tipe_pekerjaan_sebelum')?.value,
          tipe_perusahaan_sebelum: this.datajobsebelum.get('tipe_perusahaan_sebelum')?.value,
          // umur_pensiun_sebelum: kirimankabkota,
          curef: this.tampunganid.curef,
          updated_date: '',
          updated_by: this.SessionStorageService.retrieve('sessionUserName'),
        })

        .subscribe({
          next: bawaan => {
            if (this.dataEntry.status_perkawinan === 'Menikah') {
              alert('Berhasil Menyimpan Data');
              this.router.navigate(['/data-entry/data-pasangan'], {
                queryParams: {
                  curef: this.curef,
                  app_no_de: this.app_no_de,
                },
              });
            } else {
              alert('Berhasil Menyimpan Data');
              this.router.navigate(['/data-entry/collateral'], {
                queryParams: {
                  curef: this.curef,
                  app_no_de: this.app_no_de,
                },
              });
            }
          },
          error: error => {
            if (error.error.code == 400) {
              this.getLoading(false);
              alert('Gagal Menyimpan Data ' + error.error.message);
            }
          },
        });
    }
  }

  carimenggunakankodepost(kodepost: any) {
    this.datEntryService.getKdpost(kodepost).subscribe(data => {
      this.responseKels = data.result.kels;
      this.responseKels.forEach(element => {
        this.responseKels.push(element);
        if (element.kdPos == kodepost) {
          let namaWIl = element.namaWilayah;
          this.responseNamaWilayah.push(namaWIl);
        }
      });
      this.retriveKodeProvinsi = data.result.provKec.kd_prov;
      this.retriveKodeKota = data.result.provKec.kd_kota;
      this.retriveKodeKecamatan = data.result.provKec.kd_kec;
      this.retriveprovinsi = data.result.provKec.nm_prov;
      this.retrivekabkota = data.result.provKec.nm_kota;
      this.retrivekecamatan = data.result.provKec.nm_kec;

      if (data.result.kels == null) {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = '';
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      } else if (data.result.provKec.kd_kel == null) {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = this.responseNamaWilayah[0];
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      } else {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.result.provKec.nm_kel;
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
    this.datEntryService.getKdpost(kodepost).subscribe({
      next: data => {
        if (this.clickKdPostSebelum == 1) {
          this.responseKelsSebelum = data.result.kels;
          this.responseKelsSebelum.forEach(element => {
            this.responseKelsSebelum.push(element);
            if (element.kdPos == kodepost) {
              let namaWIl = element.namaWilayah;
              this.responseNamaWilayahSebelum.push(namaWIl);
            }
          });
        }
        this.dataretriveprovinsisebelum = data.result.provKec.nm_prov;
        this.dataretrivekabkotasebelum = data.result.provKec.nm_kota;
        this.dataretrivekecamatansebelum = data.result.provKec.nm_kec;
        // this.dataretrivekelurahansebelum = data.result.provKec.nm_kel;
        this.kodeProvSeb = data.result.provKec.kd_prov;
        this.kodeKotaSeb = data.result.provKec.kd_kota;
        this.kodeKecSeb = data.result.provKec.kd_kec;
        // this.kodeKelSeb = data.result.provKec.kd_kel;
        // alert(this.dataretriveprovinsisebelum + this.dataretrivekabkotasebelum + this.dataretrivekecamatansebelum)
        setTimeout(() => {
          if (this.clickKdPostSebelum == 1) {
            if (data.result.kels == null) {
              this.kodeKelSeb = kodepost;
              this.dataretrivekelurahansebelum = '';
              this.onChangekelurahanD(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
            } else if (data.result.provKec.kd_kel == null) {
              this.kodeKelSeb = kodepost;
              this.dataretrivekelurahansebelum = this.responseNamaWilayahSebelum[0];
              this.onChangekelurahanD(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
            } else {
              this.kodeKelSeb = kodepost;
              this.dataretrivekelurahansebelum = data.result.provKec.nm_kel;
              this.onChangekelurahanD(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
            }
          } else {
            this.kodeKelSeb = kodepost;
            this.dataretrivekelurahansebelum = this.tampunganid.kelurahan_sebelum;
            this.onChangekelurahanD(this.kodeKelSeb + '|' + this.dataretrivekelurahansebelum);
          }
        }, 10);
        this.datajobsebelum.get('provinsi_sebelum')?.setValue(this.kodeProvSeb + '|' + this.dataretriveprovinsisebelum);
        this.onChangeD(this.kodeProvSeb + '|' + this.dataretriveprovinsisebelum);
        this.onChangekotaD(this.kodeKotaSeb + '|' + this.dataretrivekabkotasebelum);
        this.onChangekecamatanD(this.kodeKecSeb + '|' + this.dataretrivekecamatansebelum);
      },
    });

    //console.log(req);
  }

  ////sebelum

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
