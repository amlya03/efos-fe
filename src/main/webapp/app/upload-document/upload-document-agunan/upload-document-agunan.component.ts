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
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-upload-document-agunan',
  templateUrl: './upload-document-agunan.component.html',
  styleUrls: ['./upload-document-agunan.component.scss'],
})
export class UploadDocumentAgunanComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  uploadDocument: Array<uploadDocument> = new Array<uploadDocument>();
  valDE: Array<uploadDocument> = new Array<uploadDocument>();
  curef: any;
  app_no_de: any;
  fetchAllAgunan: fetchAllDe = new fetchAllDe();
  inputUpload: any;
  hapusUpload: any;
  buttonUpload: any;
  popup: any;
  file: any;
  idUpload: any;
  untukSessionRole: any;
  // validasi
  totalValDE: any;
  totalValDEA: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

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
    this.load();
  }

  load(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    // get Semua DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.fetchAllAgunan = data.result;
      // alert(this.fetchAllAgunan.status_aplikasi);
    });

    // get List Agunan
    this.fileUploadService.getListUploadDocument(this.curef, 'DEA').subscribe(dE => {
      this.uploadDocument = dE.result;
      this.dtTrigger.next(dE.result);
    });
    this.fileUploadService.getListUploadDocument(this.curef, 'DE').subscribe(dE => {
      this.valDE = dE.result;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
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
    deUpload: string | null | undefined,
    curefUpload: string | null | undefined,
    doc_type: number | null | undefined,
    file: File | undefined
  ) {
    this.fileUploadService.uploadDocument(file, deUpload, curefUpload, doc_type).subscribe({
      next: data =>{
        console.warn(data)
      },
      error: data =>{
        console.error(data)
      }
      // if (typeof event === 'object') {
      //   // Short link via api response
      //   this.shortLink = event.link;
      //   this.loading = false; // Flag variable
      // }
    });
    (<HTMLInputElement>document.getElementById('uploadData' + doc_type)).style.display = 'none';
    (<HTMLInputElement>document.getElementById('proggresBar' + doc_type)).style.display = 'block';
    setTimeout(() => {
      // window.location.reload();
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

  // Update Status
  updateStatus() {
    this.totalValDEA = this.uploadDocument.length;
    this.totalValDE = this.valDE.length;
    for (let i = 0; i < this.valDE.length; i++) {
      if (this.valDE[i].status == null) {
        this.totalValDE += 1;
        alert('Gagal, Mohon Upload Document Data Entry ' + this.valDE[i].doc_description);
      } else {
        this.totalValDE -= 1;
        if (this.totalValDE == 0) {
          for (let i = 0; i < this.uploadDocument.length; i++) {
            if (this.uploadDocument[i].status == null) {
              this.totalValDEA += 1;
              alert('Gagal, Mohon Upload ' + this.uploadDocument[i].doc_description);
            } else {
              this.totalValDEA -= 1;
              if (this.totalValDEA == 0) {
                this.http
                  .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
                    app_no_de: this.app_no_de,
                    created_by: this.SessionStorageService.retrieve('sessionUserName'),
                    status_aplikasi: this.fetchAllAgunan.status_aplikasi,
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
      }
    }
  }
  // Selanjutnya BM
  next() {
    this.SessionStorageService.store('uploadDEA', 1);
    this.router.navigate(['/data-entry/memo'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }
}
