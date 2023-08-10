import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { listFtvDpModel } from 'app/parameterized/config/listFtvDpModel.model';
import { SessionStorageService } from 'ngx-webstorage';

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
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected http: HttpClient,
    protected datEntryService: DataEntryService,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.datEntryService.getListprodukall().subscribe(table => {
      this.tablelistproduk = table.result;
    });
    this.datEntryService.getListftvdp().subscribe(table => {
      this.tablelistftvdp = table.result;
      this.dtTrigger.next(this.tablelistftvdp);
    });
  }

  viewftvdetail(id: any): void {
    this.router.navigate(['/parameterstrukturftpdpdetail'], {
      queryParams: { id: id },
    });
  }

  createftpdp(): void {
    const baseUrl = this.baseUrl;
    let hahaha;
    let tampunganValidasi: any;

    Swal.fire({
      title: 'Tambah Data Input Parameter FTV DP',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Tambah Data!',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        const options = this.tablelistproduk.map((option: any) => {
          return `
            <option key="${option}" value="${option.kode_produk}|${option.produk_deskripsi}">
                ${option.produk_deskripsi}
            </option>
          `;
        });

        $(document).ready(function () {
          $('#jangankodeproduk').change(function () {
            const parameterValue: any = $(this).val();
            hahaha = parameterValue.split('|');
            fetch(baseUrl + 'v1/efos-de/list_skema?ss=' + hahaha[0])
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
          title: 'Tambah Data FTV DP',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%">' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Deskripsi Program</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="jangankodeproduk">' +
            '<option value="">Pilih Deskripsi Program</option>' +
            `${options}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Skema</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="kodeskema">' +
            '<option value="">Pilih Skema</option></select>' +
            '</div>' +
            '</div>' +
            '</div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Simpan',
          denyButtonText: 'Tidak',
        }).then(result => {
          if (result.isConfirmed) {
            const jangankodeproduk = $('#jangankodeproduk').val();
            const kodeskema = $('#kodeskema').val();

            this.tampungpemecah = $('#jangankodeproduk').val();
            const pemecahbenar = this.tampungpemecah.split('|');

            if (jangankodeproduk === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Deskripsi Program Harus di pilih',
              });
              return;
            } else if (kodeskema === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Skema Harus di pilih',
              });
              return;
            }

            // this.tablelistftvdp.map((mappingOption: listFtvDpModel) => {
            //   if (
            //       ((mappingOption.kode_produk.toUpperCase()).replace(/\s/g, '') === (pemecahbenar[0].toUpperCase()).replace(/\s/g, '')) &&
            //       ((mappingOption.nama_produk.toUpperCase()).replace(/\s/g, '') === (pemecahbenar[1].toUpperCase()).replace(/\s/g, ''))
            //   ){
            //     Swal.fire({
            //       icon: 'error',
            //       title: 'Gagal, Data Sudah Ada',
            //     });
            //     tampunganValidasi = 1;
            //   }
            // });

            // setTimeout(() => {
            //   if(tampunganValidasi == 1){
            //     return;
            //   }else{
            const body = {
              nama_produk: pemecahbenar[1],
              kode_produk: pemecahbenar[0],
              id: '',
              skema_id: kodeskema,
              created_by: this.sessionStorage.retrieve('sessionRole'),
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
                }).then(() => {
                  window.location.reload();
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
            //   }
            // }, 30);
          }
        });
      }
    });
  }
}
