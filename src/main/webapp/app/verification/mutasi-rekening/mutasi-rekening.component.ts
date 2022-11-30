import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { mutasiRekening } from './mutasiRekening.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { listMutasi } from './listMutasi.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-mutasi-rekening',
  templateUrl: './mutasi-rekening.component.html',
  styleUrls: ['./mutasi-rekening.component.scss'],
})
export class MutasiRekeningComponent implements OnInit, OnDestroy {
  mutasiRekening?: mutasiRekening[];
  mutasiForm!: FormGroup;
  app_no_de: any;
  dataEntry: fetchAllDe = new fetchAllDe();
  // show form by table id
  lihatTableMutasi: any;
  tambahTableMutasi: any;
  idTableMutasi: any;
  getTableMutasi: listMutasi = new listMutasi();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  curef: any;

  // Role
  untukSessionRole: any;

  constructor(
    protected mutasiRekeningService: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    private http: HttpClient,
    protected dataEntryService: DataEntryService,
    private sessionStorageService: SessionStorageService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // alert(this.app_no_de)
  }

  ngOnInit(): void {
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  load(): void {
    // ambil semua data
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
    });

    // list Table
    this.mutasiRekeningService.fetchListMutasiRekening(this.app_no_de).subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.mutasiRekening = data.result;
        this.dtTrigger.next(data.result);
      }
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  submitForm(nama_bank1: any, no_rekening1: any, tahun1: any, bulan1: any, debet1: any, kredit1: any, saldo1: any): void {
    // alert(this.lihatTableMutasi)
    if (this.tambahTableMutasi === '') {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_verif_mutasi', {
          id: this.idTableMutasi,
          app_no_de: this.app_no_de,
          bulan: bulan1,
          created_by: this.sessionStorageService.retrieve('sessionUserName'),
          created_date: '',
          debet: debet1,
          kredit: kredit1,
          nama_bank: nama_bank1,
          no_rekening: no_rekening1,
          saldo: saldo1,
          tahun: tahun1,
        })
        .subscribe({
          next: response => console.warn(response),
          error: error => console.warn(error),
        });
      this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_verif_mutasi', {
          id: this.idTableMutasi,
          app_no_de: this.app_no_de,
          bulan: bulan1,
          debet: debet1,
          kredit: kredit1,
          nama_bank: nama_bank1,
          no_rekening: no_rekening1,
          saldo: saldo1,
          tahun: tahun1,
          updated_by: this.sessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
        })
        .subscribe({
          next: response => console.warn(response),
          error: error => console.warn(error),
        });
      this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
    }
  }

  // edit mutasi
  editMutasi(id: any): void {
    this.idTableMutasi = id;
    // data
    this.mutasiRekeningService
      .getMutasiRekening(id) // by id dari table atas
      .subscribe(data => {
        this.getTableMutasi = data.result;
      });
  }

  goto(): void {
    this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
