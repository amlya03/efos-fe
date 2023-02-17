/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-upload-document-agunan',
  templateUrl: './upload-document-agunan.component.html',
  styleUrls: ['./upload-document-agunan.component.scss'],
})
export class UploadDocumentAgunanComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  uploadDocument: uploadDocument[] = new Array<uploadDocument>();
  valDE: uploadDocument[] = new Array<uploadDocument>();
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
    private sessionStorageService: SessionStorageService
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
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
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
  onChange(event: any, id: number | null | undefined): void {
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
    file: File | any
  ): void {
    if (Math.floor(file.size * 0.000001) > 2) {
      Swal.fire('Gagal', 'File Maksimal 2MB!', 'error').then(() => {
        window.location.reload();
      });
    } else {
      this.fileUploadService.uploadDocument(file, deUpload, curefUpload, doc_type).subscribe({});
      (<HTMLInputElement>document.getElementById('uploadData' + doc_type)).style.display = 'none';
      (<HTMLInputElement>document.getElementById('proggresBar' + doc_type)).style.display = 'block';
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  // Delete
  deleteDataUpload(
    doc: string | null | undefined,
    idData: number | null | undefined,
    id_uploadData: number | null | undefined,
    nama: string | null | undefined
  ): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/deleteDocUpload', {
        created_date: '',
        doc_description: doc,
        id: idData,
        id_upload: id_uploadData,
        nama_dokumen: nama,
      })
      .subscribe({});
    window.location.reload();
  }

  // View Upload
  viewData(nama_dok: any): void {
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
  updateStatus(): void {
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
                Swal.fire({
                  title: 'Apakah yakin ingin Memproses Data ini?',
                  text: 'Data harus sudah lengkap',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ya, Data Sudah Lengkap dan Valid!',
                }).then(result => {
                  if (result.isConfirmed) {
                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
                        app_no_de: this.app_no_de,
                        created_by: this.sessionStorageService.retrieve('sessionUserName'),
                        status_aplikasi: this.fetchAllAgunan.status_aplikasi,
                      })
                      .subscribe({
                        next: () => {
                          alert('Data Berhasil Di Updated');
                          this.router.navigate(['/data-entry']);
                        },
                        error(error) {
                          alert(error.error.messages);
                        },
                      });
                  }
                });
              }
            }
          }
        }
      }
    }
  }
  // Selanjutnya BM
  next(): void {
    this.sessionStorageService.store('uploadDEA', 1);
    this.router.navigate(['/data-entry/memo'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }
}
