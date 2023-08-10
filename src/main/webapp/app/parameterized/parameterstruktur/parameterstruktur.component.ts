import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

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

  constructor(protected datEntryService: DataEntryService, protected http: HttpClient, private sessionStorage: SessionStorageService) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

      const options = this.dataretrive;
      const status = this.dataretrive.active;
      if (status === '1') {
        this.statusvalue = 'Aktif';
      } else {
        this.statusvalue = 'Tidak Aktif';
      }
      setTimeout(() => {
        Swal.fire({
          title: 'Edit Data Fasilitas',
          text: '',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Edit',
          cancelButtonText: 'Tidak',
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Data Fasilitas',
              html:
                '<br />' +
                '<div class="row form-material" style="width:100%">' +
                '<div class="form-group row">' +
                '<label class="col-sm-4 col-form-label">Status Aktif</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control" id="status_active">' +
                '<option value="' +
                status +
                '">' +
                this.statusvalue +
                '</option>' +
                '<option value="1">Aktif</option>' +
                '<option value="0">Tidak Aktif</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<p></p>' +
                '<div class="form-group row" id="dataValueDiv">' +
                '<label class="col-sm-4 col-form-label">Deskripsi</label>' +
                '<div class="col-sm-8">' +
                '<input type="text" class="form-control" id="deskripsi" value="' +
                options.deskripsi +
                '"/> ' +
                '</div>' +
                '</div>' +
                '<p></p>' +
                '<div class="form-group row" id="dataValueDiv">' +
                '<label class="col-sm-4 col-form-label">Fasilitas</label>' +
                '<div class="col-sm-8">' +
                '<input type="text" class="form-control" id="fasilitas" value="' +
                options.fasilitas +
                '" /> ' +
                '</div>' +
                '</div>' +
                '<p></p>' +
                '<div class="form-group row" id="dataValueDiv">' +
                '<label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
                '<div class="col-sm-8">' +
                '<input type="text" class="form-control" id="kode_fasilitas" value="' +
                options.kode_fasilitas +
                '"/>' +
                '</div>' +
                '</div>' +
                '</div>',
              allowOutsideClick: false,
              showDenyButton: true,
              focusConfirm: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ya',
              denyButtonText: 'Tidak',
            }).then(result => {
              if (result.isConfirmed) {
                const active = $('#status_active').val();
                const deskripsi = $('#deskripsi').val();
                const fasilitas = $('#fasilitas').val();
                const kode_fasilitas = $('#kode_fasilitas').val();

                if (active === '') {
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal, Status aktif harus dipilih',
                  });
                } else if (deskripsi === '') {
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal, Deskripsi harus dipilih',
                  });
                  return;
                } else if (fasilitas === '') {
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal, Fasilitas harus diisi',
                  });
                  return;
                } else if (kode_fasilitas === '') {
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal, Kode Fasilitas harus diisi',
                  });
                  return;
                } else {
                  if (active == '0') {
                    this.kirimactive = 0;
                  } else {
                    this.kirimactive = 1;
                  }

                  this.tablelistfasilitas.map((validasiFrontEndEdit: listCreatemodel) => {
                    if (
                      validasiFrontEndEdit.deskripsi === deskripsi &&
                      validasiFrontEndEdit.fasilitas === fasilitas &&
                      validasiFrontEndEdit.kode_fasilitas === kode_fasilitas
                    )
                      Swal.fire({
                        icon: 'error',
                        title: 'Gagal, Data Sudah Ada',
                      });
                  });

                  const body = {
                    id: id,
                    active: this.kirimactive,
                    deskripsi: deskripsi,
                    fasilitas: fasilitas,
                    kode_fasilitas: kode_fasilitas,
                    updated_by: this.sessionStorage.retrieve('sessionRole'),
                  };
                  const headers = new HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8',
                    // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
                  });
                  this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas', body, { headers }).subscribe({
                    next: () => {
                      this.dtElement.ngOnDestroy();
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
      }, 10);
    });
  }

  createfasilitas(): void {
    Swal.fire({
      title: 'Tambah Data input Parameter Fasilitas',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Tambah Data!',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Data Fasilitas',
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
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="deskripsi"/>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Fasilitas</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="fasilitas"/>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="kode_fasilitas"/>' +
            '</div>' +
            '</div>' +
            '</div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
          confirmButtonText: 'Simpan',
          denyButtonText: 'Tidak',
        }).then(result => {
          if (result.isConfirmed) {
            const deskripsi: any = $('#deskripsi').val();
            const fasilitas: any = $('#fasilitas').val();
            const kode_fasilitas: any = $('#kode_fasilitas').val();
            const active: any = $('#status_active').val();
            let tampunganValidasi: any = 0;

            if (active === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Status aktif harus dipilih',
              });
            } else if (deskripsi === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Deskripsi harus dipilih',
              });
              return;
            } else if (fasilitas === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Fasilitas harus diisi',
              });
              return;
            } else if (kode_fasilitas === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Kode Fasilitas harus diisi',
              });
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              this.tablelistfasilitas.map((validasiFrontEnd: listCreatemodel) => {
                if (
                  validasiFrontEnd.deskripsi.toUpperCase().replace(/\s/g, '') === deskripsi.toUpperCase().replace(/\s/g, '') &&
                  validasiFrontEnd.fasilitas.toUpperCase().replace(/\s/g, '') === fasilitas.toUpperCase().replace(/\s/g, '') &&
                  validasiFrontEnd.kode_fasilitas.toUpperCase().replace(/\s/g, '') === kode_fasilitas.toUpperCase().replace(/\s/g, '')
                ) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal, Data Sudah Ada',
                  });
                  tampunganValidasi = 1;
                }
              });

              setTimeout(() => {
                if (tampunganValidasi == 1) {
                  return;
                } else {
                  const body = {
                    id: 0,
                    active: this.kirimactive,
                    deskripsi: deskripsi,
                    fasilitas: fasilitas,
                    kode_fasilitas: kode_fasilitas,
                    created_by: this.sessionStorage.retrieve('sessionRole'),
                  };
                  const headers = new HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8',
                    // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
                  });
                  this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas', body, { headers }).subscribe({
                    next: () => {
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
                }
              }, 30);
            }
          }
        });
      }
    });
  }
}
