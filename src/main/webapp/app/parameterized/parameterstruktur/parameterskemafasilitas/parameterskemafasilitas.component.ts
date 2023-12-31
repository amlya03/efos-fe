import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-parameterskemafasilitas',
  templateUrl: './parameterskemafasilitas.component.html',
  styleUrls: ['./parameterskemafasilitas.component.scss'],
})
export class ParameterskemafasilitasComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;

  tableAgunan: listCreatemodel[] = [];
  tablelistskemanew: listCreatemodel[] = [];
  kirimantenortier: any;
  kirimanskema: any;
  kirimactive: any;
  tampungpemecah: any;
  kode_skema_all: any;
  // tablelistproduk: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(protected datEntryService: DataEntryService, protected http: HttpClient, private sessionStorage: SessionStorageService) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.datEntryService.getListskemanew().subscribe(table => {
      this.tablelistskemanew = table.result;
      this.dtTrigger.next(this.tablelistskemanew);
      // console.log(this.tablelistskema);
    });
    // this.datEntryService.getListproduk().subscribe(table => {
    //   this.tablelistproduk = table.result;
    // });
  }

  createskemafasilitas(): void {
    const options = this.tablelistskemanew.map((option: any) => {
      return `
        <option key="${option}" value="${option.skema}|${option.skema_master}">
            ${option.skema_deskripsi}
        </option>
      `;
    });

    Swal.fire({
      title: 'Tambah Data Input Parameter Skema Fasilitas',
      text: '',
      icon: 'info',
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
            const kode_skema = $('#kode_skema').val();
            this.kode_skema_all = kode_skema;
            const potonganskema = this.kode_skema_all.split('|');

            if (potonganskema[1] == '1') {
              if (active === '') {
                alert('Kode Fasilitas Harus Di isi');
                return;
              } else {
                if (active === '0') {
                  this.kirimactive = 0;
                } else {
                  this.kirimactive = 1;
                }

                this.tampungpemecah = $('#kode_skema').val();

                const pemecahbenar = this.tampungpemecah.split('|');
                this.kirimanskema = pemecahbenar[0];
                //  this.kirimanskemadeskripsi=pemecahbenar[1];

                const body = {
                  id: 0,
                  active: this.kirimactive,
                  skema_id: this.kirimanskema,
                  tier: tear_select,
                  tenor_tier: this.kirimantenortier,
                  fasilitas: '0',
                  created_by: this.sessionStorage.retrieve('sessionRole'),
                  // max_plafond:max_plafond,
                  // expired_date:expired_date,
                };
                const headers = new HttpHeaders({
                  'Content-Type': 'application/json; charset=utf-8',
                  // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
                });
                this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema_fasilitas', body, { headers }).subscribe({
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
            } else {
              if (active === '') {
                alert('Kode Fasilitas Harus Di isi');
                return;
              } else if (tear_select === '') {
                alert('Profram harus di isi');
                alert(kode_skema);
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
                  id: 0,
                  active: this.kirimactive,
                  skema_id: this.kirimanskema,
                  tier: tear_select,
                  tenor_tier: this.kirimantenortier,
                  fasilitas: '0',
                  created_by: this.sessionStorage.retrieve('sessionRole'),
                  // max_plafond:max_plafond,
                  // expired_date:expired_date,
                };
                const headers = new HttpHeaders({
                  'Content-Type': 'application/json; charset=utf-8',
                  // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
                });
                this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema_fasilitas', body, { headers }).subscribe({
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
          }
        });
      }
    });
  }
}
