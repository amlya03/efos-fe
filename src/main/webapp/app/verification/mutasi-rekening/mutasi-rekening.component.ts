import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { mutasiRekening } from './mutasiRekening.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-mutasi-rekening',
  templateUrl: './mutasi-rekening.component.html',
  styleUrls: ['./mutasi-rekening.component.scss'],
})
export class MutasiRekeningComponent implements OnInit, OnDestroy {
  mutasiRekening?: mutasiRekening[];
  mutasiForm!: FormGroup;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected mutasiRekeningService: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.mutasiForm = this.formBuilder.group({
      id: '',
      app_no_de: '',
      bulan: '',
      created_by: '',
      created_date: '',
      debet: '',
      kredit: '',
      nama_bank: '',
      no_rekening: '',
      saldo: '',
      tahun: '',
      updated_by: '',
      updated_date: '2022-09-20T04:51:35.224Z',
      // id: '',
      // app_no_de: "tes",
      // bulan: "09",
      // created_by: "tes",
      // created_date: "",
      // debet: 2000000,
      // kredit: 0,
      // nama_bank: "BNI",
      // no_rekening: "123456789",
      // saldo: 0,
      // tahun: "2022",
      // updated_by: "",
      // updated_date: "2022-09-20T04:51:35.224Z"
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
    this.mutasiRekeningService.getMutasiRekening().subscribe(data => {
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
  submitForm(): void {
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_verif_mutasi', {
        nama_bank: this.mutasiForm.get('nama_bank')?.value,
        app_no_de: this.mutasiForm.get('app_no_de')?.value,
        bulan: this.mutasiForm.get('bulan')?.value,
        created_by: this.mutasiForm.get('created_by')?.value,
        created_date: this.mutasiForm.get('created_date')?.value,
        debet: this.mutasiForm.get('debet')?.value,
        // id: this.mutasiForm.get('id')?.value,
        kredit: this.mutasiForm.get('kredit')?.value,
        no_rekening: this.mutasiForm.get('no_rekening')?.value,
        saldo: this.mutasiForm.get('saldo')?.value,
        tahun: this.mutasiForm.get('tahun')?.value,
        updated_by: this.mutasiForm.get('updated_by')?.value,
        updated_date: this.mutasiForm.get('updated_date')?.value,
      })
      .subscribe({
        next: response => console.warn(response),
        error: error => console.warn(error),
      });
  }
}
