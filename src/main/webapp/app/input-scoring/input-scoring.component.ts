/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { listScoring } from './listScoring.model';
import { InputScoringService } from './input-scoring.service';
import { inputModel } from './inputModel.model';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { mainparameterscoring } from './mainparameterscoring.model';
import { refJenisPekerjaan } from 'app/data-entry/services/config/refJenisPekerjaan.model';
import { refStatusPerkawinan } from 'app/data-entry/services/config/refStatusPerkawinan.model';
import { refListTipePerusahaan } from 'app/data-entry/services/config/refListTipePerusahaan.model';
import { refStatusRumah } from 'app/verification/service/config/refStatusRumah.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';
import { getProgramModel } from 'app/data-entry/services/config/getProgramModel.model';
import { refJabatan } from 'app/verification/service/config/refJabatan.model';

@Component({
  selector: 'jhi-input-scoring',
  templateUrl: './input-scoring.component.html',
  styleUrls: ['./input-scoring.component.scss'],
})
export class InputScoringComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  scoringForm!: FormGroup;
  submitted = false;
  listScoring: listScoring[] = [];
  listmainparameterscoring: mainparameterscoring[] = [];
  inputScoring: inputModel[] = [];

  @ViewChild(DataTableDirective, { static: true })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  listdatafasilitas: any;
  kirimanstatus: any;
  listparameterscoring: any;
  datascoringbyid: listScoring = new listScoring();
  getjoincome: any;
  modelPendidikan: refJenisPekerjaan[] = [];
  modelTujuanPembiayaan: refJenisPekerjaan[] = [];
  modelPekerjaan: refJenisPekerjaan[] = [];
  modelStatusPerkawinan: refStatusPerkawinan[] = [];
  modelJenisPerusahaan: refListTipePerusahaan[] = [];
  modelKepemilikanRumah: refStatusRumah[] = [];
  modelProgram: getProgramModel[] = [];
  modelFtvScore: listScoring[] = [];
  modelFtvScoreById: listScoring = new listScoring();

  constructor(
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected scoringServices: InputScoringService,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
    // this.scoringForm = this.formBuilder.group({
    //   data_value: '',
    //   joint_income: '',
    //   max_value: '',
    //   min_value: '',
    //   parameter: '',
    //   produk: '',
    //   score: '',
    // });
  }
  load(): void {
    this.getLoading(true);
    setTimeout(() => {
      this.scoringServices.getScoring().subscribe(data => {
        this.inputScoring = data.result;
      });
    }, 1);

    setTimeout(() => {
      this.dataEntryService.getFetchKodeFasilitas().subscribe(data => {
        this.listdatafasilitas = data.result;
      });
    }, 3);

    setTimeout(() => {
      this.scoringServices.listmainparameterscoring().subscribe(data => {
        this.listmainparameterscoring = data.result;
      });
    }, 5);

    setTimeout(() => {
      this.scoringServices.listparameterscoring().subscribe(data => {
        this.listparameterscoring = data.result;
      });
    }, 7);

    setTimeout(() => {
      this.dataEntryService.getListPendidikan().subscribe(pendidikan => {
        this.modelPendidikan = pendidikan.result;
      });
    }, 9);

    setTimeout(() => {
      this.dataEntryService.getFetchListJabatan().subscribe(pekerjaan => {
        this.modelPekerjaan = pekerjaan.result;
      });
    }, 15);

    setTimeout(() => {
      this.dataEntryService.getFetchStatusPerkawinan().subscribe(status => {
        this.modelStatusPerkawinan = status.result;
      });
    }, 18);

    setTimeout(() => {
      this.dataEntryService.getFetchTipePerusahaan().subscribe(perusahaan => {
        this.modelJenisPerusahaan = perusahaan.result;
      });
    }, 20);

    setTimeout(() => {
      this.verifikasiServices.getStatusRumah().subscribe(rumah => {
        this.modelKepemilikanRumah = rumah.result;
      });
    }, 12);

    setTimeout(() => {
      this.dataEntryService.getListprogram().subscribe(responseProgram => {
        this.modelProgram = responseProgram.result;
      });
    }, 25);

    setTimeout(() => {
      this.scoringServices.listFtvScoring().subscribe({
        next: ftvResponse => {
          this.modelFtvScore = ftvResponse.result;
          // console.warn(ftvResponse)
        },
      });
    }, 27);

    setTimeout(() => {
      this.scoringServices.listDataScoring().subscribe(data => {
        this.listScoring = data.result;
        this.getLoading(false);
        this.dtTrigger.next(this.listScoring);
      });
    }, 30);
  }

  cariButton(produk: string, joint: string, parameter: string, dataValue: string, score: string): void {
    $('#dataTables-example').DataTable().columns(1).search(produk).draw();
    $('#dataTables-example').DataTable().columns(2).search(joint).draw();
    $('#dataTables-example').DataTable().columns(3).search(parameter).draw();
    $('#dataTables-example').DataTable().columns(4).search(dataValue).draw();
    $('#dataTables-example').DataTable().columns(7).search(score).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
  }

  // ////////////// Pop Up Input Scoring ////////////////////////
  simpanData(): void {
    const baseURL = this.baseUrl;
    let options: any;
    let optionsfasilitas: any;
    let pendidikan: any;
    let tujuanPembiayaan: any;
    let jenisPekerjaan: any;
    let statusPerkawinan: any;
    let jenisPerusahaan: any;
    let kepemilikanRumah: any;
    let listProgram: any;
    let parameter: any;
    let programList: any;
    let slicePar: any;
    let fasVal: any;
    let progVal: any;
    let resultTujuanPembiayaan: any;
    let data: any;

    setTimeout(() => {
      options = this.listparameterscoring.map(
        (option: any) => `
          <option key="${option}" value="${option.parameter_type + '|' + option.parameter_description}">
              ${option.parameter_description}
          </option>
        `
      );
    }, 1);

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      optionsfasilitas = this.listdatafasilitas.map(
        (optionsfasilitasResponse: getListFasilitasModel) => `
          <option value="${optionsfasilitasResponse.kode_fasilitas}|${optionsfasilitasResponse.fasilitas}">
              ${optionsfasilitasResponse.fasilitas}
          </option>
        `
      );
    }, 2);

    // /////////////// Pendidikan /////////////////////////////////
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      pendidikan = this.modelPendidikan.map(
        (pendidikan: refJenisPekerjaan) => `
          <option key="${pendidikan}" value="${pendidikan.deskripsi}">
              ${pendidikan.deskripsi}
          </option>
        `
      );
    }, 4);
    // /////////////// Pendidikan /////////////////////////////////

    // /////////////// Pekerjaan /////////////////////////////////
    setTimeout(() => {
      jenisPekerjaan = this.modelPekerjaan.map(
        (pekerjaan: refJabatan) => `
          <option value="${pekerjaan.jabatan_deskripsi}">
              ${pekerjaan.jabatan_deskripsi}
          </option>
        `
      );
    }, 8);
    // /////////////// Pekerjaan /////////////////////////////////

    // /////////////// Status Perkawinan /////////////////////////////////
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      statusPerkawinan = this.modelStatusPerkawinan.map(
        (statusPerkawinan: refStatusPerkawinan) => `
          <option key="${statusPerkawinan}" value="${statusPerkawinan.deskripsi}">
              ${statusPerkawinan.deskripsi}
          </option>
        `
      );
    }, 10);
    // /////////////// Status Perkawinan /////////////////////////////////

    // /////////////// Jenis Perusahaan /////////////////////////////////
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      jenisPerusahaan = this.modelJenisPerusahaan.map(
        (jenisPerusahaan: refListTipePerusahaan) => `
          <option key="${jenisPerusahaan}" value="${jenisPerusahaan.company_deskripsi}">
              ${jenisPerusahaan.company_deskripsi}
          </option>
        `
      );
    }, 12);
    // /////////////// Jenis Perusahaan /////////////////////////////////

    // /////////////// Kepemilikan Rumah /////////////////////////////////
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      kepemilikanRumah = this.modelKepemilikanRumah.map(
        (kepemilikanRumah: refStatusRumah) => `
          <option key="${kepemilikanRumah}" value="${kepemilikanRumah.description}">
              ${kepemilikanRumah.description}
          </option>
        `
      );
    }, 14);
    // /////////////// Kepemilikan Rumah /////////////////////////////////

    // /////////////// Program ///////////////////////////////
    let listProgramOptions: any;
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      listProgramOptions = this.modelProgram.map(
        (programOptions: getProgramModel) => `
          <option key="${programOptions}" value="${programOptions.kode_program}|${programOptions.program}">
              ${programOptions.program}
          </option>
        `
      );
    }, 16);
    // /////////////// Program ///////////////////////////////

    setTimeout(() => {
      $(document).ready(function () {
        $('#parameter').change(function () {
          parameter = $(this).val();
          const parameterValue = parameter.split('|');
          if (parameterValue[0] === '1') {
            $('#minMaxDiv').hide();
            $('#dataValueDiv').show();
          } else {
            $('#minMaxDiv').show();
            $('#dataValueDiv').hide();
          }

          if (parameterValue[1] === 'Pendidikan') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#pendidikanDiv').show();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
          } else if (parameterValue[1] === 'Tujuan Pembiayaan') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#tujuanPembiayaanDiv').show();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#pendidikanDiv').hide();
          } else if (parameterValue[1] === 'Status Perkawinan') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#statusPerkawinanDiv').show();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
          } else if (parameterValue[1] === 'Tingkat Jabatan') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#jenisPekerjaanDiv').show();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
          } else if (parameterValue[1] === 'Kepemilikan Tempat Tinggal') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#kepemilikanRumahDiv').show();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
            $('#jenisPerusahaanDiv').hide();
          } else if (parameterValue[1] === 'Jenis Perusahaan') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#jenisPerusahaanDiv').show();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
          } else if (parameterValue[1] === 'Verifikasi Alamat Tinggal' || parameterValue[1] === 'Verifikasi THP') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').show();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
          } else if (parameterValue[1] === 'Kepemilikan Rekening') {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').show();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
          } else if (
            parameterValue[1] === 'Kualitas Pembiayaan - Kartu Kredit' ||
            parameterValue[1] === 'Kualitas Pembiayaan - Non Kartu Kredit'
          ) {
            $('#kualitasPembiayaanDiv').show();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').hide();
            $('#valueYaTidak').hide();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
          } else {
            $('#kualitasPembiayaanDiv').hide();
            $('#kepemilikanRekeningDiv').hide();
            $('#keyInDiv').show();
            $('#valueYaTidak').hide();
            $('#jenisPerusahaanDiv').hide();
            $('#kepemilikanRumahDiv').hide();
            $('#jenisPekerjaanDiv').hide();
            $('#statusPerkawinanDiv').hide();
            $('#tujuanPembiayaanDiv').hide();
            $('#pendidikanDiv').hide();
          }
        });
        let pro: any;
        let low: any;
        $('#fasilitasOption').change(function () {
          pro = $(this).val();
          low = pro.split('|');
          $('#programffff').empty();
          programList = '<option value="">Pilih Data</option>';
          $('#programffff').append(programList);

          $('[name="tujuan_pem"]').empty();
          tujuanPembiayaan = '<option value="">Pilih Data</option>';
          $('[name="tujuan_pem"]').append(tujuanPembiayaan);
          if (low[0] === '') {
            $('#programffff').append(listProgramOptions);
          } else {
            fetch(baseURL + 'v1/efos-de/list_program?sp=' + low[0])
              .then(function (response) {
                return response.json();
              })
              .then(data => {
                listProgram = data.result;
                programList = listProgram.map((programListRes: getProgramModel) => {
                  programList =
                    '<option value="' +
                    programListRes.kode_program +
                    '|' +
                    programListRes.program +
                    '">' +
                    programListRes.program +
                    '</option>';
                  $('#programffff').append(programList);
                });
              })
              .catch(err => {
                console.warn(`Error fetching: ${err}`);
              });

            fetch(baseURL + 'v1/efos-ref/list_tujuan_pembiayaan?sf=' + low[1])
              .then(function (response) {
                return response.json();
              })
              .then(data => {
                resultTujuanPembiayaan = data.result;
                tujuanPembiayaan = resultTujuanPembiayaan.map((responseTujuanPembiayaan: refJenisPekerjaan) => {
                  tujuanPembiayaan =
                    '<option value="' + responseTujuanPembiayaan.deskripsi + '">' + responseTujuanPembiayaan.deskripsi + '</option>';
                  $('[name="tujuan_pem"]').append(tujuanPembiayaan);
                });
              })
              .catch(err => {
                console.warn(`Error fetching: ${err}`);
              });
          }
        });

        $('[name="yaDanTidak"]').change(function () {
          data = $(this).val();
          $('#data_value').val(data);
        });

        $('[name="tujuan_pem"]').change(function () {
          data = $(this).val();
          $('#data_value').val(data);
        });
      });

      Swal.fire({
        title: 'Input Scoring',
        html:
          '<br />' +
          '<div class="row form-material" style="width:100%"><div class="form-group row">' +
          '<label class="col-sm-3 col-form-label" style="font-size: medium;">Fasilitas</label>' +
          '<div class="col-sm-9"><select class="form-control" id="fasilitasOption"><option value="' +
          '' +
          '|' +
          '' +
          '">Pilih Data</option>' +
          '<option value="' +
          '' +
          '|ALL">ALL</option>' +
          `${optionsfasilitas}` +
          '</select>' +
          '</div></div><p></p>' +
          '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Program</label>' +
          '<div class="col-sm-9"><select id="programffff" class="form-control"><option value="">Pilih Data</option></select>' +
          '</div></div><p></p>' +
          '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Parameter</label>' +
          '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Data</option>' +
          `${options}` +
          '</select>' +
          '</div></div><p></p>' +
          '<div class="form-group row" id="dataValueDiv" style="display: none;"><label class="col-sm-3 col-form-label" style="font-size: medium;">Data Value</label>' +
          '<div class="col-sm-9" id="keyInDiv" style="display: none;"><input type="text" class="form-control" id="data_value"/></div>' +
          '<div class="col-sm-9" id="valueYaTidak" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option><option value="Sesuai">Sesuai</option><option value="Tidak Sesuai">Tidak Sesuai</option></select></div>' +
          '<div class="col-sm-9" id="pendidikanDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          `${pendidikan}` +
          '</select></div>' +
          '<div class="col-sm-9" id="tujuanPembiayaanDiv" style="display: none;"><select class="form-control" id="data_value" name="tujuan_pem"><option value="">Pilih Data</option>' +
          '</select></div>' +
          '<div class="col-sm-9" id="statusPerkawinanDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          `${statusPerkawinan}` +
          '</select></div>' +
          '<div class="col-sm-9" id="jenisPekerjaanDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          `${jenisPekerjaan}` +
          '</select></div>' +
          '<div class="col-sm-9" id="kepemilikanRumahDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          `${kepemilikanRumah}` +
          '</select></div>' +
          '<div class="col-sm-9" id="jenisPerusahaanDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          `${jenisPerusahaan}` +
          '</select></div>' +
          '<div class="col-sm-9" id="kepemilikanRekeningDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          '<option value="Tabungan, Giro dan Deposito">Tabungan, Giro dan Deposito</option><option value="Tabungan, Giro/Deposito">Tabungan, Giro/Deposito</option><option value="Tabungan">Tabungan</option>' +
          '</select></div>' +
          '<div class="col-sm-9" id="kualitasPembiayaanDiv" style="display: none;"><select class="form-control" id="data_value" name="yaDanTidak"><option value="">Pilih Data</option>' +
          '<option value="Lunas-Baik">Lunas-Baik</option><option value="Cicilan-Baik">Cicilan-Baik</option><option value="Not Found">Not Found</option>' +
          '</select></div>' +
          '</div><p></p>' +
          '<div class="form-group row" id="minMaxDiv"><label class="col-sm-3 col-form-label" style="font-size: medium;">Min / Max</label>' +
          '<div class="col-sm-3"><input type="number" class="form-control" id="min"></div>Min<div class="col-sm-3"><input type="number" class="form-control" id="max"></div>Max' +
          '</div><p></p>' +
          '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Score</label>' +
          '<div class="col-sm-9"><input type="number" class="form-control" id="score">' +
          '</div></div><p></p>' +
          '<div>',
        showCancelButton: true,
        confirmButtonColor: '#202020',
        cancelButtonColor: '#e06666',
        confirmButtonText: 'Updated Data',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        allowOutsideClick: false,
      }).then(result => {
        fasVal = $('#fasilitasOption').val();
        progVal = $('#programffff').val();
        const fasValPot = fasVal.split('|');
        const joVal = progVal.split('|');
        slicePar = $('#parameter').val();
        const parVal = slicePar.split('|');
        const datVal = $('#data_value').val();
        const miVal = $('#min').val();
        const maVal = $('#max').val();
        const scVal = $('#score').val();
        // if (fasValPot === '') {
        //   alert('Gagal Menyimpan Produk Belum dipilih');
        //   return;
        // } else if (joVal === '') {
        //   alert('Gagal Menyimpan Joint Income Belum dipilih');
        //   return;
        // } else if (parVal === '') {
        //   alert('Gagal Menyimpan Parameter Belum dipilih');
        //   return;
        // } else if (parVal[0] === '1' && datVal === '') {
        //   alert('Gagal Menyimpan Data Value Belum diisi');
        //   return;
        // } else if (parVal[0] === '0' && miVal === '') {
        //   alert('Gagal Menyimpan Min Value Belum diisi');
        //   return;
        // } else if (parVal[0] === '0' && maVal === '') {
        //   alert('Gagal Menyimpan Max Value Belum diisi');
        //   return;
        // } else if (scVal === '') {
        //   alert('Gagal Menyimpan Score Belum diisi');
        //   return;
        // } else {
        if (result.isConfirmed) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-ref/create_data_scoring', {
              active: '1',
              id: 0,
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
              created_date: '',
              data_value: datVal,
              joint_income: '',
              max_value: maVal,
              min_value: miVal,
              parameter_type: parVal[0],
              parameter: parVal[1],
              kode_fasilitas: fasValPot[0],
              produk: fasValPot[1],
              score: scVal,
              kode_program: joVal[0],
              deskripsi_program: joVal[1],
              updated_by: '',
              updated_date: '',
            })
            .subscribe({
              next() {
                Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                  window.location.reload();
                });
              },
            });
        }
        // }
      });
    }, 20);
  }

  viewdetaildatascoring(idScore: any): void {
    const baseURL = this.baseUrl;
    let options: any;
    let optionsfasilitas: any;
    let pendidikan: any;
    let tujuanPembiayaan: any;
    let jenisPekerjaan: any;
    let statusPerkawinan: any;
    let jenisPerusahaan: any;
    let kepemilikanRumah: any;
    let getByIdParameter: any;
    let getByIdParameterDesc: any;
    let getByIdFasilitas: any;
    let getByIdProukFasilitas: any;
    let slicePar: any;
    let fasVal: any;
    let progVal: any;
    let listProgramOptions: any;
    let listProgram: any;
    let programList: any;
    let getListProgram: any;
    let getProgramList: any;
    let getProgram: any;
    let splitProgram: any;
    let resultTujuanPembiayaan: any;

    setTimeout(() => {
      options = this.listparameterscoring.map(
        (option: any) => `
          <option key="${option}" value="${option.parameter_type + '|' + option.parameter_description}">
              ${option.parameter_description}
          </option>
        `
      );
    }, 1);

    setTimeout(() => {
      optionsfasilitas = this.listdatafasilitas.map(
        (optionsfasilitas: getListFasilitasModel) => `
          <option value="${optionsfasilitas.kode_fasilitas}|${optionsfasilitas.fasilitas}">
              ${optionsfasilitas.fasilitas}
          </option>
        `
      );
    }, 2);

    setTimeout(() => {
      // /////////////// Pendidikan /////////////////////////////////
      pendidikan = this.modelPendidikan.map(
        (pendidikan: refJenisPekerjaan) => `
          <option key="${pendidikan}" value="${pendidikan.deskripsi}">
              ${pendidikan.deskripsi}
          </option>
        `
      );
      // /////////////// Pendidikan /////////////////////////////////
    }, 3);

    // setTimeout(() => {
    //   // /////////////// Tujuan Pembiayaan /////////////////////////////////
    //   tujuanPembiayaan = this.modelTujuanPembiayaan.map(
    //     (tujuan: refJenisPekerjaan) => `
    //       <option key="${tujuan}" value="${tujuan.deskripsi}">
    //           ${tujuan.deskripsi}
    //       </option>
    //     `
    //   );
    //   // /////////////// Tujuan Pembiayaan /////////////////////////////////
    // }, 5);

    setTimeout(() => {
      // /////////////// Pekerjaan /////////////////////////////////
      jenisPekerjaan = this.modelPekerjaan.map(
        (pekerjaan: refJabatan) => `
          <option key="${pekerjaan}" value="${pekerjaan.jabatan_deskripsi}">
              ${pekerjaan.jabatan_deskripsi}
          </option>
        `
      );
      // /////////////// Pekerjaan /////////////////////////////////
    }, 7);

    setTimeout(() => {
      // /////////////// Status Perkawinan /////////////////////////////////
      statusPerkawinan = this.modelStatusPerkawinan.map(
        (statusPerkawinan: refStatusPerkawinan) => `
          <option key="${statusPerkawinan}" value="${statusPerkawinan.deskripsi}">
              ${statusPerkawinan.deskripsi}
          </option>
        `
      );
      // /////////////// Status Perkawinan /////////////////////////////////
    }, 9);

    setTimeout(() => {
      // /////////////// Jenis Perusahaan /////////////////////////////////
      jenisPerusahaan = this.modelJenisPerusahaan.map(
        (jenisPerusahaan: refListTipePerusahaan) => `
          <option key="${jenisPerusahaan}" value="${jenisPerusahaan.company_deskripsi}">
              ${jenisPerusahaan.company_deskripsi}
          </option>
        `
      );
      // /////////////// Jenis Perusahaan /////////////////////////////////
    }, 11);

    setTimeout(() => {
      // /////////////// Kepemilikan Rumah /////////////////////////////////
      kepemilikanRumah = this.modelKepemilikanRumah.map(
        (kepemilikanRumah: refStatusRumah) => `
          <option key="${kepemilikanRumah}" value="${kepemilikanRumah.description}">
              ${kepemilikanRumah.description}
          </option>
        `
      );
      // /////////////// Kepemilikan Rumah /////////////////////////////////
    }, 13);

    // /////////////// Program ///////////////////////////////
    setTimeout(() => {
      listProgramOptions = this.modelProgram.map(
        (programOptions: getProgramModel) => `
          <option key="${programOptions}" value="${programOptions.kode_program}|${programOptions.program}">
              ${programOptions.program}
          </option>
        `
      );
    }, 15);
    // /////////////// Program ///////////////////////////////

    setTimeout(() => {
      this.scoringServices.getdatascoringdetailbyid(idScore).subscribe({
        next: data => {
          this.datascoringbyid = data.result;
          getByIdParameterDesc = this.datascoringbyid.parameter;
          getByIdParameter = data.result.parameter_type;
          getByIdFasilitas = data.result.kode_fasilitas;
          getByIdProukFasilitas = data.result.produk;
          let parameter: any;
          let dataSelect: any;
          $(document).ready(function () {
            // alert(getByIdParameter === '1')
            if (getByIdParameter === '1') {
              $('#minMaxDiv').hide();
              $('#dataValueDiv').show();
            } else {
              $('#minMaxDiv').show();
              $('#dataValueDiv').hide();
            }
            // alert(getByIdParameterDesc)
            if (getByIdParameterDesc === 'Pendidikan') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#pendidikanDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (getByIdParameterDesc === 'Tujuan Pembiayaan') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#tujuanPembiayaanDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (getByIdParameterDesc === 'Status Perkawinan') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#statusPerkawinanDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (getByIdParameterDesc === 'Tingkat Jabatan') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#jenisPekerjaanDiv').show();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (getByIdParameterDesc === 'Kepemilikan Tempat Tinggal') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#kepemilikanRumahDiv').show();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#jenisPerusahaanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (getByIdParameterDesc === 'Jenis Perusahaan') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#jenisPerusahaanDiv').show();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (getByIdParameterDesc === 'Verifikasi Alamat Tinggal' || getByIdParameterDesc === 'Verifikasi THP') {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else if (
              getByIdParameterDesc === 'Kualitas Pembiayaan - Kartu Kredit' ||
              getByIdParameterDesc === 'Kualitas Pembiayaan - Non Kartu Kredit'
            ) {
              $('#kepemilikanRekeningDiv').hide();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#kualitasPembiayaanDiv').show();
            } else if (getByIdParameterDesc === 'Kepemilikan Rekening') {
              $('#kepemilikanRekeningDiv').show();
              $('#keyInDiv').hide();
              $('#valueYaTidak').hide();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
            } else {
              $('#kepemilikanRekeningDiv').hide();
              $('#kualitasPembiayaanDiv').hide();
              $('#keyInDiv').show();
              $('#valueYaTidak').hide();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
            }

            if (getByIdFasilitas === 'ALL') {
              $('#programOptions').append(listProgramOptions);
            } else {
              fetch(baseURL + 'v1/efos-de/list_program?sp=' + getByIdFasilitas)
                .then(function (response) {
                  return response.json();
                })
                .then(data => {
                  getListProgram = data.result;
                  getProgramList = getListProgram.map((getProgramListRes: getProgramModel) => {
                    getProgramList =
                      '<option value="' +
                      getProgramListRes.kode_program +
                      '|' +
                      getProgramListRes.program +
                      '">' +
                      getProgramListRes.program +
                      '</option>';
                    $('#programOptions').append(getProgramList);
                  });
                })
                .catch(err => {
                  console.warn(`Error fetching: ${err}`);
                });

              fetch(baseURL + 'v1/efos-ref/list_tujuan_pembiayaan?sf=' + getByIdProukFasilitas)
                .then(function (response) {
                  return response.json();
                })
                .then(data => {
                  resultTujuanPembiayaan = data.result;
                  tujuanPembiayaan = resultTujuanPembiayaan.map((responseTujuanPembiayaan: refJenisPekerjaan) => {
                    tujuanPembiayaan =
                      '<option value="' + responseTujuanPembiayaan.deskripsi + '">' + responseTujuanPembiayaan.deskripsi + '</option>';
                    $('[name="tujuan_pem"]').append(tujuanPembiayaan);
                  });
                })
                .catch(err => {
                  console.warn(`Error fetching: ${err}`);
                });
            }
            $('#parameter').change(function () {
              parameter = $(this).val();
              const parameterValue = parameter.split('|');
              if (parameterValue[0] === '1') {
                $('#minMaxDiv').hide();
                $('#dataValueDiv').show();
                $('#min').val('');
                $('#max').val('');
              } else {
                $('#minMaxDiv').show();
                $('#dataValueDiv').hide();
                $('#data_value').val('');
              }

              if (parameterValue[1] === 'Pendidikan') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#pendidikanDiv').show();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
              } else if (parameterValue[1] === 'Tujuan Pembiayaan') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#tujuanPembiayaanDiv').show();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#pendidikanDiv').hide();
              } else if (parameterValue[1] === 'Status Perkawinan') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#statusPerkawinanDiv').show();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
              } else if (parameterValue[1] === 'Tingkat Jabatan') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#jenisPekerjaanDiv').show();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
              } else if (parameterValue[1] === 'Kepemilikan Tempat Tinggal') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#kepemilikanRumahDiv').show();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
                $('#jenisPerusahaanDiv').hide();
              } else if (parameterValue[1] === 'Jenis Perusahaan') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#jenisPerusahaanDiv').show();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
              } else if (parameterValue[1] === 'Verifikasi Alamat Tinggal' || parameterValue[1] === 'Verifikasi THP') {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').show();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
              } else if (parameterValue[1] === 'Kepemilikan Rekening') {
                $('#kepemilikanRekeningDiv').show();
                $('#kualitasPembiayaanDiv').hide();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
              } else if (
                parameterValue[1] === 'Kualitas Pembiayaan - Kartu Kredit' ||
                parameterValue[1] === 'Kualitas Pembiayaan - Non Kartu Kredit'
              ) {
                $('#kepemilikanRekeningDiv').hide();
                $('#kualitasPembiayaanDiv').show();
                $('#keyInDiv').hide();
                $('#valueYaTidak').hide();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
              } else {
                $('#kepemilikanRekeningDiv').hide();
                $('#keyInDiv').show();
                $('#valueYaTidak').hide();
                $('#jenisPerusahaanDiv').hide();
                $('#kepemilikanRumahDiv').hide();
                $('#jenisPekerjaanDiv').hide();
                $('#statusPerkawinanDiv').hide();
                $('#tujuanPembiayaanDiv').hide();
                $('#pendidikanDiv').hide();
              }
            });

            $('#fasilitasOptions').change(function () {
              getProgram = $(this).val();
              splitProgram = getProgram.split('|');
              $('#programOptions').empty();
              programList = '<option value="">Pilih Data</option>';
              $('#programOptions').append(programList);

              $('[name="tujuan_pem"]').empty();
              tujuanPembiayaan = '<option value="">Pilih Data</option>';
              $('[name="tujuan_pem"]').append(tujuanPembiayaan);

              if (splitProgram[0] === '') {
                $('#programOptions').append(listProgramOptions);
              } else {
                fetch(baseURL + 'v1/efos-de/list_program?sp=' + splitProgram[0])
                  .then(function (response) {
                    return response.json();
                  })
                  .then(data => {
                    listProgram = data.result;
                    programList = listProgram.map((programListRes: getProgramModel) => {
                      programList =
                        '<option value="' +
                        programListRes.kode_program +
                        '|' +
                        programListRes.program +
                        '">' +
                        programListRes.program +
                        '</option>';
                      $('#programOptions').append(programList);
                    });
                  })
                  .catch(err => {
                    console.warn(`Error fetching: ${err}`);
                  });

                fetch(baseURL + 'v1/efos-ref/list_tujuan_pembiayaan?sf=' + splitProgram[1])
                  .then(function (response) {
                    return response.json();
                  })
                  .then(data => {
                    resultTujuanPembiayaan = data.result;
                    tujuanPembiayaan = resultTujuanPembiayaan.map((responseTujuanPembiayaan: refJenisPekerjaan) => {
                      tujuanPembiayaan =
                        '<option value="' + responseTujuanPembiayaan.deskripsi + '">' + responseTujuanPembiayaan.deskripsi + '</option>';
                      $('[name="tujuan_pem"]').append(tujuanPembiayaan);
                    });
                  })
                  .catch(err => {
                    console.warn(`Error fetching: ${err}`);
                  });
              }
            });

            $('[name="valueSelect"]').change(function () {
              dataSelect = $(this).val();
              $('#data_value').val(dataSelect);
            });

            $('[name="tujuan_pem"]').change(function () {
              dataSelect = $(this).val();
              $('#data_value').val(dataSelect);
            });
          });

          // setTimeout(() => {
          Swal.fire({
            title: 'Input Scoring',
            html:
              '<br />' +
              '<div class="row form-material" style="width:100%"><div class="form-group row">' +
              '<label class="col-sm-3 col-form-label" style="font-size: medium;">Fasilitas</label>' +
              '<div class="col-sm-9"><select class="form-control" id="fasilitasOptions"><option value="' +
              this.datascoringbyid.kode_fasilitas +
              '|' +
              this.datascoringbyid.produk +
              '">' +
              this.datascoringbyid.produk +
              '</option>' +
              '<option value="' +
              '' +
              '|ALL">ALL</option>' +
              `${optionsfasilitas}` +
              '</select>' +
              '</div></div><p></p>' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Program</label>' +
              '<div class="col-sm-9"><select id="programOptions" class="form-control"><option value="' +
              this.datascoringbyid.kode_program +
              '|' +
              this.datascoringbyid.deskripsi_program +
              '">' +
              this.datascoringbyid.deskripsi_program +
              '</option></select>' +
              '</div></div><p></p>' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Parameter</label>' +
              '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="' +
              this.datascoringbyid.parameter_type +
              '|' +
              this.datascoringbyid.parameter +
              '">' +
              this.datascoringbyid.parameter +
              '</option>' +
              `${options}` +
              '</select>' +
              '</div></div><p></p>' +
              '<div class="form-group row" id="dataValueDiv" style="display: none;"><label class="col-sm-3 col-form-label" style="font-size: medium;">Data Value</label>' +
              '<div class="col-sm-9" id="keyInDiv"><input type="text" class="form-control" id="data_value" name="valueSelect" value="' +
              this.datascoringbyid.data_value +
              '"/></div>' +
              '<div class="col-sm-9" id="valueYaTidak" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option><option value="Sesuai">Sesuai</option><option value="Tidak Sesuai">Tidak Sesuai</option></select></div>' +
              '<div class="col-sm-9" id="pendidikanDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              `${pendidikan}` +
              '</select></div>' +
              '<div class="col-sm-9" id="tujuanPembiayaanDiv" style="display: none;"><select class="form-control" id="data_value" name="tujuan_pem"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              '</select></div>' +
              '<div class="col-sm-9" id="statusPerkawinanDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              `${statusPerkawinan}` +
              '</select></div>' +
              '<div class="col-sm-9" id="jenisPekerjaanDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              `${jenisPekerjaan}` +
              '</select></div>' +
              '<div class="col-sm-9" id="kepemilikanRumahDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              `${kepemilikanRumah}` +
              '</select></div>' +
              '<div class="col-sm-9" id="kepemilikanRekeningDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              '<option value="Tabungan, Giro dan Deposito">Tabungan, Giro dan Deposito</option><option value="Tabungan, Giro/Deposito">Tabungan, Giro/Deposito</option><option value="Tabungan">Tabungan</option>' +
              '</select></div>' +
              '<div class="col-sm-9" id="kualitasPembiayaanDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              '<option value="Lunas-Baik">Lunas-Baik</option><option value="Cicilan-Baik">Cicilan-Baik</option><option value="Not Found">Not Found</option>' +
              '</select></div>' +
              '<div class="col-sm-9" id="jenisPerusahaanDiv" style="display: none;"><select class="form-control" id="data_value" name="valueSelect"><option value="' +
              this.datascoringbyid.data_value +
              '">' +
              this.datascoringbyid.data_value +
              '</option>' +
              `${jenisPerusahaan}` +
              '</select></div>' +
              '</div><p></p>' +
              '<div class="form-group row" id="minMaxDiv" style="display: none;"><label class="col-sm-3 col-form-label" style="font-size: medium;">Min / Max</label>' +
              '<div class="col-sm-3"><input type="number" class="form-control" id="min" value="' +
              this.datascoringbyid.min_value +
              '"></div>Min<div class="col-sm-3"><input type="number" class="form-control" id="max" value="' +
              this.datascoringbyid.max_value +
              '"></div>Max' +
              '</div><p></p>' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Score</label>' +
              '<div class="col-sm-9"><input type="number" class="form-control" id="score" value="' +
              this.datascoringbyid.score +
              '">' +
              '</div></div>' +
              '<div>',
            showCancelButton: true,
            confirmButtonColor: '#202020',
            cancelButtonColor: '#e06666',
            confirmButtonText: 'Updated Data',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            allowOutsideClick: false,
          }).then(result => {
            fasVal = $('#fasilitasOptions').val();
            progVal = $('#programOptions').val();
            const fasValPot = fasVal.split('|');
            const joVal = progVal.split('|');
            slicePar = $('#parameter').val();
            const parVal = slicePar.split('|');
            const datVal = $('#data_value').val();
            const miVal = $('#min').val();
            const maVal = $('#max').val();
            const scVal = $('#score').val();
            // alert(parVal)
            // if (fasValPot === '') {
            //   alert('Gagal Menyimpan Produk Belum dipilih');
            //   return;
            // } else if (joVal === '') {
            //   alert('Gagal Menyimpan Joint Income Belum dipilih');
            //   return;
            // } else if (parVal === '') {
            //   alert('Gagal Menyimpan Parameter Belum dipilih');
            //   return;
            // } else if (parVal[0] === '1' && datVal === '') {
            //   alert('Gagal Menyimpan Data Value Belum diisi');
            //   return;
            // } else if (parVal[0] === '0' && miVal === '') {
            //   alert('Gagal Menyimpan Min Value Belum diisi');
            //   return;
            // } else if (parVal[0] === '0' && maVal === '') {
            //   alert('Gagal Menyimpan Max Value Belum diisi');
            //   return;
            // } else if (scVal === '') {
            //   alert('Gagal Menyimpan Score Belum diisi');
            //   return;
            // } else {
            if (result.isConfirmed) {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-ref/create_data_scoring', {
                  active: '1',
                  id: idScore,
                  created_by: this.sessionStorageService.retrieve('sessionUserName'),
                  created_date: '',
                  data_value: datVal,
                  joint_income: '',
                  max_value: maVal,
                  min_value: miVal,
                  parameter_type: parVal[0],
                  parameter: parVal[1],
                  kode_fasilitas: fasValPot[0],
                  produk: fasValPot[1],
                  score: scVal,
                  kode_program: joVal[0],
                  deskripsi_program: joVal[1],
                  updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                  updated_date: '',
                })
                .subscribe({
                  next() {
                    Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                      window.location.reload();
                    });
                  },
                });
            }
            // }
          });
          // }, id * 10);
        },
      });
    }, 17);
  }

  deleteData(idScore: any): void {
    setTimeout(() => {
      this.scoringServices.getdatascoringdetailbyid(idScore).subscribe({
        next: data => {
          this.datascoringbyid = data.result;
          Swal.fire({
            title: 'Apakah anda Yakin ingin menghapus data ini?',
            showDenyButton: true,
            confirmButtonText: 'Ya, Menghapus data!',
            denyButtonText: `Tidak, Tetap simpan data!`,
          }).then(result => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-ref/create_data_scoring', {
                  id: idScore,
                  created_by: this.sessionStorageService.retrieve('sessionUserName'),
                  created_date: '',
                  data_value: this.datascoringbyid.data_value,
                  joint_income: this.datascoringbyid.joint_income,
                  max_value: this.datascoringbyid.max_value,
                  min_value: this.datascoringbyid.min_value,
                  parameter_type: this.datascoringbyid.parameter_type,
                  parameter: this.datascoringbyid.parameter,
                  kode_fasilitas: this.datascoringbyid.kode_fasilitas,
                  produk: this.datascoringbyid.produk,
                  score: this.datascoringbyid.score,
                  kode_program: this.datascoringbyid.kode_program,
                  deskripsi_program: this.datascoringbyid.deskripsi_program,
                  updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                  updated_date: '',
                  active: '0',
                })
                .subscribe({
                  next() {
                    Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                      window.location.reload();
                    });
                  },
                });
            }
            // else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            // }
          });
        },
      });
    }, 17);
  }

  tambahFtvScore(id: any): any {
    Swal.fire({
      title: 'Apakah anda Yakin ingin Menambah data Score FTV ini?',
      html:
        '<br />' +
        '<div class="row form-material" style="width:100%">' +
        '<div class="form-group row">' +
        '<label class="col-sm-5 col-form-label" style="font-size: medium;">Score Lebih dari DP</label>' +
        '<div class="col-sm-7"><input id="score_ftv_less" class="form-control"/>' +
        '</div></div><p></p>' +
        '<div class="form-group row">' +
        '<label class="col-sm-5 col-form-label" style="font-size: medium;">Score sama dengan DP</label>' +
        '<div class="col-sm-7"><input id="score_ftv_equal" class="form-control"/>' +
        '</div></div><p></p>' +
        '</div>',
      showDenyButton: true,
      confirmButtonText: 'Ya, Tambah data!',
      denyButtonText: `Tidak!`,
    }).then(result => {
      const scoreFtvLess = $('#score_ftv_less').val();
      const scoreFtvEqual = $('#score_ftv_equal').val();
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_scoring', {
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            id: 0,
            id_ftv_dp_detail: id,
            score_ftv_equal: scoreFtvEqual,
            score_ftv_less: scoreFtvLess,
            updated_by: '' /* this.sessionStorageService.retrieve('sessionUserName') */,
            updated_date: '',
          })
          .subscribe({
            next() {
              Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                window.location.reload();
              });
            },
          });
      }
      // else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }
    });
  }

  editScoreFtv(idScore: any): void {
    this.scoringServices.getFtvScoring(idScore).subscribe(scoreById => {
      this.modelFtvScoreById = scoreById.result;

      Swal.fire({
        title: 'Apakah anda Yakin ingin Menambah data Score FTV ini?',
        html:
          '<br />' +
          '<div class="row form-material" style="width:100%">' +
          '<div class="form-group row">' +
          '<label class="col-sm-5 col-form-label" style="font-size: medium;">Score Lebih dari DP</label>' +
          '<div class="col-sm-7"><input id="score_ftv_less" class="form-control" value="' +
          this.modelFtvScoreById.score_ftv_less +
          '"/>' +
          '</div></div><p></p>' +
          '<div class="form-group row">' +
          '<label class="col-sm-5 col-form-label" style="font-size: medium;">Score sama dengan DP</label>' +
          '<div class="col-sm-7"><input id="score_ftv_equal" class="form-control" value="' +
          this.modelFtvScoreById.score_ftv_equal +
          '"/>' +
          '</div></div><p></p>' +
          '</div>',
        showDenyButton: true,
        confirmButtonText: 'Ya, Tambah data!',
        denyButtonText: `Tidak!`,
      }).then(result => {
        const scoreFtvLess = $('#score_ftv_less').val();
        const scoreFtvEqual = $('#score_ftv_equal').val();
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_scoring', {
              created_by: '' /* this.sessionStorageService.retrieve('sessionUserName') */,
              created_date: '',
              id: idScore,
              id_ftv_dp_detail: this.modelFtvScoreById.id_ftv_dp_detail,
              score_ftv_equal: scoreFtvEqual,
              score_ftv_less: scoreFtvLess,
              updated_by: this.sessionStorageService.retrieve('sessionUserName'),
              updated_date: '',
            })
            .subscribe({
              next() {
                Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                  window.location.reload();
                });
              },
            });
        }
        // else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }
      });
    });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
