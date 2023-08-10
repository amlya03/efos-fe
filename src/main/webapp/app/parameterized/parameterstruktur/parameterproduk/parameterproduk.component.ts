import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { parameterModel } from 'app/parameterized/config/parameterModel.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { listProdukModel } from 'app/parameterized/config/listProdukModel.model';

@Component({
  selector: 'jhi-parameterproduk',
  templateUrl: './parameterproduk.component.html',
  styleUrls: ['./parameterproduk.component.scss'],
})
export class ParameterprodukComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;

  tablelistprogram: listCreatemodel[] = [];
  tablelistproduk: listProdukModel[] = [];
  dataretrive: any;
  getdataretriveprogram: any;
  dataretriveprogram: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.datEntryService.getListprogram().subscribe(table => {
      this.tablelistprogram = table.result;
    });
    this.datEntryService.getListprodukall().subscribe(table => {
      this.tablelistproduk = table.result;
      this.dtTrigger.next(this.tablelistproduk);
    });
  }

  createproduk(): void {
    let tampunganValidasi: any = 0;
    const options = this.tablelistprogram.map((option: any) => {
      return `
        <option key="${option}" value="${option.kode_program}">
            ${option.program}
        </option>
      `;
    });

    // /// menanti api  untuk kodeProgram
    Swal.fire({
      title: 'Tambah Data input Deskripsi Program?',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Tambah Data!',
      cancelButtonText: 'Tidak!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Tambah Data Deskripsi Program',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%">' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Kode program</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="kode_program">' +
            '<option value="">Pilih Program</option>' +
            `${options}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv">' +
            '<label class="col-sm-4 col-form-label">Deskripsi Program</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="produk_deskripsi"/> ' +
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
            let kode_program: any = $('#kode_program').val();
            let produk_deskripsi: any = $('#produk_deskripsi').val();

            if (kode_program === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Kode Program Harus di pilih',
              });
              return;
            } else if (produk_deskripsi === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Deskripsi Produk Harus di pilih',
              });
              return;
            } else {
              this.tablelistproduk.map((validasiFrontEnd: listProdukModel) => {
                if (
                  validasiFrontEnd.kode_program.toUpperCase().replace(/\s/g, '') === kode_program.toUpperCase().replace(/\s/g, '') &&
                  validasiFrontEnd.produk_deskripsi.toUpperCase().replace(/\s/g, '') === produk_deskripsi.toUpperCase().replace(/\s/g, '')
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
                    id: '0',
                    kode_program: kode_program,
                    kode_produk: '',
                    produk_deskripsi: produk_deskripsi,
                  };
                  const headers = new HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8',
                    // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
                  });
                  this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_produk', body, { headers }).subscribe({
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
                }
              }, 30);
            }
          }
        });
      }
    });
  }

  viewdataproduk(id: any): void {
    let dataretrive: any;
    // /// menanti api  untuk kodeProgram
    const options = this.tablelistprogram.map((option: any) => {
      return `
        <option key="${option}" value="${option.kode_program}">
            ${option.program}
        </option>
      `;
    });

    this.datEntryService.getdataretriveproduk(id).subscribe({
      next: table => {
        this.dataretrive = table.result;

        this.datEntryService.getListprogram().subscribe(table => {
          this.dataretriveprogram = table.result;

          dataretrive = this.dataretriveprogram.find((value: parameterModel) => value.kode_program === this.dataretrive.kode_program);
          console.warn(dataretrive.program);
        });
      },
    });

    // /// menanti api  untuk kodeProgram
    Swal.fire({
      title: 'Edit Data Deskripsi Program',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit Data',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Edit Deskripsi Program ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode program</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_program"><option value="' +
            this.dataretrive.kode_program +
            '">' +
            dataretrive.program +
            '</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Produk Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="produk_deskripsi" value="' +
            this.dataretrive.produk_deskripsi +
            '"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Simpan',
          denyButtonText: 'Tidak',
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
                id: id,
                kode_program: kode_program,
                kode_produk: '',
                produk_deskripsi: produk_deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_produk', body, { headers }).subscribe({
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
