/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { HttpClient } from '@angular/common/http';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { ServiceVerificationService } from '../service/service-verification.service';
import { analisaPembiayaanModel } from '../service/config/analisaPembiayaanModel.model';
import { refSkema } from '../service/config/refSkema.model';
import { refTenorFix } from '../service/config/refTenorFix.model';
import { listAgunan } from 'app/data-entry/services/config/listAgunan.model';
import { SessionStorageService } from 'ngx-webstorage';
import { refStrukturPembiayaan } from '../service/config/refStrukturPembiayaan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getMapis } from '../service/config/getMapis.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-stuktur-pembiayaan',
  templateUrl: './stuktur-pembiayaan.component.html',
  styleUrls: ['./stuktur-pembiayaan.component.scss'],
})
export class StukturPembiayaanComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  strukturForm!: FormGroup;
  slikForm!: FormGroup;
  mapisForm!: FormGroup;
  mapisModel: getMapis = new getMapis();
  app_no_de: any;
  dataEntry: fetchAllDe = new fetchAllDe();
  analisaPembiayaan: analisaPembiayaanModel = new analisaPembiayaanModel();
  fetchJob: getJob = new getJob();
  strukturPembiayaan: refStrukturPembiayaan = new refStrukturPembiayaan();
  curef: any;
  listagunan: listAgunan[] = [];
  responseCollateral: any;
  modelCollateral: listAgunan = new listAgunan();
  showAngsuran: any;
  showMargin: any;
  nilaiPembiayaan: any;
  angsuranPalingTinggi: any;
  analisaDsr: any;
  analisaMaxAngsuran: any;

  // Ref Skema
  Skema: refSkema[] = [];

  // Tenor
  tenor: refTenorFix[] = [];

  // session username
  sessionUsername: any;
  untukSessionRole: any;

  // Satuin Skema
  comboSkema: any;
  dpKurang = 0;

  // Nyoba ngitung FTV
  betaFTV: any;

  // Hasil Scoring
  hasilScoring: any;
  hasilStatus: any;

  // cek result
  cekResult = 0;

  colateralNilaiAgunan: any;

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService,
    private sessionStorageService: SessionStorageService,
    private formBuilder: FormBuilder
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }
  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.sessionUsername = this.sessionStorageService.retrieve('sessionUserName');
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.load();

    this.slikForm = this.formBuilder.group({
      total_kewajiban_bank_pemohon: { value: 0, readonly: true },
      total_outstanding: { value: 0, readonly: true },
      total_plafon: { value: 0, readonly: true },
      persentase_pembiayaan_existing: { value: 0, readonly: true },
    });

    this.strukturForm = this.formBuilder.group({
      harga_permintaan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      down_payment: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      skema: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      tenor: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      nilai_pembiayaan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      angsuran: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_angsuran: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      max_angsuran: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      dsr: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      akad: { value: '', disabled: true },
    });

    this.mapisForm = this.formBuilder.group({
      luas_bangunan: '',
      luas_tanah: '',
      nilai_imb: '',
      nilai_market: '',
      objek_pembiayaan: '',
      ftv: '',
      tipe_agunan: '',
      jenis_objek: '',
      nilai_pks: '',
      harga_transaksi: '',
      nilai_likuidasi: '',
      nilai_pasar: '',
      nilai_indikasi: '',
    });
  }

  load(): void {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      setTimeout(() => {
        this.loadSkema(this.dataEntry.produk);
      }, 5);
    });

    // Analisa Keuangan
    setTimeout(() => {
      this.verifikasiServices.fetchAnalisaPembiayaan(this.app_no_de).subscribe(analisa => {
        this.analisaPembiayaan = analisa.result;
        // console.warn(analisa.result);
        const retSLik = {
          total_kewajiban_bank_pemohon: this.analisaPembiayaan.kewajiban_bank_total,
          total_outstanding: this.analisaPembiayaan.total_outstanding,
          total_plafon: this.analisaPembiayaan.total_plafon,
          persentase_pembiayaan_existing: Number(this.analisaPembiayaan.total_outstanding) / Number(this.analisaPembiayaan.total_plafon),
        };
        this.slikForm.setValue(retSLik);
      });
    }, 10);

    // ambil semua data Job by Curef
    setTimeout(() => {
      this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(Job => {
        this.fetchJob = Job.result[0];
      });
    }, 15);

    // Get Appraisal
    setTimeout(() => {
      this.verifikasiServices.fetchMapis(this.app_no_de).subscribe(data => {
        // console.warn(data)
        this.mapisModel = data.result;
        if (data.result == null) {
          this.getLoading(false);

          const retriveForm = {
            luas_bangunan: '0',
            luas_tanah: '0',
            nilai_imb: '0',
            nilai_market: '0',
            objek_pembiayaan: '0',
            ftv: '0',
            tipe_agunan: '',
            jenis_objek: '',
            nilai_pks: '',
            harga_transaksi: '',
            nilai_likuidasi: '',
            nilai_pasar: '',
            nilai_indikasi: '',
          };
          this.mapisForm.setValue(retriveForm);
        } else {
          this.getLoading(false);

          const retriveForm = {
            luas_bangunan: this.mapisModel.luas_bangunan,
            luas_tanah: this.mapisModel.luas_tanah,
            nilai_imb: this.mapisModel.nilai_imb,
            nilai_pks: this.mapisModel.nilai_pks,
            harga_transaksi: this.mapisModel.harga_transaksi,
            nilai_market: this.mapisModel.nilai_market,
            objek_pembiayaan: this.mapisModel.objek_pembiayaan,
            ftv: this.mapisModel.ftv,
            tipe_agunan: this.mapisModel.tipe_agunan,
            jenis_objek: this.mapisModel.jenis_objek,
            nilai_likuidasi: this.mapisModel.nilai_likuidasi,
            nilai_pasar: this.mapisModel.nilai_pasar,
            nilai_indikasi: this.mapisModel.nilai_indikasi,
          };
          this.mapisForm.setValue(retriveForm);
        }
      });
    }, 20);

    // get struktur pembiayaan
    this.verifikasiServices.getFetchStrukturPembiayaan(this.app_no_de).subscribe(struktur => {
      this.strukturPembiayaan = struktur.result;
      // console.warn(struktur)
      if (struktur.result == null) {
        this.getLoading(false);
        this.cekResult = 0;
        this.comboSkema = '';
        setTimeout(() => {
          const retrivestrukturForm = {
            harga_permintaan: '0',
            down_payment: '0',
            skema: this.comboSkema,
            tenor: '',
            nilai_pembiayaan: '0',
            angsuran: '0',
            total_angsuran: '0',
            max_angsuran: '0',
            dsr: '0',
            akad: '',
          };
          this.strukturForm.setValue(retrivestrukturForm);
        }, 100);
      } else {
        let getMargin: any;
        this.cekResult = 1;
        this.comboSkema = struktur.result.skema_code;
        this.comboSkema += '|';
        this.comboSkema += struktur.result.skema_master;
        this.comboSkema += '|';
        this.comboSkema += struktur.result.skema;
        this.comboSkema += '|';
        this.comboSkema += struktur.result.akad;
        setTimeout(() => {
          // retrive Tenor
          if (struktur.result.skema_master === '1') {
            this.verifikasiServices.getTenorFix(this.strukturPembiayaan.skema_code).subscribe(fix => {
              this.tenor = fix.result;
              getMargin = this.tenor.find((value: refTenorFix) => value.tn_code === this.strukturPembiayaan.tenor)?.margin;
              this.showMargin = [getMargin];
            });
          } else {
            this.verifikasiServices.getTenorNon(this.strukturPembiayaan.skema_code).subscribe(Non => {
              this.tenor = Non.result;
            });
            this.dataEntryService.getFetchMarginStepUp(this.strukturPembiayaan.skema_code).subscribe(margin => {
              this.showMargin = margin.result;
            });
          }
        }, 10);
        setTimeout(() => {
          const retrivestrukturForm = {
            harga_permintaan: this.strukturPembiayaan.harga_permintaan,
            down_payment: this.strukturPembiayaan.down_payment,
            skema: this.comboSkema,
            tenor: this.strukturPembiayaan.tenor,
            nilai_pembiayaan: this.strukturPembiayaan.nilai_pembiayaan,
            angsuran: this.strukturPembiayaan.angsuran,
            total_angsuran: this.strukturPembiayaan.total_angsuran,
            max_angsuran: this.strukturPembiayaan.max_angsuran,
            dsr: this.strukturPembiayaan.dsr,
            akad: this.strukturPembiayaan.akad,
          };
          this.strukturForm.setValue(retrivestrukturForm);
        }, 100);
        this.getLoading(false);
      }

      // ////////////////////////////////////////////////////////////////////////////////////////////////////
      setTimeout(() => {
        if (this.cekResult === 0) {
          this.analisaDsr = 0;
        } else {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-verif/getHitungScoring', {
              dsr: this.strukturPembiayaan.dsr,
              app_no_de: this.app_no_de,
              uang_muka: this.strukturPembiayaan.down_payment,
              angsuran: this.strukturPembiayaan.angsuran,
              akad: this.strukturPembiayaan.akad,
              kode_produk: this.dataEntry.produk,
              ftv: this.strukturPembiayaan.ftv,
              tenor: this.strukturPembiayaan.tenor,
              skema_id: this.strukturPembiayaan.skema_code,
            })
            .subscribe({
              next: data => {
                // console.warn(data);
                this.hasilScoring = data.result.score_value;
                this.hasilStatus = data.result.score_desc;
              },
            });

          this.http
            .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
              app_no_de: this.dataEntry.app_no_de,
              curef: this.dataEntry.curef,
              dp: this.strukturPembiayaan.down_payment,
              fasilitas: this.dataEntry.fasilitas_ke,
              harga_objek: this.strukturPembiayaan.harga_permintaan,
              kode_fasilitas: this.dataEntry.kode_fasilitas,
              kode_produk: this.dataEntry.produk,
              skema_id: this.strukturPembiayaan.skema_code,
              skema_master: this.strukturPembiayaan.skema_master,
              tenor: this.strukturPembiayaan.tenor,
              akad: this.strukturPembiayaan.akad,
            })
            .subscribe({
              next: data => {
                this.showAngsuran = data.result.angsuran;
              },
              error: () => {
                this.showAngsuran = 0;
              },
            });
        }
      }, 50);
      // ////////////////////////////////////////////////////////////////////////////////////////////////////
    });
  }

  loadSkema(produknya: any): void {
    // Ref Skema
    this.verifikasiServices.getSkema(produknya).subscribe(data => {
      // if (data.code === 200) {
      this.Skema = data.result;
      // }
    });

    this.dataEntryService.getCollateralByCuref(this.curef).subscribe(data => {
      this.listagunan = data.result;
      // console.log(this.listagunan)
      // eslint-disable-next-line eqeqeq
      if (data.result == '') {
        this.betaFTV = 0;
      } else {
        this.betaFTV = Math.abs(Number(this.listagunan[0].harga_objek) / Number(this.dataEntry.uang_muka));
      }

      this.responseCollateral = data.result;
      // if (this.responseCollateral.find((value: listAgunan) => value.jenis_objek == 3)) {
      // if (this.responseCollateral.find((value: listAgunan) => value.nilai_pasar)) {
      //   this.modelCollateral = this.responseCollateral.find((value: listAgunan) => value.nilai_pasar);
      //   // this.strukturForm.get('harga_objek_pembiayaan')?.setValue(this.modelCollateral.nilai_pasar)
      //   // console.warn('p',this.modelCollateral)
      // } else {
      // eslint-disable-next-line eqeqeq
      this.modelCollateral = this.responseCollateral.find((value: listAgunan) => value.jenis_objek == 3);
      if (this.modelCollateral.nilai_agunan) {
        this.colateralNilaiAgunan = this.modelCollateral.nilai_agunan;
      } else {
        this.colateralNilaiAgunan = '';
      }
      // this.strukturForm.get('harga_objek_pembiayaan')?.setValue(this.modelCollateral.harga_objek)
      // console.warn('h',this.modelCollateral)
      // }
      // }
    });
  }
  getTenor(master: any, isiten: any): void {
    if (master === '1') {
      this.showMargin = [this.tenor.find((value: refTenorFix) => value.tn_code === isiten)?.margin];
    }
  }
  tenorSkema(skemaName: any): void {
    const skemaidName = skemaName.split('|');
    if (skemaidName[1] === '1') {
      this.verifikasiServices.getTenorFix(skemaidName[0]).subscribe(fix => {
        this.tenor = fix.result;
      });
    } else {
      this.verifikasiServices.getTenorNon(skemaidName[0]).subscribe(Non => {
        this.tenor = Non.result;
      });

      this.dataEntryService.getFetchMarginStepUp(skemaidName[0]).subscribe(margin => {
        this.showMargin = margin.result;
      });
    }
    this.strukturForm.get('akad')?.setValue(skemaidName[3]);
  }

  // Hitung Angsuran
  hitungAngsuran(skema_id: any): void {
    this.getLoading(true);
    const skemaidName = skema_id.split('|');
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        dp: this.strukturForm.get('down_payment')?.value,
        fasilitas: this.dataEntry.fasilitas_ke,
        harga_objek: this.strukturForm.get('harga_permintaan')?.value,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        kode_produk: this.dataEntry.produk,
        skema_id: skemaidName[0],
        skema_master: skemaidName[1],
        tenor: this.dataEntry.jangka_waktu,
        akad: this.dataEntry.akad,
      })
      .subscribe({
        next: data => {
          this.nilaiPembiayaan = data.result.nilai_pembiayaan;
          this.showAngsuran = data.result.angsuran;

          this.strukturForm.get('nilai_pembiayaan')?.setValue(this.nilaiPembiayaan);
          this.strukturForm.get('angsuran')?.setValue(data.result.angsuran[data.result.angsuran.length - 1]);
          this.strukturForm
            .get('total_angsuran')
            ?.setValue(
              Number(this.slikForm.get('total_kewajiban_bank_pemohon')?.value) +
                Number(data.result.angsuran[data.result.angsuran.length - 1])
            );
          this.dpKurang = 0;
          setTimeout(() => {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-verif/getHitungAnalisaPembiayaan', {
                angsuran: this.strukturForm.get('angsuran')?.value,
                app_no_de: this.dataEntry.app_no_de,
              })
              .subscribe({
                next: angsuran => {
                  // console.warn(angsuran);
                  this.getLoading(false);
                  this.analisaDsr = angsuran.result.dsr;
                  this.strukturForm.get('dsr')?.setValue((this.analisaDsr += ' %'));
                  // this.analisaMaxAngsuran = data.result.max_angsuran;
                  this.strukturForm.get('max_angsuran')?.setValue(angsuran.result.max_angsuran);
                  setTimeout(() => {
                    const dsrnya = this.analisaDsr.replace(' %', '');
                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-verif/getHitungScoring', {
                        dsr: dsrnya,
                        app_no_de: this.dataEntry.app_no_de,
                        uang_muka: this.strukturForm.get('down_payment')?.value,
                        angsuran: this.strukturForm.get('angsuran')?.value,
                        akad: this.strukturForm.get('akad')?.value,
                        kode_produk: this.dataEntry.produk,
                        ftv: this.betaFTV,
                        tenor: this.strukturForm.get('tenor')?.value,
                        skema_id: skemaidName[0],
                      })
                      .subscribe({
                        next: scoring => {
                          this.hasilScoring = scoring.result.score_value;
                          this.hasilStatus = scoring.result.score_desc;
                        },
                        error: errScore => {
                          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                          alert('Score ' + errScore.error.message);
                          this.getLoading(false);
                        },
                      });
                  }, 300);
                },
                error: () => {
                  // alert('Dsr '+err.error.message)
                  this.getLoading(false);
                },
              });
          }, 300);
        },
        error: err => {
          if (err.error.code === '400') {
            alert(err.error.message);
            this.dpKurang = 1;
            this.getLoading(false);
          } else {
            this.getLoading(false);
          }
        },
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubmit(): void {
    const Skemanya = this.strukturForm.get('skema')?.value.split('|');
    const analisaDsr = this.strukturForm.get('dsr')?.value.replace(' %', '');

    if (this.cekResult === 0) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/create_analisa_struktur_pembiayaan', {
          angsuran: this.strukturForm.get('angsuran')?.value,
          app_no_de: this.dataEntry.app_no_de,
          created_by: this.sessionUsername,
          created_date: '',
          down_payment: this.strukturForm.get('down_payment')?.value,
          dsr: analisaDsr,
          harga_permintaan: this.strukturForm.get('harga_permintaan')?.value,
          id: '',
          max_angsuran: this.strukturForm.get('max_angsuran')?.value,
          max_dsr: this.analisaPembiayaan.dsr,
          nilai_pembiayaan: this.strukturForm.get('nilai_pembiayaan')?.value,
          persentase_pembiayaan_existing: this.slikForm.get('persentase_pembiayaan_existing')?.value,
          skema: Skemanya[2],
          tenor: this.strukturForm.get('tenor')?.value,
          ftv: this.betaFTV,
          // eslint-disable-next-line object-shorthand
          total_angsuran: this.strukturForm.get('total_angsuran')?.value,
          skema_code: Skemanya[0],
          skema_master: Skemanya[1],
          akad: this.strukturForm.get('akad')?.value,
        })
        .subscribe({
          next: () => {
            // console.warn(response);
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
          },
          error: error => console.warn(error),
        });
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/update_analisa_struktur_pembiayaan', {
          angsuran: this.strukturForm.get('angsuran')?.value,
          app_no_de: this.dataEntry.app_no_de,
          updated_by: this.sessionUsername,
          updated_date: '',
          down_payment: this.strukturForm.get('down_payment')?.value,
          dsr: analisaDsr,
          harga_permintaan: this.strukturForm.get('harga_permintaan')?.value,
          id: '',
          ftv: this.betaFTV,
          max_angsuran: this.strukturForm.get('max_angsuran')?.value,
          max_dsr: this.analisaPembiayaan.dsr,
          nilai_pembiayaan: this.strukturForm.get('nilai_pembiayaan')?.value,
          persentase_pembiayaan_existing: this.slikForm.get('persentase_pembiayaan_existing')?.value,
          skema: Skemanya[2],
          tenor: this.strukturForm.get('tenor')?.value,
          total_angsuran: this.strukturForm.get('total_angsuran')?.value,
          skema_code: Skemanya[0],
          skema_master: Skemanya[1],
          akad: this.strukturForm.get('akad')?.value,
        })
        .subscribe({
          next: () => {
            // console.warn(response);
            // alert('Berhasil Menyimpan Data');
            this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
          },
          error: error => console.warn(error),
        });
    }
  }

  viewStruktur(): void {
    this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
