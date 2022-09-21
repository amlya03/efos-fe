import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { initialdataentryfix } from './initial-data-entry-model';

export type EntityResponseDaWa = HttpResponse<initialdataentryfix>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-fix',
  templateUrl: './initial-data-entry-fix.component.html',
  styleUrls: ['./initial-data-entry-fix.component.scss'],
})
export class InitialDataEntryFixComponent implements OnInit {
  daWa: any;
  errorMessage: any;
  daWaprof: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-ide/getAppId');
  protected getprovinsi = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/wilayahSvc/getProvinsi/');
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });

    this.getdataentry1().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('PROVINSI', res);

        this.daWaprof = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  }
  getdataentry1(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.getprovinsi, { params: options, observe: 'response' });
  }

  gotoprescreaning() {
    alert(this.app_no_ide);
    this.router.navigate(['/hasilprescreening'], {
      queryParams: {},
    });
  }

  nama: string | undefined;
  jenis_kelamin: string | undefined;
  app_no_ide: string | undefined = 'cara dapet valuenya';
  tanggal_lahir: string | undefined;
  tempat_lahir: string | undefined;
  status_perkawinan: string | undefined;
  agama: string | undefined;
  pendidikan: string | undefined;
  kewarganegaraan: string | undefined;
  nama_ibu_kandung: string | undefined;
  npwp: string | undefined;
  alamat_ktp: string | undefined;
  provinsi_cabang: string | undefined;
  kabkota_cabang: string | undefined;
  kecamatan: string | undefined;
  kelurahan: string | undefined;
  kode_pos: string | undefined;

  gotodaftaraplikasiide(getappide: any) {
    alert(this.nama);
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
        nama: this.nama,
        jenis_kelamin: this.jenis_kelamin,
        app_no_ide: getappide,
        tanggal_lahir: this.tanggal_lahir,
        tempat_lahir: this.tempat_lahir,
        status_perkawinan: this.status_perkawinan,
        agama: this.agama,
        pendidikan: this.pendidikan,
        kewarganegaraan: this.kewarganegaraan,
        nama_ibu_kandung: this.nama_ibu_kandung,
        npwp: this.npwp,
        alamat_ktp: this.alamat_ktp,
        provinsi_cabang: this.provinsi_cabang,
        // status_aplikasi: this.kirimStatusAplikasi[i],
      })
      .subscribe({
        next: data => {
          this.router.navigate(['/daftaraplikasiide'], {
            queryParams: {},
          });
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          alert('error');
        },
      });

    // this.router.navigate(['/daftaraplikasiide'], {
    //   queryParams: {},
    // });
  }

  onSubmit(event: any) {
    return event.target.nama.value;
  }
}
