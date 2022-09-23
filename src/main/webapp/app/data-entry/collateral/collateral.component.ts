import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { colateralmodel } from './collateral-model';

export type EntityResponseDaWa = HttpResponse<colateralmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss'],
})
export class CollateralComponent implements OnInit {
  datakirimande: any;
  datakirimancuref: any;
  datakirimanakategoripekerjaan: any;
  datakirimanappde: any;
  daWa: any;
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
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getCollateralByCuref?sc=');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    alert(this.datakirimancuref);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('pasangan', res);
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
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimancuref, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.onResponseSuccess(res);
    alert('ke struktur ');
    alert(this.datakirimanakategoripekerjaan);
    console.warn('INI ADA GK SIH', this.datakirimancuref, this.datakirimande);
    this.router.navigate(['/data-entry/struktur-pembiayaan'], {
      queryParams: {
        datakirimanappde: this.datakirimanappde,
        datakirimiancure: this.datakirimancuref,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
    // if(this.datakirimanstatus === 'Menikah'){
    //   this.router.navigate(['/data-pasangan'], { queryParams: { datakiriman:this.datakirimanappde } });
    //   alert(' ini NIKAH');
    //   console.warn(this.datakiriman);
    // }
    // else{
    //   alert('ini jomblo');
    //   this.router.navigate(['/collateral'], { queryParams: { datakiriman:this.datakirimanappde } });
    // }
  }
}
