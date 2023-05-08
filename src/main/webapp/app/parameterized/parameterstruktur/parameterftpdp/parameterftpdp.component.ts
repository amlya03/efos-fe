import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'jhi-parameterftpdp',
  templateUrl: './parameterftpdp.component.html',
  styleUrls: ['./parameterftpdp.component.scss'],
})
export class ParameterftpdpComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  tablelistproduk: any;
  tablelistftvdp: any;
  tampungpemecah: any;
  tableftvdpdetail: any;

  constructor(protected http: HttpClient, protected datEntryService: DataEntryService, private router: Router) {}

  ngOnInit(): void {
    this.datEntryService.getListproduk().subscribe(table => {
      this.tablelistproduk = table.result;
    });
    this.datEntryService.getListftvdp().subscribe(table => {
      this.tablelistftvdp = table.result;
    });
  }

  viewftvdetail(id: any): void {
    // alert(id);
    // this.createform.get('contoh')?.setValue('7');
    // this.tampunganidviewdetail = id;

    this.router
      .navigate(['/parameterstrukturftpdpdetail'], {
        queryParams: { id: id },
      })
      .then(() => {
        window.location.reload();
      });

    // this.datEntryService.getlistftvdpdetail(id).subscribe({
    //   next: de => {
    //     this.tableftvdpdetail = de.result;
    //     // console.warn(this.tableftvdpdetail);
    //   },

    // });
  }

  createftpdp(): void {
    const baseUrl = this.baseUrl;
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
        const options = this.tablelistproduk.map((option: any) => {
          return `
            <option key="${option}" value="${option.kode_produk}| ${option.produk_deskripsi}">
                ${option.produk_deskripsi}
            </option>
          `;
        });
        let hahaha;
        $(document).ready(function () {
          $('#jangankodeproduk').change(function () {
            alert('jalan');
            //  this.tampungpemecah= $('#jangankodeproduk').val();
            // const pemecahbenar=this.tampungpemecah.split('|');
            const parameterValue = $(this).val() as HTMLElement | any;
            hahaha = parameterValue.split('|');
            // console.warn(hahaha);
            // console.warn(parameterValue);
            fetch(baseUrl + 'v1/efos-ref/list_skema_ftv?ss=' + hahaha[0])
              .then(function (response) {
                return response.json();
              })
              .then(data => {
                let kabkota;
                $('#kodeskema').empty();
                data.result.forEach((i: any) => {
                  kabkota = '<option value="' + i['skema'] + '">' + i['skema_deskripsi'] + '</option>';
                  kabkota = kabkota + '';
                  $('#kodeskema').append(kabkota);
                });
              });
          });
        });

        Swal.fire({
          title: 'Create FTP DP',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode produk</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="jangankodeproduk"><option value="">Pilih produk</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode produk</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kodeskema"><option value="">Pilih produk</option></select>' +
            '</div></div>' +
            '<br />',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const jangankodeproduk = $('#jangankodeproduk').val();
            const kodeskema = $('#kodeskema').val();

            this.tampungpemecah = $('#jangankodeproduk').val();
            const pemecahbenar = this.tampungpemecah.split('|');

            if (jangankodeproduk === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (kodeskema === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            }

            const body = {
              nama_produk: pemecahbenar[1],
              kode_produk: pemecahbenar[0],
              id: '',
              skema_id: kodeskema,
            };
            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_dp', body, { headers }).subscribe({
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
        });
      }
    });
  }
}
