import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesUploadDocumentService {
  datakiriman: any;
  app_no_de: any;

  // /////////////////////////// DAFTAR APLIKASI INITIAL DATA ENTRY ////////////////////////////////////////////
  protected FetchListUploadDocument = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getDokumenUploadByCuref?sc='
  );
  // /////////////////////////// DAFTAR APLIKASI INITIAL DATA ENTRY ////////////////////////////////////////////

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params.datakiriman;
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // alert(this.datakiriman)
  }

  // ////////////////////// Ref Upload Document DE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getListUploadDocumentDE(): Observable<ApiResponse> {
    // return this.http.get<ApiResponse>(this.ListUploadDocument+this.datakiriman+'&ss=DE');
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + 'curef_20220822_347&ss=DE');
  }
  // ////////////////////// Ref Upload Document DE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Upload Document DEA \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // getListUploadDocumentAgunan(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.ListUploadDocument+this.datakiriman+'&ss=DEA');
  // }
  // ////////////////////// Ref Upload Document DEA \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
