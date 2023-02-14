import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-mutasi-rekening',
  templateUrl: './mutasi-rekening.component.html',
  styleUrls: ['./mutasi-rekening.component.scss'],
})
export class MutasiRekeningComponent implements OnInit, OnDestroy {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  mutasiRekening: mutasiRekening[] = [];
  resultMutasi: any;
  mutasiForm!: FormGroup;
  app_no_de: any;
  dataEntry: fetchAllDe = new fetchAllDe();
  // show form by table id
  lihatTableMutasi = 0;
  tambahTableMutasi = 1;
  idTableMutasi: any;
  getTableMutasi: listMutasi = new listMutasi();
  lihatMutasi = 0;

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

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };

    this.mutasiForm = this.formBuilder.group({
      nama_bank: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
      no_rekening: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
      tahun: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
      bulan: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
      debet: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
      kredit: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
      saldo: { disabled: this.untukSessionRole === 'VER_PRE_SPV', value: '' },
    });

    this.load();
  }

  load(): void {
    // ambil semua data
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
    });

    // list Table
    this.mutasiRekeningService.fetchListMutasiRekening(this.app_no_de).subscribe(data => {
      this.resultMutasi = data.result;
      if (data.code === 200) {
        this.mutasiRekening = data.result;
        this.dtTrigger.next(data.result);
        this.getLoading(false);
      } else {
        this.getLoading(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  submitForm(): void {
    // alert(this.lihatTableMutasi)
    // eslint-disable-next-line eqeqeq
    if (this.tambahTableMutasi == 0) {
      this.http
        .post<mutasiRekening>(this.baseUrl + 'v1/efos-verif/create_verif_mutasi', {
          id: 0,
          app_no_de: this.app_no_de,
          bulan: this.mutasiForm.get('bulan')?.value,
          created_by: this.sessionStorageService.retrieve('sessionUserName'),
          created_date: '',
          debet: this.mutasiForm.get('debet')?.value,
          kredit: this.mutasiForm.get('kredit')?.value,
          nama_bank: this.mutasiForm.get('nama_bank')?.value,
          no_rekening: this.mutasiForm.get('no_rekening')?.value,
          saldo: this.mutasiForm.get('saldo')?.value,
          tahun: this.mutasiForm.get('tahun')?.value,
        })
        .subscribe({
          next() {
            window.location.reload();
          },
          error: error => console.warn(error),
        });
    } else {
      this.http
        .post<mutasiRekening>(this.baseUrl + 'v1/efos-verif/update_verif_mutasi', {
          id: this.idTableMutasi,
          app_no_de: this.app_no_de,
          bulan: this.mutasiForm.get('bulan')?.value,
          debet: this.mutasiForm.get('debet')?.value,
          kredit: this.mutasiForm.get('kredit')?.value,
          nama_bank: this.mutasiForm.get('nama_bank')?.value,
          no_rekening: this.mutasiForm.get('no_rekening')?.value,
          saldo: this.mutasiForm.get('saldo')?.value,
          tahun: this.mutasiForm.get('tahun')?.value,
          updated_by: this.sessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
        })
        .subscribe({
          next() {
            window.location.reload();
          },
          error: error => console.warn(error),
        });
    }
  }

  // edit mutasi
  editMutasi(id: any): void {
    this.idTableMutasi = id;
    this.lihatMutasi = 1;
    // data
    this.mutasiRekeningService
      .getMutasiRekening(id) // by id dari table atas
      .subscribe(data => {
        this.getTableMutasi = data.result;
        const retriveMutasi = {
          nama_bank: this.getTableMutasi.nama_bank,
          no_rekening: this.getTableMutasi.no_rekening,
          tahun: this.getTableMutasi.tahun,
          bulan: this.getTableMutasi.bulan,
          debet: this.getTableMutasi.debet,
          kredit: this.getTableMutasi.kredit,
          saldo: this.getTableMutasi.saldo,
        };
        this.mutasiForm.setValue(retriveMutasi);
      });
  }

  // delete Mutasi
  deleteMutasi(idMutasi: any): void {
    Swal.fire({
      title: 'Hapus Data Mutasi Rekening?',
      text: 'Data akan dihapus dari table Mutasi Rekening!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Simpan Data ini',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Berhasil dihapus!', 'Data Sudah Tidak Ada pada Table Mutasi', 'success').then(() => {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-verif/delete_verif_mutasi_rekening', {
              id: idMutasi,
            })
            .subscribe({
              next() {
                // console.warn(response);
                window.location.reload();
              },
              error: error => console.warn(error),
            });
        });
      }
    });
  }
  goto(): void {
    this.router.navigate(['/analisa-keuangan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
  next(): void {
    this.router.navigate(['/analisa-keuangan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // charCode.toLocaleString('id-ID',{style: 'currency', currency:'IDR'})
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }
}
