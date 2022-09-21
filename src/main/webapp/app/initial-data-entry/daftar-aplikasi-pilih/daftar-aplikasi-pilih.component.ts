import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';

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
  gotofix() {
    this.router.navigate(['/initial-data-entryfix'], {
      queryParams: {},
    });
  }

  gotonon() {
    this.router.navigate(['/initial-data-entrynon'], {
      queryParams: {},
    });
  }
}
