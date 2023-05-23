import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { listCreatemodel } from 'app/data-entry/services/config/listCreate.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { InputScoringService } from 'app/input-scoring/input-scoring.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-parameterskema',
  templateUrl: './parameterskema.component.html',
  styleUrls: ['./parameterskema.component.scss'],
})
export class ParameterskemaComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;

  tablelistproduk: listCreatemodel[] = [];
  tablelistskema: listCreatemodel[] = [];
  modelListAkad: listCreatemodel[] = [];
  kirimanskema: any;
  tampungpemecah: any;
  kirimanskemadeskripsi: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  dataretrive: any;
  constructor(
    protected datEntryService: DataEntryService,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService,
    protected scoringServices: InputScoringService
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  ngOnInit(): void {
    this.datEntryService.getListskema().subscribe(table => {
      this.tablelistskema = table.result;
      // console.log(this.tablelistskema);
      this.dtTrigger.next(this.tablelistskema);
    });
    this.scoringServices.getListAkad().subscribe(akad => {
      this.modelListAkad = akad.result;
      // console.log('ini fix' + this.modelListAkad);
    });
    this.datEntryService.getListprodukall().subscribe(table => {
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
          $('#skema_master').change(function () {
            const skema_master = $('#skema_master').val();

            if (skema_master === '2') {
              $('#id_tear').removeAttr('hidden');
            } else {
              $('#id_tear').attr('hidden', 'true');
            }
          });

          $('#skema').change(function () {
            if ($('#skema').val() === 'Lainnya') {
              // alert('ini');
              $('#lainnya1').removeAttr('hidden');
            } else {
              // alert('else');
              $('#lainnya1').attr('hidden', 'true');
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
            '<div class="form-lable row" id="id_tear" hidden><label class="col-sm-4 col-form-label">tier</label>' +
            '<div class="col-sm-8"> <select id="tear_select" class="form-control"><option value="">Pilih tier</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>' +
            '<br>' +
            '</div></div>' +
            // '<br />' +
            '<div class="form-lable row" id="id_tenortear1" hidden><label class="col-sm-4 col-form-label">tenor_tier</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor_tier1"/> ' +
            '<br>' +
            '</div></div>' +
            // '<br />' +
            '<div class="form-lable row" id="id_tenortear2" hidden><label class="col-sm-4 col-form-label">tenor_tier2</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor_tier2"/> ' +
            '<br>' +
            '</div></div>' +
            // '<br />' +
            '<div class="form-lable row" id="id_tenortear3" hidden><label class="col-sm-4 col-form-label">tenor_tier3</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="tenor_tier3"/> ' +
            '<br>' +
            '</div></div>' +
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
                tenor: '',
                tenor_tier: '',
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema', body, { headers }).subscribe({
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

  viewdataskema(id: any): void {
    // const options = this.inputScoring.map((option: any) => {
    //   return `
    //     <option key="${option}" value="${option.kode_fasilitas}">
    //         ${option.fasilitas}
    //     </option>
    //   `;
    // });

    this.datEntryService.getdataretriveskema(id).subscribe(table => {
      this.dataretrive = table.result;
    });

    const listAkad = this.modelListAkad.map((option: listCreatemodel) => {
      return `
            <option key="${option}" value="${option.deskripsi}">
                ${option.deskripsi}
            </option>
          `;
    });

    // const data = this.dataretrive;
    // const nama = this.dataretrive.program.substring(0, 3);
    const deskripsiskema = this.dataretrive.skema_deskripsi;
    const akat = this.dataretrive.akad;
    const max = this.dataretrive.max_plafond;
    const min = this.dataretrive.min_plafond;
    const mindp = this.dataretrive.dp_min;
    // const status = this.dataretrive.active;

    // if (status === '1') {
    //   this.statusvalue = 'Aktif';
    // } else {
    //   this.statusvalue = 'Tidak Aktif';
    // }

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
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Skema Deskripsi </label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="skema_deskripsi" value="' +
            deskripsiskema +
            '"> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row"><label class="col-sm-4 col-form-label">Akad</label>' +
            '<div class="col-sm-8"><select class="form-control" id="akad"><option value="' +
            akat +
            '">' +
            akat +
            '</option>' +
            `${listAkad}` +
            '</select>' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="max_plafond" value="' +
            max +
            '"> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="min_plafond" value="' +
            min +
            '"> ' +
            '</div></div>' +
            '<br />' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-4 col-form-label">Dp minimal</label>' +
            '<div class="col-sm-8"><input type="text" class="form-control" id="dp_minimal" value="' +
            mindp +
            '"> ' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            const skemadeskripsi = $('#skema_deskripsi').val();
            const akat = $('#akat').val();
            const min_plafond = $('#min_plafond').val();
            const max_plafond = $('#max_plafond').val();
            const dp_minimal = $('#dp_minimal').val();
            const active = $('#status_active').val();
            if (active === '') {
              alert('Status Aktif Harus Dipilih');
              return;
            } else if (skemadeskripsi === '') {
              alert('skema deskripsi harus di isi');
              return;
            } else if (min_plafond === '') {
              alert('Min Platfron harus di isi');
              return;
            } else if (max_plafond === '') {
              alert('Max Plafond harus di isi');
              return;
            } else if (akat === '') {
              alert('akat harus di isi');
              return;
            } else if (dp_minimal === '') {
              alert('Dp  harus di isi');
              return;
            } else {
              // if (active == '0') {
              //   this.kirimactive = 0;
              // } else {
              //   this.kirimactive = 1;
              // }

              const body = {
                id: id,
                // active: this.kirimactive,
                // kode_program: data.kode_program,
                // kode_fasilitas: data.kode_fasilitas,
                // program: program,
                skema_deskripsi: skemadeskripsi,
                min_plafond: min_plafond,
                max_plafond: max_plafond,
                akad: akat,
                dp_min: dp_minimal,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_skema', body, { headers }).subscribe({
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
