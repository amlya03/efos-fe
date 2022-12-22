import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
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
// import { count } from 'console';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-hasil-prescreening',
  templateUrl: './hasil-prescreening.component.html',
  styleUrls: ['./hasil-prescreening.component.scss'],
})
export class HasilPrescreeningComponent implements OnInit, OnDestroy {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  daWa: any;
  paramId: any;
  hasildhn: any;
  kategori: any;
  datakirimanappide: any;
  dataif: any;
  datadukcapil: dukcapilModel = new dukcapilModel();
  contohdata: any;
  potongankakotanih: any;
  statusnikah: any;
  datadukcapilusername: any;
  datadukcapilpasangan: dukcapilModel = new dukcapilModel();
  dawastatuspernikaham: any;
  dataslik?: slik[];
  dataslikp: any;
  nama: any;
  ktp: any;
  duplikate: any;
  potongankakotanihpasangan: any;
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
  id: any;
  ktp_pasangan: any;
  inputScoring: inputModel[] = [];
  listLajangSlik: slik[] = new Array<slik>();
  listMenikahSlik: slik[] = new Array<slik>();
  appidmanual: any;
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

  // //////////////////////// Table Slik ////////////////////////
  totalOutNas: any;
  totalPlaNas: any;
  totalAngNas: any;
  totalPasOut: any;
  totalPasPla: any;
  totalPasAng: any;
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

  @ViewChild(DataTableDirective, { static: false })
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

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getCustomerByAppId?sc=');
  protected getdhn = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/cekDhn');
  protected apigetslit = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/fetchDataSlik?sd=');
  protected apigetduplikat = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getDuplicateCheck?sk=');

