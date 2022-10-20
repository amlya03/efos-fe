import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { mutasiRekening } from './mutasiRekening.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { listMutasi } from './listMutasi.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { LocalStorageService } from 'ngx-webstorage';

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
    private localStorageService: LocalStorageService
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
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };

    this.mutasiForm = this.formBuilder.group({
      app_no_de: '',
      // DE
      nama: '',
      program_pembiayaan: '',
      produk_pembiayaan: '',
      jangka_waktu: '',
      nilai_pembiayaan: '',
      kode_fasilitas: '',

      // Mutasi
      // id: '',
      // bulan: '',
      // created_by: '',
      // created_date: '',
      // debet: '',
      // kredit: '',
      // nama_bank: '',
      // no_rekening: '',
      // saldo: '',
      // tahun: '',
      // updated_by: '',
      // updated_date: '',
    });
    this.load();
  }

  load(): void {
    // ambil semua data
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;

      let retriveMutasi = {
        app_no_de: this.app_no_de,
        //DE
        nama: this.dataEntry.nama,
        program_pembiayaan: this.dataEntry.program_pembiayaan,
        produk_pembiayaan: this.dataEntry.produk_pembiayaan,
        jangka_waktu: this.dataEntry.jangka_waktu,
        nilai_pembiayaan: this.dataEntry.nilai_pembiayaan,
        kode_fasilitas: this.dataEntry.kode_fasilitas,

        // // mutasi
        // id: this.getTableMutasi.id,
        // nama_bank: this.getTableMutasi.nama_bank,
        // no_rekening: this.getTableMutasi.nama_bank,
        // tahun: this.getTableMutasi.tahun,
        // bulan: this.getTableMutasi.bulan,
        // debet: this.getTableMutasi.debet,
        // kredit: this.getTableMutasi.kredit,
        // saldo: this.getTableMutasi.saldo,
        // created_date: this.getTableMutasi.created_date,
        // created_by: this.getTableMutasi.created_by,
        // updated_date: this.getTableMutasi.updated_date,
        // updated_by: this.getTableMutasi.updated_by,
      };
      this.mutasiForm.setValue(retriveMutasi);
    });

    // list Table
    this.mutasiRekeningService.fetchListMutasiRekening(this.app_no_de).subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.mutasiRekening = data.result;
        this.dtTrigger.next(data.result);
      }
    });

    // data
    // this.fetchMutasi().subscribe(data => {
    //   this.getAllMutasi = data.result;
    //   console.log(data)
    //   console.log('mutasi ', this.getAllMutasi)

    //   let retriveMutasi = {
    //     //DE
    //     nama: this.dataEntry.nama,
    //     program_pembiayaan: this.dataEntry.program_pembiayaan,
    //     produk_pembiayaan: this.dataEntry.produk_pembiayaan,
    //     jangka_waktu: this.dataEntry.jangka_waktu,
    //     nilai_pembiayaan: this.dataEntry.nilai_pembiayaan,
    //     kode_fasilitas: this.dataEntry.kode_fasilitas,

    //     // // mutasi
    //     // id: this.getAllMutasi.id,
    //     // app_no_de: this.getAllMutasi.app_no_de,
    //     // nama_bank: this.getAllMutasi.nama_bank,
    //     // no_rekening: this.getAllMutasi.no_rekening,
    //     // tahun: this.getAllMutasi.tahun,
    //     // bulan: this.getAllMutasi.bulan,
    //     // debet: this.getAllMutasi.debet,
    //     // kredit: this.getAllMutasi.kredit,
    //     // saldo: this.getAllMutasi.saldo,
    //     // created_date: this.getAllMutasi.created_date,
    //     // created_by: this.getAllMutasi.created_by,
    //     // updated_date: this.getAllMutasi.updated_date,
    //     // updated_by: this.getAllMutasi.updated_by,
    //   };
    //   this.mutasiForm.setValue(retriveMutasi);
    // });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  submitForm(nama_bank: any, no_rekening: any, tahun: any, bulan: any, debet: any, kredit: any, saldo: any): void {
    // alert(this.lihatTableMutasi)
    if (this.tambahTableMutasi == '') {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_verif_mutasi', {
          id: this.idTableMutasi,
          app_no_de: this.app_no_de,
          bulan: bulan,
          // created_by: this.mutasiForm.get('created_by')?.value,
          // created_date: this.mutasiForm.get('created_date')?.value,
          debet: debet,
          kredit: kredit,
          nama_bank: nama_bank,
          no_rekening: no_rekening,
          saldo: saldo,
          tahun: tahun,
          // updated_by: this.mutasiForm.get('updated_by')?.value,
          // updated_date: this.mutasiForm.get('updated_date')?.value,
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
          bulan: bulan,
          // created_by: this.mutasiForm.get('created_by')?.value,
          // created_date: this.mutasiForm.get('created_date')?.value,
          debet: debet,
          kredit: kredit,
          nama_bank: nama_bank,
          no_rekening: no_rekening,
          saldo: saldo,
          tahun: tahun,
          // updated_by: this.mutasiForm.get('updated_by')?.value,
          // updated_date: this.mutasiForm.get('updated_date')?.value,
        })
        .subscribe({
          next: response => console.warn(response),
          error: error => console.warn(error),
        });
      this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
    }
  }

  // edit mutasi
  editMutasi(id: any) {
    this.idTableMutasi = id;
    // data
    this.mutasiRekeningService
      .getMutasiRekening(id) // by id dari table atas
      .subscribe(data => {
        this.getTableMutasi = data.result;
      });
  }

  goto() {
    this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
