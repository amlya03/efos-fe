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
import { SessionStorageService } from 'ngx-webstorage';
import { any } from 'cypress/types/bluebird';

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

  kepegawaianvalue: String[] = [];
  kodevalue: String[] = [];
  maxUsiaValue: String[] = [];
  minimalKerjaValue: String[] = [];
  thnMinUsia: any;
  pekerjaanMaxUsia: any;
  posisiMaxUsia: any;
  tahunMaxUsia: any;
  pekerjaanMinimalKerja: any;
  tahunMinimalKerja: any;

  // /////////////////////
  storeCheckboxCondition: any = undefined;
  storeTipePekerjaanMaxUsia: String[] = [];
  storePosisiMaxUsia: String[] = [];
  storeTahunMaxUsia: String[] = [];
  storeTipePekerjaanMinKerja: String[] = [];
  storePosisiMinKerja: String[] = [];
  storeTahunMinKerja: String[] = [];

  // Save Retrive ID In Model
  retriveRacModel: parameterrac = new parameterrac();

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
    private modalServices: NgbModal,
    private sessionStorageService: SessionStorageService
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
      id: 0,
      fasilitas: { value: '' || null, disabled: true },
      segmentasi_fasilitas: '',
      kode_fasilitas: { value: '' || null, disabled: true },
      updated_by: this.sessionStorageService.retrieve('sessionUserName'),
      min_pendapatan: '',
      min_usia: '',
      max_usia: '',
      min_masakerja: '',
      lama_beroperasi: '',
      jumlah_karyawan: '',
      tipe_pekerjaan: '',
      tipe_perusahaan: '',
      posisi: '',
      active: ''
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
      title: 'Apakah yakin ingin menghapus parameter RAC "' + this.createRacForm.get('fasilitas')?.value + '"',
      text: 'Parameter RAC akan hilang',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then(result => {
      if (result.value) {
        this.scoringServices.getdeleterac(id).subscribe({
          next: racdeleteResponse => {
            if (racdeleteResponse.result === 'sukses') {
              Swal.fire(
                'Parameter RAC berhasil dihapus!',
                'Parameter RAC "' + this.createRacForm.get('fasilitas')?.value + '" Berhasil dihapus',
                'success'
              ).then(() => {
                window.location.reload();
              });
            }
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Parameter RAC disimpan', 'error');
      }
    });
  }

  onCheckChangeKepegawaian(event: any) {
    this.kepegawaianvalue = [];

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

  onCheckChangeSegmentasi(event: any) {
    // $('#andLabel0').hide();
    this.maxUsiaValue = [];
    this.minimalKerjaValue = [];
    let kodeKategoriPekerjaan: any;
    let deskripsiKategoriPekerjaan: any;
    if (event.target.checked) {
      // /* Selected */
      this.checkboxSegmentasi.push(event.target.value);
      this.checkboxSegmentasi.forEach((value: String, index: number) => {
        console.warn(value);
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

  createRac(): any {
    // set Value Status Active RAC form
    this.createRacForm.get('status')?.setValue(this.scoringForm.get('status')?.value);

    // set Value Segmentasi RAC form
    this.createRacForm.get('segmentasi_fasilitas')?.setValue(this.scoringForm.get('segmentasi_fasilitas')?.value);

    // Insert To Array Minimal USia
    this.checkboxPernikahan.filter((value: String) => {
      this.thnMinUsia = $('#tahunMinimalUsia' + value.split('|')[0]).val();

      this.kodevalue.push(this.thnMinUsia);
    });

    // Insert To Array Maximal Usia dan Maximal Kerja
    this.checkboxSegmentasi.filter((value_segmentasi: String) => {
      //console.warn(value_segmentasi.split('|')[1]);
      if (value_segmentasi.split('|')[0] === '1') {
        // Save Maksimal usia
        this.pekerjaanMaxUsia = $('#tipeMaksimalUsia' + value_segmentasi.split('|')[0]).val();
        this.storeTipePekerjaanMaxUsia.push(this.pekerjaanMaxUsia);
        this.posisiMaxUsia = $('#posisiMaksimalUsiaFix' + value_segmentasi.split('|')[0]).val();
        this.storePosisiMaxUsia.push(this.posisiMaxUsia);
        this.tahunMaxUsia = $('#thnMaksimalUsia' + value_segmentasi.split('|')[0]).val();
        this.storeTahunMaxUsia.push(this.tahunMaxUsia);

        // Save Minimal Masa Kerja
        this.pekerjaanMinimalKerja = $('#tipeMinimalkerja' + value_segmentasi.split('|')[0]).val();
        this.storeTipePekerjaanMinKerja.push(this.pekerjaanMinimalKerja);
        this.tahunMinimalKerja = $('#thnMinimalKerja' + value_segmentasi.split('|')[0]).val();
        this.storeTahunMinKerja.push(this.tahunMinimalKerja);
      } else {
        // Save Maksimal usia
        this.pekerjaanMaxUsia = $('#tipeMaksimalUsia' + value_segmentasi.split('|')[0]).val();
        this.storeTipePekerjaanMaxUsia.push(this.pekerjaanMaxUsia);
        this.posisiMaxUsia = '';
        this.storePosisiMaxUsia.push(this.posisiMaxUsia);
        this.tahunMaxUsia = $('#thnMaksimalUsia' + value_segmentasi.split('|')[0]).val();
        this.storeTahunMaxUsia.push(this.tahunMaxUsia);

        // Save Minimal Masa Kerja
        this.pekerjaanMinimalKerja = $('#tipeMinimalkerja' + value_segmentasi.split('|')[0]).val();
        this.storeTipePekerjaanMinKerja.push(this.pekerjaanMinimalKerja);
        this.tahunMinimalKerja = $('#thnMinimalKerja' + value_segmentasi.split('|')[0]).val();
        this.storeTahunMinKerja.push(this.tahunMinimalKerja);
      }
    });

    // console.warn('status', this.scoringForm.get('status')?.value);
    // console.warn('segmentasi fasilitas', this.scoringForm.get('segmentasi_fasilitas')?.value);
    // console.warn('fasilitas', this.createRacForm.get('fasilitas')?.value);
    // console.warn('kode fasilitas', this.createRacForm.get('kode_fasilitas')?.value);
    // console.warn('minimal pendapatan', this.createRacForm.get('min_pendapatan')?.value);
    // console.warn('lama beroperasi', this.createRacForm.get('lama_beroperasi')?.value);
    // console.warn('jumlah karyawan', this.createRacForm.get('jumlah_karyawan')?.value);
    // console.warn('status kepegawaian', this.checkboxKepegawaian);
    // console.warn('status pernikahan', this.checkboxPernikahan);
    // console.warn('segmentasi', this.checkboxSegmentasi);
    // console.warn('minimal usia', this.kodevalue);
    // console.warn('maksimal usia', this.maxUsiaValue);
    // console.warn('maksimal masa kerja', this.minimalKerjaValue);
    // console.warn('tipe perusahaan', this.createRacForm.get('tipe_perusahaan')?.value);

    // For Loop Kepegawaian
    for (let i = 0; i < this.checkboxKepegawaian.length; i++) {
      // console.warn(this.checkboxKepegawaian[i]);

      // For Loop Pernikahan
      for (let j = 0; j < this.checkboxPernikahan.length; j++) {
        // console.warn(this.checkboxPernikahan[j].split('|')[1]);
        // console.warn(this.kodevalue[j]);

        // For Loop Segmentasi
        for (let k = 0; k < this.checkboxSegmentasi.length; k++) {
          // console.warn(this.checkboxSegmentasi[k].split('|')[1]);
          // console.warn(this.storeTipePekerjaanMaxUsia[k]);
          // console.warn(this.storePosisiMaxUsia[k]);
          // console.warn(this.storeTahunMaxUsia[k]);
          // console.warn(this.storeTipePekerjaanMinKerja[k]);
          // console.warn(this.storeTahunMinKerja[k]);

          // ----------------- Post Method ------------------//
          this.http
            .post<any>(this.baseUrl + 'v1/efos-ref/create_parameter_rac', {
              id: this.createRacForm.get('id')?.value,
              kode_fasilitas: this.createRacForm.get('kode_fasilitas')?.value,
              jenis_fasilitas: this.createRacForm.get('fasilitas')?.value,
              created_by: this.createRacForm.get('updated_by')?.value,
              created_date: '',
              active: this.createRacForm.get('status')?.value,
              updated_date: '',
              updated_by: '',
              status_kepegawaian: this.checkboxKepegawaian[i],
              min_pendapatan: this.createRacForm.get('min_pendapatan')?.value,
              status_pernikahan: this.checkboxPernikahan[j].split('|')[1],
              min_usia: this.kodevalue[j],
              segmentasi: this.checkboxSegmentasi[k].split('|')[1],
              max_usia: this.storeTahunMaxUsia[k],
              min_masakerja: this.storeTahunMinKerja[k],
              lama_beroperasi: this.createRacForm.get('lama_beroperasi')?.value,
              jumlah_karyawan: this.createRacForm.get('jumlah_karyawan')?.value,
              tipe_pekerjaan: this.storeTipePekerjaanMaxUsia[k],
              posisi: this.storePosisiMaxUsia[k],
              segmentasi_fasilitas: this.createRacForm.get('segmentasi_fasilitas')?.value,
              tipe_perusahaan: this.createRacForm.get('tipe_perusahaan')?.value
            })
            .subscribe({
              next: response => {
                // untuk menangkap Response Sukses ketika post
                console.warn(response);
                if (response.code === '200') this.modalServices.dismissAll();
              },
              error: errResponse => {
                // untuk menangkap error ketika post
                console.error(errResponse);
                if (errResponse) this.modalServices.dismissAll();
              }
            });
        }
      }
    }
  }

  updateRacByIdOnClick(id: string | number | null | undefined, modals: any): void {
    this.scoringServices.getParameterRac(id).subscribe({
      next: response => {
        this.retriveRacModel = response.result;

        const saveFind = this.modelKategoriPekerjaan.find(
          (value: refKategoriPekerjaanModel) => value.category_job_deskripsi == response.result.segmentasi
        );
        this.checkboxSegmentasi = [saveFind?.category_job_id + '|' + saveFind?.category_job_deskripsi];
        if (saveFind?.category_job_id != null)
          this.dataEntryService.getFetchListTipePekerjaan(saveFind.category_job_id).subscribe(status => {
            this.modelTipePekerjaanFix = status.result;
            this.modelTipePekerjaanNon = status.result;
          });

        const retriveRAC = {
          id: id,
          fasilitas: response.result.jenis_fasilitas,
          segmentasi_fasilitas: response.result.segmentasi_fasilitas,
          kode_fasilitas: response.result.kode_fasilitas,
          updated_by: response.result.updated_by,
          min_pendapatan: response.result.min_pendapatan,
          min_usia: response.result.min_usia,
          max_usia: response.result.max_usia,
          min_masakerja: response.result.min_masakerja,
          lama_beroperasi: response.result.lama_beroperasi,
          jumlah_karyawan: response.result.jumlah_karyawan,
          tipe_pekerjaan: response.result.tipe_pekerjaan,
          tipe_perusahaan: response.result.tipe_perusahaan,
          posisi: response.result.posisi,
          active: response.result.active
        };
        this.createRacForm.setValue(retriveRAC);
        this.modalServices.open(modals, { size: 'xl', windowClass: 'modal-xl' });
      },
      error: errResponse => {
        console.error(errResponse);
      }
    });
  }

  viewIdOnClick(id: string | number | null | undefined, modals: any): void {
    this.scoringServices.getParameterRac(id).subscribe({
      next: response => {
        this.retriveRacModel = response.result;

        const saveFind = this.modelKategoriPekerjaan.find(
          (value: refKategoriPekerjaanModel) => value.category_job_deskripsi == response.result.segmentasi
        );
        this.checkboxSegmentasi = [saveFind?.category_job_id + '|' + saveFind?.category_job_deskripsi];
        if (saveFind?.category_job_id != null)
          this.dataEntryService.getFetchListTipePekerjaan(saveFind.category_job_id).subscribe(status => {
            this.modelTipePekerjaanFix = status.result;
            this.modelTipePekerjaanNon = status.result;
          });

        const retriveRAC = {
          id: id,
          fasilitas: response.result.jenis_fasilitas,
          segmentasi_fasilitas: response.result.segmentasi_fasilitas,
          kode_fasilitas: response.result.kode_fasilitas,
          updated_by: response.result.updated_by,
          min_pendapatan: response.result.min_pendapatan,
          min_usia: response.result.min_usia,
          max_usia: response.result.max_usia,
          min_masakerja: response.result.min_masakerja,
          lama_beroperasi: response.result.lama_beroperasi,
          jumlah_karyawan: response.result.jumlah_karyawan,
          tipe_pekerjaan: response.result.tipe_pekerjaan,
          tipe_perusahaan: response.result.tipe_perusahaan,
          posisi: response.result.posisi,
          active: response.result.active
        };
        this.createRacForm.setValue(retriveRAC);
        this.createRacForm.disable();
        this.modalServices.open(modals, { size: 'xl', windowClass: 'modal-xl' });
        // $('#tipe_kepegawaian_deskripsi').attr('disable', 'disable');
      },
      error: errResponse => {
        console.error(errResponse);
      }
    });
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
}
