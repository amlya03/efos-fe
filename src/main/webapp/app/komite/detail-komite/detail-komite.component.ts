import { Component, Input, OnInit } from '@angular/core';
import { DataEntryService } from '../../data-entry/services/data-entry.service';
import { fetchAllDe } from '../../upload-document/services/config/fetchAllDe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { viewJobModel } from '../../data-entry/services/config/viewJobModel.model';
import { listAgunan } from '../../data-entry/services/config/listAgunan.model';
import { getStrukturPembiayaan } from '../../data-entry/services/config/getStrukturPembiayaan.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { refStrukturPembiayaan } from 'app/verification/service/config/refStrukturPembiayaan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { refTenorFix } from 'app/verification/service/config/refTenorFix.model';
import { refSkema } from 'app/verification/service/config/refSkema.model';
import { KomiteService } from '../services/komite.service';
import { refPersetujuanKhususModel } from '../services/config/refPersetujuanKhususModel.model';
import { listPersetujuanKhususModel } from '../services/config/listPersetujuanKhususModel.model';
import { getDetailApproval } from '../services/config/getDetailApproval.model';
import { getPersetujuanPembiayaanModel } from '../services/config/getPersetujuanPembiayaanModel.model';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { userModel } from '../services/config/userModel.model';

