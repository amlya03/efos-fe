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
  datakirimanappde: any;
  datakirimande: any;
  datakirimiancure: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  tambahatautidak: any;
  tampungantipeagunan: any;
  datatipeagunan: any;

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
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimande = params['datakirimande'];
    });
  }
  protected apigettipeagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tipe_agunan');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getCollateralById?si=');

  ngOnInit(): void {
    this.load();
  }

  load() {
    alert('123' + this.datakirimande);
    alert('321' + this.datakirimanappde);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('editcollateral', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        this.tampungantipeagunan = res.body?.result.tipe_agunan;
        // this.onResponseSuccess(res);
      },
    });
    this.gettipeagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('pasangan', res);
        this.datatipeagunan = res.body?.result;
        this.tampungantipeagunan = 0;
      },
    });
  }

  changefom() {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  gettipeagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigettipeagunan, { params: options, observe: 'response' });
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
    // console.warn('INI ADA GK SIH', this.datakirimancuref, this.datakirimande);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        datakirimande: this.datakirimanappde,
        datakirimancuref: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        // datakirimanidcollateral:idcollateral,
      },
    });
  }

  goto() {
    // this.onResponseSuccess(res);
    // alert('ke editcollateral ');
    // alert(this.datakirimanakategoripekerjaan);
    // console.warn('INI ADA GK SIH', this.datakirimancuref, this.datakirimande);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        datakirimande: this.datakirimanappde,
        datakirimancuref: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        // datakirimanidcollateral:idcollateral,
      },
    });
  }
}
