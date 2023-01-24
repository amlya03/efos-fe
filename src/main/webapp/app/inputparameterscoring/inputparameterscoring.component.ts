import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import { listScoring } from './listScoring.model';
// import { InputScoringService } from 'app/input-scoring.service';
// import { inputModel } from './inputModel.model';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { mainparameterscoring } from 'app/input-scoring/mainparameterscoring.model';
import { InputScoringService } from 'app/input-scoring/input-scoring.service';

@Component({
  selector: 'jhi-inputparameterscoring',
  templateUrl: './inputparameterscoring.component.html',
  styleUrls: ['./inputparameterscoring.component.scss'],
})
export class InputparameterscoringComponent implements OnInit {
  listmainparameterscoring: mainparameterscoring[] = [];
  listparameterscoring: mainparameterscoring[] = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  kirimanstatus: any;
  mainparameterscoringbyid: any;
  hasilget: any;

  constructor(
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected scoringServices: InputScoringService,
    protected datEntryService: DataEntryService,
    private SessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.scoringServices.listmainparameterscoring().subscribe(data => {
      this.listmainparameterscoring = data.result;
      console.warn(this.listmainparameterscoring);
      // this.dtTrigger.next(data.result);
    });

    this.scoringServices.listparameterscoring().subscribe(data => {
      this.listparameterscoring = data.result;
      console.warn(this.listparameterscoring);
      // this.dtTrigger.next(data.result);
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
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
  }

  simpanDataparameterscoring() {
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
      title: 'Main Parameter Scoring',
      html:
        '<br />' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Status aktif</label>' +
        '<div class="col-sm-9"><select id="status_aktif" class="form-control"><option value="">Pilih Status</option><option value="1">active</option><option value="0">Tidak</option></select>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi"/>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Bobot</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="bobot"/>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // preConfirm: () => {
      //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
      // },
    }).then(result => {
      let status_aktif = $('#status_aktif').val();
      let parameter_deskripsi = $('#parameter_deskripsi').val();
      let bobot = $('#bobot').val();

      if (status_aktif == '1') {
        this.kirimanstatus = 1;
      } else {
        this.kirimanstatus = 0;
      }

      if (status_aktif === '') {
        alert('Gagal Menyimpan Produk Belum dipilih');
        return;
      } else if (parameter_deskripsi === '') {
        alert('Gagal Menyimpan Joint Income Belum dipilih');
        return;
      } else if (bobot === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else {
        this.http
          .post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_main_parameter_scoring', {
            id: 0,
            created_by: this.SessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            active: this.kirimanstatus,
            parameter_description: parameter_deskripsi,
            bobot: bobot,
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

  simpanParameterscoring() {
    let options = this.listmainparameterscoring.map((option: any) => {
      return `
        <option key="${option}" value="${option.id}">
            ${option.parameter_description}
        </option>
      `;
    });

    // $(document).ready(function () {
    //   $('#parameter').change(function () {
    //     let parameterValue = $(this).val();
    //     if (parameterValue === '1') {
    //       $('#minMaxDiv').hide();
    //       $('#dataValueDiv').show();
    //     } else {
    //       $('#minMaxDiv').show();
    //       $('#dataValueDiv').hide();
    //     }
    //   });
    // });
    // const { value: formValues } = await Swal.fire({
    Swal.fire({
      title: 'Main Parameter Scoring',
      html:
        '<br />' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Status aktif</label>' +
        '<div class="col-sm-9"><select id="status_aktif" class="form-control"><option value="">Pilih Status</option><option value="1">active</option><option value="0">Tidak</option></select>' +
        '</div></div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Parameter</label>' +
        '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Parameter</option>' +
        `${options}` +
        '</select>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi"/>' +
        '</div></div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Tipe Field </label>' +
        '<div class="col-sm-9"><select id="tipe_inputan" class="form-control"><option value="">Pilih Field </option><option value="1">Input</option><option value="2">Range</option></select>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // preConfirm: () => {
      //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
      // },
    }).then(result => {
      let status_aktif = $('#status_aktif').val();
      let parameter_deskripsi = $('#parameter_deskripsi').val();
      let tipe_inputan = $('#tipe_inputan').val();
      let parameter = $('#parameter').val();

      if (status_aktif == '1') {
        this.kirimanstatus = 1;
      } else {
        this.kirimanstatus = 0;
      }

      if (status_aktif === '') {
        alert('Gagal Menyimpan Produk Belum dipilih');
        return;
      } else if (parameter_deskripsi === '') {
        alert('Gagal Menyimpan Joint Income Belum dipilih');
        return;
      } else if (tipe_inputan === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else if (parameter === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else {
        this.http
          .post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_parameter_scoring', {
            id: 0,
            created_by: this.SessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            active: this.kirimanstatus,
            parameter_description: parameter_deskripsi,
            id_ref_main_parameter_scoring: parameter,
            parameter_type: tipe_inputan,
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

  viewdetailmainparameter(id: any) {
    this.scoringServices.getmainparameterscoringbyid(id).subscribe(data => {
      this.mainparameterscoringbyid = data.result;
      if ((this.mainparameterscoringbyid.active = '1')) {
        this.hasilget = 'Active';
      } else {
        this.hasilget = 'tidak';
      }

      // document.getElementById('parameter_deskripsi').value=this.mainparameterscoringbyid.active as HTMLElement | any;
      // document.getElementById('bobot')?.val(this.mainparameterscoringbyid.active) as HTMLElement | any;
      $('#parameter_deskripsi').val(this.mainparameterscoringbyid.parameter_description);
      $('#bobot').val(this.mainparameterscoringbyid.bobot);
      console.warn(this.mainparameterscoringbyid);
      // this.dtTrigger.next(data.result);
    });

    let options = this.listmainparameterscoring.map((option: any) => {
      return `
        <option key="${option}" value="${option.id}">
            ${option.parameter_description}
        </option>
      `;
    });

    // $(document).ready(function () {
    //   $('#parameter').change(function () {
    //     let parameterValue = $(this).val();
    //     if (parameterValue === '1') {
    //       $('#minMaxDiv').hide();
    //       $('#dataValueDiv').show();
    //     } else {
    //       $('#minMaxDiv').show();
    //       $('#dataValueDiv').hide();
    //     }
    //   });
    // });
    // const { value: formValues } = await Swal.fire({
    Swal.fire({
      title: 'Main Parameter Scoring',
      html:
        '<br />' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Status aktif</label>' +
        '<div class="col-sm-9"><select id="status_aktif" class="form-control">' +
        // `${datagetstatus}` +
        '<option value="' +
        this.mainparameterscoringbyid.active +
        '">' +
        this.hasilget +
        '</option>' +
        '<option value="1">active</option><option value="0">Tidak</option></select>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi"/>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="bobot"/>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // preConfirm: () => {
      //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
      // },
    }).then(result => {
      let status_aktif = $('#status_aktif').val();
      let parameter_deskripsi = $('#parameter_deskripsi').val();
      let bobot = $('#bobot').val();

      if (status_aktif == '1') {
        this.kirimanstatus = 1;
      } else {
        this.kirimanstatus = 0;
      }

      if (status_aktif === '') {
        alert('Gagal Menyimpan Produk Belum dipilih');
        return;
      } else if (parameter_deskripsi === '') {
        alert('Gagal Menyimpan Joint Income Belum dipilih');
        return;
      } else if (bobot === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else {
        this.http
          .post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_main_parameter_scoring', {
            id: id,
            created_by: '',
            created_date: '',
            active: this.kirimanstatus,
            parameter_description: parameter_deskripsi,
            bobot: bobot,
            updated_by: this.SessionStorageService.retrieve('sessionUserName'),
            updated_date: null,
          })
          .subscribe({
            next: response => {
              //console.warn(response);
              alert('Data Berhasil diupdate');
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

  viewdetailparameter() {
    let options = this.listmainparameterscoring.map((option: any) => {
      return `
        <option key="${option}" value="${option.id}">
            ${option.parameter_description}
        </option>
      `;
    });

    // $(document).ready(function () {
    //   $('#parameter').change(function () {
    //     let parameterValue = $(this).val();
    //     if (parameterValue === '1') {
    //       $('#minMaxDiv').hide();
    //       $('#dataValueDiv').show();
    //     } else {
    //       $('#minMaxDiv').show();
    //       $('#dataValueDiv').hide();
    //     }
    //   });
    // });
    // const { value: formValues } = await Swal.fire({
    Swal.fire({
      title: 'Main Parameter Scoring',
      html:
        '<br />' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Status aktif</label>' +
        '<div class="col-sm-9"><select id="status_aktif" class="form-control"><option value="">Pilih Status</option><option value="1">active</option><option value="0">Tidak</option></select>' +
        '</div></div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Parameter</label>' +
        '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Parameter</option>' +
        `${options}` +
        '</select>' +
        '</div></div>' +
        '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi"/>' +
        '</div></div>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label">Tipe Field </label>' +
        '<div class="col-sm-9"><select id="tipe_inputan" class="form-control"><option value="">Pilih Field </option><option value="1">Input</option><option value="2">Range</option></select>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // preConfirm: () => {
      //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
      // },
    }).then(result => {
      let status_aktif = $('#status_aktif').val();
      let parameter_deskripsi = $('#parameter_deskripsi').val();
      let tipe_inputan = $('#tipe_inputan').val();
      let parameter = $('#parameter').val();

      if (status_aktif == '1') {
        this.kirimanstatus = 1;
      } else {
        this.kirimanstatus = 0;
      }

      if (status_aktif === '') {
        alert('Gagal Menyimpan Produk Belum dipilih');
        return;
      } else if (parameter_deskripsi === '') {
        alert('Gagal Menyimpan Joint Income Belum dipilih');
        return;
      } else if (tipe_inputan === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else if (parameter === '') {
        alert('Gagal Menyimpan Parameter Belum dipilih');
        return;
      } else {
        this.http
          .post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_parameter_scoring', {
            id: '',
            created_by: this.SessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            active: this.kirimanstatus,
            parameter_description: parameter_deskripsi,
            id_ref_main_parameter_scoring: parameter,
            parameter_type: tipe_inputan,
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
