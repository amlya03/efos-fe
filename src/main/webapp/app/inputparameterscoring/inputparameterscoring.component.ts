import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  listmainparameterscoring: mainparameterscoring[] = [];
  listparameterscoring: mainparameterscoring[] = [];
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtTriggerMain: Subject<any> = new Subject<any>();
  dtOptionsMain: DataTables.Settings = {};
  dtTriggerSub: Subject<any> = new Subject<mainparameterscoring>();
  dtOptionsSub: DataTables.Settings = {};
  kirimanstatus: any;
  mainparameterscoringbyid: any;
  mainParameterSlice: any;
  hasilget: any;
  subParameterScoringModel: mainparameterscoring = new mainparameterscoring();
  subActive: any;
  subTipeData: any;
  subParameterSlice: any;

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

  ngOnDestroy(): void {
    if (this.dtTriggerMain) {
      this.dtTriggerMain.unsubscribe();
    }
    if (this.dtTriggerSub) {
      this.dtTriggerSub.unsubscribe();
    }
  }
  load() {
    this.getLoading(true);
    this.scoringServices.listmainparameterscoring().subscribe(data => {
      this.listmainparameterscoring = data.result;
      this.dtTriggerMain.next(data.result);
      // console.warn(this.listmainparameterscoring);
      // this.dtTrigger.next(data.result);
    });

    this.scoringServices.listparameterscoring().subscribe(data => {
      this.listparameterscoring = data.result;
      this.dtTriggerSub.next(data.result);
      this.getLoading(false);
      // console.warn(this.listparameterscoring);
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
        '<br/><div class="row" style="width: 100%;">' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Status aktif</label>' +
        '<div class="col-sm-9"><select id="status_aktif" class="form-control"><option value="">Pilih Status</option><option value="1">active</option><option value="0">Tidak</option></select>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi"/>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Bobot</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="bobot"/>' +
        '</div></div></div>',
      showCancelButton: true,
      confirmButtonColor: '#202020',
      cancelButtonColor: '#e06666',
      confirmButtonText: 'Updated Data',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      allowOutsideClick: false,
    }).then(result => {
      let status_aktif = $('#status_aktif').val();
      let parameter_deskripsi = $('#parameter_deskripsi').val();
      let bobot = $('#bobot').val();

      if (status_aktif == '1') {
        this.kirimanstatus = 1;
      } else {
        this.kirimanstatus = 0;
      }
      if (result.isConfirmed) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ref/create_main_parameter_scoring', {
            id: 0,
            created_by: this.SessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            active: this.kirimanstatus,
            parameter_description: parameter_deskripsi,
            bobot: bobot,
          })
          .subscribe({
            next: response => {
              Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                window.location.reload();
              });
            },
          });
      }
    });
    // ////////////// Pop Up Input Scoring ////////////////////////
  }

  simpanParameterscoring() {
    let options = this.listmainparameterscoring.map((option: any) => {
      return `
        <option key="${option}" value="${option.id + '|' + option.parameter_description}">
            ${option.parameter_description}
        </option>
      `;
    });

    Swal.fire({
      title: 'Sub Parameter Scoring',
      html:
        '<br/><div class="row" style="width: 100%;">' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Status aktif</label>' +
        '<div class="col-sm-9"><select id="status_aktif" class="form-control"><option value="">Pilih Status</option><option value="1">active</option><option value="0">Tidak</option></select>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Parameter</label>' +
        '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="">Pilih Parameter</option>' +
        `${options}` +
        '</select>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Deskripsi</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi"/>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Tipe Field </label>' +
        '<div class="col-sm-9"><select id="tipe_inputan" class="form-control"><option value="">Pilih Field</option><option value="1">Input</option><option value="2">Range</option></select>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Bobot</label>' +
        '<div class="col-sm-9"><input type="text" class="form-control" id="bobot"/>' +
        '</div></div><div>',
      showCancelButton: true,
      confirmButtonColor: '#202020',
      cancelButtonColor: '#e06666',
      confirmButtonText: 'Updated Data',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      allowOutsideClick: false,
    }).then(result => {
      let bobot = $('#bobot').val();
      let status_aktif = $('#status_aktif').val();
      let parameter_deskripsi = $('#parameter_deskripsi').val();
      let tipe_inputan = $('#tipe_inputan').val();
      this.mainParameterSlice = $('#parameter').val();
      let parameter = this.mainParameterSlice.split('|');

      if (status_aktif == '1') {
        this.kirimanstatus = 1;
      } else {
        this.kirimanstatus = 0;
      }

      if (result.isConfirmed) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ref/create_parameter_scoring', {
            active: this.kirimanstatus,
            created_by: this.SessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            id: 0,
            id_ref_main_parameter_scoring: parameter[0],
            main_parameter_scoring_desc: parameter[1],
            parameter_description: parameter_deskripsi,
            parameter_type: tipe_inputan,
            updated_by: this.SessionStorageService.retrieve('sessionUserName'),
            updated_date: '',
            bobot: bobot,
          })
          .subscribe({
            next: response => {
              Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                window.location.reload();
              });
            },
          });
      }
    });
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

      let options = this.listmainparameterscoring.map((option: any) => {
        return `
          <option key="${option}" value="${option.id}">
              ${option.parameter_description}
          </option>
        `;
      });
      setTimeout(() => {
        Swal.fire({
          title: 'Main Parameter Scoring',
          html:
            '<br /><div class="row" style="width: 100%;">' +
            '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Status aktif</label>' +
            '<div class="col-sm-9"><select id="status_aktif" class="form-control">' +
            '<option value="' +
            this.mainparameterscoringbyid.active +
            '">' +
            this.hasilget +
            '</option>' +
            '<option value="1">active</option><option value="0">Tidak</option></select>' +
            '</div></div><p></p>' +
            '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Deskripsi</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi" value="' +
            this.mainparameterscoringbyid.parameter_description +
            '"/>' +
            '</div></div><p></p>' +
            '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Bobot</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control" id="bobot" value="' +
            this.mainparameterscoringbyid.bobot +
            '"/>' +
            '</div></div><div>',
          showCancelButton: true,
          confirmButtonColor: '#202020',
          cancelButtonColor: '#e06666',
          confirmButtonText: 'Updated Data',
          cancelButtonText: 'Cancel',
          focusConfirm: false,
          allowOutsideClick: false,
        }).then(result => {
          let status_aktif = $('#status_aktif').val();
          let parameter_deskripsi = $('#parameter_deskripsi').val();
          let bobot = $('#bobot').val();

          if (status_aktif == '1') {
            this.kirimanstatus = 1;
          } else {
            this.kirimanstatus = 0;
          }

          if (result.isConfirmed) {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-ref/create_main_parameter_scoring', {
                id: id,
                created_by: '',
                created_date: '',
                active: this.kirimanstatus,
                parameter_description: parameter_deskripsi,
                bobot: bobot,
                updated_by: this.SessionStorageService.retrieve('sessionUserName'),
                updated_date: '',
              })
              .subscribe({
                next: response => {
                  Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                    window.location.reload();
                  });
                },
              });
          }
        });
      }, id * 5);
    });
    // ////////////// Pop Up Input Scoring ////////////////////////
  }

  viewdetailparameter(id: any) {
    this.scoringServices.getParameterScoring(id).subscribe({
      next: data => {
        this.subParameterScoringModel = data.result;
        // console.warn('sub by id ', data)
        if (data.result.active === '1') {
          this.subActive = 'Active';
        } else {
          this.subActive = 'Tidak Active';
        }
        if (data.result.parameter_type === '1') {
          this.subTipeData = 'Input';
        } else {
          this.subTipeData = 'Range';
        }
        let options = this.listmainparameterscoring.map((option: any) => {
          return `
            <option key="${option}" value="${option.id + '|' + option.parameter_description}">
                ${option.parameter_description}
            </option>
          `;
        });
        setTimeout(() => {
          Swal.fire({
            title: 'Sub Parameter Scoring',
            html:
              '<br /><div class="row" style="width: 100%;">' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Status aktif</label>' +
              '<div class="col-sm-9"><select id="status_aktif" class="form-control"><option value="' +
              this.subParameterScoringModel.active +
              '">' +
              this.subActive +
              '</option><option value="1">Active</option><option value="0">Tidak Active</option></select>' +
              '</div></div><p></p>' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Parameter</label>' +
              '<div class="col-sm-9"><select class="form-control" id="parameter"><option value="' +
              this.subParameterScoringModel.id_ref_main_parameter_scoring +
              '|' +
              this.subParameterScoringModel.main_parameter_scoring_desc +
              '">' +
              this.subParameterScoringModel.main_parameter_scoring_desc +
              '</option>' +
              `${options}` +
              '</select>' +
              '</div></div><p></p>' +
              '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label" style="font-size: medium;">Deskripsi</label>' +
              '<div class="col-sm-9"><input type="text" class="form-control" id="parameter_deskripsi" value="' +
              this.subParameterScoringModel.parameter_description +
              '"/>' +
              '</div></div><p></p>' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Tipe Field </label>' +
              '<div class="col-sm-9"><select id="tipe_inputan" class="form-control"><option value="' +
              this.subParameterScoringModel.parameter_type +
              '">' +
              this.subTipeData +
              '</option><option value="1">Input</option><option value="2">Range</option></select>' +
              '</div></div><p></p>' +
              '<div class="form-group row"><label class="col-sm-3 col-form-label" style="font-size: medium;">Bobot</label>' +
              '<div class="col-sm-9"><input type="text" class="form-control" id="bobot" value="' +
              this.subParameterScoringModel.bobot +
              '"/>' +
              '</div></div><div>',
            showCancelButton: true,
            confirmButtonColor: '#202020',
            cancelButtonColor: '#e06666',
            confirmButtonText: 'Updated Data',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            allowOutsideClick: false,
          }).then(result => {
            let bobot = $('#bobot').val();
            let status_aktif = $('#status_aktif').val();
            let parameter_deskripsi = $('#parameter_deskripsi').val();
            let tipe_inputan = $('#tipe_inputan').val();
            this.subParameterSlice = $('#parameter').val();
            let parameter = this.subParameterSlice.split('|');

            if (status_aktif == '1') {
              this.kirimanstatus = 1;
            } else {
              this.kirimanstatus = 0;
            }

            if (result.isConfirmed) {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-ref/create_parameter_scoring', {
                  active: this.kirimanstatus,
                  created_by: this.SessionStorageService.retrieve('sessionUserName'),
                  created_date: '',
                  id: id,
                  id_ref_main_parameter_scoring: parameter[0],
                  main_parameter_scoring_desc: parameter[1],
                  parameter_description: parameter_deskripsi,
                  parameter_type: tipe_inputan,
                  updated_by: this.SessionStorageService.retrieve('sessionUserName'),
                  updated_date: '',
                  bobot: bobot,
                })
                .subscribe({
                  next: response => {
                    Swal.fire('Updated!', 'Data Berhasil di Updated', 'success').then(() => {
                      window.location.reload();
                    });
                  },
                });
            }
          });
        }, id * 5);
      },
    });
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
