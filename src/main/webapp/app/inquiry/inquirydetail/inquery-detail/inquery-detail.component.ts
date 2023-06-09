import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { dataentrymodel } from '../data-entry/data-entry-model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import { DataEntryService } from './data-entry/services/data-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { DataEntryService } from 'app/inquiry/service/inquiry_service';
import { dataentrymodel } from 'app/data-entry/data-entry-model';
import { inquirymodel } from 'app/inquiry/inquiry-model';
import { environment } from 'environments/environment';
// import { DataEntryService } from './inquiry/service/inquiry_service';
declare let $: any;

@Component({
  selector: 'jhi-inquery-detail',
  templateUrl: './inquery-detail.component.html',
  styleUrls: ['./inquery-detail.component.scss'],
})
export class InqueryDetailComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  title = 'EFOS';
  app_no_de!: string;
  tampungandataygdibawa: any;
  getstatustraking?: inquirymodel[];
  role: any;
  dataDE?: any;
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
    this.role = this.sessionStorageService.retrieve('sessionRole');
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
      this.inquiryservice.getdatastatustraking(this.app_no_de).subscribe(data => {
        console.warn(data);
        this.getstatustraking = (data as any).result;
        console.warn(data.code);
        // if (data.code === 200) {
        //   this.getstatustraking = (data as any).result;
        //   this.dtTrigger.next(data.result);
        //   console.warn( this.getstatustraking);
        //   this.getLoading(false);
        // }
      });
    }, 20);
    setTimeout(() => {
      this.inquiryservice.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        console.warn(data);
        this.dataDE = data.result;
        console.warn(this.dataDE);
        // alert(this.dataDE.status_aplikasi);
        // if (data.code === 200) {
        //   this.getstatustraking = (data as any).result;
        //   this.dtTrigger.next(data.result);
        //   console.warn( this.getstatustraking);
        //   this.getLoading(false);
        // }
      });
    }, 30);
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

  downloadpdfpenolakan(de: any) {
    window.open(this.baseUrl + 'v1/efos-de/downloadDocPenolakan/' + de + '');
    // window.open(this.baseUrl + 'v1/efos-de/downloadDocPenolakan/' + 'de221220000185' +'');
  }

  viewdataentry(getAppNoDe: any, getCuref: any): void {
    this.getLoading(true);
    this.router
      .navigate(['/data-entry/personalinfo'], {
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
