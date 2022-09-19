import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceVerificationService } from '../service/service-verification.service';

@Component({
  selector: 'jhi-data-calon-nasabah',
  templateUrl: './data-calon-nasabah.component.html',
  styleUrls: ['./data-calon-nasabah.component.scss'],
})
export class DataCalonNasabahComponent implements OnInit {
  dataCalonNasabahForm!: FormGroup;
  submitted = false;

  constructor(
    protected dataCalonNasabah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataCalonNasabahForm = this.formBuilder.group({
      nama: ['', Validators.required],
      nama_perusahaan: ['', Validators.required],
      alamat_perusahaan: ['', Validators.required],
      no_telepon_perusahaan: ['', Validators.required],
      nama_yang_dihubungi: ['', Validators.required],
      jabatan_yang_dihubungi: ['', Validators.required],
      tanggal_permintaan: ['', Validators.required],
      tanggal_pemeriksa: ['', Validators.required],
      nama_pemeriksa: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dataCalonNasabahForm.invalid) {
      return;
    }
    // alert('Coba Validasi');
  }
}
