import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { daWaModel } from '../daftar-aplikasi-waiting-assigment/daWa.model';
import { daWaModelAprisal } from '../daftar-aplikasi-waiting-assigment/daWaAprisal.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';

@Component({
  selector: 'jhi-daftar-aplikasi-isi-mapis',
  templateUrl: './daftar-aplikasi-isi-mapis.component.html',
  styleUrls: ['./daftar-aplikasi-isi-mapis.component.scss'],
})
export class DaftarAplikasiIsiMapisComponent implements OnInit, OnDestroy {
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
    protected http: HttpClient
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
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    this.daWaService.getListAppAppraisal().subscribe(data => {
      //console.warn(data);
      if (data.code === 200) {
        this.daWa = data.result;
        this.getCheckDaWa = data.result;
        this.dtTrigger.next(this.daWa);
      }
    });
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    // ///////////////////////// LIst Cari Fasilitas //////////////////////
    this.dataEntryServices.getFetchKodeFasilitas().subscribe(data => {
      this.listFasilitas = data.result;
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
    $('#dataTables-example').DataTable().columns().search('').draw();
  }

  viewdataentry(getAppNoDe: any): void {
    this.router.navigate(['/mapis'], { queryParams: { app_no_de: getAppNoDe } });
  }
}
