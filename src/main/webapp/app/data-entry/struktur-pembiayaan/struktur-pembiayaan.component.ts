import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { strukturpembiayaanmodel } from './struktur-pembiayaan-model';

export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-struktur-pembiayaan',
  templateUrl: './struktur-pembiayaan.component.html',
  styleUrls: ['./struktur-pembiayaan.component.scss'],
})
export class StrukturPembiayaanComponent implements OnInit {
  datakiriman: any;
  datakirimiancure: any;
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
      this.datakirimanappde = params['datakirimanappde'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getStrukturBiayaByDe?');

  ngOnInit(): void {
    this.load();
    console.warn('strukturdata', this.datakirimiancure);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
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

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + 'sc=' + this.datakirimiancure + '&sd=' + this.datakirimanappde, {
      params: options,
      observe: 'response',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.onResponseSuccess(res);
    alert('ke emergency');
    alert(this.datakirimanakategoripekerjaan);
    alert(this.datakirimanappde);
    this.router.navigate(['/emergency-contact'], {
      queryParams: {
        datakirimanappde: this.datakirimanappde,
        datakirimiancure: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }
}
