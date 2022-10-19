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
  app_no_de: any;
  daWa: any;
  daWa1: any;
  tampilanfixornon: any;
  untukSessionRole: any;
  untukSessionusername: any;
  untukSessionfullname: any;

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
      this.app_no_de = params['app_no_de'];
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor(' http://10.20.34.110:8805/api/v1/efos-de/getMemoByDe?sd=');

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionusername = this.localStorageService.retrieve('sessionUserName');
    this.untukSessionfullname = this.localStorageService.retrieve('sessionFullName');

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

        this.tampilanfixornon = res.body?.result.kategori_pekerjaan;

        alert(this.tampilanfixornon);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.app_no_de, { params: options, observe: 'response' });
  }

  getdataentrynama(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.app_no_de, { params: options, observe: 'response' });
  }

  simpanmemo(): void {
    // alert(getAppNoDe);

    const keterangan = document.getElementById('keterangan') as HTMLInputElement | any;

    // alert(id.value);
    // alert(jenis_kelamin.value);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    // alert('CREATE NIH');
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_memo', {
        // headers: headers,
        // alamat_perusahaan: alamat_perusahaan.value,
        // bulan_berdiri: contohtampungankategoripekerjaan,
        // created_by: contohtampungancuref,
        // curef: this.datakiriman,
        id: '',
        keterangan: keterangan.value,
        users: this.untukSessionfullname,
        role: this.untukSessionRole,
        created_by: this.untukSessionusername,
        app_no_de: this.app_no_de,
      })

      .subscribe({
        next: bawaan => {
          window.location.reload();
        },
      });

    // this.router.navigate(['/data-entry/memo'], {
    //   queryParams: { app_no_de: this.app_no_de}
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
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_back_de', {
        app_no_de: this.app_no_de,
        created_by: this.localStorageService.retrieve('sessionFullName'),
        status_aplikasi: status_aplikasi_desc.value,
      })

      .subscribe({
        next: bawaan => {
          this.router.navigate(['/data-entry/memo'], {
            queryParams: { app_no_de: this.app_no_de },
          });

          // window.location.reload();
        },
      });

    // this.router.navigate(['/data-entry/memo'], {
    //   queryParams: { app_no_de: this.app_no_de}
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
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.app_no_de,
        created_by: this.localStorageService.retrieve('sessionFullName'),
        status_aplikasi: status_aplikasi_desc.value,
      })

      .subscribe({
        next: bawaan => {
          // this.router.navigate(['/data-entry/memo'], {
          //   queryParams: { app_no_de: this.app_no_de}
          //  });

          // window.location.reload();

          this.router.navigate(['/upload_document'], {
            queryParams: {
              // app_no_de: this.app_no_de,
              // datakirimiancure: this.curef,
              // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
            },
          });
        },
      });

    // this.router.navigate(['/data-entry/memo'], {
    //   queryParams: { app_no_de: this.app_no_de}
    //  });

    // this.router.navigate(['/upload_document'], {
    //   queryParams: {
    //     // app_no_de: this.app_no_de,
    //     // datakirimiancure: this.curef,
    //     // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
    //   },
    // });
  }

  updatestatus(): void {
    alert('cetak');
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.app_no_de,
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
