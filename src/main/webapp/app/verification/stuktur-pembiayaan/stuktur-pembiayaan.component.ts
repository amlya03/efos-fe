import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-stuktur-pembiayaan',
  templateUrl: './stuktur-pembiayaan.component.html',
  styleUrls: ['./stuktur-pembiayaan.component.scss'],
})
export class StukturPembiayaanComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  // pindah
  viewStruktur(): void {
    // alert(getAppNoDe);
    this.router.navigate(['/checklist-document']);
  }
}
