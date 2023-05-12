import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  untukSessionRole: any;
  untukSessionKodeCabang: any;
  untukSessionFullName: any;
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
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionKodeCabang = this.sessionStorageService.retrieve('sessionKdCabang');
    this.untukSessionFullName = this.sessionStorageService.retrieve('sessionFullName');

    // alert(this.untukSessionRole);
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
    // $('#dataTables-example').DataTable().columns(4).search(inputNoAplikasi).draw();
    // $('#dataTables-example').DataTable().columns(3).search(inputNamaNasabah).draw();
    // $('#dataTables-example').DataTable().columns(2).search(listKategori).draw();
    // this.ngOnDestroy();
    $('#dataTables-example').DataTable().destroy();
    // date range
    // console.warn(tglMulai)
    if (this.untukSessionRole === 'ADMIN_PIPELINE') {
      const splitTglMulai = tglMulai.split('-');
      const splitTglEnd = tglAkhir.split('-');
      // const splitTglAkhir = tglAkhir.split('-');

      if (tglMulai == '' && tglAkhir == '') {
        const tanggalend = '';
        const tanggalstart = '';

        this.inquiryservice.getFetchfilterall(tanggalend, inputNoAplikasi, listKategori, inputNamaNasabah, tanggalstart).subscribe(data => {
          this.dataEntry = data.result;
          this.dtTrigger.next(data.result);
          this.getLoading(false);
        });
      } else {
        const tanggalend = splitTglEnd[0] + '/' + splitTglEnd[1] + '/' + splitTglEnd[2];
        const tanggalstart = splitTglMulai[0] + '/' + splitTglMulai[1] + '/' + splitTglMulai[2];
        this.inquiryservice.getFetchfilterall(tanggalend, inputNoAplikasi, listKategori, inputNamaNasabah, tanggalstart).subscribe(data => {
          this.dataEntry = data.result;
          this.dtTrigger.next(data.result);
          this.getLoading(false);
        });
      }

      // console.warn(splitTglMulai[2])
      // console.warn(tanggalstart)

      // this.inquiryservice.getFetchfilterall(tanggalend, this.untukSessionKodeCabang,inputNoAplikasi,listKategori,inputNamaNasabah,tanggalstart, this.untukSessionFullName).subscribe(data => {
      // console.warn(data);
      //   this.inquiryservice.getFetchfilterall(tanggalend,inputNoAplikasi,listKategori,inputNamaNasabah,tanggalstart).subscribe(data => {
      //   this.dataEntry = data.result;
      //   this.dtTrigger.next(data.result);
      //   this.getLoading(false);
      // });
      alert('pipeline');
    } else {
      const splitTglMulai = tglMulai.split('-');
      const splitTglEnd = tglAkhir.split('-');
      // const splitTglAkhir = tglAkhir.split('-');
      const tanggalend = splitTglEnd[0] + '/' + splitTglEnd[1] + '/' + splitTglEnd[2];
      const tanggalstart = splitTglMulai[0] + '/' + splitTglMulai[1] + '/' + splitTglMulai[2];
      // console.warn(splitTglMulai[2])
      console.warn(tanggalstart);
      this.inquiryservice
        .getFetchfilter(
          tanggalend,
          this.untukSessionKodeCabang,
          inputNoAplikasi,
          listKategori,
          inputNamaNasabah,
          tanggalstart,
          this.untukSessionFullName
        )
        .subscribe(data => {
          // this.inquiryservice.getFetchfilter(tanggalend,inputNoAplikasi,listKategori,inputNamaNasabah,tanggalstart).subscribe(data => {
          // console.warn(data);
          this.dataEntry = data.result;
          this.dtTrigger.next(data.result);
          this.getLoading(false);

          alert('cabang');
        });
    }

    // $('#dataTables-example').DataTable().columns(7).search(splitTglMulai[0]).draw();
    // $('#dataTables-example').DataTable().columns(8).search(splitTglMulai[1]).draw();
    // $('#dataTables-example').DataTable().columns(9).search(splitTglMulai[2]).draw();

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

  downloadxlsx(listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string, tglMulai: any, tglAkhir: any): void {
    if (listKategori == '' && inputNamaNasabah == '' && inputNoAplikasi == '' && tglMulai == '' && tglAkhir == '') {
      window.open(this.baseUrl + 'v1/efos-de/download_data_entry_xlsx');
      alert('download all filter ');
    } else {
      const splitTglMulai = tglMulai.split('-');
      const splitTglEnd = tglAkhir.split('-');
      // const splitTglAkhir = tglAkhir.split('-');
      if (tglMulai == '' && tglAkhir == '') {
        const tanggalend = tglAkhir;
        const tanggalstart = tglMulai;
        this.inquiryservice
          .getFetchdownloadfilter(tanggalend, inputNoAplikasi, listKategori, inputNamaNasabah, tanggalstart)
          .subscribe(data => {
            this.dataEntry = data.result;
            this.dtTrigger.next(data.result);
            this.getLoading(false);
          });
        window.open(
          this.baseUrl +
            'v1/efos-de/download_data_entry_xlsx_filter?end_date=' +
            tanggalend +
            '&sd=' +
            inputNoAplikasi +
            '&sf=' +
            listKategori +
            '&sn=' +
            inputNamaNasabah +
            '&start_date=' +
            tanggalstart
        );
      } else {
        const tanggalend = splitTglEnd[0] + '/' + splitTglEnd[1] + '/' + splitTglEnd[2];
        const tanggalstart = splitTglMulai[0] + '/' + splitTglMulai[1] + '/' + splitTglMulai[2];
        this.inquiryservice
          .getFetchdownloadfilter(tanggalend, inputNoAplikasi, listKategori, inputNamaNasabah, tanggalstart)
          .subscribe(data => {
            this.dataEntry = data.result;
            this.dtTrigger.next(data.result);
            this.getLoading(false);
          });
      }

      // console.warn(splitTglMulai[2])
      // console.warn(tanggalstart)

      // this.inquiryservice.getFetchfilterall(tanggalend, this.untukSessionKodeCabang,inputNoAplikasi,listKategori,inputNamaNasabah,tanggalstart, this.untukSessionFullName).subscribe(data => {
      // console.warn(data);
      //   this.inquiryservice.getFetchdownloadfilter(tanggalend,inputNoAplikasi,listKategori,inputNamaNasabah,tanggalstart).subscribe(data => {
      //   this.dataEntry = data.result;
      //   this.dtTrigger.next(data.result);
      //   this.getLoading(false);
      // });
      alert('download filter ');
    }

    // window.open(this.baseUrl + 'v1/efos-de/download_data_entry_xlsx');
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
