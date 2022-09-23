import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

// export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  datakirimiancure: any;
  datakiriman: any;
  datakirimanappde: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
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

    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getEmergencyByCuref?sc=');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('emergency', res);
        this.daWa = res.body?.result;
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimiancure, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto(appde: any) {
    if (this.datakirimanakategoripekerjaan === 'Fix Income') {
      alert('ini fix');
      alert(this.datakirimanappde);
      this.router.navigate(['/data-entry/call-report'], {
        queryParams: { datakirimanappde: this.datakirimanappde, datakirimiancure: this.datakirimiancure },
      });
    } else {
      alert('ini non fix');
      alert(this.datakirimanappde);
      alert(this.datakirimanakategoripekerjaan);
      this.router.navigate(['/data-entry/call-report-non'], {
        queryParams: { datakirimanappde: this.datakirimanappde, datakirimiancure: this.datakirimiancure },
      });
    }
    // this.onResponseSuccess(res);
    // alert('ke call-report');
    // this.router.navigate(['/call-report'], { queryParams: { datakiriman:this.datakirimiancure , datakirimiancure:this.datakiriman } });
  }
}
