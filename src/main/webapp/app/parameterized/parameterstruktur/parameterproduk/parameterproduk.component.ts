import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';

@Component({
  selector: 'jhi-parameterproduk',
  templateUrl: './parameterproduk.component.html',
  styleUrls: ['./parameterproduk.component.scss'],
})
export class ParameterprodukComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  tablelistprogram: listCreatemodel[] = [];
  tablelistproduk: listCreatemodel[] = [];
  dataretrive: any;
  constructor(protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnInit(): void {
    this.datEntryService.getListprogram().subscribe(table => {
      this.tablelistprogram = table.result;
    });
    this.datEntryService.getListproduk().subscribe(table => {
      this.tablelistproduk = table.result;
    });
  }

  createproduk(): void {
    // /// menanti api  untuk kodeProgram
    const options = this.tablelistprogram.map((option: any) => {
      return `
        <option key="${option}" value="${option.kode_program}">
            ${option.program}
        </option>
      `;
    });

    // /// menanti api  untuk kodeProgram
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
          title: 'Create Produk ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode program</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_program"><option value="">Pilih program</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Produk Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="produk_deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const kode_program = $('#kode_program').val();
            const produk_deskripsi = $('#produk_deskripsi').val();

            //  if(active=='0'){
            //     this.kirimactive=0;
            //  }else{
            //   this.kirimactive=1;
            //  }
            if (kode_program === '') {
              alert('Kode Program Harus Di isi');
              return;
            } else if (produk_deskripsi === '') {
              alert('Produk Deskripsi harus di isi');
              return;
            } else {
              const body = {
                kode_program: kode_program,
                kode_produk: '',
                produk_deskripsi: produk_deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_produk+++', body, { headers }).subscribe({
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

  viewdataproduk(id: any): void {
    this.datEntryService.getdataretriveproduk(id).subscribe(table => {
      this.dataretrive = table.result;
    });

    alert(this.dataretrive);

    // /// menanti api  untuk kodeProgram
    const options = this.tablelistprogram.map((option: any) => {
      return `
        <option key="${option}" value="${option.kode_program}">
            ${option.program}
        </option>
      `;
    });

    // /// menanti api  untuk kodeProgram
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
          title: 'Create Produk ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode program</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_program"><option value="">Pilih program</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Produk Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="produk_deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const kode_program = $('#kode_program').val();
            const produk_deskripsi = $('#produk_deskripsi').val();

            //  if(active=='0'){
            //     this.kirimactive=0;
            //  }else{
            //   this.kirimactive=1;
            //  }
            if (kode_program === '') {
              alert('Kode Program Harus Di isi');
              return;
            } else if (produk_deskripsi === '') {
              alert('Produk Deskripsi harus di isi');
              return;
            } else {
              const body = {
                kode_program: kode_program,
                kode_produk: '',
                produk_deskripsi: produk_deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_produk+++', body, { headers }).subscribe({
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
