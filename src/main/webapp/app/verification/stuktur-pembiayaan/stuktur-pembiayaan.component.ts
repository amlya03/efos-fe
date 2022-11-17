import { Component, OnInit } from '@angular/core';
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
import { LocalStorageService } from 'ngx-webstorage';
import { refStrukturPembiayaan } from '../service/config/refStrukturPembiayaan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyMaskInputMode } from 'ngx-currency';

@Component({
  selector: 'jhi-stuktur-pembiayaan',
  templateUrl: './stuktur-pembiayaan.component.html',
  styleUrls: ['./stuktur-pembiayaan.component.scss'],
})
export class StukturPembiayaanComponent implements OnInit {
  strukturForm!: FormGroup;
  app_no_de: any;
  dataEntry: fetchAllDe = new fetchAllDe();
  analisaPembiayaan: analisaPembiayaanModel = new analisaPembiayaanModel();
  fetchJob: getJob = new getJob();
  strukturPembiayaan: refStrukturPembiayaan = new refStrukturPembiayaan();
  curef: any;
  listagunan: listAgunan[] = [];

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

  optionsMoney = { prefix: 'Rp ', thousands: ',', decimal: '.', inputMode: CurrencyMaskInputMode.NATURAL };

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService,
    private localStorageService: LocalStorageService,
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
    this.sessionUsername = this.localStorageService.retrieve('sessionUserName');
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.load();

