import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganAgunan } from '../service/config/refHubunganAgunan.model';
import { refJabatan } from '../service/config/refJabatan.model';
import { refJumlahKaryawan } from '../service/config/refJumlahKaryawan.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-data-kantor',
  templateUrl: './data-kantor.component.html',
  styleUrls: ['./data-kantor.component.scss'],
})
export class DataKantorComponent implements OnInit {
  editor!: Editor;
  html = '';
  dataKantorForm!: FormGroup;
  submitted = false;
  refHubunganAgunan?: refHubunganAgunan[];
  refJabatan?: refJabatan[];
  refJumlahKaryawan?: refJumlahKaryawan[];

  constructor(
    protected dataKantor: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataKantorForm = this.formBuilder.group({
      tanggal_verification: ['', Validators.required],
      waktu_verification: ['', [Validators.required, Validators.minLength(12)]],
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
    this.submitted = true;
    if (this.dataKantorForm.invalid) {
      return;
    }
    // alert('Coba Validasi');
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
