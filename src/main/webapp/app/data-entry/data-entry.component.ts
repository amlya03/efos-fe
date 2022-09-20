/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { dataentrymodel } from '../data-entry/data-entry-model';
// import { DaftarAplikasiWaitingAssigmentService,EntityArrayResponseDaWa } from './data-entry-component.servis';
import { createRequestOption } from 'app/core/request/request-util';
// import { DaftarAplikasiWaitingAssigmentService, EntityArrayResponseDaWa } from '../service/daftar-aplikasi-waiting-assigment.service';

export type EntityResponseDaWa = HttpResponse<dataentrymodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss'],
})
export class DataEntryComponent implements OnInit {
  numbers: number[];
  datakiriman!: string;
  tampungandataygdibawa: any;
  daWa: any;
  protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-verif/list_appraisal');
  // protected resourceUrlAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-verif/list_appraisal_process');
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands

  constructor(
    // protected daWaService: DaftarAplikasiWaitingAssigmentService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.numbers = Array(1000)
      .fill(1)
      .map((x, i) => i);

    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });

    // this.tampungandataygdibawa = this.route.snapshot.paramMap.get('datakiriman');
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res);
        console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakiriman, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  gotojobinfo(contohtampungancuref: any, contohtampungstatuskawain: any, contohtampunganappde: any, contohtampungankategoripekerjaan: any) {
    // this.onResponseSuccess(res);
    alert(contohtampungancuref);
    this.router.navigate(['/job-info'], {
      queryParams: {
        datakiriman: contohtampungancuref,
        datakirimanstatus: contohtampungstatuskawain,
        datakirimanappde: contohtampunganappde,
        datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
      },
    });
  }
}
