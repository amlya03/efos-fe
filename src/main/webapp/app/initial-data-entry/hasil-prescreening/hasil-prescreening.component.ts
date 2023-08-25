/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { inputModel } from '../hasil-prescreening/inputslikModel.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { slik } from '../services/config/slik.model';
import { InitialDataEntryService } from '../services/initial-data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { modelCustomer } from '../services/config/modelCustomer.model';
import { dukcapilModel } from '../services/config/dukcapilModel.model';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { dhnModel } from '../services/config/dhnModel.model';
// import { count } from 'console';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-hasil-prescreening',
  templateUrl: './hasil-prescreening.component.html',
  styleUrls: ['./hasil-prescreening.component.scss'],
})
export class HasilPrescreeningComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  paramId: any;
  hasildhn: any;
  kategori: any;
  datakirimanappide: any;
  dataif: any;
  datadukcapil: dukcapilModel = new dukcapilModel();
  contohdata: any;
  statusnikah: any;
  datadukcapilusername: any;
  datadukcapilpasangan: dukcapilModel = new dukcapilModel();
  dataslik: slik[] = [];
  responseSlikMenikah = 0;
  resultDataSlik: any;
  duplikate: any;
  tampunganradiobuttonnama: any;
  tampunganradiobuttontanggal: any;
  tampunganradiobuttonstatus: any;
  tampunganradiobuttonalamat: any;
  tampunganradiobuttonprovinsi: any;
  tampunganradiobuttonkota: any;
  tampunganradiobuttonkecamatan: any;
  tampunganradiobuttonkelurahan: any;
  tampunganradiobuttonrt: any;
  tampunganradiobuttonrw: any;
  tampunganradiobuttonjenis: any;
  tampunganradiobuttonnamapasangan: any;
  tampunganradiobuttontanggalpasangan: any;
  tampunganradiobuttonstatuspasangan: any;
  tampunganradiobuttonalamatpasangan: any;
  tampunganradiobuttonprovinsipasangan: any;
  tampunganradiobuttonkotapasangan: any;
  tampunganradiobuttonkecamatanpasangan: any;
  tampunganradiobuttonkelurahanpasangan: any;
  tampunganradiobuttonrtpasangan: any;
  tampunganradiobuttonrwpasangan: any;
  tampunganradiobuttonjenispasangan: any;
  personalInfoForm!: FormGroup;
  personalInfoFormpasangan!: FormGroup;
  personalInfoModel: any;
  inputScoring: inputModel[] = [];
  listLajangSlik: slik[] = new Array<slik>();
  listMenikahSlik: slik[] = new Array<slik>();
  dataEntry: modelCustomer = new modelCustomer();
  cekDhnModel: dhnModel = new dhnModel();
  ideResponseById = 0;
  downloadSlik: any;
  simpanDhn = 0;
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;

  // ///// Join Tanggal //////////////
  joinLajangTanggalMulai: any;
  joinLajangJatuhTempoMulai: any;
  joinMenikahTanggalMulai: any;
  joinMenikahJatuhTempoMulai: any;

  // ////////////////////////
  jenisKelaminHps: any;
  jenisKelaminPasHps: any;
  statusMenikahHps: any;
  hideCekSlik = 0;
  tanggalReq: any;

  // //////////////////////// Kondisi SLik ////////////////////////
  responseNasabah: any;
  responsePasangan: any;
  // //////////////////////// Kondisi SLik ////////////////////////

  // //////////////////////// Table Slik ////////////////////////
  totalOutNas: any;
  totalPlaNas: any;
  totalAngNas: any;
  totalPasOut: any;
  totalPasPla: any;
  totalPasAng: any;
  resultPDF: any;
  // //////////////////////// Table Slik ////////////////////////

  // /////////// Dukcapil Verify ///////////////////////////////
  namaLengkapDukcapil: any;
  ifNamaLengkap: any;
  tglLahirDukcapil: any;
  statusPerkawinanDukcapil: any;
  alamatDukcapil: any;
  ifAlamat: any;
  namaPropinsiDukcapil: any;
  namaKabupatenDukcapil: any;
  namaKecamatanDukcapil: any;
  namaKelurahanDukcapil: any;
  noRTDukcapil: any;
  noRWDukcapil: any;
  jenisKelaminDukcapil: any;

  PasangaNnamaLengkapDukcapil: any;
  ifPasangaNnamaLengkap: any;
  PasangaNtglLahirDukcapil: any;
  PasangaNstatusPerkawinanDukcapil: any;
  PasangaNalamatDukcapil: any;
  ifPasanganAlamat: any;
  PasangaNnamaPropinsiDukcapil: any;
  PasangaNnamaKabupatenDukcapil: any;
  PasangaNnamaKecamatanDukcapil: any;
  PasangaNnamaKelurahanDukcapil: any;
  PasangaNnoRTDukcapil: any;
  PasangaNnoRWDukcapil: any;
  PasangaNjenisKelaminDukcapil: any;
  dukcapilModel: dukcapilModel = new dukcapilModel();
  // /////////// Dukcapil Verify ///////////////////////////////

  // /////// cek dhn ////////////
  tableGetDhn: any;
  // /////// cek dhn ////////////

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtTrigger = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected dataRumah: ServiceVerificationService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected initialDataEntry: InitialDataEntryService,
    private sessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.paramId = params.id;
    });
    this.route.queryParams.subscribe(params => {
      this.kategori = params.kategori;
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappide = params.datakirimanappide;
    });
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.sessionStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.sessionStorageService.retrieve('sessionKdCabang');
  }

  ngOnInit(): void {
    this.getLoading(false);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.personalInfoForm = this.formBuilder.group({
      radiobuttonnama: [{ value: '' || null }, Validators.required],
      radiobuttontanggal: [{ value: '' || null }, Validators.required],
      radiobuttonstatus: [{ value: '' || null }, Validators.required],
      radiobuttonalamat: [{ value: '' || null }, Validators.required],
      radiobuttonprovinsi: [{ value: '' || null }, Validators.required],
      radiobuttonkota: [{ value: '' || null }, Validators.required],
      radiobuttonkecamatan: [{ value: '' || null }, Validators.required],
      radiobuttonkelurahan: [{ value: '' || null }, Validators.required],
      radiobuttonrt: [{ value: '' || null }, Validators.required],
      radiobuttonrw: [{ value: '' || null }, Validators.required],
      radiobuttonjenis: [{ value: '' || null }, Validators.required],
    });

    this.personalInfoFormpasangan = this.formBuilder.group({
      radiobuttonnamapasangan: [{ value: '' || null }, Validators.required],
      radiobuttontanggalpasangan: [{ value: '' || null }, Validators.required],
      radiobuttonstatuspasangan: [{ value: '' || null }, Validators.required],
      radiobuttonalamatpasangan: [{ value: '' || null }, Validators.required],
      radiobuttonprovinsipasangan: [{ value: '' || null }, Validators.required],
      radiobuttonkotapasangan: [{ value: '' || null }, Validators.required],
      radiobuttonkecamatanpasangan: [{ value: '' || null }, Validators.required],
      radiobuttonkelurahanpasangan: [{ value: '' || null }, Validators.required],
      radiobuttonrtpasangan: [{ value: '' || null }, Validators.required],
      radiobuttonrwpasangan: [{ value: '' || null }, Validators.required],
      radiobuttonjenispasangan: [{ value: '' || null }, Validators.required],
    });

    if (this.paramId) {
      this.load();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tidak Bisa Langsung Membuka Hasil Prescreening',
        text: 'Initial Data Entry Belum disimpan dan di Prosess',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/daftaraplikasiide']);
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  load(): void {
    this.initialDataEntry.getCustomer(this.paramId).subscribe({
      next: data => {
        this.dataEntry = data.result.customer;
        this.cekDhnModel.no_id = this.dataEntry.app_no_ide;
        this.cekDhnModel.tanggal_lahir = this.dataEntry.tanggal_lahir;

        this.initialDataEntry.getDuplicateCheck(this.dataEntry.no_ktp, this.dataEntry.nama).subscribe({
          next: duplikat => {
            this.duplikate = duplikat.result;
          },
        });

        setTimeout(() => {
          this.initialDataEntry.getDownloadSlik(this.dataEntry.app_no_ide).subscribe(download => {
            this.downloadSlik = download.result;
            if (download.result == '') {
              this.resultPDF = 0;
            } else {
              this.resultPDF = 1;
            }
            // this.dtTrigger.next(data.result);
            $('#downloadSlikOJK').DataTable().rows.add(download.result).draw();
          });
        }, 10);

        setTimeout(() => {
          this.cekDataDhn();
        }, 20);

        setTimeout(() => {
          this.cekdukcapil();
        }, 30);
      },
    });
    // alert(this.paramId)
    this.initialDataEntry.getIdeById(this.paramId).subscribe({
      next: data => {
        if (data.result.status_aplikasi.includes(9)) {
          this.ideResponseById = 1;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal, ' + data.result.status_aplikasi_desc,
            showConfirmButton: false,
            // timer: 1500
          });
        } else {
          this.ideResponseById = 0;
        }
      },
    });
  }

  untukSlik(): void {
    this.getLoading(true);
    setTimeout(() => {
      this.ngOnDestroy();
      $('#example').DataTable({
        destroy: true,
      });
      $('#slikMenikah').DataTable({
        destroy: true,
      });
      $('#downloadSlikOJK').DataTable({
        destroy: true,
      });
    }, 5);
    setTimeout(() => {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-ide/slik_inquiry', {
          noAplikasi: this.dataEntry.app_no_ide,
        })
        .subscribe({
          next: inquiry => {
            if (inquiry.code === '200') {
              setTimeout(() => {
                this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
                  next: data => {
                    setTimeout(() => {
                      if (data.code == 200) {
                        this.initialDataEntry.getDownloadSlik(this.dataEntry.app_no_ide).subscribe(download => {
                          this.downloadSlik = download.result;
                          if (download.result == '') {
                            this.resultPDF = 0;
                          } else {
                            this.resultPDF = 1;
                          }
                          $('#downloadSlikOJK').DataTable().rows.add(download.result).draw();
                        });
                      }
                    }, 2);
                    setTimeout(() => {
                      if (data.result.dataSlikResult === '') {
                        this.getLoading(false);
                        this.hideCekSlik = 0;
                      } else {
                        this.hideCekSlik = 1;
                        this.getLoading(false);
                      }
                    }, 5);
                    this.dataslik = data.result.dataSlikResult;
                    setTimeout(() => {
                      this.dataslik.forEach((response, index) => {
                        if (response.status_applicant === 'Debitur Utama') {
                          this.listLajangSlik.push(response);
                          if (this.listLajangSlik[0].idNumber === 'undefined') {
                            this.responseNasabah = this.listLajangSlik[0].response_description;
                          } else {
                            this.responseNasabah = 'checking slik on process';
                          }
                        } else {
                          this.listMenikahSlik.push(response);
                          if (this.listMenikahSlik[0].idNumber === 'undefined') {
                            this.responsePasangan = this.listMenikahSlik[0].response_description;
                          } else {
                            this.responsePasangan = 'checking slik on process';
                          }
                        }
                        setTimeout(() => {
                          if (index == data.result.dataSlikResult.length - 1) {
                            window.location.reload();
                            this.dtTrigger.next(this.responseNasabah);
                          }
                        }, index * 10);
                      });
                      window.location.reload();
                    }, 300);
                  },
                });
              }, inquiry.code * 30);
            } else {
              alert(inquiry.message);
            }
          },
        });
    }, 10);
  }

  cekdukcapil(): void {
    const pipe = new DatePipe('en-US');
    const timestamp2 = pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const menit = String(today.getMinutes()).padStart(2, '0');
    const secon = today.getSeconds();
    const milisecon = today.getMilliseconds();
    const reffnumbernya = yyyy + mm + dd + hour + menit + secon + milisecon;

    if (this.dataEntry.jenis_kelamin === 'Laki-laki') {
      this.jenisKelaminHps = 'M';
    } else {
      this.jenisKelaminHps = 'F';
    }

    if (this.dataEntry.jenis_kelamin_pasangan === 'Laki-laki') {
      this.jenisKelaminPasHps = 'M';
    } else {
      this.jenisKelaminPasHps = 'F';
    }

    if (this.dataEntry.status_perkawinan === 'KAWIN') {
      this.statusMenikahHps = '1';
    } else {
      this.statusMenikahHps = '0';
    }

    // get Data Dukcapil
    if (this.dataEntry.status_perkawinan === 'KAWIN') {
      if (this.dataEntry.fasilitas_name === 'PTA') {
        this.initialDataEntry.getDataDukcapil(this.dataEntry.no_ktp).subscribe({
          next: dukcapilResponse => {
            this.dukcapilModel = dukcapilResponse.result;
  
            setTimeout(() => {
              this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
                next: getDataSLik => {
                  if (getDataSLik.result == '') {
                    this.getLoading(false);
                  }
                  this.listLajangSlik = getDataSLik.result.dataSlikResult;
  
                  if (getDataSLik.result.dataSlikResult == '') {
                    this.hideCekSlik = 0;
                  } else {
                    this.hideCekSlik = 1;
                  }
  
                  setTimeout(() => {
                    this.totalOutNas = getDataSLik.result.total_outstanding_nasabah;
                    this.totalPlaNas = getDataSLik.result.total_plafon_nasabah;
                    this.totalAngNas = getDataSLik.result.total_angsuran_nasabah;
                    this.totalPasOut = getDataSLik.result.total_outstanding_pasangan;
                    this.totalPasPla = getDataSLik.result.total_plafon_pasangan;
                    this.totalPasAng = getDataSLik.result.total_angsuran_pasangan;
                  }, 20);
  
                  setTimeout(() => {
                    if (getDataSLik.result.dataSlikResult == '') {
                      this.http
                        .post<any>(this.baseUrl + 'v1/efos-ide/slik_verify', {
                          channelID: 'EFOS',
                          createdBy: this.sessionStorageService.retrieve('sessionUserName'),
                          idUserCabang: this.sessionStorageService.retrieve('sessionUserName'),
                          jenisKelamin: this.jenisKelaminHps,
                          jenisKelaminPasangan: this.jenisKelaminPasHps,
                          jenisProduct: this.dataEntry.fasilitas_name,
                          kodeCabang: this.sessionStorageService.retrieve('sessionKdCabang'),
                          namaNasabah: this.dataEntry.nama,
                          namaPasangan: this.dataEntry.nama_pasangan,
                          noAplikasi: this.dataEntry.app_no_ide,
                          noKtp: this.dataEntry.no_ktp,
                          noKtpPasangan: this.dataEntry.no_ktp_pasangan,
                          npwp: this.dataEntry.npwp,
                          reffNumber: reffnumbernya,
                          statusMenikah: this.statusMenikahHps,
                          tempatLahir: this.dataEntry.tempat_lahir,
                          tempatLahirPasangan: this.dataEntry.tempat_lahir_pasangan,
                          tglLahir: this.dataEntry.tanggal_lahir,
                          tglLahirPasangan: this.dataEntry.tanggal_lahir_pasangan,
                          timestamp: timestamp2,
                          tujuanSlikChecking: '1',
                        })
                        .subscribe({
                          next: dataSlikVerify => {
                            $('#example').DataTable({
                              destroy: true,
                            });
                            this.dtTrigger.unsubscribe();
                            if (dataSlikVerify.code == 200) {
                              this.responseNasabah = this.listLajangSlik[0].response_description;
                              let tanggalMulaiLajang: any;
                              let tanggalJatuhTempoLajang: any;
                              this.listLajangSlik.forEach(lajangSLikResponse => {
                                // ///////////////////// Mulai ////////////////////////////
                                tanggalMulaiLajang = lajangSLikResponse.tanggal_mulai;
                                const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                                const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                                const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                                this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                                // ///////////////////// Mulai ////////////////////////////
  
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                                tanggalJatuhTempoLajang = lajangSLikResponse.tanggal_jatuh_tempo;
                                const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                                const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                                const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                                this.joinLajangJatuhTempoMulai =
                                  resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                              });
                              this.dtTrigger.next(this.listLajangSlik);
                              this.getLoading(false);
                            } else {
                              this.responseNasabah = this.listLajangSlik[0].response_description;
                              let tanggalMulaiLajang: any;
                              let tanggalJatuhTempoLajang: any;
                              this.listLajangSlik.forEach(slikLajangResonse => {
                                // ///////////////////// Mulai ////////////////////////////
                                tanggalMulaiLajang = slikLajangResonse.tanggal_mulai;
                                const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                                const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                                const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                                this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                                // ///////////////////// Mulai ////////////////////////////
  
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                                tanggalJatuhTempoLajang = slikLajangResonse.tanggal_jatuh_tempo;
                                const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                                const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                                const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                                this.joinLajangJatuhTempoMulai =
                                  resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                              });
                              this.dtTrigger.next(this.listLajangSlik);
                              this.getLoading(false);
                            }
                          },
                          error: () => {
                            this.getLoading(false);
                          },
                        });
                    } else {
                      let tanggalMulaiLajang: any;
                      let tanggalJatuhTempoLajang: any;
                      this.responseNasabah = this.listLajangSlik[0].response_description;
                      this.listLajangSlik.forEach(slikLajang => {
                        // ///////////////////// Mulai ////////////////////////////
                        tanggalMulaiLajang = slikLajang.tanggal_mulai;
                        const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                        const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                        const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                        this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                        // ///////////////////// Mulai ////////////////////////////
  
                        // ///////////////////// Jatuh Tempo ////////////////////////////
                        tanggalJatuhTempoLajang = slikLajang.tanggal_jatuh_tempo;
                        const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                        const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                        const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                        this.joinLajangJatuhTempoMulai = resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                        // ///////////////////// Jatuh Tempo ////////////////////////////
                      });
                      this.dtTrigger.next(this.listLajangSlik);
                    }
                  }, 30);
                },
                error: () => {
                  this.getLoading(false);
                },
              });
            }, 50);
          },
          error(errorDukcapilResponse) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: errorDukcapilResponse.error.message,
            });
          },
        });
      } else {
        this.initialDataEntry.getDataDukcapil(this.dataEntry.no_ktp).subscribe({
          next: dukcapilResponse => {
            this.dukcapilModel = dukcapilResponse.result;
  
            this.initialDataEntry.getDataDukcapil(this.dataEntry.no_ktp_pasangan).subscribe({
              next: dukcapilResponseMenikah => {
                this.datadukcapilpasangan = dukcapilResponseMenikah.result;
  
                setTimeout(() => {
                  this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
                    next: getdataSLikMenikah => {
                      this.resultDataSlik = getdataSLikMenikah.result.dataSlikResult;
                      // /////////////////////// Logic SLIK ////////////////////////
                      if (getdataSLikMenikah.result == '') {
                        this.getLoading(false);
                      }
  
                      if (getdataSLikMenikah.result.dataSlikResult == '') {
                        this.hideCekSlik = 0;
                      } else {
                        this.hideCekSlik = 1;
                      }
                      // /////////////////////// Logic SLIK ////////////////////////
  
                      setTimeout(() => {
                        this.totalOutNas = getdataSLikMenikah.result.total_outstanding_nasabah;
                        this.totalPlaNas = getdataSLikMenikah.result.total_plafon_nasabah;
                        this.totalAngNas = getdataSLikMenikah.result.total_angsuran_nasabah;
                        this.totalPasOut = getdataSLikMenikah.result.total_outstanding_pasangan;
                        this.totalPasPla = getdataSLikMenikah.result.total_plafon_pasangan;
                        this.totalPasAng = getdataSLikMenikah.result.total_angsuran_pasangan;
                      }, 10);
  
                      setTimeout(() => {
                        if (this.resultDataSlik == '') {
                          this.http
                            .post<any>(this.baseUrl + 'v1/efos-ide/slik_verify', {
                              channelID: 'EFOS',
                              createdBy: this.sessionStorageService.retrieve('sessionUserName'),
                              idUserCabang: this.sessionStorageService.retrieve('sessionUserName'),
                              jenisKelamin: this.jenisKelaminHps,
                              jenisKelaminPasangan: this.jenisKelaminPasHps,
                              jenisProduct: this.dataEntry.fasilitas_name,
                              kodeCabang: this.sessionStorageService.retrieve('sessionKdCabang'),
                              namaNasabah: this.dataEntry.nama,
                              namaPasangan: this.dataEntry.nama_pasangan,
                              noAplikasi: this.dataEntry.app_no_ide,
                              noKtp: this.dataEntry.no_ktp,
                              noKtpPasangan: this.dataEntry.no_ktp_pasangan,
                              npwp: this.dataEntry.npwp,
                              reffNumber: reffnumbernya,
                              statusMenikah: this.statusMenikahHps,
                              tempatLahir: this.dataEntry.tempat_lahir,
                              tempatLahirPasangan: this.dataEntry.tempat_lahir_pasangan,
                              tglLahir: this.dataEntry.tanggal_lahir,
                              tglLahirPasangan: this.dataEntry.tanggal_lahir_pasangan,
                              timestamp: timestamp2,
                              tujuanSlikChecking: '1',
                            })
                            .subscribe({
                              next: menikahSlikResponse => {
                                setTimeout(() => {
                                  if (menikahSlikResponse.code == 200) {
                                    let responseResultSukses: any;
                                    const responseSlikMenikah = menikahSlikResponse.result.responseDesc;
                                    if (responseSlikMenikah === 'request slik checking success') {
                                      this.responseSlikMenikah = 1;
                                      responseResultSukses = '';
                                    } else {
                                      responseResultSukses = menikahSlikResponse.result.dataSlikResult;
                                      this.responseSlikMenikah = 0;
                                    }
                                    this.dataslik = menikahSlikResponse.result.responseObject;
                                    this.dataslik.forEach(element => {
                                      if (
                                        element.statusApplicant === 'Debitur Utama' ||
                                        element.statusApplicant == '' ||
                                        element.statusApplicant == null
                                      ) {
                                        this.listLajangSlik.push(element);
                                        if (this.listLajangSlik[0].idNumber === 'undefined') {
                                          this.responseNasabah = responseResultSukses[0].response_description;
                                        } else {
                                          this.responseNasabah = 'checking slik on process';
                                        }
                                      } else {
                                        this.listMenikahSlik.push(element);
                                        if (this.listMenikahSlik[0].idNumber === 'undefined') {
                                          this.responsePasangan = this.listMenikahSlik[0].response_description;
                                        } else {
                                          this.responsePasangan = 'checking slik on process';
                                        }
                                      }
                                      this.getLoading(false);
                                    });
                                    this.dtTrigger.next(responseSlikMenikah);
                                  } else {
                                    this.dtTrigger.next(this.resultDataSlik);
                                    this.getLoading(false);
                                    alert(menikahSlikResponse.message);
                                  }
                                }, 50);
                              },
                              error: () => {
                                this.getLoading(false);
                              },
                            });
                        } else {
                          this.dataslik = getdataSLikMenikah.result.dataSlikResult;
                          setTimeout(() => {
                            let responseFailedLaj: any;
                            let responseFailedMen: any;
                            this.dataslik.forEach(response => {
                              if (
                                response.status_applicant === 'Debitur Utama' ||
                                response.status_applicant == '' ||
                                response.status_applicant == null
                              ) {
                                // alert(this.dataslik[0].status_applicant)
                                this.listLajangSlik.push(response);
                                // if (this.listLajangSlik[0].idNumber === 'undefined') {
                                responseFailedLaj = this.listLajangSlik[0].response_description;
                                if (responseFailedLaj.includes('get SLIK Result Failed')) {
                                  this.responseNasabah = 'SLIK Result Failed';
                                } else {
                                  this.responseNasabah = this.listLajangSlik[0].response_description;
                                }
                                //   console.warn(this.responseNasabah)
                                // } else {
                                //   this.responseNasabah = 'checking slik on process';
                                // }
                              } else {
                                this.listMenikahSlik.push(response);
                                // if (this.listMenikahSlik[0].idNumber === 'undefined') {
                                responseFailedMen = this.listMenikahSlik[0].response_description;
                                if (responseFailedMen.includes('get SLIK Result Failed')) {
                                  this.responsePasangan = 'SLIK Result Failed';
                                } else {
                                  this.responsePasangan = this.listMenikahSlik[0].response_description;
                                }
                                // } else {
                                //   this.responsePasangan = 'checking slik on process';
                                // }
                              }
                            });
                            setTimeout(() => {
                              let tanggalJatuhTempoLajang: any;
                              let tanggalMulaiLajang: any;
                              this.listLajangSlik.forEach(sLikMenikahRssponse => {
                                // ///////////////////// Mulai ////////////////////////////
                                tanggalMulaiLajang = sLikMenikahRssponse.tanggal_mulai;
                                const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                                const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                                const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                                this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                                // ///////////////////// Mulai ////////////////////////////
  
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                                tanggalJatuhTempoLajang = sLikMenikahRssponse.tanggal_jatuh_tempo;
                                const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                                const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                                const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                                this.joinLajangJatuhTempoMulai =
                                  resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                              });
  
                              let tanggalMulaiMenikah: any;
                              let tanggalJatuhTempoMenikah: any;
                              this.listMenikahSlik.forEach(slikMenikah => {
                                // ///////////////////// Mulai ////////////////////////////
                                tanggalMulaiMenikah = slikMenikah.tanggal_mulai;
                                const resultMenikahMulaiTahun = tanggalMulaiMenikah.slice(0, 4);
                                const resultMenikahMulaiBulan = tanggalMulaiMenikah.slice(4, 6);
                                const resultMenikahMulaiTanggal = tanggalMulaiMenikah.slice(6);
                                this.joinMenikahTanggalMulai =
                                  resultMenikahMulaiTahun + '/' + resultMenikahMulaiBulan + '/' + resultMenikahMulaiTanggal;
                                // ///////////////////// Mulai ////////////////////////////
  
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                                tanggalJatuhTempoMenikah = slikMenikah.tanggal_jatuh_tempo;
                                const resultMenikahJatuhTempoTahun = tanggalJatuhTempoMenikah.slice(0, 4);
                                const resultMenikahJatuhTempoBulan = tanggalJatuhTempoMenikah.slice(4, 6);
                                const resultMenikahJatuhTempoTanggal = tanggalJatuhTempoMenikah.slice(6);
                                this.joinMenikahJatuhTempoMulai =
                                  resultMenikahJatuhTempoTahun + '/' + resultMenikahJatuhTempoBulan + '/' + resultMenikahJatuhTempoTanggal;
                                // ///////////////////// Jatuh Tempo ////////////////////////////
                              });
                            }, this.dataslik.length * 1);
                            this.dtTrigger.next(this.dataslik);
                            this.getLoading(false);
                          }, 50);
                        }
                      }, 30);
                    },
                    error: () => {
                      this.getLoading(false);
                    },
                  });
                }, 50);
              },
              error(errordukcapilResponseMenikah) {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: errordukcapilResponseMenikah.error.message,
                });
              },
            });
          },
          error(errorDukcapilResponse) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: errorDukcapilResponse.error.message,
            });
          },
        });
      }
    } else {
      this.initialDataEntry.getDataDukcapil(this.dataEntry.no_ktp).subscribe({
        next: dukcapilResponse => {
          this.dukcapilModel = dukcapilResponse.result;

          setTimeout(() => {
            this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
              next: getDataSLik => {
                if (getDataSLik.result == '') {
                  this.getLoading(false);
                }
                this.listLajangSlik = getDataSLik.result.dataSlikResult;

                if (getDataSLik.result.dataSlikResult == '') {
                  this.hideCekSlik = 0;
                } else {
                  this.hideCekSlik = 1;
                }

                setTimeout(() => {
                  this.totalOutNas = getDataSLik.result.total_outstanding_nasabah;
                  this.totalPlaNas = getDataSLik.result.total_plafon_nasabah;
                  this.totalAngNas = getDataSLik.result.total_angsuran_nasabah;
                  this.totalPasOut = getDataSLik.result.total_outstanding_pasangan;
                  this.totalPasPla = getDataSLik.result.total_plafon_pasangan;
                  this.totalPasAng = getDataSLik.result.total_angsuran_pasangan;
                }, 20);

                setTimeout(() => {
                  if (getDataSLik.result.dataSlikResult == '') {
                    this.http
                      .post<any>(this.baseUrl + 'v1/efos-ide/slik_verify', {
                        channelID: 'EFOS',
                        createdBy: this.sessionStorageService.retrieve('sessionUserName'),
                        idUserCabang: this.sessionStorageService.retrieve('sessionUserName'),
                        jenisKelamin: this.jenisKelaminHps,
                        jenisKelaminPasangan: this.jenisKelaminPasHps,
                        jenisProduct: this.dataEntry.fasilitas_name,
                        kodeCabang: this.sessionStorageService.retrieve('sessionKdCabang'),
                        namaNasabah: this.dataEntry.nama,
                        namaPasangan: this.dataEntry.nama_pasangan,
                        noAplikasi: this.dataEntry.app_no_ide,
                        noKtp: this.dataEntry.no_ktp,
                        noKtpPasangan: this.dataEntry.no_ktp_pasangan,
                        npwp: this.dataEntry.npwp,
                        reffNumber: reffnumbernya,
                        statusMenikah: this.statusMenikahHps,
                        tempatLahir: this.dataEntry.tempat_lahir,
                        tempatLahirPasangan: this.dataEntry.tempat_lahir_pasangan,
                        tglLahir: this.dataEntry.tanggal_lahir,
                        tglLahirPasangan: this.dataEntry.tanggal_lahir_pasangan,
                        timestamp: timestamp2,
                        tujuanSlikChecking: '1',
                      })
                      .subscribe({
                        next: dataSlikVerify => {
                          $('#example').DataTable({
                            destroy: true,
                          });
                          this.dtTrigger.unsubscribe();
                          if (dataSlikVerify.code == 200) {
                            this.responseNasabah = this.listLajangSlik[0].response_description;
                            let tanggalMulaiLajang: any;
                            let tanggalJatuhTempoLajang: any;
                            this.listLajangSlik.forEach(lajangSLikResponse => {
                              // ///////////////////// Mulai ////////////////////////////
                              tanggalMulaiLajang = lajangSLikResponse.tanggal_mulai;
                              const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                              const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                              const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                              this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                              // ///////////////////// Mulai ////////////////////////////

                              // ///////////////////// Jatuh Tempo ////////////////////////////
                              tanggalJatuhTempoLajang = lajangSLikResponse.tanggal_jatuh_tempo;
                              const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                              const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                              const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                              this.joinLajangJatuhTempoMulai =
                                resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                              // ///////////////////// Jatuh Tempo ////////////////////////////
                            });
                            this.dtTrigger.next(this.listLajangSlik);
                            this.getLoading(false);
                          } else {
                            this.responseNasabah = this.listLajangSlik[0].response_description;
                            let tanggalMulaiLajang: any;
                            let tanggalJatuhTempoLajang: any;
                            this.listLajangSlik.forEach(slikLajangResonse => {
                              // ///////////////////// Mulai ////////////////////////////
                              tanggalMulaiLajang = slikLajangResonse.tanggal_mulai;
                              const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                              const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                              const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                              this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                              // ///////////////////// Mulai ////////////////////////////

                              // ///////////////////// Jatuh Tempo ////////////////////////////
                              tanggalJatuhTempoLajang = slikLajangResonse.tanggal_jatuh_tempo;
                              const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                              const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                              const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                              this.joinLajangJatuhTempoMulai =
                                resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                              // ///////////////////// Jatuh Tempo ////////////////////////////
                            });
                            this.dtTrigger.next(this.listLajangSlik);
                            this.getLoading(false);
                          }
                        },
                        error: () => {
                          this.getLoading(false);
                        },
                      });
                  } else {
                    let tanggalMulaiLajang: any;
                    let tanggalJatuhTempoLajang: any;
                    this.responseNasabah = this.listLajangSlik[0].response_description;
                    this.listLajangSlik.forEach(slikLajang => {
                      // ///////////////////// Mulai ////////////////////////////
                      tanggalMulaiLajang = slikLajang.tanggal_mulai;
                      const resultMulaiTahun = tanggalMulaiLajang.slice(0, 4);
                      const resultMulaiBulan = tanggalMulaiLajang.slice(4, 6);
                      const resultMulaiTanggal = tanggalMulaiLajang.slice(6);
                      this.joinLajangTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;
                      // ///////////////////// Mulai ////////////////////////////

                      // ///////////////////// Jatuh Tempo ////////////////////////////
                      tanggalJatuhTempoLajang = slikLajang.tanggal_jatuh_tempo;
                      const resultJatuhTempoTahun = tanggalJatuhTempoLajang.slice(0, 4);
                      const resultJatuhTempoBulan = tanggalJatuhTempoLajang.slice(4, 6);
                      const resultJatuhTempoTanggal = tanggalJatuhTempoLajang.slice(6);
                      this.joinLajangJatuhTempoMulai = resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                      // ///////////////////// Jatuh Tempo ////////////////////////////
                    });
                    this.dtTrigger.next(this.listLajangSlik);
                  }
                }, 30);
              },
              error: () => {
                this.getLoading(false);
              },
            });
          }, 50);
        },
        error(errorDukcapilResponse) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: errorDukcapilResponse.error.message,
          });
        },
      });
    }
  }

  gotopersonalinfo(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_app_de', {
        analis_verifikasi: '',
        app_no_de: '',
        app_no_ide: this.dataEntry.app_no_ide,
        cabang: this.untukSessionKodeCabang,
        created_by: this.sessionStorageService.retrieve('sessionUserName'),
        created_date: '',
        curef: this.dataEntry.curef,
        flag_tab: '',
        id: 0,
        status_aplikasi: '',
      })
      .subscribe({
        next: data => {
          this.contohdata = data.result.app_no_de;
          this.router
            .navigate(['/data-entry/personalinfo'], {
              queryParams: { curef: this.dataEntry.curef, app_no_de: this.contohdata },
            })
            .then(() => {
              window.location.reload();
            });
        },
        error: () => {
          this.router.navigate(['/data-entry']);
          // alert(err.error.message);
        },
      });

    // this.router.navigate(['/daftaraplikasiide'], {
    //     queryParams: {id: this.paramId},
    // });
  }

  cekDataDhn(): void {
    this.initialDataEntry.postCekDhn(this.cekDhnModel).subscribe({
      next: dhn => {
        this.hasildhn = dhn.result.token;
        this.initialDataEntry.getDataDhn(this.dataEntry.app_no_ide).subscribe({
          next: getdhn => {
            this.tableGetDhn = getdhn.result;
            if (getdhn.result != '') {
              this.simpanDhn = 1;
            } else {
              this.simpanDhn = 0;
            }
          },
        });
      },
    });
  }

  backtoide(): void {
    this.router.navigate(['/daftaraplikasiide']);
  }

  joinRoom(jenis: any): void {
    window.open(this.baseUrl + 'v1/efos-ide/downloadSlik/' + jenis);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  refreshDatatables(data: any): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        responsive: true,
      };
      this.dtTrigger.next(data);
      this.getLoading(false);
    });
  }
}
