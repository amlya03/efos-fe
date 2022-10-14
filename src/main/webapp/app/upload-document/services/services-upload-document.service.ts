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

  // API url
  baseApiUrl = 'https://file.io';

  // get Upload
  protected FetchListUploadDocument = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-de/getDokumenUploadByCuref?sc='
  );

  // // /////////////////////////// Upload  ////////////////////////////////////////////
  protected uploadDataEntry = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/upload_doc?app_no_de=');
  // // /////////////////////////// Upload  ////////////////////////////////////////////

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

  // Returns an observable
  upload(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData);
  }

  getListUploadDocument(curef: any, type: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + curef + '&ss=' + type);
  }

  // Returns an observable
  uploadDocument(file: any, deUpload: any, curefUpload: any, doc_type: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('fileUpload', file);
    return this.http.post(this.uploadDataEntry + deUpload + '&curef=' + curefUpload + '&doc_type=' + doc_type, formData);
  }
  // // ////////////////////// Ref Upload Document DE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // getListUploadDocumentDE(): Observable<ApiResponse> {
  //   // return this.http.get<ApiResponse>(this.ListUploadDocument+this.datakiriman+'&ss=DE');
  //   return this.http.get<ApiResponse>(this.FetchListUploadDocument + 'curef_20220822_347&ss=DE');
  // }
  //   // ////////////////////// Ref Upload Document DE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
