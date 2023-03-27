import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import Swal from 'sweetalert2';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';

@Component({
  selector: 'jhi-parameterdeveloper',
  templateUrl: './parameterdeveloper.component.html',
  styleUrls: ['./parameterdeveloper.component.scss'],
})
export class ParameterdeveloperComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  tablelistdeveloper: listCreatemodel[] = [];
  kirimactive: any;
  constructor(protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnInit(): void {}

  createdeveloper(): void {
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
          title: 'Create Developer',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8"><select class="form-control" id="status_active"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Jenis Developer</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Jenis_developer"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Kantor Cabang</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Kantor_Cabang"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Nama Developer</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Nama_developer"/> ' +
            '</div></div>',

          // '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
          // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
          // '</div></div>' +
          // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Jenis Developer</label>' +
          // '<div class="col-sm-8"><input type="text" class="form-control2" id="Jenis_developer"/> ' +
          // '</div></div>'+
          // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Kantor Cabang</label>' +
          // '<div class="col-sm-8"><input type="text" class="form-control2" id="Kantor_Cabang"/> ' +
          // '</div></div>'+
          // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Nama Developer</label>' +
          // '<div class="col-sm-8"><input type="text" class="form-control2" id="Nama_developer"/> ' +
          // '</div></div>',

          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const active = $('#status_active').val();
            const jenis_developer = $('#Jenis_developer').val();
            const kantor_Cabang = $('#Kantor_Cabang').val();
            const nama_developer = $('#Nama_developer').val();

            if (active === '') {
              alert('Status Harus di pilih');
              return;
            } else if (jenis_developer === '') {
              alert('Jenis Developer harus di isi');
              return;
            } else if (kantor_Cabang === '') {
              alert('Kantor Cabang harus di isi');
              return;
            } else if (nama_developer === '') {
              alert('Nama Developer harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                akses_rumah: jenis_developer,
                jenis_developer: kantor_Cabang,
                nama_developer: nama_developer,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_developer+++', body, { headers }).subscribe({
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
