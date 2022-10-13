import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable, Subject } from 'rxjs';
import { fetchAllDe } from '../services/config/fetchAllDe.model';
import { uploadDocument } from '../services/config/uploadDocument.model';

@Component({
  selector: 'jhi-upload-document-agunan',
  templateUrl: './upload-document-agunan.component.html',
  styleUrls: ['./upload-document-agunan.component.scss'],
})
export class UploadDocumentAgunanComponent implements OnInit, OnDestroy {
  uploadDocument?: uploadDocument[];
  datakiriman: any;
  app_no_de: any;
  fetchAllAgunan: fetchAllDe = new fetchAllDe();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params.datakiriman;
      this.app_no_de = params.app_no_de;
    });
  }

  protected FetchListUploadDocument = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-de/getDokumenUploadByCuref?sc='
  );
  protected fetchSemuaDataDEA = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-de/getDataEntryByDe?sd='
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

  getFetchSemuaDataDEA(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaDataDEA + this.app_no_de);
  }

  getListUploadDocumentDEA(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + this.datakiriman + '&ss=DEA');
  }

  load(): void {
    this.getFetchSemuaDataDEA().subscribe(data => {
      this.fetchAllAgunan = data.result;
      // this.dtTrigger.next(this.fetchAllAgunan);
    });

    this.getListUploadDocumentDEA().subscribe(data => {
      // console.warn('ini upload de' + data);
      this.uploadDocument = (data as any).result;
      this.dtTrigger.next(data.result);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }
}
