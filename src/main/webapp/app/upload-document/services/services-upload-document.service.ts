import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesUploadDocumentService {
  baseUrl: string = environment.baseUrl;
  datakiriman: any;
  app_no_de: any;

  // API url
  baseApiUrl = 'https://file.io';

  // /////////////////////////////// Get List Daftar APlikasi Upload /////////////////////////////////
  protected FetchDaftarAplikasiUpload = this.applicationConfigService.getEndpointFor(
    // this.baseUrl + 'v1/efos-de/list_app_de_upload?sc=%20&sf=%20&si=%20&sk=%20&sn=%20&su=199183174'
    this.baseUrl + 'v1/efos-de/list_app_de_upload?su='
  );
  // /////////////////////////////// Get List Daftar APlikasi Upload /////////////////////////////////

  // get Upload
  protected FetchListUploadDocument = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/getDokumenUploadByCuref?sc=');
  /////////////////////////////////// Memo //////////////////////////////////////////////
  protected linkUploadMemo = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/memo_upload_doc?app_no_de=');
  /////////////////////////////////// Memo /////////////////////////////////////////////

  /////////////////////////////////// Get Memo /////////////////////////////////////////////
  protected getUploadMemo = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-de/getMemoUploadByCuref?sc=');
  /////////////////////////////////// Get Memo /////////////////////////////////////////////

  // // /////////////////////////// Upload  ////////////////////////////////////////////
  protected uploadDataEntry = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/upload_doc?app_no_de=');
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
  upload(file: File): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData);
  }

  getListUploadDocument(curef: string | null | undefined, type: string | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchListUploadDocument + curef + '&ss=' + type);
  }

  // Returns an observable
  uploadDocument(file: any, deUpload: string | null | undefined, curefUpload: string | null | undefined, doc_type: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('fileUpload', file);
    return this.http.post(this.uploadDataEntry + deUpload + '&curef=' + curefUpload + '&doc_type=' + doc_type, formData);
  }

  // Returns an observable
  uploadMemo(file: any, deUpload: string | null | undefined, curefUpload: string | null | undefined): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('fileUpload', file);
    return this.http.post(this.linkUploadMemo + deUpload + '&curef=' + curefUpload, formData);
  }

  //////////////////////////////// get Upload Memo ///////////////////////////////////////////////////////////////
  getMemoUpload(curef: string | undefined, de: string | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getUploadMemo + curef + '&ss=' + de);
  }
  //////////////////////////////// get Upload Memo ///////////////////////////////////////////////////////////////

  //////////////////////////////// get Upload Memo ///////////////////////////////////////////////////////////////
  getDaftarAplikasiUpload(userId: string | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.FetchDaftarAplikasiUpload + userId);
  }
  //////////////////////////////// get Upload Memo ///////////////////////////////////////////////////////////////
  // // ////////////////////// Ref Upload Document DE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // getListUploadDocumentDE(): Observable<ApiResponse> {
  //   // return this.http.get<ApiResponse>(this.ListUploadDocument+this.datakiriman+'&ss=DE');
  //   return this.http.get<ApiResponse>(this.FetchListUploadDocument + 'curef_20220822_347&ss=DE');
  // }
  //   // ////////////////////// Ref Upload Document DE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
