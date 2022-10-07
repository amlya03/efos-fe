import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-stuktur-pembiayaan',
  templateUrl: './stuktur-pembiayaan.component.html',
  styleUrls: ['./stuktur-pembiayaan.component.scss'],
})
export class StukturPembiayaanComponent implements OnInit {
  app_no_de: any;
  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {}

  // pindah
  viewStruktur(): void {
    // alert(getAppNoDe);
    this.router.navigate(['/checklist-document'], { queryParams: { app_no_de: this.app_no_de } });
  }
}
