import { Component, OnInit } from '@angular/core';
import { DataEntryService } from '../../data-entry/services/data-entry.service';
import { fetchAllDe } from '../../upload-document/services/config/fetchAllDe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { viewJobModel } from '../../data-entry/services/config/viewJobModel.model';
import { listAgunan } from '../../data-entry/services/config/listAgunan.model';
import { getStrukturPembiayaan } from '../../data-entry/services/config/getStrukturPembiayaan.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { refStrukturPembiayaan } from 'app/verification/service/config/refStrukturPembiayaan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { refTenorFix } from 'app/verification/service/config/refTenorFix.model';
import { refSkema } from 'app/verification/service/config/refSkema.model';

@Component({
  selector: 'jhi-detail-komite',
  templateUrl: './detail-komite.component.html',
  styleUrls: ['./detail-komite.component.scss'],
})
export class DetailKomiteComponent implements OnInit {
  rekomendasiSystemForm!: FormGroup;
  komiteFasilitasYangDimintaForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  fetchJob: viewJobModel = new viewJobModel();
  jobByCurefDE: getJob = new getJob();
  agunanModel: listAgunan[] = [];
  strukturByDe: getStrukturPembiayaan = new getStrukturPembiayaan();
  strukturAnalisa: refStrukturPembiayaan = new refStrukturPembiayaan();
  app_no_de: any;
  curef: string | undefined;
  cabang: string | undefined;
  tenor: refTenorFix[] = [];
  tenorRekomendasi: refTenorFix[] = [];

  // Hasil Scoring
  hasilScoring: any;
  hasilStatus: any;

  // Ref Skema
  Skema: refSkema[] = [];

  // rekomendasi system skema
  skemaRekom: any;

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService,
    private SessionStorageService: SessionStorageService,
    protected http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.cabang = this.SessionStorageService.retrieve('sessionKdCabang');
    this.load();
    // //////////////////// Fasilitas Yang Diminta //////////////////////
    this.komiteFasilitasYangDimintaForm = this.formBuilder.group({
      harga_permintaan: '',
      down_payment: '',
      tenor: '',
      angsuran: '',
      dsr: '',
    });

