import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
// import { daWuS } from '../daftar-aplikasi-waiting-update-status/daWuS.model';

@Component({
  selector: 'jhi-data-rumah',
  templateUrl: './data-rumah.component.html',
  styleUrls: ['./data-rumah.component.scss'],
})
export class DataRumahComponent implements OnInit {
  analisaKeuanganForm!: FormGroup;
  submitted = false;
  app_no_de: any;
  analisaKeuanganMap: any;
  // dataRumahModel?: daWuS[];

  constructor(
    protected dataRumah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  // API url
  protected getAnalisaKeuangan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-verif/getAnalisaKeuangan?sd='
  );

  ngOnInit(): void {
    this.load();
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.analisaKeuanganForm = this.formBuilder.group({
      nama: ['', Validators.required],
      nama_perusahaan: ['', Validators.required],
      alamat_perusahaan: ['', Validators.required],
      no_telepon_perusahaan: ['', Validators.required],
      nama_yang_dihubungi: ['', Validators.required],
      jabatan_yang_dihubungi: ['', Validators.required],
      tanggal_permintaan: ['', Validators.required],
      tanggal_pemeriksa: ['', Validators.required],
      nama_pemeriksa: ['', Validators.required],

      // ///////////fix income /////////////////
      // if('Fix INcome' == 'Fix Income') {

      // }
      gaji_kotor_pemohon: ['', Validators.required],
      tunjangan_pemohon: ['', Validators.required],
      pendapatan_kotor_pemohon: ['', Validators.required],
      pendapatan_kotor_lainnya_pemohon: ['', Validators.required],
      total_angsuran_kewajiban_kantor_pemohon: ['', Validators.required],
      pendapatan_bersih_pemohon: ['', Validators.required],
      gaji_kotor_pasangan: ['', Validators.required],
      tunjangan_pasangan: ['', Validators.required],
      pendapatan_kotor_pasangan: ['', Validators.required],
      pendapatan_kotor_lainnya_pasangan: ['', Validators.required],
      total_angsuran_kewajiban_kantor_pasangan: ['', Validators.required],
      pendapatan_bersih_pasangan: ['', Validators.required],
      gaji_kotor_total: ['', Validators.required],
      tunjangan_total: ['', Validators.required],
      pendapatan_kotor_total: ['', Validators.required],
      pendapatan_kotor_lainnya_total: ['', Validators.required],
      pendapatan_bersih_total: ['', Validators.required],

      // ///////////////non fix income/////////////////////
      pendapatan_usaha_pemohon: ['', Validators.required],
      pendapatan_profesional_pemohon: ['', Validators.required],
      pendapatan_usaha_pasangan: ['', Validators.required],
      pendapatan_profesional_pasangan: ['', Validators.required],
      pendapatan_usaha_total: ['', Validators.required],
      pendapatan_profesional_total: ['', Validators.required],

      // ////////// Validasi \\\\\\\\\\\\\\\\\
      // nama_perusahaan: this.analisaKeuanganMap.nama_perusahaan,
      // alamat_perusahaan: this.analisaKeuanganMap.alamat_perusahaan,
      // no_telepon_perusahaan: this.analisaKeuanganMap.no_telepon_perusahaan,
      // nama_yang_dihubungi: this.analisaKeuanganMap.nama_dihubungi,
      // jabatan_yang_dihubungi: this.analisaKeuanganMap.jabatan_dihubungi,
      // tanggal_permintaan: this.analisaKeuanganMap.tanggal_permintaan,
      // tanggal_pemeriksa: this.analisaKeuanganMap.tanggal_pemeriksa,
      // nama_pemeriksa: this.analisaKeuanganMap.nama_pemeriksa,

      // ///////////fix income /////////////////
      // gaji_kotor_pemohon: this.analisaKeuanganMap.gaji_kotor,
      // tunjangan_pemohon: this.analisaKeuanganMap.tunjangan,
      // pendapatan_kotor_pemohon: this.analisaKeuanganMap.pendapatan_kotor,
      // pendapatan_kotor_lainnya_pemohon: this.analisaKeuanganMap.pendapatan_kantor_lainnya,
      // total_angsuran_kewajiban_kantor_pemohon: this.analisaKeuanganMap.total_angsuran_kantor,
      // pendapatan_bersih_pemohon: this.analisaKeuanganMap.pendapatan_bersih,
      // gaji_kotor_pasangan: this.analisaKeuanganMap.gaji_kotor_pasangan,
      // tunjangan_pasangan: this.analisaKeuanganMap.tunjangan_pasangan,
      // pendapatan_kotor_pasangan: this.analisaKeuanganMap.pendapatan_kotor_pasangan,
      // pendapatan_kotor_lainnya_pasangan: this.analisaKeuanganMap.pendapatan_kantor_lainnya_pasangan,
      // total_angsuran_kewajiban_kantor_pasangan: this.analisaKeuanganMap.total_angsuran_kantor_pasangan,
      // pendapatan_bersih_pasangan: this.analisaKeuanganMap.pendapatan_bersih_pasangan,
      // gaji_kotor_total: this.analisaKeuanganMap.gaji_kotor_total,
      // tunjangan_total: this.analisaKeuanganMap.tunjangan_total,
      // pendapatan_kotor_total: this.analisaKeuanganMap.pendapatan_kotor_total,
      // pendapatan_kotor_lainnya_total: this.analisaKeuanganMap.pendapatan_kantor_lainnya_total,
      // pendapatan_bersih_total: this.analisaKeuanganMap.pendapatan_bersih_total,

      // // ///////////////non fix income/////////////////////
      // pendapatan_usaha_pemohon: this.analisaKeuanganMap.pendapatan_usaha,
      // pendapatan_profesional_pemohon: this.analisaKeuanganMap.pendapatan_profesional,
      // pendapatan_usaha_pasangan: this.analisaKeuanganMap.pendapatan_usaha_pasangan,
      // pendapatan_profesional_pasangan: this.analisaKeuanganMap.pendapatan_profesional_pasangan,
      // pendapatan_usaha_total: this.analisaKeuanganMap.pendapatan_usaha_total,
      // pendapatan_profesional_total: this.analisaKeuanganMap.pendapatan_profesional_total
    });
  }

