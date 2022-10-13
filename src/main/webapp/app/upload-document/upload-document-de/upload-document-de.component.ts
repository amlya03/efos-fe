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

@Component({
  selector: 'jhi-upload-document-de',
  templateUrl: './upload-document-de.component.html',
  styleUrls: ['./upload-document-de.component.scss'],
})
export class UploadDocumentDeComponent implements OnInit, OnDestroy {
  uploadDocument: Array<uploadDocument> = new Array<uploadDocument>();
  dataEntry: fetchAllDe = new fetchAllDe();
  datakiriman: any;
  app_no_de: any;

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file
  buttonUpload: any; // Flag variable to store button uploadDocument
  apiUploadDocument: any;
  inputUpload: any;
  hapusUpload: any;
  popup: any;

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
    protected dataEntryService: DataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params.datakiriman;
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
    // get Semua DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // console.log(this.dataEntry);
    });

    // get List DE
    this.fileUploadService.getListUploadDocument(this.datakiriman, 'DE').subscribe(dE => {
      this.uploadDocument = (dE as any).result;
      this.dtTrigger.next(dE.result);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  viewUploadDEA(): void {
    this.router.navigate(['/upload_document/upload_document_agunan'], {
      queryParams: { datakiriman: this.datakiriman, app_no_de: this.app_no_de },
    });
  }

  // On file Select
  onChange(event: any, id: any) {
    this.file = event.target.files[0];
    this.idUpload = id;
    this.buttonUpload = (<HTMLInputElement>document.getElementById("uploadData"+id)).value;
    this.inputUpload = (<HTMLInputElement>document.getElementById("inputDocument"+id));
    this.hapusUpload = (<HTMLInputElement>document.getElementById("hapusData"+id)).value;
    // alert(this.buttonUpload == id)
    // for (let i = 0; i < this.uploadDocument.length; i++) {}
    // alert(this.inputUpload.name);
  }

  // Upload
  uploadData(deUpload:any, curefUpload:any , doc_type: any, file:any) {
    this.fileUploadService.uploadDocument(file, deUpload, curefUpload, doc_type)
    .subscribe({
      // if (typeof event === 'object') {
      //   // Short link via api response
      //   this.shortLink = event.link;

      //   this.loading = false; // Flag variable
      // }
    });
    window.location.reload()

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
  deleteDataUpload(doc:any, id:any, id_upload:any, nama:any){
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/deleteDocUpload', {
        created_date: '',
        doc_description: doc,
        id: id,
        id_upload: id_upload,
        nama_dokumen: nama
      }).subscribe({});
      window.location.reload()
  }

  // View Upload
  viewData( nama_dok:any ){
    let buatPdf = nama_dok.split('.').pop();
    if(buatPdf == 'pdf'){
      window.open('http://10.20.34.178:8805/api/v1/efos-de/downloadFile/'+nama_dok+'');
    }
    else{
        let url = 'http://10.20.34.178:8805/api/v1/efos-de/downloadFile/'+nama_dok+'';
        let img = '<img src="'+url+'">';
        this.popup = window.open('');
        this.popup.document.write(img);
    }
  }
}
