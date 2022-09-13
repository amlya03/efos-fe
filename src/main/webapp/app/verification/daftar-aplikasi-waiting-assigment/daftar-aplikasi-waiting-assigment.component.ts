import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiResponseDa } from '../service/config/apiResponse_daWa';
import { DaftarAplikasiWaitingAssigmentService } from '../service/daftar-aplikasi-waiting-assigment.service';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-assigment',
  templateUrl: './daftar-aplikasi-waiting-assigment.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-assigment.component.scss'],
})
export class DaftarAplikasiWaitingAssigmentComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  daWa: ApiResponseDa[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private daftarAplikasiWaitingAssigmentService: DaftarAplikasiWaitingAssigmentService) {}

  ngOnInit(): void {
    this.daftarAplikasiWaitingAssigmentService.getDaWa().subscribe(response => {
      this.daWa = response;
      console.warn('ini buat daftar', this.daWa);
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
