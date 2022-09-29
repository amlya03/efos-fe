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
}
