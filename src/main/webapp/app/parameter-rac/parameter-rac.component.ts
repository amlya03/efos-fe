/* eslint-disable no-constant-condition */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { parameterrac } from 'app/input-scoring/parameterrac.model';
import { InputScoringService } from 'app/input-scoring/input-scoring.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { listFasilitasModel } from 'app/parameterized/config/listFasilitasModel.model';
import { listSegmentasiModel } from 'app/parameterized/config/listSegementasiModel.model';
import { getListTipePekerjaan } from 'app/data-entry/services/config/getListTipePekerjaan.model';
import { refKategoriPekerjaanModel } from 'app/data-entry/services/config/refKategoriPekekerjaanModel.model';
import { refTipeKepegawaianModel } from 'app/data-entry/services/config/refTipeKepegawaianModel.model';
import { refStatusPerkawinan } from 'app/verification/service/config/refStatusPerkawinan.model';

@Component({
  selector: 'jhi-parameter-rac',
  templateUrl: './parameter-rac.component.html',
  styleUrls: ['./parameter-rac.component.scss']
})
export class ParameterRacComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  scoringForm!: FormGroup;
  createRacForm!: FormGroup;
  parameterrac: parameterrac[] = [];
  modelJenisFasilitas: listFasilitasModel[] = [];
  modelSegmentasiFasilitas: listSegmentasiModel[] = [];
  modelKategoriPekerjaan: refKategoriPekerjaanModel[] = [];
  modelTipeKepegawaian: refTipeKepegawaianModel[] = [];
  modelStatusPerkawinan: refStatusPerkawinan[] = [];
  modelTipePekerjaan: getListTipePekerjaan[] = [];
  checkboxSegmentasi: String[] = [];
  checkboxKepegawaian: String[] = [];

  // Start Data Tables
  @ViewChild(DataTableDirective, { static: true })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  // END Data Tables

  constructor(
    protected http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    protected scoringServices: InputScoringService,
    protected dataEntryService: DataEntryService,
    private modalServices: NgbModal
  ) {
    this.route.queryParams.subscribe(params => {});
  }

  ngOnInit(): void {
    // Start Data Tables
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true
    };
    // End Data Tables

    this.scoringForm = this.formBuilder.group({
      status: '',
      fasilitas: '',
      segmentasi_fasilitas: '',
      kode_fasilitas: { value: '' || null, disabled: true },
      updated_date: '',
      status_kepegawaian: '',
      min_pendapatan: '',
      status_pernikahan: '',
      min_usia: '',
      segmentasi: new FormArray([]),
      max_usia: '',
      min_masakerja: '',
      jenis_perusahaan: '',
      lama_beroperasi: '',
      jumlah_karyawan: '',
      tipe_pekerjaan: '',
      posisi: ''
    });

    this.createRacForm = this.formBuilder.group({
      fasilitas: { value: '' || null, disabled: true },
      segmentasi_fasilitas: '',
      kode_fasilitas: { value: '' || null, disabled: true },
      updated_date: '',
      status_kepegawaian: '',
      min_pendapatan: '',
      status_pernikahan: '',
      min_usia: '',
      segmentasi: '',
      max_usia: '',
      min_masakerja: '',
      jenis_perusahaan: '',
      lama_beroperasi: '',
      jumlah_karyawan: '',
      tipe_pekerjaan: '',
      posisi: ''
    });

    this.load();
  }

  load(): void {
    this.getLoading(true);

    setTimeout(() => {
      this.dataEntryService.getFetchKodeFasilitas().subscribe(data => {
        this.modelJenisFasilitas = data.result;
      });
    }, 1);

    setTimeout(() => {
      this.scoringServices.listSegmentasi().subscribe(data => {
        this.modelSegmentasiFasilitas = data.result;
      });
    }, 2);

    setTimeout(() => {
      this.scoringServices.listkategoripekerjaan().subscribe(data => {
        this.modelKategoriPekerjaan = data.result;
      });
    }, 3);

    setTimeout(() => {
      this.scoringServices.listparameterrac().subscribe({
        next: racResponse => {
          this.parameterrac = racResponse.result;
          // Pemanggilan value ke datatables
          this.dtTrigger.next(this.parameterrac);
          this.getLoading(false);
        }
      });
    }, 4);

    setTimeout(() => {
      this.scoringServices.listTipeKepegawaian().subscribe(data => {
        this.modelTipeKepegawaian = data.result;
      });
    }, 5);

    setTimeout(() => {
      this.dataEntryService.getFetchStatusPerkawinan().subscribe(status => {
        this.modelStatusPerkawinan = status.result;
      });
    }, 6);
  }

  deleteData(id: any): void {
    Swal.fire({
      title: 'Apakah Yakin Ingin Menghapus Data RAC Ini?',
      text: 'File akan hilang',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus Data RAC!',
      cancelButtonText: 'Tidak, Simpan Data'
    }).then(result => {
      if (result.value) {
        this.scoringServices.getdeleterac(id).subscribe({
          next: racdeleteResponse => {
            if (racdeleteResponse.result === 'sukses') window.location.reload();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'File disimpan', 'error');
      }
    });
  }

  createR(): void {}

  onCheckChangeSegmentasi(event: any) {
    let kodeKategoriPekerjaan: any;
    let deskripsiKategoriPekerjaan: any;
    if (event.target.checked) {
      // /* Selected */
      this.checkboxSegmentasi.push(event.target.value);
      this.checkboxSegmentasi.forEach((value: String) => {
        kodeKategoriPekerjaan = value.split('|')[0];
        deskripsiKategoriPekerjaan = value.split('|')[1];
        this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
          this.modelTipePekerjaan = status.result;
          console.warn(this.modelTipePekerjaan);
        });
      });
      console.warn('check ', this.checkboxSegmentasi);
    } else {
      // /* unselected */
      const index = this.checkboxSegmentasi.findIndex(list => list === event.target.value);
      this.checkboxSegmentasi.splice(index, 1);
      this.checkboxSegmentasi.forEach((value: String) => {
        kodeKategoriPekerjaan = value.split('|')[0];
        deskripsiKategoriPekerjaan = value.split('|')[1];
        this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
          this.modelTipePekerjaan = status.result;
          console.warn(this.modelTipePekerjaan);
        });
      });
      console.warn('uncheck ', this.checkboxSegmentasi);
    }
  }

  onCheckChangeKepegawaian(event: any) {
    if (event.target.checked) {
      // /* Selected */
      this.checkboxKepegawaian.push(event.target.value);
      console.warn('check ', this.checkboxKepegawaian);
    } else {
      // /* unselected */
      const index = this.checkboxKepegawaian.findIndex(list => list === event.target.value);
      this.checkboxKepegawaian.splice(index, 1);
      console.warn('uncheck ', this.checkboxKepegawaian);
    }
  }

  onchangefasilitas(valuefasilitas: any): void {
    const pemisahfasilitasmaster = valuefasilitas.split('|');
    this.scoringForm.get('kode_fasilitas')?.setValue(pemisahfasilitasmaster[0]);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  public clickModals(value: any) {
    this.modalServices.open(value, { size: 'xl', windowClass: 'modal-xl' });
  }
}
