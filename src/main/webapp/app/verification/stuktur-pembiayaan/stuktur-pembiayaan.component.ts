import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { colateralmodel } from './collateral-model';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { ServiceVerificationService } from '../service/service-verification.service';
import { analisaPembiayaanModel } from '../service/config/analisaPembiayaanModel.model';
import { refSkema } from '../service/config/refSkema.model';
import { refTenorFix } from '../service/config/refTenorFix.model';

@Component({
  selector: 'jhi-stuktur-pembiayaan',
  templateUrl: './stuktur-pembiayaan.component.html',
  styleUrls: ['./stuktur-pembiayaan.component.scss'],
})
export class StukturPembiayaanComponent implements OnInit {
  app_no_de: any;
  dataEntry: fetchAllDe = new fetchAllDe();
  analisaPembiayaan: analisaPembiayaanModel = new analisaPembiayaanModel();
  fetchJob: getJob = new getJob();
  curef: any;
  listagunan: any;
  nilaiPembiayaan: any;

  // Ref Skema
  Skema: refSkema[] = [];

  // Tenor
  tenor: refTenorFix[] = [];

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService
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
    this.load();
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
      // alert(this.dataEntry.kode_fasilitas);
      this.loadSkema(this.dataEntry.produk);
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 300);
  }

  loadSkema(produknya: any) {
    // Ref Skema
    // alert('skema '+ produknya)
    this.verifikasiServices.getSkema(produknya).subscribe(data => {
      if (data.code === 200) {
        this.Skema = data.result;
        // console.log(this.Skema)
      }
    });
    this.dataEntryService.getfetchlistagunan(this.curef).subscribe(data => {
      // if(data.code === 200) {
      this.listagunan = data.result;
      console.log('agunanagunan', this.listagunan);
      // console.log("ini data de "+this.fetchAllDe);
      // }
    });

    // this.getlistagunan().subscribe({
    //   next: (res: EntityArrayResponseDaWa) => {

    //     console.warn('pasangan', res);

    //     this.listagunan = res.body?.result;
    //     // this.onResponseSuccess(res);
    //   },
    // });
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
    // alert(skemaidName[1]+' '+harga+' '+ dp)

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
          this.nilaiPembiayaan = data.result;
          console.log(data.result);
        },
      });

    // alert('ke editcollateral ');
    // alert(this.datakirimanakategoripekerjaan);
  }

  viewStruktur() {
    alert('tolong hapus aku');
  }
}