    // //////////////////// Rekomendasi System //////////////////////
    this.rekomendasiSystemForm = this.formBuilder.group({
      skema: '',
      tipe_margin: '',
      jangka_waktu: '',
      harga_permintaan: '',
      down_payment: '',
      angsuran: '',
    });
  }
  load() {
    // ambil job BY curef
    this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(jobByCuref => {
      this.jobByCurefDE = jobByCuref.result[0];
    });
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;

      // ////////////////////////////////////////////////////////////////////////////////////////
      // Ref Skema
      this.verifikasiServices.getSkema(this.dataEntry.produk).subscribe(data => {
        if (data.code === 200) {
          this.Skema = data.result;
        }
      });
      // ////////////////////////////////////////////////////////////////////////////////////////
    });
    // ambil semua data view Job by Curef
    this.dataEntryService.getGetViewDataJob(this.curef).subscribe(Job => {
      this.fetchJob = Job.result[0];
    });
    // ambil agunan by curef
    this.dataEntryService.getfetchlistagunan(this.curef).subscribe(agunan => {
      this.agunanModel = agunan.result[0];
    });
    // ambil struktur pembiayaan DE
    this.dataEntryService.getFetchStrukturDE(this.app_no_de, this.curef).subscribe(strukturDe => {
      this.strukturByDe = strukturDe.result;

      if (this.strukturByDe.kode_fasilitas_name === 'PTA') {
        this.verifikasiServices.getTenorFix(this.strukturByDe.skema).subscribe(fix => {
          this.tenor = fix.result;
        });
      } else {
        this.verifikasiServices.getTenorNon(this.strukturByDe.skema).subscribe(Non => {
          this.tenor = Non.result;
        });
      }
    });
    // ambil darin struktur pembiayaan Analisa
    this.verifikasiServices.getFetchStrukturPembiayaan(this.app_no_de).subscribe(strukturAnalisa => {
      this.strukturAnalisa = strukturAnalisa.result;
      // //////////////////////// Fasilitas Yang DIminta ////////////////////////////////////////
      const retrivestrukturForm = {
        harga_permintaan: this.strukturAnalisa.harga_permintaan,
        down_payment: this.strukturAnalisa.down_payment,
        tenor: this.strukturAnalisa.tenor,
        angsuran: this.strukturAnalisa.angsuran,
        dsr: this.strukturAnalisa.dsr,
      };
      this.komiteFasilitasYangDimintaForm.setValue(retrivestrukturForm);

      setTimeout(() => {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
            app_no_de: this.dataEntry.app_no_de,
            curef: this.dataEntry.curef,
            dp: this.strukturAnalisa.down_payment,
            fasilitas: this.dataEntry.fasilitas_ke,
            harga_objek: this.strukturAnalisa.harga_permintaan,
            kode_fasilitas: this.dataEntry.kode_fasilitas,
            kode_produk: this.dataEntry.produk,
            skema_id: this.strukturByDe.skema,
            skema_master: this.strukturByDe.skema_master,
            tenor: this.strukturAnalisa.tenor,
          })
          .subscribe({
            next: data => {
              let anguran1 = data.result.angsuran[0];
              let anguran2 = data.result.angsuran[1];

              if (anguran2 == null) {
                this.komiteFasilitasYangDimintaForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
              } else {
                this.komiteFasilitasYangDimintaForm
                  .get('angsuran')
                  ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
              }

              setTimeout(() => {
                this.http
                  .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/getHitungAnalisaPembiayaan', {
                    angsuran: data.result.angsuran[data.result.angsuran.length - 1],
                    app_no_de: this.dataEntry.app_no_de,
                  })
                  .subscribe({
                    next: data => {
                      this.komiteFasilitasYangDimintaForm.get('dsr')?.setValue(data.result.dsr);
                      setTimeout(() => {
                        this.http
                          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/getHitungScoring', {
                            dsr: this.komiteFasilitasYangDimintaForm.get('dsr')?.value,
                            app_no_de: this.dataEntry.app_no_de,
                          })
                          .subscribe({
                            next: data => {
                              console.warn(data);
                              this.hasilScoring = data.result.score_value;
                              this.hasilStatus = data.result.score_desc;
                            },
                          });
                      }, 300);
                    },
                  });
              }, 300);
            },
            error: err => {
              if (err.error.code === '400') {
                alert(err.error.message);
              }
            },
          });
      }, 300);
      // ///////////////////////////////////////////////////////////////////////////////
      // /////////////////////// Fasilitas Yang DIminta //////////////////////////////////////////

      this.skemaRekom = this.strukturAnalisa.skema_code + '|' + this.strukturAnalisa.skema_master + '|' + this.strukturAnalisa.skema;
      // //////////////////////// Rekomendasi SYstem ////////////////////////////////////////
      setTimeout(() => {
        const retriveRekomendasiSystem = {
          skema: this.strukturAnalisa.skema_code + '|' + this.strukturAnalisa.skema_master + '|' + this.strukturAnalisa.skema,
          tipe_margin: this.strukturByDe.tipe_margin,
          jangka_waktu: this.strukturAnalisa.tenor,
          harga_permintaan: this.strukturAnalisa.harga_permintaan,
          down_payment: this.strukturAnalisa.down_payment,
          angsuran: this.strukturAnalisa.angsuran,
        };
        this.rekomendasiSystemForm.setValue(retriveRekomendasiSystem);
        // /////////////////////////////////////////////////////////////////////
        if (this.strukturAnalisa.skema_master === '1') {
          this.verifikasiServices.getTenorFix(this.strukturAnalisa.skema_code).subscribe(fix => {
            this.tenorRekomendasi = fix.result;
          });
        } else {
          this.verifikasiServices.getTenorNon(this.strukturAnalisa.skema_code).subscribe(Non => {
            this.tenorRekomendasi = Non.result;
          });
        }
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
            app_no_de: this.dataEntry.app_no_de,
            curef: this.dataEntry.curef,
            dp: this.strukturAnalisa.down_payment,
            fasilitas: this.dataEntry.fasilitas_ke,
            harga_objek: this.strukturAnalisa.harga_permintaan,
            kode_fasilitas: this.dataEntry.kode_fasilitas,
            kode_produk: this.dataEntry.produk,
            skema_id: this.strukturByDe.skema,
            skema_master: this.strukturByDe.skema_master,
            tenor: this.strukturAnalisa.tenor,
          })
          .subscribe({
            next: data => {
              let anguran1 = data.result.angsuran[0];
              let anguran2 = data.result.angsuran[1];

              if (anguran2 == null) {
                this.rekomendasiSystemForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
              } else {
                this.rekomendasiSystemForm
                  .get('angsuran')
                  ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
              }
            },
          });
      }, 300);
      // /////////////////////// Rekomendasi SYstem //////////////////////////////////////////
    });
  }

  hitungFasilitasYangDiminta() {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        dp: this.komiteFasilitasYangDimintaForm.get('down_payment')?.value,
        fasilitas: this.dataEntry.fasilitas_ke,
        harga_objek: this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        kode_produk: this.dataEntry.produk,
        skema_id: this.strukturByDe.skema,
        skema_master: this.strukturByDe.skema_master,
        tenor: this.komiteFasilitasYangDimintaForm.get('tenor')?.value,
      })
      .subscribe({
        next: data => {
          let anguran1 = data.result.angsuran[0];
          let anguran2 = data.result.angsuran[1];

          if (anguran2 == null) {
            this.komiteFasilitasYangDimintaForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
          } else {
            this.komiteFasilitasYangDimintaForm
              .get('angsuran')
              ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
          }
        },
        error: err => {
          if (err.error.code === '400') {
            alert(err.error.message);
          }
        },
      });
  }

  changeKeputusanPembiayaan(skema: any) {
    const getSkema = skema.split('|');
    if (getSkema[1] === '1') {
      this.rekomendasiSystemForm.get('tipe_margin')?.setValue('FIX');
      this.verifikasiServices.getTenorFix(getSkema[0]).subscribe(fix => {
        this.tenorRekomendasi = fix.result;
      });
    } else {
      this.rekomendasiSystemForm.get('tipe_margin')?.setValue('STEPUP');
      this.verifikasiServices.getTenorNon(getSkema[0]).subscribe(Non => {
        this.tenorRekomendasi = Non.result;
      });
    }
  }

  hitungRekomendasiSystem() {
    const deskripsiSkema = this.rekomendasiSystemForm.get('skema')?.value.split('|');
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        dp: this.rekomendasiSystemForm.get('down_payment')?.value,
        fasilitas: this.dataEntry.fasilitas_ke,
        harga_objek: this.rekomendasiSystemForm.get('harga_permintaan')?.value,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        kode_produk: this.dataEntry.produk,
        skema_id: deskripsiSkema[0],
        skema_master: deskripsiSkema[1],
        tenor: this.rekomendasiSystemForm.get('jangka_waktu')?.value,
      })
      .subscribe({
        next: data => {
          console.warn('rekon', data);
          let anguran1 = data.result.angsuran[0];
          let anguran2 = data.result.angsuran[1];

          if (anguran2 == null) {
            this.rekomendasiSystemForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
          } else {
            this.rekomendasiSystemForm
              .get('angsuran')
              ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
          }
        },
        error: err => {
          if (err.error.code === '400') {
            alert(err.error.message);
          }
        },
      });
  }
}
