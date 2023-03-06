import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';
import { environment } from 'environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-daftar-aplikasi-pilih',
  templateUrl: './daftar-aplikasi-pilih.component.html',
  styleUrls: ['./daftar-aplikasi-pilih.component.scss'],
})
export class DaftarAplikasiPilihComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  modelFasilitas: getListFasilitasModel[] = [];
  pilihProgramFixForm!: FormGroup;
  pilihProgramNonForm!: FormGroup;

  constructor(
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryServices: DataEntryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getLoading(true);
    this.pilihProgramFixForm = this.formBuilder.group({
      fasilitas_name: '',
    });
    this.pilihProgramNonForm = this.formBuilder.group({
      fasilitas_name: '',
    });
    this.load();
  }

  load(): void {
    this.dataEntryServices.getFetchKodeFasilitas().subscribe(data => {
      this.modelFasilitas = data.result;
      this.getLoading(false);
    });
  }

  gotofix(kategoriFix: any): void {
    const value = this.pilihProgramFixForm.get('fasilitas_name')?.value.split('|');
    if (this.pilihProgramFixForm.get('fasilitas_name')?.value) {
      this.router.navigate(['/initial-data-entryfix'], {
        queryParams: { kategori: kategoriFix, kode_fasilitas: value[0], fasilitas: value[1] },
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Pilih Fasilitas Terlebih dahulu',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  gotonon(kategoriNon: any): void {
    const value = this.pilihProgramNonForm.get('fasilitas_name')?.value.split('|');
    if (this.pilihProgramNonForm.get('fasilitas_name')?.value) {
      this.router.navigate(['/initial-data-entryfix'], {
        queryParams: { kategori: kategoriNon, kode_fasilitas: value[0], fasilitas: value[1] },
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Pilih Fasilitas Terlebih dahulu',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
