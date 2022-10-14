import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';

import { createRequestOption } from 'app/core/request/request-util';
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-fix-edit',
  templateUrl: './initial-data-entry-fix-edit.component.html',
  styleUrls: ['./initial-data-entry-fix-edit.component.scss'],
})
export class InitialDataEntryFixEditComponent implements OnInit {
  datakiriman: any;
  datakirimanidcustomer: any;
  daWa: any;
  daWajob: any;
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
      this.datakirimanidcustomer = params['datakirimanidcustomer'];
    });
  }
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getCustomerByAppId?sc=');
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('EDITFIX job', res.body?.result.job);
        console.warn('EDITFIX job', res.body?.result.customer);
        console.warn('EDITFIX job', res.body?.result.customer.status_perkawinan);
        this.daWa = res.body?.result.customer;
        this.daWajob = res.body?.result.customer;
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanidcustomer, { params: options, observe: 'response' });
  }
}
