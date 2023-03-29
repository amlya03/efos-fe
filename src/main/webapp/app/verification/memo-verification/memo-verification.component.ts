/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { MemoModel } from '../service/config/memo.model';
import Swal from 'sweetalert2';
import { detailMemo } from 'app/data-entry/services/config/detailMemo.model';
import { environment } from 'environments/environment';
@Component({
  selector: 'jhi-memo-verification',
  templateUrl: './memo-verification.component.html',
  styleUrls: ['./memo-verification.component.scss'],
})
export class MemoVerificationComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  dataEntry: fetchAllDe = new fetchAllDe();
  listMemo: MemoModel[] = [];
  app_no_de: any;
  detailMemoModel: detailMemo = new detailMemo();
  valVER_PRESCR = 0;
  valVER_PRE_SPV = 0;

  // /////////////Session//////////////////
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;
  daftarAplikasiDataEntry: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    private sessionStorageService: SessionStorageService
  ) {
    // ///////////////////////////// Session /////////////////////////////////////////////
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.sessionStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.sessionStorageService.retrieve('sessionKdCabang');
    // ///////////////////////////// Session /////////////////////////////////////////////

    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  load(): void {
    this.getLoading(true);
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
    });

    // List Table Memo
    this.dataEntryService.getfetchMemo(this.app_no_de).subscribe(data => {
      this.listMemo = data.result;
      this.dtTrigger.next(this.listMemo);
      setTimeout(() => {
        this.listMemo.forEach((dataMemo: MemoModel) => {
          if (dataMemo.role === 'VER_PRESCR') {
            this.valVER_PRESCR = 1;
            this.getLoading(false);
          } else if (dataMemo.role === 'VER_PRE_SPV') {
            this.valVER_PRE_SPV = 1;
            this.getLoading(false);
          } else {
            this.getLoading(false);
          }
        });
      }, 10);
    });
  }

  printData(): void {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const printTable = <HTMLInputElement>document.getElementById('tableMemo');
    document.write(printTable.outerHTML);
    window.print();
    window.close();
  }

  // Simpan
  simpanMemo(keteranganMemo: any): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_memo', {
        id: 0,
        keterangan: keteranganMemo,
        users: this.untukSessionUserName + '-' + this.untukSessionFullName,
        role: this.untukSessionRole,
        app_no_de: this.app_no_de,
        created_date: '',
        created_by: this.untukSessionUserName,
      })
      .subscribe({
        next() {
          window.location.reload();
        },
        error: error => console.warn(error),
      });
  }

  // Update STatus
  updateStatus(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
        app_no_de: this.app_no_de,
        created_by: this.untukSessionUserName,
        status_aplikasi: '3.1',
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/daftar-aplikasi-verification']);
        },
        error: error => console.warn(error),
      });
  }

  // detail memo
  detailMemo(id: number | null | undefined): void {
    this.dataEntryService.getFetchListMemo(id).subscribe(data => {
      this.detailMemoModel = data.result;
      Swal.fire({
        // title: 'Detail Memo',
        imageUrl: '../../../content/images/bank-mega-syariah.png',
        imageHeight: 100,
        html:
          '<div class="row"><div class="col">' +
          '<br/>' +
          '<ul><h5>Keterangan Memo :</h5><li>' +
          '<h6 style="text-align: left;">' +
          this.detailMemoModel.keterangan +
          '</h6>' +
          '</li></ul></div>' +
          '<div class="col">' +
          '<h4>' +
          this.dataEntry.nama +
          '</h4>' +
          '<p class="text-muted">Dibuat Oleh ' +
          this.detailMemoModel.role +
          ' /  ' +
          this.detailMemoModel.users +
          '</p>' +
          '<ul style="text-align: left;"><h6>' +
          this.dataEntry.produk_pembiayaan +
          '</h6>' +
          '<li style="text-align: left;"><label>Fasilitas</label> : ' +
          this.dataEntry.kode_fasilitas_name +
          '</li>' +
          '<li><label>Plafond</label>: ' +
          Number(this.dataEntry.nilai_pembiayaan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) +
          '</li>' +
          '<li><label>Tenor</label> : ' +
          this.dataEntry.jangka_waktu +
          '</li>' +
          '</ul></div></div>',
        focusConfirm: false,
        // preConfirm: () => {
        //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
        // },
      });

      // if (formValues) {
      //   Swal.fire(JSON.stringify(formValues));
      // }
      // ////////////// Pop Up Input Scoring ////////////////////////
    });
  }
}
