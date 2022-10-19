import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { daOp } from './daOp.model';
declare let $: any;
@Component({
  selector: 'jhi-daftar-aplikasi-on-process',
  templateUrl: './daftar-aplikasi-on-process.component.html',
  styleUrls: ['./daftar-aplikasi-on-process.component.scss'],
})
export class DaftarAplikasiOnProcessComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  daOp?: daOp[];
  valueFasilitas = '';
  valueKategori = '';
  valueNamaNasabah = '';
  valueNoAplikasi = '';
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: Array<number> = [];
  dataEntry?: fetchAllDe = new fetchAllDe();
  curef: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected daOpService: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected dataEntryService: DataEntryService
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
    this.daOpService.getDaOp().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daOp = data.result;
        this.dtTrigger.next(data.result);
      }
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

  // ReadOnly
  readOnlyButton(app_no_de: any){
    this.dataEntryService.getFetchSemuaDataDE(app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      this.curef = this.dataEntry?.curef;
      this.router.navigate(['/analisa-keuangan'], { queryParams: { app_no_de: app_no_de, curef: this.curef } });
    });
  }
}
