import { Component, OnInit } from '@angular/core';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-parameteragunan',
  templateUrl: './parameteragunan.component.html',
  styleUrls: ['./parameteragunan.component.scss'],
})
export class ParameteragunanComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  tableAgunan: listCreatemodel[] = [];
  kirimactive: any;

  constructor(protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnInit(): void {
    this.datEntryService.getFetchListAksesRumah().subscribe(table => {
      this.tableAgunan = table.result;
      console.log(this.tableAgunan);
    });
  }
  createaksesrumah(): void {
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
          title: 'Create akses rumah dddd',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8"><select class="form-control" id="status_active"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-group row"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="akses_rumah"/> ' +
            '</div></div>',

          // '<div class="row form-meterial" style="widht=100%">'+
          //   '<div class="form-label row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
          //   '<div class="col-sm-8">  <select class="form-control" id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
          //   '</div></div>' +
          //   '<div class="form-label row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
          //   '<div class="col-sm-8"><input type="text" class="form-control" id="akses_rumah"/> ' +
          //   '</div></div>'+
          //   '</div>',
          color: '#000',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const active = $('#status_active').val();
            const akses_rumah = $('#akses_rumah').val();

            if (active === '') {
              alert('Status Harus di pilih');
              return;
            } else if (akses_rumah === '') {
              alert('Akses Rumah Harus  di Pilih');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                akses_rumah: akses_rumah,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_akses_rumah+++', body, { headers }).subscribe({
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
