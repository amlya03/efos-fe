import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { uploadDocument } from 'app/upload-document/services/config/uploadDocument.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataTableDirective } from 'angular-datatables';
import { SessionStorageService } from 'ngx-webstorage';
import { ServicesUploadDocumentService } from 'app/upload-document/services/services-upload-document.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-checklist-document',
  templateUrl: './checklist-document.component.html',
  styleUrls: ['./checklist-document.component.scss'],
})
export class ChecklistDocumentComponent implements OnInit {
  uploadDocument: uploadDocument[] = new Array<uploadDocument>();
  uploadAgunan: uploadDocument[] = new Array<uploadDocument>();
  dataEntry: fetchAllDe = new fetchAllDe();
  daWa: any;
  kirimDesesuai: any;
  kirimDetidak: any;
  iddokumen: any;
  keterangannya: any;
  datacontoh: any;
  datacontohid: any;
  newValue: any;
  rec: any;
  app_no_de: any;
  untukSessionUserName: any;

  // Radio Validasi Agunan
  radioValidasiDE: any;
  radioValidasiAgunan: any;
  // Keterangan Agunan
  keteranganDE: any;
  keteranganAgunan: any;
  // Role
  untukSessionRole: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  idUpload: any;
  curef: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    public router: Router,
    protected sessionStorageService: SessionStorageService,
    protected dataEntryService: DataEntryService,
    protected uploadService: ServicesUploadDocumentService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.load();
  }

  load(): void {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // alert('DE '+ this.dataEntry?.status_perkawinan)
    });

    // DE
    this.uploadService.getListUploadDocument(this.curef, 'DE').subscribe(data => {
      this.uploadDocument = data.result;
      console.warn(this.uploadDocument);
      this.dtTrigger.next(data.result);
    });

    // Agunan
    this.uploadService.getListUploadDocument(this.curef, 'DEA').subscribe(data => {
      console.warn('meeting head ', data.result);
      this.uploadAgunan = data.result;
    });
  }

  // Kirim DE
  detailDataEntry(nama_dokumen: any): void {
    window.open('http://10.20.34.110:8805/api/v1/efos-de/downloadFile/', nama_dokumen);
  }

  detailAgunan(nama_dokumen: any): void {
    window.open('http://10.20.34.110:8805/api/v1/efos-de/downloadFile/', nama_dokumen);
  }

  postCeklis(): void {
    // Upload Data Entry
    for (let i = 0; i < this.uploadDocument.length; i++) {
      // get Radio Button Validasi
      const validasiDE = $('#validasiDE' + (i + 1)).is(':checked'); //(document.getElementById('validasiDE'+ i + 1) as HTMLInputElement).checked;
      // alert(validasiDE);
      if (validasiDE === true) {
        this.radioValidasiDE = 1;
      } else {
        this.radioValidasiDE = 0;
      }

      // keterangan
      this.keteranganDE = (document.getElementById('keteranganDE' + (i + 1)) as HTMLInputElement).value;

      // Post Data Entry
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/checklist_dokumen', {
          created_by: this.untukSessionUserName,
          id: this.uploadDocument[i].id_upload,
          note_validasi: this.keteranganDE,
          validasi: this.radioValidasiDE,
        })
        .subscribe({
          next: sukses => {
            // Upload Agunan
            for (let j = 0; j < this.uploadAgunan.length; j++) {
              // get Radio Button Validasi
              const validasiAgunan = (document.getElementById('validasiAgunan' + (j + 1)) as HTMLInputElement).checked;
              if (validasiAgunan === true) {
                this.radioValidasiAgunan = 1;
              } else {
                this.radioValidasiAgunan = 0;
              }
              // get input Keterangan
              this.keteranganAgunan = (document.getElementById('keteranganAgunan' + (j + 1)) as HTMLInputElement).value;
              this.http
                .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/checklist_dokumen', {
                  created_by: this.untukSessionUserName,
                  id: this.uploadAgunan[j].id_upload,
                  note_validasi: this.keteranganAgunan,
                  validasi: this.radioValidasiAgunan,
                })
                .subscribe({});
              this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
            }
          },
        });
    }
  }

  updateStatus(): void {
    this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
// update Status
