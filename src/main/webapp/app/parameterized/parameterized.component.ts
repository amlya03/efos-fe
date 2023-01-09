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
  styleUrls: ['./parameterized.component.scss']
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
  constructor(
    private formBuilder: FormBuilder,
    protected datEntryService: DataEntryService,
    protected http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.createform = this.formBuilder.group({
      contoh: ['',],
      status_aktifitas: ['',],
      akses_rumah: ['',],
      deskripsi: ['',],
    })

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
      console.log(this.tablelistskema);
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create akses rumah ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="akses_rumah"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let akses_rumah = $('#akses_rumah').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                akses_rumah: akses_rumah,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_akses_rumah', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Developer',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Jenis Developer</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="Jenis_developer"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Kantor Cabang</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="Kantor_Cabang"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Nama Developer</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="Nama_developer"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let jenis_developer = $('#Jenis_developer').val();
            let kantor_Cabang = $('#Kantor_Cabang').val();
            let nama_developer = $('#Nama_developer').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                akses_rumah: jenis_developer,
                jenis_developer: kantor_Cabang,
                nama_developer: nama_developer,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_developer', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create fasilitas',
          html:
          '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
          '<div class="col-sm-9"><input type="text" class="form-control2" id="deskripsi"/> ' +
          '</div></div>' +
          '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Fasilitas</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="fasilitas"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Kode Fasilitas</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="kode_fasilitas"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let deskripsi = $('#deskripsi').val();
            let fasilitas = $('#fasilitas').val();
            let kode_fasilitas = $('#kode_fasilitas').val();
        

              const body = {
                deskripsi:  deskripsi,
                fasilitas: fasilitas,
                kode_fasilitas: kode_fasilitas,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_fasilitas***', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Fasilitas Listrik ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Fasilitas Listrik</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="fasilitas_listrik"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let fasilitas_listrik = $('#fasilitas_listrik').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                fasilitas_listrik: fasilitas_listrik,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_fasilitas_listrik', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create FTP DP',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Fasilitas Listrik</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="fasilitas_listrik"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let fasilitas_listrik = $('#fasilitas_listrik').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                fasilitas_listrik: fasilitas_listrik,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/', body, { headers }).subscribe({
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
//7
  createftpdpdetail(): void {
    Swal.fire({
      title: 'Mohon Perhatikan',
      text: 'Inputan yang sudah Terinput tidak bisa di edit ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'tambah',
      cancelButtonText: 'tidak',
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create FTP Detail ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Fasilitas Listrik</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="fasilitas_listrik"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let fasilitas_listrik = $('#fasilitas_listrik').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                fasilitas_listrik: fasilitas_listrik,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Hubungan Kepemilikan Agunan ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_hub_kepemilikan_agunan', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Hubungan Emergency',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_hubungan_emergency', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jabatan ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Deskripsi</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="jabatan_deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let jabatan_deskripsi = $('#jabatan_deskripsi').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                jabatan_deskripsi: jabatan_deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_jabatan', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jabatan Pemberi Keterangan ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Jabatan Pemberi keterangan</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_jabatan_pemberi_ket', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jenis Objek Agunan ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Objek agunan</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="jenis_objek_deskripsi"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Kode Objek agunan</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="jenis_objek_code"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let jenis_objek_deskripsi = $('#jenis_objek_deskripsi').val();
            let jenis_objek_code = $('#jenis_objek_code').val();

           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                jenis_objek_deskripsi: jenis_objek_deskripsi,
                jenis_objek_code: jenis_objek_code,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_jenis_objek_agunan', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Jenis Pekerjaan',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
            '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Pekerjaan</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="deskripsi"/> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let active = $('#status_active').val();
            let deskripsi = $('#deskripsi').val();
            
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

              const body = {
                active:  this.kirimactive,
                deskripsi: deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Produk ',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Kode program</label>' +
            // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-9"><select class="form-control" id="kode_program"><option value="">Pilih program</option>'+`${options}`+'</select>'+
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Produk Deskripsi</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="produk_deskripsi"/> ' +
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

              const body = {
                kode_program:  kode_program,
                kode_produk:'',
                produk_deskripsi: produk_deskripsi,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_produk', body, { headers }).subscribe({
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
        })
        .then(result => {
          if (result.isConfirmed) {

            $(document).ready(function () {
              $('#kode_produk1').change(function () {
             
                if ($('#kode_produk1').val() ==="lainya") {
                  alert('ini')
                  $("#lainya1").removeAttr("hidden")
                } else {
                  alert('else')
                  $("#lainya1").attr("hidden","true");
                }
              });
             

            });

            Swal.fire({
              title: 'Create Skema',
              html:
                '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Kode produk</label>' +
                // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
                '<div class="col-sm-9"><select class="form-control" id="kode_produk"><option value="">Pilih produk</option>'+`${options}`+'</select>'+
                '</div></div>' +
                '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Kode produk</label>' +
                // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
                '<div class="col-sm-9"><select class="form-control" id="kode_produk1"><option value="">Pilih skema</option>'+`${optionsskema}`+'<option value="lainya">Lainya</option></select>'+
                '</div></div>' +
                '<div class="form-lable row " id="lainya1" hidden><label class="col-sm-3 col-form-label hidden">Deskripsi skema</label>' +
                // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
                '<div class="col-sm-9"><input type="text" class="form-control2" id="skema_deskripsi"/>'+
                '</div></div>' +
                '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">dp</label>' +
                '<div class="col-sm-9"><input type="text" class="form-control2" id="dp_min"/> ' +
                '</div></div>'+
                '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Max Platfon</label>' +
                '<div class="col-sm-9"><input type="text" class="form-control2" id="max_platfon"/> ' +
                '</div></div>'+
                '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Min Platfon</label>' +
                '<div class="col-sm-9"><input type="text" class="form-control2" id="min_platfon"/> ' +
                '</div></div>'+
                '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Max tenor</label>' +
                '<div class="col-sm-9"><input type="text" class="form-control2" id="max_tenor"/> ' +
                '</div></div>'+
                '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">SKEMA MASTER</label>' +
                '<div class="col-sm-9"><select class="form-control" id="skema_master"><option value="">Pilih produk</option> <option value="1">FIX income</option> <option value="2">NonFix</option></select>' +
                '</div></div>'+
                '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">---</label>' +
                '<div class="col-sm-9"><select class="form-control" id="skema_master"><option value="">Pilih produk</option> <option value="1">FIX income</option> <option value="2">NonFix</option></select>' +
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

              if(skema == "lainya"){
                alert($('#skema_deskripsi').val());
                this.kirimanskema='';
                this.kirimanskemadeskripsi=$('#skema_deskripsi').val();
              }else{

                this.tampungpemecah= $('#kode_produk1').val();

                const pemecahbenar=this.tampungpemecah.split('|');
                    this.kirimanskema=pemecahbenar[0];
                    this.kirimanskemadeskripsi=pemecahbenar[1];
              }
    
                  const body = {
                    dp_min:dp_min,
                    kode_produk:  kode_produk,
                    min_platfon:  min_platfon,
                    max_platfon:  max_platfon,
                    max_tenor:  max_tenor,
                    skema_master:  skema_master,
                    skema_deskripsi:  this.kirimanskemadeskripsi,
                    skema:  this.kirimanskema,
                    fasilitas:'',
                   
                  };
                  let headers = new HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8',
                    // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
                  });
                  this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_skema', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Program',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Kode Fasilitas</label>' +
            // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-9"><select class="form-control" id="kode_fasilitas"><option value="">Pilih Parameter</option>'+`${options}`+'</select>'+
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Program</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="program"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="min_plafond"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="max_plafond"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Expired Date</label>' +
            '<div class="col-sm-9"><input type="date" class="form-control2" id="expired_date"/> ' +
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
            
          //  if(active=='0'){
          //     this.kirimactive=0;
          //  }else{
          //   this.kirimactive=1;
          //  }

              const body = {
                kode_fasilitas:  kode_fasilitas,
                program: program,
                min_plafond:min_plafond,
                max_plafond:max_plafond,
                expired_date:expired_date,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_program', body, { headers }).subscribe({
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
//17
  createskemafasilitas(): void {


    let options = this.tablelistskema.map((option: any) => {
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
    })
    .then(result => {
      if (result.isConfirmed) {


        $(document).ready(function () {
          $('#kode_skema').change(function () {
         
            // let pemecahskemafasilitas = $('#kode_skema').val();
            const pemecahskemafasilitas = document.getElementById('kode_skema') as HTMLElement | any
             const kondisiskemamaster=pemecahskemafasilitas.value.split("|");
             
            if (kondisiskemamaster[1] === "2") {
              $("#id_tear").removeAttr("hidden")
            } else {
              
              $("#id_tear").attr("hidden","true");
            }
          });

          $('#tear_select').change(function () {
        alert('tear on select');
        alert($('#tear_select').val());

            if ($('#tear_select').val() === "1") {

              $("#id_tenortear1").removeAttr("hidden")
            } else if ($('#tear_select').val() === "2") {
              $("#id_tenortear1").removeAttr("hidden")
              $("#id_tenortear2").removeAttr("hidden")
            } else if ($('#tear_select').val() === "3") {
              $("#id_tenortear1").removeAttr("hidden")
              $("#id_tenortear2").removeAttr("hidden")
              $("#id_tenortear3").removeAttr("hidden")
            } else {
              $("#id_tenortear1").attr("hidden","true");
              $("#id_tenortear2").attr("hidden","true");
              $("#id_tenortear3").attr("hidden","true");
            }

          });

         

        });


        Swal.fire({
          title: 'Create Skema Fasilitas',
          html:
          '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">status Aktif</label>' +
          '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
          '</div></div>' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Skema</label>' +
            // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-9"><select class="form-control" id="kode_skema"><option value="">Pilih Skema</option>'+`${options}`+'</select>'+
            '</div></div>' +
            '<div class="form-lable row" id="id_tear"  hidden><label class="col-sm-3 col-form-label">tier</label>' +
            '<div class="col-sm-9"> <select id="tear_select"><option value="">Pilih tier</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>' +
            '</div></div>'+
            '<div class="form-lable row" id="id_tenortear1" hidden><label class="col-sm-3 col-form-label">tenor_tier</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="tenor_tier1"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="id_tenortear2" hidden><label class="col-sm-3 col-form-label">tenor_tier2</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="tenor_tier2"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="id_tenortear3" hidden><label class="col-sm-3 col-form-label">tenor_tier3</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="tenor_tier3"/> ' +
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
           if(active=='0'){
              this.kirimactive=0;
           }else{
            this.kirimactive=1;
           }

          if(tear_select=='1'){
              this.kirimantenortier=tenor_tier1;
           }else if(tear_select=='2'){
            this.kirimantenortier=tenor_tier1+'-'+tenor_tier2;
           }else{
            this.kirimantenortier=tenor_tier1+'-'+tenor_tier2+'-'+tenor_tier3;
           }


           this.tampungpemecah= $('#kode_skema').val();

           const pemecahbenar=this.tampungpemecah.split('|');
               this.kirimanskema=pemecahbenar[0];
              //  this.kirimanskemadeskripsi=pemecahbenar[1];

              const body = {
                active:  this.kirimactive,
                skema_id:  this.kirimanskema,
                tier:tear_select,
                tenor_tier:this.kirimantenortier,
                fasilitas:'',
                // max_plafond:max_plafond,
                // expired_date:expired_date,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_skema_fasilitas', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Tenor Margin Fix',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Kode Fasilitas</label>' +
            // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-9"><select class="form-control" id="kode_fasilitas"><option value="">Pilih Parameter</option>'+`${options}`+'</select>'+
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Program</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="program"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="min_plafond"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="max_plafond"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Expired Date</label>' +
            '<div class="col-sm-9"><input type="date" class="form-control2" id="expired_date"/> ' +
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
            
          //  if(active=='0'){
          //     this.kirimactive=0;
          //  }else{
          //   this.kirimactive=1;
          //  }

              const body = {
                kode_fasilitas:  kode_fasilitas,
                program: program,
                min_plafond:min_plafond,
                max_plafond:max_plafond,
                expired_date:expired_date,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_program', body, { headers }).subscribe({
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
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Create Tenor Margin Step Up',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Kode Fasilitas</label>' +
            // '<div class="col-sm-9">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            '<div class="col-sm-9"><select class="form-control" id="kode_fasilitas"><option value="">Pilih Parameter</option>'+`${options}`+'</select>'+
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Program</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="program"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="min_plafond"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-9"><input type="text" class="form-control2" id="max_plafond"/> ' +
            '</div></div>'+
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Expired Date</label>' +
            '<div class="col-sm-9"><input type="date" class="form-control2" id="expired_date"/> ' +
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
            
          //  if(active=='0'){
          //     this.kirimactive=0;
          //  }else{
          //   this.kirimactive=1;
          //  }

              const body = {
                kode_fasilitas:  kode_fasilitas,
                program: program,
                min_plafond:min_plafond,
                max_plafond:max_plafond,
                expired_date:expired_date,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_program', body, { headers }).subscribe({
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



  createaksesrumahgagal(): void {

if(this.createform.get('status_aktifitas')?.value=='0'){
 this.statusaktif=0;
}else{
  this.statusaktif=1;
}

    const body = {
    //  id:'0',
      // active: 1,
      active:this.statusaktif,
      akses_rumah: this.createform.get('akses_rumah')?.value,
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
    });

    this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_akses_rumah', body, { headers }).subscribe({
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

    if(this.createform.get('status_aktifitas')?.value=='0'){
      alert('0');
      this.statusaktif=0;
     }else{
      alert('1');
       this.statusaktif=1;
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

    this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-ref/create_jabatan_pemberi_ket', body, { headers }).subscribe({
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
