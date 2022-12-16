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
import Swal from 'sweetalert2';

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
  lihatTableMutasi = 0;
  tambahTableMutasi = 1;
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

    this.mutasiForm = this.formBuilder.group({
      nama_bank: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
      no_rekening: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
      tahun: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
      bulan: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
      debet: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
      kredit: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
      saldo: { disabled: this.untukSessionRole == 'VER_PRE_SPV', value: '' },
    });
  }

  load(): void {
    // ambil semua data
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
    });

    // list Table
    this.mutasiRekeningService.fetchListMutasiRekening(this.app_no_de).subscribe(data => {
      //console.warn(data);
      if (data.code === 200) {
        this.mutasiRekening = data.result;
        this.dtTrigger.next(data.result);
      }
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  submitForm(): void {
    // alert(this.lihatTableMutasi)
    if (this.tambahTableMutasi == 0) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_verif_mutasi', {
          id: this.idTableMutasi,
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
          next: response => {
            // console.warn(response)
          },
          error: error => console.warn(error),
        });
      this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_verif_mutasi', {
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
          next: response => {
            // console.warn(response)
          },
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
        let retriveMutasi = {
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
  deleteMutasi(id: any) {
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
        Swal.fire('Berhasil dihapus!', 'Data Sudah Tidak Ada pada Table Mutasi', 'success').then(result => {
          this.http
            .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/delete_verif_mutasi_rekening', {
              id: id,
            })
            .subscribe({
              next: response => {
                //console.warn(response);
                window.location.reload();
              },
              error: error => console.warn(error),
            });
        });
      }
    });
  }
  goto(): void {
    this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
