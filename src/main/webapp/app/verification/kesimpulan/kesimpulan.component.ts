import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'jhi-kesimpulan',
  templateUrl: './kesimpulan.component.html',
  styleUrls: ['./kesimpulan.component.scss']
})
export class KesimpulanComponent implements OnInit {
  editor!: Editor;
  app_no_de: any;
  curef: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // Simpan Data
  simpanData(){
    this.router.navigate(['/verification/memo'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
