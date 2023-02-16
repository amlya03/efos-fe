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
      this.dataEntryService.getFetchTujuanPembiayaan('PPR').subscribe(tujuan => {
        this.modelTujuanPembiayaan = tujuan.result;
      });
    }, 12);

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
    }, 25);

    setTimeout(() => {
      this.scoringServices.listDataScoring().subscribe(data => {
        this.listScoring = data.result;
        this.dtTrigger.next(data.result);
        this.getLoading(false);
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
    const options = this.listparameterscoring.map(
      (option: any) => `
        <option key="${option}" value="${option.parameter_type + '|' + option.parameter_description}">
            ${option.parameter_description}
        </option>
      `
    );

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const optionsfasilitas = this.listdatafasilitas.map(
      (optionsfasilitas: any) => `
        <option key="${optionsfasilitas}" value="${optionsfasilitas.fasilitas}">
            ${optionsfasilitas.fasilitas}
        </option>
      `
    );

    // /////////////// Pendidikan /////////////////////////////////
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const pendidikan = this.modelPendidikan.map(
      (pendidikan: refJenisPekerjaan) => `
        <option key="${pendidikan}" value="${pendidikan.deskripsi}">
            ${pendidikan.deskripsi}
        </option>
      `
    );
    // /////////////// Pendidikan /////////////////////////////////

    // /////////////// Tujuan Pembiayaan /////////////////////////////////
    const tujuanPembiayaan = this.modelTujuanPembiayaan.map(
      (tujuan: refJenisPekerjaan) => `
        <option key="${tujuan}" value="${tujuan.deskripsi}">
            ${tujuan.deskripsi}
        </option>
      `
    );
    // /////////////// Tujuan Pembiayaan /////////////////////////////////

    // /////////////// Pekerjaan /////////////////////////////////
    const jenisPekerjaan = this.modelPekerjaan.map(
      (pekerjaan: refJenisPekerjaan) => `
        <option key="${pekerjaan}" value="${pekerjaan.deskripsi}">
            ${pekerjaan.deskripsi}
        </option>
      `
    );
    // /////////////// Pekerjaan /////////////////////////////////

    // /////////////// Status Perkawinan /////////////////////////////////
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const statusPerkawinan = this.modelStatusPerkawinan.map(
      (statusPerkawinan: refStatusPerkawinan) => `
        <option key="${statusPerkawinan}" value="${statusPerkawinan.deskripsi}">
            ${statusPerkawinan.deskripsi}
        </option>
      `
    );
    // /////////////// Status Perkawinan /////////////////////////////////

    // /////////////// Jenis Perusahaan /////////////////////////////////
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const jenisPerusahaan = this.modelJenisPerusahaan.map(
      (jenisPerusahaan: refListTipePerusahaan) => `
        <option key="${jenisPerusahaan}" value="${jenisPerusahaan.company_deskripsi}">
            ${jenisPerusahaan.company_deskripsi}
        </option>
      `
    );
    // /////////////// Jenis Perusahaan /////////////////////////////////

    // /////////////// Kepemilikan Rumah /////////////////////////////////
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const kepemilikanRumah = this.modelKepemilikanRumah.map(
      (kepemilikanRumah: refStatusRumah) => `
        <option key="${kepemilikanRumah}" value="${kepemilikanRumah.description}">
            ${kepemilikanRumah.description}
        </option>
      `
    );
    // /////////////// Kepemilikan Rumah /////////////////////////////////

    let parameter: any;
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

        if (parameterValue[1] === 'Tingkat Pendidikan') {
          $('#keyInDiv').hide();
          $('#pendidikanDiv').show();
          $('#jenisPerusahaanDiv').hide();
          $('#kepemilikanRumahDiv').hide();
          $('#jenisPekerjaanDiv').hide();
          $('#statusPerkawinanDiv').hide();
          $('#tujuanPembiayaanDiv').hide();
        } else if (parameterValue[1] === 'Tujuan Pembiayaan') {
          $('#keyInDiv').hide();
          $('#tujuanPembiayaanDiv').show();
          $('#jenisPerusahaanDiv').hide();
          $('#kepemilikanRumahDiv').hide();
          $('#jenisPekerjaanDiv').hide();
          $('#statusPerkawinanDiv').hide();
          $('#pendidikanDiv').hide();
        } else if (parameterValue[1] === 'Status Perkawinan') {
          $('#keyInDiv').hide();
          $('#statusPerkawinanDiv').show();
          $('#jenisPerusahaanDiv').hide();
          $('#kepemilikanRumahDiv').hide();
          $('#jenisPekerjaanDiv').hide();
          $('#tujuanPembiayaanDiv').hide();
          $('#pendidikanDiv').hide();
        } else if (parameterValue[1] === 'Tingkat Jabatan') {
          $('#keyInDiv').hide();
          $('#jenisPekerjaanDiv').show();
          $('#statusPerkawinanDiv').hide();
          $('#tujuanPembiayaanDiv').hide();
          $('#pendidikanDiv').hide();
          $('#jenisPerusahaanDiv').hide();
          $('#kepemilikanRumahDiv').hide();
        } else if (parameterValue[1] === 'Kepemilikan Tempat Tinggal') {
          $('#keyInDiv').hide();
          $('#kepemilikanRumahDiv').show();
          $('#jenisPekerjaanDiv').hide();
          $('#statusPerkawinanDiv').hide();
          $('#tujuanPembiayaanDiv').hide();
          $('#pendidikanDiv').hide();
          $('#jenisPerusahaanDiv').hide();
        } else if (parameterValue[1] === 'Jenis Perusahaan') {
          $('#keyInDiv').hide();
          $('#jenisPerusahaanDiv').show();
          $('#kepemilikanRumahDiv').hide();
          $('#jenisPekerjaanDiv').hide();
          $('#statusPerkawinanDiv').hide();
          $('#tujuanPembiayaanDiv').hide();
          $('#pendidikanDiv').hide();
        } else {
          $('#keyInDiv').show();
          $('#jenisPerusahaanDiv').hide();
          $('#kepemilikanRumahDiv').hide();
          $('#jenisPekerjaanDiv').hide();
          $('#statusPerkawinanDiv').hide();
          $('#tujuanPembiayaanDiv').hide();
          $('#pendidikanDiv').hide();
        }
      });
    });

    let slicePar: any;
    Swal.fire({
      title: 'Input Scoring',
      html:
        '<br />' +
        '<div class="row form-material" style="width:100%"><div class="form-group row">' +
        '<label class="col-sm-3 col-form-label" style="font-size: medium;">Produk</label>' +
        '<div class="col-sm-9"><select class="form-control" id="produk"><option value="">Pilih Parameter</option>' +
        '<option value="ALL">ALL</option>' +
        `${optionsfasilitas}` +
        '</select>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Joint Income?</label>' +
        '<div class="col-sm-9"><select id="joint_income" class="form-control"><option value="">Pilih Joint Income</option><option value="1">Ya</option><option value="2">Tidak</option></select>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Parameter</label>' +
        '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Parameter</option>' +
        `${options}` +
        '</select>' +
        '</div></div><p></p>' +
        '<div class="form-group row" id="dataValueDiv" style="display: none;"><label class="col-sm-3 col-form-label" style="font-size: medium;">Data Value</label>' +
        '<div class="col-sm-9" id="keyInDiv" style="display: none;"><input type="text" class="form-control" id="data_value"/></div>' +
        '<div class="col-sm-9" id="pendidikanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="">Pilih Data</option>' +
        `${pendidikan}` +
        '</select></div>' +
        '<div class="col-sm-9" id="tujuanPembiayaanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="">Pilih Data</option>' +
        `${tujuanPembiayaan}` +
        '</select></div>' +
        '<div class="col-sm-9" id="statusPerkawinanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="">Pilih Data</option>' +
        `${statusPerkawinan}` +
        '</select></div>' +
        '<div class="col-sm-9" id="jenisPekerjaanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="">Pilih Data</option>' +
        `${jenisPekerjaan}` +
        '</select></div>' +
        '<div class="col-sm-9" id="kepemilikanRumahDiv" style="display: none;"><select class="form-control" id="data_value"><option value="">Pilih Data</option>' +
        `${kepemilikanRumah}` +
        '</select></div>' +
        '<div class="col-sm-9" id="jenisPerusahaanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="">Pilih Data</option>' +
        `${jenisPerusahaan}` +
        '</select></div>' +
        '</div><p></p>' +
        '<div class="form-group row" id="minMaxDiv"><label class="col-sm-3 col-form-label" style="font-size: medium;">Min / Max</label>' +
        '<div class="col"><input type="text" class="form-control" id="min"></div><div class="col">Min</div><div class="col"><input type="text" class="form-control" id="max"></div><div class="col">Max</div>' +
        '</div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Score</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="score">' +
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
      const proVal = $('#produk').val();
      const joVal = $('#joint_income').val();
      slicePar = $('#parameter').val();
      const parVal = slicePar.split('|');
      const datVal = $('#data_value').val();
      const miVal = $('#min').val();
      const maVal = $('#max').val();
      const scVal = $('#score').val();
      // if (proVal === '') {
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
            id: 0,
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            data_value: datVal,
            joint_income: joVal,
            max_value: maVal,
            min_value: miVal,
            parameter: parVal[0],
            produk: proVal,
            score: scVal,
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
  }

  viewdetaildatascoring(idScore: any): void {
    this.scoringServices.getdatascoringdetailbyid(idScore).subscribe({
      next: data => {
        this.datascoringbyid = data.result;
        if (this.datascoringbyid.joint_income == 1) {
          this.getjoincome = 'Ya';
        } else {
          this.getjoincome = 'Tidak';
        }

        let parameter: any;
        $(document).ready(function () {
          $('#parameter').change(function () {
            parameter = $(this).val();
            // alert(parameter)
            const parameterValue = parameter.split('|');
            if (parameterValue[0] !== '2') {
              $('#minMaxDiv').hide();
              $('#dataValueDiv').show();
            } else {
              $('#minMaxDiv').show();
              $('#dataValueDiv').hide();
            }

            if (parameterValue[1] === 'Tingkat Pendidikan') {
              $('#keyInDiv').hide();
              $('#pendidikanDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
            } else if (parameterValue[1] === 'Tujuan Pembiayaan') {
              $('#keyInDiv').hide();
              $('#tujuanPembiayaanDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#pendidikanDiv').hide();
            } else if (parameterValue[1] === 'Status Perkawinan') {
              $('#keyInDiv').hide();
              $('#statusPerkawinanDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
            } else if (parameterValue[1] === 'Tingkat Jabatan') {
              $('#keyInDiv').hide();
              $('#jenisPekerjaanDiv').show();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
            } else if (parameterValue[1] === 'Kepemilikan Tempat Tinggal') {
              $('#keyInDiv').hide();
              $('#kepemilikanRumahDiv').show();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
              $('#jenisPerusahaanDiv').hide();
            } else if (parameterValue[1] === 'Jenis Perusahaan') {
              $('#keyInDiv').hide();
              $('#jenisPerusahaanDiv').show();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
            } else {
              $('#keyInDiv').show();
              $('#jenisPerusahaanDiv').hide();
              $('#kepemilikanRumahDiv').hide();
              $('#jenisPekerjaanDiv').hide();
              $('#statusPerkawinanDiv').hide();
              $('#tujuanPembiayaanDiv').hide();
              $('#pendidikanDiv').hide();
            }
          });
        });

        let slicePar: any;
        // setTimeout(() => {
        Swal.fire({
          title: 'Input Scoring',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-3 col-form-label" style="font-size: medium;">Produk</label>' +
            '<div class="col-sm-9"><select class="form-control" id="produk"><option value="' +
            this.datascoringbyid.produk +
            '">' +
            this.datascoringbyid.produk +
            '</option>' +
            '<option value="ALL">ALL</option>' +
            `${optionsfasilitas}` +
            '</select>' +
            '</div></div><p></p>' +
            '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Joint Income?</label>' +
            '<div class="col-sm-9"><select id="joint_income" class="form-control"><option value="' +
            this.datascoringbyid.joint_income +
            '">' +
            this.getjoincome +
            '</option><option value="1">Ya</option><option value="2">Tidak</option></select>' +
            '</div></div><p></p>' +
            '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Parameter</label>' +
            '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="' +
            this.datascoringbyid.parameter +
            '">' +
            this.datascoringbyid.parameter +
            '</option>' +
            `${options}` +
            '</select>' +
            '</div></div><p></p>' +
            '<div class="form-group row" id="dataValueDiv" style="display: none;"><label class="col-sm-3 col-form-label" style="font-size: medium;">Data Value</label>' +
            '<div class="col-sm-9" id="keyInDiv" style="display: none;"><input type="text" class="form-control" id="data_value" value="' +
            this.datascoringbyid.data_value +
            '"/></div>' +
            '<div class="col-sm-9" id="pendidikanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="' +
            this.datascoringbyid.data_value +
            '">' +
            this.datascoringbyid.data_value +
            '</option>' +
            `${pendidikan}` +
            '</select></div>' +
            '<div class="col-sm-9" id="tujuanPembiayaanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="' +
            this.datascoringbyid.data_value +
            '">' +
            this.datascoringbyid.data_value +
            '</option>' +
            `${tujuanPembiayaan}` +
            '</select></div>' +
            '<div class="col-sm-9" id="statusPerkawinanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="' +
            this.datascoringbyid.data_value +
            '">' +
            this.datascoringbyid.data_value +
            '</option>' +
            `${statusPerkawinan}` +
            '</select></div>' +
            '<div class="col-sm-9" id="jenisPekerjaanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="' +
            this.datascoringbyid.data_value +
            '">' +
            this.datascoringbyid.data_value +
            '</option>' +
            `${jenisPekerjaan}` +
            '</select></div>' +
            '<div class="col-sm-9" id="kepemilikanRumahDiv" style="display: none;"><select class="form-control" id="data_value"><option value="' +
            this.datascoringbyid.data_value +
            '">' +
            this.datascoringbyid.data_value +
            '</option>' +
            `${kepemilikanRumah}` +
            '</select></div>' +
            '<div class="col-sm-9" id="jenisPerusahaanDiv" style="display: none;"><select class="form-control" id="data_value"><option value="' +
            this.datascoringbyid.data_value +
            '">' +
            this.datascoringbyid.data_value +
            '</option>' +
            `${jenisPerusahaan}` +
            '</select></div>' +
            '</div><p></p>' +
            '<div class="form-group row" id="minMaxDiv" style="display: none;"><label class="col-sm-3 col-form-label" style="font-size: medium;">Min / Max</label>' +
            '<div class="col"><input type="text" class="form-control" id="min" value="' +
            this.datascoringbyid.min_value +
            '"></div><div class="col">Min</div><div class="col"><input type="text" class="form-control" id="max" value="' +
            this.datascoringbyid.max_value +
            '"></div><div class="col">Max</div>' +
            '</div><p></p>' +
            '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Score</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control" id="score" value="' +
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
          const proVal = $('#produk').val();
          const joVal = $('#joint_income').val();
          slicePar = $('#parameter').val();
          const parVal = slicePar.split('|');
          const datVal = $('#data_value').val();
          const miVal = $('#min').val();
          const maVal = $('#max').val();
          const scVal = $('#score').val();
          // if (proVal === '') {
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
                id: idScore,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                data_value: datVal,
                joint_income: joVal,
                max_value: maVal,
                min_value: miVal,
                parameter: parVal[0],
                produk: proVal,
                score: scVal,
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

    const options = this.listparameterscoring.map(
      (option: any) => `
        <option key="${option}" value="${option.parameter_type + '|' + option.parameter_description}">
            ${option.parameter_description}
        </option>
      `
    );

    const optionsfasilitas = this.listdatafasilitas.map(
      (optionsfasilitas: any) => `
        <option key="${optionsfasilitas}" value="${optionsfasilitas.fasilitas}">
            ${optionsfasilitas.fasilitas}
        </option>
      `
    );

    // /////////////// Pendidikan /////////////////////////////////
    const pendidikan = this.modelPendidikan.map(
      (pendidikan: refJenisPekerjaan) => `
        <option key="${pendidikan}" value="${pendidikan.deskripsi}">
            ${pendidikan.deskripsi}
        </option>
      `
    );
    // /////////////// Pendidikan /////////////////////////////////

    // /////////////// Tujuan Pembiayaan /////////////////////////////////
    const tujuanPembiayaan = this.modelTujuanPembiayaan.map(
      (tujuan: refJenisPekerjaan) => `
        <option key="${tujuan}" value="${tujuan.deskripsi}">
            ${tujuan.deskripsi}
        </option>
      `
    );
    // /////////////// Tujuan Pembiayaan /////////////////////////////////

    // /////////////// Pekerjaan /////////////////////////////////
    const jenisPekerjaan = this.modelPekerjaan.map(
      (pekerjaan: refJenisPekerjaan) => `
        <option key="${pekerjaan}" value="${pekerjaan.deskripsi}">
            ${pekerjaan.deskripsi}
        </option>
      `
    );
    // /////////////// Pekerjaan /////////////////////////////////

    // /////////////// Status Perkawinan /////////////////////////////////
    const statusPerkawinan = this.modelStatusPerkawinan.map(
      (statusPerkawinan: refStatusPerkawinan) => `
        <option key="${statusPerkawinan}" value="${statusPerkawinan.deskripsi}">
            ${statusPerkawinan.deskripsi}
        </option>
      `
    );
    // /////////////// Status Perkawinan /////////////////////////////////

    // /////////////// Jenis Perusahaan /////////////////////////////////
    const jenisPerusahaan = this.modelJenisPerusahaan.map(
      (jenisPerusahaan: refListTipePerusahaan) => `
        <option key="${jenisPerusahaan}" value="${jenisPerusahaan.company_deskripsi}">
            ${jenisPerusahaan.company_deskripsi}
        </option>
      `
    );
    // /////////////// Jenis Perusahaan /////////////////////////////////

    // /////////////// Kepemilikan Rumah /////////////////////////////////
    const kepemilikanRumah = this.modelKepemilikanRumah.map(
      (kepemilikanRumah: refStatusRumah) => `
        <option key="${kepemilikanRumah}" value="${kepemilikanRumah.description}">
            ${kepemilikanRumah.description}
        </option>
      `
    );
    // /////////////// Kepemilikan Rumah /////////////////////////////////
  }
  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
