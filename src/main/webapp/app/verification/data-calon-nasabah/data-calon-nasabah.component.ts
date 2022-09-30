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
  app_no_de: any;

  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected IdeService: InitialDataEntryService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

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
    } else
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_analisa_nasabah', {
          akses_jalan: this.dataCalonNasabahForm.get('akses_jalan_ke_rumah_tinggal')?.value,
          app_no_de: 'de220820000117',
          carport: '',
          cek: '',
          created_by: '',
          created_date: '',
          fasilitas_listrik: '',
          fasilitas_pembiayaan: this.dataCalonNasabahForm.get('fasilitas_pembiayaan_ke')?.value,
          garasi: '',
          hubungan_pemberi_keterangan: '',
          id: 0,
          isi_rumah: '',
          jenis_bangunan: '',
          jumlah_kendaraan: this.dataCalonNasabahForm.get('jumlah_kendaraan')?.value,
          karakter_calon_nasabah: '',
          kendaraan: '',
          kondisi_kendaraan: '',
          kondisi_lingkungan: this.dataCalonNasabahForm.get('kondisi_lingkungan')?.value,
          lama_menetap_bulan: this.dataCalonNasabahForm.get('lama_menetap_bulan')?.value,
          lama_menetap_tahun: this.dataCalonNasabahForm.get('lama_menetap_tahun')?.value,
          lokasi_perumahan: '',
          note_verif_alamat: '',
          note_verif_ibu_kandung: '',
          note_verif_jumlah_tanggungan: '',
          note_verif_kabkota: '',
          note_verif_kecamatan: '',
          note_verif_kelurahan: '',
          note_verif_kode_pos: '',
          note_verif_nama_pasangan: '',
          note_verif_pekerjaan_pasangan: '',
          note_verif_pendidikan: '',
          note_verif_provinsi: '',
          note_verif_rt_rw: '',
          note_verif_status_menikah: '',
          note_verif_tanggal_lahir: '',
          pemberi_keterangan: this.dataCalonNasabahForm.get('pemberi_keterangan')?.value,
          rumah_dihuni: '',
          status_rumah: '',
          tanggal_verifikasi: '',
          updated_by: '',
          updated_date: '',
          verif_alamat: '',
          verif_ibu_kandung: '',
          verif_jumlah_tanggungan: '',
          verif_kabkota: '',
          verif_kecamatan: '',
          verif_kelurahan: '',
          verif_kode_pos: '',
          verif_nama_pasangan: '',
          verif_pekerjaan_pasangan: '',
          verif_pendidikan: '',
          verif_provinsi: '',
          verif_rt_rw: '',
          verif_status_menikah: '',
          verif_tanggal_lahir: '',
        })
        .subscribe({});
    this.router.navigate(['/data-kantor'], { queryParams: { app_no_de: this.app_no_de } });
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
