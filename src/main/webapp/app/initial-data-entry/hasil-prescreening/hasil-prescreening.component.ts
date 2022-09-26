import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
// import { count } from 'console';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-hasil-prescreening',
  templateUrl: './hasil-prescreening.component.html',
  styleUrls: ['./hasil-prescreening.component.scss'],
})
export class HasilPrescreeningComponent implements OnInit {
  daWa: any;
  datakirimanid: any;
  hasildhn: any;
  datakirimantgllahir: any;
  datakirimanappide: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimanid = params['datakirimanid'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimantgllahir = params['datakirimantgllahir'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappide = params['datakirimanappide'];
    });
  }

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getCustomerByAppId?sc=');
  protected getdhn = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/cekDhn');

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.postUpdateStatus();

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('tabel', res);
        this.daWa = res.body?.result.customer;
        console.warn('customer', res.body?.result.customer);
        // this.onResponseSuccess(res);

        this.cekdukcapil();
      },
    });
  }
  cekdukcapil() {
    const reffNumber = 'aaa';
    const timestamp = 'aaa';
    const local = 'aaa';
    const now = 'aaa';
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
        no_id: this.datakirimanappide,
        tanggal_lahir: this.datakirimanappide,

        reffNumber: reffNumber,
        timestamp: timestamp,
        channelID: 'EFOS',
        NIK: this.daWa.nama,
        noKK: '',
        namaLengkap: this.daWa.nama,
        jenisKelamin: this.daWa.nama,
        tempatLahir: '',
        tglLahir: this.daWa.nama,
        createdBy: this.daWa.nama,
        appNoIde: this.daWa.nama,
        pendidikan: '',
        pekerjaan: '',
        statusPerkawinan: this.daWa.nama,
        namaIbuKandung: '',
        statusHubKeluarga: '',
        alamat: this.daWa.nama,
        kodePropinsi: '',
        kodeKabupaten: '',
        kodeKecamatan: '',
        kodeKelurahan: '',
        namaPropinsi: this.daWa.nama,
        namaKabupaten: this.daWa.nama,
        namaKecamatan: this.daWa.nama,
        namaKelurahan: this.daWa.nama,
        noRW: this.daWa.nama,
        noRT: this.daWa.nama,
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.hasildhn = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          console.warn(data.result.token);
          console.warn(this.hasildhn);
        },
      });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanid, { params: options, observe: 'response' });
  }

  gotodaftaraplikaside() {
    this.router.navigate(['/data-entry'], {
      queryParams: {},
    });
  }

  postUpdateStatus(): void {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/cekDhn', {
        no_id: this.datakirimanappide,
        tanggal_lahir: this.datakirimanappide,
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.hasildhn = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          console.warn(data.result.token);
          console.warn(this.hasildhn);
        },
      });
  }
}
