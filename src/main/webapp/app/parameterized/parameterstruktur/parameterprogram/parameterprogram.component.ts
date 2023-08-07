import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { Subject } from 'rxjs';
import { listFasilitasModel } from 'app/parameterized/config/listFasilitasModel.model';

@Component({
  selector: 'jhi-parameterprogram',
  templateUrl: './parameterprogram.component.html',
  styleUrls: ['./parameterprogram.component.scss'],
})
export class ParameterprogramComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;

  tablelistprogram: listCreatemodel[] = [];
  listFasilitasValue: listFasilitasModel[] = [];
  dataretrive: any;
  statusvalue: any;
  kirimactive: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.datEntryService.getListprogramall().subscribe(table => {
      this.tablelistprogram = table.result;
      this.dtTrigger.next(this.tablelistprogram);
    });
    this.datEntryService.getFetchKodeFasilitas().subscribe(data => {
      this.listFasilitasValue = data.result;
    });
  }

  createprogram(): void {
    const options = this.listFasilitasValue.map((option: listFasilitasModel) => {
      return `
        <option key="${option}" value="${option.kode_fasilitas}">
            ${option.fasilitas}
        </option>
      `;
    });

    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tambah Data',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Program',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%">' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="status_active">' +
            '<option value="">Pilih Status</option>' +
            '<option value="1">Aktif</option>' +
            '<option value="0">Tidak Aktif</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="kode_fasilitas">' +
            '<option value="">Pilih Parameter</option>' +
            `${options}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Program</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="program"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="min_plafond"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="max_plafond"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Expired Date</label>' +
            '<div class="col-sm-8">' +
            '<input type="date" class="form-control" id="expired_date"/> ' +
            '</div>' +
            '</div>' +
            '</div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Ya',
          denyButtonText: 'Tidak',
        }).then(result => {
          if (result.isConfirmed) {
            const kode_fasilitas = $('#kode_fasilitas').val();
            const program = $('#program').val();
            const min_plafond = $('#min_plafond').val();
            const max_plafond = $('#max_plafond').val();
            const expired_date = $('#expired_date').val();
            const active = $('#status_active').val();
            if (active === '') {
              alert('Status Aktif Harus Dipilih');
              return;
            } else if (kode_fasilitas === '') {
              alert('Kode Fasilitas Harus Di isi');
              return;
            } else if (program === '') {
              alert('Profram harus di isi');
              return;
            } else if (min_plafond === '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_plafond === '') {
              alert('Max Plafond harus di isi');
              return;
            } else if (expired_date === '') {
              alert('Expired date harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }
              this.tablelistprogram.filter((validasiFrontEnd: listCreatemodel) => {
                console.log(
                  validasiFrontEnd.kode_fasilitas === kode_fasilitas &&
                    validasiFrontEnd.program === program &&
                    validasiFrontEnd.min_plafond === min_plafond &&
                    validasiFrontEnd.max_plafond === max_plafond
                );
              });

              return;
              const body = {
                id: 0,
                active: this.kirimactive,
                kode_fasilitas: kode_fasilitas,
                program: program,
                min_plafond: min_plafond,
                max_plafond: max_plafond,
                expired_date: expired_date,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program', body, { headers }).subscribe({
                next: () => {
                  // console.warn(response);
                  // this.sessionStorageService.store('sessionPs', passwordbaru);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: toast => {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil di simpan',
                  });
                },
                error: () => {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: toast => {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'error',
                    title: 'Data gagal di simpan',
                  });
                },
              });
            }
          }
        });
      }
    });
  }

  viewdataprogram(id: any): void {
    const options = this.listFasilitasValue.map((option: any) => {
      return `
        <option key="${option}" value="${option.kode_fasilitas}">
            ${option.fasilitas}
        </option>
      `;
    });

    this.datEntryService.getdataretriveprogram(id).subscribe(table => {
      this.dataretrive = table.result;
    });

    const data = this.dataretrive;
    // const nama = this.dataretrive.program.substring(0, 3);
    const namaprogram = this.dataretrive.program;

    const status = this.dataretrive.active;

    if (status === '1') {
      this.statusvalue = 'Aktif';
    } else {
      this.statusvalue = 'Tidak Aktif';
    }

    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tambah Data',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Program',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8"><select class="form-control" id="status_active"><option value="' +
            status +
            '">' +
            this.statusvalue +
            '</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            // '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
            // // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            // '<div class="col-sm-8"><select class="form-control" id="kode_fasilitas"><option value=' +
            // data.kode_fasilitas +
            // '>' +
            // nama +
            // '</option>' +
            // `${options}` +
            // '</select>' +
            // '</div></div>' +
            // '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Program</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="program" value="' +
            namaprogram +
            '"> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="min_plafond" value="' +
            data.min_plafond +
            '"> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_plafond" value="' +
            data.max_plafond +
            '"> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Expired Date</label>' +
            '<div class="col-sm-8"><input type="date" class="form-control" id="expired_date" value="' +
            data.expired_date +
            '"> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const kode_fasilitas = $('#kode_fasilitas').val();
            const program = $('#program').val();
            const min_plafond = $('#min_plafond').val();
            const max_plafond = $('#max_plafond').val();
            const expired_date = $('#expired_date').val();
            const active = $('#status_active').val();
            if (active === '') {
              alert('Status Aktif Harus Dipilih');
              return;
            } else if (program === '') {
              alert('Profram harus di isi');
              return;
            } else if (min_plafond === '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_plafond === '') {
              alert('Max Plafond harus di isi');
              return;
            } else if (expired_date === '') {
              alert('Expired date harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                id: id,
                active: this.kirimactive,
                kode_program: data.kode_program,
                kode_fasilitas: data.kode_fasilitas,
                program: program,
                min_plafond: min_plafond,
                max_plafond: max_plafond,
                expired_date: expired_date,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program', body, { headers }).subscribe({
                next: () => {
                  // console.warn(response);
                  // this.sessionStorageService.store('sessionPs', passwordbaru);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: toast => {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil di simpan',
                  });
                },
                error: () => {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: toast => {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'error',
                    title: 'Data gagal di simpan',
                  });
                },
              });
            }
          }
        });
      }
    });
  }
}
