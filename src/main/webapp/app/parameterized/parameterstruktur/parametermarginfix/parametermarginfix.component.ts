import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { listskemafix } from 'app/data-entry/services/config/listskemafix';
import Swal from 'sweetalert2';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-parametermarginfix',
  templateUrl: './parametermarginfix.component.html',
  styleUrls: ['./parametermarginfix.component.scss'],
})
export class ParametermarginfixComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  listskemafix: listskemafix[] = [];
  tableAgunan: listCreatemodel[] = [];
  tenortier: any;
  skema: any;
  skema_master: any;
  skema_deskripsi: any;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  margin: any;
  constructor(
    protected datEntryService: DataEntryService,
    protected http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.skema = params.skema;
    });

    this.route.queryParams.subscribe(params => {
      this.skema_master = params.skemamaster;
    });
    this.route.queryParams.subscribe(params => {
      this.skema_deskripsi = params.skema_deskripsi;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    // this.datEntryService.getskemafix().subscribe(skema => {
    //   this.listskemafix = skema.result;
    //   // console.log('ini fix' + this.listskemafix);
    // });

    this.datEntryService.getmarginnew(this.skema, this.skema_master).subscribe(skema => {
      this.listskemafix = skema.result;
      this.dtTrigger.next(this.listskemafix);
      // console.log('ini fix' + this.listskemafix);
    });
  }

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
        $(document).ready(function () {
          $('#jumlah_margin').change(function () {
            // $('#tenor_tier1').val('1');
            if ($('#jumlah_margin').val() === '1') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#margin_id1').removeAttr('hidden');

              $('#jangka_waktu_id2').attr('hidden', 'true');
              $('#jangka_waktu_id3').attr('hidden', 'true');
              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');

              $('#margin_id2').attr('hidden', 'true');
              $('#margin_id3').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '2') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');

              $('#jangka_waktu_id3').attr('hidden', 'true');
              $('#margin_id3').attr('hidden', 'true');
              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '3') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');
              $('#jangka_waktu_id3').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');
              $('#margin_id3').removeAttr('hidden');

              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '4') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');
              $('#jangka_waktu_id3').removeAttr('hidden');
              $('#jangka_waktu_id4').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');
              $('#margin_id3').removeAttr('hidden');
              $('#margin_id4').removeAttr('hidden');

              // $('#jangka_waktu4').attr('hidden', 'true');
              // $('#margin4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '5') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');
              $('#jangka_waktu_id3').removeAttr('hidden');
              $('#jangka_waktu_id4').removeAttr('hidden');
              $('#jangka_waktu_id5').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');
              $('#margin_id3').removeAttr('hidden');
              $('#margin_id4').removeAttr('hidden');
              $('#margin_id5').removeAttr('hidden');
            } else {
              // $('#margin_1_id').attr('hidden', 'true');
              // $('#margin_2_id').attr('hidden', 'true');
              // $('#margin_3_id').attr('hidden', 'true');
              // // $('#tenor1_id').attr('hidden', 'true');
              // // $('#tenor2_id').attr('hidden', 'true');
              // // $('#tenor3_id').attr('hidden', 'true');
              // $('#tenor_tier1_id').attr('hidden', 'true');
              // $('#tenor_tier2_id').attr('hidden', 'true');
              // $('#tenor_tier3_id').attr('hidden', 'true');

              $('#jangka_waktu_id1').attr('hidden', 'true');
              $('#jangka_waktu_id2').attr('hidden', 'true');
              $('#jangka_waktu_id3').attr('hidden', 'true');
              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');

              $('#margin_id1').attr('hidden', 'true');
              $('#margin_id2').attr('hidden', 'true');
              $('#margin_id3').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            }
          });
        });

        Swal.fire({
          title: 'Create Tenor Margin Fix',
          width: '850px',
          html:
            // '<br />' +
            // '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Skema fasilitas</label>' +
            // // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            // '<div class="col-sm-8"><select class="form-control" id="skema_fasilitas"><option value="">Pilih skema Fasilitas</option>' +
            // `${options}` +
            // '</select>' +
            // '</div></div>' +
            '<br />' +
            '<div class="row form-material">' +
            '<div class="col">' +
            '<div class="form-lable row" id="jumlahtenorid" ><label class="col-sm-4 col-form-label">Jumlah Tenor</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jumlah_tenor"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Jumlah margin</label>' +
            '<div class="col-sm-8"><select class="form-control" id="jumlah_margin"><option value="0">Pilih Jumlah margin </option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>' +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="row form-material">' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id1" hidden><label class="col-sm-4 col-form-label">Jangka waktu 1</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu1"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id1" hidden><label class="col-sm-4 col-form-label">Margin 1</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin1"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '</div>' +
            /// ini
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id2" hidden><label class="col-sm-4 col-form-label">Jangka waktu 2</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu2"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id2" hidden><label class="col-sm-4 col-form-label">Margin 2</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin2"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '</div>' +
            /// ini
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id3" hidden><label class="col-sm-4 col-form-label">Jangka waktu 3</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu3"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id3" hidden><label class="col-sm-4 col-form-label">Margin 3</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin3"/> ' +
            '</div></div>' +
            '</div>' +
            '</div>' +
            ///ini
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id4" hidden><label class="col-sm-4 col-form-label">Jangka waktu 4</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu4"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id4" hidden><label class="col-sm-4 col-form-label">Margin 4</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin4"/> ' +
            '</div></div>' +
            '</div>' +
            '</div>' +
            ///
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id5" hidden><label class="col-sm-4 col-form-label">Jangka waktu 5</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu5"/> ' +
            '</div></div>' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id5" hidden><label class="col-sm-4 col-form-label">Margin 5</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin5"/> ' +
            '</div></div>' +
            '</div>' +
            '</div>' +
            ///

            // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">tenor</label>' +
            // '<div class="col-sm-8"><input type="text" class="form-control" id="tenor"/> ' +
            // '</div></div>' +
            '<br />',

          // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Margin</label>' +
          // '<div class="col-sm-8"><input type="text" class="form-control" id="margin"/> ' +
          // '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const skema_fasilitas = $('#skema_fasilitas').val();
            const margin1 = $('#margin1').val();
            const margin2 = $('#margin2').val();
            const margin3 = $('#margin3').val();
            const margin4 = $('#margin4').val();
            const margin5 = $('#margin5').val();
            const tenor1 = $('#jangka_waktu1').val();
            const tenor2 = $('#jangka_waktu2').val();
            const tenor3 = $('#jangka_waktu3').val();
            const tenor4 = $('#jangka_waktu4').val();
            const tenor5 = $('#jangka_waktu5').val();

            const tn_code = $('#tn_code').val();
            const jumlahtier = $('#jumlah_margin').val();

            // let max_plafond = $('#max_plafond').val();
            // let expired_date = $('#expired_date').val();

            // if (skema_fasilitas === '') {
            //   alert('Skema Fasilitas Harus Di isi ');
            //   return;
            // }
            if (margin1 === '') {
              alert('Margin Harus Di isi');
              return;
            } else if (tn_code === '') {
              alert('Tn Code Harus Di isi');
              return;
            }
            if (jumlahtier == null) {
              alert('tenor harus di isi ');
              return;
            }

            if (jumlahtier == '1') {
              this.tenortier = tenor1;

              this.margin = margin1;
            } else if (jumlahtier == '2') {
              this.tenortier = tenor1 + '-' + tenor2;

              this.margin = margin1 + '-' + margin2;
            } else if (jumlahtier == '3') {
              this.tenortier = tenor1 + '-' + tenor2 + '-' + tenor3;

              this.margin = margin1 + '-' + margin2 + '-' + margin3;
            } else if (jumlahtier == '4') {
              this.tenortier = tenor1 + '-' + tenor2 + '-' + tenor3 + '-' + tenor4;

              this.margin = margin1 + '-' + margin2 + '-' + margin3 + '-' + margin4;
            } else if (jumlahtier == '5') {
              this.tenortier = tenor1 + '-' + tenor2 + '-' + tenor3 + '-' + tenor4 + '-' + tenor5;

              this.margin = margin1 + '-' + margin2 + '-' + margin3 + '-' + margin4 + '-' + margin5;
            }
            // else {
            //  if(active=='0'){
            //     this.kirimactive=0;
            //  }else{
            //   this.kirimactive=1;
            //  }

            const body = {
              // skema_id: $('#skema_fasilitas').val() + '_fas0',

              skema_id: this.skema,
              tenor: $('#jumlah_tenor').val(),
              tenor_tier: this.tenortier,
              tier: $('#jumlah_margin').val(),
              margin: this.margin,
            };
            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_tenor_margin_fix', body, { headers }).subscribe({
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
            // }
          }
        });
      }
    });
  }

  updatemargin(): void {
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
        $(document).ready(function () {
          $('#jumlah_margin').change(function () {
            // $('#tenor_tier1').val('1');
            if ($('#jumlah_margin').val() === '1') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#margin_id1').removeAttr('hidden');

              $('#jangka_waktu_id2').attr('hidden', 'true');
              $('#jangka_waktu_id3').attr('hidden', 'true');
              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');

              $('#margin_id2').attr('hidden', 'true');
              $('#margin_id3').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '2') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');

              $('#jangka_waktu_id3').attr('hidden', 'true');
              $('#margin_id3').attr('hidden', 'true');
              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '3') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');
              $('#jangka_waktu_id3').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');
              $('#margin_id3').removeAttr('hidden');

              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '4') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');
              $('#jangka_waktu_id3').removeAttr('hidden');
              $('#jangka_waktu_id4').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');
              $('#margin_id3').removeAttr('hidden');
              $('#margin_id4').removeAttr('hidden');

              // $('#jangka_waktu4').attr('hidden', 'true');
              // $('#margin4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            } else if ($('#jumlah_margin').val() === '5') {
              $('#jangka_waktu_id1').removeAttr('hidden');
              $('#jangka_waktu_id2').removeAttr('hidden');
              $('#jangka_waktu_id3').removeAttr('hidden');
              $('#jangka_waktu_id4').removeAttr('hidden');
              $('#jangka_waktu_id5').removeAttr('hidden');

              $('#margin_id1').removeAttr('hidden');
              $('#margin_id2').removeAttr('hidden');
              $('#margin_id3').removeAttr('hidden');
              $('#margin_id4').removeAttr('hidden');
              $('#margin_id5').removeAttr('hidden');
            } else {
              // $('#margin_1_id').attr('hidden', 'true');
              // $('#margin_2_id').attr('hidden', 'true');
              // $('#margin_3_id').attr('hidden', 'true');
              // // $('#tenor1_id').attr('hidden', 'true');
              // // $('#tenor2_id').attr('hidden', 'true');
              // // $('#tenor3_id').attr('hidden', 'true');
              // $('#tenor_tier1_id').attr('hidden', 'true');
              // $('#tenor_tier2_id').attr('hidden', 'true');
              // $('#tenor_tier3_id').attr('hidden', 'true');

              $('#jangka_waktu_id1').attr('hidden', 'true');
              $('#jangka_waktu_id2').attr('hidden', 'true');
              $('#jangka_waktu_id3').attr('hidden', 'true');
              $('#jangka_waktu_id4').attr('hidden', 'true');
              $('#jangka_waktu_id5').attr('hidden', 'true');

              $('#margin_id1').attr('hidden', 'true');
              $('#margin_id2').attr('hidden', 'true');
              $('#margin_id3').attr('hidden', 'true');
              $('#margin_id4').attr('hidden', 'true');
              $('#margin_id5').attr('hidden', 'true');
            }
          });
        });

        Swal.fire({
          title: 'Create Tenor Margin Fix',
          width: '850px',
          html:
            // '<br />' +
            // '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Skema fasilitas</label>' +
            // // '<div class="col-sm-8">  <select id="status_active"><option value="">Pilih status</option><option value="1">Aktif</option><option value="0">Tidak Aktif</option></select>' +
            // '<div class="col-sm-8"><select class="form-control" id="skema_fasilitas"><option value="">Pilih skema Fasilitas</option>' +
            // `${options}` +
            // '</select>' +
            // '</div></div>' +
            '<br />' +
            '<div class="row form-material">' +
            '<div class="col">' +
            '<div class="form-lable row" id="jumlahtenorid" ><label class="col-sm-4 col-form-label">Jumlah Tenor</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jumlah_tenor"/> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-4 col-form-label">Jumlah margin</label>' +
            '<div class="col-sm-8"><select class="form-control" id="jumlah_margin"><option value="0">Pilih Jumlah margin </option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>' +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="row form-material">' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id1" hidden><label class="col-sm-4 col-form-label">Jangka waktu 1</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu1"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id1" hidden><label class="col-sm-4 col-form-label">Margin 1</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin1"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '</div>' +
            /// ini
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id2" hidden><label class="col-sm-4 col-form-label">Jangka waktu 2</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu2"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id2" hidden><label class="col-sm-4 col-form-label">Margin 2</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin2"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '</div>' +
            /// ini
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id3" hidden><label class="col-sm-4 col-form-label">Jangka waktu 3</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu3"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id3" hidden><label class="col-sm-4 col-form-label">Margin 3</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin3"/> ' +
            '</div></div>' +
            '</div>' +
            '</div>' +
            ///ini
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id4" hidden><label class="col-sm-4 col-form-label">Jangka waktu 4</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu4"/> ' +
            '</div></div>' +
            '<br />' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id4" hidden><label class="col-sm-4 col-form-label">Margin 4</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin4"/> ' +
            '</div></div>' +
            '</div>' +
            '</div>' +
            ///
            '<br />' +
            '<div class="row form-material">>' +
            '<div class="col">' +
            '<div class="form-lable row" id="jangka_waktu_id5" hidden><label class="col-sm-4 col-form-label">Jangka waktu 5</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="jangka_waktu5"/> ' +
            '</div></div>' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-lable row" id="margin_id5" hidden><label class="col-sm-4 col-form-label">Margin 5</label>' +
            '<div class="col-sm-8"><input type="number" class="form-control" id="margin5"/> ' +
            '</div></div>' +
            '</div>' +
            '</div>' +
            ///

            // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">tenor</label>' +
            // '<div class="col-sm-8"><input type="text" class="form-control" id="tenor"/> ' +
            // '</div></div>' +
            '<br />',

          // '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Margin</label>' +
          // '<div class="col-sm-8"><input type="text" class="form-control" id="margin"/> ' +
          // '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const skema_fasilitas = $('#skema_fasilitas').val();
            const margin1 = $('#margin1').val();
            const margin2 = $('#margin2').val();
            const margin3 = $('#margin3').val();
            const margin4 = $('#margin4').val();
            const margin5 = $('#margin5').val();
            const tenor1 = $('#jangka_waktu1').val();
            const tenor2 = $('#jangka_waktu2').val();
            const tenor3 = $('#jangka_waktu3').val();
            const tenor4 = $('#jangka_waktu4').val();
            const tenor5 = $('#jangka_waktu5').val();

            const tn_code = $('#tn_code').val();
            const jumlahtier = $('#jumlah_margin').val();

            // let max_plafond = $('#max_plafond').val();
            // let expired_date = $('#expired_date').val();

            // if (skema_fasilitas === '') {
            //   alert('Skema Fasilitas Harus Di isi ');
            //   return;
            // }
            if (margin1 === '') {
              alert('Margin Harus Di isi');
              return;
            } else if (tn_code === '') {
              alert('Tn Code Harus Di isi');
              return;
            }
            if (jumlahtier == null) {
              alert('tenor harus di isi ');
              return;
            }

            if (jumlahtier == '1') {
              this.tenortier = tenor1;

              this.margin = margin1;
            } else if (jumlahtier == '2') {
              this.tenortier = tenor1 + '-' + tenor2;

              this.margin = margin1 + '-' + margin2;
            } else if (jumlahtier == '3') {
              this.tenortier = tenor1 + '-' + tenor2 + '-' + tenor3;

              this.margin = margin1 + '-' + margin2 + '-' + margin3;
            } else if (jumlahtier == '4') {
              this.tenortier = tenor1 + '-' + tenor2 + '-' + tenor3 + '-' + tenor4;

              this.margin = margin1 + '-' + margin2 + '-' + margin3 + '-' + margin4;
            } else if (jumlahtier == '5') {
              this.tenortier = tenor1 + '-' + tenor2 + '-' + tenor3 + '-' + tenor4 + '-' + tenor5;

              this.margin = margin1 + '-' + margin2 + '-' + margin3 + '-' + margin4 + '-' + margin5;
            }
            // else {
            //  if(active=='0'){
            //     this.kirimactive=0;
            //  }else{
            //   this.kirimactive=1;
            //  }

            const body = {
              // skema_id: $('#skema_fasilitas').val() + '_fas0',

              skema_id: this.skema,
              tenor: $('#jumlah_tenor').val(),
              tenor_tier: this.tenortier,
              tier: $('#jumlah_margin').val(),
              margin: this.margin,
            };
            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + '1/efos-ref/update_tenor_margin_fix', body, { headers }).subscribe({
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
            // }
          }
        });
      }
    });
  }
}