  ngOnInit(): void {
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
    // alert('knfsdkds');
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

    this.postUpdateStatus();
    this.initialDataEntry.getCustomer(this.paramId).subscribe({
      next: data => {
        this.dataEntry = data.result.customer;
        // console.warn(data)
        // setTimeout(() => {
        //   this.cekdukcapil(this.dataEntry.tanggal_lahir, this.dataEntry.tanggal_lahir_pasangan);
        // }, 300);
      },
    });
    this.getdataentry().subscribe({
      next: res => {
        // console.warn('tabel', res);
        this.daWa = res.body?.result.customer;
        this.nama = res.body?.result.customer.nama;
        this.ktp = res.body?.result.customer.no_ktp;
        this.id = res.body?.result.customer.id;
        this.appidmanual = res.body?.result.customer.id;
        this.ktp_pasangan = res.body?.result.customer.no_ktp_pasangan;
        this.dawastatuspernikaham = res.body?.result.customer.status_perkawinan;
        // this.dataEntry = res.body?.result.customer;
        // console.warn('customer', res.body?.result.customer);
        // alert(this.dataEntry.app_no_ide);
        // this.onResponseSuccess(res);
        const tglLahir = this.daWa.tanggal_lahir;
        const tglLahirpasangan = this.daWa.tanggal_lahir_pasangan;
        const nik = this.ktp;

        // this.cekdukcapil(tglLahir, tglLahirpasangan);
        setTimeout(() => {
          this.cekdukcapil(tglLahir, tglLahirpasangan);
        }, 300);
        // this.cekslik(tglLahir, tglLahirpasangan);
        // this.checkstatusktpmanual(nik);
        setTimeout(() => {
          if (res.body?.result.customer.jenis_kelamin === 'Laki-laki') {
            this.jenisKelaminHps = 'M';
          } else {
            this.jenisKelaminHps = 'F';
          }
        }, 50);
        setTimeout(() => {
          if (res.body?.result.customer.jenis_kelamin_pasangan === 'Laki-laki') {
            this.jenisKelaminPasHps = 'M';
          } else {
            this.jenisKelaminPasHps = 'F';
          }
        }, 60);
        setTimeout(() => {
          if (res.body?.result.customer.status_perkawinan === 'Lajang') {
            this.statusMenikahHps = '0';
          } else {
            this.statusMenikahHps = '1';
          }
        }, 70);
        setTimeout(() => {
          this.initialDataEntry.getDownloadSlik(this.dataEntry.app_no_ide).subscribe(data => {
            this.downloadSlik = data.result;
          });
        }, 300);
        // setTimeout(() => {
        //   this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
        //     next: data => {
        //       this.dataslik = data.result.dataSlikResult;
        //       this.dataslik?.forEach(element => {
        //         if (element.response_description == 'get Slik Result Success') {
        //           if (element.status_applicant === 'Debitur Utama') {
        //             // this.listLajangSlik.push(element);
        //             //console.warn('lajang', this.listLajangSlik);
        //           } else {
        //             // this.listMenikahSlik.push(element);
        //             //console.warn('menikah', this.listMenikahSlik);
        //           }
        //         }
        //       });
        //       this.listLajangSlik = data.result.dataSlikResult;
        //       if(data.result.dataSlikResult[0].response_description === 'get SLIK Result Success'){
        //         this.hideCekSlik = 1;
        //       }else{
        //         this.hideCekSlik = 0;
        //       }
        //       setTimeout(() => {
        //         this.totalOutNas = data.result.total_outstanding_nasabah
        //         this.totalPlaNas = data.result.total_plafon_nasabah
        //         this.totalAngNas = data.result.total_angsuran_nasabah
        //         this.totalPasOut = data.result.total_outstanding_pasangan
        //         this.totalPasPla = data.result.total_plafon_pasangan
        //         this.totalPasAng = data.result.total_angsuran_pasangan
        //       }, 300);
        //       setTimeout(() => {
        //         // alert(this.dataEntry.tempat_lahir)
        //         if (data.result.dataSlikResult == '') {
        //           this.http
        //             .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/slik_verify', {
        //               channelID: 'EFOS',
        //               createdBy: this.SessionStorageService.retrieve('sessionUserName'),
        //               idUserCabang: this.SessionStorageService.retrieve('sessionUserName'),
        //               jenisKelamin: this.jenisKelaminHps,
        //               jenisKelaminPasangan: this.jenisKelaminPasHps,
        //               jenisProduct: 'PTA',
        //               kodeCabang: this.SessionStorageService.retrieve('sessionKdCabang'),
        //               namaNasabah: this.dataEntry.nama,
        //               namaPasangan: this.dataEntry.nama_pasangan,
        //               noAplikasi: this.dataEntry.app_no_ide,
        //               noKtp: this.dataEntry.no_ktp,
        //               noKtpPasangan: this.dataEntry.no_ktp_pasangan,
        //               npwp: this.dataEntry.npwp,
        //               reffNumber: reffnumbernya,
        //               statusMenikah: this.statusMenikahHps,
        //               tempatLahir: this.dataEntry.tempat_lahir,
        //               tempatLahirPasangan: this.dataEntry.tempat_lahir_pasangan,
        //               tglLahir: this.dataEntry.tanggal_lahir,
        //               tglLahirPasangan: this.dataEntry.tanggal_lahir_pasangan,
        //               timestamp: timestamp,
        //               tujuanSlikChecking: '1',
        //             })
        //             .subscribe({
        //               next: data => {
        //                 // $('#example').DataTable({
        //                 //   destroy: true,
        //                 // });
        //                 this.dtTrigger.next(data.result.dataSlikResult);
        //               },
        //             });
        //         } else {
        //           // $('#example').DataTable({
        //           //   destroy: true,
        //           // });
        //           this.dtTrigger.next(data.result.dataSlikResult);

        //           // setTimeout(() => {
        //           //   this.http
        //           //     .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/fetchSlikReq', {
        //           //       noAplikasi: this.dataEntry.app_no_ide,
        //           //     })
        //           //     .subscribe({
        //           //       next: sukses => {
        //           //         this.tanggalReq = sukses.result;
        //           //       }
        //           //     });
        //           // }, 300);
        //         }
        //       }, 100);
        //     },
        //   });
        // }, 300);
        this.getduplikatc(this.ktp, this.nama).subscribe({
          next: (res: EntityArrayResponseDaWa) => {
            this.duplikate = res.body?.result;
            if (res.body?.result != '') {
              this.simpanDhn = 1;
            } else {
              this.simpanDhn = 0;
            }
            // console.warn('duplikat', this.dataslik);
            // console.warn('duplikat',res);
          },
        });
      },
    });

    //     this.getdataslik().subscribe({
    //       next: (res: EntityArrayResponseDaWa) => {
    //       },
    //     });

    //     this.getdataslikp().subscribe({
    //       next: (res: EntityArrayResponseDaWa) => {
    //  this.dataslikp = res.body?.result.dataSlikResult;
    //         // console.warn('sliknih', this.dataslik);
    //         // console.warn('sliknih',res);
    //       },
    //     });
  }
  untukSlik() {
    this.getLoading(true);
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/slik_inquiry', {
        noAplikasi: this.dataEntry.app_no_ide,
      })
      .subscribe({
        next: data => {
          $('#example').DataTable({
            destroy: true,
          });
          // this.dtTrigger.unsubscribe();
          this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe({
            next: data => {
              this.listLajangSlik = data.result.dataSlikResult;
              if (data.result.dataSlikResult[0].response_description === 'get SLIK Result Success') {
                this.hideCekSlik = 1;
              } else {
                this.hideCekSlik = 0;
              }
              this.dtTrigger.next(data.result.dataSlikResult);
              this.getLoading(false);
            },
          });
        },
      });
  }
  cekkembalislik() {
    this.dataRumah.fetchSlik(this.dataEntry.app_no_ide).subscribe(data => {
      this.dataslik = data.result.dataSlikResult;
      // console.warn('ttesttt', this.dataslik);
      this.dataslik?.forEach(element => {
        // console.warn('element', element.response_description == 'get SLIK Result Success');
        if (element.response_description == 'get Slik Result Success') {
          if (element.status_applicant === 'Debitur Utama') {
            this.listLajangSlik.push(element);
            console.warn('lajang', this.listLajangSlik);
          } else {
            this.listMenikahSlik.push(element);
            console.warn('menikah', this.listMenikahSlik);
          }
        }
      });
    });
  }

  simpanstatusktp(status: any) {
    // alert(status);
    if (status == 'Lajang') {
      var pipe = new DatePipe('en-US');
      var hasilmiripdong = pipe.transform(Date.now(), 'yyyy:mm:ddHH:mm:ss');
      //  var hasilmiripdong1 = hasilmiripdong?.replace(/|/g,'');
      var hasilmiripdongfinal = hasilmiripdong?.replace(/:/g, '');

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify_manual', {
          alamat_ktp: this.personalInfoForm.get('radiobuttonalamat')?.value,
          id: this.id,
          jenis_kelamin: this.personalInfoForm.get('radiobuttonjenis')?.value,
          kecamatan: this.personalInfoForm.get('radiobuttonkecamatan')?.value,
          kelurahan: this.personalInfoForm.get('radiobuttonkelurahan')?.value,
          kota: this.personalInfoForm.get('radiobuttonkota')?.value,
          nama_lengkap: this.personalInfoForm.get('radiobuttonnama')?.value,
          nik: this.ktp,
          provinsi: this.personalInfoForm.get('radiobuttonprovinsi')?.value,
          ref_number: hasilmiripdongfinal,
          rt: this.personalInfoForm.get('radiobuttonrt')?.value,
          rw: this.personalInfoForm.get('radiobuttonrw')?.value,
          status_kawin: this.personalInfoForm.get('radiobuttonstatus')?.value,
          tanggal_lahir: this.personalInfoForm.get('radiobuttontanggal')?.value,
        })
        .subscribe({
          next: data => {
            this.contohdata = data.result.app_no_de;

            this.router.navigate(['/hasilprescreening'], {
              queryParams: {
                kategori: this.kategori,
                id: this.paramId,
              },
            });
          },
        });
    } else {
      var pipe = new DatePipe('en-US');
      var hasilmiripdong = pipe.transform(Date.now(), 'yyyy:mm:ddHH:mm:ss');
      //  var hasilmiripdong1 = hasilmiripdong?.replace(/|/g,'');
      var hasilmiripdongfinal = hasilmiripdong?.replace(/:/g, '');

      // const radiobtnnama = document.getElementById('umur') as HTMLInputElement | any;
      // if(radiobtnnama == 'sesuai'){
      //   const kirimradiobtnnama='sesuai'
      // }else{

      // }
      const radiobtntgl = document.getElementById('kode_pos') as HTMLInputElement | any;
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify_manual', {
          headers: headers,
          alamat_ktp: this.personalInfoForm.get('radiobuttonalamat')?.value,
          id: this.id,
          jenis_kelamin: this.personalInfoForm.get('radiobuttonjenis')?.value,
          kecamatan: this.personalInfoForm.get('radiobuttonkecamatan')?.value,
          kelurahan: this.personalInfoForm.get('radiobuttonkelurahan')?.value,
          kota: this.personalInfoForm.get('radiobuttonkota')?.value,
          nama_lengkap: this.personalInfoForm.get('radiobuttonnama')?.value,
          nik: this.ktp,
          provinsi: this.personalInfoForm.get('radiobuttonprovinsi')?.value,
          ref_number: hasilmiripdongfinal,
          rt: this.personalInfoForm.get('radiobuttonrt')?.value,
          rw: this.personalInfoForm.get('radiobuttonrw')?.value,
          status_kawin: this.personalInfoForm.get('radiobuttonstatus')?.value,
          tanggal_lahir: this.personalInfoForm.get('radiobuttontanggal')?.value,
        })
        .subscribe(resposne => {
          this.contohdata = resposne.result.id;
          // console.log('responsesimpndataktp', resposne);
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify_manual', {
              headers: headers,
              alamat_ktp: this.personalInfoFormpasangan.get('radiobuttonalamatpasangan')?.value,
              id: this.id,
              jenis_kelamin: this.personalInfoFormpasangan.get('radiobuttonjenispasangan')?.value,
              kecamatan: this.personalInfoFormpasangan.get('radiobuttonkecamatanpasangan')?.value,
              kelurahan: this.personalInfoFormpasangan.get('radiobuttonkelurahanpasangan')?.value,
              kota: this.personalInfoFormpasangan.get('radiobuttonkotapasangan')?.value,
              nama_lengkap: this.personalInfoFormpasangan.get('radiobuttonnamapasangan')?.value,
              nik: this.ktp_pasangan,
              provinsi: this.personalInfoFormpasangan.get('radiobuttonprovinsipasangan')?.value,
              ref_number: hasilmiripdongfinal,
              rt: this.personalInfoFormpasangan.get('radiobuttonrtpasangan')?.value,
              rw: this.personalInfoFormpasangan.get('radiobuttonrwpasangan')?.value,
              status_kawin: this.personalInfoFormpasangan.get('radiobuttonstatuspasangan')?.value,
              tanggal_lahir: this.personalInfoFormpasangan.get('radiobuttontanggalpasangan')?.value,
            })
            .subscribe({
              next: data => {
                this.contohdata = data.result.app_no_de;

                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    kategori: this.kategori,
                    id: this.paramId,
                  },
                });
              },
            });
        });
    }
  }

  getdataslik(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigetslit + this.dataEntry.app_no_ide, { params: options, observe: 'response' });
  }

  getdataslikp(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigetslit + this.dataEntry.app_no_ide, { params: options, observe: 'response' });
  }

  getduplikatc(noktp: any, nama: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigetduplikat + noktp + '&sn=' + nama, { params: options, observe: 'response' });
  }

  cekslik(tglLahir: any, tglLahirpasangan: any) {
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
    var datee = tglLahir;
    var dateepasangan = tglLahirpasangan;

    const str4 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    var timestamp = pipe.transform(Date.now(), 'yyyy-mm-dd HH:mm:ss');
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

    var datanih = d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

    var strnih = ['-', ':', '.', 'T'];
    var rplc = ['', '', '', ''];
    // var hasilakhirlelah=dt.replace(strnih,rplc);

    // console.log('makantuh2' + reffnumbernya);
    // console.log('makantuh' + menit);
    // console.log(finalhasil2);
    // console.log(datanih);
    // console.log('benar' + dt);
    // console.log('data' + str4);
    // console.log(hasilmiripdong);
    // console.log(hasilmiripdongfinal);
    // console.log('tgl ini bener ' + tgllahirkirim);
    // console.log('tgllahir' + datee);
    // console.log('tgllahir' + hasilmiripdongbanyak);
    const reffNumber = 'aaa';
    // const timestamp = 'aaa';
    const local = 'aaa';
    const now = 'aaa';

    const kirimanprovinsi = this.daWa.provinsi.split('|');
    const kirimankabkota = this.daWa.kabkota.split('|');
    const kirimankecamatan = this.daWa.kecamatan.split('|');
    const kirimankelurahan = this.daWa.kelurahan.split('|');

    if (this.daWa.kabkota.indexOf(' ')) {
      this.potongankakotanih = this.daWa.kabkota.replace('Kota ', '');
    }

    if (this.daWa.kabkota_pasangan.indexOf(' ')) {
      this.potongankakotanihpasangan = this.daWa.kabkota.replace('Kota ', '');
    }
    if (this.daWa.status_perkawinan === 'Menikah') {
      this.statusnikah = 'KAWIN';
    } else {
      this.statusnikah = 'BELUM KAWIN';
    }

    // if (this.daWa.status_perkawinan === 'Menikah') {
    //   this.http
    //     .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/slik_verify', {
    // channelID: 'EFOS',
    // idUSerCabang:'',
    // jenisKelamin: this.daWa.jenis_kelamin,
    // kodeCabang:'',
    // namaNasabah: this.daWa.nama,
    // noAplikasi: this.dataEntry.app_no_ide,
    // noKtp: this.daWa.no_ktp,
    // npwp:'',
    // reffNumber: reffnumbernya,
    // tempatLahir: '',
    // tglLahir: tgllahirkirim,
    // timestamp: timestamp,
    // TujuanSlikCheking: '',
    // namaPasangan: '',
    // noKtpPasangan: '',
    // tempatLahirPasangan: '',
    // tglLahirPasangan: '',
    // jenisKelaminPAsangan: '',
    // StatusMenikah: '',
    //     })
    //     .subscribe({
    //       next: data => {
    //         const codeverifducapilapi = data.code;
    //         // console.warn(codeverifducapilapi);

    //         if (codeverifducapilapi != 200) {
    //           // alert('gagal !200');
    //         } else {
    //           if (data.result.responseCode != '00') {
    //             // alert('ini gagal');
    //             // alert(data.result.responseDesc);
    //             this.datadukcapil = null;
    //             // console.warn('dukcapil' + this.datadukcapil);
    //             this.datadukcapilusername = null;
    //           } else {
    //             this.datadukcapil = data.result;
    //             // console.warn('dukcapil' + this.datadukcapil);
    //             this.dataif = data.result.responseCode;
    //             // alert('berhasil ');
    //           }
    //         }
    //       },
    //     });

    //   this.http
    //     .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/slik_verify', {
    //       channelID: 'EFOS',
    //       idUSerCabang:'',
    //       jenisKelamin: this.daWa.jenis_kelamin,
    //       kodeCabang:'',
    //       namaNasabah: this.daWa.nama,
    //       noAplikasi: this.dataEntry.app_no_ide,
    //       noKtp: this.daWa.no_ktp,
    //       npwp:'',
    //       reffNumber: reffnumbernya,
    //       tempatLahir: '',
    //       tglLahir: tgllahirkirim,
    //       timestamp: timestamp,
    //       TujuanSlikCheking: '',
    //       namaPasangan: '',
    //       noKtpPasangan: '',
    //       tempatLahirPasangan: '',
    //       tglLahirPasangan: '',
    //       jenisKelaminPAsangan: '',
    //       StatusMenikah: '',
    //     })
    //     .subscribe({
    //       next: data => {
    //         const codeverifducapilapi = data.code;
    //         // console.warn(codeverifducapilapi);

    //         if (codeverifducapilapi != 200) {
    //           // alert('gagal !200');
    //         } else {
    //           if (data.result.responseCode != '00') {
    //             // alert('ini gagal');
    //             // alert(data.result.responseDesc);
    //             this.datadukcapilpasangan = null;
    //             // console.warn('dukcapil' + this.datadukcapilpasangan);
    //             this.datadukcapilusername = null;
    //           } else {
    //             this.datadukcapilpasangan = data.result;
    //             // console.warn('dukcapil' + this.datadukcapilpasangan);
    //             this.dataif = data.result.responseCode;
    //             // alert('berhasil ');
    //           }
    //         }
    //       },
    //     });
    // } else {
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/slik_verify', {
        channelID: 'EFOS',
        createdBy: this.SessionStorageService.retrieve('sessionUserName'),
        idUserCabang: this.SessionStorageService.retrieve('sessionUserName'),
        jenisKelamin: 'M',
        jenisKelaminPasangan: this.daWa.jenis_kelamin_pasangan,
        jenisProduct: 'PTA',
        kodeCabang: this.SessionStorageService.retrieve('sessionKdCabang'),
        namaNasabah: this.daWa.nama,
        namaPasangan: this.daWa.nama_pasangan,
        noAplikasi: this.daWa.app_no_ide,
        noKtp: this.daWa.no_ktp,
        noKtpPasangan: this.daWa.no_ktp_pasangan,
        npwp: this.daWa.npwp,
        reffNumber: reffnumbernya,
        statusMenikah: '0',
        tempatLahir: this.daWa.tempat_lahir,
        tempatLahirPasangan: this.daWa.tempat_lahir_pasangan,
        tglLahir: this.daWa.tanggal_lahir,
        tglLahirPasangan: this.daWa.tanggal_lahir_pasangan,
        timestamp: timestamp,
        tujuanSlikChecking: '1',
      })
      .subscribe({
        next: data => {
          this.dtTrigger.next(data.result.dataSlikResult);
          // const codeverifducapilapi = data.code;
          // // console.warn(codeverifducapilapi);
          //
          // if (codeverifducapilapi != 200) {
          //   // alert('gagal !200');
          // } else {
          //   if (data.result.responseCode != '00') {
          //     // alert('ini gagal');
          //     // alert(data.result.responseDesc);
          //     this.datadukcapil = null;
          //     // console.warn('dukcapil' + this.datadukcapil);
          //     this.datadukcapilusername = null;
          //   } else {
          //     this.datadukcapil = data.result;
          //     // console.warn('dukcapil' + this.datadukcapil);
          //     this.dataif = data.result.responseCode;
          //     // alert('berhasil ');
          //   }
          // }
        },
      });
    // }
  }

  cekdukcapil(tglLahir: any, tglLahirpasangan: any) {
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
    var datee = tglLahir;
    var dateepasangan = tglLahirpasangan;

    const str4 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    var timestamp = pipe.transform(Date.now(), 'yyyy-mm-dd HH:mm:ss');
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

    var datanih = d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

    var strnih = ['-', ':', '.', 'T'];
    var rplc = ['', '', '', ''];
    // var hasilakhirlelah=dt.replace(strnih,rplc);

    // console.log('makantuh2' + reffnumbernya);
    // console.log('makantuh' + menit);
    // console.log(finalhasil2);
    // console.log(datanih);
    // console.log('benar' + dt);
    // console.log('data' + str4);
    // console.log(hasilmiripdong);
    // console.log(hasilmiripdongfinal);
    // console.log('tgl ini bener ' + tgllahirkirim);
    // console.log('tgllahir' + datee);
    // console.log('tgllahir' + hasilmiripdongbanyak);
    const reffNumber = 'aaa';
    // const timestamp = 'aaa';
    const local = 'aaa';
    const now = 'aaa';

    // const kirimanprovinsi = this.daWa.provinsi.split('|');
    // const kirimankabkota = this.daWa.kabkota.split('|');
    // const kirimankecamatan = this.daWa.kecamatan.split('|');
    // const kirimankelurahan = this.daWa.kelurahan.split('|');

    if (this.daWa.kabkota.indexOf(' ')) {
      this.potongankakotanih = this.daWa.kabkota.replace('Kota ', '');
    }

    if (this.daWa.kabkota_pasangan.indexOf(' ')) {
      this.potongankakotanihpasangan = this.daWa.kabkota.replace('Kota ', '');
    }
    if (this.daWa.status_perkawinan === 'Menikah') {
      this.statusnikah = 'KAWIN';
    } else {
      this.statusnikah = 'BELUM KAWIN';
    }
    if (this.daWa.status_perkawinan === 'Menikah') {
      // alert(tglLahir)
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
          no_id: this.daWa.app_no_ide,
          tanggal_lahir: this.daWa.tanggal_lahir,
          reffNumber: reffnumbernya,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.daWa.no_ktp,
          noKK: '',
          namaLengkap: this.daWa.nama,
          jenisKelamin: this.daWa.jenis_kelamin,
          tempatLahir: '',
          tglLahir: tgllahirkirim,
          createdBy: '',
          appNoIde: this.daWa.app_no_ide,
          pendidikan: this.daWa.pendidikan,
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: '',
          statusHubKeluarga: '',
          alamat: this.daWa.alamat_ktp,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.daWa.provinsi,
          namaKabupaten: this.potongankakotanih,
          namaKecamatan: this.daWa.kecamatan,
          namaKelurahan: this.daWa.kelurahan,
          noRW: this.daWa.rw,
          noRT: this.daWa.rt,
          // password_dukcapil: '3foWeb@pp',
        })
        .subscribe({
          next: data => {
            // console.warn('Lajang Men'+ data)
            // if (data.result.responseCode != '00') {
            //   this.datadukcapil = null;
            //   this.datadukcapilusername = null;
            // } else {
            //   this.datadukcapil = data.result;
            //   this.dataif = data.result.responseCode;
            // }
            // const codeverifducapilapi = data.code;
            // if (codeverifducapilapi != 200) {
            //   alert('gagal !200');
            // } else {
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
            }
          },
          error: err => {
            alert(err.result);
          },
        });

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
          no_id: this.daWa.app_no_ide,
          tanggal_lahir: this.daWa.tanggal_lahir,
          reffNumber: reffnumbernya,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.daWa.no_ktp_pasangan,
          noKK: '',
          namaLengkap: this.daWa.nama_pasangan,
          jenisKelamin: this.daWa.jenis_kelamin_pasangan,
          tempatLahir: '',
          tglLahir: tgllahirkirimpasangan,
          createdBy: '',
          appNoIde: this.daWa.app_no_ide,
          pendidikan: '',
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: '',
          statusHubKeluarga: '',
          alamat: this.daWa.alamat_ktp_pasangan,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.daWa.provinsi_pasangan,
          namaKabupaten: this.potongankakotanihpasangan,
          namaKecamatan: this.daWa.kecamatan_pasangan,
          namaKelurahan: this.daWa.kelurahan_pasangan,
          noRW: this.daWa.rw_pasangan,
          noRT: this.daWa.rt_pasangan,
          // password_dukcapil: '3foWeb@pp',
        })
        .subscribe({
          next: data => {
            // console.warn('Menikah men'+ data)
            // const codeverifducapilapi = data.code;
            // console.warn(codeverifducapilapi);

            // if (codeverifducapilapi != 200) {
            //   // alert('gagal !200');
            // } else {
            //   if (data.result.responseCode != '00') {
            //     // alert('ini gagal');
            //     // alert(data.result.responseDesc);
            //     this.datadukcapilpasangan = null;
            //     // console.warn('dukcapil' + this.datadukcapilpasangan);
            //     this.datadukcapilusername = null;
            //   } else {
            this.datadukcapilpasangan = data.result;
            //     // console.warn('dukcapil' + this.datadukcapilpasangan);
            //     this.dataif = data.result.responseCode;
            //     // alert('berhasil ');
            //   }
            // }
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
            }
          },
          error: err => {
            alert(err.result);
          },
        });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
          no_id: this.daWa.app_no_ide,
          tanggal_lahir: this.daWa.tanggal_lahir,

          reffNumber: reffnumbernya,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.daWa.no_ktp,
          noKK: '',
          namaLengkap: this.daWa.nama,
          jenisKelamin: this.daWa.jenis_kelamin,
          tempatLahir: '',
          tglLahir: tgllahirkirim,
          createdBy: '',
          appNoIde: this.daWa.app_no_ide,
          pendidikan: '',
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: '',
          statusHubKeluarga: '',
          alamat: this.daWa.alamat_ktp,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.daWa.provinsi,
          namaKabupaten: this.potongankakotanih,
          namaKecamatan: this.daWa.kecamatan,
          namaKelurahan: this.daWa.kelurahan,
          noRW: this.daWa.rw,
          noRT: this.daWa.rt,
          // password_dukcapil: '3foWeb@pp',
        })
        .subscribe({
          next: data => {
            // console.warn('Lajang'+ data)
            // const codeverifducapilapi = data.code;
            // // console.warn(codeverifducapilapi);

            // if (codeverifducapilapi != 200) {
            //   // alert('gagal !200');
            // } else {
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
            }
          },
          error: err => {
            alert(err.status);
            console.warn('dukcapil Lajang' + err);
          },
        });
    }
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.paramId, { params: options, observe: 'response' });
  }

  gotopersonalinfo() {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_app_de', {
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
          this.router.navigate(['/data-entry/personalinfo'], {
            queryParams: { curef: this.dataEntry.curef, statusPerkawinan: this.dataEntry.status_perkawinan, app_no_de: this.contohdata },
          });
        },
      });

    // this.router.navigate(['/daftaraplikasiide'], {
    //     queryParams: {id: this.paramId},
    // });
  }

  postUpdateStatus(): void {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/cekDhn', {
        no_id: this.dataEntry.app_no_ide,
        tanggal_lahir: this.dataEntry.tanggal_lahir,
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.hasildhn = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          // console.warn(data.result.token);
          // console.warn(this.hasildhn);
        },
      });
  }

  checkstatusktpmanual(value: any) {
    if (this.dawastatuspernikaham == 'Lajang') {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/get_data_dukcapil_manual', {
          nik: value,
        })
        .subscribe({
          next: data => {
            this.personalInfoModel = data.result;
            // console.warn('INIDIAPIBN', this.personalInfoModel);
            // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
            // return this.postId;
            // alert(this.personalInfoModel.tanggal_lahir);

            let retrivePersonalInfo = {
              radiobuttonnama: this.personalInfoModel.nama_lengkap,
              radiobuttontanggal: this.personalInfoModel.tanggal_lahir,
              radiobuttonstatus: this.personalInfoModel.status_kawin,
              radiobuttonalamat: this.personalInfoModel.alamat_ktp,
              radiobuttonprovinsi: this.personalInfoModel.provinsi,
              radiobuttonkota: this.personalInfoModel.kota,
              radiobuttonkecamatan: this.personalInfoModel.kecamatan,
              radiobuttonkelurahan: this.personalInfoModel.kelurahan,
              radiobuttonrt: this.personalInfoModel.rt,
              radiobuttonrw: this.personalInfoModel.rw,
              radiobuttonjenis: this.personalInfoModel.jenis_kelamin,
            };
            this.personalInfoForm.setValue(retrivePersonalInfo);
          },
        });
    } else {
      // alert('fungsi else jalan');
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/get_data_dukcapil_manual', {
          nik: value,
        })
        .subscribe({
          next: data => {
            this.personalInfoModel = data.result;
            // console.warn('punyaelsenya', this.personalInfoModel);
            // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
            // return this.postId;
            // alert(this.personalInfoModel.tanggal_lahir);

            let retrivePersonalInfo = {
              radiobuttonnama: this.personalInfoModel.nama_lengkap,
              radiobuttontanggal: this.personalInfoModel.tanggal_lahir,
              radiobuttonstatus: this.personalInfoModel.status_kawin,
              radiobuttonalamat: this.personalInfoModel.alamat_ktp,
              radiobuttonprovinsi: this.personalInfoModel.provinsi,
              radiobuttonkota: this.personalInfoModel.kota,
              radiobuttonkecamatan: this.personalInfoModel.kecamatan,
              radiobuttonkelurahan: this.personalInfoModel.kelurahan,
              radiobuttonrt: this.personalInfoModel.rt,
              radiobuttonrw: this.personalInfoModel.rw,
              radiobuttonjenis: this.personalInfoModel.jenis_kelamin,
            };
            this.personalInfoForm.setValue(retrivePersonalInfo);
            this.checkstatusktpmanualpasangan();
          },
        });
    }
  }

  checkstatusktpmanualpasangan() {
    // alert('fungsipasangam');
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/get_data_dukcapil_manual', {
        nik: this.ktp_pasangan,
      })
      .subscribe({
        next: data => {
          this.personalInfoModel = data.result;
          // console.warn('INIDIAPIBN', this.personalInfoModel);
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;
          // alert(this.personalInfoModel.tanggal_lahir);

          let retrivePersonalInfopasangan = {
            radiobuttonnamapasangan: this.personalInfoModel.nama_lengkap,
            radiobuttontanggalpasangan: this.personalInfoModel.tanggal_lahir,
            radiobuttonstatuspasangan: this.personalInfoModel.status_kawin,
            radiobuttonalamatpasangan: this.personalInfoModel.alamat_ktp,
            radiobuttonprovinsipasangan: this.personalInfoModel.provinsi,
            radiobuttonkotapasangan: this.personalInfoModel.kota,
            radiobuttonkecamatanpasangan: this.personalInfoModel.kecamatan,
            radiobuttonkelurahanpasangan: this.personalInfoModel.kelurahan,
            radiobuttonrtpasangan: this.personalInfoModel.rt,
            radiobuttonrwpasangan: this.personalInfoModel.rw,
            radiobuttonjenispasangan: this.personalInfoModel.jenis_kelamin,
          };
          this.personalInfoFormpasangan.setValue(retrivePersonalInfopasangan);
        },
      });
  }

  backtoide(): void {
    this.router.navigate(['/daftaraplikasiide']);
  }
  // contoh(): void {
  //   let options = this.inputScoring.map((option: any) => {
  //     return `
  //       <option key="${option}" value="${option.parameter_type}">
  //           ${option.parameter_description}
  //       </option>
  //     `;
  //   });
  //   $(document).ready(function () {
  //     $('#parameter').change(function () {
  //       let parameterValue = $(this).val();
  //       if (parameterValue === '1') {
  //         $('#minMaxDiv').hide();
  //         $('#dataValueDiv').show();
  //       } else {
  //         $('#minMaxDiv').show();
  //         $('#dataValueDiv').hide();
  //       }
  //     });
  //   });
  //   // const { value: formValues } = await Swal.fire({
  //   Swal.fire({
  //     title: 'Tambah SLIK',
  //     html:
  //       '<br />' +
  //       '<div class="row form-material"><div class="form-group row">' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">Nama Bank?</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Nama_bank"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">Jenis fasilitas?</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Jenis_fasilitas"/>' +
  //       '</div></div>' +
  //       '<label class="col-sm-3 col-form-label">Kolektibilitas</label>' +
  //       '<div class="col-sm-9"><select id="kolektibilitas" class="form-control"><option value="">Pilih</option><option value="Lancar">Lancar</option><option value="Nyandet">Nyandet</option><option value="gkbisabayar">Gk bisa bayar</option></select>' +
  //       '</div></div>' +
  //       '<label class="col-sm-3 col-form-label">Keteranga</label>' +
  //       '<div class="col-sm-9"><select id="keterangan" class="form-control"><option value="">Pilih</option><option value="Komsumsi">Komsumsi</option><option value="Investasi">Investasi</option><option value="GkTau">Gk Tau</option></select>' +
  //       '</div></div>' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">Tanggal Mulai?</label>' +
  //       '<div class="col-sm-9"><input type="date" class="form-control" id="tangal_mulai"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">tanggal jatuh tempo</label>' +
  //       '<div class="col-sm-9"><input type="date" class="form-control" id="tangal_akhir"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">angsuran</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="angsuran"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Outstanding</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Outstanding"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Platform</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Platform"/>' +
  //       '</div></div>' +
  //       '<label class="col-sm-3 col-form-label">Status</label>' +
  //       '<div class="col-sm-9"><select id="Status" class="form-control"><option value="">Pilih</option><option value="Lunas">Lunas</option><option value="Belumlunas">Belum lunas</option></select>' +
  //       '</div></div>' +
  //       '<div>',
  //     focusConfirm: false,
  //     // preConfirm: () => {
  //     //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
  //     // },
  //   }).then(result => {
  //     let proVal = $('#keterangan').val();
  //     let joVal = $('#tangal_mulai').val();
  //     let parVal = $('#tangal_akhir').val();
  //     let datVal = $('#angsuran').val();
  //     let namabank = $('#Nama_bank').val();
  //     let jenisfasilitas = $('#Jenis_fasilitas').val();
  //     let kolektibilitas = $('#kolektibilitas').val();
  //     let Outstanding = $('#Outstanding').val();
  //     let Platform = $('#Platform').val();
  //     let Status = $('#Status').val();
  //     if (proVal === '') {
  //       alert('Gagal Menyimpan keterangan Belum diisi');
  //       return;
  //     } else if (joVal === '') {
  //       alert('Gagal Menyimpan tangal mulai Belum dipilih');
  //       return;
  //     } else if (parVal === '') {
  //       alert('Gagal Menyimpan tangal akhir Belum dipilih');
  //       return;
  //     } else if (datVal === '') {
  //       alert('Gagal Menyimpan angsuran Belum diisi');
  //       return;
  //     } else {
  //       this.http
  //         .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/slik_verify_manual', {
  //           id: '',
  //           no_aplikasi: this.dataEntry.app_no_ide,
  //           id_number: this.ktp,
  //           angsuran: datVal,
  //           tanggal_jatuh_tempo: parVal,
  //           response_description: 'get Slik Result Success',
  //           status_applicant: 'Debitur Utama Individu',
  //           tanggal_mulai: joVal,
  //           jenis_kredit_pembiayaan_ket: jenisfasilitas,
  //           jenis_penggunaan_ket: proVal,
  //           plafon: Platform,
  //           ljk_ket: namabank,
  //           kondisi_ket: Status,
  //           kualitas_ket: kolektibilitas,
  //           baki_debet: Outstanding,

  //           created_by: '',
  //           created_date: '',
  //         })
  //         .subscribe({
  //           next: response => {
  //             // console.warn(response);
  //             alert('Data Berhasil disimpan');
  //             window.location.reload();
  //           },
  //           error: error => console.warn(error),
  //         });
  //     }
  //   });
  // }

  // contohpasangan(): void {
  //   let options = this.inputScoring.map((option: any) => {
  //     return `
  //       <option key="${option}" value="${option.parameter_type}">
  //           ${option.parameter_description}
  //       </option>
  //     `;
  //   });
  //   $(document).ready(function () {
  //     $('#parameter').change(function () {
  //       let parameterValue = $(this).val();
  //       if (parameterValue === '1') {
  //         $('#minMaxDiv').hide();
  //         $('#dataValueDiv').show();
  //       } else {
  //         $('#minMaxDiv').show();
  //         $('#dataValueDiv').hide();
  //       }
  //     });
  //   });
  //   // const { value: formValues } = await Swal.fire({
  //   Swal.fire({
  //     title: 'Tambah SLIK',
  //     html:
  //       '<br />' +
  //       '<div class="row form-material"><div class="form-group row">' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">Nama Bank?</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Nama_bank"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">Jenis fasilitas?</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Jenis_fasilitas"/>' +
  //       '</div></div>' +
  //       '<label class="col-sm-3 col-form-label">Kolektibilitas</label>' +
  //       '<div class="col-sm-9"><select id="kolektibilitas" class="form-control"><option value="">Pilih</option><option value="Lancar">Lancar</option><option value="Nyandet">Nyandet</option><option value="gkbisabayar">Gk bisa bayar</option></select>' +
  //       '</div></div>' +
  //       '<label class="col-sm-3 col-form-label">Keteranga</label>' +
  //       '<div class="col-sm-9"><select id="keterangan" class="form-control"><option value="">Pilih</option><option value="Komsumsi">Komsumsi</option><option value="Investasi">Investasi</option><option value="GkTau">Gk Tau</option></select>' +
  //       '</div></div>' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">Tanggal Mulai?</label>' +
  //       '<div class="col-sm-9"><input type="date" class="form-control" id="tangal_mulai"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row"><label class="col-sm-3 col-form-label">tanggal jatuh tempo</label>' +
  //       '<div class="col-sm-9"><input type="date" class="form-control" id="tangal_akhir"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">angsuran</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="angsuran"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Outstanding</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Outstanding"/>' +
  //       '</div></div>' +
  //       '<div class="form-group row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Platform</label>' +
  //       '<div class="col-sm-9"><input type="text" class="form-control" id="Platform"/>' +
  //       '</div></div>' +
  //       '<label class="col-sm-3 col-form-label">Status</label>' +
  //       '<div class="col-sm-9"><select id="Status" class="form-control"><option value="">Pilih</option><option value="Lunas">Lunas</option><option value="Belumlunas">Belum lunas</option></select>' +
  //       '</div></div>' +
  //       '<div>',
  //     focusConfirm: false,
  //     // preConfirm: () => {
  //     //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
  //     // },
  //   }).then(result => {
  //     let proVal = $('#keterangan').val();
  //     let joVal = $('#tangal_mulai').val();
  //     let parVal = $('#tangal_akhir').val();
  //     let datVal = $('#angsuran').val();
  //     let namabank = $('#Nama_bank').val();
  //     let jenisfasilitas = $('#Jenis_fasilitas').val();
  //     let kolektibilitas = $('#kolektibilitas').val();
  //     let Outstanding = $('#Outstanding').val();
  //     let Platform = $('#Platform').val();
  //     let Status = $('#Status').val();
  //     if (proVal === '') {
  //       alert('Gagal Menyimpan keterangan Belum diisi');
  //       return;
  //     } else if (joVal === '') {
  //       alert('Gagal Menyimpan tangal mulai Belum dipilih');
  //       return;
  //     } else if (parVal === '') {
  //       alert('Gagal Menyimpan tangal akhir Belum dipilih');
  //       return;
  //     } else if (datVal === '') {
  //       alert('Gagal Menyimpan angsuran Belum diisi');
  //       return;
  //     } else {
  //       this.http
  //         .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/slik_verify_manual', {
  //           id: '',
  //           no_aplikasi: this.dataEntry.app_no_ide,
  //           id_number: this.ktp,
  //           angsuran: datVal,
  //           tanggal_jatuh_tempo: parVal,
  //           response_description: 'get Slik Result Success',
  //           status_applicant: 'Debitur Pasangan',
  //           tanggal_mulai: joVal,
  //           jenis_kredit_pembiayaan_ket: jenisfasilitas,
  //           jenis_penggunaan_ket: proVal,
  //           plafon: Platform,
  //           ljk_ket: namabank,
  //           kondisi_ket: Status,
  //           kualitas_ket: kolektibilitas,
  //           baki_debet: Outstanding,

  //           created_by: '',
  //           created_date: '',
  //         })
  //         .subscribe({
  //           next: response => {
  //             console.warn(response);
  //             alert('Data Berhasil disimpan');
  //             window.location.reload();
  //           },
  //           error: error => console.warn(error),
  //         });
  //     }
  //   });
  // }
  joinRoom(jenis: any) {
    window.open('http://10.20.34.178:8805/api/v1/efos-ide/downloadSlik/' + jenis);
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
