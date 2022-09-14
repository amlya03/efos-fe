import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DaftarAplikasiWaitingAssigmentService, EntityArrayResponseDaWa } from '../service/daftar-aplikasi-waiting-assigment.service';
import { daWaModel } from './daWa.model';
import { daWaModelAprisal } from './daWaAprisal.model';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-assigment',
  templateUrl: './daftar-aplikasi-waiting-assigment.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-assigment.component.scss'],
})
export class DaftarAplikasiWaitingAssigmentComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  numbers: Array<number> = [];
  dtOptions: DataTables.Settings = {};
  daWa?: daWaModel[];
  daWaAprisal?: daWaModelAprisal[];
  dtTrigger: Subject<any> = new Subject<any>();
  onResponseSuccess: any;
  filterTerm!: string;

  constructor(
    protected daWaService: DaftarAplikasiWaitingAssigmentService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {
    this.numbers = Array(1000)
      .fill(1)
      .map((x, i) => i);
  }

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.daWaService.getDaWa().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res);
        this.daWa = res.body?.result;
        this.onResponseSuccess(res);
      },
    });

    this.daWaService.getDaWaAprisal().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('Aprisal', res);
        this.daWaAprisal = res.body?.result;
        this.onResponseSuccess(res);
      },
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cariButton(): void {
    alert('sedang dicoba');
  }
}
