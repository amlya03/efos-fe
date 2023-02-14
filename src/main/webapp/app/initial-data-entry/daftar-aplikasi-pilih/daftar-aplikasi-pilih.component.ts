import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-daftar-aplikasi-pilih',
  templateUrl: './daftar-aplikasi-pilih.component.html',
  styleUrls: ['./daftar-aplikasi-pilih.component.scss'],
})
export class DaftarAplikasiPilihComponent {
  constructor(private router: Router, protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  gotofix(kategoriFix: any): void {
    this.router.navigate(['/initial-data-entryfix'], {
      queryParams: { kategori: kategoriFix },
    });
  }

  gotonon(kategoriNon: any): void {
    this.router.navigate(['/initial-data-entryfix'], {
      queryParams: { kategori: kategoriNon },
    });
  }
}
