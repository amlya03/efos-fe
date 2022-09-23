import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
// import { dataentrymodel } from '../data-entry/data-entry-model';
// import { DaftarAplikasiWaitingAssigmentService,EntityArrayResponseDaWa } from './data-entry-component.servis';
import { createRequestOption } from 'app/core/request/request-util';
// import { DaftarAplikasiWaitingAssigmentService, EntityArrayResponseDaWa } from '../service/daftar-aplikasi-waiting-assigment.service';

// export type EntityResponseDaWa = HttpResponse<dataentrymodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  numbers: number[] | undefined;
  datakiriman!: string;
  tampungandataygdibawa: any;
  daWa: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
  }

  ngOnInit(): void {
    this.load();
  }
  load(): void {
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

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakiriman, { params: options, observe: 'response' });
  }

  gotojobinfo(
    contohtampungancuref: any,
    contohtampungstatuskawain: any,
    contohtampunganappde: any,
    contohtampungankategoripekerjaan: any
  ): void {
    // this.onResponseSuccess(res);
    alert(contohtampungancuref);
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        datakiriman: contohtampungancuref,
        datakirimanstatus: contohtampungstatuskawain,
        datakirimanappde: contohtampunganappde,
        datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
      },
    });
  }
}
