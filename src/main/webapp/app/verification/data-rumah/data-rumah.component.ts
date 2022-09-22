import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceVerificationService } from '../service/service-verification.service';

@Component({
  selector: 'jhi-data-rumah',
  templateUrl: './data-rumah.component.html',
  styleUrls: ['./data-rumah.component.scss'],
})
export class DataRumahComponent implements OnInit {
  analisaKeuanganForm!: FormGroup;
  submitted = false;

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
    });

    this.load();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.analisaKeuanganForm.invalid) {
      return;
    }
    // alert('Coba Validasi');
  }

  load(): void {
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
