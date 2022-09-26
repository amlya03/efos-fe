import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { EntityArrayResponseDaWa, ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganAgunan } from '../service/config/refHubunganAgunan.model';
import { refJabatan } from '../service/config/refJabatan.model';
import { refJumlahKaryawan } from '../service/config/refJumlahKaryawan.model';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';

@Component({
  selector: 'jhi-data-kantor',
  templateUrl: './data-kantor.component.html',
  styleUrls: ['./data-kantor.component.scss'],
})
export class DataKantorComponent implements OnInit {
  // model dukcapil
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  // model dukcapil

  editor!: Editor;
  html = '';
  dataKantorForm!: FormGroup;
  submitted = false;
  refHubunganAgunan?: refHubunganAgunan[];
  refJabatan?: refJabatan[];
  refJumlahKaryawan?: refJumlahKaryawan[];
  refBidang?: refBidang[];
  refSektor?: refSektor[];
  getToken: any;
  getProvinsi: any;
  getKodePos: any;
  getKelurahan: any;
  getKecamatan: any;
  getKota: any;

  constructor(
    protected dataKantor: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected IdeService: InitialDataEntryService
  ) {}

  ngOnInit(): void {
    this.postGetTokenDuckapil();
    this.editor = new Editor();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataKantorForm = this.formBuilder.group({
      tanggal_verification: ['', Validators.required],
      waktu_verification: ['', Validators.required],
      no_telepon: ['', Validators.required],
      fax: ['', Validators.required],
      pemberi_keterangan: ['', Validators.required],
      hungungan_pemohon_dengan_pemberi_keterangan: ['', Validators.required],
      nama_perusahaan: ['', Validators.required],
      alamat_perusahaan: ['', Validators.required],
      provinsi: ['', Validators.required],
      kota: ['', Validators.required],
      kecamatan: ['', Validators.required],
      kelurahan: ['', Validators.required],
      kode_pos: ['', Validators.required],
      rt: ['', Validators.required],
      rw: ['', Validators.required],
      lama_bekerja_tahun: ['', Validators.required],
      lama_bekerja_bulan: ['', Validators.required],
      lama_beroperasi_tahun: ['', Validators.required],
      lama_beroperasi_bulan: ['', Validators.required],
      bidang_usaha: ['', Validators.required],
      sektor_ekonomi: ['', Validators.required],
      tipe_pekerjaan: ['', Validators.required],
      status_kepegawaian: ['', Validators.required],
      bagian_atau_divisi: ['', Validators.required],
      posisi: ['', Validators.required],
      jumlah_karyawan: ['', Validators.required],
      usia_pensiun: ['', Validators.required],
      kesimpulan_hasil_investigasi: ['', Validators.required],
    });

    this.load();
  }

  onSubmit(): void {
    // const getSekarang = new Date();
    const getValueTanggal = +new Date(this.dataKantorForm.value.tanggal_verification);
    // alert(getValueTanggal.getTime());
    // /////////////ini buat dapet bulan//////////////////////////
    const getTahun = +~~((Date.now() - getValueTanggal) / 31557600000);
    // const calculateSekarang = Math.abs(Date.now() - getValueTanggal.getTime());
    // const getBulan = Math.floor(calculateSekarang / (1000 * 3600 * 24) / 365.25);
    // alert('Bulannya ' + getTahun);
    // /////////////ini buat dapet bulan/////////////////////////
    // var getHariIni = Math.abs(getSekarang.getTime() / (1000 * 3600 * 24) / 365.25);
    // const getHari = +~~(calculateSekarang / (24 * 60 * 60 * 1000));
    // const getHari = calculateSekarang / (-86400000);
    // let tanggalExpNya = "";
    // var Bday = +new Date(this.dataKantorForm.value.tanggal_verification);
    let tanggalExpNya = +~~((Date.now() - getValueTanggal) / 86400000);
    let tanggalExpNyaPakeKoma = (Date.now() - getValueTanggal) / 86400000;
    // alert("tanggal expnya "+ tanggalExpNya)
    // const getHari = getValueTanggal.getUTCDate()
    // alert(tanggalExpNyaPakeKoma)
    this.submitted = true;
    if (this.dataKantorForm.invalid) {
      return;
    }
    // else{
    if (tanggalExpNya > 30) {
      alert('Data Sudah Expired / Data Sudah Melebihin 30 Hari');
      return;
    } else if (tanggalExpNyaPakeKoma < 0.1) {
      alert('Data Tidak Boleh Melebihi Hari ini');
      return;
    }
    // }
  }

  load(): void {
    // ref hubungan agunan
    this.dataKantor.getHubunganAgunan().subscribe(data => {
      // console.warn('ref hubungan Agunan', data);
      if (data.code === 200) {
        this.refHubunganAgunan = data.result;
      }
    });

    // ref jabatan
    this.dataKantor.getJabatan().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refJabatan = data.result;
      }
    });
    // ref Jumlah Karyawan
    this.dataKantor.getJumlahKaryawan().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refJumlahKaryawan = data.result;
      }
    });
    // ref Jenis Bidang
    this.IdeService.getBidang().subscribe(data => {
      // console.log('jenis Bidang', data.result);
      if (data.code === 200) {
        this.refBidang = data.result;
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

  // Untuk Ducapil
  postGetTokenDuckapil(): void {
    this.http
      .post<any>('http://10.20.82.12:8083/token/generate-token', {
        password: '3foWeb@pp',
        username: 'efo',
      })
      .subscribe({
        next: data => {
          this.getToken = data.result.token;

          this.getProvinsiDukcapil(this.getToken).subscribe(data => {
            console.warn('ref', data);
            if (data.status === 200) {
              this.getProvinsi = data.body?.result;
            }
          });
        },
      });
  }
  getProvinsiDukcapil(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvinsi/', {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }
  getkabkota(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKota/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkecamatan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKec/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkodepos(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKdPos/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }

  getkelurahan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKel/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
  }
  onChangeProvinsi(valueProvinsi: any) {
    this.getkabkota(this.getToken, valueProvinsi).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.getKota = res.body?.result;
      },
    });
  }

  onChangekota(valueKota: any) {
    this.getkecamatan(this.getToken, valueKota).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.getKecamatan = res.body?.result;
      },
    });
  }

  onChangekecamatan(valueKecamatan: any) {
    this.getkelurahan(this.getToken, valueKecamatan).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.getKelurahan = res.body?.result;
      },
    });
  }

  onChangekelurahan(valueKelurahan: any) {
    const datakodepos = valueKelurahan.split('|');
    this.getKodePos = datakodepos[0];
  }

  onChangeBidang(bidang: any) {
    const poyonganGrupSektor = bidang.split('|');
    // alert(poyonganGrupSektor[0])
    return this.http
      .get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + poyonganGrupSektor[0])
      .subscribe(data => {
        // console.log('Sektor Ekonomi', data.result);
        if (data.code === 200) {
          this.refSektor = data.result;
        }
      });
  }
}