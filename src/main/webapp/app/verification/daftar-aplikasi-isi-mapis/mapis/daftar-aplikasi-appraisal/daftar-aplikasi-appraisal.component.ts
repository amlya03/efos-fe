import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { daWaModel } from 'app/verification/daftar-aplikasi-waiting-assigment/daWa.model';
import { daWaModelAprisal } from 'app/verification/daftar-aplikasi-waiting-assigment/daWaAprisal.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-daftar-aplikasi-appraisal',
  templateUrl: './daftar-aplikasi-appraisal.component.html',
})
export class DaftarAplikasiAppraisalComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  title = 'EFOS';
  numbers: any;
  daWa?: daWaModel[] = [];
  getCheckDaWa: daWaModel[] = new Array<daWaModel>();
  listFasilitas: getListFasilitasModel[] = [];
  daWaAprisal?: daWaModelAprisal[];
  onResponseSuccess: any;
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: any;
  kirimStatusAplikasi: any;
  kirimAssign: any;
  fullNameSession: any;

  // checklist dawa
  checklistDaWa: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected daWaService: ServiceVerificationService,
    protected dataEntryServices: DataEntryService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    if (this.sessionStorageService.retrieve('sessionRole') === 'APPRAISAL') {
      this.fullNameSession = this.sessionStorageService.retrieve('sessionFullName');
    } else {
      this.fullNameSession = '';
    }

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
    this.daWaService.getListAppraisalProcess(this.fullNameSession).subscribe({
      next: data => {
        this.daWa = data.result;
        this.getCheckDaWa = data.result;
        this.dtTrigger.next(this.daWa);
        this.getLoading(false);
      },
      error: () => {
        this.getLoading(false);
      },
    });
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    // ///////////////////////// LIst Cari Fasilitas //////////////////////
    this.dataEntryServices.getFetchKodeFasilitas().subscribe(data => {
      this.listFasilitas = data.result;
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
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

  viewdataentry(getAppNoDe: any): void {
    this.router.navigate(['/mapis'], { queryParams: { app_no_de: getAppNoDe } });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
