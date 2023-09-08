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
import { parameterracmaxusia } from 'app/input-scoring/parameterracmaxusia.model';
import { parameterracminmasakerja } from 'app/input-scoring/parameterracminmasakerja.model';
import { parameterracjenisperusahaan } from 'app/input-scoring/parameterracjenisperusahaan.model';
import { parameterracsegmentasi } from 'app/input-scoring/parameterracsegmentasi.model';
import { parameterracstatuskepegawaian } from 'app/input-scoring/parameterracstatuskepegawaian.model';
import { parameterracminusia } from 'app/input-scoring/parameterracminusia.model';

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

  addFormFix: number[] = [];
  addFormNon: number[] = [];
  addFormMinKerjaFix: number[] = [];
  addFormMinKerjaNon: number[] = [];
  addFormPerusahaan: number[] = [0];

  // Save Retrive ID In Model
  retriveRacModel: parameterrac = new parameterrac();
  retriveListParameterRacMaxusiaModel: parameterracmaxusia[] = [];
  retriveListParameterRacMinmasakerjaModel: parameterracminmasakerja[] = [];
  retriveListParameterRacJenisperusahaanModel: parameterracjenisperusahaan[] = [];
  retriveListParameterRacSegmentasiModel: parameterracsegmentasi[] = [];
  retriveListParameterRacStatusKepegawaianModel: parameterracstatuskepegawaian[] = [];
  retriveListParameterRacMinimalUsiaModel: parameterracminusia[] = [];

  // ---------------------------- Start checked for logic retrive not using form array -------------------------- //
  storeRetriveCheckedSegmentasi: boolean[] = [false, false];
  // ---------------------------- End checked for logic retrive not using form array -------------------------- //

  // ---------------------------- Start Store Disabled Condition -------------------------- //
  isDisabled: boolean = true;
  // ---------------------------- Start Store Disabled Condition -------------------------- //
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
      created_by: this.sessionStorageService.retrieve('sessionUserName'),
      min_pendapatan: '',
      min_masakerja: '',
      lama_beroperasi: '',
      jumlah_karyawan: '',
      tipe_perusahaan: '',
      active: '1'
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

  onChangeMaksimalUsia(event: any, fix: number) {
    $('#tipeMaksimalUsia' + fix).val(event.target.value);
    $('#tipeMinimalkerja' + fix).val(event.target.value);
  }

  onChangeMaksimalUsiaNon(event: any, non: number) {
    $('#tipeMaksimalUsiaNon' + non).val(event.target.value);
    $('#sdjgkshgjkhdfjk' + non).val(event.target.value);
    // $('#thnMinimalKerjaNon' + non).val(event.target.value);
  }

  onClickAddMaxUsiaFix(event: number[]) {
    if (event.length == 0) {
      this.addFormFix.push(0);
    } else {
      this.addFormFix.push(this.addFormFix.length - 1 + 1);
    }
  }

  onClickAddMaxUsiaNon(event: number[]) {
    if (event.length == 0) {
      this.addFormNon.push(0);
    } else {
      this.addFormNon.push(this.addFormNon.length - 1 + 1);
    }
  }

  onClickAddMinMasaKerjaFix(event: number[]) {
    if (event.length == 0) {
      this.addFormMinKerjaFix.push(0);
    } else {
      this.addFormMinKerjaFix.push(this.addFormMinKerjaFix.length - 1 + 1);
    }
  }

  onClickAddMinMasaKerjaNon(event: number[]) {
    if (event.length == 0) {
      this.addFormMinKerjaNon.push(0);
    } else {
      this.addFormMinKerjaNon.push(this.addFormMinKerjaNon.length - 1 + 1);
    }
  }

  onClickAddPerusahaan(event: number[]) {
    if (event.length == 0) {
      this.addFormPerusahaan.push(0);
    } else {
      this.addFormPerusahaan.push(this.addFormPerusahaan.length - 1 + 1);
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
    this.maxUsiaValue = [];
    this.minimalKerjaValue = [];
    let kodeKategoriPekerjaan: any;
    let deskripsiKategoriPekerjaan: any;
    if (event.target.checked) {
      // /* Selected */

      this.checkboxSegmentasi.push(event.target.value);
      this.checkboxSegmentasi.forEach((value: String, index: number) => {
        // console.warn(value);
        kodeKategoriPekerjaan = value.split('|')[0];
        deskripsiKategoriPekerjaan = value.split('|')[1];

        // console.warn(value, index, array);

        // get list Tipe Pekerjaan
        if (kodeKategoriPekerjaan == 2) {
          if (this.addFormNon.length == 0) this.addFormNon.push(0);
          if (this.addFormMinKerjaNon.length == 0) this.addFormMinKerjaNon.push(0);
          this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
            this.modelTipePekerjaanNon = status.result;
          });
        } else {
          if (this.addFormFix.length == 0) this.addFormFix.push(0);
          if (this.addFormMinKerjaFix.length == 0) this.addFormMinKerjaFix.push(0);
          this.dataEntryService.getFetchListTipePekerjaan(kodeKategoriPekerjaan).subscribe(status => {
            this.modelTipePekerjaanFix = status.result;
          });
        }

        // Condition Checkbox
        if (kodeKategoriPekerjaan == 2) this.storeCheckboxCondition = index;
      });
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
    // this.storeTipePekerjaanMaxUsia.splice(0);
    // this.storeTahunMaxUsia.splice(0);
    // set Value Status Active RAC form
    this.createRacForm.get('active')?.setValue(this.scoringForm.get('status')?.value);

    // set Value Segmentasi RAC form
    this.createRacForm.get('segmentasi_fasilitas')?.setValue(this.scoringForm.get('segmentasi_fasilitas')?.value);

    // Insert To Array Minimal USia
    this.checkboxPernikahan.filter((value: String) => {
      this.thnMinUsia = $('#tahunMinimalUsia' + value.split('|')[0]).val();

      this.kodevalue.push(this.thnMinUsia);
    });

    // Insert To Array Maximal Usia dan Maximal Kerja
    this.addFormFix.forEach((index_add1: number) => {
      this.pekerjaanMaxUsia = $('#tipeMaksimalUsia' + index_add1).val();
      this.storeTipePekerjaanMaxUsia.push(this.pekerjaanMaxUsia);
      this.posisiMaxUsia = $('#posisiMaksimalUsiaFix' + index_add1).val();
      this.storePosisiMaxUsia.push(this.posisiMaxUsia);
      this.tahunMaxUsia = $('#thnMaksimalUsiaFix' + index_add1).val();
      this.storeTahunMaxUsia.push(this.tahunMaxUsia);
    });
    this.addFormMinKerjaFix.forEach((index_1: number) => {
      this.pekerjaanMinimalKerja = $('#tipeMinimalkerja' + index_1).val();
      this.storeTipePekerjaanMinKerja.push(this.pekerjaanMinimalKerja);
      this.tahunMinimalKerja = $('#thnMinimalKerjaFix' + index_1).val();
      this.storeTahunMinKerja.push(this.tahunMinimalKerja);
    });
    this.addFormNon.forEach((index_add2: number) => {
      let jadidua: any = $('#tipeMaksimalUsiaNon' + index_add2).val();
      this.storeTipePekerjaanMaxUsia.push(jadidua);
      this.posisiMaxUsia = '';
      this.storePosisiMaxUsia.push(this.posisiMaxUsia);
      let tahundua: any = $('#thnMaksimalUsiaNon' + index_add2).val();
      this.storeTahunMaxUsia.push(tahundua);
    });
    this.addFormMinKerjaNon.forEach((index_2: number) => {
      let jaditiga: any = $('#tipeMinimalkerjaNon' + index_2).val();
      this.storeTipePekerjaanMinKerja.push(jaditiga);
      let tahuntiga: any = $('#thnMinimalKerjaNon' + index_2).val();
      this.storeTahunMinKerja.push(tahuntiga);
    });
    this.checkboxSegmentasi.forEach((value_segmentasi: String) => {
      if (value_segmentasi.split('|')[0] === '1') {
      } else {
      }

      // if (value_segmentasi.split('|')[0] === '1') {

      //   // Save Minimal Masa Kerja
      //   this.pekerjaanMinimalKerja = $('#tipeMinimalkerja' + value_segmentasi.split('|')[0]).val();
      //   this.storeTipePekerjaanMinKerja.push(this.pekerjaanMinimalKerja);
      //   this.tahunMinimalKerja = $('#thnMinimalKerjaFix' + value_segmentasi.split('|')[0]).val();
      //   this.storeTahunMinKerja.push(this.tahunMinimalKerja);
      // } else {
      //   // Save Maksimal usia

      //   // Save Minimal Masa Kerja
      //   this.pekerjaanMinimalKerja = $('#tipeMinimalkerjaNon' + value_segmentasi.split('|')[0]).val();
      //   this.storeTipePekerjaanMinKerja.push(this.pekerjaanMinimalKerja);
      //   this.tahunMinimalKerja = $('#thnMinimalKerjaNon' + value_segmentasi.split('|')[0]).val();
      //   this.storeTahunMinKerja.push(this.tahunMinimalKerja);
      // }
    });
    // console.warn(this.storeTipePekerjaanMaxUsia);
    // console.warn(this.storePosisiMaxUsia);
    console.warn(this.storeTahunMaxUsia);
    // console.warn(this.storeTipePekerjaanMinKerja);
    console.warn(this.storeTahunMinKerja);

    return;
    // For Each Kepegawaian
    let joinKepegawaian: String;
    joinKepegawaian = this.checkboxKepegawaian.join();
    this.checkboxKepegawaian.forEach((value_kepegawaian: String) => {
      const status_kepegawaian = {
        created_by: this.createRacForm.get('created_by')?.value,
        created_date: '',
        id: this.createRacForm.get('id')?.value,
        id_rac: this.createRacForm.get('id')?.value,
        updated_by: '',
        updated_date: '',
        status_kepegawaian: value_kepegawaian
      };
      this.retriveListParameterRacStatusKepegawaianModel.push(status_kepegawaian);
    });

    // For Each Segmentasi
    let joinSegmentasi: String;
    const filteredSegmentasi = this.checkboxSegmentasi.map(item => item.split('|')[1]);
    joinSegmentasi = filteredSegmentasi.join();
    this.checkboxSegmentasi.forEach((value_segmentasi: String) => {
      const segmentasi = {
        created_by: this.createRacForm.get('created_by')?.value,
        created_date: '',
        id: this.createRacForm.get('id')?.value,
        id_rac: this.createRacForm.get('id')?.value,
        updated_by: '',
        updated_date: '',
        segmentasi: value_segmentasi.split('|')[1]
      };
      this.retriveListParameterRacSegmentasiModel.push(segmentasi);
    });

    // For Each Pernikahan
    let joinPernikahan: String;
    const filteredPernikahan = this.checkboxPernikahan.map(item => item.split('|')[1]);
    let joinUsiaPernikahan: String;
    joinPernikahan = filteredPernikahan.join();
    joinUsiaPernikahan = this.kodevalue.join();

    this.checkboxPernikahan.forEach((value_min_usia: String, index_min_usia: number) => {
      const min_usia = {
        created_by: this.createRacForm.get('created_by')?.value,
        created_date: '',
        id: this.createRacForm.get('id')?.value,
        id_rac: this.createRacForm.get('id')?.value,
        min_usia: this.kodevalue[index_min_usia],
        status_pernikahan: value_min_usia.split('|')[1],
        updated_by: '',
        updated_date: ''
      };
      this.retriveListParameterRacMinimalUsiaModel.push(min_usia);
    });

    // For Each Jenis Perusahaan
    const jenis_perusahaan = {
      created_by: this.createRacForm.get('created_by')?.value,
      created_date: '',
      id: this.createRacForm.get('id')?.value,
      id_rac: this.createRacForm.get('id')?.value,
      jumlah_karyawan: this.createRacForm.get('jumlah_karyawan')?.value,
      lama_beroperasi: this.createRacForm.get('lama_beroperasi')?.value,
      tipe_perusahaan: this.createRacForm.get('tipe_perusahaan')?.value,
      updated_by: '',
      updated_date: ''
    };
    this.retriveListParameterRacJenisperusahaanModel.push(jenis_perusahaan);

    // For Each Maximal Usia
    let joinTahunMaxUsia: String;
    let joinPosisiMaxUsia: String;
    let joinTipePekerjaanMaxUsia: String;
    joinTahunMaxUsia = this.storeTahunMaxUsia.join();
    joinPosisiMaxUsia = this.storePosisiMaxUsia.join();
    joinTipePekerjaanMaxUsia = this.storeTipePekerjaanMaxUsia.join();
    this.storeTipePekerjaanMaxUsia.forEach((value: String, index: number) => {
      const max_usia = {
        created_by: this.createRacForm.get('created_by')?.value,
        created_date: '',
        id: this.createRacForm.get('id')?.value,
        id_rac: this.createRacForm.get('id')?.value,
        max_usia: this.storeTahunMaxUsia[index],
        posisi: this.storePosisiMaxUsia[index],
        tipe_pekerjaan: this.storeTipePekerjaanMaxUsia[index],
        updated_by: '',
        updated_date: '',
        segmentasi: this.checkboxSegmentasi[index].split('|')[1]
      };
      this.retriveListParameterRacMaxusiaModel.push(max_usia);
    });

    // For Each Minimal Masa Kerja
    let joinTahunMinMasaKerja: String;
    let joinTipePekerjaanMinMasaKerja: String;
    joinTahunMinMasaKerja = this.storeTahunMinKerja.join();
    joinTipePekerjaanMinMasaKerja = this.storeTipePekerjaanMinKerja.join();
    this.storeTipePekerjaanMaxUsia.forEach((value: String, index: number) => {
      const min_masa_kerja = {
        created_by: this.createRacForm.get('created_by')?.value,
        created_date: '',
        id: this.createRacForm.get('id')?.value,
        id_rac: this.createRacForm.get('id')?.value,
        min_masa_kerja: this.storeTahunMinKerja[index],
        tipe_pekerjaan: this.storeTipePekerjaanMinKerja[index],
        updated_by: '',
        updated_date: '',
        segmentasi: this.checkboxSegmentasi[index].split('|')[1]
      };
      this.retriveListParameterRacMinmasakerjaModel.push(min_masa_kerja);
    });

    // Post Method RAC
    this.http
      .post<any>(this.baseUrl + 'v1/efos-ref/create_parameter_rac', {
        listJenisPerusahaan: this.retriveListParameterRacJenisperusahaanModel,
        listMinUsia: this.retriveListParameterRacMinimalUsiaModel,
        listSegmentasi: this.retriveListParameterRacSegmentasiModel,
        listStatusKepegawaian: this.retriveListParameterRacStatusKepegawaianModel,
        listRacMaxUsia: this.retriveListParameterRacMaxusiaModel,
        listRacMinMasaKerja: this.retriveListParameterRacMinmasakerjaModel,
        rac: {
          active: this.createRacForm.get('active')?.value,
          id: this.createRacForm.get('id')?.value,
          kode_fasilitas: this.createRacForm.get('kode_fasilitas')?.value,
          jenis_fasilitas: this.createRacForm.get('fasilitas')?.value,
          created_by: this.createRacForm.get('created_by')?.value,
          created_date: '',
          updated_date: '',
          updated_by: '',
          status_kepegawaian: joinKepegawaian,
          min_pendapatan: this.createRacForm.get('min_pendapatan')?.value,
          status_pernikahan: joinPernikahan,
          min_usia: joinUsiaPernikahan,
          segmentasi: joinSegmentasi,
          max_usia: joinTahunMaxUsia,
          min_masakerja: joinTahunMinMasaKerja,
          lama_beroperasi: this.createRacForm.get('lama_beroperasi')?.value,
          jumlah_karyawan: this.createRacForm.get('jumlah_karyawan')?.value,
          tipe_pekerjaan: joinTipePekerjaanMaxUsia,
          posisi: joinPosisiMaxUsia,
          segmentasi_fasilitas: this.createRacForm.get('segmentasi_fasilitas')?.value,
          tipe_perusahaan: this.createRacForm.get('tipe_perusahaan')?.value
        }
      })
      .subscribe({
        next: response => {
          // untuk menangkap Response Sukses ketika post
          // console.warn(response);
          if (response.code === '200') this.modalServices.dismissAll();
          window.location.reload();
        },
        error: errResponse => {
          // untuk menangkap error ketika post
          console.error(errResponse);
          if (errResponse) this.modalServices.dismissAll();
        }
      });
  }

  // Retrive Data On click
  updateRacByIdOnClick(id: string | number | null | undefined, modals: any): void {
    this.isDisabled = false;
    this.storeRetriveCheckedSegmentasi.splice(0);
    this.checkboxSegmentasi.splice(0);

    this.scoringServices.getParameterRac(id).subscribe({
      next: response => {
        // this.addFormFix = [0];
        this.addFormNon = [0];
        this.addFormMinKerjaFix = [0];
        this.addFormMinKerjaNon = [0];
        this.retriveRacModel = response.result.rac;
        this.retriveListParameterRacStatusKepegawaianModel = response.result.listStatusKepegawaian;
        this.retriveListParameterRacMinimalUsiaModel = response.result.listMinUsia;
        this.retriveListParameterRacSegmentasiModel = response.result.listSegmentasi;
        this.retriveListParameterRacMaxusiaModel = response.result.listRacMaxUsia;
        this.retriveListParameterRacMinmasakerjaModel = response.result.listRacMinMasaKerja;
        this.retriveListParameterRacJenisperusahaanModel = response.result.listJenisPerusahaan;

        // Loop for insert data to show div Max usia
        this.retriveListParameterRacMaxusiaModel.forEach((value: parameterracmaxusia, index: number) => this.addFormFix.push(index));

        // Start Retrive Checked not using FormArray
        this.retriveListParameterRacSegmentasiModel.forEach((value: parameterracsegmentasi, index: number) => {
          if (value.segmentasi == this.modelKategoriPekerjaan[index].category_job_deskripsi) {
            this.checkboxSegmentasi.push(
              this.modelKategoriPekerjaan[index].category_job_id + '|' + this.modelKategoriPekerjaan[index].category_job_deskripsi
            );
            this.dataEntryService.getFetchListTipePekerjaan(this.modelKategoriPekerjaan[index].category_job_id).subscribe(status => {
              this.modelTipePekerjaanFix = status.result;
            });
          } else {
            this.checkboxSegmentasi.push(
              this.modelKategoriPekerjaan[index].category_job_id + '|' + this.modelKategoriPekerjaan[index].category_job_deskripsi
            );
            this.dataEntryService.getFetchListTipePekerjaan(this.modelKategoriPekerjaan[index].category_job_id).subscribe(status => {
              this.modelTipePekerjaanNon = status.result;
            });
          }

          if (this.retriveListParameterRacSegmentasiModel.length > 1) {
            if (value.segmentasi == 'Fix Income') {
              this.storeCheckboxCondition = undefined;
            } else {
              this.storeCheckboxCondition = index;
            }
          } else {
            this.storeCheckboxCondition = index;
          }
        });

        const retriveRAC = {
          id: id,
          fasilitas: this.retriveRacModel.jenis_fasilitas,
          segmentasi_fasilitas: this.retriveRacModel.segmentasi_fasilitas,
          kode_fasilitas: this.retriveRacModel.kode_fasilitas,
          updated_by: this.retriveRacModel.updated_by,
          min_pendapatan: this.retriveRacModel.min_pendapatan,
          min_masakerja: this.retriveRacModel.min_masakerja,
          lama_beroperasi: this.retriveRacModel.lama_beroperasi,
          jumlah_karyawan: this.retriveRacModel.jumlah_karyawan,
          tipe_perusahaan: this.retriveRacModel.tipe_perusahaan,
          active: this.retriveRacModel.active,
          created_by: this.retriveRacModel.created_by
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
    this.isDisabled = true;
    // Disabled Using FormControl
    this.storeRetriveCheckedSegmentasi.splice(0);
    this.checkboxSegmentasi.splice(0);
    this.scoringServices.getParameterRac(id).subscribe({
      next: response => {
        this.retriveRacModel = response.result.rac;
        this.retriveListParameterRacStatusKepegawaianModel = response.result.listStatusKepegawaian;
        this.retriveListParameterRacMinimalUsiaModel = response.result.listMinUsia;
        this.retriveListParameterRacSegmentasiModel = response.result.listSegmentasi;
        this.retriveListParameterRacMaxusiaModel = response.result.listRacMaxUsia;
        this.retriveListParameterRacMinmasakerjaModel = response.result.listRacMinMasaKerja;
        this.retriveListParameterRacJenisperusahaanModel = response.result.listJenisPerusahaan;

        // Start Retrive Checked not using FormArray
        this.retriveListParameterRacSegmentasiModel.forEach((value: parameterracsegmentasi, index: number) => {
          if (value.segmentasi == this.modelKategoriPekerjaan[index].category_job_deskripsi) {
            this.checkboxSegmentasi.push(
              this.modelKategoriPekerjaan[index].category_job_id + '|' + this.modelKategoriPekerjaan[index].category_job_deskripsi
            );
            this.dataEntryService.getFetchListTipePekerjaan(this.modelKategoriPekerjaan[index].category_job_id).subscribe(status => {
              this.modelTipePekerjaanFix = status.result;
            });
            this.storeCheckboxCondition = undefined;
          } else {
            this.checkboxSegmentasi.push(
              this.modelKategoriPekerjaan[index].category_job_id + '|' + this.modelKategoriPekerjaan[index].category_job_deskripsi
            );
            this.dataEntryService.getFetchListTipePekerjaan(this.modelKategoriPekerjaan[index].category_job_id).subscribe(status => {
              this.modelTipePekerjaanNon = status.result;
            });
            this.storeCheckboxCondition = index;
          }
        });
        // End Retrive Checked not using FormArray

        const retriveRAC = {
          id: id,
          fasilitas: this.retriveRacModel.jenis_fasilitas,
          segmentasi_fasilitas: this.retriveRacModel.segmentasi_fasilitas,
          kode_fasilitas: this.retriveRacModel.kode_fasilitas,
          updated_by: this.retriveRacModel.updated_by,
          min_pendapatan: this.retriveRacModel.min_pendapatan,
          min_masakerja: this.retriveRacModel.min_masakerja,
          lama_beroperasi: this.retriveRacModel.lama_beroperasi,
          jumlah_karyawan: this.retriveRacModel.jumlah_karyawan,
          tipe_perusahaan: this.retriveRacModel.tipe_perusahaan,
          active: this.retriveRacModel.active,
          created_by: this.retriveRacModel.created_by
        };
        this.createRacForm.setValue(retriveRAC);
        this.createRacForm.disable();
        this.modalServices.open(modals, { size: 'xl', windowClass: 'modal-xl' });
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
    //clear semua isi form saat click button add
    this.retriveListParameterRacMinimalUsiaModel.splice(0);
    this.retriveListParameterRacMaxusiaModel.splice(0);
    this.retriveListParameterRacMinmasakerjaModel.splice(0);
    this.retriveListParameterRacSegmentasiModel.splice(0);
    this.retriveListParameterRacStatusKepegawaianModel.splice(0);
    this.retriveListParameterRacJenisperusahaanModel.splice(0);
    // this.createRacForm.reset();
    //disable button dan checkbox
    this.isDisabled = false;
    // Open Modal
    this.modalServices.open(value, { size: 'xl', windowClass: 'modal-xl' });
  }

  public clickModalsClose() {
    this.modalServices.dismissAll();
  }
}