@Component({
  selector: 'jhi-detail-komite',
  templateUrl: './detail-komite.component.html',
  styleUrls: ['./detail-komite.component.scss'],
})
export class DetailKomiteComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  keputusanPembiayaanForm!: FormGroup;
  komiteFasilitasYangDimintaForm!: FormGroup;
  persetujuanPembiayaanForm!: FormGroup;
  detailApproval: getDetailApproval = new getDetailApproval();
  dataEntry: fetchAllDe = new fetchAllDe();
  fetchJob: viewJobModel = new viewJobModel();
  jobByCurefDE: getJob = new getJob();
  agunanModel: listAgunan[] = [];
  strukturByDe: getStrukturPembiayaan = new getStrukturPembiayaan();
  strukturAnalisa: refStrukturPembiayaan = new refStrukturPembiayaan();
  refPersetujuanKhusus: refPersetujuanKhususModel[] = [];
  // ////////////// Persetujuan Khusus ////////////////////////////////
  listPersetujuanKhusus: listPersetujuanKhususModel[] = [];
  id_listPersetujuanTablel: any;
  id_listPersetujuanKhusus: any;
  detail_listPersetujuanKhusus: any;
  usulan_listPersetujuanKhusus: any;
  ketentuan_listPersetujuanKhusus: any;
  mitigasi_resiko_listPersetujuanKhusus: any;
  persetujuan_listPersetujuanKhusus: any;
  // ////////////// Persetujuan Khusus ////////////////////////////////
  app_no_de: any;
  curef: string | undefined;
  cabang: string | undefined;
  tenor: refTenorFix[] = [];
  tenorRekomendasi: refTenorFix[] = [];
  persetujuanPembiayaan: getPersetujuanPembiayaanModel[] = [];
  userNya: userModel = new userModel();

  // Hasil Scoring
  hasilScoring: any;
  hasilStatus: any;

  // Ref Skema
  Skema: refSkema[] = [];

  // persetujuan Post
  persetujuanPost: any;

  // cek result get detail komite
  cekDetailKomite = 0;
  idPost: any;

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected dataEntryService: DataEntryService,
    protected verifikasiServices: ServiceVerificationService,
    private sessionStorageService: SessionStorageService,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected komiteServices: KomiteService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.cabang = this.sessionStorageService.retrieve('sessionKdCabang');
    this.load();
    // //////////////////// Fasilitas Yang Diminta //////////////////////
    this.komiteFasilitasYangDimintaForm = this.formBuilder.group({
      harga_permintaan: '',
      down_payment: '',
      tenor: '',
      angsuran: '',
      dsr: '',
    });

    // //////////////////// Rekomendasi System //////////////////////
    this.keputusanPembiayaanForm = this.formBuilder.group({
      skema: '',
      tipe_margin: '',
      jangka_waktu: '',
      harga_permintaan: '',
      down_payment: '',
      angsuran: '',
    });

    // //////////////////// Persetujuan Pembiayaan //////////////////////
    this.persetujuanPembiayaanForm = this.formBuilder.group({
      limit_kewenangan_memutus: '0',
      plafon_pembiayaan: '0',
      keputusan: '',
      alasan_penolakan: '',
      keterangan: '',
    });
  }
  load() {
    // //////////////////////////////////////////////// Get Data Users ///////////////////////////////////////////////////////////////////////
    setTimeout(() => {
      this.komiteServices.getDataUsers(this.app_no_de).subscribe(data => {
        this.userNya = data.result;
      });
    }, 5);
    // //////////////////////////////////////////////// Get Data Users ///////////////////////////////////////////////////////////////////////

    // //////////////////////////////////////////////// Ref Persetujuan Khusus ///////////////////////////////////////////////////////////////////////
    setTimeout(() => {
      this.komiteServices.getRefPersetujuanKhusus().subscribe(data => {
        this.refPersetujuanKhusus = data.result;
      });
    }, 10);
    // //////////////////////////////////////////////// Ref Persetujuan Khusus ///////////////////////////////////////////////////////////////////////

    // //////////////////////////////////////////////// List Persetujuan Khusus ///////////////////////////////////////////////////////////////////////
    setTimeout(() => {
      this.komiteServices.getListPersetujuanKhusus(this.app_no_de).subscribe(data => {
        this.listPersetujuanKhusus = data.result;
        for (let i = 0; i < this.listPersetujuanKhusus.length; i++) {
          this.id_listPersetujuanKhusus = this.listPersetujuanKhusus[i].id_jenis_persetujuan;
          this.id_listPersetujuanTablel = this.listPersetujuanKhusus[i].id;
          this.detail_listPersetujuanKhusus = this.listPersetujuanKhusus[i].detail_persetujuan;
          this.usulan_listPersetujuanKhusus = this.listPersetujuanKhusus[i].usulan;
          this.ketentuan_listPersetujuanKhusus = this.listPersetujuanKhusus[i].ketentuan;
          this.persetujuan_listPersetujuanKhusus = this.listPersetujuanKhusus[i].persetujuan;
          this.mitigasi_resiko_listPersetujuanKhusus = this.listPersetujuanKhusus[i].mitigasi_resiko;
        }
      });
    }, 15);
    // //////////////////////////////////////////////// List Persetujuan Khusus ///////////////////////////////////////////////////////////////////////

    // ////////////////// Get Persetujuan Pembiayaan ////////////////////////////////
    setTimeout(() => {
      this.komiteServices.getPersetujuanPembiayaan(this.app_no_de).subscribe(data => {
        this.persetujuanPembiayaan = data.result;

        // const retrivepersetujuanPembiayaanForm = {
        //   limit_kewenangan_memutus: this.persetujuanPembiayaan[0].limit_kewenangan_memutus,
        //   plafon_pembiayaan: this.persetujuanPembiayaan[0].plafon_pembiayaan,
        //   keputusan: this.persetujuanPembiayaan[0].keputusan,
        //   alasan_penolakan: this.persetujuanPembiayaan[0].alasan_penolakan,
        //   keterangan: this.persetujuanPembiayaan[0].keterangan,
        // };
        // this.persetujuanPembiayaanForm.setValue(retrivepersetujuanPembiayaanForm);
      });
    }, 20);
    // ////////////////// Get Persetujuan Pembiayaan ////////////////////////////////

    // //////////////////// Get Approval ////////////////////////////////////////////////
    setTimeout(() => {
      this.komiteServices.getDetailApproval(this.app_no_de).subscribe(data => {
        this.detailApproval = data.result;
        if (data.result == null) {
          this.cekDetailKomite = 0;
        } else {
          this.cekDetailKomite = 1;
        }
      });
    }, 25);
    // //////////////////// Get Approval ////////////////////////////////////////////////
    setTimeout(() => {
      // ambil job BY curef
      this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(jobByCuref => {
        this.jobByCurefDE = jobByCuref.result[0];
      });
    }, 30);
    setTimeout(() => {
      // ambil semua data DE
      this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        this.dataEntry = data.result;

        // ////////////////////////////////////////////////////////////////////////////////////////
        // Ref Skema
        this.verifikasiServices.getSkema(this.dataEntry.produk).subscribe(data => {
          if (data.code === 200) {
            this.Skema = data.result;
          }
        });
        // ////////////////////////////////////////////////////////////////////////////////////////
      });
    }, 35);
    setTimeout(() => {
      // ambil semua data view Job by Curef
      this.dataEntryService.getGetViewDataJob(this.curef).subscribe(Job => {
        this.fetchJob = Job.result[0];
      });
    }, 40);
    setTimeout(() => {
      // ambil agunan by curef
      this.dataEntryService.getfetchlistagunan(this.curef).subscribe(agunan => {
        this.agunanModel = agunan.result[0];
      });
    }, 45);
    setTimeout(() => {
      // ambil struktur pembiayaan DE
      this.dataEntryService.getFetchStrukturDE(this.app_no_de, this.curef).subscribe(strukturDe => {
        this.strukturByDe = strukturDe.result;

        if (this.strukturByDe.kode_fasilitas_name === 'PTA') {
          this.verifikasiServices.getTenorFix(this.strukturByDe.skema).subscribe(fix => {
            this.tenor = fix.result;
          });
        } else {
          this.verifikasiServices.getTenorNon(this.strukturByDe.skema).subscribe(Non => {
            this.tenor = Non.result;
          });
        }
      });
    }, 50);

    setTimeout(() => {
      // ambil darin struktur pembiayaan Analisa
      this.verifikasiServices.getFetchStrukturPembiayaan(this.app_no_de).subscribe(strukturAnalisa => {
        this.strukturAnalisa = strukturAnalisa.result;
        // //////////////////////// Fasilitas Yang DIminta ////////////////////////////////////////
        setTimeout(() => {
          if (this.cekDetailKomite === 0) {
            const retrivestrukturForm = {
              harga_permintaan: this.strukturAnalisa.harga_permintaan,
              down_payment: this.strukturAnalisa.down_payment,
              tenor: this.strukturAnalisa.tenor,
              angsuran: this.strukturAnalisa.angsuran,
              dsr: this.strukturAnalisa.dsr,
            };
            this.komiteFasilitasYangDimintaForm.setValue(retrivestrukturForm);
          } else {
            const retrivestrukturForm = {
              harga_permintaan: this.detailApproval.max_pembiayaan,
              down_payment: this.detailApproval.dp,
              tenor: this.detailApproval.jangka_waktu,
              angsuran: this.detailApproval.angsuran,
              dsr: this.detailApproval.dsr,
            };
            this.komiteFasilitasYangDimintaForm.setValue(retrivestrukturForm);
          }
        }, 10);

        setTimeout(() => {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
              app_no_de: this.dataEntry.app_no_de,
              curef: this.dataEntry.curef,
              dp: this.strukturAnalisa.down_payment,
              fasilitas: this.dataEntry.fasilitas_ke,
              harga_objek: this.strukturAnalisa.harga_permintaan,
              kode_fasilitas: this.dataEntry.kode_fasilitas,
              kode_produk: this.dataEntry.produk,
              skema_id: this.strukturByDe.skema,
              skema_master: this.strukturByDe.skema_master,
              tenor: this.strukturAnalisa.tenor,
            })
            .subscribe({
              next: data => {
                let anguran1 = data.result.angsuran[0];
                let anguran2 = data.result.angsuran[1];

                if (anguran2 == null) {
                  this.komiteFasilitasYangDimintaForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
                } else {
                  this.komiteFasilitasYangDimintaForm
                    .get('angsuran')
                    ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
                }

                setTimeout(() => {
                  this.http
                    .post<any>(this.baseUrl + 'v1/efos-verif/getHitungAnalisaPembiayaan', {
                      angsuran: data.result.angsuran[data.result.angsuran.length - 1],
                      app_no_de: this.dataEntry.app_no_de,
                    })
                    .subscribe({
                      next: data => {
                        this.komiteFasilitasYangDimintaForm.get('dsr')?.setValue(data.result.dsr);
                        setTimeout(() => {
                          this.http
                            .post<any>(this.baseUrl + 'v1/efos-verif/getHitungScoring', {
                              dsr: this.komiteFasilitasYangDimintaForm.get('dsr')?.value,
                              app_no_de: this.dataEntry.app_no_de,
                            })
                            .subscribe({
                              next: data => {
                                //console.warn(data);
                                this.hasilScoring = data.result.score_value;
                                this.hasilStatus = data.result.score_desc;
                              },
                            });
                        }, 10);
                      },
                    });
                }, 10);
              },
              error: err => {
                if (err.error.code === '400') {
                  alert(err.error.message);
                  this.getLoading(false);
                }
              },
            });
        }, 10);
        // ///////////////////////////////////////////////////////////////////////////////
        // /////////////////////// Fasilitas Yang DIminta //////////////////////////////////////////

        // //////////////////////// Rekomendasi System ////////////////////////////////////////
        setTimeout(() => {
          if (this.cekDetailKomite === 0) {
            const retriveRekomendasiSystem = {
              skema: this.strukturAnalisa.skema_code + '|' + this.strukturAnalisa.skema_master + '|' + this.strukturAnalisa.skema,
              tipe_margin: this.strukturByDe.tipe_margin,
              jangka_waktu: this.strukturAnalisa.tenor,
              harga_permintaan: this.strukturAnalisa.harga_permintaan,
              down_payment: this.strukturAnalisa.down_payment,
              angsuran: this.strukturAnalisa.angsuran,
            };
            this.keputusanPembiayaanForm.setValue(retriveRekomendasiSystem);
            this.getLoading(false);
          } else {
            const retriveRekomendasiSystem = {
              skema:
                this.detailApproval.skema_keputusan +
                '|' +
                this.detailApproval.skema_master_keputusan +
                '|' +
                this.detailApproval.skema_name_keputusan,
              tipe_margin: this.detailApproval.tipe_margin_keputusan,
              jangka_waktu: this.detailApproval.jangka_waktu,
              harga_permintaan: this.detailApproval.max_pembiayaan_keputusan,
              down_payment: this.detailApproval.dp_keputusan,
              angsuran: this.detailApproval.angsuran,
            };
            this.keputusanPembiayaanForm.setValue(retriveRekomendasiSystem);
          }
          // /////////////////////////////////////////////////////////////////////
          if (this.strukturAnalisa.skema_master === '1') {
            this.verifikasiServices.getTenorFix(this.strukturAnalisa.skema_code).subscribe(fix => {
              this.tenorRekomendasi = fix.result;
            });
          } else {
            this.verifikasiServices.getTenorNon(this.strukturAnalisa.skema_code).subscribe(Non => {
              this.tenorRekomendasi = Non.result;
            });
          }
          this.http
            .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
              app_no_de: this.dataEntry.app_no_de,
              curef: this.dataEntry.curef,
              dp: this.strukturAnalisa.down_payment,
              fasilitas: this.dataEntry.fasilitas_ke,
              harga_objek: this.strukturAnalisa.harga_permintaan,
              kode_fasilitas: this.dataEntry.kode_fasilitas,
              kode_produk: this.dataEntry.produk,
              skema_id: this.strukturByDe.skema,
              skema_master: this.strukturByDe.skema_master,
              tenor: this.strukturAnalisa.tenor,
            })
            .subscribe({
              next: data => {
                let anguran1 = data.result.angsuran[0];
                let anguran2 = data.result.angsuran[1];

                if (anguran2 == null) {
                  this.keputusanPembiayaanForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
                } else {
                  this.keputusanPembiayaanForm
                    .get('angsuran')
                    ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
                }
                this.getLoading(false);
              },
              error: err => {
                if (err.error.code == 400) {
                  alert(err.error.message);
                  this.getLoading(false);
                }
              },
            });
        }, 60);
        // /////////////////////// Rekomendasi SYstem //////////////////////////////////////////
      });
    }, 60);
  }
  hitungFasilitasYangDiminta() {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        dp: this.komiteFasilitasYangDimintaForm.get('down_payment')?.value,
        fasilitas: this.dataEntry.fasilitas_ke,
        harga_objek: this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        kode_produk: this.dataEntry.produk,
        skema_id: this.strukturByDe.skema,
        skema_master: this.strukturByDe.skema_master,
        tenor: this.komiteFasilitasYangDimintaForm.get('tenor')?.value,
      })
      .subscribe({
        next: data => {
          let anguran1 = data.result.angsuran[0];
          let anguran2 = data.result.angsuran[1];

          if (anguran2 == null) {
            this.komiteFasilitasYangDimintaForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
          } else {
            this.komiteFasilitasYangDimintaForm
              .get('angsuran')
              ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
          }
        },
        error: err => {
          if (err.error.code === '400') {
            alert(err.error.message);
          }
        },
      });
  }

  changeKeputusanPembiayaan(skema: any) {
    const getSkema = skema.split('|');
    if (getSkema[1] === '1') {
      this.keputusanPembiayaanForm.get('tipe_margin')?.setValue('FIX');
      this.verifikasiServices.getTenorFix(getSkema[0]).subscribe(fix => {
        this.tenorRekomendasi = fix.result;
      });
    } else {
      this.keputusanPembiayaanForm.get('tipe_margin')?.setValue('STEPUP');
      this.verifikasiServices.getTenorNon(getSkema[0]).subscribe(Non => {
        this.tenorRekomendasi = Non.result;
      });
    }
  }

  hitungRekomendasiSystem() {
    const deskripsiSkema = this.keputusanPembiayaanForm.get('skema')?.value.split('|');
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        dp: this.keputusanPembiayaanForm.get('down_payment')?.value,
        fasilitas: this.dataEntry.fasilitas_ke,
        harga_objek: this.keputusanPembiayaanForm.get('harga_permintaan')?.value,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        kode_produk: this.dataEntry.produk,
        skema_id: deskripsiSkema[0],
        skema_master: deskripsiSkema[1],
        tenor: this.keputusanPembiayaanForm.get('jangka_waktu')?.value,
      })
      .subscribe({
        next: data => {
          //console.warn('rekon', data);
          let anguran1 = data.result.angsuran[0];
          let anguran2 = data.result.angsuran[1];

          if (anguran2 == null) {
            this.keputusanPembiayaanForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
          } else {
            this.keputusanPembiayaanForm
              .get('angsuran')
              ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
          }
        },
        error: err => {
          if (err.error.code === '400') {
            alert(err.error.message);
          }
        },
      });
  }

  approve() {
    // /////////////////////// Create Approval /////////////////////////////
    // contooohhhhh// this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value.replace(/,/g, '').replace('Rp ', '').split('.')[0]
    const skemaFull = this.keputusanPembiayaanForm.get('skema')?.value.split('|');
    const totalPendapatanFull = this.jobByCurefDE.total_pendapatan;
    let angsuranfix = this.komiteFasilitasYangDimintaForm.get('angsuran')?.value.replace('Angsuran = ', '');
    let angsuranNon1 = angsuranfix.replace('Angsuran Tahun Ke 1 = ', '');
    let angsuranNon2 = angsuranNon1.replace('Angsuran Tahun Ke 2 = ', '');
    let angsurannya = angsuranNon2.split('; ');

    let angsuranfix2 = this.keputusanPembiayaanForm.get('angsuran')?.value.replace('Angsuran = ', '');
    let angsuranNon12 = angsuranfix2.replace('Angsuran Tahun Ke 1 = ', '');
    let angsuranNon22 = angsuranNon12.replace('Angsuran Tahun Ke 2 = ', '');
    let angsurannya2 = angsuranNon22.split('; ');
    if (this.cekDetailKomite === 0) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-approval/create_approval', {
          app_no_de: this.app_no_de,
          angsuran: angsurannya[0],
          angsuran_keputusan: angsurannya2[0],
          created_by: this.sessionStorageService.retrieve('sessionUserName'),
          created_date: '',
          dp: this.komiteFasilitasYangDimintaForm.get('down_payment')?.value,
          dp_keputusan: this.keputusanPembiayaanForm.get('down_payment')?.value,
          dsr: this.komiteFasilitasYangDimintaForm.get('dsr')?.value,
          id: 0,
          jangka_waktu: this.keputusanPembiayaanForm.get('jangka_waktu')?.value,
          max_pembiayaan: this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value,
          max_pembiayaan_keputusan: this.keputusanPembiayaanForm.get('harga_permintaan')?.value,
          skema_keputusan: skemaFull[0],
          skema_master_keputusan: skemaFull[1],
          skema_name_keputusan: skemaFull[2],
          tipe_margin_keputusan: this.keputusanPembiayaanForm.get('tipe_margin')?.value,
          total_pendapatan: totalPendapatanFull,
        })
        .subscribe({
          next: data => {
            //console.warn(data);
            // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
            this.http
              .post<any>(this.baseUrl + 'v1/efos-approval/create_history_persetujuan', {
                id: 1,
                app_no_de: this.app_no_de,
                limit_kewenangan_memutus: this.persetujuanPembiayaanForm.get('limit_kewenangan_memutus')?.value,
                plafon_pembiayaan: this.persetujuanPembiayaanForm.get('plafon_pembiayaan')?.value,
                keputusan: this.persetujuanPembiayaanForm.get('keputusan')?.value,
                alasan_penolakan: this.persetujuanPembiayaanForm.get('alasan_penolakan')?.value,
                keterangan: this.persetujuanPembiayaanForm.get('keterangan')?.value,
                approved_by: this.sessionStorageService.retrieve('sessionUserName'),
                approved_date: '',
              })
              .subscribe({
                next: data => {
                  //console.warn(data);
                  // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                  for (let i = 0; i < this.refPersetujuanKhusus.length; i++) {
                    if ($('#persetujuan_ya' + i).is(':checked')) {
                      this.persetujuanPost = 1;
                    } else if ($('#persetujuan_tidak' + i).is(':checked')) {
                      this.persetujuanPost = 0;
                    } else {
                      this.persetujuanPost = 0;
                    }
                    this.idPost = $('#id' + i).val();
                    let detail_persetujuanPost = $('#detail_persetujuan' + i).val();
                    let ketentuanPost = $('#ketentuan' + i).val();
                    let mitigasi_resikoPost = $('#mitigasi_resiko' + i).val();
                    let usulanPost = $('#usulan' + i).val();

                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-approval/update_persetujuan_khusus', {
                        app_no_de: this.app_no_de,
                        updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                        updated_date: '',
                        detail_persetujuan: detail_persetujuanPost,
                        id: this.idPost,
                        id_jenis_persetujuan: this.idPost,
                        ketentuan: ketentuanPost,
                        mitigasi_resiko: mitigasi_resikoPost,
                        persetujuan: this.persetujuanPost,
                        usulan: usulanPost,
                      })
                      .subscribe({
                        next: data => {
                          //console.warn(data);
                          if (this.idPost[this.refPersetujuanKhusus.length - 1] == this.idPost[i]) {
                            alert('Data Berhasil disimpan');
                            window.location.reload();
                          }
                        },
                        error: err => {
                          //console.error(err);
                        },
                      });
                  }
                  // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                },
                error: err => {
                  //console.error(err);
                },
              });
            // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
          },
          error: err => {
            //console.error(err);
          },
        });
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-approval/update_data_approval', {
          app_no_de: this.app_no_de,
          angsuran: angsurannya[0],
          angsuran_keputusan: angsurannya2[0],
          dp: this.komiteFasilitasYangDimintaForm.get('down_payment')?.value,
          dp_keputusan: this.keputusanPembiayaanForm.get('down_payment')?.value,
          dsr: this.komiteFasilitasYangDimintaForm.get('dsr')?.value,
          id: 0,
          jangka_waktu: this.keputusanPembiayaanForm.get('jangka_waktu')?.value,
          max_pembiayaan: this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value,
          max_pembiayaan_keputusan: this.keputusanPembiayaanForm.get('harga_permintaan')?.value,
          skema_keputusan: skemaFull[0],
          skema_master_keputusan: skemaFull[1],
          skema_name_keputusan: skemaFull[2],
          tipe_margin_keputusan: this.keputusanPembiayaanForm.get('tipe_margin')?.value,
          total_pendapatan: totalPendapatanFull,
          updated_by: this.sessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
        })
        .subscribe({
          next: data => {
            //console.warn(data);
            // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
            this.http
              .post<any>(this.baseUrl + 'v1/efos-approval/create_history_persetujuan', {
                id: 1,
                app_no_de: this.app_no_de,
                limit_kewenangan_memutus: this.persetujuanPembiayaanForm.get('limit_kewenangan_memutus')?.value,
                plafon_pembiayaan: this.persetujuanPembiayaanForm.get('plafon_pembiayaan')?.value,
                keputusan: this.persetujuanPembiayaanForm.get('keputusan')?.value,
                alasan_penolakan: this.persetujuanPembiayaanForm.get('alasan_penolakan')?.value,
                keterangan: this.persetujuanPembiayaanForm.get('keterangan')?.value,
                approved_by: this.sessionStorageService.retrieve('sessionUserName'),
                approved_date: '',
              })
              .subscribe({
                next: data => {
                  //console.warn(data);
                  // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                  for (let i = 0; i < this.refPersetujuanKhusus.length; i++) {
                    if ($('#persetujuan_ya' + i).is(':checked')) {
                      this.persetujuanPost = 1;
                    } else if ($('#persetujuan_tidak' + i).is(':checked')) {
                      this.persetujuanPost = 0;
                    } else {
                      this.persetujuanPost = 0;
                    }
                    this.idPost = $('#id' + i).val();
                    let detail_persetujuanPost = $('#detail_persetujuan' + i).val();
                    let ketentuanPost = $('#ketentuan' + i).val();
                    let mitigasi_resikoPost = $('#mitigasi_resiko' + i).val();
                    let usulanPost = $('#usulan' + i).val();

                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-approval/update_persetujuan_khusus', {
                        app_no_de: this.app_no_de,
                        updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                        updated_date: '',
                        detail_persetujuan: detail_persetujuanPost,
                        id: this.idPost,
                        id_jenis_persetujuan: this.idPost,
                        ketentuan: ketentuanPost,
                        mitigasi_resiko: mitigasi_resikoPost,
                        persetujuan: this.persetujuanPost,
                        usulan: usulanPost,
                      })
                      .subscribe({
                        next: data => {
                          //console.warn(data);
                          if (this.idPost[this.refPersetujuanKhusus.length - 1] == this.idPost[i]) {
                            alert('Data Berhasil disimpan');
                            window.location.reload();
                          }
                        },
                        error: err => {
                          //console.error(err);
                        },
                      });
                  }
                  // setTimeout(() => {
                  //   alert('Data Berhasil Disimpan');
                  //   window.location.reload();
                  // }, 300);
                  // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                },
                error: err => {
                  //console.error(err);
                },
              });
            // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
          },
          error: err => {
            //console.error(err);
          },
        });
    }
    // /////////////////////// Create Approval /////////////////////////////
  }

  forward() {
    Swal.fire({
      title: 'Forward ke Analis atau Forward ke Supervisor?',
      text: 'Update Status ke Analis atau Update Status ke Analis ke Supervisor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Forward ke Analis!',
      cancelButtonText: 'Forward ke Supervisor',
    }).then(result => {
      if (result.value) {
        Swal.fire('Data Berhasil diUpdate!', 'Data Sudah di Tim Analis', 'success').then((message: any) => {
          window.location.reload();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Data Berhasil diUpdate', 'Data Sudah di Tim Supervisor', 'success').then((message: any) => {
          window.location.reload();
        });
      }
    });
  }

  reject() {
    // /////////////////////// Create Approval /////////////////////////////
    // contooohhhhh// this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value.replace(/,/g, '').replace('Rp ', '').split('.')[0]
    const skemaFull = this.keputusanPembiayaanForm.get('skema')?.value.split('|');
    const totalPendapatanFull = this.jobByCurefDE.total_pendapatan;
    let angsuranfix = this.komiteFasilitasYangDimintaForm.get('angsuran')?.value.replace('Angsuran = ', '');
    let angsuranNon1 = angsuranfix.replace('Angsuran Tahun Ke 1 = ', '');
    let angsuranNon2 = angsuranNon1.replace('Angsuran Tahun Ke 2 = ', '');
    let angsurannya = angsuranNon2.split('; ');

    let angsuranfix2 = this.keputusanPembiayaanForm.get('angsuran')?.value.replace('Angsuran = ', '');
    let angsuranNon12 = angsuranfix2.replace('Angsuran Tahun Ke 1 = ', '');
    let angsuranNon22 = angsuranNon12.replace('Angsuran Tahun Ke 2 = ', '');
    let angsurannya2 = angsuranNon22.split('; ');
    // /////////////////////// Create Approval /////////////////////////////

    Swal.fire({
      title: 'Apa Anda Ingin Reject Data?',
      text: 'Data akan di Reject dan Tidak Akan Ada Pada Halaman Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Reject!',
      cancelButtonText: 'Tidak, Simpan ini',
    }).then(result => {
      if (result.value) {
        if (this.cekDetailKomite === 0) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-approval/create_approval', {
              app_no_de: this.app_no_de,
              angsuran: angsurannya[0],
              angsuran_keputusan: angsurannya2[0],
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
              created_date: '',
              dp: this.komiteFasilitasYangDimintaForm.get('down_payment')?.value,
              dp_keputusan: this.keputusanPembiayaanForm.get('down_payment')?.value,
              dsr: this.komiteFasilitasYangDimintaForm.get('dsr')?.value,
              id: 0,
              jangka_waktu: this.keputusanPembiayaanForm.get('jangka_waktu')?.value,
              max_pembiayaan: this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value,
              max_pembiayaan_keputusan: this.keputusanPembiayaanForm.get('harga_permintaan')?.value,
              skema_keputusan: skemaFull[0],
              skema_master_keputusan: skemaFull[1],
              skema_name_keputusan: skemaFull[2],
              tipe_margin_keputusan: this.keputusanPembiayaanForm.get('tipe_margin')?.value,
              total_pendapatan: totalPendapatanFull,
            })
            .subscribe({
              next: data => {
                //console.warn(data);
                // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
                this.http
                  .post<any>(this.baseUrl + 'v1/efos-approval/create_history_persetujuan', {
                    id: 1,
                    app_no_de: this.app_no_de,
                    limit_kewenangan_memutus: this.persetujuanPembiayaanForm.get('limit_kewenangan_memutus')?.value,
                    plafon_pembiayaan: this.persetujuanPembiayaanForm.get('plafon_pembiayaan')?.value,
                    keputusan: this.persetujuanPembiayaanForm.get('keputusan')?.value,
                    alasan_penolakan: this.persetujuanPembiayaanForm.get('alasan_penolakan')?.value,
                    keterangan: this.persetujuanPembiayaanForm.get('keterangan')?.value,
                    approved_by: this.sessionStorageService.retrieve('sessionUserName'),
                    approved_date: '',
                  })
                  .subscribe({
                    next: data => {
                      //console.warn(data);
                      // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                      for (let i = 0; i < this.refPersetujuanKhusus.length; i++) {
                        if ($('#persetujuan_ya' + i).is(':checked')) {
                          this.persetujuanPost = 1;
                        } else if ($('#persetujuan_tidak' + i).is(':checked')) {
                          this.persetujuanPost = 0;
                        } else {
                          this.persetujuanPost = 0;
                        }
                        this.idPost = $('#id' + i).val();
                        let detail_persetujuanPost = $('#detail_persetujuan' + i).val();
                        let ketentuanPost = $('#ketentuan' + i).val();
                        let mitigasi_resikoPost = $('#mitigasi_resiko' + i).val();
                        let usulanPost = $('#usulan' + i).val();

                        this.http
                          .post<any>(this.baseUrl + 'v1/efos-approval/update_persetujuan_khusus', {
                            app_no_de: this.app_no_de,
                            updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                            updated_date: '',
                            detail_persetujuan: detail_persetujuanPost,
                            id: this.idPost,
                            id_jenis_persetujuan: this.idPost,
                            ketentuan: ketentuanPost,
                            mitigasi_resiko: mitigasi_resikoPost,
                            persetujuan: this.persetujuanPost,
                            usulan: usulanPost,
                          })
                          .subscribe({
                            next: data => {
                              if (this.idPost[this.refPersetujuanKhusus.length - 1] == this.idPost[i]) {
                                window.location.reload();
                              }
                            },
                            error: err => {
                              //console.error(err);
                            },
                          });
                      }
                      // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                    },
                    error: err => {
                      //console.error(err);
                    },
                  });
                // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
              },
              error: err => {
                //console.error(err);
              },
            });
        } else {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-approval/update_data_approval', {
              app_no_de: this.app_no_de,
              angsuran: angsurannya[0],
              angsuran_keputusan: angsurannya2[0],
              dp: this.komiteFasilitasYangDimintaForm.get('down_payment')?.value,
              dp_keputusan: this.keputusanPembiayaanForm.get('down_payment')?.value,
              dsr: this.komiteFasilitasYangDimintaForm.get('dsr')?.value,
              id: 0,
              jangka_waktu: this.keputusanPembiayaanForm.get('jangka_waktu')?.value,
              max_pembiayaan: this.komiteFasilitasYangDimintaForm.get('harga_permintaan')?.value,
              max_pembiayaan_keputusan: this.keputusanPembiayaanForm.get('harga_permintaan')?.value,
              skema_keputusan: skemaFull[0],
              skema_master_keputusan: skemaFull[1],
              skema_name_keputusan: skemaFull[2],
              tipe_margin_keputusan: this.keputusanPembiayaanForm.get('tipe_margin')?.value,
              total_pendapatan: totalPendapatanFull,
              updated_by: this.sessionStorageService.retrieve('sessionUserName'),
              updated_date: '',
            })
            .subscribe({
              next: data => {
                //console.warn(data);
                // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
                this.http
                  .post<any>(this.baseUrl + 'v1/efos-approval/create_history_persetujuan', {
                    id: 1,
                    app_no_de: this.app_no_de,
                    limit_kewenangan_memutus: this.persetujuanPembiayaanForm.get('limit_kewenangan_memutus')?.value,
                    plafon_pembiayaan: this.persetujuanPembiayaanForm.get('plafon_pembiayaan')?.value,
                    keputusan: this.persetujuanPembiayaanForm.get('keputusan')?.value,
                    alasan_penolakan: this.persetujuanPembiayaanForm.get('alasan_penolakan')?.value,
                    keterangan: this.persetujuanPembiayaanForm.get('keterangan')?.value,
                    approved_by: this.sessionStorageService.retrieve('sessionUserName'),
                    approved_date: '',
                  })
                  .subscribe({
                    next: data => {
                      //console.warn(data);
                      // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                      for (let i = 0; i < this.refPersetujuanKhusus.length; i++) {
                        if ($('#persetujuan_ya' + i).is(':checked')) {
                          this.persetujuanPost = 1;
                        } else if ($('#persetujuan_tidak' + i).is(':checked')) {
                          this.persetujuanPost = 0;
                        } else {
                          this.persetujuanPost = 0;
                        }
                        this.idPost = $('#id' + i).val();
                        let detail_persetujuanPost = $('#detail_persetujuan' + i).val();
                        let ketentuanPost = $('#ketentuan' + i).val();
                        let mitigasi_resikoPost = $('#mitigasi_resiko' + i).val();
                        let usulanPost = $('#usulan' + i).val();

                        this.http
                          .post<any>(this.baseUrl + 'v1/efos-approval/update_persetujuan_khusus', {
                            app_no_de: this.app_no_de,
                            updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                            updated_date: '',
                            detail_persetujuan: detail_persetujuanPost,
                            id: this.idPost,
                            id_jenis_persetujuan: this.idPost,
                            ketentuan: ketentuanPost,
                            mitigasi_resiko: mitigasi_resikoPost,
                            persetujuan: this.persetujuanPost,
                            usulan: usulanPost,
                          })
                          .subscribe({
                            next: data => {
                              //console.warn(data);
                              if (this.idPost[this.refPersetujuanKhusus.length - 1] == this.idPost[i]) {
                                window.location.reload();
                              }
                            },
                            error: err => {
                              //console.error(err);
                            },
                          });
                      }
                      // setTimeout(() => {
                      //   alert('Data Berhasil Disimpan');
                      //   window.location.reload();
                      // }, 300);
                      // ///////////////////////Post Syarat Persetujuan Khusus /////////////////////////////
                    },
                    error: err => {
                      //console.error(err);
                    },
                  });
                // /////////////////////// Persetujuan Pembiayaan /////////////////////////////
              },
              error: err => {
                //console.error(err);
              },
            });
        }
        Swal.fire('Data Berhasil direject!', 'Data Sudah direject', 'success').then((message: any) => {
          window.location.reload();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Data Tidak direject!', 'Data disimpan', 'info').then((message: any) => {
          // window.location.reload();
        });
      }
    });
  }

  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }

  formatCurrency(value: any) {
    value = value.replace(/Rp/, '').replace(/\,/g, '');
    ////console.log('value ', value);
    if (value && !isNaN(value)) {
      let num: number = value;
      // let temp = new Intl.NumberFormat("en-IN").format(num); //inplace of en-IN you can mention your country's code
      // console.log(temp, ' temp ');
      let result = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(Number(num));
      // let result = '₹' + temp;

      this.komiteFasilitasYangDimintaForm.patchValue({ harga_permintaan: result });
    }
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
