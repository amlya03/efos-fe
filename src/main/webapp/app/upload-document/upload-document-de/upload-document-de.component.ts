import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Subject } from 'rxjs';
import { fetchAllDe } from '../services/config/fetchAllDe.model';
import { uploadDocument } from '../services/config/uploadDocument.model';
import { ServicesUploadDocumentService } from '../services/services-upload-document.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-upload-document-de',
  templateUrl: './upload-document-de.component.html',
  styleUrls: ['./upload-document-de.component.scss'],
})
export class UploadDocumentDeComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  uploadDocument: Array<uploadDocument> = new Array<uploadDocument>();
  dataEntry: fetchAllDe = new fetchAllDe();
  curef: any;
  app_no_de: any;

  // Variable to store shortLink from api response
  shortLink = '';
  loading = false; // Flag variable
  file?: File; // Variable to store file
  buttonUpload: any; // Flag variable to store button uploadDocument
  apiUploadDocument: any;
  inputUpload: any;
  hapusUpload: any;
  popup: any;
  untukSessionRole: any;

  // Progress bar
  proggresBar: any;

  // validasi
  totalVal: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  idUpload: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected fileUploadService: ServicesUploadDocumentService,
    protected dataEntryService: DataEntryService,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
      this.app_no_de = params.app_no_de;
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();
  }

  load(): void {
    // get Semua DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // console.log(this.dataEntry);
    });

    // get List DE
    this.fileUploadService.getListUploadDocument(this.curef, 'DE').subscribe(dE => {
      this.uploadDocument = dE.result;
      this.dtTrigger.next(dE.result);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  viewUploadDEA(): void {
    this.SessionStorageService.store('uploadDE', 1);
    this.router.navigate(['/upload_document/upload_document_agunan'], {
      queryParams: { curef: this.dataEntry.curef, app_no_de: this.dataEntry.app_no_de },
    });
  }

  // On file Select
  onChange(event: any, id: number | null | undefined) {
    this.file = event.target.files[0];
    this.idUpload = id;
    this.buttonUpload = (<HTMLInputElement>document.getElementById('uploadData' + id)).value;
    this.inputUpload = <HTMLInputElement>document.getElementById('inputDocument' + id);
    this.hapusUpload = (<HTMLInputElement>document.getElementById('hapusData' + id)).value;

    (<HTMLInputElement>document.getElementById('uploadData' + id)).style.display = 'block';
  }

  // Upload
  uploadData(
    deUpload: string | undefined,
    curefUpload: string | null | undefined,
    doc_type: number | null | undefined,
    file: File | undefined
  ) {
    this.fileUploadService.uploadDocument(file, deUpload, curefUpload, doc_type).subscribe({
      // if (typeof event === 'object') {
      //   // Short link via api response
      //   this.shortLink = event.link;
      //   this.loading = false; // Flag variable
      // }
    });
    (<HTMLInputElement>document.getElementById('uploadData' + doc_type)).style.display = 'none';
    (<HTMLInputElement>document.getElementById('proggresBar' + doc_type)).style.display = 'block';
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    // this.loading = !this.loading;
    // alert(this.idUpload);
    // this.upload(this.file, this.idUpload).subscribe((event: any) => {
    //   if (typeof event === 'object') {
    //     // Short link via api response
    //     this.shortLink = event.link;

    //     this.loading = false; // Flag variable
    //   }
    // });
  }

  // Delete
  deleteDataUpload(
    doc: string | null | undefined,
    id: number | null | undefined,
    id_upload: number | null | undefined,
    nama: string | null | undefined
  ) {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/deleteDocUpload', {
        created_date: '',
        doc_description: doc,
        id: id,
        id_upload: id_upload,
        nama_dokumen: nama,
      })
      .subscribe({});
    window.location.reload();
  }

  // Update Status
  updateStatus() {
    this.totalVal = this.uploadDocument.length;
    for (let i = 0; i < this.uploadDocument.length; i++) {
      if (this.uploadDocument[i].status == null) {
        this.totalVal += 1;
        alert('Gagal, Mohon Upload ' + this.uploadDocument[i].doc_description);
      } else {
        this.totalVal -= 1;
        if (this.totalVal == 0) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
              app_no_de: this.app_no_de,
              created_by: this.SessionStorageService.retrieve('sessionUserName'),
              status_aplikasi: this.dataEntry.status_aplikasi,
            })
            .subscribe({
              next: response => {
                alert('Data Berhasil Di Updated');
                this.router.navigate(['/data-entry']);
              },
              error: error => {
                alert(error.error.messages);
              },
            });
        }
      }
    }
  }

  // View Upload
  viewData(nama_dok: any) {
    const buatPdf = nama_dok.split('.').pop();
    if (buatPdf == 'pdf') {
      window.open(this.baseUrl + 'v1/efos-de/downloadFile/' + nama_dok + '');
    } else {
      const url = this.baseUrl + 'v1/efos-de/downloadFile/' + nama_dok + '';
      const img = '<img src="' + url + '">';
      this.popup = window.open('');
      this.popup.document.write(img);
    }
  }
}
