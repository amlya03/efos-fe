import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-parameterized',
  templateUrl: './parameterized.component.html',
  styleUrls: ['./parameterized.component.scss'],
})
export class ParameterizedComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  createform!: FormGroup;
  tableAgunan: listCreatemodel[] = [];
  tabledatascoring: listCreatemodel[] = [];
  tablelistdeveloper: listCreatemodel[] = [];
  tablelistfasilitaslistrik: listCreatemodel[] = [];
  tablelisthubunganagunan: listCreatemodel[] = [];
  tablelisthubunganemergency: listCreatemodel[] = [];
  tablelistjabatan: listCreatemodel[] = [];
  tablelistjabatanpemberiket: listCreatemodel[] = [];
  tablelistobjekagunan: listCreatemodel[] = [];
  tablelistjenispekerjaan: listCreatemodel[] = [];
  tablelistfasilitas: listCreatemodel[] = [];
  statusaktif: any;
  kirimactive: any;
  Kodefasilitas: any;
  inputScoring: any;
  tablelistproduk: any;
  tablelistprogram: any;
  tampungpemecah: any;
  tablelistskema: any;
  kirimanskema: any;
  kirimanskemadeskripsi: any;
  kirimantenortier: any;
  tablelistskemanew: any;
  hasiltembakapi: any;
  tablelistftvdp: any;
  tampunganidviewdetail: any;
  tableftvdpdetail: any;
  tableAgunanlisttipeagunan: any;
  constructor(private formBuilder: FormBuilder, protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnInit(): void {
    this.createform = this.formBuilder.group({
      contoh: [''],
      status_aktifitas: [''],
      akses_rumah: [''],
      deskripsi: [''],
    });

    this.datEntryService.getFetchListAksesRumah().subscribe(table => {
      this.tableAgunan = table.result;
      // console.log(this.tableAgunan);
    });

    this.datEntryService.getListdatascoringtable().subscribe(table => {
      this.tabledatascoring = table.result;
    });

    this.datEntryService.getFetchListDeveloper().subscribe(table => {
      this.tablelistdeveloper = table.result;
    });

    this.datEntryService.getFetchListFasilitasListrik().subscribe(table => {
      this.tablelistfasilitaslistrik = table.result;
    });

    this.datEntryService.getFetchListPemegangHak().subscribe(table => {
      this.tablelisthubunganagunan = table.result;
    });

    this.datEntryService.getFetchListEmergency().subscribe(table => {
      this.tablelisthubunganemergency = table.result;
    });

    this.datEntryService.getFetchListJabatan().subscribe(table => {
      this.tablelistjabatan = table.result;
    });

    this.datEntryService.getListJabatanPemberiKet().subscribe(table => {
      this.tablelistjabatanpemberiket = table.result;
    });

    this.datEntryService.getFetchListObjekAgunan().subscribe(table => {
      this.tablelistobjekagunan = table.result;
    });

    this.datEntryService.getFetchListJenisPekerjaan().subscribe(table => {
      this.tablelistjenispekerjaan = table.result;
    });
    this.datEntryService.getFetchKodeFasilitas().subscribe(table => {
      this.tablelistfasilitas = table.result;
    });
    this.datEntryService.getFetchKodeFasilitas().subscribe(data => {
      this.inputScoring = data.result;
    });
    this.datEntryService.getListproduk().subscribe(table => {
      this.tablelistproduk = table.result;
    });
    this.datEntryService.getListprogram().subscribe(table => {
      this.tablelistprogram = table.result;
    });
    this.datEntryService.getListskema().subscribe(table => {
      this.tablelistskema = table.result;
      // console.log(this.tablelistskema);
    });
    this.datEntryService.getFetchListTipeAgunan().subscribe(table => {
      this.tableAgunanlisttipeagunan = table.result;
      // console.log(this.tablelistskema);
    });

    this.datEntryService.getListskemanew().subscribe(table => {
      this.tablelistskemanew = table.result;
      // console.log(this.tablelistskema);
    });

    this.datEntryService.getListftvdp().subscribe(table => {
      this.tablelistftvdp = table.result;
      // console.log(this.tablelistftvdp);
    });
  }

  //1
  createaksesrumah(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create akses rumah dddd',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8"><select class="form-control" id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            let active = $('#status_active').val();
            let akses_rumah = $('#akses_rumah').val();

            if (active == '') {
              alert('Status Harus di pilih');
              return;
            } else if (akses_rumah == '') {
              alert('Akses Rumah Harus  di Pilih');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                akses_rumah: akses_rumah,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_akses_rumah++++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //datascoring gk di masukan
  //3
  createdeveloper(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Developer',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%"><div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8"><select class="form-control" id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            let active = $('#status_active').val();
            let jenis_developer = $('#Jenis_developer').val();
            let kantor_Cabang = $('#Kantor_Cabang').val();
            let nama_developer = $('#Nama_developer').val();

            if (active == '') {
              alert('Status Harus di pilih');
              return;
            } else if (jenis_developer == '') {
              alert('Jenis Developer harus di isi');
              return;
            } else if (kantor_Cabang == '') {
              alert('Kantor Cabang harus di isi');
              return;
            } else if (nama_developer == '') {
              alert('Nama Developer harus di isi');
              return;
            } else {
              if (active == '0') {
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
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_developer++++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //4
  createfasilitas(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create fasilitas',
          html:
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
            let deskripsi = $('#deskripsi').val();
            let fasilitas = $('#fasilitas').val();
            let kode_fasilitas = $('#kode_fasilitas').val();

            if (deskripsi == '') {
              alert('Deskripsi harus di isi');
              return;
            } else if (fasilitas == '') {
              alert('Fasilitas harus di isi');
              return;
            } else if (kode_fasilitas == '') {
              alert('Kode Fasilitas harus di isi');
              return;
            } else {
              const body = {
                deskripsi: deskripsi,
                fasilitas: fasilitas,
                kode_fasilitas: kode_fasilitas,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //5
  createfasilitaslistrik(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Fasilitas Listrik ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Fasilitas Listrik</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="fasilitas_listrik"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let fasilitas_listrik = $('#fasilitas_listrik').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (fasilitas_listrik == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                fasilitas_listrik: fasilitas_listrik,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas_listrik+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //6
  createftpdp(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        let options = this.tablelistproduk.map((option: any) => {
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
            let parameterValue = $(this).val() as HTMLElement | any;
            hahaha = parameterValue.split('|');
            console.warn(hahaha);
            console.warn(parameterValue);
            fetch(`http://10.20.34.178:8805/api/v1/efos-ref/list_skema_ftv?ss=` + hahaha[0])
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
            let jangankodeproduk = $('#jangankodeproduk').val();
            let kodeskema = $('#kodeskema').val();

            this.tampungpemecah = $('#jangankodeproduk').val();
            const pemecahbenar = this.tampungpemecah.split('|');

            if (jangankodeproduk == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (kodeskema == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            }

            const body = {
              nama_produk: pemecahbenar[1],
              kode_produk: pemecahbenar[0],
              id: '',
              skema_id: kodeskema,
            };
            let headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_dp', body, { headers }).subscribe({
              next: response => {
                //console.warn(response);
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
              error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }

  viewftvdetail(id: any): void {
    this.createform.get('contoh')?.setValue('7');
    this.tampunganidviewdetail = id;

    this.datEntryService.getlistftvdpdetail(id).subscribe({
      next: de => {
        this.tableftvdpdetail = de.result;
        console.warn(this.tableftvdpdetail);
      },
      // error: err => {
      //   console.warn('fff', err)
      //   this.getLoading(false);
      // }
    });

    // this.getLoading(true);
    // this.router
    //   .navigate(['/data-entry/personalinfo'], {
    //     queryParams: { curef: getCuref, app_no_de: getAppNoDe },
    //   })
    //   .then(() => {
    //     window.location.reload();
    //   });
  }

  //7
  createftpdpdetail(): void {
    let options = this.tablelistfasilitas.map((option: any) => {
      return `
        <option key="${option}" value="${option.id}">
            ${option.fasilitas}
        </option>
      `;
    });

    let optionsagunan = this.tableAgunanlisttipeagunan.map((option: any) => {
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
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        let hahaha;
        $(document).ready(function () {
          $('#kode_agunan').change(function () {
            let parameterValue = $(this).val();
            hahaha = parameterValue;
            console.warn(hahaha);
            console.warn(parameterValue);
            fetch(`http://10.20.34.110:8805/api/v1/efos-de/list_tipe_properti?sp=` + hahaha)
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
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label"> Agunan</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_agunan"><option value="">Pilih Parameter</option>' +
            `${optionsagunan}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Properti</label>' +
            '<div class="col-sm-8">  <select id="tipe_properti" class="form-control"><option value="">Pilih status</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min Listrik</label>' +
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
            let kode_fasilitas = $('#kode_fasilitas').val();
            let kode_agunan = $('#kode_agunan').val();
            let tipe_properti = $('#tipe_properti').val();
            let Min = $('#Min').val();
            let Max = $('#Max').val();
            let ftv = $('#ftv').val();
            let dp = $('#dp').val();

            this.tampungpemecah = $('#tipe_properti').val();

            const pemecahbenar = this.tampungpemecah.split('|');

            if (kode_fasilitas == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (kode_agunan == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (tipe_properti == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (Min == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (Max == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (ftv == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (dp == '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else {
              const body = {
                dp: dp,
                fasilitas: kode_fasilitas,
                ftv: ftv,
                id: '',
                id_ftv_dp: this.tampunganidviewdetail,
                min: Min,
                max: Max,
                tipe_properti: pemecahbenar[0],
                tipe_properti_deskripsi: pemecahbenar[1],
              };

              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_ftv_dp_detail', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //8
  createhubkepemilikanagunan(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Hubungan Kepemilikan Agunan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi == '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_hub_kepemilikan_agunan+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //9
  createhubunganemergency(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Hubungan Emergency',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi == '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_hubungan_emergency+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //10
  createjabatan(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jabatan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="jabatan_deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let jabatan_deskripsi = $('#jabatan_deskripsi').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (jabatan_deskripsi == '') {
              alert('Jabatan Deskripsi harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                jabatan_deskripsi: jabatan_deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jabatan+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //11
  createjabatanpemberiket(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jabatan Pemberi Keterangan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Jabatan Pemberi keterangan</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi == '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jabatan_pemberi_ket+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //12
  createjenisobjekagunan(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jenis Objek Agunan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Objek agunan</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="jenis_objek_deskripsi"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Kode Objek agunan</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="jenis_objek_code"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let jenis_objek_deskripsi = $('#jenis_objek_deskripsi').val();
            let jenis_objek_code = $('#jenis_objek_code').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (jenis_objek_deskripsi == '') {
              alert('Jenis Objek Deskripsi harus di isi');
              return;
            } else if (jenis_objek_code == '') {
              alert('Jenis Objek code harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                jenis_objek_deskripsi: jenis_objek_deskripsi,
                jenis_objek_code: jenis_objek_code,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jenis_objek_agunan+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //13
  createjenispekerjaan(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jenis Pekerjaan',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Pekerjaan</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();

            if (active == '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi == '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //14
  createproduk(): void {
    ///// menanti api  untuk kodeProgram
    let options = this.tablelistprogram.map((option: any) => {
      return `
        <option key="${option}" value="${option.kode_program}">
            ${option.program}
        </option>
      `;
    });

    ///// menanti api  untuk kodeProgram
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
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
            let kode_program = $('#kode_program').val();
            let produk_deskripsi = $('#produk_deskripsi').val();

            //  if(active=='0'){
            //     this.kirimactive=0;
            //  }else{
            //   this.kirimactive=1;
            //  }
            if (kode_program == '') {
              alert('Kode Program Harus Di isi');
              return;
            } else if (produk_deskripsi == '') {
              alert('Produk Deskripsi harus di isi');
              return;
            } else {
              const body = {
                kode_program: kode_program,
                kode_produk: '',
                produk_deskripsi: produk_deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_produk+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //15
  createskema(): void {
    /////DELAY
    ///// menanti api  untuk kodeproduk
    let options = this.tablelistproduk.map((option: any) => {
      return `
            <option key="${option}" value="${option.kode_produk}">
                ${option.produk_deskripsi}
            </option>
          `;
    });

    let optionsskema = this.tablelistskema.map((option: any) => {
      return `
            <option key="${option}" value="${option.skema}|${option.skema_deskripsi}">
                ${option.skema_deskripsi}
            </option>
          `;
    });
    ///// menanti api  untuk kodeproduk
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        $(document).ready(function () {
          $('#kode_produk1').change(function () {
            if ($('#kode_produk1').val() === 'lainya') {
              alert('ini');
              $('#lainya1').removeAttr('hidden');
            } else {
              alert('else');
              $('#lainya1').attr('hidden', 'true');
            }
          });
        });

        Swal.fire({
          title: 'Create Skema',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode produk</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_produk"><option value="">Pilih produk</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode produk</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_produk1"><option value="">Pilih skema</option>' +
            `${optionsskema}` +
            '<option value="lainya">Lainya</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="lainya1" hidden><label class="col-sm-4 col-form-label hidden">Deskripsi skema</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="skema_deskripsi"/>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">dp</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="dp_min"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max Platfon</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_platfon"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min Platfon</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="min_platfon"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max tenor</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_tenor"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">SKEMA MASTER</label>' +
            '<div class="col-sm-8"><select class="form-control" id="skema_master"><option value="">Pilih produk</option> <option value="1">FIX income</option> <option value="2">NonFix</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">---</label>' +
            '<div class="col-sm-8"><select class="form-control" id="skema_master"><option value="">Pilih produk</option> <option value="1">FIX income</option> <option value="2">NonFix</option></select>' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let kode_produk = $('#kode_produk').val();
            let min_platfon = $('#min_platfon').val();
            let max_platfon = $('#max_platfon').val();
            let max_tenor = $('#max_tenor').val();
            let skema_master = $('#skema_master').val();
            let skema_deskripsi = $('#kode_produk').val();
            let skema = $('#kode_produk1').val();
            let dp_min = $('#dp_min').val();
            //  if(active=='0'){
            //     this.kirimactive=0;
            //  }else{
            //   this.kirimactive=1;
            //  }
            if (kode_produk == '') {
              alert('Kode Produk Harus Di isi');
              return;
            } else if (min_platfon == '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_platfon == '') {
              alert('Max Platfon harus di isi');
              return;
            } else if (max_tenor == '') {
              alert('Max Tenor harus di isi');
              return;
            } else if (skema_master == '') {
              alert('Skema Master harus di isi');
              return;
            } else if (skema == '') {
              alert('Skema harus di isi');
              return;
            } else {
              if (skema == 'lainya') {
                alert($('#skema_deskripsi').val());
                this.kirimanskema = '';
                this.kirimanskemadeskripsi = $('#skema_deskripsi').val();
              } else {
                this.tampungpemecah = $('#kode_produk1').val();

                const pemecahbenar = this.tampungpemecah.split('|');
                this.kirimanskema = pemecahbenar[0];
                this.kirimanskemadeskripsi = pemecahbenar[1];
              }

              const body = {
                dp_min: dp_min,
                kode_produk: kode_produk,
                min_platfon: min_platfon,
                max_platfon: max_platfon,
                max_tenor: max_tenor,
                skema_master: skema_master,
                skema_deskripsi: this.kirimanskemadeskripsi,
                skema: this.kirimanskema,
                fasilitas: '',
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //16
  createprogram(): void {
    let options = this.inputScoring.map((option: any) => {
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
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Program',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Kode Fasilitas</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_fasilitas"><option value="">Pilih Parameter</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Program</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="program"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="min_plafond"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_plafond"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Expired Date</label>' +
            '<div class="col-sm-8"><input type="date" class="form-control" id="expired_date"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let kode_fasilitas = $('#kode_fasilitas').val();
            let program = $('#program').val();
            let min_plafond = $('#min_plafond').val();
            let max_plafond = $('#max_plafond').val();
            let expired_date = $('#expired_date').val();

            if (kode_fasilitas == '') {
              alert('Kode Fasilitas Harus Di isi');
              return;
            } else if (program == '') {
              alert('Profram harus di isi');
              return;
            } else if (min_plafond == '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_plafond == '') {
              alert('Max Plafond harus di isi');
              return;
            } else if (expired_date == '') {
              alert('Expired date harus di isi');
              return;
            } else {
              //  if(active=='0'){
              //     this.kirimactive=0;
              //  }else{
              //   this.kirimactive=1;
              //  }

              const body = {
                kode_fasilitas: kode_fasilitas,
                program: program,
                min_plafond: min_plafond,
                max_plafond: max_plafond,
                expired_date: expired_date,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //17
  createskemafasilitas(): void {
    let options = this.tablelistskemanew.map((option: any) => {
      return `
        <option key="${option}" value="${option.skema}|${option.skema_master}">
            ${option.skema_deskripsi}
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
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        $(document).ready(function () {
          $('#kode_skema').change(function () {
            // let pemecahskemafasilitas = $('#kode_skema').val();
            const pemecahskemafasilitas = document.getElementById('kode_skema') as HTMLElement | any;
            const kondisiskemamaster = pemecahskemafasilitas.value.split('|');

            if (kondisiskemamaster[1] === '2') {
              $('#id_tear').removeAttr('hidden');
            } else {
              $('#id_tear').attr('hidden', 'true');
            }
          });

          $('#tear_select').change(function () {
            alert('tear on select');
            alert($('#tear_select').val());

            if ($('#tear_select').val() === '1') {
              $('#id_tenortear1').removeAttr('hidden');
            } else if ($('#tear_select').val() === '2') {
              $('#id_tenortear1').removeAttr('hidden');
              $('#id_tenortear2').removeAttr('hidden');
            } else if ($('#tear_select').val() === '3') {
              $('#id_tenortear1').removeAttr('hidden');
              $('#id_tenortear2').removeAttr('hidden');
              $('#id_tenortear3').removeAttr('hidden');
            } else {
              $('#id_tenortear1').attr('hidden', 'true');
              $('#id_tenortear2').attr('hidden', 'true');
              $('#id_tenortear3').attr('hidden', 'true');
            }
          });
        });

        Swal.fire({
          title: 'Create Skema Fasilitas',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">status Aktif</label>' +
            '<div class="col-sm-8">  <select  id="status_active" class="form-control"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Skema</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_skema"><option value="">Pilih Skema</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<div class="form-lable row" id="id_tear"  hidden><label class="col-sm-4 col-form-label">tier</label>' +
            '<div class="col-sm-8"> <select id="tear_select" class="form-control"><option value="">Pilih tier</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="id_tenortear1" hidden><label class="col-sm-4 col-form-label">tenor_tier</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor_tier1"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="id_tenortear2" hidden><label class="col-sm-4 col-form-label">tenor_tier2</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor_tier2"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="id_tenortear3" hidden><label class="col-sm-4 col-form-label">tenor_tier3</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor_tier3"/> ' +
            '</div></div>',

          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let kode_skema = $('#kode_skema').val();
            let tear_select = $('#tear_select').val();
            let tenor_tier1 = $('#tenor_tier1').val();
            let tenor_tier2 = $('#tenor_tier2').val();
            let tenor_tier3 = $('#tenor_tier3').val();

            if (active == '') {
              alert('Kode Fasilitas Harus Di isi');
              return;
            } else if (tear_select == '') {
              alert('Profram harus di isi');
              return;
            } else {
              if (active == '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              if (tear_select == '1') {
                if (tenor_tier1 == '') {
                  alert('tenor tier 1 Harus Di isi');
                  return;
                }
                this.kirimantenortier = tenor_tier1;
              } else if (tear_select == '2') {
                if (tenor_tier1 == '') {
                  alert('tenor tier 1 Harus Di isi');
                  return;
                } else if (tenor_tier2 == '') {
                  alert('tenor tier 2 Harus Di isi');
                  return;
                }
                this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2;
              } else {
                if (tenor_tier1 == '') {
                  alert('tenor tier 1 Harus Di isi');
                  return;
                }
                if (tenor_tier2 == '') {
                  alert('tenor tier 2 Harus Di isi');
                  return;
                }
                if (tenor_tier3 == '') {
                  alert('tenor tier 3 Harus Di isi');
                  return;
                }
                this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2 + '-' + tenor_tier3;
              }

              this.tampungpemecah = $('#kode_skema').val();

              const pemecahbenar = this.tampungpemecah.split('|');
              this.kirimanskema = pemecahbenar[0];
              //  this.kirimanskemadeskripsi=pemecahbenar[1];

              const body = {
                active: this.kirimactive,
                skema_id: this.kirimanskema,
                tier: tear_select,
                tenor_tier: this.kirimantenortier,
                fasilitas: '0',
                // max_plafond:max_plafond,
                // expired_date:expired_date,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema_fasilitas++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //18
  createstenormarginfix(): void {
    let options = this.inputScoring.map((option: any) => {
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
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Tenor Margin Fix',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Skema fasilitas</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="skema_fasilitas"><option value="">Pilih skema Fasilitas</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Margin</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="margin"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">tn code</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tn_code"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let skema_fasilitas = $('#skema_fasilitas').val();
            let margin = $('#margin').val();
            let tn_code = $('#tn_code').val();
            // let max_plafond = $('#max_plafond').val();
            // let expired_date = $('#expired_date').val();

            if ((skema_fasilitas = '')) {
              alert('Skema Fasilitas Harus Di isi ');
              return;
            } else if ((margin = '')) {
              alert('Margin Harus Di isi');
              return;
            } else if ((tn_code = '')) {
              alert('Tn Code Harus Di isi');
              return;
            } else {
              //  if(active=='0'){
              //     this.kirimactive=0;
              //  }else{
              //   this.kirimactive=1;
              //  }

              const body = {
                skema_fasilitas: skema_fasilitas,
                margin: margin,
                tn_code: tn_code,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }
  //19
  createstenormarginstepup(): void {
    let options = this.inputScoring.map((option: any) => {
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
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Tenor Margin Step Up',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Skema fasilitas</label>' +
            // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-8"><select class="form-control" id="skema_fasilitas"><option value="">Pilih skema Fasilitas</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Margin</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="margin"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">tn code</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tn_code"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let skema_fasilitas = $('#skema_fasilitas').val();
            let margin = $('#margin').val();
            let tn_code = $('#tn_code').val();

            if ((skema_fasilitas = '')) {
              alert('Skema Fasilitas harus di isi');
              return;
            } else if ((margin = '')) {
              alert('Margin harus di isi');
              return;
            } else if ((tn_code = '')) {
              alert('Tn code harus di isi');
              return;
            } else {
              //  if(active=='0'){
              //     this.kirimactive=0;
              //  }else{
              //   this.kirimactive=1;
              //  }

              const body = {
                skema_fasilitas: skema_fasilitas,
                margin: margin,
                tn_code: tn_code,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program+++', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
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
                error: error => {
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
          } else if (result.isDenied) {
          }
        });
      }
    });
  }

  createaksesrumahgagal(): void {
    if (this.createform.get('status_aktifitas')?.value == '0') {
      this.statusaktif = 0;
    } else {
      this.statusaktif = 1;
    }

    const body = {
      //  id:'0',
      // active: 1,
      active: this.statusaktif,
      akses_rumah: this.createform.get('akses_rumah')?.value,
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
    });

    this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_akses_rumah', body, { headers }).subscribe({
      next: response => {
        //console.warn(response);
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
          title: 'Data telah di tambahkan ',
        });
        window.location.reload();
      },
      error: error => {
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
          title: 'Gagal Simpan data',
        });
      },
    });

    // const provinsi_agunan = this.createform.get('provinsi_agunan')?.value;
    // this.http
    //   .post<any>(this.baseUrl + 'v1/efos-de/create_akses_rumah', {

    //     active: this.createform.get('status_aktifitas')?.value,
    //     akses_rumah: this.createform.get('akses_rumah')?.value,
    //   })
    //   .subscribe({
    //     next(bawaan) {
    //       console.warn(bawaan);
    //       alert('Berhasil Menyimpan Data');
    //       window.location.reload();
    //     },
    //   });
  }

  createjabatanpemberiketgagal(): void {
    if (this.createform.get('status_aktifitas')?.value == '0') {
      alert('0');
      this.statusaktif = 0;
    } else {
      alert('1');
      this.statusaktif = 1;
    }

    const body = {
      //  id:'0',
      active: this.statusaktif,
      deskripsi: this.createform.get('deskripsi')?.value,
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
    });

    this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jabatan_pemberi_ket', body, { headers }).subscribe({
      next: response => {
        //console.warn(response);
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
          title: 'Data telah di tambahkan ',
        });
      },
      error: error => {
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
          title: 'Gagal Simpan data',
        });
      },
    });
  }
}
