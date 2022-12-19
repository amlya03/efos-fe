import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dataentrymodel } from '../data-entry/data-entry-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesUploadDocumentService } from './services/services-upload-document.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
})
export class UploadDocumentComponent implements OnInit, OnDestroy {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  title = 'EFOS';
  app_no_de!: string;
  tampungandataygdibawa: string | undefined;
  dataEntry?: dataentrymodel[];
  valueCariButton = '';
  kategori_pekerjaan = '';
  curef: string | undefined;
  appNoDe: string | undefined;
  fasilitas: string | undefined;
  kategoriPekerjaan: string | undefined;
  namaNasabah: string | undefined;
  userName: string | undefined;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  static curef: string | null | undefined;
  static this: string | number | null | undefined;

  constructor(
    protected uploadSerices: ServicesUploadDocumentService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal,
    protected sessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
  }

  ngOnInit(): void {
    this.userName = this.sessionStorageService.retrieve('sessionUserName');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  load(): void {
    this.uploadSerices.getDaftarAplikasiUpload(this.userName).subscribe({
      next: data => {
        this.dataEntry = data.result;
        this.dtTrigger.next(this.dataEntry);
        this.getLoading(false);
      },
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  cariButton(listFasilitas: string, listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(3).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(8).search(listKategori).draw();
    $('#dataTables-example').DataTable().columns(5).search(listFasilitas).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().columns().search('').draw();
    // alert("bbb")
  }

  viewUpload(curef: any, app_no_de: any, fasilitas: any, kategori: any, nama: any): void {
    this.curef = curef;
    this.namaNasabah = nama;
    this.appNoDe = app_no_de;
    this.fasilitas = fasilitas;
    this.kategoriPekerjaan = kategori;
    // alert(this.appNoDe);
    this.router.navigate(['/upload_document/upload_document_de'], { queryParams: { curef: this.curef, app_no_de: this.appNoDe } });
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
