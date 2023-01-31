import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-daftar-aplikasi-pilih',
  templateUrl: './daftar-aplikasi-pilih.component.html',
  styleUrls: ['./daftar-aplikasi-pilih.component.scss'],
})
export class DaftarAplikasiPilihComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  ngOnInit(): void {}
  gotofix(kategori: any) {
    this.router.navigate(['/initial-data-entryfix'], {
      queryParams: { kategori: kategori },
    });
  }

  gotonon(kategori: any) {
    this.router.navigate(['/initial-data-entryfix'], {
      queryParams: { kategori: kategori },
    });
  }
}
