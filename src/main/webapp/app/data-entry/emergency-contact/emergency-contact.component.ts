import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fetchAllDe } from '../../upload-document/services/config/fetchAllDe.model';
import { getEmergencyByCurefModel } from '../services/config/getEmergencyByCurefModel.model';
import { environment } from 'environments/environment';

// export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  emergencyForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  curef: string | undefined;
  statusPerkawinan: string | undefined;
  app_no_de: string | undefined;
  datakirimanakategoripekerjaan: any;
  daWa: getEmergencyByCurefModel = new getEmergencyByCurefModel();
  databawaan: any;
  daWaprof: any;
  postId: any;
  daWakota: any;
  kecamatan: any;
  daWakodepos: any;
  kelurahan: any;
  gethubunganemergency1: any;
  keteranganstatusnikah: any;
  untukSessionRole: any;
  untukprovinsi: any;
  untukkobkota: any;
  untukkecamatan: any;
  untukkelurahan: any;
  retriveKodeProvinsi: any;
  retriveKodeKota: any;
  retriveKodeKecamatan: any;
  retriveKodeKelurahan: any;
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });

    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params['statusPerkawinan'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();
    this.getLoading(true);
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.emergencyForm = this.formBuilder.group({
      nama: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      // ///////////////////////////////////////
      provinsi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kabkota: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kecamatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kelurahan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_pos: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      // //////////////////////////////////////
      rt: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_telepon: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      hubungan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      email: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load() {
    setTimeout(() => {
      this.gettokendukcapil();
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchListEmergency().subscribe(emer => {
        this.gethubunganemergency1 = emer.result;
      });
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(de => {
        this.dataEntry = de.result;
      });
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchEmergencyByCuref(this.curef).subscribe({
        next: de => {
          this.daWa = de.result;
          if (de.result == null) {
            this.getLoading(false);
            this.untukprovinsi = '';
            this.untukkobkota = '';
            this.untukkecamatan = '';
            this.untukkelurahan = '';
            this.keteranganstatusnikah = '';
            const retriveEmergency = {
              nama: '',
              alamat: '',
              // ///////////////////////////////////////
              provinsi: '',
              kabkota: '',
              kecamatan: '',
              kelurahan: '',
              // //////////////////////////////////////
              kode_pos: '',
              rt: '',
              rw: '',
              no_telepon: '',
              hubungan: '',
              email: '',
            };
            this.emergencyForm.setValue(retriveEmergency);
          } else {
            this.untukprovinsi = de.result.provinsi;
            this.untukkobkota = de.result.kabkota;
            this.untukkecamatan = de.result.kecamatan;
            this.untukkelurahan = de.result.kelurahan;
            this.keteranganstatusnikah = de.result.kategori_pekerjaan;

            const retriveEmergency = {
              nama: this.daWa.nama,
              alamat: this.daWa.alamat,
              // ///////////////////////////////////////
              provinsi: '',
              kabkota: '',
              kecamatan: '',
              kelurahan: '',
              // //////////////////////////////////////
              kode_pos: this.daWa.kode_pos,
              rt: this.daWa.rt,
              rw: this.daWa.rw,
              no_telepon: this.daWa.no_telepon,
              hubungan: this.daWa.hubungan,
              email: this.daWa.email,
            };
            this.emergencyForm.setValue(retriveEmergency);
            setTimeout(() => {
              this.getLoading(false);
              this.carimenggunakankodepos(this.daWa.kode_pos);
            }, 300);
          }
        },
        // error: err => {
        //   console.warn('fff', err)
        //   this.getLoading(false);
        // }
      });
    }, 50);
    // const ValidasiNama = <FormControl>this.emergencyForm.get('nama');
    // const ValidasiAlamat = <FormControl>this.emergencyForm.get('alamat');
    // const ValidasiProvinsi = <FormControl>this.emergencyForm.get('provinsi');
    // const ValidasiKabkota = <FormControl>this.emergencyForm.get('kabkota');
    // const ValidasiKecamatan = <FormControl>this.emergencyForm.get('kecamatan');
    // const ValidasiKelurahan = <FormControl>this.emergencyForm.get('kelurahan');
    // const ValidasiKodePos = <FormControl>this.emergencyForm.get('kode_pos');
    // const ValidasiRt = <FormControl>this.emergencyForm.get('rt');
    // const ValidasiRw = <FormControl>this.emergencyForm.get('rw');
    // const ValidasiNoTelepon = <FormControl>this.emergencyForm.get('no_telepon');
    // const ValidasiHubungan = <FormControl>this.emergencyForm.get('hubungan');
    // const ValidasiEmail = <FormControl>this.emergencyForm.get('email');
    // setTimeout(() => {
    //   ValidasiNama.setValidators([Validators.required]);
    //   ValidasiAlamat.setValidators([Validators.required]);
    //   ValidasiProvinsi.setValidators([Validators.required]);
    //   ValidasiKabkota.setValidators([Validators.required]);
    //   ValidasiKecamatan.setValidators([Validators.required]);
    //   ValidasiKelurahan.setValidators([Validators.required]);
    //   ValidasiKodePos.setValidators([Validators.required]);
    //   ValidasiRt.setValidators([Validators.required]);
    //   ValidasiRw.setValidators([Validators.required]);
    //   ValidasiNoTelepon.setValidators([Validators.required]);
    //   ValidasiHubungan.setValidators([Validators.required]);
    //   ValidasiEmail.setValidators([Validators.required]);

    //   setTimeout(() => {
    //     ValidasiNama.updateValueAndValidity();
    //     ValidasiAlamat.updateValueAndValidity();
    //     ValidasiProvinsi.updateValueAndValidity();
    //     ValidasiKabkota.updateValueAndValidity();
    //     ValidasiKecamatan.updateValueAndValidity();
    //     ValidasiKelurahan.updateValueAndValidity();
    //     ValidasiKodePos.updateValueAndValidity();
    //     ValidasiRt.updateValueAndValidity();
    //     ValidasiRw.updateValueAndValidity();
    //     ValidasiNoTelepon.updateValueAndValidity();
    //     ValidasiHubungan.updateValueAndValidity();
    //     ValidasiEmail.updateValueAndValidity();
    //   }, 100);
    // }, 100);
  }

  gettokendukcapil(): void {
    this.http
      .post<any>('http://10.20.82.12:8083/token/generate-token', {
        password: '3foWeb@pp',
        username: 'efo',
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.postId = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          // console.warn(data.result.token);
          // console.warn(this.postId);
          // this.router.navigate(['/daftaraplikasiide'], {
          //   queryParams: {},
          // });
          // alert('dapetnih');

          this.datEntryService.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              //console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
            },
          });
        },
      });
  }

  onChange(value: any) {
    const proValue = value.split('|');
    this.datEntryService.getkabkota(this.postId, proValue[0]).subscribe(data => {
      this.daWakota = data.body?.result;
      this.emergencyForm.get('kabkota')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(this.postId, kotaValue[0]).subscribe(data => {
      this.kecamatan = data.body?.result;
      this.emergencyForm.get('kecamatan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(this.postId, kecValue[0]).subscribe(data => {
      this.kelurahan = data.body?.result;
      this.emergencyForm.get('kelurahan')?.setValue(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.emergencyForm.get('kode_pos')?.setValue(this.daWakodepos);
  }

  goto(appde: any) {
    this.router.navigate(['/data-entry/call-report'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
      },
    });
    // this.onResponseSuccess(res);
    // alert('ke call-report');
    // this.router.navigate(['/call-report'], { queryParams: { datakiriman:this.datakirimiancure , datakirimiancure:this.datakiriman } });
  }

  simpanemergency() {
    // contohtampungankategoripekerjaan: any // contohtampunganappde: any, // contohtampungstatuskawain: any, // contohtampungancuref: any,
    const id = document.getElementById('id') as HTMLInputElement | any;
    const nama = document.getElementById('nama') as HTMLInputElement | any;
    const alamat = document.getElementById('alamat') as HTMLInputElement | any;
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
    const hubungan = document.getElementById('hubungan') as HTMLInputElement | any;
    const email = document.getElementById('email') as HTMLInputElement | any;
    // const angsuran = document.getElementById('angsuran') as HTMLInputElement | any;
    // const hasil_pembiayaan = document.getElementById('hasil_pembiayaan') as HTMLInputElement | any;
    // const detail_objek_pembiayaan = document.getElementById('detail_objek_pembiayaan') as HTMLInputElement | any;
    // const fee_based = document.getElementById('fee_based') as HTMLInputElement | any;

    var potonganprovinsi = provinsi_cabang.value.split('|');
    if (provinsi_cabang.value.indexOf('|') !== -1) {
      var kirimanprov = potonganprovinsi[1];
    } else {
      var kirimanprov = provinsi_cabang.value;
    }
    var potongankabkota = kabkota_cabang.value.split('|');
    if (kabkota_cabang.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankabkota[1];
    } else {
      var kirimankabkota = kabkota_cabang.value;
    }
    var potongankecamatan = kecamatan.value.split('|');
    if (kecamatan.value.indexOf('|') !== -1) {
      var kirimamnkecamatan = potongankecamatan[1];
    } else {
      var kirimamnkecamatan = kecamatan.value;
    }
    var potongankelurahan = kelurahan.value.split('|');
    if (kelurahan.value.indexOf('|') !== -1) {
      var kirimankelurahan = potongankelurahan[1];
    } else {
      var kirimankelurahan = kelurahan.value;
    }

    if (this.daWa === null) {
      // alert('ini create');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/create_emergency_contact', {
          id: '',
          curef: this.curef,
          nama: this.emergencyForm.get('nama')?.value,
          alamat: this.emergencyForm.get('alamat')?.value,
          provinsi: kirimanprov,
          kabkota: kirimankabkota,
          kecamatan: kirimamnkecamatan,
          kelurahan: kirimankelurahan,
          kode_pos: this.emergencyForm.get('kode_pos')?.value,
          rt: this.emergencyForm.get('rt')?.value,
          rw: this.emergencyForm.get('rw')?.value,
          no_telepon: this.emergencyForm.get('no_telepon')?.value,
          email: this.emergencyForm.get('email')?.value,
          hubungan: this.emergencyForm.get('hubungan')?.value,
          created_by: this.SessionStorageService.retrieve('sessionUserName'),
          created_date: '',
        })

        .subscribe({
          next: bawaan => {
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/data-entry/call-report'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
        });
    } else {
      // alert('ini update');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/update_emergency_contact', {
          id: this.daWa.id,
          curef: this.curef,
          nama: this.emergencyForm.get('nama')?.value,
          alamat: this.emergencyForm.get('alamat')?.value,
          provinsi: kirimanprov,
          kabkota: kirimankabkota,
          kecamatan: kirimamnkecamatan,
          kelurahan: kirimankelurahan,
          kode_pos: this.emergencyForm.get('kode_pos')?.value,
          rt: this.emergencyForm.get('rt')?.value,
          rw: this.emergencyForm.get('rw')?.value,
          no_telepon: this.emergencyForm.get('no_telepon')?.value,
          email: this.emergencyForm.get('email')?.value,
          hubungan: this.emergencyForm.get('hubungan')?.value,
          updated_by: this.SessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
        })
        .subscribe({
          next: bawaan => {
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/data-entry/call-report'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
        });
    }
  }

  carimenggunakankodepos(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe(data => {
      this.retriveKodeProvinsi = data.body?.result.provKec.kd_prov;
      this.retriveKodeKota = data.body?.result.provKec.kd_kota;
      this.retriveKodeKecamatan = data.body?.result.provKec.kd_kec;
      this.retriveprovinsi = data.body?.result.provKec.nm_prov;
      this.retrivekabkota = data.body?.result.provKec.nm_kota;
      this.retrivekecamatan = data.body?.result.provKec.nm_kec;

      if (data.body?.result.provKec.kd_kel == null) {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.body?.result.kels[0].namaWilayah;
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      } else {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.body?.result.provKec.nm_kel;
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      }
      this.emergencyForm.get('provinsi')?.setValue(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChange(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChangekota(this.retriveKodeKota + '|' + this.retrivekabkota);
      this.onChangekecamatan(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  getkodepostnya(kodepst: any, req: any) {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.postId}`,
    };
    // const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvKecByKdPos/' + kodepst, {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // charCode.toLocaleString('id-ID',{style: 'currency', currency:'IDR'})
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
