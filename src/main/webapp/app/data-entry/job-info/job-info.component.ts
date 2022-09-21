import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { jobinfolist } from './job-info-modellist';

export type EntityResponseDaWa = HttpResponse<jobinfolist>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss'],
})
export class JobInfoComponent implements OnInit {
  datakiriman!: string;
  datakirimanstatus!: string;
  datakirimanappde!: string;
  datakirimanakategoripekerjaan!: string;
  daWa: any;
  nampungsebelum: any;
  tampunganid: any;
  bawaidjob: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanstatus = params['datakirimanstatus'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }
  //  http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=572
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  //  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res.body?.result);
        this.daWa = res.body?.result;

        // this.tampunganid = this.daWa[0].id;
        // alert(this.tampunganid);
        console.warn('t1312abel', this.tampunganid);
        console.warn('tabe123l', this.tampunganid);
      },
    });

    this.sebelum(this.tampunganid).subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;
        this.tampunganid = this.nampungsebelum[0];
        // alert('ini masih hard code');
        console.warn('SEBELUMNYA', this.tampunganid);

        // this.onResponseSuccess(res);
      },
    });
    // console.warn('hitam')
    // console.warn('hitam',this.tampunganid)
    // alert(this.tampunganid);

    // throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load2() {
    this.sebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;

        // alert('ini masih hard code');
        console.warn('SEBELUMNYA', this.nampungsebelum);

        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakiriman, { params: options, observe: 'response' });
  }

  sebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.datakiriman, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto(contohtampungancuref: any) {
    // this.onResponseSuccess(res);

    if (this.datakirimanstatus === 'Menikah') {
      this.router.navigate(['/data-pasangan'], {
        queryParams: {
          datakirimanappde: this.datakirimanappde,
          datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
          datakirimancuref: contohtampungancuref,
        },
      });
      // alert(' ini NIKAH');
      console.warn(this.datakiriman);
    } else {
      // alert('ini jomblo');
      // alert(contohtampungancuref);
      this.router.navigate(['/collateral'], {
        queryParams: {
          datakirimanappde: this.datakirimanappde,
          datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
          datakirimancuref: contohtampungancuref,
        },
      });
    }
  }
}
