import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { memomodel } from './memo-model';

export type EntityResponseDaWa = HttpResponse<memomodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  datakirimiancure: any;
  datakirimanappde: any;
  daWa: any;
  daWa1: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor(' http://10.20.34.110:8805/api/v1/efos-de/getMemoByDe?sd=');

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('3131', res);
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

  simpanmemo(): void {
    // alert(getAppNoDe);

    const keterangan = document.getElementById('keterangan') as HTMLInputElement | any;

    // alert(id.value);
    // alert(jenis_kelamin.value);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    // alert('CREATE NIH');
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/create_memo', {
        // headers: headers,
        // alamat_perusahaan: alamat_perusahaan.value,
        // bulan_berdiri: contohtampungankategoripekerjaan,
        // created_by: contohtampungancuref,
        // curef: this.datakiriman,
        id: '',
        keterangan: keterangan.value,
        // users: alamat_perusahaan.value,
        // role: jenis_bidang_perusahaan.value,
        // created_by: jumlah_karyawan.value,
        app_no_de: this.datakirimanappde,
      })

      .subscribe({
        next: bawaan => {
          window.location.reload();
        },
      });

    // this.router.navigate(['/data-entry/memo'], {
    //   queryParams: { datakirimanappde: this.datakirimanappde}
    //  });
  }

  kembalikede(): void {
    alert('BackStatustoDe');

    const keterangan = document.getElementById('keterangan') as HTMLInputElement | any;
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    // alert(id.value);
    // alert(jenis_kelamin.value);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    //   // alert('CREATE NIH');
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_status_back_de', {
        app_no_de: this.datakirimanappde,
        created_by: this.localStorageService.retrieve('sessionFullName'),
        status_aplikasi: status_aplikasi_desc.value,
      })

      .subscribe({
        next: bawaan => {
          this.router.navigate(['/data-entry/memo'], {
            queryParams: { datakirimanappde: this.datakirimanappde },
          });

          // window.location.reload();
        },
      });

    // this.router.navigate(['/data-entry/memo'], {
    //   queryParams: { datakirimanappde: this.datakirimanappde}
    //  });
  }

  cetakmemo(): void {
    alert('cetak');

    //  var divToPrint=document.getElementById("example");
    //         newWin= window.open("");
    //         newWin.document.write(divToPrint.outerHTML);
    //         newWin.print();
    //         newWin.close();

    // let printContents, popupWin;
    // printContents = document.getElementById('#example').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       // You need to insert the stylesheet to the print function
    //       <link rel="stylesheet" href="correct href to your stylesheet">
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();
  }

  updatekeupload(): void {
    alert('cetak');
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.datakirimanappde,
        created_by: this.localStorageService.retrieve('sessionFullName'),
        status_aplikasi: status_aplikasi_desc.value,
      })

      .subscribe({
        next: bawaan => {
          // this.router.navigate(['/data-entry/memo'], {
          //   queryParams: { datakirimanappde: this.datakirimanappde}
          //  });

          // window.location.reload();

          this.router.navigate(['/upload_document'], {
            queryParams: {
              // datakirimanappde: this.datakirimande,
              // datakirimiancure: this.datakirimancuref,
              // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
            },
          });
        },
      });

    // this.router.navigate(['/data-entry/memo'], {
    //   queryParams: { datakirimanappde: this.datakirimanappde}
    //  });

    // this.router.navigate(['/upload_document'], {
    //   queryParams: {
    //     // datakirimanappde: this.datakirimande,
    //     // datakirimiancure: this.datakirimancuref,
    //     // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
    //   },
    // });
  }

  updatestatus(): void {
    alert('cetak');
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.datakirimanappde,
        created_by: this.localStorageService.retrieve('sessionFullName'),
        status_aplikasi: status_aplikasi_desc.value,
      })

      .subscribe({
        next: bawaan => {
          this.router.navigate(['/upload_document'], {
            queryParams: {
              // datakirimanappde: this.datakirimande,
              // datakirimiancure: this.datakirimancuref,
              // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
            },
          });
        },
      });
  }
}
