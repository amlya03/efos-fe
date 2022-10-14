import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { MemoModel } from '../service/config/memo.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'jhi-memo-verification',
  templateUrl: './memo-verification.component.html',
  styleUrls: ['./memo-verification.component.scss'],
})
export class MemoVerificationComponent implements OnInit {
  dataEntry: fetchAllDe = new fetchAllDe();
  listMemo?: MemoModel[];
  app_no_de: any;

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
    private localStorageService: LocalStorageService
  ) {
    // ///////////////////////////// Session /////////////////////////////////////////////
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.localStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.localStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.localStorageService.retrieve('sessionKdCabang');
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

  load(): void {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // alert('DE '+ this.dataEntry?.status_perkawinan)
    });

    // List Table Memo
    this.dataEntryService.getfetchMemo(this.app_no_de).subscribe(data => {
      this.listMemo = data.result
      console.log(this.listMemo)
      console.log(data.result.keterangan)
      this.dtTrigger.next(this.listMemo);
      if (data.code === 200) {
        // this.memo = data.result;
        console.log('MEMo ' + data.result.keterangan);
      }
    });
  }

  printData() {
    const printTable = <HTMLInputElement>document.getElementById('tableMemo');
    document.write(printTable.outerHTML);
    window.print();
    window.close();
  }

  // Simpan
  simpanMemo(keterangan:any){
    this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-de/create_memo', {
      id: 0,
      keterangan: keterangan,
      users: this.untukSessionUserName,
      role: this.untukSessionRole,
      app_no_de: this.app_no_de,
      created_date: '',
      created_by: this.untukSessionUserName
    })
    .subscribe({
      next: response => console.warn(response),
      error: error => console.warn(error),
    });
    window.location.reload();
  }

  // detail memo
  detailMemo() {
    // Swal.fire({
    //     title: 'Do you want to save the changes?',
    //     text: "Modal with a custom image.",
    //     showDenyButton: true,  showCancelButton: true,
    //     confirmButtonText: `Save`,
    //     denyButtonText: `Don't save`,
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //       if (result.isConfirmed) {
    //         Swal.fire('Saved!', '', 'success')
    //       } else if (result.isDenied) {
    //         Swal.fire('Changes are not saved', '', 'info')
    //      }
    //   });

      Swal.fire({
        title: "Memo",
        // text: " - lkdzflkxcbxbxcvbcvbcvsd",
        html: "Testno  sporocilo za objekt: <p>test</p>",
        imageUrl: "../../../content/images/bank-mega-syariah.png",
        imageWidth: 100,
        imageHeight: 70,
        imageAlt: "Eagle Image",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#00ff55",
        cancelButtonColor: "#999999",
        reverseButtons: true,
      });
  };
}
