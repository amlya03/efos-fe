import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.scss'],
})
export class CallReportComponent implements OnInit {
  datakirimiancure: any;
  datakirimanappde: any;
  daWa: any;
  daWa1: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getCallReportByDe?sd=');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('callreportnon', res);
        this.daWa = res.body?.result;
      },
    });

    this.getdataentrynama().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('callreportnon', res);
        this.daWa1 = res.body?.result;
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.router.navigate(['/memo'], { queryParams: {  } });
    alert(this.datakirimanappde);
    this.router.navigate(['/memo'], { queryParams: { datakirimanappde: this.datakirimanappde, datakirimiancure: this.datakirimiancure } });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanappde, { params: options, observe: 'response' });
  }
  getdataentrynama(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.datakirimanappde, { params: options, observe: 'response' });
  }
}
