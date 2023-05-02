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
import { environment } from 'environments/environment';
declare let $: any;

@Component({
  selector: 'jhi-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit, OnDestroy {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  title = 'EFOS';
  app_no_de!: string;
  tampungandataygdibawa: any;
  dataEntry: dataentrymodel[] = [];
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

    this.inquiryservice.getdatastatustrakinginquiry().subscribe(data => {
      // console.warn(data);
      this.dataEntry = data.result;
      this.dtTrigger.next(data.result);
      this.getLoading(false);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  cariButton(listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string, tglMulai: any, tglAkhir: any): void {
    $('#dataTables-example').DataTable().columns(4).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(3).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(2).search(listKategori).draw();

    // date range
    const splitTglMulai = tglMulai.split('-');
    const splitTglAkhir = tglAkhir.split('-');
    // console.warn(splitTglMulai[2])
    // console.warn(tglMulai)
    $('#dataTables-example').DataTable().columns(7).search(splitTglMulai[0]).draw();
    $('#dataTables-example').DataTable().columns(8).search(splitTglMulai[1]).draw();
    $('#dataTables-example').DataTable().columns(9).search(splitTglMulai[2]).draw();

    // Custom filtering function which will search data in column four between two values
    // $.fn.dataTable.ext.search.push(
    //   function( settings : any, data: any, dataIndex:any ) {
    //       const min = tglMulai;
    //       const max = tglAkhir;
    //       const date = new Date(data[7]);
    //       console.warn('1<=12', Number(1) <= Number(12))
    //       // console.warn('sett',settings)
    //       // console.warn('data',data)
    //       // console.warn('dataIndex',dataIndex)
    //       const minDate = new Date(tglMulai);
    //       const maxDate = new Date(tglAkhir);
    //       console.warn(minDate <= date  && date <= maxDate)
    //       // console.warn(date <= max)
    //       if (
    //           ( min === null && max === null ) ||
    //           ( min === null && date <= max ) ||
    //           ( min <= date   && max === null ) ||
    //           ( min <= date  && date <= max )
    //       ) {
    //         return true;
    //       }else{
    //         return false;
    //       }
    //   }
    // )
  }

  downloadxlsx(): void {
    window.open(this.baseUrl + 'v1/efos-de/download_data_entry_xlsx');
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

  filterStart(tglMulai: any, tglAkhir: any): void {
    const splitTglMulai = tglMulai.split('-');
    const splitTglAkhir = tglAkhir.split('-');

    // $('#dataTables-example').DataTable().columns(7).search(tglMulai).draw();
    //  // Create date inputs
    const minDate = new Date(tglMulai);
    const maxDate = new Date(tglAkhir);

    // // DataTables initialisation
    // var table = $('#example').DataTable();

    // // Refilter the table
    // $('#min, #max').on('change', function () {
    //     table.draw();
    // });

    // Custom filtering function which will search data in column four between two values
    $.fn.dataTable.ext.search.push(function (settings: any, data: any, dataIndex: any) {
      const min = tglMulai;
      const max = tglAkhir;
      const date = new Date(data[7]);
      console.warn('isiTable', date);
      console.warn('min', min);
      console.warn('1<=12', Number(1) <= Number(12));
      // console.warn('sett',settings)
      // console.warn('data',data)
      // console.warn('dataIndex',dataIndex)
      console.warn(minDate <= date && date <= maxDate);
      // console.warn(date <= max)
      if (
        // ( min === null && max === null ) ||
        // ( min === null && date <= max ) ||
        // ( min <= date   && max === null ) ||
        min <= date &&
        date <= max
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
}
