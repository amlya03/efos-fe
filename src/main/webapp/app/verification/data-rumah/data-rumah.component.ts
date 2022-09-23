import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  // dataRumahModel?: daWuS[];

  constructor(
    protected dataRumah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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
      gaji_kotor_pemohon: '',
      tunjangan_pemohon: '',
      pendapatan_kotor_pemohon: '',
      pendapatan_kotor_lainnya_pemohon: '',
      total_angsuran_kewajiban_kantor_pemohon: '',
      pendapatan_bersih_pemohon: '',
      gaji_kotor_pasangan: '',
      tunjangan_pasangan: '',
      pendapatan_kotor_pasangan: '',
      pendapatan_kotor_lainnya_pasangan: '',
      total_angsuran_kewajiban_kantor_pasangan: '',
      pendapatan_bersih_pasangan: '',
      gaji_kotor_total: '',
      tunjangan_total: '',
      pendapatan_kotor_total: '',
      pendapatan_kotor_lainnya_total: '',
      pendapatan_bersih_total: '',

      // ///////////////non fix income/////////////////////
      pendapatan_usaha_pemohon: '',
      pendapatan_profesional_pemohon: '',
      pendapatan_usaha_pasangan: '',
      pendapatan_profesional_pasangan: '',
      pendapatan_usaha_total: '',
      pendapatan_profesional_total: '',
    });

    this.load();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.analisaKeuanganForm.invalid) {
      return;
    }
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
