import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable, Subject } from 'rxjs';
import { uploadDocument } from '../services/config/uploadDocument.model';
import { ServicesUploadDocumentService } from '../services/services-upload-document.service';

@Component({
  selector: 'jhi-upload-document-de',
  templateUrl: './upload-document-de.component.html',
  styleUrls: ['./upload-document-de.component.scss'],
})
export class UploadDocumentDeComponent implements OnInit, OnDestroy {
  uploadDocument?: uploadDocument[];
  datakiriman: any;
  app_no_de: any;

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file
  buttonUpload: boolean = false; // Flag variable to store button uploadDocument

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected fileUploadService: ServicesUploadDocumentService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params.datakiriman;
      this.app_no_de = params.app_no_de;
    });
  }

  protected FetchListUploadDocument = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getDokumenUploadByCuref?sc='
  );

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  getListUploadDocumentDE(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + this.datakiriman + '&ss=DE');
  }

  load(): void {
    this.getListUploadDocumentDE().subscribe(data => {
      // console.warn('ini upload de' + data);
      this.uploadDocument = (data as any).result;
      this.dtTrigger.next(data.result);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  viewUploadDEA(): void {
    this.router.navigate(['/upload_document/upload_document_agunan'], { queryParams: { datakiriman: this.datakiriman } });
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      }
    });
  }
}
