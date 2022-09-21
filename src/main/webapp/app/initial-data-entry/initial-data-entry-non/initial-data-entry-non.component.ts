import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';

@Component({
  selector: 'jhi-initial-data-entry-non',
  templateUrl: './initial-data-entry-non.component.html',
  styleUrls: ['./initial-data-entry-non.component.scss'],
})
export class InitialDataEntryNonComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  ngOnInit(): void {}

  gotoprescreaning() {
    this.router.navigate(['/hasilprescreening'], {
      queryParams: {},
    });
  }

  gotodaftaraplikasiide() {
    this.router.navigate(['/daftaraplikasiide'], {
      queryParams: {},
    });
  }
}
