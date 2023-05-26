import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-parameterftpdpdetail',
  templateUrl: './parameterftpdpdetail.component.html',
  styleUrls: ['./parameterftpdpdetail.component.scss'],
})
export class ParameterftpdpdetailComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  createform!: FormGroup;
  tampunganidviewdetail: any;
  tableftvdpdetail: any;
  tableftvdpdetailid: any;
  tampungpemecah: any;
  id: any;
  tipeproperti: any;
  tipepropertideskripsi: any;
  // tablelistfasilitaslistrik: listCreatemodel[] = [];
  tablelistfasilitas: listCreatemodel[] = [];
  tableAgunanlisttipeagunan: any;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(protected http: HttpClient, protected datEntryService: DataEntryService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.datEntryService.getFetchListTipeAgunan().subscribe(table => {
      this.tableAgunanlisttipeagunan = table.result;
      // console.log(this.tablelistskema);
    });

    this.datEntryService.getFetchKodeFasilitas().subscribe(table => {
      this.tablelistfasilitas = table.result;
    });

    this.datEntryService.getlistftvdpdetail(this.id).subscribe(table => {
      this.tableftvdpdetail = table.result;
      this.dtTrigger.next(this.tableftvdpdetail);
    });

    // this.datEntryService.getlistftvdpdetail(id).subscribe({
    //   next: de => {
    //     this.tableftvdpdetail = de.result;
    //     // console.warn(this.tableftvdpdetail);
    //   },
  }

  viewftvdetail(id: any): void {
    this.createform.get('contoh')?.setValue('7');
    this.tampunganidviewdetail = id;

    this.datEntryService.getlistftvdpdetail(id).subscribe({
      next: de => {
        this.tableftvdpdetail = de.result;
        // console.warn(this.tableftvdpdetail);
      },
      // error: err => {
      //   console.warn('fff', err)
      //   this.getLoading(false);
      // }
    });
  }

  createftpdpdetail(): void {
    // alert("test");
    const baseUrl = this.baseUrl;
    const options = this.tablelistfasilitas.map((option: any) => {
      return `
      <option key="${option}" value="${option.id}">
          ${option.fasilitas}
      </option>
    `;
    });

    const optionsagunan = this.tableAgunanlisttipeagunan.map((option: any) => {
      return `
      <option key="${option}" value="${option.type_collateral_code}">
          ${option.collateral_deskripsi}
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
        let hahaha;
        $(document).ready(function () {
          $('#kode_agunan').change(function () {
            const parameterValue = $(this).val();
            hahaha = parameterValue;
            // console.warn(hahaha);
            // console.warn(parameterValue);
            fetch(baseUrl + `v1/efos-de/list_tipe_properti?sp=` + hahaha)
              .then(function (response) {
                return response.json();
              })
              .then(data => {
                let kabkota;
                $('#tipe_properti').empty();
                data.result.forEach((i: any) => {
                  kabkota =
                    '<option value="' + i['type_collateral'] + '|' + i['properti_deskripsi'] + '">' + i['properti_deskripsi'] + '</option>';
                  kabkota = kabkota + '';
                  $('#tipe_properti').append(kabkota);
                });
              });
          });

          $('#kode_fasilitas').change(function () {
            if ($('#kode_fasilitas').val() === '1') {
              $('#kodeagunanid').attr('hidden', 'true');
              $('#tipeperoperitid').attr('hidden', 'true');
              // $('#kode_agunan').attr('hidden', 'true');
            } else {
            }
          });
        });

        Swal.fire({
          title: 'Create FTP Detail ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label"> Fasilitas</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_fasilitas"><option value="">Pilih Parameter</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="kodeagunanid"><label class="col-sm-4 col-form-label"> Agunan</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_agunan"><option value="">Pilih Parameter</option>' +
            `${optionsagunan}` +
            '</select>' +
            '<br />' +
            '</div></div>' +
            '<div class="form-lable row " id="tipeperoperitid"><label class="col-sm-4 col-form-label">Properti</label>' +
            '<div class="col-sm-8">  <select id="tipe_properti" class="form-control"><option value="">Pilih Status</option></select>' +
            '<br />' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min </label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Min"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Max"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">FTV</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="ftv"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">dp</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="dp"/> ' +
            '</div></div>',

          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const kode_fasilitas = $('#kode_fasilitas').val();
            const kode_agunan = $('#kode_agunan').val();
            const tipe_properti = $('#tipe_properti').val();
            const Min = $('#Min').val();
            const Max = $('#Max').val();
            const ftv = $('#ftv').val();
            const dp = $('#dp').val();

            this.tampungpemecah = $('#tipe_properti').val();

            const pemecahbenar = this.tampungpemecah.split('|');

            alert(kode_fasilitas);

            // return;

            if (kode_fasilitas === '') {
              alert('Status Aktif Harus Di isi');
              return;
            }

            if (kode_fasilitas == '1') {
              if (Min === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (Max === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (ftv === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (dp === '') {
                alert('Fasilitas  harus di isi');
                return;
              }

              this.tipeproperti = ' ';
              this.tipepropertideskripsi = 'PTA';
            } else {
              if (kode_agunan === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (tipe_properti === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (Min === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (Max === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (ftv === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (dp === '') {
                alert('Fasilitas  harus di isi');
                return;
              }

              this.tipeproperti = pemecahbenar[0];
              this.tipepropertideskripsi = pemecahbenar[1];
            }

            const body = {
              dp: dp,
              fasilitas: kode_fasilitas,
              ftv: ftv,
              id: '0',
              id_ftv_dp: this.id,
              min: Min,
              max: Max,
              tipe_properti: this.tipeproperti,
              tipe_properti_deskripsi: this.tipepropertideskripsi,
            };

            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_dp_detail', body, { headers }).subscribe({
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

  editftpdpdetail(id: any): void {
    this.datEntryService.getdataretriveftvdetail(this.id).subscribe(table => {
      this.tableftvdpdetailid = table.result;
      // this.dtTrigger.next(this.tableftvdpdetail);
    });

    // alert("test");
    const dp = this.tableftvdpdetailid.dp;
    const min = this.tableftvdpdetailid.min;
    const max = this.tableftvdpdetailid.max;

    const baseUrl = this.baseUrl;
    const options = this.tablelistfasilitas.map((option: any) => {
      return `
      <option key="${option}" value="${option.id}">
          ${option.fasilitas}
      </option>
    `;
    });

    const optionsagunan = this.tableAgunanlisttipeagunan.map((option: any) => {
      return `
      <option key="${option}" value="${option.type_collateral_code}">
          ${option.collateral_deskripsi}
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
        let hahaha;
        $(document).ready(function () {
          $('#kode_agunan').change(function () {
            const parameterValue = $(this).val();
            hahaha = parameterValue;
            // console.warn(hahaha);
            // console.warn(parameterValue);
            fetch(baseUrl + `v1/efos-de/list_tipe_properti?sp=` + hahaha)
              .then(function (response) {
                return response.json();
              })
              .then(data => {
                let kabkota;
                $('#tipe_properti').empty();
                data.result.forEach((i: any) => {
                  kabkota =
                    '<option value="' + i['type_collateral'] + '|' + i['properti_deskripsi'] + '">' + i['properti_deskripsi'] + '</option>';
                  kabkota = kabkota + '';
                  $('#tipe_properti').append(kabkota);
                });
              });
          });

          $('#kode_fasilitas').change(function () {
            if ($('#kode_fasilitas').val() === '1') {
              $('#kodeagunanid').attr('hidden', 'true');
              $('#tipeperoperitid').attr('hidden', 'true');
              // $('#kode_agunan').attr('hidden', 'true');
            } else {
            }
          });
        });

        Swal.fire({
          title: 'Create FTP Detail ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label"> Fasilitas</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_fasilitas"><option value="">Pilih Parameter</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="kodeagunanid"><label class="col-sm-4 col-form-label"> Agunan</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_agunan"><option value="">Pilih Parameter</option>' +
            `${optionsagunan}` +
            '</select>' +
            '<br />' +
            '</div></div>' +
            '<div class="form-lable row " id="tipeperoperitid"><label class="col-sm-4 col-form-label">Properti</label>' +
            '<div class="col-sm-8">  <select id="tipe_properti" class="form-control"><option value="">Pilih Status</option></select>' +
            '<br />' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min </label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Min"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="Max"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">FTV</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="ftv"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">dp</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="dp"/> ' +
            '</div></div>',

          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const kode_fasilitas = $('#kode_fasilitas').val();
            const kode_agunan = $('#kode_agunan').val();
            const tipe_properti = $('#tipe_properti').val();
            const Min = $('#Min').val();
            const Max = $('#Max').val();
            const ftv = $('#ftv').val();
            const dp = $('#dp').val();

            this.tampungpemecah = $('#tipe_properti').val();

            const pemecahbenar = this.tampungpemecah.split('|');

            alert(kode_fasilitas);

            // return;

            if (kode_fasilitas === '') {
              alert('Status Aktif Harus Di isi');
              return;
            }

            if (kode_fasilitas == '1') {
              if (Min === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (Max === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (ftv === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (dp === '') {
                alert('Fasilitas  harus di isi');
                return;
              }

              this.tipeproperti = ' ';
              this.tipepropertideskripsi = 'PTA';
            } else {
              if (kode_agunan === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (tipe_properti === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (Min === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (Max === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (ftv === '') {
                alert('Fasilitas  harus di isi');
                return;
              } else if (dp === '') {
                alert('Fasilitas  harus di isi');
                return;
              }

              this.tipeproperti = pemecahbenar[0];
              this.tipepropertideskripsi = pemecahbenar[1];
            }

            const body = {
              dp: dp,
              fasilitas: kode_fasilitas,
              ftv: ftv,
              id: '0',
              id_ftv_dp: this.id,
              min: Min,
              max: Max,
              tipe_properti: this.tipeproperti,
              tipe_properti_deskripsi: this.tipepropertideskripsi,
            };

            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_dp_detail', body, { headers }).subscribe({
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
