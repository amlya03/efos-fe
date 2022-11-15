import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { listScoring } from './listScoring.model';
import { InputScoringService } from './input-scoring.service';
import { inputModel } from './inputModel.model';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-input-scoring',
  templateUrl: './input-scoring.component.html',
  styleUrls: ['./input-scoring.component.scss'],
})
export class InputScoringComponent implements OnInit {
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
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
    this.scoringForm = this.formBuilder.group({
      data_value: '',
      joint_income: '',
      max_value: '',
      min_value: '',
      parameter: '',
      produk: '',
      score: '',
    });
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
  scoringChange(parameter: any) {
    alert(parameter);
  }
  onSubmit(): void {
    this.submitted = true;
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ref/create_data_scoring', {
        id: '',
        created_by: this.localStorageService.retrieve('sessionUserName'),
        created_date: '',
        data_value: this.scoringForm.get('data_value')?.value,
        joint_income: this.scoringForm.get('joint_income')?.value,
        max_value: this.scoringForm.get('max_value')?.value,
        min_value: this.scoringForm.get('min_value')?.value,
        parameter: this.scoringForm.get('parameter')?.value,
        produk: this.scoringForm.get('produk')?.value,
        score: this.scoringForm.get('score')?.value,
      })
      .subscribe({
        next: response => {
          console.warn(response);
          alert('Data Berhasil disimpan');
          window.location.reload();
        },
        error: error => console.warn(error),
      });
  }
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

  async simpanData() {
    let options = this.inputScoring.map((option: any) => {
      return `
        <option key="${option}" value="${option.parameter_type}">
            ${option.parameter_description}
        </option>
      `;
    });
    const { value: formValues } = await Swal.fire({
      title: 'Input Scoring',
      html:
        '<div class="row form-material">' +
        '<select id="produk" class="swal2-input"><option value="">Pilih Produk</option><option value="PPR">PPR</option><option value="PPR FLPP">PPR FLPP</option><option value="PTA">PTA</option><option value="PKM">PKM</option><option value="MULTIGUNA">MULTIGUNA</option></select>' +
        '<select id="joint_income" class="swal2-input"><option value="">Pilih Joint Income</option><option value="1">Ya</option><option value="2">Tidak</option></select>' +
        '<select formControlName="parameter" class="swal2-input"><option value="">Pilih Parameter</option>' +
        `${options}` +
        '</select><br/>' +
        '<div class="row"><h6>Data Value</h6><div class="col"><input type="text" class="form-control" id="data_value"/>' +
        '</div></div>' +
        '<div class="row"><h6>Masukan Min dan Max</h6><div class="col"><input type="text" class="form-control"></div><div class="col">Min</div><div class="col"><input type="text" class="form-control"></div><div class="col">Max</div></div>' +
        '<input type="text" class="swal2-input" id="score">' +
        '<div>',
      focusConfirm: false,
      preConfirm: () => {
        return [$('#produk').val(), $('#joint_income').val(), $('#data_value').val(), $('#score').val()];
      },
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }
}
