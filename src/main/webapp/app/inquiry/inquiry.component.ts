import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { dataentrymodel } from '../data-entry/data-entry-model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import { DataEntryService } from './data-entry/services/data-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { DataEntryService } from './service/inquiry_service';
declare let $: any;

@Component({
  selector: 'jhi-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit, OnDestroy {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  title = 'EFOS';
  app_no_de!: string;
  tampungandataygdibawa: any;
  dataEntry?: dataentrymodel[];
  valueCariButton = '';
  kategori_pekerjaan = '';
  a = '';
  b = '';
  c = '';
  d = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected inquiryservice: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal,
    private sessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
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

  load(): void {
    this.getLoading(true);
    setTimeout(() => {
      this.sessionStorageService.store('personalInfo', 0);
      this.sessionStorageService.store('jobInfo', 0);
      this.sessionStorageService.store('dataPas', 0);
      this.sessionStorageService.store('pekerPas', 0);
      this.sessionStorageService.store('collateral', 0);
      this.sessionStorageService.store('strukturPemb', 0);
      this.sessionStorageService.store('callReport', 0);
      this.sessionStorageService.store('uploadDE', 0);
      this.sessionStorageService.store('uploadDEA', 0);
    }, 10);
    setTimeout(() => {
      this.inquiryservice.getDaftarAplikasiDataEntry().subscribe(data => {
        // console.warn(data);
        if (data.code === 200) {
          this.dataEntry = (data as any).result;
          this.dtTrigger.next(data.result);
          this.getLoading(false);
        }
      });
    }, 20);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  cariButton(listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    $('#dataTables-example').DataTable().columns(4).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(3).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(2).search(listKategori).draw();
    // this.a = inputNoAplikasi
    // this.b = inputNamaNasabah
    // this.c = listKategori
    // alert("1 "+ this.a)
    // alert("2 "+ this.b)
    // alert("3 "+ this.c)
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
    // alert("bbb")
  }

  viewdataentry(getAppNoDe: any, getCuref: any): void {
    this.getLoading(true);
    this.router
      .navigate(['inquiry-detail'], {
        queryParams: { curef: getCuref, app_no_de: getAppNoDe },
      })
      .then(() => {
        window.location.reload();
      });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
