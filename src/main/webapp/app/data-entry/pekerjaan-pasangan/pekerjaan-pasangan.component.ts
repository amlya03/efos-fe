import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-pekerjaan-pasangan',
  templateUrl: './pekerjaan-pasangan.component.html',
  styleUrls: ['./pekerjaan-pasangan.component.scss'],
})
export class PekerjaanPasanganComponent implements OnInit {
  datakirimiancure: any;
  datakirimande: any;
  datakirimancuref: any;
  datakirimanakategoripekerjaan: any;
  datakirimanappde: any;
  daWa: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobPasanganByCuref?sc=');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimande = params['datakirimande'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimancuref = params['datakirimancuref'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('strukturdata', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });
  }

  goto(): void {
    // this.onResponseSuccess(res);
    alert('otw collateral1 ');
    console.warn('colalteral', this.datakirimanappde, this.datakirimancuref, this.datakirimanakategoripekerjaan);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        datakirimande: this.datakirimande,
        datakirimancuref: this.datakirimancuref,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimancuref, { params: options, observe: 'response' });
  }
}
