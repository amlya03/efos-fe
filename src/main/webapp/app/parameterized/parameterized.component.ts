/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-shadow */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { listskemafix } from 'app/data-entry/services/config/listskemafix';
import { listskemastepup } from 'app/data-entry/services/config/listskemastepup';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { InputScoringService } from 'app/input-scoring/input-scoring.service';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
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
  modelListAkad: listCreatemodel[] = [];
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
  kirimanmargin: any;
  kirimantenor: any;
  kirimanskemafasilitas: any;
  kirimantier: any;
  tablelistskemanew: any;
  hasiltembakapi: any;
  tablelistftvdp: any;
  tampunganidviewdetail: any;
  tableftvdpdetail: any;
  tableAgunanlisttipeagunan: any;
  listskemafix: listskemafix[] = [];
  listskemastepup: listskemastepup[] = [];
  constructor(
    private formBuilder: FormBuilder,
    protected datEntryService: DataEntryService,
    protected scoringServices: InputScoringService,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

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

    // //////////// List Akad //////////////////
    this.scoringServices.getListAkad().subscribe(akad => {
      this.modelListAkad = akad.result;
      console.log('ini fix' + this.modelListAkad);
    });
    // //////////// List Akad //////////////////

    // //////////// skema fix //////////////////
    this.datEntryService.getskemafix().subscribe(skema => {
      this.listskemafix = skema.result;
      console.log('ini fix' + this.listskemafix);
    });
    // //////////// skema fix //////////////////

    // //////////// skema fix //////////////////
    this.datEntryService.getskemastepup().subscribe(skema => {
      this.listskemastepup = skema.result;
      console.log('ini stepup' + this.listskemastepup);
    });
    // //////////// skema fix //////////////////
  }

  // 1
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
  // datascoring gk di masukan
  // 3
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
  // 4
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

            if (deskripsi === '') {
              alert('Deskripsi harus di isi');
              return;
            } else if (fasilitas === '') {
              alert('Fasilitas harus di isi');
              return;
            } else if (kode_fasilitas === '') {
              alert('Kode Fasilitas harus di isi');
              return;
            } else {
              const body = {
                deskripsi: deskripsi,
                fasilitas: fasilitas,
                kode_fasilitas: kode_fasilitas,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas+++', body, { headers }).subscribe({
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
  // 5
  createfasilitaslistrik(): void {
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
          title: 'Create Fasilitas Listrik ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            const active = $('#status_active').val();
            const fasilitas_listrik = $('#fasilitas_listrik').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (fasilitas_listrik === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                fasilitas_listrik: fasilitas_listrik,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_fasilitas_listrik+++', body, { headers }).subscribe({
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
  // 6
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

    // this.getLoading(true);
    // this.router
    //   .navigate(['/data-entry/personalinfo'], {
    //     queryParams: { curef: getCuref, app_no_de: getAppNoDe },
    //   })
    //   .then(() => {
    //     window.location.reload();
    //   });
  }

  // 7
  createftpdpdetail(): void {
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
            '<div class="col-sm-8">  <select id="tipe_properti" class="form-control"><option value="">Pilih Status</option></select>' +
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
            const kode_fasilitas = $('#kode_fasilitas').val();
            const kode_agunan = $('#kode_agunan').val();
            const tipe_properti = $('#tipe_properti').val();
            const Min = $('#Min').val();
            const Max = $('#Max').val();
            const ftv = $('#ftv').val();
            const dp = $('#dp').val();

            this.tampungpemecah = $('#tipe_properti').val();

            const pemecahbenar = this.tampungpemecah.split('|');

            if (kode_fasilitas === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (kode_agunan === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (tipe_properti === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (Min === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (Max === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (ftv === '') {
              alert('Fasilitas Listrik harus di isi');
              return;
            } else if (dp === '') {
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
          }
        });
      }
    });
  }
  // 8
  createhubkepemilikanagunan(): void {
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
          title: 'Create Hubungan Kepemilikan Agunan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            const active = $('#status_active').val();
            const deskripsi = $('#deskripsi').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi === '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_hub_kepemilikan_agunan+++', body, { headers }).subscribe({
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
  // 9
  createhubunganemergency(): void {
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
          title: 'Create Hubungan Emergency',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            const active = $('#status_active').val();
            const deskripsi = $('#deskripsi').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi === '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_hubungan_emergency+++', body, { headers }).subscribe({
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
  // 10
  createjabatan(): void {
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
          title: 'Create Jabatan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            const active = $('#status_active').val();
            const jabatan_deskripsi = $('#jabatan_deskripsi').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (jabatan_deskripsi === '') {
              alert('Jabatan Deskripsi harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                jabatan_deskripsi: jabatan_deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jabatan+++', body, { headers }).subscribe({
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
  // 11
  createjabatanpemberiket(): void {
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
          title: 'Create Jabatan Pemberi Keterangan ',
          html:
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Status Aktif</label>' +
            '<div class="col-sm-8">  <select id="status_active" class="form-control"><option value="">Pilih Status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
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
            const active = $('#status_active').val();
            const deskripsi = $('#deskripsi').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi === '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jabatan_pemberi_ket+++', body, { headers }).subscribe({
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
  // 12
  createjenisobjekagunan(): void {
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
            const active = $('#status_active').val();
            const jenis_objek_deskripsi = $('#jenis_objek_deskripsi').val();
            const jenis_objek_code = $('#jenis_objek_code').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (jenis_objek_deskripsi === '') {
              alert('Jenis Objek Deskripsi harus di isi');
              return;
            } else if (jenis_objek_code === '') {
              alert('Jenis Objek code harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                jenis_objek_deskripsi: jenis_objek_deskripsi,
                jenis_objek_code: jenis_objek_code,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jenis_objek_agunan+++', body, { headers }).subscribe({
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
  // 13
  createjenispekerjaan(): void {
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
            const active = $('#status_active').val();
            const deskripsi = $('#deskripsi').val();

            if (active === '') {
              alert('Status Aktif Harus Di isi');
              return;
            } else if (deskripsi === '') {
              alert('Deskripsi harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              const body = {
                active: this.kirimactive,
                deskripsi: deskripsi,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/', body, { headers }).subscribe({
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
  // 14
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
  // 15
  createskema(): void {
    // ///DELAY
    // /// menanti api  untuk kodeproduk
    const options = this.tablelistproduk.map((option: any) => {
      return `
            <option key="${option}" value="${option.kode_produk}">
                ${option.produk_deskripsi}
            </option>
          `;
    });

    const optionsskema = this.tablelistskema.map((option: any) => {
      return `
            <option key="${option}" value="${option.skema}|${option.skema_deskripsi}">
                ${option.skema_deskripsi}
            </option>
          `;
    });

    const listAkad = this.modelListAkad.map((option: listCreatemodel) => {
      return `
            <option key="${option}" value="${option.deskripsi}">
                ${option.deskripsi}
            </option>
          `;
    });
    // /// menanti api  untuk kodeproduk
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
        $(document).ready(function () {
          $('#skema').change(function () {
            if ($('#skema').val() === 'Lainnya') {
              // alert('ini');
              $('#lainnya1').removeAttr('hidden');
            } else {
              // alert('else');
              $('#lainnya1').attr('hidden', 'true');
            }
          });
        });

        Swal.fire({
          title: 'Create Skema',
          html:
            // '<br />' +
            '<div class="form-lable row" hidden><label class="col-sm-4 col-form-label">Fasilitas</label>' +
            '<div class="col-sm-8"><select class="form-control" id="fasilitas"><option value="">Pilih Fasilitas</option> <option value="1">Fix Income</option> <option value="2">Non Fix Income</option></select>' +
            '<br /></div></div>' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Produk</label>' +
            '<div class="col-sm-8"><select class="form-control" id="kode_produk"><option value="">Pilih Produk</option>' +
            `${options}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">Skema Master</label>' +
            '<div class="col-sm-8"><select class="form-control" id="skema_master"><option value="">Pilih Skema Master</option> <option value="1">Fix Income</option> <option value="2">Non Fix Income</option></select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Skema</label>' +
            '<div class="col-sm-8"><select class="form-control" id="skema"><option value="">Pilih Skema</option>' +
            `${optionsskema}` +
            '<option value="Lainnya">Lainnya</option></select>' +
            '<br /></div></div>' +
            '<div class="form-lable row " id="lainnya1" hidden><label class="col-sm-4 col-form-label hidden">Deskripsi skema</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="skema_deskripsi"/>' +
            '<br /></div></div>' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">Akad</label>' +
            '<div class="col-sm-8"><select class="form-control" id="akad"><option value="">Pilih Akad</option>' +
            `${listAkad}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">dp</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="dp_min"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">Max Platfon</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_platfon"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">Min Platfon</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="min_platfon"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">Max tenor</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_tenor"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const fasilitas = $('#fasilitas').val();
            const kode_produk = $('#kode_produk').val();
            const min_platfon = $('#min_platfon').val();
            const max_platfon = $('#max_platfon').val();
            const max_tenor = $('#max_tenor').val();
            const skema_master = $('#skema_master').val();
            const skema = $('#skema').val();
            const dp_min = $('#dp_min').val();
            const akad = $('#akad').val();

            if (kode_produk === '') {
              alert('Kode Produk Harus Di isi');
              return;
            } else if (min_platfon === '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_platfon === '') {
              alert('Max Platfon harus di isi');
              return;
            } else if (max_tenor === '') {
              alert('Max Tenor harus di isi');
              return;
            } else if (skema_master === '') {
              alert('Skema Master harus di isi');
              return;
            } else if (skema === '') {
              alert('Skema harus di isi');
              return;
            } else {
              if (skema === 'Lainnya') {
                this.kirimanskema = '';
                this.kirimanskemadeskripsi = $('#skema_deskripsi').val();
              } else {
                this.tampungpemecah = $('#skema').val();

                const pemecahbenar = this.tampungpemecah.split('|');
                this.kirimanskema = pemecahbenar[0];
                this.kirimanskemadeskripsi = pemecahbenar[1];
              }

              const body = {
                created_date: this.sessionStorageService.retrieve('sessionUserName'),
                dp_min: dp_min,
                fasilitas: fasilitas,
                id: 0,
                kode_produk: kode_produk,
                max_plafond: max_platfon,
                max_tenor: max_tenor,
                min_plafond: min_platfon,
                skema: this.kirimanskema,
                skema_deskripsi: this.kirimanskemadeskripsi,
                skema_master: skema_master,
                akad: akad,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema+++', body, { headers }).subscribe({
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
  // 16
  createprogram(): void {
    const options = this.inputScoring.map((option: any) => {
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
      confirmButtonText: 'Tambah Data',
      cancelButtonText: 'Tidak',
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
            const kode_fasilitas = $('#kode_fasilitas').val();
            const program = $('#program').val();
            const min_plafond = $('#min_plafond').val();
            const max_plafond = $('#max_plafond').val();
            const expired_date = $('#expired_date').val();

            if (kode_fasilitas === '') {
              alert('Kode Fasilitas Harus Di isi');
              return;
            } else if (program === '') {
              alert('Profram harus di isi');
              return;
            } else if (min_plafond === '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_plafond === '') {
              alert('Max Plafond harus di isi');
              return;
            } else if (expired_date === '') {
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
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program+++', body, { headers }).subscribe({
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
  // 17
  createskemafasilitas(): void {
    const options = this.tablelistskemanew.map((option: any) => {
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
      confirmButtonText: 'Tambah Data',
      cancelButtonText: 'Tidak',
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
            const active = $('#status_active').val();
            const tear_select = $('#tear_select').val();
            const tenor_tier1 = $('#tenor_tier1').val();
            const tenor_tier2 = $('#tenor_tier2').val();
            const tenor_tier3 = $('#tenor_tier3').val();

            if (active === '') {
              alert('Kode Fasilitas Harus Di isi');
              return;
            } else if (tear_select === '') {
              alert('Profram harus di isi');
              return;
            } else {
              if (active === '0') {
                this.kirimactive = 0;
              } else {
                this.kirimactive = 1;
              }

              if (tear_select === '1') {
                if (tenor_tier1 === '') {
                  alert('tenor tier 1 Harus Di isi');
                  return;
                }
                this.kirimantenortier = tenor_tier1;
              } else if (tear_select === '2') {
                if (tenor_tier1 === '') {
                  alert('tenor tier 1 Harus Di isi');
                  return;
                } else if (tenor_tier2 === '') {
                  alert('tenor tier 2 Harus Di isi');
                  return;
                }
                this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2;
              } else {
                if (tenor_tier1 === '') {
                  alert('tenor tier 1 Harus Di isi');
                  return;
                }
                if (tenor_tier2 === '') {
                  alert('tenor tier 2 Harus Di isi');
                  return;
                }
                if (tenor_tier3 === '') {
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
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema_fasilitas+++', body, { headers }).subscribe({
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
  // 18
  createstenormarginfix(): void {
    const options = this.listskemafix.map((option: listskemafix) => {
      return `
        <option key="${option}" value="${option.skema}">
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
      confirmButtonText: 'Tambah Data',
      cancelButtonText: 'Tidak',
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
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">tenor</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Margin</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="margin"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const skema_fasilitas = $('#skema_fasilitas').val();
            const margin = $('#margin').val();
            const tn_code = $('#tn_code').val();
            // let max_plafond = $('#max_plafond').val();
            // let expired_date = $('#expired_date').val();

            if (skema_fasilitas === '') {
              alert('Skema Fasilitas Harus Di isi ');
              return;
            } else if (margin === '') {
              alert('Margin Harus Di isi');
              return;
            } else if (tn_code === '') {
              alert('Tn Code Harus Di isi');
              return;
            } else {
              //  if(active=='0'){
              //     this.kirimactive=0;
              //  }else{
              //   this.kirimactive=1;
              //  }

              const body = {
                margin: $('#margin').val(),
                skema_id: $('#skema_fasilitas').val() + '_fas0',
                tenor: $('#tenor').val(),
                tenor_tier: '',
                tier: '',
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_tenor_margin_fix', body, { headers }).subscribe({
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
  // 19
  createstenormarginstepup(): void {
    const options = this.listskemastepup.map((option: listskemastepup) => {
      return `
        <option key="${option}" value="${option.skema}">
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
      confirmButtonText: 'Tambah Data',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        $(document).ready(function () {
          $('#tier_id').change(function () {
            $('#tenor_tier1').val('1');
            if ($('#tier_id').val() === '1') {
              // $('#id_tenortear1').removeAttr('hidden');
            } else if ($('#tier_id').val() === '2') {
              $('#margin_1_id').removeAttr('hidden');
              $('#margin_2_id').removeAttr('hidden');
              // $('#tenor1_id').removeAttr('hidden');
              // $('#tenor2_id').removeAttr('hidden');
              $('#tenor_tier1_id').removeAttr('hidden');
              $('#tenor_tier2_id').removeAttr('hidden');

              $('#margin_3_id').attr('hidden', 'true');
              $('#tenor_tier3_id').attr('hidden', 'true');
            } else if ($('#tier_id').val() === '3') {
              $('#margin_1_id').removeAttr('hidden');
              $('#margin_2_id').removeAttr('hidden');
              $('#margin_3_id').removeAttr('hidden');
              // $('#tenor1_id').removeAttr('hidden');
              // $('#tenor2_id').removeAttr('hidden');
              // $('#tenor3_id').removeAttr('hidden');
              $('#tenor_tier1_id').removeAttr('hidden');
              $('#tenor_tier2_id').removeAttr('hidden');
              $('#tenor_tier3_id').removeAttr('hidden');
            } else {
              $('#margin_1_id').attr('hidden', 'true');
              $('#margin_2_id').attr('hidden', 'true');
              $('#margin_3_id').attr('hidden', 'true');
              // $('#tenor1_id').attr('hidden', 'true');
              // $('#tenor2_id').attr('hidden', 'true');
              // $('#tenor3_id').attr('hidden', 'true');
              $('#tenor_tier1_id').attr('hidden', 'true');
              $('#tenor_tier2_id').attr('hidden', 'true');
              $('#tenor_tier3_id').attr('hidden', 'true');
            }
          });
        });

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
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Tier</label>' +
            '<div class="col-sm-8"><select class="form-control" id="tier_id"><option value="0">Pilih Tier</option><option value="2">2</option><option value="3">3</option>' +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="tenor1_id" ><label class="col-sm-4 col-form-label">tenor </label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="tenor1"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="margin_1_id" hidden><label class="col-sm-4 col-form-label">Margin 1</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin_1"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="margin_2_id" hidden><label class="col-sm-4 col-form-label">Margin 2</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin_2"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="margin_3_id" hidden><label class="col-sm-4 col-form-label">Margin 3</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin_3"/> ' +
            '</div></div>' +
            // '<br />' +
            // '<div class="form-lable row" id="tenor2_id" hidden><label class="col-sm-4 col-form-label">tenor 2</label>' +
            // '<div class="col-sm-8"><input type="text" class="form-control" id="tenor2"/> ' +
            // '</div></div>'+
            // '<br />' +
            // '<div class="form-lable row" id="tenor3_id" hidden><label class="col-sm-4 col-form-label">tenor 3</label>' +
            // '<div class="col-sm-8"><input type="text" class="form-control" id="tenor3"/> ' +
            // '</div></div>'+
            '<br />' +
            '<div class="form-lable row" id="tenor_tier1_id" hidden><label class="col-sm-4 col-form-label">tenor_tier 1</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="tenor_tier1"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="tenor_tier2_id" hidden><label class="col-sm-4 col-form-label">teno_tier 2</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="tenor_tier2"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="tenor_tier3_id" hidden><label class="col-sm-4 col-form-label">tenor_tier 3</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="tenor_tier3"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const skema_fasilitas = $('#skema_fasilitas').val();
            const margin1 = $('#margin_1').val();
            const margin2 = $('#margin_2').val();
            const margin3 = $('#margin_3').val();
            const tenor1 = $('#tenor1').val();
            const tenor2 = $('#tenor2').val();
            const tenor3 = $('#tenor3').val();
            const tenor_tier1 = $('#tenor_tier1').val();
            const tenor_tier2 = $('#tenor_tier2').val();
            const tenor_tier3 = $('#tenor_tier3').val();
            const tier = $('#tier_id').val();
            alert(tier);
            if (skema_fasilitas === '') {
              alert('Skema Fasilitas harus di isi');
              return;
            } else if (tier === '') {
              alert('Skema Fasilitas harus di isi');
              return;
            }

            if (tier === '2') {
              if (margin1 === '') {
                alert('Margin1 harus di isi');
                return;
              } else if (margin2 === '') {
                alert('Margin2 harus di isi');
                return;
              }
              this.kirimanmargin = margin1 + '-' + margin2;
              // if (tenor1 === '') {
              //   alert('Tenor1 harus di isi');
              //   return;
              // }  else if (tenor2 === '') {
              //   alert('Tenor2 harus di isi');
              //   return;
              // }
              // this.kirimantenor=tenor1+''+tenor2;
              if (tenor_tier1 === '') {
                alert('Tenor tier 1 harus di isi');
                return;
              } else if (tenor_tier2 === '') {
                alert('Tenor tier 2 harus di isi');
                return;
              }
              // let iNum = parseInt(tenor_tier2);
              let tear2: number = Number(tenor_tier2);
              // let tear3: any = tenor_tier3;
              let tier: number = Number(tenor1);
              // let x=tier;
              // let y=tear2;
              if (tear2 >= tier) {
                alert('tenor 2 tier tidak boleh melebihi tenor');
                // alert(tier+">"+tear2);
                // alert(tear2 > tier);
                // alert(x > y);
                return;
              } else {
                alert('initenortier2');
                // alert(tier+">"+tear2);
                this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2;
                return;
              }
            } else if (tier === '3') {
              alert('ini jalan ?');
              if (margin1 === '') {
                alert('Margin1 harus di isi');
                return;
              } else if (margin2 === '') {
                alert('Margin2 harus di isi');
                return;
              } else if (margin3 === '') {
                alert('Margin2 harus di isi');
                return;
              }
              this.kirimanmargin = margin1 + '-' + margin2 + '-' + margin3;
              if (tenor_tier1 === '') {
                alert('Tenor tier 1 harus di isi');
                return;
              } else if (tenor_tier2 === '') {
                alert('Tenor tier 2 harus di isi');
                return;
              } else if (tenor_tier3 === '') {
                alert('Tenor tier 3 harus di isi');
                return;
              }

              let tear2: number = Number(tenor_tier2);
              let tear3: number = Number(tenor_tier3);
              let tier: number = Number(tenor1);

              var a: number = Number(tear2);
              var b: number = Number(tier);
              if (tear2 >= tier) {
                // alert(tear2 > tier);
                // alert(tear3 > tier);
                // alert(a > b);
                alert('tenor 2 tier tidak boleh melebihi tenor11111');
                return;
              } else if (tear3 >= tier) {
                alert('tenor tier 3 tidak boleh melebihi tenor');
                return;
              } else {
                // alert(tier > tear2);
                // alert(tier > tear3);
                alert('ini tenor 3');
                this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2 + '-' + tenor_tier3;
                return;
              }
            }
            this.kirimantenor = $('#tenor1').val();
            this.kirimanskemafasilitas = $('#skema_fasilitas').val() + '_fas0';
            this.kirimantier = $('#tier_id').val();
            const body = {
              margin: this.kirimanmargin,
              skema_id: this.kirimanskemafasilitas,
              tenor: this.kirimantenor,
              tenor_tier: this.kirimantenortier,
              tier: this.kirimantier,
            };
            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_tenor_margin_stepup', body, { headers }).subscribe({
              // this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_program+++', body, { headers }).subscribe({
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

  createaksesrumahgagal(): void {
    if (this.createform.get('status_aktifitas')?.value === '0') {
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
    });

    this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_akses_rumah', body, { headers }).subscribe({
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
          title: 'Data telah di tambahkan ',
        });
        window.location.reload();
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
    if (this.createform.get('status_aktifitas')?.value === '0') {
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
    });

    this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_jabatan_pemberi_ket', body, { headers }).subscribe({
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
          title: 'Data telah di tambahkan ',
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
          title: 'Gagal Simpan data',
        });
      },
    });
  }
}
