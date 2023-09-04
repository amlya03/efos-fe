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
import { refJabatan } from 'app/verification/service/config/refJabatan.model';
import { refTipePerusahaan } from 'app/data-entry/services/config/refTipePerusahaan.model';

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
  modelTipePekerjaanFix: getListTipePekerjaan[] = [];
  modelTipePekerjaanNon: getListTipePekerjaan[] = [];
  modelPosisi: refJabatan[] = [];
  modelTipePerusahaan: refTipePerusahaan[] = [];

  checkboxSegmentasi: String[] = [];
  checkboxKepegawaian: String[] = [];
  checkboxPernikahan: String[] = [];

  kodevalue: String[] = [];
  pekerjaanValue: String[] = [];
  thnMinUsia: any;
  pekerjaanMaxUsia: any;

  // /////////////////////
  storeCheckboxCondition: any = undefined;

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
      kode_fasilitas: { value: '' || null, disabled: true }
    });

    this.createRacForm = this.formBuilder.group({
      fasilitas: { value: '' || null, disabled: true },
      segmentasi_fasilitas: '',
      kode_fasilitas: { value: '' || null, disabled: true },
      updated_date: '',
      status_kepegawaian: '' /*this.formBuilder.array([])*/,
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
      tipe_perusahaan: '',
      posisi: ''
    });

    this.load();
  }

  load(): any {
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
          // Save result to model
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
    setTimeout(() => {
      this.dataEntryService.getFetchListJabatan().subscribe(data => {
        this.modelPosisi = data.result;
      });
    }, 7);
    setTimeout(() => {
      this.dataEntryService.getFetchTipePerusahaan().subscribe(data => {
        this.modelTipePerusahaan = data.result;
      });
    }, 8);
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

  onCheckChangeSegmentasi(event: any) {
    // $('#andLabel0').hide();
    let kodeKategoriPekerjaan: any;
    let deskripsiKategoriPekerjaan: any;
    if (event.target.checked) {
      // /* Selected */
      this.checkboxSegmentasi.push(event.target.value);
      this.checkboxSegmentasi.forEach((value: String, index: number) => {
        kodeKategoriPekerjaan = value.split('|')[0];
        deskripsiKategoriPekerjaan = value.split('|')[1];

        // console.warn(value, index, array);

        // get list Tipe Pekerjaan
        if (kodeKategoriPekerjaan == 2) {
          this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
            this.modelTipePekerjaanNon = status.result;
          });
        } else {
          this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
            this.modelTipePekerjaanFix = status.result;
          });
        }

        // Condition Checkbox
        if (kodeKategoriPekerjaan == 2) this.storeCheckboxCondition = index;
      });
      // console.warn(this.storeCheckboxCondition);
      // console.warn('check ', this.checkboxSegmentasi);
    } else {
      // /* unselected */
      const index = this.checkboxSegmentasi.findIndex(list => list === event.target.value);
      this.checkboxSegmentasi.splice(index, 1);
      this.checkboxSegmentasi.forEach((value: String, number: number) => {
        kodeKategoriPekerjaan = value.split('|')[0];
        deskripsiKategoriPekerjaan = value.split('|')[1];

        // get list Tipe Pekerjaan
        if (kodeKategoriPekerjaan == 2) {
          this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
            this.modelTipePekerjaanNon = status.result;
          });
        } else {
          this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
            this.modelTipePekerjaanFix = status.result;
          });
        }

        // console.warn('uncheck', value, number);
        // Condition Checkbox
        if (kodeKategoriPekerjaan == 1) this.storeCheckboxCondition = undefined;
      });
      // console.warn('uncheck ', this.checkboxSegmentasi);
    }
  }

  onCheckChangeKepegawaian(event: any) {
    this.kodevalue = [];
    // const formArray: FormArray = this.createRacForm.get('status_kepegawaian') as FormArray;
    if (event.target.checked) {
      // /* Selected */
      this.checkboxKepegawaian.push(event.target.value);
    } else {
      // /* unselected */
      const index = this.checkboxKepegawaian.findIndex(list => list === event.target.value);
      this.checkboxKepegawaian.splice(index, 1);
    }
  }

  onCheckChangePernikahan(event: any) {
    this.kodevalue = [];
    if (event.target.checked) {
      // /* Selected */
      this.checkboxPernikahan.push(event.target.value);

      // this.thnMinUsia = $('#tahunMinimalUsia' + event.target.value.split('|')[0]).val();
      // this.kodevalue.push(this.thnMinUsia);
    } else {
      // /* unselected */
      const index = this.checkboxPernikahan.findIndex(list => list === event.target.value);
      this.checkboxPernikahan.splice(index, 1);
      // const index1 = this.kodevalue.findIndex(list => {
      //   list === $('#tahunMinimalUsia' + event.target.value.split('|')[0]).val();
      // });
      // this.kodevalue.splice(index1, 1);
    }
  }

  onchangefasilitas(valuefasilitas: any): void {
    const pemisahfasilitasmaster = valuefasilitas.split('|');
    this.scoringForm.get('kode_fasilitas')?.setValue(pemisahfasilitasmaster[0]);
    this.createRacForm.get('fasilitas')?.setValue(pemisahfasilitasmaster[1]);
    this.createRacForm.get('kode_fasilitas')?.setValue(pemisahfasilitasmaster[0]);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  public clickModalsOpen(value: any) {
    this.modalServices.open(value, { size: 'xl', windowClass: 'modal-xl' });
  }

  public clickModalsClose() {
    this.modalServices.dismissAll();
  }

  createRac(): any {
    console.warn('status', this.scoringForm.get('status')?.value);
    console.warn('segmentasi fasilitas', this.scoringForm.get('segmentasi_fasilitas')?.value);
    console.warn('fasilitas', this.createRacForm.get('fasilitas')?.value);
    console.warn('kode fasilitas', this.createRacForm.get('kode_fasilitas')?.value);
    console.warn('minimal pendapatan', this.createRacForm.get('min_pendapatan')?.value);
    console.warn('lama beroperasi', this.createRacForm.get('lama_beroperasi')?.value);
    console.warn('jumlah karyawan', this.createRacForm.get('jumlah_karyawan')?.value);
    console.warn('status kepegawaian', this.checkboxKepegawaian);
    console.warn('status pernikahan', this.checkboxPernikahan);
    console.warn('segmentasi', this.checkboxSegmentasi);

    this.checkboxPernikahan.filter((value: String) => {
      this.thnMinUsia = $('#tahunMinimalUsia' + value.split('|')[0]).val();

      this.kodevalue.push(this.thnMinUsia);
    });

    console.warn('minimal usia', this.kodevalue);
    console.warn('tipe perusahaan', this.createRacForm.get('tipe_perusahaan')?.value);
  }
}
