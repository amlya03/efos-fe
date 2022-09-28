import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataEntryService } from '../data-entry/services/data-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dataentrymodel } from '../data-entry/data-entry-model';
import { ActivatedRoute, Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'jhi-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
})
export class UploadDocumentComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  app_no_de!: string;
  tampungandataygdibawa: any;
  dataEntry?: dataentrymodel[];
  valueCariButton = '';
  kategori_pekerjaan = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
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
    this.datEntryService.getDaftarAplikasiDataEntry().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.dataEntry = (data as any).result;
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
    $('#dataTables-example').DataTable().columns(3).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(8).search(listKategori).draw();
    $('#dataTables-example').DataTable().columns(5).search(listFasilitas).draw();
    // this.a = inputNoAplikasi
    // this.b = inputNamaNasabah
    // this.c = listKategori
    // alert("1 "+ this.a)
    // alert("2 "+ this.b)
    // alert("3 "+ this.c)
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().columns().search('').draw();
    // alert("bbb")
  }

  viewUpload(curef: any): void {
    // alert(getAppNoDe);
    this.router.navigate(['/upload_document/upload_document_de'], { queryParams: { datakiriman: curef } });
  }
}
