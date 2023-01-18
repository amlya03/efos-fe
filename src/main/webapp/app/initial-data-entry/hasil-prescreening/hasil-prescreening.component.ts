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
  downloadSlik: any;
  simpanDhn = 0;
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;

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
  // /////////// Dukcapil Verify ///////////////////////////////

  // /////// cek dhn ////////////
  tableGetDhn: any;
  // /////// cek dhn ////////////

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected dataRumah: ServiceVerificationService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected initialDataEntry: InitialDataEntryService,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.paramId = params.id;
    });
    this.route.queryParams.subscribe(params => {
      this.kategori = params.kategori;
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappide = params['datakirimanappide'];
    });
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.SessionStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.SessionStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.SessionStorageService.retrieve('sessionKdCabang');
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
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
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  load() {
    // //////////// ReffNumber //////////////////////////
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hour = today.getHours();
    // today.getMinutes() <10?'0':'';
    let menit = String(today.getMinutes()).padStart(2, '0');
    let secon = today.getSeconds();
    let milisecon = today.getMilliseconds();
    const reffnumbernya = yyyy + mm + dd + hour + menit + secon + milisecon;
    // //////////// time stamp //////////////////////////
    var pipe = new DatePipe('en-US');
    const timestamp = pipe.transform(Date.now(), 'yyyy-mm-dd HH:mm:ss');

    this.initialDataEntry.getCustomer(this.paramId).subscribe({
      next: data => {
        this.dataEntry = data.result.customer;
        // console.warn(data)
        // setTimeout(() => {
        //   this.cekdukcapil(this.dataEntry.tanggal_lahir, this.dataEntry.tanggal_lahir_pasangan);
        // }, 300);
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
        }, 300);

        setTimeout(() => {
          this.postUpdateStatus();
        }, 600);

        setTimeout(() => {
          this.cekdukcapil();
        }, 800);
      },
    });
  }
  untukSlik() {
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
                          this.dtTrigger.next(this.dataslik);
                        }
                      }, index * 1);
                    });
                  }, 10);
                },
              });
            } else {
              alert(inquiry.message);
            }
          },
        });
    }, 10);
  }

  cekdukcapil() {
    // alert(tglLahir)
    // let dateTime = new Date()
    let dateTime = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    var str1 = new Date();
    var str = new Date().setSeconds(0, 0);
    var dt = new Date(str1).toISOString();

    var str2 = new Date();
    var dt2 = new Date(str2).toISOString().replace(/-/g, '');
    var stringhapustitik = dt2.replace(/T/g, '');
    var stringhilangz = stringhapustitik.replace(/Z/g, '');
    var stringhilangtitik = stringhilangz.replace(/'.'/g, '');
    var finalhasil = stringhilangtitik.replace(/:/g, '');
    var finalhasil2 = stringhilangtitik.replace(/./g, '');
    var d = new Date();
    var Datenih = new Date();
    var pipe = new DatePipe('en-US');
    var datee = this.dataEntry.tanggal_lahir;
    var dateepasangan = this.dataEntry.tanggal_lahir_pasangan;

    const str4 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    var timestamp = pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    var tgllahirkirim = pipe.transform(datee, 'dd-MM-yyyy');
    var tgllahirkirimpasangan = pipe.transform(dateepasangan, 'dd-MM-yyyy');
    var hasilmiripdongbanyak = pipe.transform(datee, 'yyyy:MM:dd ');
    var hasilmiripdong = pipe.transform(Date.now(), 'yyyy:mm:ddHH:mm:ss');
    //  var hasilmiripdong1 = hasilmiripdong?.replace(/|/g,'');
    var hasilmiripdongfinal = hasilmiripdong?.replace(/:/g, '');
    // yyyy/mm/dd HH:mm:ss

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    // today.getMinutes() <10?'0':'';
    var menit = String(today.getMinutes()).padStart(2, '0');
    var secon = today.getSeconds();
    var milisecon = today.getMilliseconds();
    var reffnumbernya = yyyy + mm + dd + hour + menit + secon + milisecon;

    if (this.dataEntry.status_perkawinan === 'Menikah') {
      this.statusnikah = 'KAWIN';
    } else if (this.dataEntry.status_perkawinan === 'Lajang') {
      this.statusnikah = 'BELUM KAWIN';
    } else if (this.dataEntry.status_perkawinan === 'Cerai Hidup') {
      this.statusnikah = 'CERAI HIDUP';
    } else if (this.dataEntry.status_perkawinan === 'Cerai Mati') {
      this.statusnikah = 'CERAI MATI';
    }

    // setTimeout(() => {
    if (this.dataEntry.jenis_kelamin === 'Laki-laki') {
      this.jenisKelaminHps = 'M';
    } else {
      this.jenisKelaminHps = 'F';
    }
    // }, 10);
    // setTimeout(() => {
    if (this.dataEntry.jenis_kelamin_pasangan === 'Laki-laki') {
      this.jenisKelaminPasHps = 'M';
    } else {
      this.jenisKelaminPasHps = 'F';
    }
    // }, 20);
    // setTimeout(() => {
    if (this.dataEntry.status_perkawinan === 'Lajang') {
      this.statusMenikahHps = '0';
    } else {
      this.statusMenikahHps = '1';
    }
    // }, 30);

    if (this.dataEntry.status_perkawinan === 'Menikah') {
      setTimeout(() => {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-ide/dukcapil_verify', {
            no_id: this.dataEntry.app_no_ide,
            tanggal_lahir: this.dataEntry.tanggal_lahir,
            reffNumber: reffnumbernya,
            timestamp: timestamp,
            channelID: 'EFOS',
            NIK: this.dataEntry.no_ktp,
            noKK: '',
            namaLengkap: this.dataEntry.nama,
            jenisKelamin: this.dataEntry.jenis_kelamin,
            tempatLahir: this.dataEntry.tempat_lahir,
            tglLahir: tgllahirkirim,
            createdBy: this.untukSessionUserName,
            appNoIde: this.dataEntry.app_no_ide,
            pendidikan: this.dataEntry.pendidikan,
            pekerjaan: '',
            statusPerkawinan: this.statusnikah,
            namaIbuKandung: this.dataEntry.nama_ibu_kandung,
            statusHubKeluarga: '',
            alamat: this.dataEntry.alamat_ktp,
            kodePropinsi: '',
            kodeKabupaten: '',
            kodeKecamatan: '',
            kodeKelurahan: '',
            namaPropinsi: this.dataEntry.provinsi,
            namaKabupaten: this.dataEntry.kabkota,
            namaKecamatan: this.dataEntry.kecamatan,
            namaKelurahan: this.dataEntry.kelurahan,
            noRW: this.dataEntry.rw,
            noRT: this.dataEntry.rt,
          })
          .subscribe({
            next: data => {
              if (data.result.responseCode != '00') {
                alert(data.result.responseDesc);
                this.namaLengkapDukcapil = 'Tidak Sesuai';
                this.ifNamaLengkap = 'Tidak Sesuai';
                this.tglLahirDukcapil = 'Tidak Sesuai';
                this.statusPerkawinanDukcapil = 'Tidak Sesuai';
                this.alamatDukcapil = 'Tidak Sesuai';
                this.ifAlamat = 'Tidak Sesuai';
                this.namaPropinsiDukcapil = 'Tidak Sesuai';
                this.namaKabupatenDukcapil = 'Tidak Sesuai';
                this.namaKecamatanDukcapil = 'Tidak Sesuai';
                this.namaKelurahanDukcapil = 'Tidak Sesuai';
                this.noRTDukcapil = 'Tidak Sesuai';
                this.noRWDukcapil = 'Tidak Sesuai';
                this.jenisKelaminDukcapil = 'Tidak Sesuai';
                this.getLoading(false);
                return;
              } else {
                this.datadukcapil = data.result;
                this.namaLengkapDukcapil = this.datadukcapil.namaLengkap;
                this.ifNamaLengkap = this.datadukcapil.namaLengkap.includes('Tidak') ? 'Tidak Sesuai' : 'Sesuai';
                this.tglLahirDukcapil = this.datadukcapil.tglLahir;
                this.statusPerkawinanDukcapil = this.datadukcapil.statusPerkawinan;
                this.alamatDukcapil = this.datadukcapil.alamat;
                this.ifAlamat = this.datadukcapil.alamat.includes('Tidak') ? 'Tidak Sesuai' : 'Sesuai';
                this.namaPropinsiDukcapil = this.datadukcapil.namaPropinsi;
                this.namaKabupatenDukcapil = this.datadukcapil.namaKabupaten;
                this.namaKecamatanDukcapil = this.datadukcapil.namaKecamatan;
                this.namaKelurahanDukcapil = this.datadukcapil.namaKelurahan;
                this.noRTDukcapil = this.datadukcapil.noRT;
                this.noRWDukcapil = this.datadukcapil.noRW;
                this.jenisKelaminDukcapil = this.datadukcapil.jenisKelamin;

                // Post DUkcapil PAsangan
                setTimeout(() => {
                  this.http
                    .post<any>(this.baseUrl + 'v1/efos-ide/dukcapil_verify', {
                      no_id: this.dataEntry.app_no_ide,
                      tanggal_lahir: this.dataEntry.tanggal_lahir_pasangan,
                      reffNumber: reffnumbernya,
                      timestamp: timestamp,
                      channelID: 'EFOS',
                      NIK: this.dataEntry.no_ktp_pasangan,
                      noKK: '',
                      namaLengkap: this.dataEntry.nama_pasangan,
                      jenisKelamin: this.dataEntry.jenis_kelamin_pasangan,
                      tempatLahir: this.dataEntry.tempat_lahir_pasangan,
                      tglLahir: tgllahirkirimpasangan,
                      createdBy: this.untukSessionUserName,
                      appNoIde: this.dataEntry.app_no_ide,
                      pendidikan: '',
                      pekerjaan: '',
                      statusPerkawinan: this.statusnikah,
                      namaIbuKandung: this.dataEntry.nama_ibu_kandung_pasangan,
                      statusHubKeluarga: '',
                      alamat: this.dataEntry.alamat_ktp_pasangan,
                      kodePropinsi: '',
                      kodeKabupaten: '',
                      kodeKecamatan: '',
                      kodeKelurahan: '',
                      namaPropinsi: this.dataEntry.provinsi_pasangan,
                      namaKabupaten: this.dataEntry.kabkota_pasangan,
                      namaKecamatan: this.dataEntry.kecamatan_pasangan,
                      namaKelurahan: this.dataEntry.kelurahan_pasangan,
                      noRW: this.dataEntry.rw_pasangan,
                      noRT: this.dataEntry.rt_pasangan,
                    })
                    .subscribe({
                      next: data => {
                        this.datadukcapilpasangan = data.result;
                        if (data.result.responseCode != '00') {
                          alert(data.result.responseDesc);
                          this.PasangaNnamaLengkapDukcapil = 'Tidak Sesuai';
                          this.ifPasangaNnamaLengkap = 'Tidak Sesuai';
                          this.PasangaNtglLahirDukcapil = 'Tidak Sesuai';
                          this.PasangaNstatusPerkawinanDukcapil = 'Tidak Sesuai';
                          this.PasangaNalamatDukcapil = 'Tidak Sesuai';
                          this.ifPasanganAlamat = 'Tidak Sesuai';
                          this.PasangaNnamaPropinsiDukcapil = 'Tidak Sesuai';
                          this.PasangaNnamaKabupatenDukcapil = 'Tidak Sesuai';
                          this.PasangaNnamaKecamatanDukcapil = 'Tidak Sesuai';
                          this.PasangaNnamaKelurahanDukcapil = 'Tidak Sesuai';
                          this.PasangaNnoRTDukcapil = 'Tidak Sesuai';
                          this.PasangaNnoRWDukcapil = 'Tidak Sesuai';
                          this.PasangaNjenisKelaminDukcapil = 'Tidak Sesuai';
                          this.getLoading(false);
                          return;
                        } else {
                          this.datadukcapilpasangan = data.result;
                          this.PasangaNnamaLengkapDukcapil = this.datadukcapilpasangan.namaLengkap;
                          this.ifPasangaNnamaLengkap = this.datadukcapilpasangan.namaLengkap.includes('Tidak') ? 'Tidak Sesuai' : 'Sesuai';
                          this.PasangaNtglLahirDukcapil = this.datadukcapilpasangan.tglLahir;
                          this.PasangaNstatusPerkawinanDukcapil = this.datadukcapilpasangan.statusPerkawinan;
                          this.PasangaNalamatDukcapil = this.datadukcapilpasangan.alamat;
                          this.ifPasanganAlamat = this.datadukcapilpasangan.alamat.includes('Tidak') ? 'Tidak Sesuai' : 'Sesuai';
                          this.PasangaNnamaPropinsiDukcapil = this.datadukcapilpasangan.namaPropinsi;
                          this.PasangaNnamaKabupatenDukcapil = this.datadukcapilpasangan.namaKabupaten;
                          this.PasangaNnamaKecamatanDukcapil = this.datadukcapilpasangan.namaKecamatan;
                          this.PasangaNnamaKelurahanDukcapil = this.datadukcapilpasangan.namaKelurahan;
                          this.PasangaNnoRTDukcapil = this.datadukcapilpasangan.noRT;
                          this.PasangaNnoRWDukcapil = this.datadukcapilpasangan.noRW;
                          this.PasangaNjenisKelaminDukcapil = this.datadukcapilpasangan.jenisKelamin;

                          setTimeout(() => {
                            this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
                              next: data => {
                                if (data.result == '') {
                                  this.getLoading(false);
                                }
                                this.resultDataSlik = data.result.dataSlikResult;

                                if (data.result.dataSlikResult == '') {
                                  this.hideCekSlik = 0;
                                } else {
                                  this.hideCekSlik = 1;
                                }

                                setTimeout(() => {
                                  this.totalOutNas = data.result.total_outstanding_nasabah;
                                  this.totalPlaNas = data.result.total_plafon_nasabah;
                                  this.totalAngNas = data.result.total_angsuran_nasabah;
                                  this.totalPasOut = data.result.total_outstanding_pasangan;
                                  this.totalPasPla = data.result.total_plafon_pasangan;
                                  this.totalPasAng = data.result.total_angsuran_pasangan;
                                }, 10);

                                setTimeout(() => {
                                  if (this.resultDataSlik == '') {
                                    this.http
                                      .post<any>(this.baseUrl + 'v1/efos-ide/slik_verify', {
                                        channelID: 'EFOS',
                                        createdBy: this.SessionStorageService.retrieve('sessionUserName'),
                                        idUserCabang: this.SessionStorageService.retrieve('sessionUserName'),
                                        jenisKelamin: this.jenisKelaminHps,
                                        jenisKelaminPasangan: this.jenisKelaminPasHps,
                                        jenisProduct: 'PTA',
                                        kodeCabang: this.SessionStorageService.retrieve('sessionKdCabang'),
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
                                        timestamp: timestamp,
                                        tujuanSlikChecking: '1',
                                      })
                                      .subscribe({
                                        next: data => {
                                          setTimeout(() => {
                                            if (data.code == 200) {
                                              const responseSlikMenikah = data.result.responseDesc;
                                              if (responseSlikMenikah === 'request slik checking success') {
                                                this.responseSlikMenikah = 1;
                                              } else {
                                                this.responseSlikMenikah = 0;
                                              }
                                              this.dataslik = data.result.responseObject;
                                              this.dataslik.forEach(element => {
                                                if (element.statusApplicant === 'Debitur Utama') {
                                                  this.listLajangSlik.push(element);
                                                  if (this.listLajangSlik[0].idNumber === 'undefined') {
                                                    this.responseNasabah = this.listLajangSlik[0].response_description;
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
                                              alert(data.message);
                                            }
                                          }, 50);
                                        },
                                      });
                                  } else {
                                    this.dataslik = data.result.dataSlikResult;
                                    setTimeout(() => {
                                      this.dataslik.forEach(response => {
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
                                      });
                                      this.dtTrigger.next(this.dataslik);
                                      this.getLoading(false);
                                    }, 50);
                                  }
                                }, 30);
                              },
                            });
                          }, 50);
                        }
                      },
                      error: err => {
                        alert(err.result);
                        this.getLoading(false);
                      },
                    });
                }, 10);
              }
            },
            error: err => {
              alert(err.result);
            },
          });
      }, 100);
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-ide/dukcapil_verify', {
          no_id: this.dataEntry.app_no_ide,
          tanggal_lahir: this.dataEntry.tanggal_lahir,
          reffNumber: reffnumbernya,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.dataEntry.no_ktp,
          noKK: '',
          namaLengkap: this.dataEntry.nama,
          jenisKelamin: this.dataEntry.jenis_kelamin,
          tempatLahir: this.dataEntry.tempat_lahir,
          tglLahir: tgllahirkirim,
          createdBy: this.untukSessionUserName,
          appNoIde: this.dataEntry.app_no_ide,
          pendidikan: '',
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: this.dataEntry.nama_ibu_kandung,
          statusHubKeluarga: '',
          alamat: this.dataEntry.alamat_ktp,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.dataEntry.provinsi,
          namaKabupaten: this.dataEntry.kabkota,
          namaKecamatan: this.dataEntry.kecamatan,
          namaKelurahan: this.dataEntry.kelurahan,
          noRW: this.dataEntry.rw,
          noRT: this.dataEntry.rt,
        })
        .subscribe({
          next: data => {
            if (data.result.responseCode != '00') {
              alert(data.result.responseDesc);
              this.namaLengkapDukcapil = 'Tidak Sesuai';
              this.ifNamaLengkap = 'Tidak Sesuai';
              this.tglLahirDukcapil = 'Tidak Sesuai';
              this.statusPerkawinanDukcapil = 'Tidak Sesuai';
              this.alamatDukcapil = 'Tidak Sesuai';
              this.ifAlamat = 'Tidak Sesuai';
              this.namaPropinsiDukcapil = 'Tidak Sesuai';
              this.namaKabupatenDukcapil = 'Tidak Sesuai';
              this.namaKecamatanDukcapil = 'Tidak Sesuai';
              this.namaKelurahanDukcapil = 'Tidak Sesuai';
              this.noRTDukcapil = 'Tidak Sesuai';
              this.noRWDukcapil = 'Tidak Sesuai';
              this.jenisKelaminDukcapil = 'Tidak Sesuai';

              // //////////////// Psangan /////////////////////////
              this.PasangaNnamaLengkapDukcapil = 'Tidak Sesuai';
              this.ifPasangaNnamaLengkap = 'Tidak Sesuai';
              this.PasangaNtglLahirDukcapil = 'Tidak Sesuai';
              this.PasangaNstatusPerkawinanDukcapil = 'Tidak Sesuai';
              this.PasangaNalamatDukcapil = 'Tidak Sesuai';
              this.ifPasanganAlamat = 'Tidak Sesuai';
              this.PasangaNnamaPropinsiDukcapil = 'Tidak Sesuai';
              this.PasangaNnamaKabupatenDukcapil = 'Tidak Sesuai';
              this.PasangaNnamaKecamatanDukcapil = 'Tidak Sesuai';
              this.PasangaNnamaKelurahanDukcapil = 'Tidak Sesuai';
              this.PasangaNnoRTDukcapil = 'Tidak Sesuai';
              this.PasangaNnoRWDukcapil = 'Tidak Sesuai';
              this.PasangaNjenisKelaminDukcapil = 'Tidak Sesuai';
              this.getLoading(false);
            } else {
              this.datadukcapil = data.result;
              this.namaLengkapDukcapil = this.datadukcapil.namaLengkap;
              this.ifNamaLengkap = this.datadukcapil.namaLengkap.includes('Tidak') ? 'Tidak Sesuai' : 'Sesuai';
              this.tglLahirDukcapil = this.datadukcapil.tglLahir;
              this.statusPerkawinanDukcapil = this.datadukcapil.statusPerkawinan;
              this.alamatDukcapil = this.datadukcapil.alamat;
              this.ifAlamat = this.datadukcapil.alamat.includes('Tidak') ? 'Tidak Sesuai' : 'Sesuai';
              this.namaPropinsiDukcapil = this.datadukcapil.namaPropinsi;
              this.namaKabupatenDukcapil = this.datadukcapil.namaKabupaten;
              this.namaKecamatanDukcapil = this.datadukcapil.namaKecamatan;
              this.namaKelurahanDukcapil = this.datadukcapil.namaKelurahan;
              this.noRTDukcapil = this.datadukcapil.noRT;
              this.noRWDukcapil = this.datadukcapil.noRW;
              this.jenisKelaminDukcapil = this.datadukcapil.jenisKelamin;

              // //////////////// Psangan /////////////////////////
              this.PasangaNnamaLengkapDukcapil = 'Tidak Sesuai';
              this.ifPasangaNnamaLengkap = 'Tidak Sesuai';
              this.PasangaNtglLahirDukcapil = 'Tidak Sesuai';
              this.PasangaNstatusPerkawinanDukcapil = 'Tidak Sesuai';
              this.PasangaNalamatDukcapil = 'Tidak Sesuai';
              this.ifPasanganAlamat = 'Tidak Sesuai';
              this.PasangaNnamaPropinsiDukcapil = 'Tidak Sesuai';
              this.PasangaNnamaKabupatenDukcapil = 'Tidak Sesuai';
              this.PasangaNnamaKecamatanDukcapil = 'Tidak Sesuai';
              this.PasangaNnamaKelurahanDukcapil = 'Tidak Sesuai';
              this.PasangaNnoRTDukcapil = 'Tidak Sesuai';
              this.PasangaNnoRWDukcapil = 'Tidak Sesuai';
              this.PasangaNjenisKelaminDukcapil = 'Tidak Sesuai';

              setTimeout(() => {
                this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
                  next: data => {
                    if (data.result == '') {
                      this.getLoading(false);
                    }
                    this.resultDataSlik = this.resultDataSlik;
                    this.listLajangSlik = data.result.dataSlikResult;

                    if (data.result.dataSlikResult == '') {
                      this.hideCekSlik = 0;
                    } else {
                      this.hideCekSlik = 1;
                    }

                    setTimeout(() => {
                      this.totalOutNas = data.result.total_outstanding_nasabah;
                      this.totalPlaNas = data.result.total_plafon_nasabah;
                      this.totalAngNas = data.result.total_angsuran_nasabah;
                      this.totalPasOut = data.result.total_outstanding_pasangan;
                      this.totalPasPla = data.result.total_plafon_pasangan;
                      this.totalPasAng = data.result.total_angsuran_pasangan;
                      this.getLoading(false);
                    }, 20);

                    setTimeout(() => {
                      if (this.resultDataSlik == '') {
                        this.http
                          .post<any>(this.baseUrl + 'v1/efos-ide/slik_verify', {
                            channelID: 'EFOS',
                            createdBy: this.SessionStorageService.retrieve('sessionUserName'),
                            idUserCabang: this.SessionStorageService.retrieve('sessionUserName'),
                            jenisKelamin: this.jenisKelaminHps,
                            jenisKelaminPasangan: this.jenisKelaminPasHps,
                            jenisProduct: 'PTA',
                            kodeCabang: this.SessionStorageService.retrieve('sessionKdCabang'),
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
                            timestamp: timestamp,
                            tujuanSlikChecking: '1',
                          })
                          .subscribe({
                            next: data => {
                              $('#example').DataTable({
                                destroy: true,
                              });
                              this.dtTrigger.unsubscribe();
                              if (data.code == 200) {
                                this.dtTrigger.next(this.resultDataSlik);
                                this.getLoading(false);
                              } else {
                                this.dtTrigger.next(this.resultDataSlik);
                                this.getLoading(false);
                              }
                            },
                          });
                      } else {
                        this.dtTrigger.next(this.resultDataSlik);
                      }
                    }, 30);
                  },
                });
              }, 50);
            }
          },
          error: err => {
            alert(err.status);
            this.getLoading(false);
          },
        });
    }
  }

  gotopersonalinfo() {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_app_de', {
        analis_verifikasi: '',
        app_no_de: '',
        app_no_ide: this.dataEntry.app_no_ide,
        cabang: this.untukSessionKodeCabang,
        created_by: this.SessionStorageService.retrieve('sessionUserName'),
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
        error: err => {
          alert(err.error.message);
        },
      });

    // this.router.navigate(['/daftaraplikasiide'], {
    //     queryParams: {id: this.paramId},
    // });
  }

  postUpdateStatus(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-ide/cekDhn', {
        no_id: this.dataEntry.app_no_ide,
        tanggal_lahir: this.dataEntry.tanggal_lahir,
      })
      .subscribe({
        next: data => {
          this.hasildhn = data.result.token;
          this.initialDataEntry.getDataDhn(this.dataEntry.app_no_ide).subscribe({
            next: data => {
              this.tableGetDhn = data.result;
              if (data.result != '') {
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

  joinRoom(jenis: any) {
    window.open(this.baseUrl + 'v1/efos-ide/downloadSlik/' + jenis);
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  refreshDatatables(data: any) {
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
