import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { EntityArrayResponseDaWa, ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganEmergency } from '../service/config/refHubunganEmergency.model';
import { refStatusPerkawinan } from '../service/config/refStatusPerkawinan.model';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';
import { Observable } from 'rxjs';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { refStatusRumah } from '../service/config/refStatusRumah.model';
import { refListTipeProperti } from '../service/config/refListTipeProperti.model';

@Component({
  selector: 'jhi-data-calon-nasabah',
  templateUrl: './data-calon-nasabah.component.html',
  styleUrls: ['./data-calon-nasabah.component.scss'],
})
export class DataCalonNasabahComponent implements OnInit {
  // model dukcapil
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  // model dukcapil

  dataCalonNasabahForm!: FormGroup;
  submitted = false;
  editor!: Editor;
  html = '';
  refHubunganEmergency?: refHubunganEmergency[];
  refStatusPerkawinan?: refStatusPerkawinan[];
  refBidang?: refBidang[];
  refSektor?: refSektor[];
  refStatusRumah?: refStatusRumah[];
  refListTipeProperti?: refListTipeProperti[];
  getToken: any;
  getProvinsi: any;
  getKodePos: any;
  getKelurahan: any;
  getKecamatan: any;
  getKota: any;

  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
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
    this.dataCalonNasabahForm = this.formBuilder.group({
      tanggal_verification: ['', Validators.required],
      no_customer: ['', [Validators.required, Validators.minLength(12)]],
      hubungan_dengen_pemberi_keterangan: ['', Validators.required],
      pemberi_keterangan: ['', Validators.required],
      alamat_rumah: ['', Validators.required],
      rt: ['', Validators.required],
      rw: ['', Validators.required],
      provinsi: ['', Validators.required],
      kota: ['', Validators.required],
      kecamatan: ['', Validators.required],
      kelurahan: ['', Validators.required],
      kode_pos: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      pedidikan: ['', Validators.required],
      status_menikah: ['', Validators.required],
      tanggal_pemeriksa: ['', Validators.required],
      // nama_pasangan: ['', Validators.required],
      // pekerjaan_pasangan: ['', Validators.required],
      nama_ibu_kandung: ['', Validators.required],
      jumlah_tanggunan: ['', Validators.required],
      karakter_nasabah: ['', Validators.required],
      fasilitas_pembiayaan_ke: ['', Validators.required],
      kondisi_lingkungan: ['', Validators.required],
      akses_jalan_ke_rumah_tinggal: ['', Validators.required],
      jumlah_kendaraan: ['', Validators.required],
      kesimpulan_hasil_investigasi: ['', Validators.required],
      lama_menetap_bulan: ['', Validators.required],
      lama_menetap_tahun: ['', Validators.required],
    });
    this.load();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dataCalonNasabahForm.invalid) {
      return;
    }
    // alert('Coba Validasi');
  }

  load(): void {
    // ref Hubungan Emergency
    this.dataCalonNasabah.getHubunganEmergency().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refHubunganEmergency = data.result;
      }
    });

    // ref Status Menikah
    this.dataCalonNasabah.getStatusPerkawinan().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refStatusPerkawinan = data.result;
      }
    });

    // ref Status Rumah
    this.dataCalonNasabah.getStatusRumah().subscribe(data => {
      // console.warn('ref', data);
      if (data.code === 200) {
        this.refStatusRumah = data.result;
      }
    });

    // ref Jenis Bangunan
    this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-de/list_tipe_properti?sp=H03').subscribe(data => {
      if (data.code === 200) {
        this.refListTipeProperti = data.result;
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
}
