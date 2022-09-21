import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
// import { jobinfolist } from './job-info-modellist';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-daftar-aplikasi-ide',
  templateUrl: './daftar-aplikasi-ide.component.html',
  styleUrls: ['./daftar-aplikasi-ide.component.scss'],
})
export class DaftarAplikasiIdeComponent implements OnInit {
  datakiriman: string | undefined;
  daWa: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-ide/list_app_ide?sc=20000');

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res);
        this.daWa = res.body?.result;

        // this.tampunganid = this.daWa[0].id;
        // alert(this.tampunganid);
        // console.warn('t1312abel', this.tampunganid);
        // console.warn('tabe123l', this.tampunganid);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  }

  goto() {
    this.router.navigate(['/daftaraplikasiidetambahide'], {
      queryParams: {},
    });
  }
}