    this.strukturForm = this.formBuilder.group({
      harga_permintaan: '',
      down_payment: '',
      skema: '',
      tenor: '',
      nilai_pembiayaan: '',
      angsuran: '',
      total_angsuran: '',
      max_angsuran: '',
      dsr: '',
    });
  }

  load(): void {
    // Analisa Pembiayaan
    this.verifikasiServices.fetchAnalisaPembiayaan(this.app_no_de).subscribe(analisa => {
      this.analisaPembiayaan = analisa.result;
    });

    // ambil semua data Job by Curef
    this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(Job => {
      this.fetchJob = Job.result[0];
    });

    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      setTimeout(() => {
        this.loadSkema(this.dataEntry.produk);
        // alert(this.dataEntry.produk)
      }, 300);
    });

    // get struktur pembiayaan
    this.verifikasiServices.getFetchStrukturPembiayaan(this.app_no_de).subscribe(struktur => {
      this.strukturPembiayaan = struktur.result;
      // console.log(this.strukturPembiayaan)
      this.comboSkema =
        this.strukturPembiayaan.skema_code + '|' + this.strukturPembiayaan.skema_master + '|' + this.strukturPembiayaan.skema;
      // retrive Tenor
      if (this.dataEntry.kode_fasilitas_name === 'PTA') {
        this.verifikasiServices.getTenorFix(this.strukturPembiayaan.skema_code).subscribe(fix => {
          this.tenor = fix.result;
        });
      } else {
        this.verifikasiServices.getTenorNon(this.strukturPembiayaan.skema_code).subscribe(Non => {
          this.tenor = Non.result;
        });
      }

      // alert(this.comboSkema)
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
      };
      this.strukturForm.setValue(retrivestrukturForm);
    });
  }

  loadSkema(produknya: any) {
    // Ref Skema
    this.verifikasiServices.getSkema(produknya).subscribe(data => {
      if (data.code === 200) {
        this.Skema = data.result;
      }
    });

    this.dataEntryService.getfetchlistagunan(this.curef).subscribe(data => {
      this.listagunan = data.result;
      // console.log(this.listagunan)
      this.betaFTV = Number(this.listagunan[0].harga_objek) / Number(this.dataEntry.uang_muka);
    });
  }

  tenorSkema(skemaName: any, skemaMaster: any) {
    const skemaidName = skemaName.split('|');
    if (skemaMaster === 'PTA') {
      this.verifikasiServices.getTenorFix(skemaidName[0]).subscribe(fix => {
        this.tenor = fix.result;
      });
    } else {
      this.verifikasiServices.getTenorNon(skemaidName[0]).subscribe(Non => {
        this.tenor = Non.result;
      });
    }
  }

  // Hitung Angsuran
  hitungAngsuran(skema_id: any, harga: any, dp: any) {
    const skemaidName = skema_id.split('|');

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        dp: dp,
        fasilitas: this.dataEntry.fasilitas_ke,
        harga_objek: harga,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        kode_produk: this.dataEntry.produk,
        skema_id: skemaidName[0],
        skema_master: skemaidName[1],
        tenor: this.dataEntry.jangka_waktu,
      })
      .subscribe({
        next: data => {
          this.nilaiPembiayaan = data.result.nilai_pembiayaan;
          console.log(data.result);
          this.angsuranPalingTinggi = data.result.angsuran[data.result.angsuran.length - 1];
          console.log(this.angsuranPalingTinggi);
          this.dpKurang = 0;
        },
        error: err => {
          if (err.error.code === 400) {
            alert(err.error.message);
            this.dpKurang = 1;
          }
        },
      });

    setTimeout(() => {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/getHitungAnalisaPembiayaan', {
          angsuran: this.angsuranPalingTinggi,
          app_no_de: this.dataEntry.app_no_de,
        })
        .subscribe({
          next: data => {
            this.analisaDsr = data.result.dsr;
            this.analisaMaxAngsuran = data.result.max_angsuran;

            setTimeout(() => {
              this.http
                .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/getHitungScoring', {
                  dsr: this.analisaDsr,
                  app_no_de: this.dataEntry.app_no_de,
                })
                .subscribe({
                  next: data => {
                    this.hasilScoring = data.result.score_value;
                    this.hasilStatus = data.result.score_desc;
                  },
                });
            }, 300);
          },
        });
    }, 300);
  }

  onSubmit(
    angsuran: any,
    down_payment: any,
    dsr: any,
    harga_permintaan: any,
    max_angsuran: any,
    max_dsr: any,
    nilai_pembiayaan: any,
    persentase_pembiayaan_existing: any,
    skema: any,
    tenor: any,
    total_angsuran: any
  ) {
    const Skemanya = skema.split('|');
    const analisaDsr = dsr.replace(' %', '');
    const maxDsr = max_dsr.replace(' %', '');
    const persentace = persentase_pembiayaan_existing.replace('%', '');
    const valueMax_angsuran = max_angsuran.replace(/\,/g, '').replace('Rp ', '');
    const totPendapat = total_angsuran.replace(/\,/g, '').replace('Rp ', '');
    if (this.strukturPembiayaan == null) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_analisa_struktur_pembiayaan', {
          angsuran: angsuran,
          app_no_de: this.dataEntry.app_no_de,
          created_by: this.sessionUsername,
          created_date: '',
          down_payment: down_payment,
          dsr: analisaDsr,
          harga_permintaan: harga_permintaan,
          id: '',
          max_angsuran: valueMax_angsuran,
          max_dsr: maxDsr,
          nilai_pembiayaan: nilai_pembiayaan,
          persentase_pembiayaan_existing: persentace,
          skema: Skemanya[2],
          tenor: tenor,
          total_angsuran: totPendapat,
          skema_code: Skemanya[0],
          skema_master: Skemanya[1],
        })
        .subscribe({
          next: response => console.warn(response),
          error: error => console.warn(error),
        });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_analisa_struktur_pembiayaan', {
          angsuran: angsuran,
          app_no_de: this.dataEntry.app_no_de,
          updated_by: this.sessionUsername,
          updated_date: '',
          down_payment: down_payment,
          dsr: analisaDsr,
          harga_permintaan: harga_permintaan,
          id: '',
          max_angsuran: valueMax_angsuran,
          max_dsr: maxDsr,
          nilai_pembiayaan: nilai_pembiayaan,
          persentase_pembiayaan_existing: persentace,
          skema: Skemanya[2],
          tenor: tenor,
          total_angsuran: totPendapat,
          skema_code: Skemanya[0],
          skema_master: Skemanya[1],
        })
        .subscribe({
          next: response => console.warn(response),
          error: error => console.warn(error),
        });
    }
  }

  viewStruktur() {
    this.router.navigate(['/checklist-document'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
  goto() {
    this.router.navigate(['/checklist-document'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
