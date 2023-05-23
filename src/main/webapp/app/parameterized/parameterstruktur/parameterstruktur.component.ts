import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-parameterstruktur',
  templateUrl: './parameterstruktur.component.html',
  styleUrls: ['./parameterstruktur.component.scss'],
})
export class ParameterstrukturComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  tablelistfasilitas: listCreatemodel[] = [];
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
    // alert('knfsdkds');
  }

  ngOnInit(): void {
    this.datEntryService.getFetchKodeFasilitasall().subscribe(table => {
      this.tablelistfasilitas = table.result;
      this.dtTrigger.next(this.tablelistfasilitas);
    });
  }

  viewdatafasilita(id: any): void {
    this.datEntryService.getdataretrivefasilitas(id).subscribe(table => {
      this.dataretrive = table.result;
    });

    const baseUrl = this.baseUrl;
    const options = this.dataretrive;
    const status = this.dataretrive.active;

    // alert(status);
    if (status === '1') {
      this.statusvalue = 'Aktif';
    } else {
      this.statusvalue = 'Tidak Aktif';
    }

    // alert(options.fasilitas);

    // alert(id);
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Tolang Input dengan benar ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Edit  fasilitas',
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
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="deskripsi" value=' +
            options.deskripsi +
            '> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Fasilitas</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="fasilitas" value=' +
            options.fasilitas +
            ' /> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="kode_fasilitas" value= ' +
            options.kode_fasilitas +
            ' /> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const active = $('#status_active').val();
            const deskripsi = $('#deskripsi').val();
            const fasilitas = $('#fasilitas').val();
            const kode_fasilitas = $('#kode_fasilitas').val();

            if (active === '') {
              alert('Status Aktif harus di isi');
              return;
            } else if (deskripsi === '') {
              alert('Deskripsi harus di isi');
              return;
            } else if (fasilitas === '') {
              alert('Fasilitas harus di isi');
              return;
            } else if (kode_fasilitas === '') {
              alert('Kode Fasilitas harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }
              // alert(active);
              // alert(id);
              const body = {
                id: id,
                active: this.kirimactive,
                deskripsi: deskripsi,
                fasilitas: fasilitas,
                kode_fasilitas: kode_fasilitas,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas', body, { headers }).subscribe({
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

  createfasilitas(): void {
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
          title: 'Create fasilitas',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8"><select class="form-control" id="status_active"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="deskripsi"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Fasilitas</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="fasilitas"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="kode_fasilitas"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const deskripsi = $('#deskripsi').val();
            const fasilitas = $('#fasilitas').val();
            const kode_fasilitas = $('#kode_fasilitas').val();
            const active = $('#status_active').val();
            if (active === '') {
            } else if (deskripsi === '') {
              alert('Status Akrif harus dipilih');
              return;
            } else if (fasilitas === '') {
              alert('Fasilitas harus di isi');
              return;
            } else if (kode_fasilitas === '') {
              alert('Kode Fasilitas harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                id: 0,
                active: this.kirimactive,
                deskripsi: deskripsi,
                fasilitas: fasilitas,
                kode_fasilitas: kode_fasilitas,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas', body, { headers }).subscribe({
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
