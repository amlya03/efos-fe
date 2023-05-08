import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import Swal from 'sweetalert2';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { listskemastepup } from 'app/data-entry/services/config/listskemastepup';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-parametermarginstepup',
  templateUrl: './parametermarginstepup.component.html',
  styleUrls: ['./parametermarginstepup.component.scss'],
})
export class ParametermarginstepupComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  tableAgunan: listCreatemodel[] = [];
  kirimantenortier: any;
  kirimanmargin: any;
  kirimantenor: any;
  kirimanskemafasilitas: any;
  kirimantier: any;
  listskemastepup: listskemastepup[] = [];
  constructor(protected datEntryService: DataEntryService, protected http: HttpClient) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  ngOnInit(): void {
    this.datEntryService.getskemastepup().subscribe(skema => {
      this.listskemastepup = skema.result;
      this.dtTrigger.next(skema.result);
      console.warn('ini stepup' + skema);
    });
  }

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
}
