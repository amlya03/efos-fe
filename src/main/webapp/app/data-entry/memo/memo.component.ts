import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { memomodel } from './memo-model';
import { ServicesUploadDocumentService } from 'app/upload-document/services/services-upload-document.service';
import { getMemoUploadModel } from 'app/upload-document/services/config/getMemoUploadModel.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataEntryService } from '../services/data-entry.service';

export type EntityResponseDaWa = HttpResponse<memomodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  file?: File; // Variable to store file
  curef: string | undefined;
  app_no_de: string | undefined;
  statusPerkawinan: string | undefined;
  getMemoUpload: getMemoUploadModel = new getMemoUploadModel();
  daWa: memomodel[] = [];
  daWa1: fetchAllDe = new fetchAllDe();
  tampilanfixornon: any;
  untukSessionRole: any;
  untukSessionusername: any;
  untukSessionfullname: any;
  popup: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService,
    protected fileUploadService: ServicesUploadDocumentService,
    protected dataEntryService: DataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
      this.statusPerkawinan = params['statusPerkawinan'];
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor(' http://10.20.34.110:8805/api/v1/efos-de/getMemoByDe?sd=');

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.untukSessionusername = this.SessionStorageService.retrieve('sessionUserName');
    this.untukSessionfullname = this.SessionStorageService.retrieve('sessionFullName');

    this.load();
  }

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

        // alert(this.tampilanfixornon);
      },
    });

    this.fileUploadService.getMemoUpload(this.curef, this.app_no_de).subscribe(data => {
      this.getMemoUpload = data.result;
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
    // alert('BackStatustoDe');

    const keterangan = document.getElementById('keterangan') as HTMLInputElement | any;
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    // alert(id.value);
    // alert(jenis_kelamin.value);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    //   // alert('CREATE NIH');
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_back_de', {
        app_no_de: this.app_no_de,
        created_by: this.SessionStorageService.retrieve('sessionFullName'),
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
    const divToPrint = document.getElementById('example') as HTMLInputElement | any;
    this.popup = window.open('');
    this.popup.document.write(divToPrint.outerHTML);
    this.popup.print();
    this.popup.close();
  }

  updatekeupload(): void {
    // alert('cetak');
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.app_no_de,
        created_by: this.SessionStorageService.retrieve('sessionFullName'),
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
    // alert('cetak');
    const status_aplikasi_desc = document.getElementById('status_aplikasi_desc') as HTMLInputElement | any;

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.app_no_de,
        created_by: this.SessionStorageService.retrieve('sessionFullName'),
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
  backtoverifikatro(): void {
    this.router.navigate(['/daftar-aplikasi-waiting-assigment'], {
      // queryParams: {
      //   // datakirimanappde: this.datakirimande,
      //   // datakirimiancure: this.datakirimancuref,
      //   // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      // },
    });
  }
  pilihFile(pilih: any) {
    this.file = pilih.target.files[0];
  }
  thisFileUpload() {
    if (this.getMemoUpload === null) {
      this.fileUploadService.uploadMemo(this.file, this.app_no_de, this.curef).subscribe({
        next: bawaan => {
          alert('Data Berhasil diupload');
        },
      });
    } else {
      alert('Data Sudah diupload');
    }
  }
  download() {
    const buatPdf = this.getMemoUpload.nama_dokumen?.split('.').pop();
    if (buatPdf == 'pdf') {
      window.open('http://10.20.34.110:8805/api/v1/efos-de/downloadFile/' + this.getMemoUpload.nama_dokumen + '');
    } else {
      const url = 'http://10.20.34.110:8805/api/v1/efos-de/downloadFile/' + this.getMemoUpload.nama_dokumen + '';
      const img = '<img src="' + url + '">';
      this.popup = window.open('');
      this.popup.document.write(img);
    }
  }
  view(id: number | null | undefined) {
    this.dataEntryService.getFetchListMemo(id).subscribe(data => {
      this.daWa = data.result;
    });
  }
}
