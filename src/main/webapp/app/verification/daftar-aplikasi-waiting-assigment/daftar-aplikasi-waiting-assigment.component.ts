import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
// import { ApiResponseDa } from '../service/config/apiResponse_daWa';
import { DaftarAplikasiWaitingAssigmentService, EntityArrayResponseDaWa } from '../service/daftar-aplikasi-waiting-assigment.service';
import { daWaModel } from './daWa.model';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-assigment',
  templateUrl: './daftar-aplikasi-waiting-assigment.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-assigment.component.scss'],
})
export class DaftarAplikasiWaitingAssigmentComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  dtOptions: DataTables.Settings = {};
  daWa?: daWaModel[];
  dtTrigger: Subject<any> = new Subject<any>();
  onResponseSuccess: any;
  constructor(
    protected daWaService: DaftarAplikasiWaitingAssigmentService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.daWaService.getDaWa().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('testtttttttttttttttt', res.body?.result);
        this.daWa = res.body?.result;
        this.onResponseSuccess(res);
      },
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
