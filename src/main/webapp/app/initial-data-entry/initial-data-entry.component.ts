import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { InitialDataEntryService } from './services/initial-data-entry.service';
import { daftaraplikasimodelide } from './services/config/daftar-aplikasi-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'jhi-initial-data-entry',
  templateUrl: './initial-data-entry.component.html',
  styleUrls: ['./initial-data-entry.component.scss'],
})
export class InitialDataEntryComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  datakiriman: string | undefined;
  initialDataEntry?: daftaraplikasimodelide[];
  kategori: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected initialDatEntryService: InitialDataEntryService,
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
    this.getLoading(true);
    this.initialDatEntryService.getDaftarAplikasiInitialDataEntry().subscribe(data => {
      if (data.code === 200) {
        this.initialDataEntry = (data as any).result;
        this.dtTrigger.next(data.result);
        this.getLoading(false);
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
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
    // alert("bbb")
  }

  goto(): void {
    this.router.navigate(['/daftaraplikasiidetambahide']);
  }

  viewdataide(costomerid: any, kategori: any): void {
    if (kategori === 'Fix Income') {
      this.router.navigate(['/initial-data-entryfix'], {
        queryParams: {
          kategori: '1',
          id: costomerid,
        },
      });
      // this.router.navigate(['/editidefix'], {
      //   queryParams: {
      //     datakirimanidcustomer: costomerid,
      //   },
      // });
    } else {
      this.router.navigate(['/initial-data-entryfix'], {
        queryParams: {
          kategori: '2',
          id: costomerid,
        },
      });
    }
  }
  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
