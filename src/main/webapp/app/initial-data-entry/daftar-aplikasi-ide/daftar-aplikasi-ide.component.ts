import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { InitialDataEntryService } from '../services/initial-data-entry.service';
import { daftaraplikasimodelide } from './daftar-aplikasi-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
declare let $: any;

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-daftar-aplikasi-ide',
  templateUrl: './daftar-aplikasi-ide.component.html',
  styleUrls: ['./daftar-aplikasi-ide.component.scss'],
})
export class DaftarAplikasiIdeComponent implements OnInit, OnDestroy {
  datakiriman: string | undefined;
  initialDataEntry?: daftaraplikasimodelide[];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected initialDatEntryService: InitialDataEntryService,
    // private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal
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
    this.initialDatEntryService.getDaftarAplikasiInitialDataEntry().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.initialDataEntry = (data as any).result;
        this.dtTrigger.next(data.result);
      }
    });
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
    $('#dataTables-example').DataTable().columns().search('').draw();
    // alert("bbb")
  }

  goto(): void {
    this.router.navigate(['/daftaraplikasiidetambahide'], {
      queryParams: {},
    });
  }

  viewdataide(costomerid: any, kategori: any): void {
    if (kategori === 'Fix Income') {
      this.router.navigate(['/editidefix'], {
        queryParams: {
          datakirimanidcustomer: costomerid,
        },
      });
    } else {
      this.router.navigate(['/editidenon'], {
        queryParams: { datakirimanidcustomer: costomerid },
      });
    }
    // alert(kategori)
  }
}
