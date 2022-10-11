import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { uploadDocument } from 'app/upload-document/services/config/uploadDocument.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataTableDirective } from 'angular-datatables';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-checklist-document',
  templateUrl: './checklist-document.component.html',
  styleUrls: ['./checklist-document.component.scss'],
})
export class ChecklistDocumentComponent implements OnInit {
  uploadDocument: Array<uploadDocument> = new Array<uploadDocument>();
  uploadAgunan: Array<uploadDocument> = new Array<uploadDocument>();
  dataEntry: fetchAllDe = new fetchAllDe();
  daWa: any;
  kirimDesesuai: Array<number> = [];
  kirimDetidak: any;
  iddokumen: Array<number> = [];
  keterangannya: Array<any> = [];
  datacontoh: Array<any> = [];
  datacontohid: Array<any> = [];
  newValue: any;
  rec: any;
  app_no_de: any;

  //Radio Validasi Agunan
  radioValidasiDE: any;
  radioValidasiAgunan: any;
  //Keterangan Agunan
  keteranganDE: any;
  keteranganAgunan: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  idUpload: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    public router: Router,
  ) {
      // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      this.activatedRoute.queryParams.subscribe(params => {
        this.app_no_de = params.app_no_de;
      });
      // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    }

  // URL DE
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  // API url
  protected FetchListUploadDocument = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getDokumenUploadByCuref?sc=');

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  // DE
  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  // list Upload DE
  getListUploadDocumentDE(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + 'curef_20220816_322' + '&ss=DE');
  }

  // list Upload DEA
  getListUploadAgunan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + 'curef_20220816_322' + '&ss=DEA');
  }

  load() {
    // ambil semua data DE
    this.getFetchSemuaData().subscribe(data => {
      this.dataEntry = data.result;
      // alert('DE '+ this.dataEntry?.status_perkawinan)
    });

    // DE
    this.getListUploadDocumentDE().subscribe(data => {
      // console.warn('ini upload de' + data);
      this.uploadDocument = data.result;
      this.dtTrigger.next(data.result);
    });

    // Agunan
    this.getListUploadAgunan().subscribe(data => {
      // console.warn('ini upload de' + data);
      this.uploadAgunan = data.result;
    });
  }

  // Kirim DE
  detailDataEntry(nama_dokumen: any){
    window.open('http://10.20.34.178:8805/api/v1/efos-de/downloadFile/'+ nama_dokumen)
  }

  detailAgunan(nama_dokumen: any){
    window.open('http://10.20.34.178:8805/api/v1/efos-de/downloadFile/'+ nama_dokumen)
  }

  postCeklis(): void {
    // Upload Data Entry
    for (let i = 0; i < this.uploadDocument.length; i++) {
      // get Radio Button Validasi
      let validasiDE = (<HTMLInputElement>document.getElementById("validasiDE"+[i+1])).checked;
      if(validasiDE == true){
        this.radioValidasiDE = 1;
      }
      else{
        this.radioValidasiDE = 0;
      }

      // keterangan
      this.keteranganDE = (<HTMLInputElement>document.getElementById("keteranganDE"+[i+1])).value;


    // Upload Agunan
    for (let i = 0; i < this.uploadAgunan.length; i++) {
      // get Radio Button Validasi
      let validasiAgunan = (<HTMLInputElement>document.getElementById("validasiAgunan"+[i+1])).checked;
      if(validasiAgunan == true){
        this.radioValidasiAgunan = 1;
      }
      else{
        this.radioValidasiAgunan = 0;
      }
      // alert(this.radioValidasiAgunan)

      // get input Keterangan
      this.keteranganAgunan = (<HTMLInputElement>document.getElementById("keteranganAgunan"+[i+1])).value;
      // alert(this.keteranganAgunan)
    }


      // Post Data Entry
      this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_syarat_persetujuan', {
        tipe_dokumen: this.uploadDocument[i].doc_description,
        nama_file: this.uploadDocument[i].nama_dokumen,
        validasi_DE: this.radioValidasiDE,
        keterangan_DE: this.keteranganDE,
      })
      .subscribe({});

      // Post Agunan
      this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_syarat_persetujuan', {
        tipe_dokumen: this.uploadAgunan[i].doc_description,
        nama_file: this.uploadAgunan[i].nama_dokumen,
        validasi_DE: this.radioValidasiAgunan,
        keterangan_DE: this.keteranganAgunan,
      })
      .subscribe({});
    }
  }
  // update Status
  updateStatus(){
    this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de } });
  }
}
