import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { Observable, Subject } from 'rxjs';
import { MemoModel } from '../service/config/memo.model';
@Component({
  selector: 'jhi-memo-verification',
  templateUrl: './memo-verification.component.html',
  styleUrls: ['./memo-verification.component.scss']
})
export class MemoVerificationComponent implements OnInit {
  dataEntry: fetchAllDe = new fetchAllDe();
  listMemo?: MemoModel[];
  app_no_de: any;

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
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }
  // URL DE
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  // URL Memo
  protected fetchMemo = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getMemoByDe?sd=');

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  // DE
  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  // Memo
  getfetchMemo(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchMemo + this.app_no_de);
  }

  load(): void {
    // ambil semua data DE
    this.getFetchSemuaData().subscribe(data => {
      this.dataEntry = data.result;
      // alert('DE '+ this.dataEntry?.status_perkawinan)
    });

    // List Table Memo
    this.getfetchMemo().subscribe(data => {
      this.listMemo = data.result
      console.log(this.listMemo)
      console.log(data.result.keterangan)
      this.dtTrigger.next(this.listMemo);
      if(data.code === 200){
        // this.memo = data.result;
        console.log('MEMo '+ data.result.keterangan)
      }
    });
  }

  printData() {
    const printTable = (<HTMLInputElement>document.getElementById('tableMemo'));
    document.write(printTable.outerHTML);
    window.print();
    window.close();
  }
}
