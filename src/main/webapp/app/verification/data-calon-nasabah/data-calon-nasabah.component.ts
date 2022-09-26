import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganEmergency } from '../service/config/refHubunganEmergency.model';
import { refStatusPerkawinan } from '../service/config/refStatusPerkawinan.model';

@Component({
  selector: 'jhi-data-calon-nasabah',
  templateUrl: './data-calon-nasabah.component.html',
  styleUrls: ['./data-calon-nasabah.component.scss'],
})
export class DataCalonNasabahComponent implements OnInit {
  dataCalonNasabahForm!: FormGroup;
  submitted = false;
  editor!: Editor;
  html = '';
  refHubunganEmergency?: refHubunganEmergency[];
  refStatusPerkawinan?: refStatusPerkawinan[];

  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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
      nama_pasangan: ['', Validators.required],
      pekerjaan_pasangan: ['', Validators.required],
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
