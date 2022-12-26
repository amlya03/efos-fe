import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { listScoring } from './listScoring.model';
import { InputScoringService } from './input-scoring.service';
import { inputModel } from './inputModel.model';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-input-scoring',
  templateUrl: './input-scoring.component.html',
  styleUrls: ['./input-scoring.component.scss'],
})
export class InputScoringComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  scoringForm!: FormGroup;
  submitted = false;
  listScoring: listScoring[] = [];
  inputScoring: inputModel[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected scoringServices: InputScoringService,
    private SessionStorageService: SessionStorageService
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
  load() {
    this.scoringServices.getScoring().subscribe(data => {
      this.inputScoring = data.result;
    });
    this.scoringServices.listDataScoring().subscribe(data => {
      this.listScoring = data.result;
      this.dtTrigger.next(data.result);
    });
  }
  // scoringChange(parameter: any) {
  //   alert(parameter);
  // }
  // onSubmit(): void {
  //   this.submitted = true;
  //   this.http
  //     .post<any>(this.baseUrl + 'v1/efos-ref/create_data_scoring', {
  //       id: '',
  //       created_by: this.SessionStorageService.retrieve('sessionUserName'),
  //       created_date: '',
  //       data_value: this.scoringForm.get('data_value')?.value,
  //       joint_income: this.scoringForm.get('joint_income')?.value,
  //       max_value: this.scoringForm.get('max_value')?.value,
  //       min_value: this.scoringForm.get('min_value')?.value,
  //       parameter: this.scoringForm.get('parameter')?.value,
  //       produk: this.scoringForm.get('produk')?.value,
  //       score: this.scoringForm.get('score')?.value,
  //     })
  //     .subscribe({
  //       next: response => {
  //         console.warn(response);
  //         alert('Data Berhasil disimpan');
  //         window.location.reload();
  //       },
  //       error: error => console.warn(error),
  //     });
  // }
  cariButton(produk: string, joint: string, parameter: string, dataValue: string, score: string): void {
    $('#dataTables-example').DataTable().columns(1).search(produk).draw();
    $('#dataTables-example').DataTable().columns(2).search(joint).draw();
    $('#dataTables-example').DataTable().columns(3).search(parameter).draw();
    $('#dataTables-example').DataTable().columns(4).search(dataValue).draw();
    $('#dataTables-example').DataTable().columns(7).search(score).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().columns().search('').draw();
  }

  // ////////////// Pop Up Input Scoring ////////////////////////
  // async simpanData() {
  simpanData() {
    let options = this.inputScoring.map((option: any) => {
      return `
        <option key="${option}" value="${option.parameter_type}">
            ${option.parameter_description}
        </option>
      `;
    });
    $(document).ready(function () {
      $('#parameter').change(function () {
        let parameterValue = $(this).val();
        if (parameterValue === '1') {
          $('#minMaxDiv').hide();
          $('#dataValueDiv').show();
        } else {
          $('#minMaxDiv').show();
          $('#dataValueDiv').hide();
        }
      });
    });
    // const { value: formValues } = await Swal.fire({
    Swal.fire({
      title: 'Input Scoring',
      html:
        '<br />' +
        '<div class="row form-material"><div class="form-group row">' +
        '<label class="col-sm-3 col-form-label">Produk</label>' +
        '<div class="col-sm-9"><select id="produk" class="form-control"><option value="">Pilih Produk</option><option value="PPR">PPR</option><option value="PPR FLPP">PPR FLPP</option><option value="PTA">PTA</option><option value="PKM">PKM</option><option value="MULTIGUNA">MULTIGUNA</option></select>' +
        '</div></div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Joint Income?</label>' +
        '<div class="col-sm-9"><select id="joint_income" class="form-control"><option value="">Pilih Joint Income</option><option value="1">Ya</option><option value="2">Tidak</option></select>' +
        '</div></div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Parameter</label>' +
        // '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Parameter</option>`${options}`</select>' +
        '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Parameter</option><option value="1">1</option><option value="0">0</option></select>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Data Value</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="data_value"/>' +
        '</div></div>' +
        '<div class="form-group row" id="minMaxDiv"><label class="col-sm-3 col-form-label">Min / Max</label>' +
        '<div class="col"><input type="text" class="form-control" id="min"></div><div class="col">Min</div><div class="col"><input type="text" class="form-control" id="max"></div><div class="col">Max</div>' +
        '</div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Score</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="score">' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // preConfirm: () => {
      //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
      // },
    }).then(result => {
      let proVal = $('#produk').val();
      let joVal = $('#joint_income').val();
      let parVal = $('#parameter').val();
      let datVal = $('#data_value').val();
      let miVal = $('#min').val();
      let maVal = $('#max').val();
      let scVal = $('#score').val();
      if (proVal === '') {
        alert('Gagal Menyimpan Produk Belum dipilih');
        return;
      } else if (joVal === '') {
        alert('Gagal Menyimpan Joint Income Belum dipilih');
        return;
      } else if (parVal === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else if (parVal === '1' && datVal === '') {
        alert('Gagal Menyimpan Data Value Belum diisi');
        return;
      } else if (parVal === '0' && miVal === '') {
        alert('Gagal Menyimpan Min Value Belum diisi');
        return;
      } else if (parVal === '0' && maVal === '') {
        alert('Gagal Menyimpan Max Value Belum diisi');
        return;
      } else if (scVal === '') {
        alert('Gagal Menyimpan Score Belum diisi');
        return;
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ref/create_data_scoring', {
            id: '',
            created_by: this.SessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            data_value: datVal,
            joint_income: joVal,
            max_value: maVal,
            min_value: miVal,
            parameter: parVal,
            produk: proVal,
            score: scVal,
          })
          .subscribe({
            next: response => {
              //console.warn(response);
              alert('Data Berhasil disimpan');
              window.location.reload();
            },
            error: error => console.warn(error),
          });
      }
    });

    // if (formValues) {
    //   Swal.fire(JSON.stringify(formValues));
    // }
    // ////////////// Pop Up Input Scoring ////////////////////////
  }
}
