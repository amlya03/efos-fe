/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { daWaModel } from '../daftar-aplikasi-waiting-assigment/daWa.model';
import { daWaModelAprisal } from '../daftar-aplikasi-waiting-assigment/daWaAprisal.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-daftar-aplikasi-isi-mapis',
  templateUrl: './daftar-aplikasi-isi-mapis.component.html',
  styleUrls: ['./daftar-aplikasi-isi-mapis.component.scss'],
})
export class DaftarAplikasiIsiMapisComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  title = 'EFOS';
  numbers: any;
  daWa?: daWaModel[] = [];
  getCheckDaWa: daWaModel[] = new Array<daWaModel>();
  listFasilitas: getListFasilitasModel[] = [];
  appraisalUser?: daWaModelAprisal[];
  onResponseSuccess: any;
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: daWaModel[] = [];
  kirimStatusAplikasi: daWaModel[] = [];
  kirimAssign: any;

  // checklist dawa
  checkLenghtResult: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected verificationServices: ServiceVerificationService,
    protected dataEntryServices: DataEntryService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

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
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    this.verificationServices.getListHeadAppraisal().subscribe(data => {
      // console.warn(data);
      if (data.code === 200) {
        this.daWa = data.result;
        this.getCheckDaWa = data.result;
        this.dtTrigger.next(this.daWa);
        this.getLoading(false);
      }
    });
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    // ///////////////////////// LIst Cari Fasilitas //////////////////////
    // this.dataEntryServices.getFetchKodeFasilitas().subscribe(data => {
    //   this.listFasilitas = data.result;
    // });

    // List Appraisal
    this.verificationServices.getDaWaAprisal().subscribe(user => {
      this.appraisalUser = user.result;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  cariButton(listFasilitas: string, listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(2).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(3).search(listFasilitas).draw();
    $('#dataTables-example').DataTable().columns(5).search(listKategori).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  // ceklis semua
  isChecked = false;
  checkuncheckall(): void {
    if (this.isChecked === true) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  // Get Chek data
  getProoduct(isSelected: any, appNoDe: any): void {
    const checked = isSelected.target.checked;
    if (checked) {
      this.kirimDe.push(appNoDe);
      // this.kirimStatusAplikasi.push(statusAplikasi);
    } else {
      const uncheckDE = this.kirimDe.findIndex((list: any) => list === appNoDe);
      this.kirimDe.splice(uncheckDE, 1);

      // const uncheckStatusApp = this.kirimStatusAplikasi.findIndex((list: any) => list === statusAplikasi);
      // this.kirimStatusAplikasi.splice(uncheckStatusApp, 1);
    }
  }

  viewData(getAppNoDe: any): void {
    this.router.navigate(['/mapis'], { queryParams: { app_no_de: getAppNoDe } });
  }

  // post assign
  postAssign(): void {
    // setTimeout(() => {
    if (this.kirimDe.length !== 0 && this.kirimAssign != null) {
      if (this.isChecked === false) {
        this.kirimDe;
        for (let i = 0; i < this.kirimDe.length; i++) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-verif/appraisal_assignment', {
              analis_verifikasi: this.kirimAssign,
              app_no_de: this.kirimDe[i],
              status_aplikasi: '3.0',
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
            })
            .subscribe({});
          if (this.kirimDe[this.kirimDe.length - 1] === this.kirimDe[i]) {
            alert('Data di Assign kepada ' + this.kirimAssign);
            window.location.reload();
          }
        }
      } else {
        for (let i = 0; i < this.checkLenghtResult.length; i++) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-verif/appraisal_assignment', {
              analis_verifikasi: this.kirimAssign,
              app_no_de: this.checkLenghtResult[i].app_no_de,
              status_aplikasi: this.checkLenghtResult[i].status_aplikasi,
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
            })
            .subscribe({});

          if (this.checkLenghtResult[this.checkLenghtResult.length - 1] === this.checkLenghtResult[i]) {
            alert('Data di Assign kepada ' + this.kirimAssign);
            window.location.reload();
          }
        }
      }
    } else {
      alert('Harap Pilih Data Terlebih Dahulu');
    }
    // }, 1000);

    this.dtElement.dtInstance.then((dtIntance: DataTables.Api) => {
      dtIntance.destroy();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        responsive: true,
      };
      this.dtTrigger.next(this.daWa);
    });
  }
}
