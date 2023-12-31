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
import { Router } from '@angular/router';
import { listskemafix } from 'app/data-entry/services/config/listskemafix';
import { listskemastepup } from 'app/data-entry/services/config/listskemastepup';
import { listSkemaModel } from 'app/parameterized/config/listSkemaModel.model';

@Component({
  selector: 'jhi-parameterskema',
  templateUrl: './parameterskema.component.html',
  styleUrls: ['./parameterskema.component.scss'],
})
export class ParameterskemaComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;

  tablelistproduk: listCreatemodel[] = [];
  tablelistskema: listSkemaModel[] = [];
  modelListAkad: listCreatemodel[] = [];
  kirimanskema: any;
  tampungpemecah: any;
  kirimantenortier: any;
  kirimanskemadeskripsi: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  dataretrive: any;

  listskemafix: listskemafix[] = [];
  listSkemaMasterFix: listSkemaModel[] = [];
  listSkemaMasterNonFix: listSkemaModel[] = [];
  margin: any;
  tenortier: any;
  listskemastepup: listskemastepup[] = [];
  kirimanmargin: any;
  kirimantenor: any;
  kirimanskemafasilitas: any;
  kirimantier: any;
  listskemastepupselect: any;
  listskemafixselect: any;
  tierselect: any;
  constructor(
    protected datEntryService: DataEntryService,
    protected http: HttpClient,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    protected scoringServices: InputScoringService,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  ngOnInit(): void {
    this.datEntryService.getListskema().subscribe(table => {
      this.tablelistskema = table.result;

      this.tablelistskema.forEach(element => {
        if (element.skema_master === '2') {
          this.listSkemaMasterNonFix.push(element);
        } else {
          this.listSkemaMasterFix.push(element);
        }
      });
      this.dtTrigger.next(this.tablelistskema);
    });
    this.datEntryService.getskemastepup().subscribe(skema => {
      this.listskemastepupselect = skema.result;
      // this.dtTrigger.next(skema.result);
      // console.warn('ini stepup' + skema);
    });
    this.datEntryService.getskemafix().subscribe(skema => {
      this.listskemafixselect = skema.result;
      // console.log('ini fix' + this.listskemafix);
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
    // DELAY
    let tampunganValidasi: any = 0;
    const options = this.tablelistproduk.map((option: any) => {
      return `
            <option key="${option}" value="${option.kode_produk}">
                ${option.produk_deskripsi}
            </option>
          `;
    });

    const optionsskema = this.tablelistskema.map((option: listSkemaModel) => {
      return `
            <option key="${option}" value="${option.skema}|${option.skema_deskripsi}">
            ${option.skema}-${option.skema_deskripsi}
            </option>
          `;
    });

    const readArrayEmptyFix = this.listSkemaMasterFix.toString() === '';
    const readArrayEmptyNonFix = this.listSkemaMasterNonFix.toString() === '';

    const optionSkemaFix = this.listSkemaMasterFix.map((option: listSkemaModel) => {
      return `
            <option key="${option}" value="${option.skema}|${option.skema_deskripsi}">
            ${option.skema}-${option.skema_deskripsi}
            </option>
          `;
    });

    const optionSkemaNonFix = this.listSkemaMasterNonFix.map((option: listSkemaModel) => {
      return `
            <option key="${option}" value="${option.skema}|${option.skema_deskripsi}">
            ${option.skema}-${option.skema_deskripsi}
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
      title: 'Tambah Data Input Parameter Skema',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Tambah Data!',
      cancelButtonText: 'Tidak',
    }).then(result => {
      if (result.isConfirmed) {
        $(document).ready(function () {
          // Logic for Skema Master
          $('#skema_master').change(function () {
            const skema_master = $('#skema_master').val();

            $('#skema').empty();
            if (skema_master === '2') {
              if (readArrayEmptyNonFix) {
                $('#lainnya1').removeAttr('hidden');
              } else {
                $('#lainnya1').attr('hidden', 'true');
              }

              $('#id_tear').removeAttr('hidden');
              $('#divSkemaAll').removeAttr('hidden');
              $('#skema').append(`${optionSkemaNonFix}`);
              $('#skema').append(`<option value="Lainnya">Lainnya</option>`);
            } else {
              if (readArrayEmptyFix) {
                $('#lainnya1').removeAttr('hidden');
              } else {
                $('#lainnya1').attr('hidden', 'true');
              }

              $('#id_tear').attr('hidden', 'true');
              $('#id_tenortear1').attr('hidden', 'true');
              $('#id_tenortear2').attr('hidden', 'true');
              $('#id_tenortear3').attr('hidden', 'true');
              $('#divSkemaAll').removeAttr('hidden');
              $('#skema').append(`${optionSkemaFix}`);
              $('#skema').append(`<option value="Lainnya">Lainnya</option>`);
            }
          });

          // Logic for Skema
          $('#skema').change(function () {
            if ($('#skema').val() === 'Lainnya') {
              // alert('ini');
              $('#lainnya1').removeAttr('hidden');
            } else {
              // alert('else');
              $('#lainnya1').attr('hidden', 'true');
            }
          });

          // Logic for Tier
          $('#tear_select').change(function () {
            if ($('#tear_select').val() === '1') {
              $('#id_tenortear1').removeAttr('hidden');
              $('#id_tenortear2').attr('hidden', 'true');
              $('#id_tenortear3').attr('hidden', 'true');
            } else if ($('#tear_select').val() === '2') {
              $('#id_tenortear1').removeAttr('hidden');
              $('#id_tenortear2').removeAttr('hidden');
              $('#id_tenortear3').attr('hidden', 'true');
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
          title: 'Tambah Data Parameter Skema',
          html:
            '<br />' +
            '<div class="row form-material" style="width:100%">' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Deskripsi Program</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="kode_produk">' +
            '<option value="">Pilih Deskripsi Program</option>' +
            `${options}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Skema Master</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="skema_master">' +
            '<option value="">Pilih Skema Master</option>' +
            '<option value="1">Fix</option>' +
            '<option value="2">Step up</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row" id="id_tear" hidden>' +
            '<label class="col-sm-4 col-form-label">Tier</label>' +
            '<div class="col-sm-8">' +
            '<select id="tear_select" class="form-control">' +
            '<option value="">Pilih Tier</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col" id="id_tenortear1" hidden>' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">1</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="tenor_tier1"/> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col" id="id_tenortear2" hidden>' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">2</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="tenor_tier2"/> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col" id="id_tenortear3" hidden>' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">3</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="tenor_tier3"/> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form-group row" id="divSkemaAll" hidden>' +
            '<label class="col-sm-4 col-form-label">Skema</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="skema">' +
            '<option value="">Pilih Skema</option>' +
            `${optionSkemaFix}` +
            '<option value="Lainnya">Lainnya</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-group row" id="lainnya1" hidden>' +
            '<label class="col-sm-4 col-form-label hidden">Deskripsi skema</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="skema_deskripsi"/>' +
            '</div>' +
            '</div>' +
            '<div class="form-group row" hidden>' +
            '<label class="col-sm-4 col-form-label">Fasilitas Ke</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="fasilitas">' +
            '<option value="">Pilih Fasilitas</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Akad</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="akad">' +
            '<option value="">Pilih Akad</option>' +
            `${listAkad}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Minimal Down Payment</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="dp_min"/> ' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Max Plafond</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="max_platfon"/> ' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Min Plafond</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="min_platfon"/> ' +
            '</div>' +
            '</div>' +
            '<br />' +
            '<div class="form-group row">' +
            '<label class="col-sm-4 col-form-label">Max tenor</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="max_tenor"/> ' +
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
          scrollbarPadding: true,
        }).then(result => {
          if (result.isConfirmed) {
            // alert('masuk')
            const fasilitas = $('#fasilitas').val();
            const kode_produk: any = $('#kode_produk').val();
            const min_platfon = $('#min_platfon').val();
            const max_platfon = $('#max_platfon').val();
            const max_tenor = $('#max_tenor').val();
            const skema_master = $('#skema_master').val();
            const skema: any = $('#skema').val();
            const dp_min = $('#dp_min').val();
            const akad: any = $('#akad').val();
            const tear_select = $('#tear_select').val();
            const tenor_tier1 = $('#tenor_tier1').val();
            const tenor_tier2 = $('#tenor_tier2').val();
            const tenor_tier3 = $('#tenor_tier3').val();

            if (kode_produk === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Kode Produk Harus Di isi',
              });
              return;
            } else if (min_platfon === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Minimal Plafond Harus di pilih',
              });
              return;
            } else if (max_platfon === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Maximal Plafond Harus di pilih',
              });
              return;
            } else if (max_tenor === '') {
              alert('Max Tenor harus di isi');
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Maximal Tenor Harus di pilih',
              });
              return;
            } else if (skema_master === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Skema Master Harus di pilih',
              });
              return;
            } else if (skema === '') {
              Swal.fire({
                icon: 'error',
                title: 'Gagal, Skema Harus di pilih',
              });
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
              if (skema_master == '1') {
                this.tierselect = '';
                this.kirimantenortier = '';
              } else {
                if (tear_select === '1') {
                  if (tenor_tier1 === '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal, Tenor Tier 1 Harus di isi',
                    });
                    return;
                  }
                  this.kirimantenortier = tenor_tier1;
                } else if (tear_select === '2') {
                  if (tenor_tier1 === '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal, Tenor Tier 1 Harus di isi',
                    });
                    return;
                  } else if (tenor_tier2 === '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal, Tenor Tier 2 Harus di isi',
                    });
                    return;
                  }
                  this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2;
                } else {
                  if (tenor_tier1 === '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal, Tenor Tier 1 Harus di isi',
                    });
                    return;
                  }
                  if (tenor_tier2 === '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal, Tenor Tier 2 Harus di isi',
                    });
                    return;
                  }
                  if (tenor_tier3 === '') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal, Tenor Tier 3 Harus di isi',
                    });
                    return;
                  }
                  this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2 + '-' + tenor_tier3;
                }
              }

              this.tablelistskema.map((mappingOption: listSkemaModel) => {
                if (
                  mappingOption.kode_produk.toUpperCase().replace(/\s/g, '') === kode_produk.toUpperCase().replace(/\s/g, '') &&
                  (mappingOption.skema.toUpperCase() + '|' + mappingOption.skema_deskripsi.toUpperCase()).replace(/\s/g, '') ===
                    skema.toUpperCase().replace(/\s/g, '') &&
                  mappingOption.akad.toUpperCase().replace(/\s/g, '') === akad.toUpperCase().replace(/\s/g, '')
                ) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal, Data Sudah Ada',
                  });
                  tampunganValidasi = 1;
                }
              });
              // alert("1")

              setTimeout(() => {
                if (tampunganValidasi == 1) {
                  // alert("2")
                  return;
                } else {
                  // alert("3")
                  const body = {
                    created_by: this.sessionStorageService.retrieve('sessionUserName'),
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
                    tenor: this.tierselect,
                    tenor_tier: this.kirimantenortier,
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

  viewdataskema(id: any): void {
    const listAkad = this.modelListAkad.map((option: listCreatemodel) => {
      return `
      <option key="${option}" value="${option.deskripsi}">
      ${option.deskripsi}
      </option>
      `;
    });

    this.datEntryService.getdataretriveskema(id).subscribe(table => {
      this.dataretrive = table.result;

      const deskripsiskema = this.dataretrive.skema_deskripsi;
      const akat = this.dataretrive.akad;
      const max = this.dataretrive.max_plafond;
      const min = this.dataretrive.min_plafond;
      const mindp = this.dataretrive.dp_min;

      Swal.fire({
        title: 'Edit Data Parameter Skema',
        text: '',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Edit Data!',
        cancelButtonText: 'Tidak',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Edit Data Skema',
            html:
              '<br />' +
              '<div class="row form-material" style="width:100%">' +
              '<div class="form-group row" id="dataValueDiv">' +
              '<label class="col-sm-4 col-form-label">Skema Deskripsi </label>' +
              '<div class="col-sm-8">' +
              '<input type="text" class="form-control" id="skema_deskripsi" value="' +
              deskripsiskema +
              '"> ' +
              '</div>' +
              '</div>' +
              '<br />' +
              '<div class="form-group row">' +
              '<label class="col-sm-4 col-form-label">Akad</label>' +
              '<div class="col-sm-8">' +
              '<select class="form-control" id="akad">' +
              '<option value="' +
              akat +
              '">' +
              akat +
              '</option>' +
              `${listAkad}` +
              '</select>' +
              '</div>' +
              '</div>' +
              '<p></p>' +
              '<div class="form-group row" id="dataValueDiv">' +
              '<label class="col-sm-4 col-form-label">Max Plafond</label>' +
              '<div class="col-sm-8">' +
              '<input type="text" class="form-control" id="max_plafond" value="' +
              max +
              '"> ' +
              '</div>' +
              '</div>' +
              '<p></p>' +
              '<div class="form-group row" id="dataValueDiv">' +
              '<label class="col-sm-4 col-form-label">Min Plafond</label>' +
              '<div class="col-sm-8">' +
              '<input type="text" class="form-control" id="min_plafond" value="' +
              min +
              '"> ' +
              '</div>' +
              '</div>' +
              '<p></p>' +
              '<div class="form-group row" id="dataValueDiv">' +
              '<label class="col-sm-4 col-form-label">Down payment minimal</label>' +
              '<div class="col-sm-8">' +
              '<input type="text" class="form-control" id="dp_minimal" value="' +
              mindp +
              '"> ' +
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
              const skemadeskripsi = $('#skema_deskripsi').val();
              const akat = $('#akat').val();
              const tear_select = $('#tear_select').val();
              const min_plafond = $('#min_plafond').val();
              const max_plafond = $('#max_plafond').val();
              const dp_minimal = $('#dp_minimal').val();
              const active = $('#status_active').val();

              if (skemadeskripsi === '') {
                Swal.fire({
                  icon: 'error',
                  title: 'Gagal, Skema Deskripsi harus di isi',
                });
                return;
              } else if (min_plafond === '') {
                Swal.fire({
                  icon: 'error',
                  title: 'Gagal, Minimal Plafond harus di isi',
                });
                return;
              } else if (max_plafond === '') {
                Swal.fire({
                  icon: 'error',
                  title: 'Gagal, Maximal Plafond harus di isi',
                });
                return;
              } else if (akat === '') {
                Swal.fire({
                  icon: 'error',
                  title: 'Gagal, Akad harus di isi',
                });
                return;
              } else if (dp_minimal === '') {
                Swal.fire({
                  icon: 'error',
                  title: 'Gagal, Down Payment harus di isi',
                });
                return;
              } else {
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
                  tenor: tear_select,
                  tenor_tier: this.kirimantenortier,
                  updated_by: this.sessionStorage.retrieve('sessionRole'),
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
            }
          });
        }
      });
    });
  }

  viewmargin(skema: any, skemamaster: any) {
    if (skemamaster == '2') {
      this.router.navigate(['parameterstrukturmarginstepup'], {
        queryParams: { skema: skema, skemamaster: skemamaster },
      });
      // .then(() => {
      //   window.location.reload();
      // });
    } else {
      this.router.navigate(['parameterstrukturmarginfix'], {
        queryParams: { skema: skema, skemamaster: skemamaster },
      });
      // .then(() => {
      //   window.location.reload();
      // });
    }
  }

  createstenormarginfix(): void {
    const options = this.listskemafixselect.map((option: listskemafix) => {
      return `
        <option key="${option}" value="${option.skema}">
            ${option.skema_deskripsi}
        </option>
      `;
    });

    Swal.fire({
      title: 'Tambah Margin dan Tenor untuk Fix',
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
          title: 'Tambah Margin dan Tenor untuk Fix',
          width: '1000px',
          html:
            '<br />' +
            '<div class="row form-material" style="width: 100%;">' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Skema fasilitas</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="skema_fasilitas">' +
            '<option value="">Pilih skema Fasilitas</option>' +
            `${options}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="jumlahtenorid" >' +
            '<label class="col-sm-4 col-form-label">Jumlah Tenor</label>' +
            '<div class="col-sm-3">' +
            '<input type="number" class="form-control" id="jumlah_tenor"/> ' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<h6>Bulan</h6>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row " id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Jumlah margin</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="jumlah_margin">' +
            '<option value="0">Pilih Jumlah margin </option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="row form-material">' +
            '<div class="col">' +
            '<div class="form-group row" id="jangka_waktu_id1" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka waktu 1</label>' +
            '<div class="col-sm-3">' +
            '<input type="number" class="form-control" id="jangka_waktu1"/> ' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<h6>Bulan</h6>' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="jangka_waktu_id2" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka waktu 2</label>' +
            '<div class="col-sm-3">' +
            '<input type="number" class="form-control" id="jangka_waktu2"/> ' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<h6>Bulan</h6>' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="jangka_waktu_id3" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka waktu 3</label>' +
            '<div class="col-sm-3">' +
            '<input type="number" class="form-control" id="jangka_waktu3"/> ' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<h6>Bulan</h6>' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="jangka_waktu_id4" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka waktu 4</label>' +
            '<div class="col-sm-3">' +
            '<input type="number" class="form-control" id="jangka_waktu4"/> ' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<h6>Bulan</h6>' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="jangka_waktu_id5" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka waktu 5</label>' +
            '<div class="col-sm-3">' +
            '<input type="number" class="form-control" id="jangka_waktu5"/> ' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<h6>Bulan</h6>' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-group row" id="margin_id1" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 1</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin1"/> ' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="margin_id2" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 2</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin2"/> ' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="margin_id3" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 3</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin3"/> ' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="margin_id4" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 4</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin4"/> ' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '<div class="form-group row" id="margin_id5" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 5</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin5"/> ' +
            '</div>' +
            '<p></p>' +
            '</div>' +
            '</div>' +
            '<br />',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Simpan',
          denyButtonText: 'Tidak',
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
            // alert(margin);
            const tn_code = $('#tn_code').val();
            const jumlahtier = $('#jumlah_margin').val();

            // let max_plafond = $('#max_plafond').val();
            // let expired_date = $('#expired_date').val();

            if (skema_fasilitas === '') {
              alert('Skema Fasilitas Harus Di isi ');
              return;
            } else if (margin1 === '') {
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
              skema_id: $('#skema_fasilitas').val() + '_fas0',
              tenor: $('#jumlah_tenor').val(),
              tenor_tier: this.tenortier,
              tier: $('#jumlah_margin').val(),
              margin: this.margin,
              created_by: this.sessionStorage.retrieve('sessionRole'),
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
            // }
          }
        });
      }
    });
  }

  createstenormarginstepup(): void {
    const options = this.listskemastepupselect.map((option: listskemastepup) => {
      return `
        <option key="${option}" value="${option.skema}">
            ${option.skema_deskripsi}
        </option>
      `;
    });

    Swal.fire({
      title: 'Tambah Data Tenor dan Manrgin untuk Step up',
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
          title: 'Tambah Data Tenor dan Manrgin untuk Step up',
          width: '1000px',
          html:
            '<br/>' +
            '<div class="row form-material" style="width: 100%;">' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Skema fasilitas</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="skema_fasilitas">' +
            '<option value="">Pilih skema Fasilitas</option>' +
            `${options}` +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="dataValueDiv1">' +
            '<label class="col-sm-4 col-form-label">Tier</label>' +
            '<div class="col-sm-8">' +
            '<select class="form-control" id="tier_id">' +
            '<option value="0">Pilih Tier</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="tenor1_id" >' +
            '<label class="col-sm-4 col-form-label">Jumlah Tenor</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="tenor1"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="row">' +
            '<div class="col">' +
            '<div class="form-group row" id="tenor_tier1_id" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka Waktu 1</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="tenor_tier1"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="tenor_tier2_id" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka Waktu 2</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="tenor_tier2"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="tenor_tier3_id" hidden>' +
            '<label class="col-sm-4 col-form-label">Jangka Waktu 3</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="tenor_tier3"/> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col">' +
            '<div class="form-group row" id="margin_1_id" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 1</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin_1"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="margin_2_id" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 2</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin_2"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
            '<div class="form-group row" id="margin_3_id" hidden>' +
            '<label class="col-sm-4 col-form-label">Margin 3</label>' +
            '<div class="col-sm-8">' +
            '<input type="number" class="form-control" id="margin_3"/> ' +
            '</div>' +
            '</div>' +
            '<p></p>' +
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
                // alert(tier+">"+tear2);
                this.kirimantenortier = tenor_tier1 + '-' + tenor_tier2;
                // return;
              }
            } else if (tier === '3') {
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
                alert('tenor 2 tier tidak boleh melebihi tenor11111');
                return;
              } else if (tear3 >= tier) {
                alert('tenor tier 3 tidak boleh melebihi tenor');
                return;
              } else {
                // alert(tier > tear2);
                // alert(tier > tear3);

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
              created_by: this.sessionStorage.retrieve('sessionRole'),
            };
            const headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
              // Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
            });
            this.http.post<any>(this.baseUrl + 'v1/efos-ref/create_tenor_margin_stepup', body, { headers }).subscribe({
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
        });
      }
    });
  }
}
