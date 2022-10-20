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
  listagunan: listAgunan[] = []

  //nested
  nilaiPembiayaan: any;
  angsuranPalingTinggi: any;
  analisaDsr: any;

  // Ref Skema
  Skema: refSkema[] = [];

  // Tenor
  tenor: refTenorFix[] = [];

  // session username
  sessionUsername: any;

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getCollateralByCuref?sc=');

  ngOnInit(): void {
    this.sessionUsername = this.localStorageService.retrieve('sessionUserName');
    this.load();

    this.strukturForm = this.formBuilder.group({
      angsuran: '',
      total_angsuran: '',
      max_dsr: '',
      max_angsuran: '',
      dsr: '',
      persentase_pembiayaan_existing: '',
    });
  }

  load(): void {
    // Analisa Pembiayaan
    this.verifikasiServices.fetchAnalisaPembiayaan(this.app_no_de).subscribe(analisa => {
      this.analisaPembiayaan = analisa.result;
      console.log('testt ' + analisa);
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
      }, 300);
    });

    // get struktur pembiayaan
    this.verifikasiServices.getFetchStrukturPembiayaan(this.app_no_de).subscribe(struktur => {
      this.strukturPembiayaan = struktur.result;
      // console.log(this.strukturPembiayaan)
      let retrivestrukturForm = {
        angsuran: '',
        total_angsuran: '',
        max_dsr: '',
        max_angsuran: '',
        dsr: '',
        persentase_pembiayaan_existing: ''
      }
      this.strukturForm.setValue(retrivestrukturForm);
    })
  }

  loadSkema(produknya: any) {
    // Ref Skema
    // alert('skema '+ produknya)
    this.verifikasiServices.getSkema(produknya).subscribe(data =>{
      if(data.code === 200){
        this.Skema = data.result;
        // console.log(this.Skema)
      }
    });

    this.dataEntryService.getfetchlistagunan(this.curef).subscribe(data => {
      this.listagunan = data.result;
    });
  }

  tenorSkema(skemaName: any, skemaMaster: any) {
    // alert(skemaName +' '+ skemaMaster)
    const skemaidName = skemaName.split('|');
    if (skemaMaster == 'PTA') {
      this.verifikasiServices.getTenorFix(skemaidName[0]).subscribe(fix => {
        this.tenor = fix.result;
        console.log('Fix ' + this.tenor);
      });
    } else {
      this.verifikasiServices.getTenorNon(skemaidName[0]).subscribe(Non => {
        this.tenor = Non.result;
        console.log('Non ' + this.tenor);
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
      tenor: this.dataEntry.jangka_waktu
    })
    .subscribe({
      next: (data) => {
        this.nilaiPembiayaan = data.result.nilai_pembiayaan;
        console.log(data.result)
        this.angsuranPalingTinggi = data.result.angsuran[data.result.angsuran.length - 1]
        console.log(this.angsuranPalingTinggi)
        }
    });

    setTimeout(() => {
      this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/getHitungAnalisaPembiayaan', {
        angsuran: this.angsuranPalingTinggi,
        app_no_de: this.dataEntry.app_no_de
      })
      .subscribe({
        next: (data) => {
          this.analisaDsr = data.result.dsr
          console.log('analisa '+ data.result.dsr)
        }
      });
    }, 300);
  }

  onSubmit(
    angsuran: any,
    down_payment:any,
    dsr:any,
    harga_permintaan:any,
    max_angsuran:any,
    max_dsr:any,
    nilai_pembiayaan:any,
    persentase_pembiayaan_existing:any,
    skema:any,
    tenor:any,
    total_angsuran:any
  ){
    const Skemanya = skema.split('|');
    const analisaDsr = dsr.replace(' %', '');
    const maxDsr = max_dsr.replace(' %', '');
    const persentace = persentase_pembiayaan_existing.replace('%', '');
    // alert(Skemanya[2])
    if(this.strukturPembiayaan == null){
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
          max_angsuran: max_angsuran,
          max_dsr: maxDsr,
          nilai_pembiayaan: nilai_pembiayaan,
          persentase_pembiayaan_existing: persentace,
          skema: Skemanya[2],
          tenor: tenor,
          total_angsuran: total_angsuran
        })
        .subscribe({
          next: response => console.warn(response),
          error: error => console.warn(error),
        });
    }
     else {
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
        max_angsuran: max_angsuran,
        max_dsr: maxDsr,
        nilai_pembiayaan: nilai_pembiayaan,
        persentase_pembiayaan_existing: persentace,
        skema: Skemanya[2],
        tenor: tenor,
        total_angsuran: total_angsuran
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
}
