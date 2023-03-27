import { Component, OnInit } from '@angular/core';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { InputScoringService } from 'app/input-scoring/input-scoring.service';

@Component({
  selector: 'jhi-parameterskema',
  templateUrl: './parameterskema.component.html',
  styleUrls: ['./parameterskema.component.scss'],
})
export class ParameterskemaComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  tablelistproduk: listCreatemodel[] = [];
  tablelistskema: listCreatemodel[] = [];
  modelListAkad: listCreatemodel[] = [];
  kirimanskema: any;
  tampungpemecah: any;
  kirimanskemadeskripsi: any;
  constructor(
    protected datEntryService: DataEntryService,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService,
    protected scoringServices: InputScoringService
  ) {}

  ngOnInit(): void {
    this.datEntryService.getListskema().subscribe(table => {
      this.tablelistskema = table.result;
      // console.log(this.tablelistskema);
    });
    this.scoringServices.getListAkad().subscribe(akad => {
      this.modelListAkad = akad.result;
      // console.log('ini fix' + this.modelListAkad);
    });
    this.datEntryService.getListproduk().subscribe(table => {
      this.tablelistproduk = table.result;
    });
  }

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
}