  fetchAnalisaKeuangan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getAnalisaKeuangan + this.app_no_de);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.analisaKeuanganForm.invalid) {
      return;
    } else if (this.analisaKeuanganMap == null) {
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_analisa_keuangan', {
          alamat_perusahaan: this.analisaKeuanganForm.get('alamat_perusahaan')?.value,
          app_no_de: this.analisaKeuanganMap.app_no_de,
          created_by: '',
          created_date: '2022-09-29T10:45:53.691Z',
          gaji_kotor: this.analisaKeuanganForm.get('gaji_kotor')?.value,
          gaji_kotor_pasangan: this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value,
          gaji_kotor_total: this.analisaKeuanganForm.get('gaji_kotor_total')?.value,
          jabatan_dihubungi: '',
          kewajiban_bank: this.analisaKeuanganForm.get('kewajiban_bank')?.value,
          kewajiban_bank_pasangan: '',
          kewajiban_bank_total: '',
          kewajiban_lainnya: this.analisaKeuanganForm.get('kewajiban_lainnya')?.value,
          ewajiban_lainnya_pasangan: '',
          kewajiban_lainnya_total: '',
          nama_dihubungi: '',
          nama_pemeriksa: this.analisaKeuanganForm.get('nama_pemeriksa')?.value,
          nama_perusahaan: this.analisaKeuanganForm.get('nama_perusahaan')?.value,
          no_telepon_perusahaan: this.analisaKeuanganForm.get('no_telepon_perusahaan')?.value,
          pendapatan_bersih: this.analisaKeuanganForm.get('pendapatan_bersih')?.value,
          pendapatan_bersih_pasangan: this.analisaKeuanganForm.get('pendapatan_bersih_pasangan')?.value,
          pendapatan_bersih_total: this.analisaKeuanganForm.get('pendapatan_bersih_total')?.value,
          pendapatan_kantor_lainnya: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value,
          endapatan_kantor_lainnya_pasangan: '',
          pendapatan_kantor_lainnya_total: '',
          pendapatan_kotor: '',
          pendapatan_kotor_pasangan: '',
          pendapatan_kotor_total: '',
          endapatan_profesional: '',
          pendapatan_profesional_pasangan: '',
          pendapatan_profesional_total: '',
          pendapatan_usaha: '',
          endapatan_usaha_pasangan: '',
          pendapatan_usaha_total: '',
          tanggal_pemeriksa: '',
          anggal_permintaan: '',
          total_angsuran_kantor: '',
          total_angsuran_kantor_akumulasi: '',
          otal_angsuran_kantor_pasangan: '',
          total_penghasilan_bersih: '',
          total_penghasilan_bersih_akumulasi: '',
          total_penghasilan_bersih_pasangan: '',
          total_penghasilan_kotor: '',
          total_penghasilan_kotor_akumulasi: '',
          total_penghasilan_kotor_pasangan: '',
          tunjangan: '',
          unjangan_pasangan: '',
          tunjangan_total: '',
        })
        .subscribe({});
      this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de } });
    } else
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/update_analisa_keuangan', {
          akses_jalan: '',
          app_no_de: '',
          carport: '',
          cek: '',
          created_by: '',
          created_date: '',
          fasilitas_listrik: '',
          fasilitas_pembiayaan: '',
          garasi: '',
          hubungan_pemberi_keterangan: '',
          id: 0,
          isi_rumah: '',
          jenis_bangunan: '',
          jumlah_kendaraan: '',
          karakter_calon_nasabah: '',
          kendaraan: '',
          kondisi_kendaraan: '',
          kondisi_lingkungan: '',
          lama_menetap_bulan: '',
          lama_menetap_tahun: '',
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
          pemberi_keterangan: '',
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
    this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de } });

    // this.http
    //   .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_verif_mutasi', {
    //     nama: this.analisaKeuanganForm.get('nama')?.value,
    //     nama_perusahaan: this.analisaKeuanganForm.get('nama_perusahaan')?.value,
    //     alamat_perusahaan: this.analisaKeuanganForm.get('alamat_perusahaan')?.value,
    //     no_telepon_perusahaan: this.analisaKeuanganForm.get('no_telepon_perusahaan')?.value,
    //     nama_yang_dihubungi: this.analisaKeuanganForm.get('nama_yang_dihubungi')?.value,
    //     debet: this.analisaKeuanganForm.get('jabatan_yang_dihubungi')?.value,
    //     id: this.analisaKeuanganForm.get('tanggal_permintaan')?.value,
    //     kredit: this.analisaKeuanganForm.get('tanggal_pemeriksa')?.value,
    //     no_rekening: this.analisaKeuanganForm.get('nama_pemeriksa')?.value,
    //     saldo: this.analisaKeuanganForm.get('gaji_kotor_pemohon')?.value,
    //     tahun: this.analisaKeuanganForm.get('tunjangan_pemohon')?.value,
    //     updated_by: this.analisaKeuanganForm.get('pendapatan_kotor_pemohon')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_kotor_lainnya_pemohon')?.value,
    //     updated_date: this.analisaKeuanganForm.get('total_angsuran_kewajiban_kantor_pemohon')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_bersih_pemohon')?.value,
    //     updated_date: this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value,
    //     updated_date: this.analisaKeuanganForm.get('tunjangan_pasangan')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_kotor_pasangan')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_kotor_lainnya_pasangan')?.value,
    //     updated_date: this.analisaKeuanganForm.get('total_angsuran_kewajiban_kantor_pasangan')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_bersih_pasangan')?.value,
    //     updated_date: this.analisaKeuanganForm.get('gaji_kotor_total')?.value,
    //     updated_date: this.analisaKeuanganForm.get('tunjangan_total')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_kotor_total')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_kotor_lainnya_total')?.value,
    //     updated_date: this.analisaKeuanganForm.get('pendapatan_bersih_total')?.value,
    //   })
    //   .subscribe({
    //     next: response => console.warn(response),
    //     error: error => console.warn(error),
    //   });
  }

  load(): void {
    this.fetchAnalisaKeuangan().subscribe(data => {
      // if (data.message === "success") {
      this.analisaKeuanganMap = data.result;
      // alert('sdhgfhsghfgdh ' +this.analisaKeuanganMap.nama_perusahaan);
      // console.log('sdhgfhsghfgdh ' +this.analisaKeuanganMap.app_no_de);
      // }
    });
    // this.dataRumah.getDaWuS().subscribe(data => {
    //   console.warn(data);
    //   if (data.code === 200) {
    //     this.dataRumahModel = data.result;
    //   }
    // });
    // ref Hubungan Emergency
    // this.dataRumah.getHubunganEmergency().subscribe(data => {
    //   // console.warn('ref', data);
    //   if (data.code === 200) {
    //     this.refHubunganEmergency = data.result;
    //   }
    // });
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
}
