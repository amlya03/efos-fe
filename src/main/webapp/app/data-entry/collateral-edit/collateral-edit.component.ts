import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { colateralmodel } from './collateral-model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral-edit',
  templateUrl: './collateral-edit.component.html',
  styleUrls: ['./collateral-edit.component.scss'],
})
export class CollateralEditComponent implements OnInit {
  datakirimanidcollateral: any;
  app_no_de: any;
  datakirimiancure: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimanidcollateral = params['datakirimanidcollateral'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getCollateralById?si=');

  ngOnInit(): void {
    this.load();
  }

  load() {
    alert('123' + this.app_no_de);
    alert('321' + this.app_no_de);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('editcollateral', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanidcollateral, { params: options, observe: 'response' });
  }

  updatecollateral() {
    // this.onResponseSuccess(res);
    // alert('ke editcollateral ');
    // alert(this.datakirimanakategoripekerjaan);
    // console.warn('INI ADA GK SIH', this.curef, this.app_no_de);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        app_no_de: this.app_no_de,
        curef: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        // datakirimanidcollateral:idcollateral,
      },
    });
  }

  goto() {
    // this.onResponseSuccess(res);
    // alert('ke editcollateral ');
    // alert(this.datakirimanakategoripekerjaan);
    // console.warn('INI ADA GK SIH', this.curef, this.app_no_de);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        app_no_de: this.app_no_de,
        curef: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        // datakirimanidcollateral:idcollateral,
      },
    });
  }
}
