import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { Observable, Subject } from 'rxjs';
declare let $: any;
import { daWuS } from './daftar-aplikasi-waiting-update-status/daWuS.model';
import { ServiceVerificationService } from './service/service-verification.service';

@Component({
  selector: 'jhi-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit, OnDestroy {
  dataEntry?: fetchAllDe = new fetchAllDe();
  daftarAplikasiVerif?: daWuS[];
  curef: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected DaftarAplikasiVerifServices: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
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
  // DE
  // getFetchSemuaData(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  // }

  load(): void {
    this.DaftarAplikasiVerifServices.getDaWuS().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daftarAplikasiVerif = data.result;
        this.dtTrigger.next(data.result);
      }
      console.log(this.daftarAplikasiVerif);
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

  viewVerification(app_no_de: any): void {
    this.dataEntryService.getFetchSemuaDataDE(app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      this.curef = this.dataEntry?.curef;
      this.router.navigate(['/analisa-keuangan'], { queryParams: { app_no_de: app_no_de, curef: this.curef } });
    });
  }
}
